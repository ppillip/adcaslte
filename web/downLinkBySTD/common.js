/*===============================================================================
 * For Quick Menu
 *==============================================================================*/
$(document).ready(function () {
    $('#quickmenu_trigger').toggle(function() {
        $('#quickmenu_container').show();
    }, function() {
        $('#quickmenu_container').hide();
    });
});
/*===============================================================================
 * For Quick Menu
 *==============================================================================*/
function close_quickmenu() {
    $('#quickmenu_container').hide();
}

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
function formatNumber(obj){
    if(isUndifined(obj,"-") === "-"){
        return "-" ;
    } else {
        return accounting.formatNumber(new Number(obj), 1, ",", ".");
    }
}

/*===============================================================================
 * WorkGroup에서 호출하는 Function
 *==============================================================================*/
function setWorkgroup(workgroupID, duIDs, workgroupName) {
    if(workgroupID)  {
        $("input[name=WORKGROUP_YN]").val("Y");
    } else {
        $("input[name=WORKGROUP_YN]").val("N");
    }
    $("input[name=WORKGROUP_ID]").val(workgroupID);
    $("input[name=DUIDs]").val(duIDs);
    $("input[name=WORKGROUP_NAME]").val(workgroupName);
}

/*===============================================================================
 * Graph가 체크되었을 경우 TR 색상변경
 *==============================================================================*/
function checkedGraph(obj){
    if($(obj).attr("checked")){
        $("tr[name="+$(obj).attr("name")+"]").addClass("warning");
    }else{
        $("tr[name="+$(obj).attr("name")+"]").removeClass("warning");
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

/*===============================================================================
 * Bonbu Selet Setting (For 통계)
 *
 *==============================================================================*/
function setBonbuList($select,allChk,callback,$subSelect) {

    jQuery.post("/adcaslte/svc/Workgroup-selectBonbuList",{},function(result,stat){
        $select.empty();
        if(allChk) {
            $("<option value='ALL'>전체</option>")
                .appendTo($select);
        }
        $(result.rows).each(function(idx,row){
            $("<option value='"+row.BONBU_CD+"'>" +
                row.BONBU_NM +
                "</option>")
                .appendTo($select);
        });

        if(typeof(callback) === 'function') {
            callback($subSelect,true,$select.val());
        }

    },"json");
}

/*===============================================================================
 * Oper Team Selet Setting (For 통계)
 *
 *==============================================================================*/
function setOperTeamList($select,allChk,upperValue) {
    jQuery.post("/adcaslte/svc/Workgroup-selectOperTeamList",{BONBU_CD:upperValue},function(result,stat){
        $select.empty();
        if(allChk) {
            $("<option value='ALL'>전체</option>")
                .appendTo($select);
        }
        $(result.rows).each(function(idx,row){
            $("<option value='"+row.OPER_TEAM_CD+"'>" +
                row.OPER_TEAM_NM +
                "</option>")
                .appendTo($select);
        });

    },"json");

}

/*===============================================================================
 * City Selet Setting (For 통계)
 *
 *==============================================================================*/
function setCityList($select,allChk) {

    jQuery.post("/adcaslte/svc/Workgroup-selectCityList",{},function(result,stat){
        $select.empty();
        if(allChk) {
            $("<option value='ALL'>전체</option>")
                .appendTo($select);
        }
        $(result.rows).each(function(idx,row){
            $("<option value='"+row.CITY_CD+"'>" +
                row.CITY_NM +
                "</option>")
                .appendTo($select);
        });

        if(typeof(callback) === 'function') {
            callback($subSelect,true,$select.val());
        }

    },"json");
}

/*===============================================================================
 * MME Select Setting (For 통계)
 *
 *==============================================================================*/
function setMMEList($select,allChk,callback,$subSelect) {

    jQuery.post("/adcaslte/svc/Workgroup-selectMMEList",{},function(result,stat){
        $select.empty();
        if(allChk) {
            $("<option value='ALL'>전체</option>")
                .appendTo($select);
        }
        $(result.rows).each(function(idx,row){
            $("<option value='"+row.MME_GRP_ID+"'>" +
                row.MME_GRP_NM +
                "</option>")
                .appendTo($select);
        });

        if(typeof(callback) === 'function') {
            callback($subSelect,true,$select.val());
        }

    },"json");
}

/*===============================================================================
 * NE Select Setting  (For 통계)
 *
 *==============================================================================*/
function setNEList($select,allChk,upperValue) {
    jQuery.post("/adcaslte/svc/Workgroup-selectNEList",{MME_GRP_ID:upperValue},function(result,stat){
        $select.empty();
        if(allChk) {
            $("<option value='ALL'>전체</option>")
                .appendTo($select);
        }
        $(result.rows).each(function(idx,row){
            $("<option value='"+row.NE_ID+"'>" +
                row.NE_NM +
                "</option>")
                .appendTo($select);
        });

    },"json");

}


/*===============================================================================
 * 테이타 조회 진행 이미지 SHOW / HIDE
 *
 *==============================================================================*/
function toggleProgress(method) {
    var methods = {
        show : function (id,top) {
            $("#"+id).remove();
            // var topPx = (resultDataType === 'result'?'340px':'560px');
            $("<div id='"+id+"' style='position: absolute;z-index:2;top:"+top+";left:600px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>").appendTo("body");
        },
        hide : function (id) {
            $("#"+id).remove();
        },
        message : function (id,message) {
            $("#"+id).empty();
            $("#"+id).text(message);
        }
    }

    if (methods[method]) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else {
        alert(method+'는 존재하지 않는 함수입니다.');
    }
}

/*===============================================================================
 * 평균, 최대값, 최소값, 표준편차 구하는 함수
 *
 *==============================================================================*/
function getMath(method) {
    var methods = {
        isArray : function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        max : function (numArr) {
            return Math.max.apply(null,numArr);
        },
        min : function (numArr) {
            return Math.min.apply(null,numArr);
        },
        average : function(numArr){
            if(!methods['isArray'](numArr)) { return false;	}
            var i = numArr.length,
                sum = 0;
            while( i-- ){
                sum += numArr[i];
            }
            return (sum / numArr.length );
        },
        variance : function(numArr){
            if(!methods['isArray'](numArr)) { return false; }
            var avg = methods['average'](numArr)
                , i = numArr.length
                , v = 0;

            while( i-- ){
                v += Math.pow((numArr[i] - avg),2);  //편차(각변량-평균)의 제곱의 합
            }
            v /= numArr.length;  //분산 = 편차의 제곱의 합 / 총 변량의 개수
            return v;
        },
        //getStandardDeviation : function( numArr){
        stdDev : function(numArr){
            if(!methods['isArray'](numArr)) { return false; }
            var stdDev = Math.sqrt(methods['variance'](numArr));  //표준편차 = 분산의 제곱근
            return stdDev;
        }
    };

    if (methods[method]) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1));
    } else {
        alert(method+'는 존재하지 않는 함수입니다.');
    }

}

