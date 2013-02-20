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
function formatNumber(obj,point){
    if(isUndifined(obj,"-") === "-"){
        return "-" ;
    } else {
        return accounting.formatNumber(new Number(obj), point, ",", ".");
    }
}

/*===============================================================================
 * Ajax 호출 Parameter 셋팅하는 Function
 *==============================================================================*/
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