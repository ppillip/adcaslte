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
    $('#datepicker01').val(_yesterday)
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
    $('#datepicker02').val(_yesterday)
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

    //월간 셋팅
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
    $("#fromMonth").val(month);
    $("#toMonth").val(month);
    $("#fromYear,#toYear,#fromMonth,#toMonth").change(function () {
        $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
        $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());
    });

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
 * For SEARCH
 *==============================================================================*/
    $("#divSearch button[name=search]").click(function() {

        if(!$("#SEARCHTYPE").val()) {
            alert('조회대상이 선택되지 않았습니다.');
            return false;
        }

        $("div[name=divMiddleLeft] table tbody tr").remove();
        $("div[name=divMiddleRight] table tbody tr").remove();

        $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        var btn = $(this);
        btn.button('loading');

        var param = parseParam(this);
        console.log(JSON.stringify(param));
        window.currentPosition = 0;
        jQuery.post("/adcaslte/svc/CSVDownload-selectBasicData",{"JSONDATA":JSON.stringify(param)},function(result,stat){

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                window.location.href="/adcaslte/download.jsp?o="+result.downloadurl;
            }

            btn.button('reset');

        },"json");
    });

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

        setMMEList($mmeSelect,false,setNEList,$neSelect); //true : all 보이도록..); //false : all 보이지 않도록..

        $("[group^=title]").hide();
        $("[group=title01]").show();
        $("#title01").text("MME");
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
    var leftWidth = (depth * 100) + 70 + 70 + 60; //날짜, 주파수, 그래프

    $("#tableTopLeft").css("width",leftWidth);
    $("#tableMiddleLeft").css("width",leftWidth);
    $("#tableBottomLeft").css("width",leftWidth);

    $("#tableTopLeft").unwrap();
    $("#tableTopLeft").wrap("<div name='divTopLeft' id='divTopLeft'></div>");
    $("#tableBottomLeft").unwrap();
    $("#tableBottomLeft").wrap("<div name='divBottomLeft' id='divBottomLeft'></div>");

    var middleWidth = 690 + 100 * (3-depth);  //620 : css에서 div[name=divTopRight] width 값, 100 : title 그룹의 width 값
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
            +"<td style='width:100px;text-align:center;font-size:11px; display:none;' group='title03'>"+isUndifined(row.TITLE03,"-") +"</td>"
            +"<td style='width:70px;text-align:center;font-size:11px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
            +"<td style='width:60px;text-align:center;font-size:11px;'>"
            + (function(_idx, _row){
            return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+_row.ROWIDX+"'>";
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
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE    )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_THROUGHPUT)+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"
            +(function(value,sign,critical) {
                if(Number(value) && critical != null && eval(value+sign+critical)) {
                    return "<span style='color:red'>"+value+"</span>";
                } else {
                    return value;
                }
            })(formatNumber(row.PUCCH_AVG),'>',result.adminCriticalValues && result.adminCriticalValues.UL_POWER_VAL1)
            +"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PDCP_DL_MB  )+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PRB_USG_RATE)+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DRB_USG_RATE)+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_TIME    )+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TRY_CCNT    )+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_RATE    )+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CDC_RATE    )+ "</td>"
            +"<td style='text-align: right;font-size:11px;'>n/a</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_MB )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_PRB)+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TRY_CC)+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TIME  )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_MB )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_PRB)+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TRY_CC)+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TIME  )+"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
            +"</tr>")
            .appendTo($rightTable);

    }

    if (typeof(callback) === 'function') callback();
    window.currentPosition = window.currentPosition + window.appendCount;

}

