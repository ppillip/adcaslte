//For Scroll Append
var currentPosition = 0;
var appendCount = 20;
//Left Title Width
var topLeftWidth = {
    "YMD"         : "60"
    ,"BTS_NM"     : "140"
    ,"CELL_ID"    : "35"
    ,"MCID"       : "45"
    ,"FREQ_KIND"  : "55"
    ,"GRAPH"      : "30"
}

function scrollX() {
    document.all.divTopRight.scrollLeft = document.all.divBottomRight.scrollLeft;
    document.all.divMiddleRight.scrollLeft = document.all.divBottomRight.scrollLeft;
}

function scrollY() {
    document.all.divMiddleLeft.scrollTop = document.all.divMiddleRight.scrollTop;
}

$(document).ready(function(){

    //For Quick Menu
    $("#quickmenu_container").quickMenuForLTE();

    //GRAHP ALL Check
    $("input[name=checkAll]").click(function(){
        if($(this).attr("checked")){
            $("input[type=checkbox]").attr("checked",true);
            $("table[name=tableMiddleLeft] tr").addClass("warning");
            $("table[name=tableMiddleRight] tr").addClass("warning");
        }else{
            $("input[type=checkbox]").attr("checked",false);
            $("table[name=tableMiddleLeft] tr").removeClass("warning");
            $("table[name=tableMiddleRight] tr").removeClass("warning");
        }
    });

    $("#workgroup").click(function(){
        window.open('/adcaslte/workgroup/workgroup.jsp','workgroup','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=820,height=700');
    });

    $("#tempsearch").click(function(){
        window.open('/adcaslte/workgroup/workgroup.jsp','tempsearch','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=820,height=700');
    });

    /*===============================================================================
     * For 기간
     *==============================================================================*/
    //최초 기간 셋팅 (통계주기 주간)
    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();
    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
            $("input[name=FROMYMD]").val(getSunday($("#datepicker01").val()).replace(/-/gi,''));
            $("#fromto").text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
            $('#datepicker01').datepicker('hide');
        });
    $('#datepicker02').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
            $("input[name=TOYMD]").val(getSaturday($("#datepicker02").val()).replace(/-/gi,''));
            $("#fromto").text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
            $('#datepicker02').datepicker('hide');
        });
    $("#fromto").text('[ '+getSunday(_yesterday)+' ~ '+getSaturday(_yesterday)+' ]');
    $("input[name=FROMYMD]").val(getSunday(_yesterday).replace(/-/gi,''));
    $("input[name=TOYMD]").val(getSaturday(_yesterday).replace(/-/gi,''));

    //월간 셋팅
    var today = new Date();
    var year  = Number(today.getFullYear());
    var month = Number(today.getMonth())+1;
    month = (month>9)?month:'0'+month;
    for (var i=0; i<3; i++) {
        $("#fromYear,#toYear").append("<option value='"+(year-i)+"'>" +(year-i)+"</option>");
    }
    for (var i=1; i<=12; i++) {
        $("#fromMonth,#toMonth").append("<option value='"+(i>9?i:'0'+i)+"'>" +(i>9?i:'0'+i)+"</option>");
    }
    $("#fromMonth").val(month);
    $("#toMonth").val(month);
    $("#fromYear,#toYear,#fromMonth,#toMonth").change(function () {
        $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
        $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());
    });

    //통계주기 변경시
    $("input[name=TERMTYPE]").click(function (event) {
        $("[group=TERMTYPE]").hide();

        if (this.value === 'WK') {
            $('#datepicker01').show();
            $('#dash').show();
            $('#datepicker02').show();
            $('#fromto').show().text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
            $("input[name=FROMYMD]").val(getSunday($("#datepicker01").val()).replace(/-/gi,''));
            $("input[name=TOYMD]").val(getSaturday($("#datepicker02").val()).replace(/-/gi,''));
        } else if (this.value === 'MON') {
            $('#fromYear').show();
            $('#fromMonth').show();
            $('#toYear').show();
            $('#toMonth').show();
            $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
            $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());
        }
    });

    /*===============================================================================
     * End For 기간
     *==============================================================================*/

    /*===============================================================================
     * For Left Title Setting
     *==============================================================================*/
    $("#tableTopLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    $("#tableBottomLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    /*===============================================================================
     * End For Left Title Setting
     *==============================================================================*/

    /*===============================================================================
     * For SEARCH
     *==============================================================================*/
    $("#divSearch button[name=search]").click(function(){

        if(!$("#WORKGROUP_NAME").val()) {
            alert('조회대상이 선택되지 않았습니다.');
            return false;
        }

        $("div[name=divMiddleLeft] table tbody tr").remove();
        $("div[name=divMiddleRight] table tbody tr").remove();

        $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        var btn = $(this);
        btn.button('loading');

        var param = parseParam(this);

        window.currentPosition = 0;
        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTraffic",param,function(result,stat){

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

            //윈도우에 서버로 부터 온 데이터 버퍼링
            window.result = result;

            $leftTable = $("#tableMiddleLeft tbody");
            $rightTable = $("#tableMiddleRight tbody");

            if(result.error || result.rows.length === 0){
                btn.button('reset');
                alert(result.msg);
                $(document).trigger('ajaxError');
                return;
            }

            //테이블 랜더링
            appendToTable(function(){});

            $bottomRightTable = $("#tableBottomRight");

            //각항목 배열 통계
            var propertiesArray = {};
            for(var idx= 0,max =result.rows.length; idx < max; ++idx){
                var row = result.rows[idx];
                propertiesArray = getPropertiesArray(row,propertiesArray);
            }
            var statsArray = getStatsArray(propertiesArray);

            for(var i=0; i < 4; i++) {
                $("tbody tr:first",$bottomRightTable).remove();
                $("<tr class='info'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].THROUGHPUT  )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI0_RATE   )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RI_RATE     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_PRB_RATE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSSI0_PUCCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSSI1_PUCCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSSI0_PUSCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSSI1_PUSCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].LICENSE_FAIL)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"</tr>")
                    .appendTo($bottomRightTable);
            }

            btn.button('reset');

        },"json");
    });
    /*===============================================================================
     * End For SEARCH
     *==============================================================================*/

    /*===============================================================================
     * For GRAPH
     *==============================================================================*/
    $("#graphDropDown li[name=showCqiModal],#graphDropDown li[name=showThrpGraph]").click(function(){

        var checkedList = $("input[type=checkbox][name!=checkAll]:checked");
        if( checkedList.length === 0 ) {
            alert("Cell 을 선택해 주세요");
            return ;
        } else if( checkedList.length > 20 ) {
            alert("그래프는 20개 까지만 허용합니다.");
            return ;
        }

        var name = $(this).attr("name");
        //For CQI
        if (name === 'showCqiModal') {
            $('#cqiModal').modal('show');
            //For 용량그래프
        } else if (name === 'showThrpGraph') {
            window.open("downLinkBySTDGraph.jsp","",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
        }

    });

    //For CQI
    $('#cqiModal').on('shown', function () {
        $("#graphContainer").highcharts("drawCqiGraph",$("input[type=checkbox][name!=checkAll]:checked"),'PDF');
    });

    //For CQI
    $("#cqiModal input[name=cqiFlag]").click(function(){
        $("#graphContainer").highcharts("drawCqiGraph",$("input[type=checkbox][name!=checkAll]:checked"),$(this).val());
    });

    /*===============================================================================
     * End For GRAPH
     *==============================================================================*/

    /*===============================================================================
     * For EXCEL
     *==============================================================================*/
    //화면 전체엑셀파일 다운로드
    $("#divSearch button[name=excelDownload]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] = JSON.stringify(window.result);

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTrafficExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                var host = location.href.substring(0,location.href.indexOf("/adcaslte"));
                window.location.href = host+'/adcaslte/'+result.downloadurl;
            }

        },"json");
    });

    //화면 CQI엑셀파일 다운로드
    $("#excelDropDown li[name=downCqiExcel]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] = JSON.stringify(window.result);

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTrafficCQIExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                var host = location.href.substring(0,location.href.indexOf("/adcaslte"));
                window.location.href = host+'/adcaslte/'+result.downloadurl;
            }

        },"json");
    });

    //그래프 CQI엑셀파일 다운로드
    $("#cqiModal button[name=excelDownload]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] =  (function(checkedTR){
            var checkedRows = [];
            checkedTR.each(function(){
                checkedRows.push($(this).parent().parent().data("row"));
            });
            return JSON.stringify({"rows":checkedRows});
        })($("input[type=checkbox][name!=checkAll]:checked"));

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTrafficCQIExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                var host = location.href.substring(0,location.href.indexOf("/adcaslte"));
                window.location.href = host+'/adcaslte/'+result.downloadurl;
            }

        },"json");
    });
    /*===============================================================================
     * End For EXCEL
     *==============================================================================*/

    /*===============================================================================
     * For SCROLL APPEND
     *==============================================================================*/
    $("#divMiddleRight").scroll(function(){
        if($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight())
        {
            appendToTable(function(){}); //callback 필요시 삽입
        }
    });
    /*===============================================================================
     * End For SCROLL APPEND
     *==============================================================================*/

});

