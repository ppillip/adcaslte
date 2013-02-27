$(document).ajaxStart(function(){
    $("<div id='t_progress' style='position: absolute;top:340px;left:420px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>").appendTo("body");
}).ajaxComplete(function(){
    $("#t_progress").remove();
}).ajaxError(function(){
    $("#t_progress").remove();
});

$(document).ready(function(){

    $("#workgroup").click(function(){
        window.open('/adcaslte/workgroup/workgroup.jsp','interest','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=820,height=700');
    });

/*===============================================================================
 * For 기간
 *==============================================================================*/
    var _yesterday = moment().add('d', -2).format("YYYY-MM-DD").toString();

    $('#datepicker01').val(_yesterday)
        .datepicker(
        {format : "yyyy-mm-dd"}
    ).on('changeDate', function(){
        $('#datepicker01').datepicker('hide');
    });
/*===============================================================================
 * End For 기간
 *==============================================================================*/

/*===============================================================================
 * For SEARCH
 *==============================================================================*/
    $("#divSearch button[name=search]").click(function(){

        if(!$("#datepicker01").val()) {
            alert('일자를 입력하지 않았습니다.');
            return false;
        }

        var param = parseParam(this);
        param["WORKGROUP_ID"] = "INTEREST";
        param["QUERY_TYPE"]   = "TROUBLE";

        var btn = $(this);
        btn.button('loading');

        var $tbody = $("#troubleListTable").find("tbody");
        $tbody.find("tr").remove();
        window.resultRows = [];
        jQuery.post("/adcaslte/svc/Solution-selectInterestList",param,function(result,stat){

            if(result.error || result.rows.length === 0){
                btn.button('reset');
                $('.pagination').empty();
                alert(result.msg);
                return false;
            }

            window.resultRows = result.rows; //For Paging
            window.criticalVal = result.userCriticalValues; //For 임계치
            $("#THROUGHPUT").text("용량(Mbps)"+"(<"+result.userCriticalValues.DL_RRU_VAL1+")");
            $("#DL_PRB_RATE").text("PRB사용률"+"(>"+result.userCriticalValues.PRB_USG_VAL1+")");
            $("#RSSI").text("RSSI"+"(>"+result.userCriticalValues.UL_POWER_VAL1+")");

            btn.button('reset');

            pagingChange(15,1);

        },"json");

    });
/*===============================================================================
 * End For SEARCH
 *==============================================================================*/

});

/*===============================================================================
 * Trouble 국소 데이타 가져오는 Function
 *
 *==============================================================================*/
function getTroubleList(pageSize,pageNo,callback) {

    var $tbody = $("#troubleListTable").find("tbody");
    $tbody.find("tr").remove();
    var sNum = pageSize * (pageNo-1);

    var rows = $.map(window.resultRows, function(obj){return $.extend(true, {}, obj);});
    rows = rows.splice(sNum,pageSize);

    for(var idx= 0,max =rows.length; idx < max; ++idx){
        var row = rows[idx];

        $("<tr>"
            +"<td style='text-align:center'>"+row.YMD+"</td>"
            +"<td style='text-align:center'>"+row.BTS_NM+"</td>"
            +"<td style='text-align:center'>"+row.CELL_ID+"</td>"
            +"<td style='text-align:center'>"+row.MCID+"</td>"
            +"<td style='text-align:center'>"+row.FREQ_KIND+"</td>"
            +"<td style='text-align:right;'>" // cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,this);'>"
            +(function(value,sign,critical) {
                if(Number(value) && critical != null && eval(value+sign+critical)) {
                    return "<span style='color:red'>"+value+"</span>";
                } else {
                    return value;
                }
            })(formatNumber(row.THROUGHPUT,1),'<',window.criticalVal && window.criticalVal.DL_RRU_VAL1)
            +"</td>"
            +"<td style='text-align:right;'>" // cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,this);'>"
            +(function(value,sign,critical) {
                if(Number(value) && critical != null && eval(value+sign+critical)) {
                    return "<span style='color:red'>"+value+"</span>";
                } else {
                    return value;
                }
            })(formatNumber(row.DL_PRB_RATE,1),'>',window.criticalVal && window.criticalVal.PRB_USG_VAL1)
            +"</td>"
            +"<td style='text-align:right;'>" // cursor:pointer;' onclick='javascript:openDownLinkByNMS(event,this);'>"
                +(function(value,sign,critical) {
                if(Number(value) && critical != null && eval(value+sign+critical)) {
                    return "<span style='color:red'>"+value+"</span>";
                } else {
                    return value;
                }
            })(formatNumber(row.RSSI,1),'>',window.criticalVal && window.criticalVal.UL_POWER_VAL1)
            +"</td>"
            +"</tr>")
            .data("row",row)
            .appendTo($tbody);
    }

    if(typeof(callback) === 'function') {
        if (rows[0]) callback(rows[0].TOTAL_COUNT);
    }

}

/*===============================================================================
 * jQuery.paging.js에서 호출하는 함수
 *
 *==============================================================================*/
function pagingChange(pageSize, pageNo) {
//    console.log(this.constructor.name);
    getTroubleList(pageSize,pageNo,function(totalSize) {

        var pagingOptions = {
            'totalSize' : totalSize,
            'pageNo' : pageNo,
            'pageSize' : pageSize,
            'pageClickFunctionName': 'pagingChange',
            'showUnlinkedSymbols' : false
        };

        $('.pagination').showPaging(pagingOptions);

    });

}

function openDownLinkByNMS(event,badType,obj) {
    event.preventDefault();
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