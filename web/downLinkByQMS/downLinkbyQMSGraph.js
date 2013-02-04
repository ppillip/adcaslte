$(document).ajaxStart(function(){
    $("<div id='t_progress' style='position: absolute;top:340px;left:500px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>").appendTo("body");
}).ajaxComplete(function(){
    $("#t_progress").remove();
}).ajaxError(function(){
    $("#t_progress").remove();
});

$(document).ready(function(){

    var $opener = $(opener.document);

/*===============================================================================
 * For 조회대상 셋팅
 *==============================================================================*/

    $("#WORKGROUP_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#WORKGROUP_NAME").val()+"</span>");
    $("#DUIDs").val((function ($checkedList){
        var duids = $.map($checkedList,function (element,index) {
            var _data = window.opener.$(element).parents("tr:first").data("row");
            return _data.C_UID+'_'+_data.INGR_ERP_CD+'_'+_data.CELL_ID+'_'+_data.MCID+'_'+_data.FREQ_KIND;
        });
        return duids.join("|");
    })($opener.find("input[type=checkbox][name!=checkAll]:checked")));

/*===============================================================================
 * End For 조회대상 셋팅
 *==============================================================================*/

/*===============================================================================
 * For 시간대, 최번기준, 통계주기, 주파수, 보기방식 셋팅
 *==============================================================================*/
    $("input[value="+$opener.find("input[name=VIEWTYPE]:checked").val()+"]").attr("checked","checked");

/*===============================================================================
 * End For 통계주기, 시간대, 최번기준, 주파수, 보기방식 셋팅
 *==============================================================================*/

/*===============================================================================
 * For 기간 셋팅
 *==============================================================================*/
    //기간 셋팅
    $('#datepicker01').val($opener.find("#datepicker01").val())
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker01').datepicker('hide');
    });
    $('#datepicker02').val($opener.find("#datepicker02").val())
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker02').datepicker('hide');
    });

/*===============================================================================
 * End For 기간 셋팅
 *==============================================================================*/

/*===============================================================================
 * For GRAPH
 *==============================================================================*/
    //그래프 선택시 이벤트 설정
    $("input[name=CHARTTYPE]").click(function () {
        if (this.value === 'THROUGHPUT') {
            $("#graphContainer").highcharts("drawThrpGraph",window.result.rows,'DL_TPUT');
        } else if (this.value === 'HISTOGRAM') {
            $("#graphContainer").highcharts("drawHistogram",window.result.rows,function(histogramData){
                window.histogramData = histogramData;
            },'DL_TPUT');
        }
    });

/*===============================================================================
 * End For GRAPH
 *==============================================================================*/

/*===============================================================================
 * For SEARCH
 *==============================================================================*/
    $("#searchBtn").click(function(){

        if(!$("#WORKGROUP_NAME").text()) {
            alert('조회대상이 선택되지 않았습니다.');
            return false;
        }

        var param = parseParam(this);

        jQuery.post("/adcaslte/svc/DownLinkByQMS-selectCellTraffic",param,function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
                $(document).trigger('ajaxError');
                return;
            }

            if(!result.rows || result.rows.length === 0){
                alert("조회결과가 없습니다.");
                $(document).trigger('ajaxError');
                return;
            }

            window.result = result;

            var chartType = $("input[name=CHARTTYPE]:checked").val();
            if (chartType === 'THROUGHPUT') {
                $("#graphContainer").highcharts("drawThrpGraph",result.rows,'DL_TPUT');
            } else if (chartType === 'HISTOGRAM') {
                $("#graphContainer").highcharts("drawHistogram",result.rows,function(histogramData){
                    window.histogramData = histogramData;
                },'DL_TPUT');
            }

        },"json");
    });

    //최초 호출시 조회버튼 이벤트 실행
    $("#searchBtn").trigger('click');

/*===============================================================================
 * For SEARCH
 *==============================================================================*/

/*===============================================================================
 * For EXCEL
 *==============================================================================*/
    //화면 전체엑셀파일 다운로드
    $("#divSearch button[name=excelDownload]").click(function(){

        var param = parseParam(this);
        var url = "";
        var chartType = $("input[name=CHARTTYPE]:checked").val();
        if (chartType === 'THROUGHPUT') {
            param["JSONDATA"] = JSON.stringify(window.result);
            url = "/adcaslte/svc/DownLinkByQMS-selectCellTrafficStatsExcelDownload";
        } else if (chartType === 'HISTOGRAM') {
            param["JSONDATA"] = JSON.stringify(window.histogramData);
            url = "/adcaslte/svc/DownLinkByQMS-selectCellTrafficStatsHistogramExcelDownload";
        }

        jQuery.post(url, param, function(result,stat){

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

});