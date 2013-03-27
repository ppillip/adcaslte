//For Scroll Append
var currentPosition = 0;
var appendCount = 20;

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

    /*===============================================================================
     * For 기간
     *==============================================================================*/
    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();

    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    )
        .on('changeDate', function(){
            $('#datepicker01').datepicker('hide');
        });
    $('#datepicker02').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    )
        .on('changeDate', function(){
            $('#datepicker02').datepicker('hide');
        });
    /*===============================================================================
     * End For 기간
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
            window.open("downLinkByQMSStatsGraph.jsp?chart=showThrpGraph","",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
            //For HISTOGRAM
        } else if (name === 'showHistogram') {
            window.open("downLinkByQMSStatsGraph.jsp?chart=showHistogram","",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
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

        jQuery.post("/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStatsExcelDownload", param, function(result,stat){

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
        param["SEARCHTYPE"] = window.result.SEARCHTYPE;
        jQuery.post("/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStatsCQIExcelDownload", param, function(result,stat){

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
        param["SEARCHTYPE"] = window.result.SEARCHTYPE;

        jQuery.post("/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStatsCQIExcelDownload", param, function(result,stat){

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
     * For SEARCH
     *==============================================================================*/
    $("#divSearch button[name=search]").click(function(){

        $("div[name=divMiddleLeft] table tbody tr").remove();
        $("div[name=divMiddleRight] table tbody tr").remove();

        $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        var btn = $(this);
        btn.button('loading');

        var param = parseParam(this);

        window.currentPosition = 0;
        jQuery.post("/adcaslte/svc/DownLinkByQMSStats-selectCellTrafficStats",param,function(result,stat){

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

            //윈도우에 서버로 부터 온 데이터 버퍼링
            window.result = result;

            if(result.error || result.rows.length === 0){
                btn.button('reset');
                alert(result.msg);
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
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_TPUT     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].UL_TPUT     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RANK_INDEX  )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].MCS_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSRP_AVERAGE)+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSSI_AVERAGE)+"</td>"
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
//                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
//                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
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
     * For 조회대상
     *==============================================================================*/
    //조회대상 : 본부별
    $("#searchDropDown li[name=bonbuSearch]").click(function(event){
        preventDefault(event);
        $("[group=searchSelect]").hide();
        var $bonbuLabel = $("#bonbuLabel");
        $bonbuLabel.show();
        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").html("본부");
        $("#SEARCHTYPE").val("BONBU");
        setLeft(1);

    });

    //조회대상 : 팀별
    $("#searchDropDown li[name=teamSearch]").click(function(event){
        preventDefault(event);
        $("[group=searchSelect]").hide();
        var $teamLabel = $("#teamLabel");
        var $bonbuSelect = $("#BONBU_CD");
        $teamLabel.show();
        $bonbuSelect.show();

        setBonbuList($bonbuSelect,true); //true : all 보이도록..

        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").text("본부");
        $("[group=title02]").show();
        $("#title02").text("팀");
        $("#SEARCHTYPE").val("TEAM");
        setLeft(2);

    });

    $("#BONBU_CD").change(function(){
        setOperTeamList($("#OPER_TEAM_CD"),true,this.value); //true : all 보이도록..); //false : all 보이지 않도록..
    });

    //조회대상 : 파트별
    $("#searchDropDown li[name=partSearch]").click(function(event){
        preventDefault(event);
        $("[group=searchSelect]").hide();
        var $partLabel = $("#partLabel");
        var $bonbuSelect = $("#BONBU_CD");
        var $teamSelect = $("#OPER_TEAM_CD");
        $partLabel.show();
        $bonbuSelect.show();
        $teamSelect.show();

        setBonbuList($bonbuSelect,false,setOperTeamList,$teamSelect); //true : all 보이도록..); //false : all 보이지 않도록..

        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").text("본부");
        $("[group=title02]").show();
        $("#title02").text("팀");
        $("[group=title03]").show();
        $("#title03").text("파트");
        $("#SEARCHTYPE").val("PART");
        setLeft(3);

    });

    //조회대상 : 도/특별/광역별
    $("#searchDropDown li[name=citySearch]").click(function(event){
        preventDefault(event);
        $("[group=searchSelect]").hide();
        var $cityLabel = $("#cityLabel");
        $cityLabel.show();

        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").text("도/특별/광역");
        $("#SEARCHTYPE").val("CITY");
        setLeft(1);

    });

    //조회대상 : 시/군/구
    $("#searchDropDown li[name=uniSearch]").click(function(event){
        preventDefault(event);
        $("[group=searchSelect]").hide();
        var $uniLabel = $("#uniLabel");
        var $citySelect = $("#CITY");
        $uniLabel.show();
        $citySelect.show();

        setCityList($citySelect,true); //true : all 보이도록..

        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").text("도/특별/광역");
        $("[group=title02]").show();
        $("#title02").text("시/군/구");
        $("#SEARCHTYPE").val("UNI");
        setLeft(2);

    });

    //조회대상 : EMS별
    $("#searchDropDown li[name=emsSearch]").click(function(event){
        preventDefault(event);
        $("[group=searchSelect]").hide();
        var $emsLabel = $("#emsLabel");
        var $mmeSelect = $("#MME_GRP_ID");
        var $neSelect = $("#NE_ID");
        $emsLabel.show();
        $mmeSelect.show();
        $neSelect.show();

        setMMEList($mmeSelect,true,setNEList,$neSelect); //true : all 보이도록..); //false : all 보이지 않도록..

        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").html("MME<br>Group");
        $("[group=title02]").show();
        $("#title02").text("EMS");
        $("#SEARCHTYPE").val("EMS");
        setLeft(2);

    });

    $("#MME_GRP_ID").change(function(){
        setNEList($("#NE_ID"),true,this.value); //true : all 보이도록..); //false : all 보이지 않도록..
    });

    /*===============================================================================
     * End For 조회대상
     *==============================================================================*/

});

