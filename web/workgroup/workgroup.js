var workgroup;

$(document).ready(function(){

    workgroup = {

        $duList : $("#duListTable"),
        $workgroupTable : $("#workgroupTable"),
        $selectedWorkgroup : $("#selectedWorkgroup"),
        $selectedMFC : $("#selectedMFC"),
        $duCount : $("#duCount"),
        $duListTable :  $("#duListTable"),
        $addDuListTable : $("#addDuListTable"),
        $searchDuTable : $("#searchDuTable"),

        selectWorkgroupString : "WorkGroup을 선택하세요",
        tempSearchString : "임시조회",
        //newWorkgroupString : "신규 WorkGroup명을 입력하세요",

        init : function() {
            $("input[type=text]").each(function() {
                var width = $(this).attr("width"); //.replace(/^.*?(\d+)$/, "$1");
                if(width) $(this).css({"width": width + "px"});
            });

            $("div.scroll-y").each(function() {
                var height = $(this).attr("class").replace(/^.*?(\d+)$/, "$1");
                if(height) $(this).css({"height": height + "px"});
            });

            var callType = window.name; //location.href.substring(location.href.indexOf('=')+1);
            if(callType === 'workgroup') {
                $("[group=workgroup]").show();
                $("[group=tempgroup]").hide();
            } else {
                $("[group=workgroup]").hide();
                $("[group=tempgroup]").show();
            }
        },
        setDuCount : function() {
            this.$duCount.text(this.$duListTable.find('tr').length);
        },
        resetDuList : function(tempSearchString) {
            this.$workgroupTable.find("tr").removeClass("error");
            this.$selectedWorkgroup.text(tempSearchString||this.selectWorkgroupString);
            //this.$selectedMFC.data("mfcCD","");
            //this.$selectedMFC.text("");
            $.removeData(this.$selectedWorkgroup.get(0),"workgroupID");
            this.$duCount.text("");
            this.$duListTable.find("tr").remove();
            this.$addDuListTable.hide();
        },
        addWorkgroupRow : function(row,callback) {
            var $tbody = this.$workgroupTable.find("tbody");
            var $newWorkgroup =
                $("<tr id="+row.WORKGROUP_ID+">"
                    +"<td>"+row.WORKGROUP_NAME
                    +"<div class='floatRight alignRight'>"
                    +"<button class=\"close\" onclick=\"deleteWorkgroup(event,this);\">&times;</button>&nbsp;&nbsp;"
                    +"</div>"
                    //+"<button class='btn btn-mini' style='margin-right: 2px;' onclick=\"sendData(event,'"+row.WORKGROUP_ID+"','"+row.WORKGROUP_NAME+"');\">선택</button>"
                    //+"<button class='btn btn-mini' style='margin-right: 2px;' onclick='deleteWorkgroup(event,this)' >삭제</button>"
                    //+"<button class='btn btn-mini' onclick='workgroup.showDUTree(this);'>DU추가</button>"
                    +"</td>"
                    +"</tr>")
                    .click(function(){
                        $(this).siblings().removeClass("error");
                        $(this).addClass("error");
                        workgroup.$selectedWorkgroup.text(row.WORKGROUP_NAME)
                            .data("workgroupID",row.WORKGROUP_ID);
                        getDuList(row.WORKGROUP_ID);
                        workgroup.$addDuListTable.show();
                        workgroup.$addDuListTable.find('span').text(row.WORKGROUP_NAME);
                    })
                    .data("row",row)
                    .css("cursor","pointer")
                    .prependTo($tbody);

            if(typeof(callback) === 'function') {
                callback($newWorkgroup);
            }
        },
        addDuRow : function(row,callback) {
            var $tbody = this.$duListTable.find("tbody");
            var $newDU =
                $("<tr>"
                    +"<td class='alignCenter'>"+row.MFC_NM+"</td>"
                    +"<td>"
                    +"<div style='float: left'>"+row.BTS_NM_CMS+"</div>"
                    +"<div style='text-align: right'>"
                    +"<button class=\"close\" onclick=\"deleteDU(event,$(this).parents('tr:first'));\">&times;</button>"
                    +"&nbsp;&nbsp;</div>"
                    +"</td>"
                    +"</tr>")
                    .data("row",row)
                    .css("cursor","pointer")
                    .prependTo($tbody)
                    .children('td:first').addClass(function() {
                        var className = '';
                        if (row.MFC_CD === 'MFC00001') {
                            className = 'MFC00001';
                        } else if (row.MFC_CD === 'MFC00002') {
                            className = 'MFC00002';
                        } else if (row.MFC_CD === 'MFC00014') {
                            className = 'MFC00014';
                        }
                        return className;
                    }).end();


            if(typeof(callback) === 'function') {
                callback($newDU);
            }
        },
        getTreeID : function() {
            var selectedTree;
            $(".tab-content").children().each(function(idx,tree){
                if ($(tree).hasClass("active")) {
                    selectedTree = $(tree).children().eq(0).attr("id");
                }
            });
            return selectedTree;
        },
        showDUTree : function() {
            //DU Tree 다시 접히도록...
            var selectedTree = this.getTreeID();
            if(selectedTree) {
                $("#"+selectedTree).dynatree("getRoot").visit(function(node){
                    node.select(false);
                    node.expand(false);
                });
            }
            $("#divDU").show(); // DU Tree show
            $("#divWorkgroup").hide();  //Workgroup hide
            $("#addDuListBtn").hide();  //add DU button hide
            $("#closeDuListBtn").show();  //close DU button show
            $("#duHelp").show(); //DU Help show

            /*if(obj.id === 'tempDuListBtn') {
             this.resetDuList(this.tempSearchString);
             $("#closeDuListBtn").hide();
             } else {
             $("#closeDuListBtn").show();
             }*/
        },
        hideDUTree : function() {
            $("#divDU").hide(); // DU Tree hide
            $("#divWorkgroup").show();  //Workgroup show
            $("#addDuListBtn").show();  //add DU button show
            $("#closeDuListBtn").hide();  //close DU button hide
            $("#duHelp").hide(); //DU Help hide
        }

    };

    //open시 workgroup / 임시조회 구분하여 화면 배치
    workgroup.init();

    /*===============================================================================
     * 처리중..
     *
     *==============================================================================*/
    $("<div style='display:none;position:fixed;top:320px;left:390px;width:25px;height:25px;'>"
        + "<img src='/adcaslte/common/img/ajax-loader.gif'/></div>")
        .ajaxStart(function(){
            $(this).show();
        }).ajaxComplete(function(){
            $(this).hide();
        }).prependTo("body");

    /*===============================================================================
     * WorkGroup 선택 버튼 이벤트 설정
     *
     *==============================================================================*/
    $("#selectWorkgroupBtn").click(function(event){
        sendData(event);
    });

    /*===============================================================================
     * WorkGroup 조회 항목 Enter키 입력 이벤트 설정
     *
     *==============================================================================*/
    $("#searchWorkGroup").keydown(function(event){
        if((event.keyCode) && (event.keyCode==13)){
            $("#searchWorkGroupBtn").trigger('click');
        }
    });

    /*===============================================================================
     * WorkGroup 조회 버튼 클릭 이벤트 설정
     *
     *==============================================================================*/
    $("#searchWorkGroupBtn").click(function() {
        getWorkGroup();
    });

    /*===============================================================================
     * WorkGroup 추가 항목 Enter키 입력 이벤트 설정
     *
     *==============================================================================*/
    $("#addWorkgroupName").keydown(function(event){
        if((event.keyCode) && (event.keyCode==13)){
            event.preventDefault();
            //alert('addWorkgroupName keydown');
            $("#saveWorkGroupBtn").trigger('click');
        }
    });

    /*===============================================================================
     * WorkGroup 추가 버튼 클릭 이벤트 설정
     *
     *==============================================================================*/
    $('#addWorkgroupModal').on('shown', function () {
        $("#addWorkgroupName").focus();
    })
    $("#saveWorkGroupBtn").click(function(event) {
        //alert('saveWorkGroupBtn click');
        event.preventDefault();
        addWorkGroup(function() {
            $('#addWorkgroupModal').modal('hide');
            //$("#addDuListBtn").trigger('click');
        });
    });

    /*===============================================================================
     * DU Tree 화면 열기 버튼 클릭 이벤트 설정
     *
     *==============================================================================*/
    $("#addDuListBtn").click(function(){
        if(workgroup.$selectedWorkgroup.data("workgroupID")) {
            workgroup.showDUTree();
        }
    });

    /*===============================================================================
     * DU Tree 화면에서 선택 버튼 클릭 이벤트 설정
     *
     *==============================================================================*/
    $("#selectDuListBtn").click(function(event){
        sendData(event);
    });

    /*===============================================================================
     * DU Tree 화면 닫기 버튼 클릭 이벤트 설정
     *
     *==============================================================================*/
    $("#closeDuListBtn").click(function(){
        workgroup.hideDUTree();
    });

    /*===============================================================================
     * DU 전체 삭제 버튼 클릭 이벤트 설정
     *
     *==============================================================================*/
    $("#delDuBtn").click(function(event){
        if (workgroup.$duListTable.find('tr').length !== 0) {
            deleteDU(event,$(this)/*,function() {
             alert('모두 삭제되었습니다.');
             }*/);
        }
    });

    /*===============================================================================
     * DU 검색시 검색타입 선택 이벤트 설정
     *
     *==============================================================================*/
    //DU 명으로 검색
    $("#searchType1").click(function(){
        $("#searchNameDiv").show();
        $("#searchAddressDiv").hide();
        workgroup.$searchDuTable.find("tbody tr").remove();
    });
    //주소로 검색
    $("#searchType2").click(function(){
        $("#searchNameDiv").hide();
        $("#searchAddressDiv").show();
        workgroup.$searchDuTable.find("tbody tr").remove();
    });

    /*===============================================================================
     * WorkGroup 가져오기
     *
     *==============================================================================*/
    getWorkGroup();

    /*===============================================================================
     * 팀별 DU Tree 가져오기
     *
     *==============================================================================*/
    setTreeByTeam();

    /*===============================================================================
     * DU Tree 탭 클릭시 이벤트 설정
     * SCROLL 설정 변경
     *==============================================================================*/
    /*$('#duTab a').click(function (event) {
     event.preventDefault();
     alert('1='+$(this).attr('href'));
     if ($(this).attr('href') === '#tabContent3') {
     $(".tab-content").css("overflow-y","hidden");
     } else {
     $(".tab-content").css("overflow-y","auto");
     }
     }) ;*/

    /*===============================================================================
     * DU Tree Tab 클릭 이벤트 설정
     *
     *==============================================================================*/
    /*$('#duTab').bind('click', function (e) {
     var href = e.target.href;
     var selectedTab = href.substring(href.indexOf("#")+1);*/
    $('#duTab a').click(function (event) {
        event.preventDefault();
        var selectedTab = $(this).attr('href');

        //SCROLL 설정 변경
        if (selectedTab === '#tabContent3') {
            $(".tab-content").css("overflow-y","hidden");
        } else {
            $(".tab-content").css("overflow-y","auto");
        }

        // EMS별 DU Tree 가져오기
        if(selectedTab === '#tabContent0') {
            setTreeByEms();
        }

        // 지역별 DU Tree 가져오기
        if(selectedTab === '#tabContent2') {
            setTreeByCity();
        }

        // 주소로 검색시 이벤트 설정 및 City List 가져오기
        if(selectedTab === '#tabContent3') {
            // DU 이름으로 검색시 검색버튼 클릭 이벤트 설정
            $("#searchDuNameBtn").click(function(){
                searchDUList('name');
            });

            //DU 이름으로 검색시 Enter키 입력 이벤트 설정
            $("#searchDuName").keydown(function(event){
                if((event.keyCode) && (event.keyCode==13)){
                    $("#searchDuNameBtn").trigger('click');
                }
            });

            // DU 주소로 검색시 검색버튼 클릭 이벤트 설정
            $("#searchDuAddressBtn").click(function(){
                searchDUList('address')
            });

            // DU 주소로 검색시 시 선택 이벤트 설정
            $("#selectCity").change(function(){
                setGuList(this.value);
                if($(this).find("option:first").text() === '선택')
                    $(this).find("option:first").remove(); //선택삭제
            });

            // DU 주소로 검색시 구 선택 이벤트 설정
            $("#selectGu").change(function(){
                setDongList(this.value);
                if($(this).find("option:first").text() === '선택')
                    $(this).find("option:first").remove(); //선택삭제
            });

            //시 리스트 가져오기
            setCityList();
        }

    });
});

