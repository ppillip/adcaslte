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
    $("#FROMYMD").val($opener.find("#FROMYMD").val());
    $("#TOYMD").val($opener.find("#TOYMD").val());
    $("select[name=MBTYPE]").val($opener.find("select[name=MBTYPE]").val());
    $("input[value="+$opener.find("input[name=TERMTYPE]:checked").val()+"]").attr("checked","checked");
    $("input[value="+$opener.find("input[name=DAYTIME_SEQ]:checked").val()+"]").attr("checked","checked");
    $("input[value="+$opener.find("input[name=VIEWTYPE]:checked").val()+"]").attr("checked","checked");

/*===============================================================================
 * End For 통계주기, 시간대, 최번기준, 주파수, 보기방식 셋팅
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
        $("input[name=FROMYMD]").val(getSunday($("#datepicker01").val()).replace(/-/gi,''));
        $("#fromto").text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
        $('#datepicker01').datepicker('hide');
    });
    $('#datepicker02').val($opener.find("#datepicker02").val()||_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $("input[name=TOYMD]").val(getSaturday($("#datepicker02").val()).replace(/-/gi,''));
        $("#fromto").text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
        $('#datepicker02').datepicker('hide');
    });

    //월간 기간 셋팅
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
    $("#fromYear").val($opener.find("#fromYear").val()||year);
    $("#toYear").val($opener.find("#toYear").val()||year);
    $("#fromMonth").val($opener.find("#fromMonth").val()||month);
    $("#toMonth").val($opener.find("#toMonth").val()||month);
    $("#fromYear,#toYear,#fromMonth,#toMonth").change(function () {
        $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
        $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());
    });

    //최초 기간 셋팅
    var termType = $("input[name=TERMTYPE]:checked").val();
    setFromTo(termType);
    //통계주기 변경시 기간 셋팅
    $("input[name=TERMTYPE]").click(function (event) {
        setFromTo(this.value);
    });
    //기간 셋팅
    function setFromTo(termType) {
        $("[group=TERMTYPE]").hide();

        if (termType === 'WK') {
            $('#datepicker01').show();
            $('#dash').show();
            $('#datepicker02').show();
            $('#fromto').show().text('[ '+getSunday($("#datepicker01").val())+' ~ '+getSaturday($("#datepicker02").val())+' ]');
            $("input[name=FROMYMD]").val(getSunday($("#datepicker01").val()).replace(/-/gi,''));
            $("input[name=TOYMD]").val(getSaturday($("#datepicker02").val()).replace(/-/gi,''));
        } else if (termType === 'MON') {
            $('#fromYear').show();
            $('#fromMonth').show();
            $('#toYear').show();
            $('#toMonth').show();
            $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
            $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());
        }
    }
/*===============================================================================
 * End For 기간 셋팅
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

        jQuery.post("/adcaslte/svc/DownLinkBySTD-selectCellTraffic",param,function(result,stat){

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

            $("#graphContainer").highcharts("drawThrpGraph",result.rows);

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

/*===============================================================================
 * End For EXCEL
 *==============================================================================*/

});