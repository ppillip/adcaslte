(function( $ ){

    var methods = {
        drawCqiGraph : function(cellList,cqiType,mfcCd) {

            var rows = [];
            cellList.each(function(){
                rows.push($(this).parent().parent().data("row"));
            });
            var cqiSeries = [];

            for (var i= 0, max=rows.length; i<max; i++) {
                var _thisRow = rows[i];
                cqiSeries.push((function(row){
                    return {
                        name : (function (_row) {
                            if(_row.TITLE03) {
                                return _row.YMD + ":" + _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.TITLE03 + ":" + _row.FREQ_KIND;
                            } else if(_row.TITLE02) {
                                return _row.YMD + ":" + _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.FREQ_KIND;
                            } else if(_row.TITLE01) {
                                return _row.YMD + ":" + _row.TITLE01 + ":" + _row.FREQ_KIND;
                            } else if(_row.BTS_NM) {
                                return _row.YMD + ":" + _row.BTS_NM + ":" + _row.CELL_ID+ ":" + _row.MCID + ":" + _row.FREQ_KIND;
                            }
                        })(row)
                        ,data : (function (_row) {
                            var data = [];
                            for (var j=0; j<=15; j++) {
                                data.push(_row['CQI_'+cqiType+'_'+(j>=10?j:'0'+j)] || 0);
                            }
                            return data;
                        })(row)
                    }
                })(_thisRow));
            }

            var $this = $(this);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: $this.attr("id"),
                    type: 'line',
                    marginRight: 330,
                    marginBottom: 20
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
                        return (MFC_CD === "MFC00002")
                            ?['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', '#11', '#12', '#13', '#14', '#15', '#16']
                            :['#00', '#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', '#11', '#12', '#13', '#14', '#15'];
                    })(mfcCd || "MFC00001")
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
                    x: -20,
                    y: 30,
                    borderWidth: 0
                },
                series: cqiSeries
            });
        },

        drawCqiCompGraph : function(cellList,afterRows,cqiType,mfcCd,callback) {

            //For Excel File
            var cqiBeforeExcelData = {rows:[]};
            var cqiAfterExcelData  = {rows:[]};
            var rows = [];
            cellList.each(function(){
                rows.push($(this).parent().parent().data("row"));
            });
            var cqiSeries = [];

            for (var i= 0, max=rows.length; i<max; i++) {
                var _thisRow = rows[i];
                cqiSeries.push((function(row){
                    return {
                        name : (function (_row) {
                            if(_row.TITLE03) {
                                return _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.TITLE03 + ":" + _row.FREQ_KIND;
                            } else if(_row.TITLE02) {
                                return _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.FREQ_KIND;
                            } else if(_row.TITLE01) {
                                return _row.TITLE01 + ":" + _row.FREQ_KIND;
                            } else if(_row.BTS_NM) {
                                return _row.BTS_NM + ":" + _row.CELL_ID+ ":" + _row.MCID + ":" + _row.FREQ_KIND;
                            }
                        })(row)
                        ,data : (function (_row) {
                            var data = [];
                            for (var j=0; j<=15; j++) {
                                data.push(_row['CQI_'+cqiType+'_'+(j>=10?j:'0'+j)] || 0);
                            }
                            return data;
                        })(row)
                        ,row : row //For Excel File
                    }
                })(_thisRow));
            }

            var cqiCompSeries = [];

            for(var i= 0,max=afterRows.length; i<max; i++) {
                var _thisRow = afterRows[i];
                var seriesName = (function (_row) {
                    if(_row.TITLE03) {
                        return _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.TITLE03 + ":" + _row.FREQ_KIND;
                    } else if(_row.TITLE02) {
                        return _row.TITLE01 + ":" + _row.TITLE02 + ":" + _row.FREQ_KIND;
                    } else if(_row.TITLE01) {
                        return _row.TITLE01 + ":" + _row.FREQ_KIND;
                    } else if(_row.BTS_NM) {
                        return _row.BTS_NM + ":" + _row.CELL_ID+ ":" + _row.MCID + ":" + _row.FREQ_KIND;
                    }
                })(_thisRow);

                for (var j=0; j<cqiSeries.length; j++) {
                    if (cqiSeries[j].name === seriesName) {
                        cqiCompSeries.push({name:'전:'+cqiSeries[j].name,data:cqiSeries[j].data});
                        cqiCompSeries.push({name:'후:'+seriesName,data:(function (_row) {
                            var data = [];
                            for (var j=0; j<=15; j++) {
                                data.push(_row['CQI_'+cqiType+'_'+(j>=10?j:'0'+j)] || 0);
                            }
                            return data;
                        })(_thisRow)});
                        //For Excel File
                        cqiBeforeExcelData.rows.push(cqiSeries[j].row);
                        cqiAfterExcelData.rows.push(_thisRow);
                        break;
                    }
                }
            }

            var $this = $(this);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: $this.attr("id"),
                    type: 'line',
                    marginRight: 330,
                    marginBottom: 20
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
                        return (MFC_CD === "MFC00002")
                            ?['#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', '#11', '#12', '#13', '#14', '#15', '#16']
                            :['#00', '#01', '#02', '#03', '#04', '#05', '#06', '#07', '#08', '#09', '#10', '#11', '#12', '#13', '#14', '#15'];
                    })(mfcCd || "MFC00001")
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
                    x: -20,
                    y: 30,
                    borderWidth: 0
                },
                series: cqiCompSeries
            });

            if (typeof(callback) === 'function') {
                callback(cqiBeforeExcelData,cqiAfterExcelData);
            }

        },
        drawThrpGraph : function(rows,thrpColumnName) {

            var thrpColumn = "";
            if (thrpColumnName) {
                thrpColumn = thrpColumnName;
            } else {
                thrpColumn = "THROUGHPUT";
            }
            var categories = [];
            var series = [];

            for(var i= 0,max=rows.length; i<max; i++) {
                var notExist = true;
                if (categories) {
                    for (var j=0; j<categories.length; j++) {
                        if (categories[j] == rows[i].YMD) {
                            notExist = false;
                            break;
                        }
                    }
                    if(notExist) categories.push(rows[i].YMD);
                } else {
                    categories.push(rows[i].YMD);
                }
            }

            for(var i= 0,max=rows.length; i<max; i++) {
                var _thisRow = rows[i];
                var name = '';
                if(_thisRow.TITLE03) {
                    name = _thisRow.TITLE01 + ":" + _thisRow.TITLE02 + ":" + _thisRow.TITLE03 + ":" + _thisRow.FREQ_KIND;
                } else if(_thisRow.TITLE02) {
                    name = _thisRow.TITLE01 + ":" + _thisRow.TITLE02 + ":" + _thisRow.FREQ_KIND;
                } else if(_thisRow.TITLE01) {
                    name = _thisRow.TITLE01 + ":" + _thisRow.FREQ_KIND;
                } else {
                    name = _thisRow.BTS_NM + ":" + _thisRow.CELL_ID+ ":" + _thisRow.MCID+ ":" + _thisRow.FREQ_KIND;
                }
                var _thisData = Number(isUndifined(_thisRow[thrpColumn],0).toFixed(1));

                var notExist = true;
                if (series) {
                    for (var j=0; j<series.length; j++) {
                        if (series[j].name === name) {
                            series[j].data.push(_thisData)
                            notExist = false;
                            break;
                        }
                    }
                    if(notExist) series.push({name:name,data:[_thisData]});
                } else {
                    series.push({name:name,data:[_thisData]});
                }
            }

            var $this = $(this);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: $this.attr("id"),
                    type: 'line',
                    marginRight: 360,
                    marginBottom: 50
                },
                title: {
                    text: '용량그래프',
                    x: -150 //center
                },
                subtitle: {
                    text: 'Source: qcas.sktelecom.com',
                    x: -150
                },
                xAxis: {
                    categories : categories
                },
                yAxis: {
                    title: {
                        text: 'Mbps'
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
                    x: -20,
                    y: 30,
                    borderWidth: 0
                },
                series: series
            });
        },
        drawThrpCompGraph : function(beforeRows,afterRows,callback) {

//            console.log('rows');
//            console.log(rows);

            var categories = [];
            var series = [];
            var beforeSeries = [];
            var afterSeries = [];
            var afterSeriesData = [];

            for(var i= 0,max=beforeRows.length; i<max; i++) {
                var _thisRow = beforeRows[i];
                var category = '';
                if(_thisRow.TITLE03) {
                    category = _thisRow.TITLE01 + "<br>" + _thisRow.TITLE02 + "<br>" + _thisRow.TITLE03 + "<br>" + _thisRow.FREQ_KIND;
                } else if(_thisRow.TITLE02) {
                    category = _thisRow.TITLE01 + "<br>" + _thisRow.TITLE02 + "<br>" + _thisRow.FREQ_KIND;
                } else if(_thisRow.TITLE01) {
                    category = _thisRow.TITLE01 + "<br>" + _thisRow.FREQ_KIND;
                } else {
                    category = _thisRow.BTS_NM + "<br>" + _thisRow.CELL_ID+ ":" + _thisRow.MCID+ "<br>" + _thisRow.FREQ_KIND;
                }
                categories.push(category);
                beforeSeries.push(Number(isUndifined(_thisRow.THROUGHPUT,0).toFixed(1)));
                //beforeSeries.push({name:category,data:Number(isUndifined(_thisRow.THROUGHPUT,0).toFixed(1))});
            }

            for(var i= 0,max=afterRows.length; i<max; i++) {
                var _thisRow = afterRows[i];
                var category = '';
                if(_thisRow.TITLE03) {
                    category = _thisRow.TITLE01 + "<br>" + _thisRow.TITLE02 + "<br>" + _thisRow.TITLE03 + "<br>" + _thisRow.FREQ_KIND;
                } else if(_thisRow.TITLE02) {
                    category = _thisRow.TITLE01 + "<br>" + _thisRow.TITLE02 + "<br>" + _thisRow.FREQ_KIND;
                } else if(_thisRow.TITLE01) {
                    category = _thisRow.TITLE01 + "<br>" + _thisRow.FREQ_KIND;
                } else {
                    category = _thisRow.BTS_NM + "<br>" + _thisRow.CELL_ID+ ":" + _thisRow.MCID+ "<br>" + _thisRow.FREQ_KIND;
                }

                for (var j=0; j<categories.length; j++) {
                    if (categories[j] === category) {
                        afterSeriesData.push({name:category,data:Number(isUndifined(_thisRow.THROUGHPUT,0).toFixed(1))});
                        break;
                    }
                }
            }

            if (beforeSeries.length != afterSeriesData.length) {
                for (var i= 0; i<categories.length; i++) {
                    var notExist = true;
                    for(var j=0; j<afterSeriesData.length; j++) {
                        if (categories[i] === afterSeriesData[j].category) {
                            afterSeries.push(afterSeriesData[j].data);
                            notExist = false;
                            break;
                        }
                    }
                    if(notExist) afterSeries.push(0);
                }
            } else {
                for (var i=0; i<afterSeriesData.length; i++) {
                    afterSeries.push(afterSeriesData[i].data);
                }
            }
//            console.log('categories');
//            console.log(categories);
//            console.log('beforeSeries');
//            console.log(beforeSeries);
//            console.log('afterSeries');
//            console.log(afterSeries);

            var $this = $(this);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: $this.attr("id"),
                    type: 'column',
                    marginRight: 70,
                    marginBottom: 80
                },
                title: {
                    text: '용량그래프',
                    x: -30 //center
                },
                subtitle: {
                    text: 'Source: qcas.sktelecom.com',
                    x: -30
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Mbps'
                    }
                },
                legend: {
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 1010,
                    y: 50,
                    floating: true,
                    shadow: true
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                            this.x +' : '+ this.y;
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '전',
                    data: beforeSeries

                }, {
                    name: '후',
                    data: afterSeries

                }]
            });

            var thrpCompData = {categories:[],beforeSeries:[],afterSeries:[]};
            thrpCompData.categories = $.extend({},categories);
            thrpCompData.beforeSeries = $.extend({},beforeSeries);
            thrpCompData.afterSeries = $.extend({},afterSeries);

            if (typeof(callback) === 'function') {
                callback(thrpCompData);
            }

        },
        drawHistogram : function(rows,callback,thrpColumnName) {

            var thrpColumn = "";
            if (thrpColumnName) {
                thrpColumn = thrpColumnName;
            } else {
                thrpColumn = "THROUGHPUT";
            }
            var thrpVal = [];
            for(var i=0,max=rows.length; i<max; i++) {
                thrpVal[i] = isUndifined(rows[i][thrpColumn],0);
            }

            var minVal = Math.min.apply(null,thrpVal);
            var maxVal = Math.max.apply(null,thrpVal);
            var thrpCount = thrpVal.length;

            var compVal     = [0,0,0,0,0,0,0,0,0,0];
            var categoryVal = [0,0,0,0,0,0,0,0,0,0];
            var rVal        = [0,0,0,0,0,0,0,0,0,0];
            var rate        = [0,0,0,0,0,0,0,0,0,0];
            var cdf         = [0,0,0,0,0,0,0,0,0,0];

            var mVal = (maxVal - minVal) / 10;

            var k = 2;
            var ii = 1;
            for(var j = 1; j <6; j++) {
                ii = ii*0.1;
                if(maxVal - minVal >= ii) {
                    k =  1+j;
                    break;
                }
            }

            /*categoryVal 구하기*/
            for(i = 0; i<categoryVal.length; i++){
                compVal[i] = minVal + mVal*(i);
                categoryVal[i] = ( compVal[i] + mVal/2 ).toFixed(k);
            }

            /*rVal 구하기*/
            for(i =0; i< thrpCount; i++){
                for(j=compVal.length-1; j>=0; j--){
                    if( thrpVal[i] >= compVal[j]){
                        rVal[j] = rVal[j] + 1;
                        break;
                    }
                }
            }

            /*rate 구하기*/
            for(i=0;i<rate.length;i++){
                rate[i] = Number(((rVal[i])*100/thrpCount).toFixed(1));
            }

            /*cdf 구하기*/
            for(i=0;i<cdf.length;i++){
                if(i==0) a = 0;
                else a = cdf[i-1];

                cdf[i] = a + rate[i];
            }

//            console.log('thrpVal');
//            console.log(thrpVal);
//            console.log('categoryVal');
//            console.log(categoryVal);
//            console.log('compVal');
//            console.log(compVal);
//            console.log('rVal');
//            console.log(rVal);
//            console.log('rate');
//            console.log(rate);

            var $this = $(this);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: $(this).attr('id'),
                    zoomType: 'xy',
                    marginRight: 360,
                    marginBottom: 50
                },
                title: {
                    text: 'HISTOGRAM',
                    x: -150 //center
                },
                subtitle: {
                    text: 'Source: qcas.sktelecom.com',
                    x: -150 //center
                },
                xAxis: [{
                    categories: categoryVal
                }],
                yAxis: [
                    { // Primary yAxis
                        title: {
                            text: '%',
                            style: {
                                color: '#4572A7'
                            }
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            },
                            style: {
                                color: '#4572A7'
                            }
                        }/*,
                        min : 0,
                        max : 110*/
                    }
                    ,
                    { // Secondary yAxis
                        title: {
                            text: 'CDF',
                            style: {
                                color: '#89A54E'
                            }
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            },
                            style: {
                                color: '#89A54E'
                            }
                        },
                        min : 0,
                        max : 110,
                        opposite: true
                    }
                ],
                tooltip: {
                    formatter: function() {
                        return ''+
                            this.x +': '+ this.y + (this.series.name == '%' ? ' %' : '');
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 800,
                    verticalAlign: 'top',
                    y: 50,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                series: [
                    {
                        name: '%',
                        color: '#4572A7',
                        type: 'column',
                        data: rate
                    }
                    ,
                    {
                        name: 'CDF',
                        color: '#89A54E',
                        yAxis: 1,
                        type: 'spline',
                        data: cdf
                    }
                ]
            });

            var histogramData = {categoryVal:[],rVal:[],rate:[],cdf:[]};
            histogramData.categoryVal = $.extend({},categoryVal);
            histogramData.rVal = $.extend({},rVal);
            histogramData.rate = $.extend({},rate);
            histogramData.cdf = $.extend({},cdf);

            if (typeof(callback) === 'function') {
                callback(histogramData);
            }
        }
    };

    $.fn.highcharts = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jquery.highcharts' );
        }

    };

    function isUndifined(obj,str){
        if(typeof(obj)==="undefined"){
            return str;
        }else{
            return obj;
        }
    }

})( jQuery );