/*===============================================================================
 * 선택 버튼 클릭 이벤트 핸들러
 *
 *==============================================================================*/
function sendData(event) {

    var selectedWorkgroupID   = workgroup.$selectedWorkgroup.data("workgroupID");
    var selectedWorkgroupName = workgroup.$selectedWorkgroup.text();

    var mfcCDList = [];
    var mfcNMList = [];
    if($(window.opener.document).find("input[name=MFC_CD]").length !== 0) {
        workgroup.$duListTable.find("tr").each(function(idx,row){
            if ($.inArray($(row).data("row").MFC_CD, mfcCDList) === -1) {
                mfcCDList.push($(row).data("row").MFC_CD);
                mfcNMList.push($(row).data("row").MFC_NM);
            }
        });
    }
    if (selectedWorkgroupID) {
        if (mfcCDList.length > 1) {
            alert('제조사가 '+mfcNMList.join(',')+' 존재합니다!');
        }
        window.opener.setWorkgroup(selectedWorkgroupID,'',selectedWorkgroupName,mfcCDList[0]);
        window.close();
    } else {
        if (workgroup.$duListTable.find("tr").length === 0) {
            alert('DU 나 WORKGROUP 를 선택하세요!');
            return false;
        };

        var duList = $.map(workgroup.$duListTable.find("tr"),function(row,index) {
            return $(row).data("row").C_UID+"_"+$(row).data("row").INGR_ERP_CD;
        });

        var duCount = workgroup.$duListTable.find("tr").length;
        if (duCount === 1) {
            selectedWorkgroupName = workgroup.$duListTable.find("td:eq(1)").text().replace("삭제","");
        } else {
            selectedWorkgroupName = workgroup.$duListTable.find("td:eq(1)").text().replace("삭제"," 外 ") + (duCount-1) + "곳";
        }
        if (mfcCDList.length > 1) {
            alert('제조사가 '+mfcNMList.join(',')+' 존재합니다!');
        }
        window.opener.setWorkgroup('',duList.join('|'),selectedWorkgroupName,mfcCDList[0]);
        window.close();
    }
}

