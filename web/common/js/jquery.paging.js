(function($) {

    $.fn.showPaging = function(options) {

        var defaultOptions = {
            totalSize : 0,      // total size
            pageNo : 1,         // current page No
            pageSize : 10,      // list per page count
            pageListSize : 10,  // page bar count 1 2 3 4 5
            pageClickFunctionName : 'listChange',
            showUnlinkedSymbols : true
        };


        var opts = $.extend({},defaultOptions,options);

        var original = this;

        var action = {

            init : function() {
                var totalPage = Math.ceil(opts.totalSize/opts.pageSize);
                var totalPageList = Math.ceil(totalPage/opts.pageListSize);
                var pageList = Math.ceil(opts.pageNo/opts.pageListSize);
                if (pageList < 1) pageList = 1;
                if (pageList > totalPageList) pageList = totalPageList;
                var startPageList = (pageList - 1) * opts.pageListSize + 1;
                var endPageList = startPageList + opts.pageListSize - 1;

                if (startPageList < 1) startPageList = 1;
                if (endPageList > totalPage) endPageList = totalPage;
                if (endPageList < 1) endPageList = 1;

                var innerHTML = action.getPageItemLink(1, "<i class='icon-step-backward'></i>", (opts.pageNo > 1), '');
                innerHTML += action.getPageItemLink((startPageList - 1), "<i class='icon-chevron-left'></i>", (startPageList > 1), '');
                for (var i = startPageList; i <= endPageList; i++) {

                    innerHTML += action.getNumberLink(i, null, (opts.pageNo != i), ((opts.pageNo == i)? 'strong': ''));
                    if (i < endPageList) {
                        //innerHTML += ' | ';       // separate action
                    }
                }
                innerHTML += action.getPageItemLink((endPageList + 1)," <i class='icon-chevron-right'></i>",(endPageList < totalPage), '');
                innerHTML += action.getPageItemLink(totalPage, " <i class='icon-step-forward'></i>", (opts.pageNo < totalPage), 'arrow next');
                $(original).html(innerHTML);

            },

            getNumberLink : function(pageNo, text, useLink, className) {
                if (useLink) {
                    return "<button class='btn btn-mini' onclick='" + opts.pageClickFunctionName + "(" + opts.pageSize + "," + pageNo + ")'>" + ((text != null && text != '')? text: pageNo) + '</button> ';
                }
                else {
                    return "<button class='btn btn-mini btn-info'" + ((className != null && className != '')? ' class="' + className + '"': '') +' style="font-weight:bold">' +
                        ((text != null && text != '')? text: pageNo) +
                        '</button> ';
                }
            },

            getPageItemLink : function(pageNo, text, useLink, className) {
                if(useLink) {
                    return  "<button class='btn btn-mini' onclick='" + opts.pageClickFunctionName + "(" + opts.pageSize + "," + pageNo + ")'>" +
                        ((text != null && text != '')? text: pageNo) +
                        "</button>";
                }
                else {
                    if(opts.showUnlinkedSymbols) {
                        return "<button class='btn btn-mini'>" +
                            ((text != null && text != '')? text: pageNo) +
                            "</button>";
                    } else {
                        return '';
                    }
                }
            }

        };

        action.init();
    };

})(jQuery);