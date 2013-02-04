<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Workgroup</title>
    <script src="/adcaslte/common/js/jquery-latest.js"></script>
    <script src="/adcaslte/common/jquerytree/js/jquery-ui.custom.js"></script>
    <script src="/adcaslte/common/jquerytree/js/jquery.dynatree-1.2.2.js"></script>
    <script src="/adcaslte/common/jquerytree/js/jquery.cookie.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap.js"></script>
    <script src="workgroup.js"></script>

    <link href="/adcaslte/common/jquerytree/css/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet">
    <link href="/adcaslte/common/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="workgroup.css" rel="stylesheet">

</head>
<body>
<div id="header">
    <div id="popup_title"  style="vertical-align: top;margin-left:20px;padding-top: 0px;">
        <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
    </div>
    <div id="popup_desc">LTE 용량분석 > 사용자 환경변수 > WorkGroup 관리</div>
</div>

<div class="row" style="padding:0px 10px;">
<%--<div id='search_table'>--%>
<div class="workgroup">
    <table style="margin-left:15px;">
        <tr>
            <td background="/adcaslte/common/bootstrap/img/searchbox_top_l.png" style="height:9px;">&nbsp;</td>
            <td background="/adcaslte/common/bootstrap/img/searchbox_top_c.png">&nbsp;</td>
            <td background="/adcaslte/common/bootstrap/img/searchbox_top_r.png">&nbsp;</td>
        </tr>
        <tr>
            <td background="/adcaslte/common/bootstrap/img/searchbox_center1.png" style="width:6px;">&nbsp;</td>
            <td>
                <table width="785" height="30" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td style="padding-left:10px;padding-right:10px;padding-bottom:1px;">

                            <div class="span10" style="padding:5px;">
                                <div class="floatLeft">
                                    <button data-toggle="modal" href="#addWorkgroupModal" class="btn btn-mini btn-info"><i class="icon-plus"></i>&nbsp;신규 WorkGroup 생성</button>
                                </div>
                                <div class="floatRight">
                                    <button class="btn btn-mini btn-info" name="selectWorkgroupBtn" id="selectWorkgroupBtn"><i class="icon-ok"></i>&nbsp;WorkGroiup 선택</button>
                                </div>
                            </div>

                        </td>
                    </tr>
                </table>
            </td>
            <td background="/adcaslte/common/bootstrap/img/searchbox_center2.png" style="width:8px;">&nbsp;</td>
        </tr>
        <tr>
            <td background="/adcaslte/common/bootstrap/img/searchbox_bottom1.png" style="height:9px;"></td>
            <td background="/adcaslte/common/bootstrap/img/searchbox_bottom2.png"></td>
            <td background="/adcaslte/common/bootstrap/img/searchbox_bottom3.png"></td>
        </tr>
    </table>
</div>

<div id="addWorkgroupModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <i class="icon-home"></i>&nbsp;WorkGroup 명 : <input type="text" name="addWorkgroupName" id="addWorkgroupName">
        <button class="btn btn-mini btn-info" name="saveWorkGroupBtn" id="saveWorkGroupBtn"><i class="icon-plus"></i>&nbsp;저장</button>
    </div>
</div>

<div class="clearBoth"></div>

<%--WorkGroup, DU Tree Head--%>
<div class="span5 floatLeft">
    <table style="height:30px;">
        <tr>
            <td>
                <div class="floatLeft workgroup">
                    <i class="icon-home"></i>&nbsp;선택된 WorkGroup 명 :&nbsp;&nbsp;
                    <b><span id="selectedWorkgroup" name="selectedWorkgroup">WorkGroup을 선택하세요</span></b>
                </div>
                <div class="tempgroup">
                    &nbsp;&nbsp;임시 WorkGroup
                </div>
            </td>
        </tr>
    </table>
</div>
<%--WorkGroup, DU Tree Head--%>
<%--DU List Head--%>
<div class="span5 floatLeft">
    <table style="height:30px;">
        <tr>
            <td style="width:250px">
                <button class="btn btn-mini btn-info workgroup" name="addDuListBtn" id="addDuListBtn"><i class="icon-plus"></i>&nbsp;&nbsp;&nbsp;DU 추가</button>
                <button class="btn btn-mini btn-info tempgroup" name="selectDuListBtn" id="selectDuListBtn"><i class="icon-ok"></i>&nbsp;선택</button>
                <button class="btn btn-mini btn-info hide" name="closeDuListBtn" id="closeDuListBtn"><i class="icon-off"></i>&nbsp;닫기</button>
            </td>
            <td>
                선택된 DU 수 :&nbsp;&nbsp;<span id="duCount"></span>
            </td>
        </tr>
    </table>
</div>
<%--DU List Head--%>

<div class="clearBoth"></div>

