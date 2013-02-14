
var screenMaxRow = 500; //화면에 보일 max tr 수 입니다.

function isUndifined(obj,str){
    if(typeof(obj)==="undefined"){
        return str;
    }else{
        return obj;
    }
}

function formatNumber(obj){
    if(isUndifined(obj,"-") === "-"){
        return "-" ;
    } else {
        return accounting.formatNumber(new Number(obj), 1, ",", ".");
    }
}

function setWorkgroup(workgroupID, duIDs, workgroupName, mfcCD) {
    if(workgroupID)  {
        $("input[name=SEARCHTYPE]").val("WORKGROUP");
    } else {
        $("input[name=SEARCHTYPE]").val("DULIST");
    }
    $("input[name=WORKGROUP_ID]").val(workgroupID);
    $("input[name=DUIDs]").val(duIDs);
    $("input[name=WORKGROUP_NAME]").val(workgroupName);

    $("input[name=MFC_CD]").each(function(idx,element){
        if(element.value === mfcCD) {
            element.checked = true;
        }
    });
}

function checkedGraph(obj){
    if($(obj).attr("checked")){
        $("tr[name="+$(obj).attr("name")+"]").addClass("warning");
    }else{
        $("tr[name="+$(obj).attr("name")+"]").removeClass("warning");
    }
}

