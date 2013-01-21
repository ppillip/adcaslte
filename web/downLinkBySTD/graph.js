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