/*===============================================================================
 * WorkGroup 조회 버튼 클릭 이벤트 핸들러
 *
 *==============================================================================*/
function getWorkGroup(callback) {

    var param = {};
    param["WORKGROUP_NAME"] = $("#searchWorkGroup").val();

    jQuery.post("/adcaslte/svc/Workgroup-selectWorkgroup",param,function(result,stat){

        var $tbody = workgroup.$workgroupTable.find("tbody");

        $tbody.find("tr").not(":last").remove();

        $(result.rows).each(function(idx,row){

            workgroup.addWorkgroupRow(row);

        });

        if(typeof(callback) === 'function') {
            callback();
        }

    },"json");

}

/*===============================================================================
 * WorkGroup Input Form 추가 버튼 클릭 이벤트 핸들러
 *
 *==============================================================================*/
function addWorkGroup(callback) {
    //alert('addWorkGroup');
    var $addWorkgroupName = $("#addWorkgroupName");
    var param = {};
    var WORKGROUP_NAME = $addWorkgroupName.val();

    param["WORKGROUP_ID"] = "";
    param["WORKGROUP_NAME"] = WORKGROUP_NAME;

    jQuery.post("/adcaslte/svc/Workgroup-insertWorkgroup",param,function(result,stat){

        $(result.rows).each(function(idx,row){

            workgroup.addWorkgroupRow(row, function($newWorkgroup) {
                workgroup.resetDuList();
                workgroup.$selectedWorkgroup.text(row.WORKGROUP_NAME)
                    .data("workgroupID",row.WORKGROUP_ID);
                workgroup.$addDuListTable.show();
                workgroup.$addDuListTable.find('span').text(row.WORKGROUP_NAME);
                $newWorkgroup.siblings().removeClass("error");
                $newWorkgroup.addClass('error');
                $newWorkgroup.find("button:first").focus();
            });

            /*if (workgroup.$duListTable.find("tr").length > 0) {
             insertDuList();
             }*/

            $addWorkgroupName.val("");

        });

        if(typeof(callback) === 'function') {
            callback();
        }

    },"json");

}

