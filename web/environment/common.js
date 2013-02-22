/*===============================================================================
 * QUERY 시 값이 null인 경우 JSON 에 포함되지 않는 문제해결
 *==============================================================================*/
function isUndifined(obj,str){
    if(typeof(obj)==="undefined"){
        return str;
    }else{
        return obj;
    }
}

/*===============================================================================
 * 소수점 지정 Function
 *==============================================================================*/
function formatNumber(obj,point,delimiter){
    if(isUndifined(obj,"-") === "-"){
        return "-" ;
    } else {
        return accounting.formatNumber(new Number(obj), point, delimiter, ".");
    }
}

/*===============================================================================
 * 숫자입력필드 Validate Function
 *==============================================================================*/
function valiateNumField(obj,pRegExp) {
    var regExp = /[^\d.-]/g;
    if(pRegExp) regExp = pRegExp;
    var value = obj.value.replace(regExp,"");

    var dotMatch = value.match(/\./g);
    if (dotMatch && dotMatch.length > 1) {
        for (var i=0; i<dotMatch.length-1; i++) {
            value = value.replace('.',"");
        }
    }
    var minusMatch = value.match(/-/g);
    if (minusMatch) {
        var firstChar = value.substring(0,1);
        value = value.substring(1).replace(/-/g,"");
        value = firstChar + value;
    }
    obj.value = value;
}

/*===============================================================================
 * 숫자입력필드 Format Function
 *==============================================================================*/
function formatNumField(obj,point,delimiter) {
    if(typeof(delimiter) === 'undefined') {
        delimiter = ',';
    }
    obj.value = formatNumber(obj.value, point,delimiter);
}

