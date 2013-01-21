
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

    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();
    var _today = moment().format("YYYY-MM-DD").toString();

    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    )
        .on('changeDate', function(){
            $('#datepicker01').datepicker('hide');
        });
    $('#datepicker02').val(_today)
        .datepicker(
        {format : "yyyy-mm-dd"}
    )
        .on('changeDate', function(){
            $('#datepicker02').datepicker('hide');
        });

    $('#datepicker03').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    )
        .on('changeDate', function(){
            $('#datepicker03').datepicker('hide');
        });
    $('#datepicker04').val(_today)
        .datepicker(
        {format : "yyyy-mm-dd"}
    )
        .on('changeDate', function(){
            $('#datepicker04').datepicker('hide');
        });

/*===============================================================================
* For GRAPH
*==============================================================================*/
    $("#cqiModal input[name=cqiFlag]").click(function(){
        $("#cqiPDFContainer").hide();
        $("#cqiCDFContainer").hide();
        $("#"+$(this).val()).show();
    })

    $("#graphDropDown li[name=showCqiModal]").click(function(){
        var checkedList = $("input[type=checkbox][name!=checkAll]:checked");
        if( checkedList.length === 0 ) {
            alert("Cell 을 선택해 주세요");
            return ;
        }

        $('#cqiModal').modal('show');

    });

    function selectCheckedCQIData(cellList,callback){

        var cqiPDFList = [];
        var cqiCDFList = [];

        cellList.each(function(idx,element){
            var _thisRow = $(element).parents("tr:first").data("row");
            cqiPDFList.push((function(row){
                return {
                    name : (function (_row) {
                        if(_row.TITLE03) {
                            return _row.YMD + ":" + _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.TITLE03;
                        } else if(_row.TITLE02) {
                            return _row.YMD + ":" + _row.TITLE01 + ":" + _row.TITLE02;
                        } else {
                            return _row.YMD + ":" + _row.TITLE01;
                        }
                    })(row)
                    ,data : [
                        row.CQI_PDF_00 || 0
                        ,row.CQI_PDF_01 || 0
                        ,row.CQI_PDF_02 || 0
                        ,row.CQI_PDF_03 || 0
                        ,row.CQI_PDF_04 || 0
                        ,row.CQI_PDF_05 || 0
                        ,row.CQI_PDF_06 || 0
                        ,row.CQI_PDF_07 || 0
                        ,row.CQI_PDF_08 || 0
                        ,row.CQI_PDF_09 || 0
                        ,row.CQI_PDF_10 || 0
                        ,row.CQI_PDF_11 || 0
                        ,row.CQI_PDF_12 || 0
                        ,row.CQI_PDF_13 || 0
                        ,row.CQI_PDF_14 || 0
                        ,row.CQI_PDF_15 || 0
                    ]
                }
            })(_thisRow));

            cqiCDFList.push((function(row){
                return {
                    name : (function () {
                        if(row.TITLE03) {
                            return row.YMD + ":" + row.TITLE01 + ":" + row.TITLE02 + ":" + row.TITLE03;
                        } else if(row.TITLE02) {
                            return row.YMD + ":" + row.TITLE01 + ":" + row.TITLE02;
                        } else {
                            return row.YMD + ":" + row.TITLE01;
                        }
                    })()
                    ,data : [
                        row.CQI_CDF_00 || 0
                        ,row.CQI_CDF_01 || 0
                        ,row.CQI_CDF_02 || 0
                        ,row.CQI_CDF_03 || 0
                        ,row.CQI_CDF_04 || 0
                        ,row.CQI_CDF_05 || 0
                        ,row.CQI_CDF_06 || 0
                        ,row.CQI_CDF_07 || 0
                        ,row.CQI_CDF_08 || 0
                        ,row.CQI_CDF_09 || 0
                        ,row.CQI_CDF_10 || 0
                        ,row.CQI_CDF_11 || 0
                        ,row.CQI_CDF_12 || 0
                        ,row.CQI_CDF_13 || 0
                        ,row.CQI_CDF_14 || 0
                        ,row.CQI_CDF_15 || 0
                    ]
                }
            })(_thisRow));
        });
        callback(cqiPDFList,cqiCDFList);
    }

    $('#cqiModal').on('shown', function () {

        /*초기에 PDF 그래프 보이게 셋팅*/
        $("input[type=radio][name=cqiFlag]")[0].checked=true;
        $("#cqiPDFContainer").show();
        $("#cqiCDFContainer").hide();

        selectCheckedCQIData($("input[type=checkbox][name!=checkAll]:checked"),function(cqiPDFList,cqiCDFList){
            doCQIChart(cqiPDFList,cqiCDFList);
        });

    })
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

        jQuery.post("/adcaslte/svc/DownLinkByNMSStats-selectCellTrafficStatsCompExcelDownload", param, function(result,stat){

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
        param["SEARCHTYPE"] = window.result.SEARCHTYPE;
        jQuery.post("/adcaslte/svc/DownLinkByNMSStats-selectCellTrafficStatsCompCQIExcelDownload", param, function(result,stat){

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

        jQuery.post("/adcaslte/svc/DownLinkByNMSStats-selectCellTrafficStatsCQIExcelDownload", param, function(result,stat){

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

        //$("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        var btn = $(this);
        btn.button('loading');

        //Before
        var param = parseParam(this);
        param["FROMYMD"] = param["FROMYMD"];
        param["TOYMD"]   = param["TOYMD"];
        window.result = null;
        toggleProgress('show','progress_result','340px');
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
        param2["FROMYMD"] = param["FROMYMD2"];
        param2["TOYMD"]   = param["TOYMD2"];
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
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
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
/*===============================================================================
 * End For 조회대상
 *==============================================================================*/

});

/*===============================================================================
 * Left Title & Data View Setting
 *
 *==============================================================================*/
function setLeft(depth) {
    var leftWidth = (depth * 100) + 70 + 60; // 주파수, 그래프

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
    //$("#tableBottomRight").find("td").html("&nbsp;");

}

/*===============================================================================
 * Search Data
 *
 *==============================================================================*/
function getData(param, $leftTable, $rightTable, callback) {

    jQuery.post("/adcaslte/svc/DownLinkByNMSStats-selectCellTrafficStats",param,function(result,stat){

        $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

        if(result.error || result.rows.length===0){
            callback(result);
            return;
        }

        //각항목 배열
        var propertiesArray = {};
        //for 문으로 튜닝한다
        for(idx=0;idx<result.rows.length;idx++) {

            var row = result.rows[idx];

            //각 항목별 배열만들기
            propertiesArray = getPropertiesArray(row,propertiesArray);

            var $tr = $("<tr name='" + row.ROWIDX + "'>"
                +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title01'>"+isUndifined(row.TITLE01,"-") + "</td>"
                +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title02'>"+isUndifined(row.TITLE02,"-") + "</td>"
                +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title03'>"+isUndifined(row.TITLE03,"-") +"</td>"
                +"<td style='width:70px;text-align:center;font-size:11px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
                +"<td style='width:60px;text-align:center;font-size:11px;'>"
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
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"   /*SS*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI        )+"</td>"  /*SS*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_RSSI     )+"</td>"  /*SS*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE    )+"</td>"  /*LG*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_THROUGHPUT)+"</td>"  /*LG*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL )+"</td>"  /*LG*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE )+"</td>"    /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"    /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PDCP_DL_MB  )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PRB_USG_RATE)+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DRB_USG_RATE)+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_TIME    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TRY_CCNT    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_RATE    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CDC_RATE    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.VOICE_DL_MB */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.VOICE_DL_PRB*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.VOICE_TRY_CC*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.VOICE_TIME  */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.IMAGE_DL_MB */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.IMAGE_DL_PRB*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.IMAGE_TRY_CC*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*row.IMAGE_TIME  */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
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
                +"<td style='text-align:center; width:70px;font-size:12px;'>"+title+"</td>"
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
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].MCS_AVERAGE )+"</td>"    /*SS*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RSSI        )+"</td>"    /*SS*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].R2_RSSI     )+"</td>"    /*SS*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].MIMO_RATE    )+"</td>"   /*LG*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_THROUGHPUT)+"</td>"   /*LG*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].LICENSE_FAIL )+"</td>"   /*LG*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].MIMO_RATE )+"</td>"      /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].MCS_AVERAGE )+"</td>"    /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].PUCCH_AVG )+"</td>"      /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].R2_PUCCH_AVG )+"</td>"   /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].PUSCH_AVG )+"</td>"      /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].R2_PUSCH_AVG )+"</td>"   /*NSN*/
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].PDCP_DL_MB  )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].PRB_USG_RATE)+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DRB_USG_RATE)+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CON_TIME    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].TRY_CCNT    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CON_RATE    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CDC_RATE    )+ "</td>"
                +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].VOICE_DL_MB */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].VOICE_DL_PRB*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].VOICE_TRY_CC*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].VOICE_TIME  */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].IMAGE_DL_MB */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].IMAGE_DL_PRB*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].IMAGE_TRY_CC*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*statsArray[i].IMAGE_TIME  */"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                +"</tr>")
                .appendTo($rightTable);
        }

        callback(result);

    },"json");

}