/*===============================================================================
 * WorkGroup 삭제 버튼 클릭 이벤트 핸들러
 *
 *==============================================================================*/
function deleteWorkgroup(event,obj) {

    if(event.stopPropagation) event.stopPropagation();

    var param = {};
    param["WORKGROUP_ID"] = $(obj).parents("tr:first").attr("id");

    jQuery.post("/adcaslte/svc/Workgroup-deleteWorkgroup",param,function(result,stat){
        if (result.status == "SUCCESS") {
            $removeTarget = $(obj).parents("tr:first");
            //현재 선택된 Workgroup일 경우 Du List Reset
            if ($removeTarget.hasClass('error')) {
                workgroup.resetDuList();
            }
            $removeTarget.remove();

        }
    });

}

/*===============================================================================
 * WorkGroup 리스트 클릭 이벤트 핸들러
 * WorkGroup에 해당하는 DU 리스트 가져옴.
 *==============================================================================*/
function getDuList(workgroupID, callback) {

    var param = {};
    param["WORKGROUP_ID"] = workgroupID;

    jQuery.post("/adcaslte/svc/Workgroup-selectDUListByWorkgroup",param,function(result,stat){
        var treeData = [];
        var $tbody = $("#duListTable tbody");
        $("tr",$tbody).remove();
        $(result.rows).each(function(idx,row){
            workgroup.addDuRow(row);
        });
        workgroup.setDuCount();

        if(typeof(callback) === 'function') {
            callback();
        }

    },"json");
}

/*===============================================================================
 * TREE에서 DU 클릭시 DU LIST에 추가하는 FUNCTION
 *
 *==============================================================================*/
function addDuList(node,type,callback) {

    var $tbody = $("#duListTable tbody");
    var rows = [];
    //tree일 경우
    if (type === 'tree') {
        if (node.hasChildren())  {

            $.each(node.getChildren().reverse(), function(index,childNode){
                var row  = {INGR_ERP_CD:childNode.data.key,
                    BTS_NM_CMS:childNode.data.title,
                    C_UID:childNode.data.cUID,
                    MFC_CD:childNode.data.mfcCD,
                    MFC_NM:childNode.data.mfcNM};
                rows[index] = row;
            });
        } else {
            var row  = {INGR_ERP_CD:node.data.key,
                BTS_NM_CMS:node.data.title,
                C_UID:node.data.cUID,
                MFC_CD:node.data.mfcCD,
                MFC_NM:node.data.mfcNM};
            rows[0] = row;
        }
        //search일 경우
    } else {
        var row  =  {INGR_ERP_CD:$(node).data("row").INGR_ERP_CD,
            BTS_NM_CMS:$(node).data("row").BTS_NM_CMS,
            C_UID:$(node).data("row").C_UID,
            MFC_CD:$(node).data("row").MFC_CD,
            MFC_NM:$(node).data("row").MFC_NM};
        rows[0] = row;
    }

    //DU List에 없는 DU만 추가
    var duList = $.map($("#duListTable tbody tr").toArray(), function(du,index){
        return $(du).data("row").INGR_ERP_CD;
    });

    $.each(rows,function(index,row) {
        var inList = $.inArray(row.INGR_ERP_CD, duList);
        if (inList === -1) {
            workgroup.addDuRow(row,function($newDU){
                $newDU.data("new",'Y');
            });
        }
    });

    workgroup.setDuCount();

    //callback : insertDuList
    if(typeof(callback) === 'function') {
        callback();
    }

}

/*===============================================================================
 * DU List에 DU 추가시 Workgroup에 DU Insert 하는 Function
 *
 *==============================================================================*/
function insertDuList() {

    var $duListTableTR = workgroup.$duListTable.find("tr");
    var param = {};

    param["WORKGROUP_ID"] = workgroup.$selectedWorkgroup.data("workgroupID");

    if (param["WORKGROUP_ID"]) {

        var newNodes = $.map($duListTableTR, function(element,index){
            if($(element).data("new") === 'Y')
                return $(element).data("row").C_UID+"_"+$(element).data("row").INGR_ERP_CD;
        });

        param["DUIDs"] = newNodes.reverse().join('|');

        //alert(param["DUIDs"]);
        jQuery.post("/adcaslte/svc/Workgroup-insertWorkgroupDU",param,function(result,stat){
            if (result.status == "SUCCESS") {
                $.each($duListTableTR, function(index,element){
                    if($(element).data("new") === 'Y') {
                        $.removeData(element,"new");
                    }
                });
            }
        });
    }

}

/*===============================================================================
 * DU 삭제 버튼 클릭 이벤트 핸들러
 *
 *==============================================================================*/
