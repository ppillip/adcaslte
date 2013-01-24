/**
 * Created with IntelliJ IDEA.
 * User: ppillip
 * Date: 13. 1. 16
 * Time: 오전 9:57
 * To change this template use File | Settings | File Templates.
 */
Array.prototype.resultHistogramList = function (callback){

    var minVal = Math.min.apply(null,this);
    var maxVal = Math.max.apply(null,this);

    var rVal        = [0,0,0,0,0,0,0,0,0,0];
    var compVal     = [0,0,0,0,0,0,0,0,0,0];
    var categoryVal = [0,0,0,0,0,0,0,0,0,0];
    var cdf         = [0,0,0,0,0,0,0,0,0,0];

    var mVal = (maxVal - minVal) / 10;

    /*categoryVal 구하기*/
    for(i = 0; i<categoryVal.length; i++){
        compVal[i] = minVal + mVal*(i);
        categoryVal[i] = ( compVal[i] + mVal/2 ).toFixed(2);
    }

    /*rVal 구하기*/
    for(i =0; i< this.length; i++){
        for(j=compVal.length-1; j>=0; j--){
            if( this[i] >= compVal[j]){
                rVal[j] = rVal[j] + 1;
                break;
            }
        }
    }

    /*cdf 구하기*/
    for(i=0;i<cdf.length;i++){
        if(i==0) a = 0;
        else a = cdf[i-1];

        cdf[i] = a + rVal[i];
    }

    callback(categoryVal,rVal,cdf);
}

/*
var tVal = [2.12,2.22,1.69,2.02,1.79,1.77,2.11,1.56,1.99,1.75];
tVal.resultHistogramList(function(a,b,c){
    console.log(" categoryVal = " +  a);
    console.log(" rVal = " +  b);
    console.log(" cdf = " +  c);
})
*/


