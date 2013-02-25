$(document).ready(function(){

    //CQI Validation
    $(document).on('keyup', 'input[name^=CQI_]', function(e) {
        valiateNumField(this);
    });
    //CQI Number Format
    $(document).on('change', 'input[name^=CQI_]', function(e) {
        formatNumField(this,2);
    });

    //제조사별 CQI THRP 보기
    $("#mfcSelect").change(function() {
        toggleDataByMFC(toggleDataByRRU);
    });

    //RRU TYPE별 CQI THRP 보기
    $("#rruSelect").change(function() {
        toggleDataByRRU(toggleDataByMFC);
    });

    //CQI THRP 쿼리
    selectCqiThrp();

});

/*===============================================================================
 * 제조사 변경에 따른 데이타 SHOW OR HIDE
 *
 *==============================================================================*/
function toggleDataByMFC(callback) {

    var $tbody = $("#cqiThrpTable").find("tbody");
    var mfcCD = $("#mfcSelect").val();
    if (mfcCD !== 'ALL') {
        //callback이 아닐 경우만 실행
        if (arguments.length !== 0) {
            $tbody.find("tr").show();
        }
        $tbody.find("tr").not("[id^="+mfcCD+"]").hide();
    } else {
        //callback이 아닐 경우만 실행
        if (arguments.length !== 0) {
            $tbody.find("tr").show();
        }
    }

    if(typeof(callback) === 'function') {
        callback();
    }

}

/*===============================================================================
 * RRU TYPE 변경에 따른 데이타 SHOW OR HIDE
 *
 *==============================================================================*/
function toggleDataByRRU(callback) {

    var $tbody = $("#cqiThrpTable").find("tbody");
    var rruType = $("#rruSelect").val();
    if (rruType !== 'ALL') {
        //callback이 아닐 경우만 실행
        if (arguments.length !== 0) {
            $tbody.find("tr").show();
        }
        $tbody.find("tr").not("[id$="+rruType+"]").hide();
    } else {
        //callback이 아닐 경우만 실행
        if (arguments.length !== 0) {
            $tbody.find("tr").show();
        }
    }

    if(typeof(callback) === 'function') {
        callback();
    }

}

/*===============================================================================
 * CQI THRP 쿼리
 *
 *==============================================================================*/
function selectCqiThrp() {

    jQuery.post("/adcaslte/svc/Environment-selectConstCqiThrp",{},function(result,stat){

        var $tbody = $("#cqiThrpTable").find("tbody");

        //$tbody.find("tr:not(.info)").remove();
        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr id='"+row.MFC_CD+row.RRU_TYPE+"'>"
                +"<td class='tdCenter'>"
                +"<button class='btn btn-info btn-mini' onclick='modifyCqiThrp($(this).parents(\"tr\"))'>&nbsp;수정</button>"
                +"</td>"
                +"<td class='tdCenter'>"+row.LASTUPDATE+"</td>"
                +"<td class='tdCenter'>"+row.MFC_NM+"</td>"
                +"<td class='tdCenter'>"+row.RRU_TYPE+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_00,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_01,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_02,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_03,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_04,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_05,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_06,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_07,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_08,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_09,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_10,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_11,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_12,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_13,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_14,2)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.CQI_15,2)+"</td>"
                +"</tr>")
                .data("row",row)
                .appendTo($tbody);

        });

    },"json");
}

/*===============================================================================
 * CQI THRP 수정화면
 *
 *==============================================================================*/
