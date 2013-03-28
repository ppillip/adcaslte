
var screenMaxRow = 500; //화면에 보일 max tr 수 입니다.

function scrollX() {
    document.all.divTopRight.scrollLeft         = document.all.divBottomRight.scrollLeft;
    document.all.divMiddleRight.scrollLeft      = document.all.divBottomRight.scrollLeft;
    document.all.divTopRightAfter.scrollLeft    = document.all.divBottomRight.scrollLeft;
    document.all.divMiddleRightAfter.scrollLeft = document.all.divBottomRight.scrollLeft;
}

function scrollY() {
    document.all.divMiddleLeft.scrollTop       = document.all.divMiddleRight.scrollTop;
    document.all.divMiddleLeftAfter.scrollTop  = document.all.divMiddleRight.scrollTop;
    document.all.divMiddleRightAfter.scrollTop = document.all.divMiddleRight.scrollTop;
}

function scrollYAfter() {
    document.all.divMiddleLeftAfter.scrollTop = document.all.divMiddleRightAfter.scrollTop;
    document.all.divMiddleLeft.scrollTop      = document.all.divMiddleRightAfter.scrollTop;
    document.all.divMiddleRight.scrollTop     = document.all.divMiddleRightAfter.scrollTop;
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
        window.open('/adcaslte/workgroup/workgroup.jsp','workgroup','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=820,height=700');
    });

    $("#tempsearch").click(function(){
        window.open('/adcaslte/workgroup/workgroup.jsp','tempsearch','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=820,height=700');
    });

    /*===============================================================================
     * For 전기간, 후기간 셋팅
     *==============================================================================*/
    var today = new Date();
    var year  = Number(today.getFullYear());
    var month = Number(today.getMonth())+1;
    month = (month>9)?month:'0'+month;

    for (var i=0; i<3; i++) {
        $("#FROM_YEAR1,#TO_YEAR1,#FROM_YEAR2,#TO_YEAR2").append("<option value='"+(year-i)+"'>" +(year-i)+"</option>");
    }
    for (var i=1; i<=12; i++) {
        $("#FROM_MONTH1,#TO_MONTH1,#FROM_MONTH2,#TO_MONTH2").append("<option value='"+(i>9?i:'0'+i)+"'>" +(i>9?i:'0'+i)+"</option>");
    }
    $("#FROM_MONTH1,#FROM_MONTH2").val(month-1>9?month-1:'0'+(month-1));
    $("#TO_MONTH1,#TO_MONTH2").val(month);
    /*===============================================================================
     * End For 전기간, 후기간 셋팅
     *==============================================================================*/

    /*===============================================================================
     * For Left Title Setting
     *==============================================================================*/
    var topLeftWidth = {
        "BTS_NM"     : "220"
        ,"CELL_ID"   : "35"
        ,"MCID"      : "45"
        ,"FREQ_KIND" : "55"
        ,"GRAPH"     : "30"
    }
    $("#tableTopLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    $("#tableTopLeftAfter tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    /*===============================================================================
     * End For Left Title Setting
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
            window.open("downLinkBySTDCompGraph.jsp","",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
        }

    });

    //For CQI
    $('#cqiModal').on('shown', function () {
        $("#graphContainer").highcharts("drawCqiCompGraph",$("input[type=checkbox][name!=checkAll]:checked"),window.resultAfter.rows,'PDF','',function (cqiBeforeExcelData,cqiAfterExcelData) {
            window.cqiBeforeExcelData = cqiBeforeExcelData;
            window.cqiAfterExcelData  = cqiAfterExcelData;
        });
    });

    //For CQI
    $("#cqiModal input[name=cqiFlag]").click(function(){
        $("#graphContainer").highcharts("drawCqiCompGraph",$("input[type=checkbox][name!=checkAll]:checked"),window.resultAfter.rows,$(this).val(),'',function (cqiBeforeExcelData,cqiAfterExcelData) {
            window.cqiBeforeExcelData = cqiBeforeExcelData;
            window.cqiAfterExcelData  = cqiAfterExcelData;
        });
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

        param["JSONDATA"]  = JSON.stringify(window.result);
        param["JSONDATA2"] = JSON.stringify(window.resultAfter);

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTrafficCompExcelDownload", param, function(result,stat){

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
        param["JSONDATA"]  = JSON.stringify(window.result);
        param["JSONDATA2"] = JSON.stringify(window.resultAfter);

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTrafficCompCQIExcelDownload", param, function(result,stat){

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
        param["JSONDATA"]  = JSON.stringify(window.cqiBeforeExcelData);
        param["JSONDATA2"] = JSON.stringify(window.cqiAfterExcelData);

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTrafficCompCQIExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                var host = location.href.substring(0,location.href.indexOf("/adcaslte"));
                window.location.href = host+'/adcaslte/'+result.downloadurl;
            }

        },"json");
    });
    /*===============================================================================
     * For EXCEL
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

        var btn = $(this);
        btn.button('loading');

        //Before
        var param = parseParam(this);
        param["FROMYMD"] = param["FROM_YEAR1"]+param["FROM_MONTH1"];
        param["TOYMD"]   = param["TO_YEAR1"]+param["TO_MONTH1"];
        window.result = null;
        toggleProgress('show','progress_result','300px');
        getData(param, $("#tableMiddleLeft tbody"), $("#tableMiddleRight tbody"), topLeftWidth, function (_result) {
            window.result = _result;
            if(_result.error || _result.rows.length === 0){
                toggleProgress('message','progress_result',_result.msg);
                if(window.resultAfter) btn.button('reset');
                return;
            }
            toggleProgress('hide','progress_result');
            if(window.resultAfter) btn.button('reset');
        });
        //After
        var param2 = param;
        param2["FROMYMD"] = param["FROM_YEAR2"]+param["FROM_MONTH2"];
        param2["TOYMD"]   = param["TO_YEAR2"]+param["TO_MONTH2"];
        window.resultAfter = null;
        toggleProgress('show','progress_resultAfter','560px');
        getData(param2, $("#tableMiddleLeftAfter tbody"), $("#tableMiddleRightAfter tbody"), topLeftWidth, function (_result) {
            window.resultAfter = _result;
            if(_result.error || _result.rows.length === 0){
                toggleProgress('message','progress_resultAfter',_result.msg);
                if(window.result) btn.button('reset');
                return;
            }
            toggleProgress('hide','progress_resultAfter');
            if(window.result) btn.button('reset');
        });

    });
    /*===============================================================================
     * End For SEARCH
     *==============================================================================*/

});

