
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
        $("input[name=WORKGROUP_YN]").val("Y");
    } else {
        $("input[name=WORKGROUP_YN]").val("N");
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
    document.all.divMiddleLeft.scrollTop = document.all.divMiddleRight.scrollTop;
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



    $("#divSearch button[name=search]").click(function(){


        $("div[name=divMiddleLeft] table tbody tr").remove();
        $("div[name=divMiddleRight] table tbody tr").remove();

        $("table[name=tableBottomRight] tbody td").html("&nbsp;");  //찌그러지지 않게

        var param = parseParam(this);


        $("tr .mnf").hide();
        $("tr ."+param.MFC_CD).show();


        jQuery.post("/adcaslte/svc/DownLinkByNMS-selectDailyCellTraffic",param,function(result,stat){

            $("input[name=checkAll]").attr("checked",false); //전체선택된거 원위치
            $("#cqi0_rate_text").html(param.MFC_CD==="MFC00002"?"CQI16":"CQI0");  //제조사별로 CQI0비율 텍스트가 다름

            //윈도우에 서버로 부터 온 데이터 버퍼링
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



//for 문으로 튜닝한다
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
                        if(!_row.MB_TIME){
                            return "&nbsp;";
                        }else{
                            return "<input onclick='checkedGraph(this)' type='checkbox' style='margin: 0 0 0 0;' name='"+_row.ROWIDX+"'>";
                        }
                      })(idx, row)
                    +"</td>"
                    +"</tr>")
                    .data("row",row)
                    .appendTo($leftTable);

                $("<tr name='" + row.ROWIDX + "'>"
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

            $(result.STATS).each(function(idx,row){
                $("tbody tr:first",$bottomRightTable).remove();
                $("<tr class='info'>"
                    +"<td style='text-align: right;font-size:11px;'>"+formatNumber(row.MIMO_TYPE  )+"</td>"
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
                                +"<td style='text-align: right;font-size:11px;'>"+formatNumber( row.DL_THROUGHPUT)+"</td>"  /*LG*/
                                +"<td style='text-align: right;font-size:11px;'>"+formatNumber( row.LICENSE_FAIL )+"</td>"  /*LG*/
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
                    .appendTo($bottomRightTable);
            });

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

    var _yesterday = moment().add('d', -1).format("YYYY-MM-DD").toString();

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

    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
            $('#datepicker01').datepicker('hide');
    });
    $('#datepicker02').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
         $('#datepicker02').datepicker('hide');
    });


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

    /*교정이 시급합니다.*/
    $("input[name=WORKGROUP_ID]").val("b849c85e-be04-40b9-9787-570afdf52dc8");
    $("input[name=WORKGROUP_YN]").val("Y");
    $("input[name=WORKGROUP_NAME]").val("테스트모드입니다.");
    $("#datepicker01").val("2013-01-15");
    $("#datepicker02").val("2013-01-15");

    $("button[name=search]").trigger("click");

});
