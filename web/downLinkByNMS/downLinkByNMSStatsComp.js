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

/*===============================================================================
 * For 기간
 *==============================================================================*/
    //최초 기간 셋팅 (통계주기 일간)
    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();
    var _today = moment().format("YYYY-MM-DD").toString();

    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
        $('#datepicker01').datepicker('hide');
    });
    $('#datepicker02').val(_today)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));
        $('#datepicker02').datepicker('hide');
    });
    $('#datepicker03').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $("input[name=FROMYMD2]").val($("#datepicker03").val().replace(/-/gi,''));
        $('#datepicker03').datepicker('hide');
    });
    $('#datepicker04').val(_today)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $("input[name=TOYMD2]").val($("#datepicker04").val().replace(/-/gi,''));
        $('#datepicker04').datepicker('hide');
    });
    $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
    $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));
    $("input[name=FROMYMD2]").val($("#datepicker03").val().replace(/-/gi,''));
    $("input[name=TOYMD2]").val($("#datepicker04").val().replace(/-/gi,''));

    //월간 셋팅
    var today = new Date();
    var year  = Number(today.getFullYear());
    var month = Number(today.getMonth())+1;
    month = (month>9)?month:'0'+month;
    for (var i=0; i<3; i++) {
        $("#fromYear1,#toYear1,#fromYear2,#toYear2").append("<option value='"+(year-i)+"'>" +(year-i)+"</option>");
    }
    for (var i=1; i<=12; i++) {
        $("#fromMonth1,#toMonth1,#fromMonth2,#toMonth2").append("<option value='"+(i>9?i:'0'+i)+"'>" +(i>9?i:'0'+i)+"</option>");
    }
    $("#fromMonth1,#fromMonth2").val(month);
    $("#toMonth1,#toMonth2").val(month);
    $("#fromYear1,#toYear1,#fromMonth1,#toMonth1,#fromYear2,#toYear2,#fromMonth2,#toMonth2").change(function () {
        $("input[name=FROMYMD]").val($('#fromYear1').val()+$('#fromMonth1').val());
        $("input[name=TOYMD]").val($('#toYear1').val()+$('#toMonth1').val());
        $("input[name=FROMYMD2]").val($('#fromYear2').val()+$('#fromMonth2').val());
        $("input[name=TOYMD2]").val($('#toYear2').val()+$('#toMonth2').val());
    });

    //통계주기 변경시
    $("input[name=TERMTYPE]").click(function (event) {
        $("[group=TERMTYPE]").hide();

        if (this.value === 'DAY') {
            $('#datepicker01').show();
            $('#dash1').show();
            $('#datepicker02').show();
            $('#datepicker03').show();
            $('#dash2').show();
            $('#datepicker04').show();
            $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
            $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));
            $("input[name=FROMYMD2]").val($("#datepicker03").val().replace(/-/gi,''));
            $("input[name=TOYMD2]").val($("#datepicker04").val().replace(/-/gi,''));
        } else if (this.value === 'MON') {
            $('#fromYear1').show();
            $('#fromMonth1').show();
            $('#toYear1').show();
            $('#toMonth1').show();
            $('#fromYear2').show();
            $('#fromMonth2').show();
            $('#toYear2').show();
            $('#toMonth2').show();
            $("input[name=FROMYMD]").val($('#fromYear1').val()+$('#fromMonth1').val());
            $("input[name=TOYMD]").val($('#toYear1').val()+$('#toMonth1').val());
            $("input[name=FROMYMD2]").val($('#fromYear2').val()+$('#fromMonth2').val());
            $("input[name=TOYMD2]").val($('#toYear2').val()+$('#toMonth2').val());
        }
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
            window.open("downLinkByNMSStatsCompGraph.jsp","showThrpGraph",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
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
        param["JSONDATA"]  = JSON.stringify(window.cqiBeforeExcelData);
        param["JSONDATA2"] = JSON.stringify(window.cqiAfterExcelData);
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
        $("#title01").text("본부");
        $("#title01After").text("본부");
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
        event.preventDefault();
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
        $("#title01After").text("도/특별/광역");
        $("[group=title02]").show();
        $("#title02").text("시/군/구");
        $("#title02After").text("시/군/구");
        $("#SEARCHTYPE").val("UNI");
        setLeft(2);

    });

    //조회대상 : EMS별
    $("#searchDropDown li[name=emsSearch]").click(function(event){
        event.preventDefault();
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
                +"<td style='text-align: right;font-size:11px;'>"
                +(function(value,sign,critical) {
                if(Number(value) && critical != null && eval(value+sign+critical)) {
                    return "<span style='color:red'>"+value+"</span>";
                } else {
                    return value;
                }
            })(formatNumber(row.THROUGHPUT),'<',result.adminCriticalValues && result.adminCriticalValues.DL_RRU_VAL1)
                +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI_AVERAGE )+"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI0_RATE   )+"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RI_RATE     )+"</td>"
                +"<td style='text-align: right;font-size:11px;'>"
                +(function(value,sign,critical) {
                if(Number(value) && critical != null && eval(value+sign+critical)) {
                    return "<span style='color:red'>"+value+"</span>";
                } else {
                    return value;
                }
            })(formatNumber(row.DL_PRB_RATE),'>',result.adminCriticalValues && result.adminCriticalValues.PRB_USG_VAL1)
                +"</td>"
                +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"   /*SS*/
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
