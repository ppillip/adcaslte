(function( $ ){

    var methods = {
//        init : function( options ) {
//            null;
//        },
        drawThrpGraph : function(rows) {

//            console.log('rows');
//            console.log(rows);

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

//            console.log('categories');
//            console.log(categories);

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
                    name = _thisRow.YMD + ":" + _thisRow.BTS_NM + ":" + _thisRow.CELL_ID+ ":" + _thisRow.MCID+ ":" + _thisRow.FREQ_KIND;
                }
                var _thisData = Number(isUndifined(_thisRow.THROUGHPUT,0).toFixed(1));

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

//            console.log('series');
//            console.log(series);

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
        drawHistogram : function(rows,callback) {

            var thrpVal = [];
            for(var i=0,max=rows.length; i<max; i++) {
                thrpVal[i] = isUndifined(rows[i].THROUGHPUT,0);
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

            /*categoryVal 구하기*/
            for(i = 0; i<categoryVal.length; i++){
                compVal[i] = minVal + mVal*(i);
                categoryVal[i] = ( compVal[i] + mVal/2 ).toFixed(2);
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
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
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

