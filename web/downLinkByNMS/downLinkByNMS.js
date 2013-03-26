//var screenMaxRow = 500; //화면에 보일 max tr 수 입니다.
var currentPosition = 0;
var appendCount = 20;

function scrollX() {
    document.all.divTopRight.scrollLeft = document.all.divBottomRight.scrollLeft;
    document.all.divMiddleRight.scrollLeft = document.all.divBottomRight.scrollLeft;
}


function scrollY() {
    document.all.divMiddleLeft.scrollTop = document.all.divMiddleRight.scrollTop;
}

var topLeftWidth = {
    "YMD"          : "58"
    ,"MB_TIME"     : "30"
    ,"BTS_NM"      : "140"
    ,"CELL_ID"     : "30"
    ,"MCID"        : "30"
    ,"FREQ_KIND"   : "45"
    ,"GRAPH"       : "20"
};

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

function appendToTable(callback){

    $leftTable = $("#tableMiddleLeft tbody");
    $rightTable = $("#tableMiddleRight tbody");
//for 문으로 튜닝한다
    for(idx=currentPosition;idx<(currentPosition + appendCount) && idx<result.rows.length;idx++){
        row = result.rows[idx];
        //console.log("idx : " + idx + "/ ROWIDX : " + row.ROWIDX);
        var $tr = $("<tr name='" + row.ROWIDX + "'>"
            +"<td style='padding:0;height:13px!important;text-align: center;font-size:11px;width: "+topLeftWidth.YMD+"px;'>"+ row.YMD +"</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.MB_TIME+"px;'>"+isUndifined(row.MB_TIME,"-") + "</td>"
            +"<td style='text-align: center;font-size:11px;width: "+topLeftWidth.BTS_NM+"px;'>"
            +"<div style='text-align:center;margin:0px;padding:0px;height:15px;width:95%;overflow-x:hidden;overflow-y:hidden;'>"
            + row.BTS_NM + "</div>"
            + "</td>"
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
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.DL_FA_USG_RATE    ) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_MB ) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_DL_PRB) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TRY_CCNT) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.VOICE_TIME  ) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_MB ) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_DL_PRB) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TRY_CCNT) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.IMAGE_TIME  ) + "</td>"
            +"<td style='text-align: right;font-size:11px;'>"+isUndifined(row.CHNL_TYPE,"-") +"</td>"
            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.CHNL_COUNT).replace(".0","") +"</td>"
            +"</tr>")
            .appendTo($rightTable);

    }
    callback();
    window.currentPosition = window.currentPosition + window.appendCount;
}
$(document).ready(function(){

    $("#quickmenu_container").quickMenuForLTE();

    $("#divMiddleRight").scroll(function(){
        if($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight())
        {
            appendToTable(function(){});
        }
    });

    $("#tableTopLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });
    $("#tableBottomLeft tbody tr:nth-child(1) td").each(function(idx,obj){
        $(obj).css("width",+topLeftWidth[$(obj).attr("name")]);
    });



    $("#divSearch button[name=search]").click(function(){


        $("div[name=divMiddleLeft] table tbody tr").remove();
        $("div[name=divMiddleRight] table tbody tr").remove();

        $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        window.param = parseParam(this);


        $("tr .mnf").hide();
        $("tr ."+param.MFC_CD).show();

        window.currentPosition = 0;
        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTraffic",param,function(result,stat){

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치
            $("#cqi0_rate_text").html(param.MFC_CD==="MFC00002"?"CQI16":"CQI0");  //제조사별로 CQI0비율 텍스트가 다름

            //윈도우에 서버로 부터 온 데이터 버퍼링

            //세션없을때 테스트용임
            result.adminCriticalValues = result.adminCriticalValues||{DL_RRU_VAL1:"10",PRB_USG_VAL1:"70"};

            window.result = result;

            $leftTable = $("#tableMiddleLeft tbody");
            $rightTable = $("#tableMiddleRight tbody");
            $bottomRightTable = $("#tableBottomRight");

            if(result.error){
                alert("에러가 발생하였습니다. 관리자에게 문의하세요 \n\n" + result.msg);
            }

            if(result.rows.length===0){
                alert("조회결과가 없습니다.");
                return;
            }

            //테이블 랜더링
            appendToTable(function(){});

            //각항목 배열
            var propertiesArray = {};
            for(var idx= 0,max =result.rows.length; idx < max; ++idx){
                var row = result.rows[idx];
                propertiesArray = getPropertiesArray(row,propertiesArray);
            }
            var statsArray = getStatsArray(propertiesArray);

            for(var i=0; i < 4; i++) {
                $("tbody tr:first",$bottomRightTable).remove();
                $("<tr class='info'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].THROUGHPUT  )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI_AVERAGE )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CQI0_RATE   )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].RI_RATE     )+"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_PRB_RATE )+"</td>"

                    + (function(statsArray){
                    if(param.MFC_CD==="MFC00001"){
                        return "<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.MCS_AVERAGE )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.RSSI        )+"</td>"  /*SS*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.R2_RSSI     )+"</td>"  /*SS*/
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
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.MIMO_RATE    )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber( statsArray.DL_THROUGHPUT)+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber( statsArray.LICENSE_FAIL )+"</td>"  /*LG*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.PUCCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.R2_PUCCH_AVG )+"</td>" /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.PUSCH_AVG )+"</td>"    /*LG n NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.R2_PUSCH_AVG )+"</td>" /*LG n NSN*/
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
                            + "<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.MIMO_RATE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.MCS_AVERAGE )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.PUCCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.R2_PUCCH_AVG )+"</td>" /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.PUSCH_AVG )+"</td>"    /*NSN*/
                            +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray.R2_PUSCH_AVG )+"</td>" /*NSN*/
                            ;
                    }
                })(statsArray[i])
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].PDCP_DL_MB  )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].PRB_USG_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DRB_USG_RATE)+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CON_TIME    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].TRY_CCNT    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CON_RATE    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CDC_RATE    )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].DL_FA_USG_RATE )+ "</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].VOICE_DL_MB ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].VOICE_DL_PRB) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].VOICE_TRY_CCNT) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].VOICE_TIME  ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].IMAGE_DL_MB ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].IMAGE_DL_PRB) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].IMAGE_TRY_CCNT) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].IMAGE_TIME  ) +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+ "-" +"</td>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(statsArray[i].CHNL_COUNT).replace(".0","") +"</td>"


                    +"</tr>")
                    .appendTo($bottomRightTable);
            }
            if(typeof(callback) === "function") callback();
        },"json");
    });

    $("#cqiModal input[name=cqiFlag]").click(function(){
        $("#cqiPDFContainer").hide();
        $("#cqiCDFContainer").hide();
        $("#"+$(this).val()).show();
    })

    $("#graphDropDown li[name=showCqiModal]").click(function(e,callback){

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
     * End For 기간
     *==============================================================================*/




    $("#divSearch button[name=excelDownload]").click(function(){
        var param = parseParam(this);
        param["JSONDATA"] = JSON.stringify(window.result);

        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTrafficExcelDownload", param, function(result,stat){

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
                window.location.href="/adcaslte/"+result.downloadurl   ;
            }

        },"json");
    });

    $("#cqiModal button[name=excelDownload]").click(function(){  /**/
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

    $("#graphDropDown li[name=showThrpGraph],#graphDropDown li[name=showHistogram]").click(function(){
        var checkedList = $("input[type=checkbox][name!=checkAll]:checked");
        if( checkedList.length === 0 ) {
            alert("Cell 을 선택해 주세요");
            return ;
        }
        var name = $(this).attr("name");
        window.open("downLinkByNMSGraph.jsp?chart="+name,"",'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1100,height=700');
    });

    //솔루션에서 DownLinkByNMS 호출시

    if(location.search) {
        var search = parseQueryString(location.search.substring(1));
        var YMD = search['YMD'];
        $("input[name=FROMYMD]").val(YMD);
        $("input[name=TOYMD]").val(YMD);
        $("#datepicker01").val(YMD.substr(0,4)+'-'+YMD.substr(4,2)+'-'+YMD.substr(6,2));
        $("#datepicker02").val(YMD.substr(0,4)+'-'+YMD.substr(4,2)+'-'+YMD.substr(6,2));
        $("input[name=WORKGROUP_NAME]").val(decodeURI(search['WORKGROUP_NAME']));
        $("input[name=FREQ_KIND][value='"+search['FREQ_KIND']+"']").attr("checked","checked");
        $("input[name=DAYTIME_SEQ]").val(search['DAYTIME_SEQ']);
        $("select[name=MBTYPE]").val(search['MBTYPE']);
        $("input[name=SEARCHTYPE]").val('SOLUTIONGROUP');

        $SCH = $("#divSearch");
        $SCH.append("<input type=hidden name='PART_CD' value='"+search['PART_CD']+"'>");
        $SCH.append("<input type=hidden name='BAD_TYPE' value='"+search['BAD_TYPE']+"'>");

        /*제조사 셋팅하는 용도로만 씀*/
        jQuery.ajax({
            type: "POST",
            url: "/adcaslte/svc/Solution-selectSolutionCellList",
            data: search,
            dataType: "json",
            async: false,
            success: function(result,stat){
                var cellList  = [];
                var mfcCDList = [];
                var mfcNMList = [];
                for(var idx= 0,max =result.rows.length; idx < max; ++idx){
                    var row = result.rows[idx];
                    cellList.push(row.CELL_INFO);
                    if(!mfcCDList) {
                        mfcCDList.push(row.MFC_CD);
                    } else {
                        if ($.inArray(row.MFC_CD, mfcCDList) === -1) {
                            mfcCDList.push(row.MFC_CD);
                        }
                    }
                }
                //$("input[name=DUIDs]").val(cellList.join("|"));
                //$("input[name=CELLGROUP_YN]").val("Y");
                if ($.inArray('MFC00001', mfcCDList) !== -1) {
                    $("input[name=MFC_CD][value=MFC00001]").attr("checked","checked");
                } else if ($.inArray('MFC00002', mfcCDList) !== -1) {
                    $("input[name=MFC_CD][value=MFC00002]").attr("checked","checked");
                } else if ($.inArray('MFC00002', mfcCDList) !== -1) {
                    $("input[name=MFC_CD][value=MFC00014]").attr("checked","checked");
                } else {
                    $("input[name=MFC_CD][value="+mfcCDList[0]+"]").attr("checked","checked");
                }
                if (mfcCDList.length > 1) {
                    for (var i=0; i<mfcCDList.length; i++) {
                        if (mfcCDList[i] === 'MFC00001') {
                            mfcNMList.push("삼성");
                        } else if (mfcCDList[i] === 'MFC00002') {
                            mfcNMList.push("ELG");
                        } else if (mfcCDList[i] === 'MFC00014') {
                            mfcNMList.push("NSN");
                        }
                    }
                    alert('제조사가 '+mfcNMList.join(',')+' 존재합니다!');
                }
            }
        });

        $("#divSearch button[name=search]").trigger("click");

    }

    //if(window.location.host==="localhost") {goTest();}
});