function deleteDU(event,$obj,callback) {

    if(event.stopPropagation) event.stopPropagation();

    var $duListTR = workgroup.$duListTable.find('tr');
    var workgroupID = workgroup.$selectedWorkgroup.data("workgroupID");

    if (workgroupID) {
        var param = {};
        //param["USER_ID"] = userID;
        param["WORKGROUP_ID"] = workgroupID;
        //하나씩 삭제할 경우
        if($obj.attr("id") !== 'delDuBtn') {
            param["INGR_ERP_CD"] = $obj.data("row").INGR_ERP_CD;
            param["C_UID"] = $obj.data("row").C_UID;
        }
        jQuery.post("/adcaslte/svc/Workgroup-deleteWorkgroupDU",param,function(result,stat){
            if (result.status == "SUCCESS") {
                if($obj.attr("id") !== 'delDuBtn') {
                    $obj.remove();
                } else {
                    $duListTR.remove();
                }
                workgroup.setDuCount();
            }
        });
    }  else {  //임시워크그룹일 경우
        if($obj.attr("id") !== 'delDuBtn') {
            $obj.remove();
        } else {
            $duListTR.remove();
        }
    }

    if(typeof(callback) === 'function') {
        callback();
    }
}

/*===============================================================================
 * DU 이름으로 검색시 검색버튼 클릭 이벤트 핸들러
 *
 *==============================================================================*/
function searchDUList(type) {

    var param = {};
    if (type === 'name') {
        param['DU_NAME'] = $("#searchDuName").val();
    } else if(type === 'address') {
        param['ADDRESS'] = $("#selectCity").val()+$("#selectGu").val()+$("#selectDong").val();
    }

    jQuery.post("/adcaslte/svc/Workgroup-selectDUList",param,function(result,stat){

        var $tbody = workgroup.$searchDuTable.find("tbody");

        $tbody.find("tr").remove();

        $(result.rows).each(function(idx,row){
            $("<tr>"
                +"<td>"+row.BTS_NM_CMS+"</td>"
                +"<td>"+row.ADDRESS+"</td>"
                +"</tr>")
                .click(function(){
                    $(this).toggleClass("error");
                    addDuList($(this),'search',insertDuList);
                })
                .data("row",row)
                .css("cursor","pointer")
                .appendTo($tbody);
        });
    },"json");

}

/*===============================================================================
 * 팀별 DU Tree 셋팅하는 Function
 *
 *==============================================================================*/
function setTreeByTeam() {

    jQuery.post("/adcaslte/svc/Workgroup-selectBonbuList",{},function(result,stat){

        var treeData = [];

        $(result.rows).each(function(idx,row){
            var treeRow = {title:row.BONBU_NM, key:row.BONBU_CD,
                isFolder:true, hideCheckbox:true,
                children:[{title: "데이타 가져오는 중...", key: row.BONBU_CD+"loading", hideCheckbox:true}]};
            treeData.push(treeRow);
        });

        $("#duTreeByTeam").dynatree({
            checkbox: true,
            selectMode: 3,
            children: treeData,
            fx: { height: "toggle", duration: 500 },
            onQuerySelect: function(flag, node) {
                //팀선택시 팀에 속한 DU List 보여주고 선택되도록 함.
                if (node.getLevel() === 3) {
                    getTreeByTeam(node, function() {
                        if(flag === true) {
                            node.expand(true);
                            addDuList(node,'tree',insertDuList);
                        } else {
                            node.expand(false);
                        }
                    });
                }
            },
            onSelect: function(flag, node) {
                //if (flag === true && node.getLevel() === 4) isDuList(node);
                //checkSelect(node,'duTreeByTeam');
            },
            onClick: function(node, event) {
                getTreeByTeam(node, function() {
                    if (node.getLevel() === 4) {
                        //title 클릭시
                        if(node.getEventTargetType(event) == "title") {
                            node.toggleSelect();
                            if(node.isSelected()) addDuList(node,'tree',insertDuList);
                            //checkbox 클릭시
                        } else if(node.getEventTargetType(event) == "checkbox") {
                            //select가 일어나기 전이므로 unSelect일 경우 DU 추가
                            if(!node.isSelected()) {
                                addDuList(node,'tree',insertDuList);
                            }
                        }
                    }
                });
            }
        });

    },"json");

}

/*===============================================================================
 * 팀별 DU Tree에서 클릭된 Node 하위 Tree 가져오는 Function
 *
 *==============================================================================*/
