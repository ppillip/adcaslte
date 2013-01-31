
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
    } else if (SEARCHTYPE === 'PART') {
        var $bonbuCD = $opener.find("#BONBU_CD");
        var $teamCD  = $opener.find("#OPER_TEAM_CD");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#partLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$teamCD.find("option:selected").text()+"</span>");
    } else if (SEARCHTYPE === 'CITY') {
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#cityLabel").text()+"</span>");
    } else if (SEARCHTYPE === 'UNI') {
        var $city = $opener.find("#CITY");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#uniLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$city.find("option:selected").text()+"</span>");
    } else if (SEARCHTYPE === 'EMS') {
        var $mmeGrpID = $opener.find("#MME_GRP_ID");
        var $neID = $opener.find("#NE_ID");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$opener.find("#emsLabel").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$mmeGrpID.find("option:selected").text()+"</span>");
        $("#SEARCHTYPE_NAME").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+$neID.find("option:selected").text()+"</span>");
    }
/*===============================================================================
 * End For 조회대상 셋팅
 *==============================================================================*/

/*===============================================================================
 * For 기간 셋팅
 *==============================================================================*/
    var termType = $opener.find("input[name=TERMTYPE]:checked").val();
    var fromYMD1 = $opener.find("#FROMYMD").val();
    var toYMD1   = $opener.find("#TOYMD").val()
    var fromYMD2 = $opener.find("#FROMYMD2").val();
    var toYMD2   = $opener.find("#TOYMD2").val()
    if (termType === 'DAY') {
        fromYMD1 = fromYMD1.substring(0,4)+"."+fromYMD1.substring(4,6)+"."+fromYMD1.substring(6,8);
        toYMD1   = toYMD1.substring(0,4)+"."+toYMD1.substring(4,6)+"."+toYMD1.substring(6,8);
        fromYMD2 = fromYMD2.substring(0,4)+"."+fromYMD2.substring(4,6)+"."+fromYMD2.substring(6,8);
        toYMD2   = toYMD2.substring(0,4)+"."+toYMD2.substring(4,6)+"."+toYMD2.substring(6,8);
        $("#BEFOREYMD").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+fromYMD1+" ~ "+toYMD1+"</span>");
        $("#AFTERYMD").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+fromYMD2+" ~ "+toYMD2+"</span>");
    } else if (termType === 'MON') {
        fromYMD1 = fromYMD1.substring(0,4)+"."+fromYMD1.substring(4,6);
        toYMD1   = toYMD1.substring(0,4)+"."+toYMD1.substring(4,6);
        fromYMD2 = fromYMD2.substring(0,4)+"."+fromYMD2.substring(4,6);
        toYMD2   = toYMD2.substring(0,4)+"."+toYMD2.substring(4,6);
        $("#BEFOREYMD").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+fromYMD1+" ~ "+toYMD1+"</span>");
        $("#AFTERYMD").append("<span class='label' style='font-size: 13px;margin-left:5px'>"+fromYMD2+" ~ "+toYMD2+"</span>");
    }
/*===============================================================================
 * End For 기간 셋팅
 *==============================================================================*/

/*===============================================================================
 * For GRAPH
 *==============================================================================*/
    var $checkedList = $opener.find("input[type=checkbox][name!=checkAll]:checked");

    var rows = $.map($checkedList,function (element,index) {

        return window.opener.$(element).parents("tr:first").data("row");

    });

    $("#graphContainer").highcharts("drawThrpCompGraph",rows,opener.window.resultAfter.rows,function (thrpCompData) {
        window.thrpCompData = thrpCompData;
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
        param["FROMYMD"] = fromYMD1+" ~ "+toYMD1;
        param["TOYMD"] = fromYMD2+" ~ "+toYMD2;
        param["JSONDATA"]  = JSON.stringify(window.thrpCompData);

        jQuery.post("/adcaslte/svc/DownLinkByNMSStats-selectCellTrafficStatsThrpCompGraphExcelDownload", param, function(result,stat){

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