function modifyCqiThrp($obj) {

    var $modifyCqiThrpModal = $("#modifyCqiThrpModal");
    $modifyCqiThrpModal.modal('show');

    $("#modifyView").remove();
    $("<div id='modifyView' style='margin-top:5px;'>"
        +"<form id='cqiThrpForm'>"
        +"<input type='hidden' name='MFC_CD' value='"+$obj.data('row').MFC_CD+"'>"
        +"<input type='hidden' name='RRU_TYPE' value='"+$obj.data('row').RRU_TYPE+"'>"
        //+"<div style='margin:5px;'>"
        //+"<button class='btn btn-info btn-mini' onclick='saveCqiThrp();'><i class='icon-ok'></i>&nbsp;저장</button>"
        //+"<span>&nbsp;</span>"
        //+"<button class='btn btn-info btn-mini' onclick=\"$('#modifyView').remove();\"><i class='icon-remove'></i>&nbsp;닫기</button>"
        //+"</div>"
        +"<table class='table table-bordered table-condensed'>"
        +"<tr>"
        +"<td class='tdCenterInfo'>제조사</td>"
        +"<td class='tdCenter'><input type='text' disabled value='"+$obj.data('row').MFC_NM+"'></td>"
        +"<td class='tdCenterInfo'>RRU TYPE</td>"
        +"<td class='tdCenter'><input type='text' disabled value='"+$obj.data('row').RRU_TYPE+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 00</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_00' style='text-align: right;' value='"+$obj.data('row').CQI_00+"'></td>"
        +"<td class='tdCenterInfo'>CQI 08</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_08' style='text-align: right;' value='"+$obj.data('row').CQI_08+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 01</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_01' style='text-align: right;' value='"+$obj.data('row').CQI_01+"'></td>"
        +"<td class='tdCenterInfo'>CQI 09</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_09' style='text-align: right;' value='"+$obj.data('row').CQI_09+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 02</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_02' style='text-align: right;' value='"+$obj.data('row').CQI_02+"'></td>"
        +"<td class='tdCenterInfo'>CQI 10</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_10' style='text-align: right;' value='"+$obj.data('row').CQI_10+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 03</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_03' style='text-align: right;' value='"+$obj.data('row').CQI_03+"'></td>"
        +"<td class='tdCenterInfo'>CQI 11</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_11' style='text-align: right;' value='"+$obj.data('row').CQI_11+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 04</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_04' style='text-align: right;' value='"+$obj.data('row').CQI_04+"'></td>"
        +"<td class='tdCenterInfo'>CQI 12</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_12' style='text-align: right;' value='"+$obj.data('row').CQI_12+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 05</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_05' style='text-align: right;' value='"+$obj.data('row').CQI_05+"'></td>"
        +"<td class='tdCenterInfo'>CQI 13</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_13' style='text-align: right;' value='"+$obj.data('row').CQI_13+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 06</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_06' style='text-align: right;' value='"+$obj.data('row').CQI_06+"'></td>"
        +"<td class='tdCenterInfo'>CQI 14</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_14' style='text-align: right;' value='"+$obj.data('row').CQI_14+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 07</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_07' style='text-align: right;' value='"+$obj.data('row').CQI_07+"'></td>"
        +"<td class='tdCenterInfo'>CQI 15</td>"
        +"<td class='tdCenter'><input type='text' name='CQI_15' style='text-align: right;' value='"+$obj.data('row').CQI_15+"'></td>"
        +"</tr>"
        +"</table>"
        +"<br>"
        +"<p><i class='icon-circle-arrow-down'></i>&nbsp;Excel에서 CQI 값을 복사해서 붙이고 적용버튼을 누르면 값이 적용됩니다.</p>"
        +"<textarea id='cqi' rows='2' style='width:515px; overflow:auto'></textarea>"
        +"<span>&nbsp;&nbsp;</span>"
        +"<button class='btn btn-mini' onclick='uploadCQI(event);'><i class='icon-circle-arrow-up'></i>&nbsp;적용</button>"
        +"</form>"
        +"</div>")
        .appendTo($modifyCqiThrpModal.find(".modal-body"));
}

/*===============================================================================
 * TEXTAREA에 있는 CQI 값 적용
 *
 *==============================================================================*/
function uploadCQI(event) {
    preventDefault(event);
    var rows = $("#cqi").val().split(/[\n\f\r]/);
    for(var i= 0, max = rows.length; i < max; i++) {
        var row = rows[i].split(/[\t]/);
        if (row.length !== 16) {
            alert('CQI 값은 00 ~ 15 까지 16개여야 합니다.(현재:'+row.length+'개)');
            return false;
        }
        for(var j= 0, max = row.length; j < max; j++) {
            $("input[name=CQI_"+(j < 10 ? '0'+j : j)+"]").val(formatNumber(row[j],2))
        }
        return false; // 한번만 적용
    }
    alert('적용되었습니다.');
}

/*===============================================================================
 * CQI THRP 저장
 *
 *==============================================================================*/
function saveCqiThrp() {

    var param = $('form[id=cqiThrpForm]').serializeArray();
    var regexp = /^(CQI_)/;
    for(var i= 0, max=param.length; i<max; i++) {
        if(regexp.test(param[i].name)) {
            param[i].value = param[i].value.replace(/,/g,"");
        }
    }
    jQuery.post("/adcaslte/svc/Environment-updateConstCqiThrp",param,function(result,stat){

        if (result.status == "SUCCESS") {
            $("#modifyCqiThrpModal").modal('hide');
            $("#modifyView").remove();
            selectCqiThrp() ;
        }

    },"json");

}