function getTreeByTeam(node,callback) {
    //Bonbu -> Oper Team
    if (node.getLevel() === 1 && node.getChildren()[0].data.key.indexOf("loading") != -1) {

        jQuery.post("/adcaslte/svc/Workgroup-selectOperTeamList",{BONBU_CD:node.data.key},function(result,stat){
            var treeData = [];
            $(result.rows).each(function(idx,row){
                var treeRow = {title:row.OPER_TEAM_NM, key:row.OPER_TEAM_CD,
                    isFolder:true, hideCheckbox:true,
                    children:[{title: "데이타 가져오는 중...", key: row.OPER_TEAM_CD+"loading", hideCheckbox:true }]};
                treeData.push(treeRow);
            });
            var firstChildNode = node.tree.getNodeByKey(node.data.key+"loading");
            node.addChild(treeData,firstChildNode);
            firstChildNode.li.style.display = "none";  //데이타 가져오는 중 숨김.
        },"json");
        //Oper Team -> Part
    } else if (node.getLevel() === 2 && node.getChildren()[0].data.key.indexOf("loading") != -1) {

        jQuery.post("/adcaslte/svc/Workgroup-selectPartList",{OPER_TEAM_CD:node.data.key},function(result,stat){
            var treeData = [];
            $(result.rows).each(function(idx,row){
                var treeRow = {title:row.PART_NM, key:row.PART_CD,
                    isFolder:true,
                    children:[{title: "데이타 가져오는 중...", key: row.PART_CD+"loading", hideCheckbox:true }]};

                treeData.push(treeRow);
            });
            node.removeChildren(); //데이타 가져오는 중 삭제
            node.addChild(treeData);
        },"json");
        //Part -> DU
    } else if (node.getLevel() === 3 && node.getChildren()[0].data.key.indexOf("loading") != -1) {

        //Sync 방식으로 처리
        jQuery.ajax({
            type: "POST",
            url: "/adcaslte/svc/Workgroup-selectDUList",
            data: {PART_CD:node.data.key},
            dataType: "json",
            async: false,
            success: function(result,stat){
                var treeData = [];

                $(result.rows).each(function(idx,row){
                    var treeRow = {title:row.BTS_NM_CMS, key:row.INGR_ERP_CD, cUID:row.C_UID, mfcCD:row.MFC_CD, mfcNM:row.MFC_NM};
                    treeData.push(treeRow);
                });
                node.removeChildren();
                node.addChild(treeData);
            }
        });
        /*jQuery.post("/adcaslte/svc/Workgroup-selectDUList",{PART_CD:node.data.key},function(result,stat){
         var treeData = [];
         var select = false;
         //node가 선택되었을 경우 child node 모두 select되도록
         if(node.isSelected()) select = true;

         $(result.rows).each(function(idx,row){
         var treeRow = {title:row.BTS_NM_CMS, key:row.INGR_ERP_CD, cUID:row.C_UID, mfcCD:row.MFC_CD, mfcNM:row.MFC_NM,
         select:select};
         treeData.push(treeRow);
         });
         node.removeChildren();
         node.addChild(treeData);



         },"json");*/
    }

    if(typeof(callback) === 'function') {
        callback();
    }
}

/*===============================================================================
 * 지역별 DU Tree 셋팅하는 Function
 *
 *==============================================================================*/
function setTreeByCity() {

    jQuery.post("/adcaslte/svc/Workgroup-selectCityList",{},function(result,stat){

        var treeData = [];

        $(result.rows).each(function(idx,row){
            var treeRow = {title:row.CITY_NM, key:row.CITY_CD,
                isFolder:true, hideCheckbox:true,
                children:[{title: "데이타 가져오는 중...", key: row.CITY_CD+"loading", hideCheckbox:true}]};
            treeData.push(treeRow);
        });

        $("#duTreeByCity").dynatree({
            checkbox: true,
            selectMode: 3,
            children: treeData,
            fx: { height: "toggle", duration: 500 },
            onQuerySelect: function(flag, node) {
                //구선택시 구에 속한 DU List 보여주고 선택되도록 함.
                if (node.getLevel() === 2) {
                    getTreeByCity(node, function() {
                        if(flag === true) {
                            node.expand(true);
                            addDuList(node,'tree',insertDuList);
                        } else {
                            node.expand(false);
                        }
                    });
                }
            },
            onSelect: function(flag, node) {
                //if (flag === true && node.getLevel() === 3) isDuList(node);
                //checkSelect(node,'duTreeByCity');
            },
            onClick: function(node, event) {
                getTreeByCity(node, function() {
                    if (node.getLevel() === 3) {
                        //title 클릭시
                        if(node.getEventTargetType(event) == "title") {
                            node.toggleSelect();
                            if(node.isSelected()) addDuList(node,'tree',insertDuList);
                            //checkbox 클릭시
                        } else if(node.getEventTargetType(event) == "checkbox") {
                            //select가 일어나기 전이므로 unSelect일 경우 DU 추가
                            if(!node.isSelected()) {
                                addDuList(node,'tree',insertDuList);
                            }
                        }
                    }
                });
            }
            /*onQuerySelect: function(flag, node) {
             getTreeByCity(node,function() { node.expand() });
             },
             onSelect: function(flag, node) {
             //checkSelect(node,'duTreeByCity');
             },
             onClick: function(node, event) {
             getTreeByCity(node, function() { if (node.getLevel() === 3) node.toggleSelect() });
             },
             onDblClick: function(node, event) {
             node.toggleSelect();
             }*/
        });

    },"json");

}

/*===============================================================================
 * 지역별 DU Tree에서 클릭된 Node 하위 Tree 가져오는 Function
 *
 *==============================================================================*/
