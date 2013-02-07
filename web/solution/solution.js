
$(document).ready(function(){
    getSolutionDetail();
});

var parseQueryString = function(queryString) {
    var params = {}, queries, temp, i, l;

    // Split into key/value pairs
    queries = queryString.split("&");

    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params;
};

/*===============================================================================
 * //본부/팀별 현황표 상세 데이타 가져오는 Function
 *
 *==============================================================================*/
function getSolutionDetail(callback) {
    var param = parseQueryString(window.location.search.substring(1));

    jQuery.post("/adcaslte/svc/Solution-selectSolutionDetail",param,function(result,stat){

        var $tbody = $("#solutionListTable").find("tbody");

        $tbody.find("tr").remove();

        for(var idx= 0,max =result.rows.length; idx < max; ++idx){
            var row = result.rows[idx];

            $("<tr>"
                +"<td style='text-align:center'>"+row.YMD+"</td>"
                +"<td style='text-align:center'>"+row.BONBU_NM+"</td>"
                +"<td style='text-align:center'>"+row.OPER_TEAM_NM+"</td>"
                +"<td style='text-align:center'>"+row.PART_NM+"</td>"
                +"<td style='text-align:center'>"+row.FREQ_KIND+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0001\",this);'>"+isUndifined(accounting.formatNumber(new Number(row.THROUGHPUT_CNT), 0, ","),"-")+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0002\",this);'>"+isUndifined(accounting.formatNumber(new Number(row.PRB_RATE_CNT), 0, ","),"-")+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0003\",this);'>"+isUndifined(accounting.formatNumber(new Number(row.UL_IF_POWER_CNT), 0, ","),"-")+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0004\",this);'>"+isUndifined(accounting.formatNumber(new Number(row.LICENSE_FAIL_CNT), 0, ","),"-")+"</td>"
                +"</tr>")
                .data("row",row)
                .appendTo($tbody);
        }

        if(typeof(callback) === 'function') {
            callback();
        }

    },"json");
}

function openDownLinkByNMS(event,badType,obj) {
    event.preventDefault();
//    var param = parseQueryString(window.location.search.substring(1));
//    var _row = $(obj).parents("tr:first").data('row');
//    param['FREQ_KIND'] = _row.FREQ_KIND;
//    param['PART_CD']   = _row.PART_CD;
//    param['BAD_TYPE']  = badType;
//
//    var cellList = [];
//    var title    = _row.PART_NM;
//
//    jQuery.post("/adcaslte/svc/Solution-selectSolutionCellList",param,function(result,stat){
//
//        for(var idx= 0,max =result.rows.length; idx < max; ++idx){
//            var row = result.rows[idx];
//            cellList.push(row.CELL_INFO);
//        }
//
//        var cellListId = new Date().getTime();
//        $("<input type='hidden' id='"+cellListId+"' value='"+cellList.join("|")+"'>").appendTo("body");
//
//        if(badType = 'BAD0001') {
//            title += ' : 용량저하';
//        } else if(badType = 'BAD0002') {
//            title += ' : PRB사용률불량';
//        } else if(badType = 'BAD0003') {
//            title += ' : UL불량';
//        } else if(badType = 'BAD0004') {
//            title += ' : 라이센스실패호';
//        }
//        var titleId = new Date().getTime();
//        $("<input type='hidden' id='"+titleId+"' value='"+title+"'>").appendTo("body");
//
//        jQuery.post("/adcaslte/svc/User-login",{USER_ID:param['USER_ID'],USER_PW:param['USER_PW']},function(result,stat){
//            window.open('/adcaslte/downLinkByNMS/downLinkByNMS.jsp?DUIDs='+cellListId+'&WORKGROUP_NAME='+titleId+'&YMD='+_row.YMD+'&FREQ_KIND='+_row.FREQ_KIND,'','scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1280,height=700');
//        });
//
//    },"json");
    var param = parseQueryString(window.location.search.substring(1));
    var _row = $(obj).parents("tr:first").data('row');
    var title = "";
    if(badType = 'BAD0001') {
        title = '용량저하 : ';
    } else if(badType = 'BAD0002') {
        title = 'PRB사용률불량 : ';
    } else if(badType = 'BAD0003') {
        title = 'UL불량 : ';
    } else if(badType = 'BAD0004') {
        title = '라이센스실패호 : ';
    }
    title += _row.PART_NM;
    var queryString = '?YMD='+param['YMD']+'&DAYTIME_SEQ='+param['DAYTIME_SEQ']+'&MBTYPE='+param['RTYPE_CD']+'&FREQ_KIND='+_row.FREQ_KIND+'&PART_CD='+_row.PART_CD+'&BAD_TYPE='+badType+'&WORKGROUP_NAME='+title;
    jQuery.post("/adcaslte/svc/User-login",{USER_ID:param['USER_ID'],USER_PW:param['USER_PW']},function(result,stat){
        window.open('/adcaslte/downLinkByNMS/downLinkByNMS.jsp'+queryString,'','scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1280,height=700');
    });

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function getQuerystring2(key, default_)
{
    if (default_==null)
    {
        default_="";
    }
    var search = unescape(location.search);
    if (search == "")
    {
        return default_;
    }
    search = search.substr(1);
    var params = search.split("&");
    for (var i = 0; i < params.length; i++)
    {
        var pairs = params[i].split("=");
        if(pairs[0] == key)
        {
            return pairs[1];
        }
    }


    return default_;
}

/*===============================================================================
 * show User Info (create & modfity)
 *
 *==============================================================================*/
function showUserInfo(userID) {
    if(userID) {
        window.open('/adcaslte/user/userInfo.jsp?USER_ID='+userID,'modify','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=800,height=400');
    } else {
        window.open('/adcaslte/user/userInfo.jsp','create','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=800,height=400');
    }
}

/*===============================================================================
 * undefined item 처리 Function
 *
 *==============================================================================*/
function isUndifined(obj,str){
    if(typeof(obj)==="undefined"){
        return str;
    }else{
        return obj;
    }
}