/*===============================================================================
 * 조회항목별 배열 얻는 함수
 *
 *==============================================================================*/
function getPropertiesArray(row,propertiesArray) {

    //각 항목별 배열만들기
    for (var key in row) {
        if (!propertiesArray[key]) {
            propertiesArray[key] = [];
            if(Number(row[key])) {
                propertiesArray[key].push(row[key]);
            }
        } else {
            if(Number(row[key])) {
                propertiesArray[key].push(row[key]);
            }
        }
    }

    return propertiesArray;

}

/*===============================================================================
 * 조회항목별 배열 평균, 최대값, 최소값, 표준편차 얻는 함수
 *
 *==============================================================================*/
function getStatsArray(propertiesArray) {

    //각항목 배열 통계
    var statsArray = [];

    for(var i=0; i < 4; i++) {
        var stats = {};
        for (key in propertiesArray) {
            if(i === 0) {
                stats[key] = getMath('average',propertiesArray[key]);
            } else if(i === 1) {
                stats[key] = getMath('max',propertiesArray[key]);
            } else if(i === 2) {
                stats[key] = getMath('min',propertiesArray[key]);
            } else if(i === 3) {
                stats[key] = getMath('stdDev',propertiesArray[key]);
            }
        }
        statsArray.push(stats);
    }

    return statsArray;

}

/*===============================================================================
 * 현재일 이전 일요일 얻는 함수
 *
 *==============================================================================*/
function getSunday(strDate) {
    var dateArray = strDate.split('-');
    var year  = dateArray[0];
    var month = dateArray[1];
    var date  = dateArray[2];

    var objDate = new Date(year, month-1, date);

    objDate.setDate(objDate.getDate() - objDate.getDay());

    year  = objDate.getFullYear();
    month = objDate.getMonth()+1;
    month = (month > 9 ? '' : '0') + month;
    date = objDate.getDate();
    date = (date > 9 ? '' : '0') + date;

    return year+'-'+month+'-'+date;

}

/*===============================================================================
 * 현재일 이후 토요일 얻는 함수
 *
 *==============================================================================*/
function getSaturday(strDate) {
    var dateArray = strDate.split('-');
    var year  = dateArray[0];
    var month = dateArray[1];
    var date  = dateArray[2];

    var objDate = new Date(year, month-1, date);

    objDate.setDate(objDate.getDate() + (6 - objDate.getDay()));

    year  = objDate.getFullYear();
    month = objDate.getMonth()+1;
    month = (month > 9 ? '' : '0') + month;
    date = objDate.getDate();
    date = (date > 9 ? '' : '0') + date;

    return year+'-'+month+'-'+date;

}

function preventDefault(event) {
    if(event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}