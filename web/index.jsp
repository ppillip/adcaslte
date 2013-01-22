<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    if(session.getAttribute("USER_ID") == null) {
        String USER_ID = (String)request.getParameter("USERID");
        if (USER_ID != null)  {
            session.setAttribute("USER_ID",USER_ID);
        } else {
            session.setAttribute("USER_ID","qcas");
        }
    }  else {
        System.out.println("============================================================");
        System.out.println("LOGIN USER_ID="+session.getAttribute("USER_ID"));
        System.out.println("============================================================");
    }
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>메인 화면 설계</title>

    <script src="common/js/jquery-latest.js"></script>
    <link href="common/bootstrap/css/bootstrap.css" rel="stylesheet">
    <script src="common/bootstrap/js/bootstrap.js"></script>
    <script src="index.js"></script>
</head>
<body>

<header class="jumbotron subhead" id="overview">
    <div class="container" style="width:100%;">
        <p class="lead pull-left"><img src="common/img/tempTop.png"/></p>
        <%--<div style="position:absolute; top:20px; left:1000px; z-index:2;">
            <button class="btn btn-danger btn-mini" id="logoutBtn">로그아웃</button>
        </div>--%>
    </div>
</header>

<div class="container-fluid" id="">
    <div class="row-fluid">
        <div class="span3" style="width:160px;" id="leftMenu">
            <botton class="btn clearfix btn-small" style="width:142px;"><strong>LTE 용량분석</strong></botton>
            <div class="dropdown clearfix">
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">LTE NMS 기반 TP</a>
                        <ul class="dropdown-menu">
                            <%--<li><a tabindex="-1" href="DownLinkByNMS.jsp" target="DownLinkByNMS">DownLink</a></li>--%>
                            <li><a tabindex="-1" href="javascript:openWindow('DownLinkByNMS')">DownLink</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/downLinkByNMSStats/DownLinkByNMSStats')">DownLink 통계</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">DownLink 전후비교</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">DownLink 통계 전후비교</a></li>
                            <%--<li><a tabindex="-1" href="#">DownLink 통계</a></li>
                            <li><a tabindex="-1" href="UpLinkByNMS.jsp"  target="UpLinkByNMS">UpLink</a></li>
                            <li><a tabindex="-1" href="#">UpLink 통계</a></li>
                            <li><a tabindex="-1" href="#">DownLink 전후비교</a></li>
                            <li><a tabindex="-1" href="#">DownLink 통계 전후비교</a></li>
                            <li><a tabindex="-1" href="#"><i class="icon-eye-open"></i> UpLink 전후비교</a></li>
                            <li><a tabindex="-1" href="#"><i class="icon-eye-open"></i> UpLink 통계 전후비교</a></li>--%>
                        </ul>
                    </li>
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">LTE QMS 기반 TP</a>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">국소별 용량</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">통계단위별 용량</a></li>
                        </ul>
                    </li>
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">LTE 기준 용량분석</a>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">DownLink</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">DownLink 통계</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">DownLink 전후비교</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">DownLink 통계 전후비교</a></li>
                        </ul>
                    </li>
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">MAP</a>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">MAP</a></li>
                        </ul>
                    </li>
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">관리자 환경변수</a>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="javascript:openWindow('constCqiThrp')">CQI vs Throughput Table</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('constTable')">DownLink 사용환경 비율</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">임계치 설정</a></li>
                            <%--<li><a tabindex="-1" href="#">RSRP(구:RSCP) vs Throughput Table</a></li>
                            <li><a tabindex="-1" href="#">DownLink 인빌딩 감쇄계수</a></li>
                            <li><a tabindex="-1" href="#">DownLink 사용환경 비율</a></li>
                            <li><a tabindex="-1" href="#">UpLink 사용환경 비율</a></li>
                            <li><a tabindex="-1" href="#">UpLink 멀티셀계수</a></li>--%>
                        </ul>
                    </li>
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">사용자 환경변수</a>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="javascript:openWindow('workgroup')">WorkGroup 관리</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">임계치 설정</a></li>
                        </ul>
                    </li>
                    <li class="dropdown-submenu">
                        <a tabindex="-1" href="#">도움말</a>
                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">도움말 보기</a></li>
                            <li><a tabindex="-1" href="javascript:openWindow('/temp')">Download</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <%--<div class="clearfix" style="height:20px;"></div>
            <botton class="btn clearfix btn-small" style="width:142px;"><strong>WCDMA 용량분석</strong></botton>
            <div class="dropdown clearfix">
                <ul id="WCDMA" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">
                </ul>
            </div>--%>
        </div>  <!-- left menu -->
        <div class="span9" style="width:610px;" id="rightPanel">
            <img style="width:600px;" src="common/img/tempImage.png" alt=""/>
        </div>
    </div> <!--   row-fluid -->
</div>  <!--   container-fluid -->
</body>
</html>
