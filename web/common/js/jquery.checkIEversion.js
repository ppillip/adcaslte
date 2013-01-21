if($.browser.msie){
    if( $.browser.version < "8.0" ) {
        //$("body").prepend("<div style='position: absolute;top:1px;left:1px;color:red;'>* 현재 IE "+ $.browser.version + "버전을 쓰고 계십니다. 8.0 버전 이상으로 업데이트 바랍니다.</div>");
        alert("현재 지원하지 않는 브라우저(IE "+ $.browser.version + ")로 감지되었습니다. \n\n IE 8.0 버전 이상으로 업데이트 바랍니다.");
    }
}