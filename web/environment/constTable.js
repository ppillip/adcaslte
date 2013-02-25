$(document).ready(function(){

    //CONST_VAL Validation
    $(document).on('keyup', 'input[name=CONST_VAL]', function(e) {
        valiateNumField(this);
    });
    $(document).on('change', 'input[name=CONST_VAL]', function(e) {
        var $this = $(this);
        var constType = $this.parents("tr:first").data("row").CONST_TYPE;
        if (constType === 'STD_THRP') {
            formatNumField(this,0);
        } else {
            formatNumField(this,3);
        }
    });

    $("#modifyBtn").click(function(event){
        preventDefault(event);
        changeMode('edit');
    });

    $("#saveBtn").click(function(event){
        preventDefault(event);
        saveConstTable();
    });

    $("#cancelBtn").click(function(event){
        preventDefault(event);
        changeMode('view');
    });

    //CONST TABLE 쿼리
    selectConstTable();

});

/*===============================================================================
 * CONST TABLE 쿼리
 *
 *==============================================================================*/
function selectConstTable() {

    jQuery.post("/adcaslte/svc/Environment-selectConstTable",{},function(result,stat){

        var $tbody = $("#constTable").find("tbody");

        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr name='view'>"
                +"<td class='col1 tdCenterInfo'>"+row.RAMARK+"</td>"
                +"<td class='col2 tdRight'>"
                +(function (point) {
                    return formatNumber(row.CONST_VAL,point);
                })(row.CONST_TYPE === 'STD_THRP'?0:3)
                +"</td>"
                +"<td class='col3 tdCenter'>"+row.LASTUPDATE+"</td>"
                +"</tr>"
             +"<tr name='edit' style='display:none'>"
                +"<input type='hidden' name='CONST_TYPE' value='"+row.CONST_TYPE+"'>"
                +"<td><input type='text' name='RAMARK' style='width:150px;' value='"+row.RAMARK+"'></td>"
                +"<td><input type='text' name='CONST_VAL' style='width:60px; text-align: right;' value='"
                +(function (point) {
                    return formatNumber(row.CONST_VAL,point);
                })(row.CONST_TYPE === 'STD_THRP'?0:3)
                +"'></td>"
                +"<td class='col3 tdCenter'>"+row.LASTUPDATE+"</td>"
                +"</tr>")
                .data("row",row)
                .appendTo($tbody);

        });

    },"json");
}

/*===============================================================================
 * CONST TABLE 저장
 *
 *==============================================================================*/
function saveConstTable() {

    var param = $('form[id=constTableForm]').serializeArray();
    for(var i= 0, max=param.length; i<max; i++) {
        if(param[i].name === 'CONST_VAL') {
            param[i].value = param[i].value.replace(/,/g,"");
        }
    }
    jQuery.post("/adcaslte/svc/Environment-updateConstTable",param,function(result,stat){

        if (result.status == "SUCCESS") {
            changeMode('view');
            selectConstTable();
        }

    },"json");

}

/*===============================================================================
 * 화면 변경
 *
 *==============================================================================*/
function changeMode(mode) {
    if (mode === 'view') {
        $("tr[name=view]").show();
        $("#modifyBtn").show();
        $("tr[name=edit]").hide();
        $("#saveBtn").hide();
        $("#cancelBtn").hide();
    } else if (mode === 'edit') {
        $("tr[name=view]").hide();
        $("#modifyBtn").hide();
        $("tr[name=edit]").show();
        $("#saveBtn").show();
        $("#cancelBtn").show();
    }
}