function getTreeByCity(node,callback) {
    //City -> Gu
    if (node.getLevel() === 1 && node.getChildren()[0].data.key.indexOf("loading") != -1) {

        jQuery.post("/adcaslte/svc/Workgroup-selectGuList",{CITY_CD:node.data.key},function(result,stat){
            var treeData = [];
            $(result.rows).each(function(idx,row){
                var treeRow = {title:row.GU_NM, key:row.GU_CD,
                    isFolder:true,
                    children:[{title: "데이타 가져오는 중...", key: row.GU_CD+"loading", hideCheckbox:true }]};
                treeData.push(treeRow);
            });
            var firstChildNode = node.tree.getNodeByKey(node.data.key+"loading");
            node.addChild(treeData,firstChildNode);
            firstChildNode.li.style.display = "none";  //데이타 가져오는 중 숨김
        },"json");
        //Gu -> Du
    } else if (node.getLevel() === 2 && node.getChildren()[0].data.key.indexOf("loading") != -1) {
        //node.data.unselectable = false;
        jQuery.ajax({
            type: "POST",
            url: "/adcaslte/svc/Workgroup-selectDUList",
            data: {GU_CD:node.data.key},
            dataType: "json",
            async: false,
            success: function(result,stat){
                var treeData = [];

                $(result.rows).each(function(idx,row){
                    var treeRow = {title:row.BTS_NM_CMS, key:row.INGR_ERP_CD, cUID:row.C_UID, mfcCD:row.MFC_CD, mfcNM:row.MFC_NM};
                    treeData.push(treeRow);
                });
                node.removeChildren();
                node.addChild(treeData);
            }
        });

        /*jQuery.post("/adcaslte/svc/Workgroup-selectDUList",{GU_CD:node.data.key},function(result,stat){
         var treeData = [];
         var select = false;
         //node가 선택되었을 경우 child node 모두 select되도록
         if(node.isSelected()) select = true;

         $(result.rows).each(function(idx,row){
         var treeRow = {title:row.BTS_NM_CMS, key:row.INGR_ERP_CD, cUID:row.C_UID, mfcCD:row.MFC_CD, mfcNM:row.MFC_NM,
         select:select };
         treeData.push(treeRow);
         });
         node.removeChildren(); //데이타 가져오는 중 삭제
         node.addChild(treeData);
         },"json");*/
    }

    if(typeof(callback) === 'function') {
        callback();
    }

}

/*===============================================================================
 * EMS별 DU Tree 셋팅하는 Function
 *
 *==============================================================================*/
function setTreeByEms() {

    jQuery.post("/adcaslte/svc/Workgroup-selectMMEList",{},function(result,stat){

        var treeData = [];

        $(result.rows).each(function(idx,row){
            var treeRow = {title:row.MME_GRP_NM, key:row.MME_GRP_ID,
                isFolder:true, hideCheckbox:true,
                children:[{title: "데이타 가져오는 중...", key: row.MME_GRP_ID+"loading", hideCheckbox:true}]};
            treeData.push(treeRow);
        });

        $("#duTreeByEms").dynatree({
            checkbox: true,
            selectMode: 3,
            children: treeData,
            fx: { height: "toggle", duration: 500 },
            onQuerySelect: function(flag, node) {
                //NE_ID선택시 NE_ID에 속한 DU List 보여주고 선택되도록 함.
                if (node.getLevel() === 2) {
                    getTreeByEms(node, function() {
                        if(flag === true) {
                            node.expand(true);
                            addDuList(node,'tree',insertDuList);
                        } else {
                            node.expand(false);
                        }
                    });
                }
            },
            onSelect: function(flag, node) {
                //if (flag === true && node.getLevel() === 3) isDuList(node);
                //checkSelect(node,'duTreeByCity');
            },
            onClick: function(node, event) {
                getTreeByEms(node, function() {
                    if (node.getLevel() === 3) {
                        //title 클릭시
                        if(node.getEventTargetType(event) == "title") {
                            node.toggleSelect();
                            if(node.isSelected()) addDuList(node,'tree',insertDuList);
                            //checkbox 클릭시
                        } else if(node.getEventTargetType(event) == "checkbox") {
                            //select가 일어나기 전이므로 unSelect일 경우 DU 추가
                            if(!node.isSelected()) {
                                addDuList(node,'tree',insertDuList);
                            }
                        }
                    }
                });
            }
            /*onQuerySelect: function(flag, node) {
             getTreeByCity(node,function() { node.expand() });
             },
             onSelect: function(flag, node) {
             //checkSelect(node,'duTreeByCity');
             },
             onClick: function(node, event) {
             getTreeByCity(node, function() { if (node.getLevel() === 3) node.toggleSelect() });
             },
             onDblClick: function(node, event) {
             node.toggleSelect();
             }*/
        });

    },"json");

}

/*===============================================================================
 * EMS별 DU Tree에서 클릭된 Node 하위 Tree 가져오는 Function
 *
 *==============================================================================*/
function getTreeByEms(node,callback) {
    //MME_GRP_ID -> NE_ID
    if (node.getLevel() === 1 && node.getChildren()[0].data.key.indexOf("loading") != -1) {

        jQuery.post("/adcaslte/svc/Workgroup-selectNEList",{MME_GRP_ID:node.data.key},function(result,stat){
            var treeData = [];
            $(result.rows).each(function(idx,row){
                var treeRow = {title:row.NE_NM, key:row.NE_ID,
                    isFolder:true,
                    children:[{title: "데이타 가져오는 중...", key: row.NE_ID+"loading", hideCheckbox:true }]};
                treeData.push(treeRow);
            });
            var firstChildNode = node.tree.getNodeByKey(node.data.key+"loading");
            node.addChild(treeData,firstChildNode);
            firstChildNode.li.style.display = "none";  //데이타 가져오는 중 숨김
        },"json");
        //Gu -> Du
    } else if (node.getLevel() === 2 && node.getChildren()[0].data.key.indexOf("loading") != -1) {
        //node.data.unselectable = false;
        jQuery.ajax({
            type: "POST",
            url: "/adcaslte/svc/Workgroup-selectDUList",
            data: {NE_ID:node.data.key},
            dataType: "json",
            async: false,
            success: function(result,stat){
                var treeData = [];

                $(result.rows).each(function(idx,row){
                    var treeRow = {title:row.BTS_NM_CMS, key:row.INGR_ERP_CD, cUID:row.C_UID, mfcCD:row.MFC_CD, mfcNM:row.MFC_NM};
                    treeData.push(treeRow);
                });
                node.removeChildren();
                node.addChild(treeData);
            }
        });

    }

    if(typeof(callback) === 'function') {
        callback();
    }

}



