/*===============================================================================
 * 최대값 구하는 함수
 *==============================================================================*/
Array.prototype.max = function () {
    return Math.max.apply(null,this);
}

/*===============================================================================
 * 최소값 구하는 함수
 *==============================================================================*/
Array.prototype.min = function () {
    return Math.min.apply(null,this);
}

/*===============================================================================
 * 평균 구하는 함수
 *==============================================================================*/
Array.prototype.average = function () {
    if(!Object.prototype.toString.call(this) === "[object Array]") { return false;	}
    var i = this.length,
        sum = 0;
    while( i-- ){
        sum += this[i];
    }
    return (sum / this.length );

    /* array 함수 사용 패턴 */
    /* return this.reduce(function(a, b){return a+b;})/this.length; */ /*reduce 함수 사용*/
}

/*===============================================================================
 * 분산 구하는 함수
 *==============================================================================*/
Array.prototype.variance = function () {
    if(!Object.prototype.toString.call(this) === "[object Array]") { return false; }
    var avg = this.average()
        , i = this.length
        , v = 0;

    while( i-- ){
        v += Math.pow((this[i] - avg),2);  //편차(각변량-평균)의 제곱의 합
    }
    v /= this.length;  //분산 = 편차의 제곱의 합 / 총 변량의 개수
    return v;

    /* array 함수 사용 패턴 */
    /*
    var avg = this.average();
    var dev = this.map(function(a){return (a-avg)*(a-avg);});
    return dev.reduce(function(a, b){return a+b;})/this.length;
    */
}

/*===============================================================================
 * 표준편차 구하는 함수
 *==============================================================================*/
Array.prototype.stdDev = function () {
    if(!Object.prototype.toString.call(this) === "[object Array]") { return false; }
    var stdDev = Math.sqrt(this.variance());  //표준편차 = 분산의 제곱근
    return stdDev;
}

/*===============================================================================
 * HISTOGRAM 그리는 함수
 *==============================================================================*/
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