<%-- WORKGROUP List --%>
<div class="span5 floatLeft workgroup" id="divWorkgroup">
    <div>
        <table class="table table-bordered table-condensed">
            <tbody>
            <tr class="info">
                <td style="height:23px; text-align: center;">WorkGroup 이름</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="divWorkgroupList">
        <table id="workgroupTable" class="table table-bordered table-hover table-condensed table-striped">
            <tbody></tbody>
        </table>
    </div>
</div>
<%-- WORKGROUP List --%>
<%-- DU Tree --%>
<div class="span5 floatLeft tempgroup" id="divDU">
    <div class="tabbable"> <!-- Only required for left/right tabs -->
        <ul id="duTab" class="nav nav-tabs">
            <li id="tabEms"><a href="#tabContent0" data-toggle="tab">EMS별</a></li>
            <li class="active" id="tabTeam"><a href="#tabContent1" data-toggle="tab">운용팀별</a></li>
            <li id="tabCity"><a href="#tabContent2" data-toggle="tab">지역별</a></li>
            <li id="tabSearch"><a href="#tabContent3" data-toggle="tab">DU 검색</a></li>
        </ul>
        <div class="tab-content divTabTree">
            <div class="tab-pane" id="tabContent0">
                <div id="duTreeByEms"></div>
            </div>
            <div class="tab-pane active" id="tabContent1">
                <div id="duTreeByTeam"></div>
            </div>
            <div class="tab-pane" id="tabContent2">
                <div id="duTreeByCity"></div>
            </div>
            <div class="tab-pane" id="tabContent3">
                <div class="well">
                    <input type="radio" id="searchType1" name="searchType" value="name" checked> 이름으로 검색
                    <input type="radio" id="searchType2" name="searchType" value="address"> 주소로로 검색
                </div>
                <div class="well">
                    <div id="searchNameDiv">
                        DU 명 :
                        <input type="text" name="searchDuName" id="searchDuName" >
                        <button class="btn btn-mini btn-info" name="searchDuNameBtn" id="searchDuNameBtn"><i class="icon-search"></i> 조회</button>
                    </div>
                    <div id="searchAddressDiv" style="display:none">
                        <table>
                            <colgroup>
                                <col width="90px">
                                <col width="230px">
                            </colgroup>
                            <tr>
                                <td>특별/광역시/도 :</td>
                                <td>
                                    <select id="selectCity">
                                        <option>선택</option>
                                    </select><br>
                                </td>
                            </tr>
                            <tr>
                                <td>시/군/구 :</td>
                                <td>
                                    <select id="selectGu">
                                        <option>선택</option>
                                    </select><br>
                                </td>
                            </tr>
                            <tr>
                                <td>동명 :</td>
                                <td style="margin:0px;">
                                    <table>
                                        <tr>
                                            <td>
                                                <select id="selectDong">
                                                    <option>선택</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button class="btn btn-mini btn-info" name="searchDuAddressBtn" id="searchDuAddressBtn"><i class="icon-search"></i> 조회</button>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="divSearchDu">
                    <table id="searchDuTable" class="table table-bordered table-hover table-condensed table-striped">
                        <colgroup>
                            <col width="250px">
                            <col width="200px">
                        </colgroup>
                        <thead>
                        <tr class="success">
                            <td>DU 명</td>
                            <td>주소</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="well well-small tempgroup" id="duHelp" style="font-weight: bold;">
        DU 클릭시 자동으로 DU리스트에 추가됩니다.
    </div>

</div>
<%-- DU Tree --%>

<%-- DU List --%>
<div class="span5" style="float:left">
    <table class="table table-bordered table-condensed">
        <tbody>
        <tr class="info">
            <td style="width:250px; text-align: center;">
                DU 명
                <div class="floatRight alignRight">
                    <a class="btn btn-mini" id="delDuBtn"><i class="icon-minus"></i>모두삭제</a>&nbsp;&nbsp;
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="divDuList">
        <table id="duListTable" class="table table-bordered table-hover table-condensed table-striped">
            <tbody></tbody>
        </table>
    </div>
    <%--
            <table class="table table-bordered table-condensed hide" id="addDuListTable">
                <tbody>
                <tr>
                    <td style="text-align:right!important;">
                        <button class="btn btn-mini btn-info" name="addDuListBtn" id="addDuListBtn"><i class="icon-plus"></i>&nbsp;<span></span>&nbsp;&nbsp;DU 추가</button>
                    </td>
                </tr>
                </tbody>
            </table>
    --%>
    <div class="well well-small" style="font-weight: bold;">
        DU 삭제시 DU명 옆 X 아이콘을 클릭하세요.
    </div>
</div>
<%-- DU List --%>
<%--<div class="well well-small span10" id="duHelp" group="tempgroup" style="important; font-weight: bold;">
    DU 클릭시 자동으로 DU리스트에 추가됩니다.
    DU 삭제시 DU명 옆 X 아이콘을 클릭하세요.
</div>--%>

</div>
</body>
</html>