/*===============================================================================
 * For SCROLL APPEND
 *
 *==============================================================================*/
function appendToTable(callback){

    $leftTable = $("#tableMiddleLeft tbody");
    $rightTable = $("#tableMiddleRight tbody");

    for(var idx=currentPosition; idx<(currentPosition + appendCount) && idx<result.rows.length; idx++){
        row = result.rows[idx];

        var $tr = $("<tr name='" + row.ROWIDX + "'>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.YMD+"px;'>"+row.YMD +"</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.BTS_NM+"px;'>"
            +"<div style='text-align:center;margin:0px;padding:0px;height:15px;width:99%;overflow-x:hidden;overflow-y:hidden;'>" + row.BTS_NM + "</div>"
            +"</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.CELL_ID+"px;'>"+row.CELL_ID+"</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MCID+"px;'>"+(row.MCID==="T"?"":row.MCID)+"</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.FREQ_KIND+"px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.GRAPH+"px;'>"
            +"<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+row.ROWIDX+"'>"
            +"</td>"
            +"</tr>")
            .data("row",row)
            .appendTo($leftTable);

        $("<tr name='" + row.ROWIDX + "'>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.THROUGHPUT  )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI_AVERAGE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI0_RATE   )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RI_RATE     )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_PRB_RATE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI0_PUCCH )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI1_PUCCH )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI0_PUSCH )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI1_PUSCH )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL)+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>n/a</td>"
            +"<td style='text-align: right;font-size:11px;'>n/a</td>"
            +"</tr>")
            .appendTo($rightTable);

    }

    if (typeof(callback) === 'function') callback();
    window.currentPosition = window.currentPosition + window.appendCount;

}
