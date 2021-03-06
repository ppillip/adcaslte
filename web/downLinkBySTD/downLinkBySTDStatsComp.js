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
     * For GRAPH
     *==============================================================================*/
    $("#graphDropDown li[name=showCqiModal], #graphDropDown li[name=showThrpGraph]").click(function(){
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
            window.open("downLinkBySTDStatsCompGraph.jsp","",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
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

        jQuery.post("/adcaslte/svc/DownLinkBySTDStats-selectCellTrafficStatsCompExcelDownload", param, function(result,stat){

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
        param["JSONDATA"]   = JSON.stringify(window.result);
        param["JSONDATA2"]  = JSON.stringify(window.resultAfter);
        param["SEARCHTYPE"] = window.result.SEARCHTYPE;

        jQuery.post("/adcaslte/svc/DownLinkBySTDStats-selectCellTrafficStatsCompCQIExcelDownload", param, function(result,stat){

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
        param["SEARCHTYPE"] = window.result.SEARCHTYPE;

        jQuery.post("/adcaslte/svc/DownLinkBySTDStats-selectCellTrafficStatsCompCQIExcelDownload", param, function(result,stat){

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

        if(!$("#SEARCHTYPE").val()) {
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
        getData(param, $("#tableMiddleLeft tbody"), $("#tableMiddleRight tbody"), function (_result) {
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
        getData(param2, $("#tableMiddleLeftAfter tbody"), $("#tableMiddleRightAfter tbody"), function (_result) {
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
        $("#title01").text("본부");
        $("#title01After").text("본부");
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
        $("#title01After").text("본부");
        $("[group=title02]").show();
        $("#title02").text("팀");
        $("#title02After").text("팀");
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
        $("#title01After").text("본부");
        $("[group=title02]").show();
        $("#title02").text("팀");
        $("#title02After").text("팀");
        $("[group=title03]").show();
        $("#title03").text("파트");
        $("#title03After").text("파트");
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
        $("#title01After").text("도/특별/광역");
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
        $("#title01After").text("도/특별/광역");
        $("[group=title02]").show();
        $("#title02").text("시/군/구");
        $("#title02After").text("시/군/구");
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
        $("#title01").text("MME");
        $("#title01After").text("MME");
        $("[group=title02]").show();
        $("#title02").text("EMS");
        $("#title02After").text("EMS");
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
    var leftWidth = (depth * 100) + 70 + 30; //주파수, 그래프

    $("#tableTopLeft").css("width",leftWidth);
    $("#tableTopLeftAfter").css("width",leftWidth);
    $("#tableMiddleLeft").css("width",leftWidth);
    $("#tableMiddleLeftAfter").css("width",leftWidth);
    $("#tableBottomLeft").css("width",leftWidth);

    $("#tableTopLeft").unwrap();
    $("#tableTopLeft").wrap("<div name='divTopLeft' id='divTopLeft'></div>");
    $("#tableTopLeftAfter").unwrap();
    $("#tableTopLeftAfter").wrap("<div name='divTopLeft' id='divTopLeftAfter'></div>");
    $("#tableBottomLeft").unwrap();
    $("#tableBottomLeft").wrap("<div name='divBottomLeft' id='divBottomLeft'></div>");

    var middleWidth = 760 + 100 * (3-depth);  //620 : css에서 div[name=divTopRight] width 값, 100 : title 그룹의 width 값
    //hide 된 td의 padding & margin 분 추가
    if(depth === 1) {
        middleWidth += 20;
    } else if (depth === 2) {
        middleWidth += 10;
    }
    $("#tableTopRight").unwrap();
    $("#tableTopRight").wrap("<div name='divTopRight' id='divTopRight' style='width:"+middleWidth+"px;'></div>");
    $("#tableTopRightAfter").unwrap();
    $("#tableTopRightAfter").wrap("<div name='divTopRight' id='divTopRightAfter' style='width:"+middleWidth+"px;'></div>");
    $("#tableMiddleRight").unwrap();
    $("#tableMiddleRight").wrap("<div name='divMiddleRight' id='divMiddleRight' onscroll='javascript:scrollY();' style='width:"+(middleWidth+16)+"px;'></div>");  //16 : scroll width 값
    $("#tableMiddleRightAfter").unwrap();
    $("#tableMiddleRightAfter").wrap("<div name='divMiddleRight' id='divMiddleRightAfter' onscroll='javascript:scrollYAfter();' style='width:"+(middleWidth+16)+"px;'></div>");  //16 : scroll width 값
    $("#tableBottomRight").unwrap();
    $("#tableBottomRight").wrap("<div name='divBottomRight' id='divBottomRight' onscroll='javascript:scrollX();' style='width:"+middleWidth+"px;'></div>");

    $("#tableMiddleLeft tbody").empty();
    $("#tableMiddleLeftAfter tbody").empty();
    $("#tableMiddleRight tbody").empty();
    $("#tableMiddleRightAfter tbody").empty();

}

/*===============================================================================
 * Search Data
 *
 *==============================================================================*/
function getData(param, $leftTable, $rightTable, callback) {

    jQuery.post("/adcaslte/svc/DownLinkBySTDStats-selectCellTrafficStats",param,function(result,stat){

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
                +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title01'>"+isUndifined(row.TITLE01,"-") + "</td>"
                +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title02'>"+isUndifined(row.TITLE02,"-") + "</td>"
                +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title03'>"
                +"<div style='text-align:center;margin:0px;padding:0px;height:15px;width:99%;overflow-x:hidden;overflow-y:hidden;'>" + isUndifined(row.TITLE03,"-") + "</div>"
                +"</td>"
                +"<td style='width:70px;text-align:center;font-size:11px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
                +"<td style='width:42px;text-align:center;font-size:11px;'>"
                + (function(_idx, _row){
                if ($rightTable.parent().attr("id").match(/After/g)) {
                    return "&nbsp;";
                } else {
                    return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0px;' name='"+_row.ROWIDX+"'>";
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
//                +"<td style='text-align: right;font-size:11px;'>n/a</td>"
//                +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                +"</tr>")
                .appendTo($rightTable);

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
            var $tr = $("<tr>"
                +"<td group='title01' style='width:100px;display:none;'></td>"
                +"<td group='title02' style='width:100px;display:none;'></td>"
                +"<td group='title03' style='width:100px;display:none;'></td>"
                +"<td style='text-align:center; width:70px;font-size:11px;'>"+title+"</td>"
                +"<td style='width:60px;'></td></tr>")
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
//                +"<td style='text-align: right;font-size:11px;'>n/a</td>"
//                +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                +"</tr>")
                .appendTo($rightTable);
        }

        callback(result);

    },"json");

}