function modifyCqiThrpOLD($obj) {
    $("#modifyView").remove();
    $("<div id='modifyView' style='margin-top:10px;'>"
        +"<form id='cqiThrpForm'>"
        +"<input type='hidden' name='MFC_CD' value='"+$obj.data('row').MFC_CD+"'>"
        +"<input type='hidden' name='RRU_TYPE' value='"+$obj.data('row').RRU_TYPE+"'>"
        +"<div style='margin:5px;'>"
        +"<button class='btn btn-info btn-mini' onclick='saveCqiThrp();'><i class='icon-ok'></i>&nbsp;저장</button>"
        +"<span>&nbsp;</span>"
        +"<button class='btn btn-info btn-mini' onclick=\"$('#modifyView').remove();\"><i class='icon-remove'></i>&nbsp;닫기</button>"
        +"</div>"
        +"<table class='table table-bordered table-condensed'>"
        /*+"<colgroup>"
         +"<col class='col01'>"
         +"<col class='col02'>"
         +"<col class='col01'>"
         +"<col class='col02'>"
         +"</colgroup>"*/
        +"<tr>"
        +"<td class='tdCenterInfo'>제조사</td>"
        +"<td><input type='text' disabled value='"+$obj.data('row').MFC_NM+"'></td>"
        +"<td class='tdCenterInfo'>RRU TYPE</td>"
        +"<td><input type='text' disabled value='"+$obj.data('row').RRU_TYPE+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 00</td>"
        +"<td><input type='text' name='CQI_00' style='text-align: right;' value='"+$obj.data('row').CQI_00+"'></td>"
        +"<td class='tdCenterInfo'>CQI 08</td>"
        +"<td><input type='text' name='CQI_08' style='text-align: right;' value='"+$obj.data('row').CQI_08+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 01</td>"
        +"<td><input type='text' name='CQI_01' style='text-align: right;' value='"+$obj.data('row').CQI_01+"'></td>"
        +"<td class='tdCenterInfo'>CQI 09</td>"
        +"<td><input type='text' name='CQI_09' style='text-align: right;' value='"+$obj.data('row').CQI_09+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 02</td>"
        +"<td><input type='text' name='CQI_02' style='text-align: right;' value='"+$obj.data('row').CQI_02+"'></td>"
        +"<td class='tdCenterInfo'>CQI 10</td>"
        +"<td><input type='text' name='CQI_10' style='text-align: right;' value='"+$obj.data('row').CQI_10+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 03</td>"
        +"<td><input type='text' name='CQI_03' style='text-align: right;' value='"+$obj.data('row').CQI_03+"'></td>"
        +"<td class='tdCenterInfo'>CQI 11</td>"
        +"<td><input type='text' name='CQI_11' style='text-align: right;' value='"+$obj.data('row').CQI_11+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 04</td>"
        +"<td><input type='text' name='CQI_04' style='text-align: right;' value='"+$obj.data('row').CQI_04+"'></td>"
        +"<td class='tdCenterInfo'>CQI 12</td>"
        +"<td><input type='text' name='CQI_12' style='text-align: right;' value='"+$obj.data('row').CQI_12+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 05</td>"
        +"<td><input type='text' name='CQI_05' style='text-align: right;' value='"+$obj.data('row').CQI_05+"'></td>"
        +"<td class='tdCenterInfo'>CQI 13</td>"
        +"<td><input type='text' name='CQI_13' style='text-align: right;' value='"+$obj.data('row').CQI_13+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 06</td>"
        +"<td><input type='text' name='CQI_06' style='text-align: right;' value='"+$obj.data('row').CQI_06+"'></td>"
        +"<td class='tdCenterInfo'>CQI 14</td>"
        +"<td><input type='text' name='CQI_14' style='text-align: right;' value='"+$obj.data('row').CQI_14+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>CQI 07</td>"
        +"<td><input type='text' name='CQI_07' style='text-align: right;' value='"+$obj.data('row').CQI_07+"'></td>"
        +"<td class='tdCenterInfo'>CQI 15</td>"
        +"<td><input type='text' name='CQI_15' style='text-align: right;' value='"+$obj.data('row').CQI_15+"'></td>"
        +"</tr>"
        +"</table>"
        /*+"<input type='text' name='CQI_01' style='text-align: right;' value='"+$obj.data('row').CQI_01+"'>"
         +"<input type='text' name='CQI_02' style='text-align: right;' value='"+$obj.data('row').CQI_02+"'>"
         +"<input type='text' name='CQI_03' style='text-align: right;' value='"+$obj.data('row').CQI_03+"'>"
         +"<input type='text' name='CQI_04' style='text-align: right;' value='"+$obj.data('row').CQI_04+"'>"
         +"<input type='text' name='CQI_05' style='text-align: right;' value='"+$obj.data('row').CQI_05+"'>"
         +"<input type='text' name='CQI_06' style='text-align: right;' value='"+$obj.data('row').CQI_06+"'>"
         +"<input type='text' name='CQI_07' style='text-align: right;' value='"+$obj.data('row').CQI_07+"'>"
         +"<input type='text' name='CQI_09' style='text-align: right;' value='"+$obj.data('row').CQI_09+"'>"
         +"<input type='text' name='CQI_10' style='text-align: right;' value='"+$obj.data('row').CQI_10+"'>"
         +"<input type='text' name='CQI_11' style='text-align: right;' value='"+$obj.data('row').CQI_11+"'>"
         +"<input type='text' name='CQI_12' style='text-align: right;' value='"+$obj.data('row').CQI_12+"'>"
         +"<input type='text' name='CQI_13' style='text-align: right;' value='"+$obj.data('row').CQI_13+"'>"
         +"<input type='text' name='CQI_14' style='text-align: right;' value='"+$obj.data('row').CQI_14+"'>"
         +"<input type='text' name='CQI_15' style='text-align: right;' value='"+$obj.data('row').CQI_15+"'>"*/
        +"</form>"
        +"</div>")
        .appendTo('body');
}