/*===============================================================================
 * DU List에 존재하는 DU일 경우 체크되지 않도록 하는 Function
 * not used
 *==============================================================================*/
function isDuList(node) {

    var duList = $.map($("#duListTable tbody tr").toArray(), function(du,index){
        return $(du).data("row").INGR_ERP_CD;
    });

    var inList = $.inArray(node.data.key, duList);
    //alert(inList);
    if (inList != -1) {
        node.select(false);
    }

}

/*===============================================================================
 * 다른 MFC일 경우 체크되지 않도록 하는 Function
 * not used MFC별 선택막음 2012.11.13
 *==============================================================================*/
function checkSelect(node,treeID) {

    /*var $selectedWorkgroup = $("#selectedWorkgroup");
     var $selectedMFC = $("#selectedMFC");
     var selectedMfcCD = $selectedMFC.data("mfcCD");
     //MFC별 선택막음 2012.11.13
     if (node.getLevel() === 3) {
     //alert('onSelect='+node.tree.getSelectedNodes().length);
     $.each(node.getChildren(), function(index,childNode){
     if (!selectedMfcCD) {
     $selectedMFC.data("mfcCD",childNode.data.mfcCD);
     $selectedMFC.text(childNode.data.mfcNM);
     selectedMfcCD = childNode.data.mfcCD;
     } else if (selectedMfcCD && childNode.data.mfcCD != selectedMfcCD) {
     if(childNode.isSelected()) childNode.toggleSelect();
     }
     });
     } else if (node.getLevel() === 4) {
     if (!selectedMfcCD) {
     $selectedMFC.data("mfcCD",node.data.mfcCD);
     $selectedMFC.text(node.data.mfcNM);
     selectedMfcCD = childNode.data.mfcCD;
     } else if (selectedMfcCD && node.data.mfcCD != selectedMfcCD) {
     if(node.isSelected()) node.toggleSelect();
     }

     if ( $("#duListTable tbody tr").length === 0 &&
     $("#"+treeID).dynatree("getSelectedNodes").length === 0) {
     $("#selectedMFC").data("mfcCD","");
     $("#selectedMFC").text("");
     }
     }*/
}

/*===============================================================================
 * Workgroup 선택시 Du Tree Rearrange
 *
 *==============================================================================*/
function rearrangeDuTree(mfcCD) {
    //alert('rearrangeDuTree');
    //선택된 Tab 찾기
    /* var selectedTab = "";
     $("#duTab").children().each(function(){
     if ($(this).hasClass("active"))
     selectedTab = $(this).attr("id");
     });

     var selectedNodes;
     if (selectedTab != "tabSearch") { //search TAB이 아닐 경우
     //선택된 Tree 찾기
     var selectedTree = "";
     $(".tab-content").children().each(function(){
     if ($(this).hasClass("active"))
     selectedTree = $(this).children().eq(0).attr("id");
     });
     $.each($("#"+selectedTree).dynatree("getSelectedNodes"), function(index,node){
     if (node.getLevel() === 4) {
     if (node.data.mfcCD != mfcCD) {
     if(node.isSelected()) node.toggleSelect();
     }
     }
     });
     } else {  //search TAB일 경우
     var selectedNodes = $.map($("#searchDuTable tbody tr").toArray(), function(row,index){
     if($(row).hasClass("error") === true) {
     if ($(row).data("row").MFC_CD != mfcCD)
     $(row).removeClass("error")
     }
     });
     }*/

}

/*===============================================================================
 * 주소로 검색시 City List 가져오기
 *
 *==============================================================================*/
function setCityList() {
    jQuery.post("/adcaslte/svc/Workgroup-selectCityList",{},function(result,stat){
        var $select = $("#selectCity");

        $(result.rows).each(function(idx,row){
            $("<option value=\""+ row.CITY_NM +"\">"+ row.CITY_NM + "</option>")
                .appendTo($select);
        });
    },"json");
}

/*===============================================================================
 * 주소로 검색시 Gu List 가져오기
 *
 *==============================================================================*/
function setGuList(cityNM) {
    jQuery.post("/adcaslte/svc/Workgroup-selectGuList",{CITY_NM:cityNM},function(result,stat){
        var $select = $("#selectGu");
        $select.find('option').remove();
        $("<option value=\"\">선택</option>").appendTo($select);
        $(result.rows).each(function(idx,row){
            $("<option value=\""+ row.GU_CD +"\">"+ row.GU_NM + "</option>")
                .click(function(){
                    setDongList(this.value);
                })
                .appendTo($select);
        });
        $("#selectDong").find('option').remove();
        $("<option value=\"\">선택</option>").appendTo("#selectDong");
    },"json");
}

/*===============================================================================
 * 주소로 검색시 Dong List 가져오기
 *
 *==============================================================================*/
function setDongList(guNM) {
    jQuery.post("/adcaslte/svc/Workgroup-selectDongList",{GU_NM:guNM},function(result,stat){
        var $select = $("#selectDong");
        $select.find("option").remove();
        $(result.rows).each(function(idx,row){
            $("<option value=\""+ row.DONG_CD +"\">"+ row.DONG_NM + "</option>")
                .appendTo($select);
        });
    },"json");
}
