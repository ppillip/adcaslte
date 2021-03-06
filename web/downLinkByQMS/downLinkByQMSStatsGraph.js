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
    var SEARCHTYPE = $opener.find("#SEARCHTYPE").val();
    $("#SEARCHTYPE").val(SEARCHTYPE);

    if(SEARCHTYPE === 'BONBU') {
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#bonbuLabel").text()+"</span>");
    } else if (SEARCHTYPE === 'TEAM') {
        var $bonbuCD = $opener.find("#BONBU_CD");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#teamLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$bonbuCD.find("option:selected").text()+"</span>");
        $("#BONBU_CD").val($bonbuCD.val());
    } else if (SEARCHTYPE === 'PART') {
        var $bonbuCD = $opener.find("#BONBU_CD");
        var $teamCD  = $opener.find("#OPER_TEAM_CD");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#partLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$teamCD.find("option:selected").text()+"</span>");
        $("#BONBU_CD").val($bonbuCD.val());
        $("#OPER_TEAM_CD").val($teamCD.val());
    } else if (SEARCHTYPE === 'CITY') {
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#cityLabel").text()+"</span>");
    } else if (SEARCHTYPE === 'UNI') {
        var $city = $opener.find("#CITY");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#uniLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$city.find("option:selected").text()+"</span>");
        $("#CITY").val($city.val());
    } else if (SEARCHTYPE === 'EMS') {
        var $mmeGrpID = $opener.find("#MME_GRP_ID");
        var $neID = $opener.find("#NE_ID");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#emsLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$mmeGrpID.find("option:selected").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$neID.find("option:selected").text()+"</span>");
        $("#MME_GRP_ID").val($mmeGrpID.val());
        $("#NE_ID").val($neID.val());
    }
/*===============================================================================
 * End For 조회대상 셋팅
 *==============================================================================*/

/*===============================================================================
 * For 보기방식, 그래프 타입 셋팅
 *==============================================================================*/
    $("input[value="+$opener.find("input[name=VIEWTYPE]:checked").val()+"]").attr("checked","checked");

    var chart = location.search.substring(location.search.indexOf('=')+1);
    if (chart === 'showThrpGraph') {
        $("input[name=CHARTTYPE][value=THROUGHPUT]").attr("checked","checked");
    } else if (chart === 'showHistogram') {
        $("input[name=CHARTTYPE][value=HISTOGRAM]").attr("checked","checked");
    }

/*===============================================================================
 * End For 보기방식, 그래프 타입 셋팅
 *==============================================================================*/

/*===============================================================================
 * For 기간 셋팅
 *==============================================================================*/
    //일간, 주간 기간 셋팅
    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();
    $('#datepicker01').val($opener.find("#datepicker01").val()||_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker01').datepicker('hide');
    });
    $('#datepicker02').val($opener.find("#datepicker02").val()||_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker02').datepicker('hide');
    });

/*===============================================================================
 * End For 기간 셋팅
 *==============================================================================*/

/*===============================================================================
 * For Sub Group 셋팅
 *==============================================================================*/
    var $checkedList = $opener.find("input[type=checkbox][name!=checkAll]:checked");

    var subList = $.map($checkedList,function (element,index) {

        var _data = window.opener.$(element).parents("tr:first").data("row");
        if (SEARCHTYPE === 'BONBU') {
            return _data.BONBU_CD+'_'+_data.FREQ_KIND;
        } else if (SEARCHTYPE === 'TEAM') {
            return _data.OPER_TEAM_CD+'_'+_data.FREQ_KIND;
        } else if (SEARCHTYPE === 'PART') {
            return _data.PART_CD+'_'+_data.FREQ_KIND;
        } else if (SEARCHTYPE === 'CITY') {
            return _data.CITY_CD+'_'+_data.FREQ_KIND;
        } else if (SEARCHTYPE === 'UNI') {
            return _data.UNI+'_'+_data.FREQ_KIND;
        } else if (SEARCHTYPE === 'EMS') {
            return _data.NE_ID+'_'+_data.FREQ_KIND;
        }
    });

/*===============================================================================
 * End For Sub Group 셋팅
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

        if(!$("#SEARCHTYPE").val()) {
            alert('조회대상이 선택되지 않았습니다.');
            return false;
        }

        var param = parseParam(this);

        param["SUBLIST"] = subList.join("|");

        jQuery.post("/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStats",param,function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }

            if(result.rows.length===0){
                alert("조회결과가 없습니다.");
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
            url = "/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStatsExcelDownload";
        } else if (chartType === 'HISTOGRAM') {
            param["JSONDATA"] = JSON.stringify(window.histogramData);
            url = "/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStatsHistogramExcelDownload";
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