var cqiPDFChart = null;
var cqiCDFChart = null;
function doCQIChart(PDFdataList, CDFdataList){

    cqiPDFChart = new Highcharts.Chart({
        chart: {
            renderTo: 'cqiPDFContainer',
            type: 'line',
            marginRight: 130,
            marginBottom: 25
        },
        title: {
            text: 'CQI PDF GRAPH',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: qcas.sktelecom.com',
            x: -20
        },
        xAxis: {
            categories : (function (MFC_CD) {
                return (MFC_CD==="MFC00002")
                    ?['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
                    :['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  '10', '11', '12', '13', '14', '15'];
            })($("input[type=radio][name=MFC_CD]:checked").val())
        },
        yAxis: {
            title: {
                text: '%'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+
                    this.x +': '+ this.y ;
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -450,
            y: 50,
            borderWidth: 0
        },
        series: PDFdataList
    });


    cqiCDFChart = new Highcharts.Chart({
        chart: {
            renderTo: 'cqiCDFContainer',
            type: 'line',
            marginRight: 130,
            marginBottom: 25
        },
        title: {
            text: 'CQI CDF GRAPH',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: qcas.sktelecom.com',
            x: -20
        },
        xAxis: {
            categories : (function (MFC_CD) {
                return (MFC_CD==="MFC00002")
                    ?['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
                    :['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  '10', '11', '12', '13', '14', '15'];
            })($("input[type=radio][name=MFC_CD]:checked").val())
        },
        yAxis: {
            title: {
                text: '%'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+
                    this.x +': '+ this.y ;
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -500,
            y: 50,
            borderWidth: 0
        },
        series: CDFdataList
    });

}

function parseParam (_this){

    var param = {};

    $("#divSearch select").each(function(idx,obj){
        param[$(obj).attr("name") ] = $(obj).val();
    });

    $("#divSearch input[type=radio]:checked,input[type=hidden],input[type=text]").each(function(idx,obj){
        param[$(obj).attr("name") ] = $(obj).val();
    });

    return param;
}

function scrollX() {
    document.all.divTopRight.scrollLeft = document.all.divBottomRight.scrollLeft;
    document.all.divMiddleRight.scrollLeft = document.all.divBottomRight.scrollLeft;
}

function scrollY() {
    document.all.divMiddleLeftAfter.scrollTop = document.all.divMiddleRightAfter.scrollTop = document.all.divMiddleLeft.scrollTop = document.all.divMiddleRight.scrollTop;

}
function scrollYAfter() {
    document.all.divMiddleLeftAfter.scrollTop = document.all.divMiddleLeft.scrollTop = document.all.divMiddleRight.scrollTop = document.all.divMiddleRightAfter.scrollTop;

    document.all.divMiddleRight.scrollLeft = document.all.divTopRight.scrollLeft = document.all.divTopRightAfter.scrollLeft = document.all.divMiddleRightAfter.scrollLeft;




}

function getSunday(strDate) {
    var dateArray = strDate.split('-');
    var year  = dateArray[0];
    var month = dateArray[1];
    var date  = dateArray[2];

    var objDate = new Date(year, month-1, date);

    objDate.setDate(objDate.getDate() - objDate.getDay());

    year  = objDate.getFullYear();
    month = objDate.getMonth()+1;
    month = (month > 9 ? '' : '0') + month;
    date = objDate.getDate();
    date = (date > 9 ? '' : '0') + date;

    return year+'-'+month+'-'+date;

}

/*===============================================================================
 * 현재일 이후 토요일 얻는 함수
 *
 *==============================================================================*/
function getSaturday(strDate) {
    var dateArray = strDate.split('-');
    var year  = dateArray[0];
    var month = dateArray[1];
    var date  = dateArray[2];

    var objDate = new Date(year, month-1, date);

    objDate.setDate(objDate.getDate() + (6 - objDate.getDay()));

    year  = objDate.getFullYear();
    month = objDate.getMonth()+1;
    month = (month > 9 ? '' : '0') + month;
    date = objDate.getDate();
    date = (date > 9 ? '' : '0') + date;

    return year+'-'+month+'-'+date;

}



$(document).ready(function(){

    var topLeftWidth = {
        "YMD"          : "60"
        ,"MB_TIME" : "35"
        ,"BTS_NM"     : "220"
        ,"CELL_ID"    : "35"
        ,"MCID"        : "45"
        ,"FREQ_KIND"  : "55"
        ,"GRAPH"       : "50"
    }
    $("#tableTopLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    $("#tableBottomLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });

    $("#tableTopLeftAfter tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    $("#tableBottomLeftAfter tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });

    $("#divSearch button[name=search]").click(function(){
        $("div[name=t_progress]").remove();

        //전
        $("div[name=divMiddleLeft] table tbody tr").remove();
        $("div[name=divMiddleRight] table tbody tr").remove();
        $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        //후
        $("div[name=divMiddleLeftAfter] table tbody tr").remove();
        $("div[name=divMiddleRightAfter] table tbody tr").remove();
        $("table[name=tableBottomRightAfter] tbody td").html("&nbsp;");  //찌그러지지 않게


        var param = parseParam(this);
        var paramAfter = parseParam(this);

        $("tr .mnf").hide();
        $("tr ."+param.MFC_CD).show();

        //전
        $progress = $("<div name='t_progress' style='position: absolute;top:340px;left:620px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>");
        $progress.appendTo("body");
        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTraffic",param,function(result,stat){
            //전
            $("div[name=divMiddleLeft] table tbody tr").remove();
            $("div[name=divMiddleRight] table tbody tr").remove();
            $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

            //윈도우에 서버로 부터 온 데이터 버퍼링
            window.result = result;

            $leftTable = $("#tableMiddleLeft tbody");
            $rightTable = $("#tableMiddleRight tbody");
            $bottomRightTable = $("#tableBottomRight");

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }

            if(result.rows.length===0){
                $progress.html("조회결과가 없습니다.");
                return;
            }



//for 문으로 튜닝한다 before
            for(idx=0;idx<result.rows.length;idx++){
                row = result.rows[idx];

                var $tr = $("<tr name='" + row.ROWIDX + "'>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.YMD+"px;'>"+row.YMD +"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MB_TIME+"px;'>"+isUndifined(row.MB_TIME,"-") + "</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.BTS_NM+"px;'>"+row.BTS_NM + "<!--"+ row.C_UID +"-->" + "</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.CELL_ID+"px;'>"+row.CELL_ID+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MCID+"px;'>"+(row.MCID==="T"?"":row.MCID)+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.FREQ_KIND+"px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.GRAPH+"px;'>"
                    + (function(_idx, _row){
                        return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+_row.ROWIDX+"'>";
                        })(idx, row)
                    +"</td>"
                    +"</tr>")
                    .data("row",row)
                    .appendTo($leftTable);

                $("<tr name='" + row.ROWIDX + "'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_TYPE)+"</td>"
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
                    + "</td>"
                    + (function(row){
                    if(param.MFC_CD==="MFC00001"){
                        return "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI        )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_RSSI     )+"</td>"  /*SS*/
                            + "<td style='display:none'/>" /*갯수맞춰줘야 IE 스크롤 안깨짐*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>";
                    }
                    if(param.MFC_CD==="MFC00002"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE    )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_THROUGHPUT)+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*LG n NSN*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            ;
                    }
                    if(param.MFC_CD==="MFC00014"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*NSN*/
                            ;
                    }
                })(row)
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PDCP_DL_MB  ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PRB_USG_RATE) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DRB_USG_RATE) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_TIME    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TRY_CCNT    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_RATE    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CDC_RATE    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_MB ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_PRB) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TRY_CC) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TIME  ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_MB ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_PRB) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TRY_CC) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TIME  ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"</tr>")
                    .appendTo($rightTable);

                if(idx===screenMaxRow){
                    if(!confirm( "500건 이상 화면에 로딩할경우 브라우져가 느려질수 있습니다." +
                        "\n\n그래도 계속 하시겠습니까? [" + idx + "/" + result.rows.length + "]"
                        +"\n\n확인 : 계속진행    취소 : 현재에서 로딩멈춤"
                        +"\n\n('취소'를 클릭 하셔도 EXCEL 다운로드는 전체가 가능합니다.)"  ))
                    {
                        break;
                    }else{
                        continue;
                    }
                }
            }

            $("<tr class='info'><td></td><td></td><td>전체평균</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTable);
            $("<tr class='info'><td></td><td></td><td>최대값</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTable);
            $("<tr class='info'><td></td><td></td><td>최소값</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTable);
            $("<tr class='info'><td></td><td></td><td>표준편차</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTable);

            $(result.STATS).each(function(idx,row){

                $("<tr class='info'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_TYPE)+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.THROUGHPUT  )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI0_RATE   )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RI_RATE     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_PRB_RATE )+"</td>"

                    + (function(row){
                    if(param.MFC_CD==="MFC00001"){
                        return "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI        )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_RSSI     )+"</td>"  /*SS*/
                            + "<td style='display:none'/>" /*갯수맞춰줘야 IE 스크롤 안깨짐*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>";
                    }
                    if(param.MFC_CD==="MFC00002"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE    )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_THROUGHPUT)+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*LG n NSN*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            ;
                    }
                    if(param.MFC_CD==="MFC00014"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*NSN*/
                            ;
                    }
                })(row)
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PDCP_DL_MB  )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PRB_USG_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DRB_USG_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_TIME    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TRY_CCNT    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_RATE    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CDC_RATE    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_MB ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_PRB) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TRY_CC) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TIME  ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_MB ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_PRB) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TRY_CC) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TIME  ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"</tr>")
                    .appendTo($rightTable);
            });
            $progress.remove();
        },"json");


        //후
        param["FROMYMD"] = param["FROMYMDAFTER"];
        param["TOYMD"] = param["TOYMDAFTER"];
        $progressAfter = $("<div name='t_progress' style='position: absolute;top:553px;left:620px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>");
        $progressAfter.appendTo("body");

        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTraffic",param,function(result,stat){
            //후
            $("div[name=divMiddleLeftAfter] table tbody tr").remove();
            $("div[name=divMiddleRightAfter] table tbody tr").remove();
            $("table[name=tableBottomRightAfter] tbody td").html("&nbsp;");  //찌그러지지 않게

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치

            //윈도우에 서버로 부터 온 데이터 버퍼링
            window.resultAfter = result;

            $leftTableAfter = $("#tableMiddleLeftAfter tbody");
            $rightTableAfter = $("#tableMiddleRightAfter tbody");
            $bottomRightTableAfter = $("#tableBottomRightAfter");

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }

            if(result.rows.length===0){
                $progressAfter.html("조회결과가 없습니다.");
                return;
            }



//for 문으로 튜닝한다 after
            for(idx=0;idx<result.rows.length;idx++){
                row = result.rows[idx];

                var $tr = $("<tr name='" + row.ROWIDX + "'>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.YMD+"px;'>"+row.YMD +"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MB_TIME+"px;'>"+isUndifined(row.MB_TIME,"-") + "</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.BTS_NM+"px;'>"+row.BTS_NM + "<!--"+ row.C_UID +"-->" + "</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.CELL_ID+"px;'>"+row.CELL_ID+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MCID+"px;'>"+(row.MCID==="T"?"":row.MCID)+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.FREQ_KIND+"px;'>"+isUndifined(row.FREQ_KIND,"-")+"</td>"
                    +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.GRAPH+"px;'>"
                    +"&nbsp;</td>"
                    +"</tr>")
                    .data("row",row)
                    .appendTo($leftTableAfter);

                $("<tr name='" + row.ROWIDX + "'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_TYPE)+"</td>"
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
                    + "</td>"

                    + (function(row){
                    if(param.MFC_CD==="MFC00001"){
                        return "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI        )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_RSSI     )+"</td>"  /*SS*/
                            + "<td style='display:none'/>" /*갯수맞춰줘야 IE 스크롤 안깨짐*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>";
                    }
                    if(param.MFC_CD==="MFC00002"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE    )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_THROUGHPUT)+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*LG n NSN*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            ;
                    }
                    if(param.MFC_CD==="MFC00014"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*NSN*/
                            ;
                    }
                })(row)
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PDCP_DL_MB  ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PRB_USG_RATE) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DRB_USG_RATE) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_TIME    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TRY_CCNT    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_RATE    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CDC_RATE    ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_MB ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_PRB) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TRY_CC) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TIME  ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_MB ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_PRB) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TRY_CC) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TIME  ) + "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"</tr>")
                    .appendTo($rightTableAfter);

                if(idx===screenMaxRow){
                    if(!confirm( "500건 이상 화면에 로딩할경우 브라우져가 느려질수 있습니다." +
                        "\n\n그래도 계속 하시겠습니까? [" + idx + "/" + result.rows.length + "]"
                        +"\n\n확인 : 계속진행    취소 : 현재에서 로딩멈춤"
                        +"\n\n('취소'를 클릭 하셔도 EXCEL 다운로드는 전체가 가능합니다.)"  ))
                    {
                        break;
                    }else{
                        continue;
                    }
                }
            }

            $("<tr class='info'><td></td><td></td><td>전체평균</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTableAfter);
            $("<tr class='info'><td></td><td></td><td>최대값</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTableAfter);
            $("<tr class='info'><td></td><td></td><td>최소값</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTableAfter);
            $("<tr class='info'><td></td><td></td><td>표준편차</td><td></td><td></td><td></td><td></td></tr>").appendTo($leftTableAfter);

            $(result.STATS).each(function(idx,row){

                $("<tr class='info'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_TYPE)+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.THROUGHPUT  )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CQI0_RATE   )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RI_RATE     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_PRB_RATE )+"</td>"

                    + (function(row){
                    if(param.MFC_CD==="MFC00001"){
                        return "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.RSSI        )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_RSSI     )+"</td>"  /*SS*/
                            + "<td style='display:none'/>" /*갯수맞춰줘야 IE 스크롤 안깨짐*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>";
                    }
                    if(param.MFC_CD==="MFC00002"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE    )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_THROUGHPUT)+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.LICENSE_FAIL )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*LG n NSN*/
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            ;
                    }
                    if(param.MFC_CD==="MFC00014"){
                        return "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='display:none'/>"
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_RATE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MCS_AVERAGE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUCCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUCCH_AVG )+"</td>" /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PUSCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.R2_PUSCH_AVG )+"</td>" /*NSN*/
                            ;
                    }
                })(row)
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PDCP_DL_MB  )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.PRB_USG_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DRB_USG_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_TIME    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.TRY_CCNT    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CON_RATE    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CDC_RATE    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>n/a</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_MB ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_PRB) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TRY_CC) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TIME  ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_MB ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_PRB) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TRY_CC) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TIME  ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+/*전송로*/"n/a" +"</td>"
                    +"</tr>")
                    .appendTo($rightTableAfter);
            });
            $progressAfter.remove();
        },"json");


    });

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
        if( checkedList.length > 20 ) {
            alert("그래프는 20개 까지만 허용합니다.");
            return ;
        }

        $('#cqiModal').modal('show');

    });

    function selectCheckedCQIData(cellList,callback){

        var cqiPDFList = [];
        var cqiCDFList = [];

        cellList.each(function(){
            var _thisRow = $(this).parent().parent().data("row");
            cqiPDFList.push((function(row){
                return {
                    name : row.YMD + ":" + row.BTS_NM + ":" + row.CELL_ID
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
                    name : row.YMD + ":" + row.BTS_NM + ":" + row.CELL_ID
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

    $("input[name=WORKGROUP_YN]").hide();
    $("input[name=WORKGROUP_ID]").hide();
    $("input[name=DUIDs]").hide();

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


    $("#workgroup").click(function(){
        window.open('/adcaslte/workgroup/workgroup.jsp','workgroup','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=815,height=700');
    });

    $("#tempsearch").click(function(){
        window.open('/adcaslte/workgroup/workgroup.jsp','tempsearch','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=815,height=700');
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

    $('#datepicker01After').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
            var termType = $("input[name=TERMTYPE]:checked").val();
            if (termType === 'DAY') {
                $("input[name=FROMYMDAFTER]").val($("#datepicker01After").val().replace(/-/gi,''));
            } else if (termType === 'WK') {
                $("input[name=FROMYMDAFTER]").val(getSunday($("#datepicker01After").val()).replace(/-/gi,''));
                $("#fromto").text('[ '+getSunday($("#datepicker01After").val())+' ~ '+getSaturday($("#datepicker02After").val())+' ]');
            }
            $('#datepicker01After').datepicker('hide');
        });
    $('#datepicker02After').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
            var termType = $("input[name=TERMTYPE]:checked").val();
            if (termType === 'DAY') {
                $("input[name=TOYMDAFTER]").val($("#datepicker02After").val().replace(/-/gi,''));
            } else if (termType === 'WK') {
                $("input[name=TOYMDAFTER]").val(getSaturday($("#datepicker02After").val()).replace(/-/gi,''));
                $("#fromtoAfter").text('[ '+getSunday($("#datepicker01After").val())+' ~ '+getSaturday($("#datepicker02After").val())+' ]');
            }
            $('#datepicker02After').datepicker('hide');
        });

    $("input[name=FROMYMD]").val($("#datepicker01").val().replace(/-/gi,''));
    $("input[name=TOYMD]").val($("#datepicker02").val().replace(/-/gi,''));

    $("input[name=FROMYMDAFTER]").val($("#datepicker01After").val().replace(/-/gi,''));
    $("input[name=TOYMDAFTER]").val($("#datepicker02After").val().replace(/-/gi,''));

    //월간 셋팅
    var today = new Date();
    var year  = Number(today.getFullYear());
    var month = Number(today.getMonth())+1;
    month = (month>9)?month:'0'+month;
    for (var i=0; i<3; i++) {
        $("#fromYear,#toYear").append("<option value='"+(year-i)+"'>" +(year-i)+"</option>");
        $("#fromYearAfter,#toYearAfter").append("<option value='"+(year-i)+"'>" +(year-i)+"</option>");
    }
    for (var i=1; i<=12; i++) {
        $("#fromMonth,#toMonth").append("<option value='"+(i>9?i:'0'+i)+"'>" +(i>9?i:'0'+i)+"</option>");
        $("#fromMonthAfter,#toMonthAfter").append("<option value='"+(i>9?i:'0'+i)+"'>" +(i>9?i:'0'+i)+"</option>");
    }
    $("#fromMonth").val(month);
    $("#toMonth").val(month);
    $("#fromMonthAfter").val(month);
    $("#toMonthAfter").val(month);
    $("#fromYear,#toYear,#fromMonth,#toMonth").change(function () {
        $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
        $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());
    });

    $("#fromYearAfter,#toYearAfter,#fromMonthAfter,#toMonthAfter").change(function () {
        $("input[name=FROMYMDAFTER]").val($('#fromYearAfter').val()+$('#fromMonthAfter').val());
        $("input[name=TOYMDAFTER]").val($('#toYearAfter').val()+$('#toMonthAfter').val());
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

            $('#datepicker01After').show();
            $('#dashAfter').show();
            $('#datepicker02After').show();
            $("input[name=FROMYMDAFTER]").val($("#datepicker01After").val().replace(/-/gi,''));
            $("input[name=TOYMDAFTER]").val($("#datepicker02After").val().replace(/-/gi,''));
        } else if (this.value === 'MON') {
            $('#fromYear').show();
            $('#fromMonth').show();
            $('#toYear').show();
            $('#toMonth').show();
            $("input[name=FROMYMD]").val($('#fromYear').val()+$('#fromMonth').val());
            $("input[name=TOYMD]").val($('#toYear').val()+$('#toMonth').val());

            $('#fromYearAfter').show();
            $('#fromMonthAfter').show();
            $('#toYearAfter').show();
            $('#toMonthAfter').show();
            $("input[name=FROMYMDAFTER]").val($('#fromYearAfter').val()+$('#fromMonthAfter').val());
            $("input[name=TOYMDAFTER]").val($('#toYearAfter').val()+$('#toMonthAfter').val());
        }
    });

    /*===============================================================================
     * End For 기간
     *==============================================================================*/


    $("#divSearch button[name=excelDownload]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] = JSON.stringify(window.result);
        param["JSONDATAAFTER"] = JSON.stringify(window.resultAfter);

        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTrafficCompExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                window.location.href="/adcaslte/"+result.downloadurl;
            }

        },"json");
    });

    $("#excelDropDown li[name=downCqiExcel]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] = JSON.stringify(window.result);

        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTrafficCQIExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                window.location.href="/adcaslte/"+result.downloadurl;
            }

        },"json");
    });

    $("#cqiModal button[name=excelDownload]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] =  (function(checkedTR){
            var checkedRows = [];
            checkedTR.each(function(){
                checkedRows.push($(this).parent().parent().data("row"));
            });
            return JSON.stringify({"rows":checkedRows});
        })($("input[type=checkbox][name!=checkAll]:checked"));

        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTrafficCQIExcelDownload", param, function(result,stat){

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }else{
                window.location.href="/adcaslte/"+result.downloadurl;
            }

        },"json");
    });




    /* 테스트용 셋팅 */
    /*
    $("input[name=WORKGROUP_ID]").val("b849c85e-be04-40b9-9787-570afdf52dc8");
    $("input[name=WORKGROUP_YN]").val("Y");
    $("#datepicker01").val("2012-12-01");
    $("#datepicker02").val("2012-12-01");
     */

});