function goTest(){

    QUnit.test("초기 셋팅", function() {

        $("input[name=WORKGROUP_ID]").val("b849c85e-be04-40b9-9787-570afdf52dc8");
        $("input[name=WORKGROUP_YN]").val("Y");
        $("input[name=WORKGROUP_NAME]").val("테스트모드입니다.");
        $("#datepicker01").val("2013-01-15");
        $("#datepicker02").val("2013-01-15");
        ok( true, "셋팅완료" );

        $("button[name=search]").trigger("click",function(){
            QUnit.test("리턴값확인", function() {
                deepEqual(true,window.result.rows.length > 0 , window.result.rows.length + " 개 가져옴");
            });

            QUnit.test("CQI 그래프 확인 ",function(){
                $("input[type=checkbox][name='1']").attr("checked",true);
                $("input[type=checkbox][name='2']").attr("checked",true);
                $("input[type=checkbox][name='3']").attr("checked",true);
                ok( true, "체크박스 셋팅" );
                $("#graphDropDown li[name=showCqiModal]").trigger('click',function(){
                    ok( true, "CQI 클릭" );
                })
            });

            $("button[name=excelDownload]").trigger('click',function(){
                QUnit.test("엑셀 다운로드 확인",function(){
                    deepEqual(true,true,"엑셀 가져옴");
                });
            });

        });
    });
}
