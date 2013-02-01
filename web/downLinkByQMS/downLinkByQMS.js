
var screenMaxRow = 500; //화면에 보일 max tr 수 입니다.

function scrollX() {
    document.all.divTopRight.scrollLeft = document.all.divBottomRight.scrollLeft;
    document.all.divMiddleRight.scrollLeft = document.all.divBottomRight.scrollLeft;
}

function scrollY() {
    document.all.divMiddleLeft.scrollTop = document.all.divMiddleRight.scrollTop;
}

$(document).ready(function(){

    //GRAPH ALL Check
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
    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();

    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker01').datepicker('hide');
    });
    $('#datepicker02').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker02').datepicker('hide');
    });
/*===============================================================================
 * End For 기간
 *==============================================================================*/

/*===============================================================================
* For Left Title Setting
*==============================================================================*/
    var topLeftWidth = {
        "YMD"         : "60"
        ,"BTS_NM"     : "220"
        ,"CELL_ID"    : "35"
        ,"MCID"       : "45"
        ,"FREQ_KIND"  : "55"
        ,"GRAPH"      : "50"
    }
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

        jQuery.post("/adcaslte/svc/DownLinkByQMS-selectCellTraffic",param,function(result,stat){

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

            //윈도우에 서버로 부터 온 데이터 버퍼링
            window.result = result;

            $leftTable = $("#tableMiddleLeft tbody");
            $rightTable = $("#tableMiddleRight tbody");
            $bottomRightTable = $("#tableBottomRight");

            if(result.error || result.rows.length === 0){
                btn.button('reset');
                alert(result.msg);
                $(document).trigger('ajaxError');
                return;
            }

            //각항목 배열
            var propertiesArray = {};
            //for 문으로 튜닝한다
            for(idx=0;idx<result.rows.length;idx++){
                row = result.rows[idx];

                //각 항목별 배열만들기
                propertiesArray = getPropertiesArray(row,propertiesArray);

                var $tr = $("<tr name='" + row.ROWIDX + "'>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.YMD+"px;'>"+row.YMD +"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.BTS_NM+"px;'>"+row.BTS_NM + "</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.CELL_ID+"px;'>"+row.CELL_ID+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MCID+"px;'>"+(row.MCID==="T"?"":row.MCID)+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.FREQ_KIND+"px;'>"+row.FREQ_KIND+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.GRAPH+"px;'>"
                    + (function(_idx, _row){
                        return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+_row.ROWIDX+"'>";
                    })(idx, row)
                    +"</td>"
                    +"</tr>")
                    .data("row",row)
                    .appendTo($leftTable);

                $("<tr name='" + row.ROWIDX + "'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_TPUT     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.UL_TPUT     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RANK_INDEX  )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSRP_AVERAGE)+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.SINR_AVERAGE)+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSRQ_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TXPW_PUCCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI0_RATE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_PRB_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI0_PUCCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI1_PUCCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI0_PUSCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI1_PUSCH )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"</tr>")
                    .appendTo($rightTable);

                if(idx===screenMaxRow){
                    if(!confirm( "500건 이상 화면에 로딩할경우 브라우져가 느려질수 있습니다." +
                        "\n\n그래도 계속 하시겠습니까? [" + idx + "/" + result.rows.length + "]"
                        +"\n\n확인 : 계속진행    취소 : 현재에서 로딩멈춤"
                        +"\n\n('취소'를 클릭 하셔도 EXCEL 다운로드는 전체가 가능합니다.)"  ))
                    {
                        break;
                    }else{
                        continue;
                    }
                }
            }

            //각항목 배열 통계
            //var statsArray = getStatsArray(propertiesArray);

            getStatsArray(propertiesArray,function (statsArray) {
                for(var i=0; i < 4; i++) {
                    $("tbody tr:first",$bottomRightTable).remove();
                    $("<tr class='info'>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_TPUT     )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].UL_TPUT     )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI_AVERAGE )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RANK_INDEX  )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].MCS_AVERAGE )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSRP_AVERAGE)+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].SINR_AVERAGE)+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSRQ_AVERAGE )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].TXPW_PUCCH )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI0_RATE )+"</td>"
                        +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_PRB_RATE)+ "</td>"
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

            });

        },"json");
    });
/*===============================================================================
 * End For SEARCH
 *==============================================================================*/

/*===============================================================================
 * For GRAPH
 *==============================================================================*/

    $("#graphDropDown li[name=showCqiModal],#graphDropDown li[name=showThrpGraph],#graphDropDown li[name=showHistogram]").click(function(){
        var checkedList = $("input[type=checkbox][name!=checkAll]:checked");
        if( checkedList.length === 0 ) {
            alert("Cell 을 선택해 주세요");
            return ;
        }

        var name = $(this).attr("name");
        //For CQI
        if (name === 'showCqiModal') {
            $('#cqiModal').modal('show');
        //For 용량그래프
        } else if (name === 'showThrpGraph') {
            window.open("downLinkByQMSGraph.jsp","showThrpGraph",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
        //For HISTOGRAM
        } else if (name === 'showHistogram') {
            window.open("downLinkByQMSGraph.jsp","showHistogram",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
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

        jQuery.post("/adcaslte/svc/DownLinkByQMS-selectCellTrafficExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                window.location.href=result.downloadurl;
            }

        },"json");
    });

    //화면 CQI엑셀파일 다운로드
    $("#excelDropDown li[name=downCqiExcel]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] = JSON.stringify(window.result);

        jQuery.post("/adcaslte/svc/DownLinkByQMS-selectCellTrafficCQIExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                window.location.href=result.downloadurl;
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
                window.location.href=result.downloadurl;
            }

        },"json");
    });
/*===============================================================================
 * End For EXCEL
 *==============================================================================*/

});