/*===============================================================================
 * Search Data
 *
 *==============================================================================*/
function getData(param, $leftTable, $rightTable, topLeftWidth, callback) {

    jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTraffic",param,function(result,stat){

        $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

        if(result.error || result.rows.length===0){
            callback(result);
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
                +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.BTS_NM+"px;'>"+row.BTS_NM + "</td>"
                +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.CELL_ID+"px;'>"+row.CELL_ID+"</td>"
                +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MCID+"px;'>"+(row.MCID==="T"?"":row.MCID)+"</td>"
                +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.FREQ_KIND+"px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
                +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.GRAPH+"px;'>"
                + (function(_idx, _row){
                if ($rightTable.parent().attr("id").match(/After/g)) {
                    return "&nbsp;";
                } else {
                    return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+_row.ROWIDX+"'>";
                }
            })(idx, row)
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
                +"<td style='text-align: right;font-size:11px;'>"+isUndifined(row.CHNL_TYPE,"-") +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CHNL_COUNT).replace(".0","") +"</td>"

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
        var statsArray = getStatsArray(propertiesArray);

        for(var i=0; i < 4; i++) {
            var title = "";
            if(i === 0) {
                title = '전체평균';
            } else if(i === 1) {
                title = '최대값';
            } else if(i === 2) {
                title = '최소값';
            } else if(i === 3) {
                title = '표준편차';
            }

            $("<tr>"
                + "<td style='width: "+topLeftWidth.BTS_NM+"px;'></td>"
                + "<td style='width: "+topLeftWidth.CELL_ID+"px;'></td>"
                + "<td style='width: "+topLeftWidth.MCID+"px;'></td>"
                + "<td style='text-align:center; width: "+topLeftWidth.FREQ_KIND+"px;'>"+title+"</td>"
                + "<td style='width: "+topLeftWidth.GRAPH+"px;'></td>"
                + "</tr>")
                .appendTo($leftTable);

            $("<tr>"
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
                +"<td style='text-align: right;font-size:11px;'>"+ "-" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CHNL_COUNT).replace(".0","") +"</td>"
                +"</tr>")
                .appendTo($rightTable);
        }

        callback(result);

    },"json");

}