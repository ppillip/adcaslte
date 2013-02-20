$(document).ajaxStart(function(){
    $("<div id='t_progress' style='position: absolute;top:340px;left:500px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>").appendTo("body");
}).ajaxComplete(function(){
    $("#t_progress").remove();
}).ajaxError(function(){
    $("#t_progress").remove();
});

$(document).ready(function(){

    window.$opener = $(opener.document);

/*===============================================================================
 * For 조회대상 셋팅
 *==============================================================================*/

    //$("#WORKGROUP_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#WORKGROUP_NAME").val()+"</span>");
    $("#DUIDs").val((function ($checkedList){
        var duids = $.map($checkedList,function (element,index) {
            var _data = window.opener.$(element).parents("tr:first").data("row");
            if(index==0){ $("#WORKGROUP_NAME").html(_data.BTS_NM + " 외"); }
            return _data.C_UID+'_'+_data.INGR_ERP_CD+'_'+_data.CELL_ID+'_'+_data.MCID+'_'+_data.FREQ_KIND;
        });
        return duids.join("|");
    })($opener.find("input[type=checkbox][name!=checkAll]:checked")));

/*===============================================================================
 * End For 조회대상 셋팅
 *==============================================================================*/
    $("input[type=radio][name=DAYTIME_SEQ][value="+$(opener.document).find("input[type=radio][name=DAYTIME_SEQ]:checked").val()
                                                         +"]").attr('checked',"checked");
    $("input[type=radio][name=VIEWTYPE][value="+$(opener.document).find("input[type=radio][name=VIEWTYPE]:checked").val()
                                                         +"]").attr('checked',"checked");
    $("select[name=MBTYPE]").val( $(opener.document).find("select[name=MBTYPE]").val()  );

/*===============================================================================
 * For 보기방식, 그래프타입 셋팅
 *==============================================================================*/
    $("input[value="+$opener.find("input[name=VIEWTYPE]:checked").val()+"]").attr("checked","checked");
    var chart = location.search.substring(location.search.indexOf('=')+1);
    if (chart === 'showThrpGraph') {
        $("input[name=CHARTTYPE][value=THROUGHPUT]").attr("checked","checked");
    } else if (chart === 'showHistogram') {
        $("input[name=CHARTTYPE][value=HISTOGRAM]").attr("checked","checked");
    }

/*===============================================================================
 * End For 보기방식, 그래프타입 셋팅
 *==============================================================================*/

/*===============================================================================
 * For 기간 셋팅
 *==============================================================================*/
    //기간 셋팅
    $("#datepicker01").val($(opener.document).find("#datepicker01").val() )
    .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        var termType = $("input[name=TERMTYPE]:checked").val();
        if (termType === 'DAY') {
            $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
        } else if (termType === 'WK') {
            $("input[name=FROMYMD]").val(getSunday($("#datepicker01").val()).replace(/-/gi,''));
            $("#fromto").text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
        }
        $('#datepicker01').datepicker('hide');
    });
    $("#datepicker02").val($(opener.document).find("#datepicker02").val() )
    .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        var termType = $("input[name=TERMTYPE]:checked").val();
        if (termType === 'DAY') {
            $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));
        } else if (termType === 'WK') {
            $("input[name=TOYMD]").val(getSaturday($("#datepicker02").val()).replace(/-/gi,''));
            $("#fromto").text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
        }
        $('#datepicker02').datepicker('hide');
    });
    $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
    $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));
/*===============================================================================
 * End For 기간 셋팅
 *==============================================================================*/

/*===============================================================================
 * For GRAPH
 *==============================================================================*/
    //그래프 선택시 이벤트 설정
    $("input[name=CHARTTYPE]").click(function () {
        if (this.value === 'THROUGHPUT') {
            $("#graphContainer").highcharts("drawThrpGraph",window.result.rows,'THROUGHPUT');
        } else if (this.value === 'HISTOGRAM') {
            $("#graphContainer").highcharts("drawHistogram",window.result.rows,function(histogramData){
                window.histogramData = histogramData;
            },'THROUGHPUT');
        }
    });

/*===============================================================================
 * End For GRAPH
 *==============================================================================*/

/*===============================================================================
 * For SEARCH
 *==============================================================================*/
    $("#searchBtn").click(function(){

        var param = parseParam(this);
        param["SEARCHTYPE"] = 'CELLLIST';
        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTraffic",param,function(result,stat){

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
                $("#graphContainer").highcharts("drawThrpGraph",result.rows,'THROUGHPUT');
            } else if (chartType === 'HISTOGRAM') {
                $("#graphContainer").highcharts("drawHistogram",result.rows,function(histogramData){
                    window.histogramData = histogramData;
                },'THROUGHPUT');
            }

        },"json");
    });

    //최초 호출시 조회버튼 이벤트 실행
    $("#searchBtn").trigger('click');

    //통계주기 변경시
    $("input[name=TERMTYPE]").click(function (event) {
        $("[group=TERMTYPE]").hide();

        if (this.value === 'DAY') {
            $('#datepicker01').show();
            $('#dash').show();
            $('#datepicker02').show();
            $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
            $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));
        } else if (this.value === 'WK') {
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
 * For EXCEL
 *==============================================================================*/
    $("#divSearch button[name=excelDownload]").click(function(){

        var param = parseParam(this);
        var url = "";
        var chartType = $("input[name=CHARTTYPE]:checked").val();
        if (chartType === 'THROUGHPUT') {
            param["JSONDATA"] = JSON.stringify(window.result);
            url = "/adcaslte/svc/DownLinkByNMS-selectCellTrafficExcelDownload";
        } else if (chartType === 'HISTOGRAM') {
            param["JSONDATA"] = JSON.stringify(window.histogramData);
            url = "/adcaslte/svc/DownLinkByNMS-selectCellTrafficHistogramExcelDownload";
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