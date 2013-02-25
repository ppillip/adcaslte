
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
 * 본부/팀별 현황표 상세 데이타 가져오는 Function
 *
 *==============================================================================*/
function getSolutionDetail(callback) {
    var param = parseQueryString(window.location.search.substring(1));
    delete param['USER_ID'];
    delete param['USER_PW'];
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
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0001\",this);'>"+formatNumber(row.THROUGHPUT_CNT,0)+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0002\",this);'>"+formatNumber(row.PRB_RATE_CNT,0)+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0003\",this);'>"+formatNumber(row.UL_IF_POWER_CNT,0)+"</td>"
                +"<td style='text-align:right; cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,\"BAD0004\",this);'>"+formatNumber(row.LICENSE_FAIL_CNT,0)+"</td>"
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
    if(event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    var param = parseQueryString(window.location.search.substring(1));
    var _row = $(obj).parents("tr:first").data('row');
    var title = "";

    if(badType === 'BAD0001') {
        title = '용량저하 : ';
    } else if(badType === 'BAD0002') {
        title = 'PRB사용률불량 : ';
    } else if(badType === 'BAD0003') {
        title = 'UL불량 : ';
    } else if(badType === 'BAD0004') {
        title = '라이센스실패호 : ';
    }
    title += _row.PART_NM;
    var queryString = '?YMD='+param['YMD']+'&DAYTIME_SEQ='+param['DAYTIME_SEQ']+'&MBTYPE='+param['RTYPE_CD']+'&FREQ_KIND='+_row.FREQ_KIND+'&PART_CD='+_row.PART_CD+'&BAD_TYPE='+badType+'&WORKGROUP_NAME='+title;
    window.open('/adcaslte/downLinkByNMS/downLinkByNMS.jsp'+queryString,'','scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=1280,height=700');
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