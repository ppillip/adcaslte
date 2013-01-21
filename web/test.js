

$(document).ready(function(){
    $("<div style='display:none;position:fixed;top:1px;left:1px;width:35px;height:35px;'><img src='common/img/ajax-loader.gif'/></div>")
        .ajaxStart(function(){
            $(this).show();
        }).ajaxSuccess(function(){
            $(this).hide();
        }).prependTo("body");

    $("#searchOne").click(function(){

        $("#table01 tbody tr").remove();
        _tbody = $("#table01 tbody");
        jQuery.post("/adcaslte/svc/DiskStatus-selectDiskList",{},function(result,stat){

            $(result.rows).each(function(idx,row){
                $("<tr class='"+(function(a){
                    return ( Number(row.USABLERATE) > 90 ) ? "error" : "";
                })(row)+"'>"
                    +"<td>"+row.TABLESPACE+"</td>"
                    +"<td>"+row.SIZEM+"</td>"
                    +"<td>"+row.USINGM+"</td>"
                    +"<td>"+row.USABLEM+"</td>"
                    +"<td>"+row.USABLERATE+"</td>"
                    +"<td>"+row.FILENAME+"</td>"
                    +"</tr>")
                    .appendTo(_tbody);
            });


        },"json");
    });

    $("#searchBTS").click(function(){
        $("#table02 tbody tr").remove();
        _tbody = $("#table02 tbody");
        jQuery.post("/adcaslte/svc/DiskStatus-selectCharTest",{},function(result,stat){
            $(result.rows).each(function(idx,row){
                $("<tr>"
                    +"<td>"+row.BTS_NAME+"</td>"
                    +"</tr>")
                    .appendTo(_tbody);
            });
        },"json");
    });

    $("#makeBTS").click(function(){

        var param = {"BTS_NAME":$("#BTS_NAME").val()};

        jQuery.post("/adcaslte/svc/DiskStatus-makeKrRecord",param,function(result,stat){

            alert(result.msg);
            $("#BTS_NAME").val("");
            $("#searchBTS").trigger("click");

        },"json");
    });

    $("#searchDUList").click(function(){
        _tbody = $("#DUListTable tbody");
        jQuery.post("/adcaslte/svc/LteBtsInfo-selectDUListByCmsName",{"BTS_NM_CMS":$("#BTS_NM_CMS").val()},function(result,stat){

            if(result.error){
                alert(result.msg);
            }
            $("#DUListTable tbody tr").remove();
            $(result.rows).each(function(idx,row){
                $("<tr>"
                    +"<td>"+row.BTS_NM_CMS+"</td>"
                 +"</tr>")
                 .appendTo(_tbody);
            });
        },"json");
    });
});