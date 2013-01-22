
function goUrl(str){
  alert(str);
}
$(document).ready(function(){
    /*$("#logoutBtn").click(function(){
        jQuery.post("/adcaslte/svc/User-logout",{},function(result,stat){
            if (result.status == "SUCCESS") {
                alert(result.msg);
                location.href = result.forwardURL;
            } else {
                alert('에러가 발생하였습니다. 담당자에게 문의하시기 바랍니다.');
            }
        },"json");
    });*/

    /*(function(jQuery){
        jQuery.post("/adcaslte/leftMenu00_A.xml",{},function(result,stat){
            $(result).find("menu[name=WCDMA]").find("menu").has("menu").each(function(idx,obj){
                var _Wmenu = $("ul[id=WCDMA]");
                var __li = $('<li class="dropdown-submenu">');
                var __ul = $('<ul class="dropdown-menu">') ;
                $(obj).find("menu").each(function(_idx,_obj){
                    __ul.append('<li><a tabindex="-1" href="'+$(_obj).attr("url")+'">'+$(_obj).attr("name")+'</a></li>');
                });
                __li.append('<a tabindex="-1" href="'+$(obj).attr("url")+'">'+$(obj).attr("name")+'</a>');
                __li.append(__ul);
                _Wmenu.append(__li);
            });
        },"xml");
    })($);*/

    /*
        (function(jQuery){
             jQuery.post("/adcaslte/leftMenu00_A.xml",{},function(result,stat){
                $(result).find("menu[name=WCDMA]").find("menu").has("menu").each(function(idx,obj){
                    var _Wmenu = $("ul[id=WCDMA]");
                    var __li = $('<li class="dropdown-submenu">');
                    var __ul = $('<ul class="dropdown-menu">') ;
                    $(obj).find("menu").each(function(_idx,_obj){
                        __ul.append('<li><a tabindex="-1" href="#">'+$(_obj).attr("name")+'</a></li>');
                    });
                    __li.append('<a tabindex="-1" href="#">'+$(obj).attr("name")+'</a>');
                    __li.append(__ul);
                    _Wmenu.append(__li);
                });
             },"xml");
        })($);
    */

});

function openWindow(target) {
    if (target === 'constCqiThrp') {
        window.open('/adcaslte/environment/constCqiThrp.jsp','','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=1000,height=500');
    } else if (target === 'constTable') {
        window.open('/adcaslte/environment/constTable.jsp','','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=400,height=500');
    } else if (target === 'workgroup') {
        window.open('/adcaslte/workgroup/workgroup.jsp','workgroup','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=1000,height=700');
    } else if (target === '/temp') {
        return false;
        //window.open('/adcaslte/workgroup/workgroup.jsp','workgroup','scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=1000,height=700');
    } else {
        window.open('/adcaslte/'+target+'.jsp','','scrollbars=no,status=no,toolbar=no,resizable=no,location=no,menu=no,width=1280,height=750');
    }
}

