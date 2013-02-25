$(document).ready(function(){

    //RSSI Validation
    $(document).on('keyup', 'input[name^=RSSI_]', function(e) {
        valiateNumField(this);
    });
    //RSSI Number Format
    $(document).on('change', 'input[name^=RSSI_]', function(e) {
        formatNumField(this,1);
    });

    //제조사별 RSSI 보기
    $("#mfcSelect").change(function() {
        toggleDataByMFC();
    });

    //RSSI 쿼리
    selectRssi();

});

/*===============================================================================
 * 제조사 변경에 따른 데이타 SHOW OR HIDE
 *
 *==============================================================================*/
function toggleDataByMFC() {

    var $tbody = $("#rssiTable").find("tbody");
    var mfcCD = $("#mfcSelect").val();
    if (mfcCD !== 'ALL') {
        $tbody.find("tr").hide();
        $tbody.find("#"+mfcCD).show();
    } else {
        $tbody.find("tr").show();
    }

}

/*===============================================================================
 * RSSI 쿼리
 *
 *==============================================================================*/
function selectRssi() {

    jQuery.post("/adcaslte/svc/Environment-selectConstRssi",{},function(result,stat){

        var $tbody = $("#rssiTable").find("tbody");

        //$tbody.find("tr:not(.info)").remove();
        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr id='"+row.MFC_CD+"'>"
                +"<td class='tdCenter'>"
                +"<button class='btn btn-info btn-mini' onclick='modifyRssi($(this).parents(\"tr\"))'>&nbsp;수정</button>"
                +"</td>"
                +"<td class='tdCenter'>"+row.LASTUPDATE+"</td>"
                +"<td class='tdCenter'>"+row.MFC_NM+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_01,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_02,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_03,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_04,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_05,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_06,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_07,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_08,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_09,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_10,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_11,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_12,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_13,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_14,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_15,1)+"</td>"
                +"<td class='tdRight'>"+formatNumber(row.RSSI_16,1)+"</td>"
                +"</tr>")
                .data("row",row)
                .appendTo($tbody);

        });

    },"json");
}

/*===============================================================================
 * RSSI 수정화면
 *
 *==============================================================================*/
function modifyRssi($obj) {

    var $modifyRssiModal = $("#modifyRssiModal");
    $modifyRssiModal.modal('show');

    $("#modifyView").remove();
    $("<div id='modifyView' style='margin-top:5px;'>"
        +"<form id='rssiForm'>"
        +"<input type='hidden' name='MFC_CD' value='"+$obj.data('row').MFC_CD+"'>"
        +"<table class='table table-bordered table-condensed'>"
        +"<tr>"
        +"<td class='tdCenterInfo'>제조사</td>"
        +"<td class='tdCenter'><input type='text' disabled value='"+$obj.data('row').MFC_NM+"'></td>"
        +"<td colspan='2'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 01</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_01' style='text-align: right;' value='"+$obj.data('row').RSSI_01+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 09</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_09' style='text-align: right;' value='"+$obj.data('row').RSSI_09+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 02</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_02' style='text-align: right;' value='"+$obj.data('row').RSSI_02+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 10</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_10' style='text-align: right;' value='"+$obj.data('row').RSSI_10+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 03</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_03' style='text-align: right;' value='"+$obj.data('row').RSSI_03+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 11</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_11' style='text-align: right;' value='"+$obj.data('row').RSSI_11+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 04</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_04' style='text-align: right;' value='"+$obj.data('row').RSSI_04+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 12</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_12' style='text-align: right;' value='"+$obj.data('row').RSSI_12+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 05</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_05' style='text-align: right;' value='"+$obj.data('row').RSSI_05+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 13</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_13' style='text-align: right;' value='"+$obj.data('row').RSSI_13+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 06</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_06' style='text-align: right;' value='"+$obj.data('row').RSSI_06+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 14</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_14' style='text-align: right;' value='"+$obj.data('row').RSSI_14+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 07</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_07' style='text-align: right;' value='"+$obj.data('row').RSSI_07+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 15</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_15' style='text-align: right;' value='"+$obj.data('row').RSSI_15+"'></td>"
        +"</tr>"
        +"<tr>"
        +"<td class='tdCenterInfo'>RSSI 08</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_08' style='text-align: right;' value='"+$obj.data('row').RSSI_08+"'></td>"
        +"<td class='tdCenterInfo'>RSSI 16</td>"
        +"<td class='tdCenter'><input type='text' name='RSSI_16' style='text-align: right;' value='"+$obj.data('row').RSSI_16+"'></td>"
        +"</tr>"
        +"</table>"
        +"<br>"
        +"<p><i class='icon-circle-arrow-down'></i>&nbsp;Excel에서 RSSI 값을 복사해서 붙이고 적용버튼을 누르면 값이 적용됩니다.</p>"
        +"<textarea id='rssi' rows='2' style='width:515px; overflow:auto'></textarea>"
        +"<span>&nbsp;&nbsp;</span>"
        +"<button class='btn btn-mini' onclick='uploadRssi(event);'><i class='icon-circle-arrow-up'></i>&nbsp;적용</button>"
        +"</form>"
        +"</div>")
        .appendTo($modifyRssiModal.find(".modal-body"));
}

/*===============================================================================
 * TEXTAREA에 있는 RSSI 값 적용
 *
 *==============================================================================*/
function uploadRssi(event) {
    preventDefault(event);
    var rows = $("#rssi").val().split(/[\n\f\r]/);
    for(var i= 0, max = rows.length; i < max; i++) {
        var row = rows[i].split(/[\t]/);
        if (row.length !== 16) {
            alert('RSSI 값은 01 ~ 16 까지 16개여야 합니다.(현재:'+row.length+'개)');
            return false;
        }
        for(var j= 1, max = row.length; j <= max; j++) {
            $("input[name=RSSI_"+(j < 10 ? '0'+j : j)+"]").val(formatNumber(row[j-1],1))
        }
        return false; // 한번만 적용
    }
    alert('적용되었습니다.');
}

/*===============================================================================
 * RSSI 저장
 *
 *==============================================================================*/
function saveRssi() {

    var param = $('form[id=rssiForm]').serializeArray();
    var regexp = /^(RSSI_)/;
    for(var i= 0, max=param.length; i<max; i++) {
        if(regexp.test(param[i].name)) {
            param[i].value = param[i].value.replace(/,/g,"");
        }
    }

    jQuery.post("/adcaslte/svc/Environment-updateConstRssi",param,function(result,stat){

        if (result.status == "SUCCESS") {
            $("#modifyRssiModal").modal('hide');
            $("#modifyView").remove();
            selectRssi() ;
        }

    },"json");

}