/*===============================================================================
 * Left Title & Data View Setting
 *
 *==============================================================================*/
function setLeft(depth) {
    var leftWidth = (depth * 100) + 70 + 70 + 30; //날짜, 주파수, 그래프

    $("#tableTopLeft").css("width",leftWidth);
    $("#tableMiddleLeft").css("width",leftWidth);
    $("#tableBottomLeft").css("width",leftWidth);

    $("#tableTopLeft").unwrap();
    $("#tableTopLeft").wrap("<div name='divTopLeft' id='divTopLeft'></div>");
    $("#tableBottomLeft").unwrap();
    $("#tableBottomLeft").wrap("<div name='divBottomLeft' id='divBottomLeft'></div>");

    var middleWidth = 720 + 100 * (3-depth);  //620 : css에서 div[name=divTopRight] width 값, 100 : title 그룹의 width 값
    //hide 된 td의 padding & margin 분 추가
    if(depth === 1) {
        middleWidth += 20;
    } else if (depth === 2) {
        middleWidth += 10;
    }
    $("#tableTopRight").unwrap();
    $("#tableTopRight").wrap("<div name='divTopRight' id='divTopRight' style='width:"+middleWidth+"px;'></div>");
    $("#tableMiddleRight").unwrap();
    $("#tableMiddleRight").wrap("<div name='divMiddleRight' id='divMiddleRight' onscroll='javascript:scrollY();' style='width:"+(middleWidth+16)+"px;'></div>");  //16 : scroll width 값
    $("#tableBottomRight").unwrap();
    $("#tableBottomRight").wrap("<div name='divBottomRight' id='divBottomRight' onscroll='javascript:scrollX();' style='width:"+middleWidth+"px;'></div>");

    $("#tableMiddleLeft tbody").empty();
    $("#tableMiddleRight tbody").empty();
    $("#tableBottomRight").find("td").html("&nbsp;");

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
}

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
            +"<td style='width:70px;text-align:center;font-size:11px;'>"+row.YMD +"</td>"
            +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title01'>"+isUndifined(row.TITLE01,"-") + "</td>"
            +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title02'>"+isUndifined(row.TITLE02,"-") + "</td>"
            +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title03'>"
            + "<div style='text-align:center;margin:0px;padding:0px;height:15px;width:95%;overflow-x:hidden;overflow-y:hidden;'>" + isUndifined(row.TITLE03,"-") +"</div>"
            +"</td>"
            +"<td style='width:70px;text-align:center;font-size:11px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
            +"<td style='width:30px;text-align:center;font-size:11px;'>"
            + (function(_idx, _row){
            if(_row.YMD.length != 8){
                return "&nbsp;";
            }else{
                return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+_row.ROWIDX+"'>";
            }
        })(idx, row)
            +"</td>"
            +"</tr>")
            .data("row",row)
            .appendTo($leftTable);

        $tr.children("td[group^=title]").each(function(index,childTd){
            if($("#title01").is(":visible") && $(childTd).is("[group=title01]")) {
                $(childTd).show();
            }
            if($("#title02").is(":visible") && $(childTd).is("[group=title02]")) {
                $(childTd).show();
            }
            if($("#title03").is(":visible") && $(childTd).is("[group=title03]")) {
                $(childTd).show();
            }
        });

        $("<tr name='" + row.ROWIDX + "'>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_TPUT     )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.UL_TPUT     )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI_AVERAGE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RANK_INDEX  )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSRP_AVERAGE)+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI_AVERAGE)+"</td>"
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
//            +"<td style='text-align: right;font-size:11px;'>n/a</td>"
//            +"<td style='text-align: right;font-size:11px;'>n/a</td>"
            +"</tr>")
            .appendTo($rightTable);

    }

    if (typeof(callback) === 'function') callback();
    window.currentPosition = window.currentPosition + window.appendCount;

}

