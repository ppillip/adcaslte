$(document).ajaxStart(function(){
    $("<div id='t_progress' style='position: absolute;top:340px;left:620px;'><img src='/adcaslte/common/img/ajax-loader.gif'/></div>").appendTo("body");
}).ajaxComplete(function(){
        $("#t_progress").remove();
}).ajaxError(function(){
        $("#t_progress").remove();
});