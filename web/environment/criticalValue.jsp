<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>관리자 환경변수</title>

    <link href="/adcaslte/common/bootstrap/css/bootstrap.css" rel="stylesheet">

    <script src="/adcaslte/common/js/jquery-latest.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap.js"></script>

    <link href="criticalValue.css" rel="stylesheet">
    <script src="criticalValue.js" language="javascript"></script>
</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <%--<div id="popup_title">QCAS</div>--%>
            <div id="popup_desc">LTE 용량분석 > 환경변수 > 임계치 설정</div>
        </div>
    </div>
</div>

<table id="criticalValueTable" class="table table-bordered table-condensed" style="margin-left:10px;">
    <colgroup>
        <col width="150px">
        <col width="300px">
        <col width="50px">
    </colgroup>
    <thead>
    <tr>
        <td class='tdCenterInfo'>구분</td>
        <td class='tdCenterInfo'>표시값</td>
        <td class='tdCenterInfo'>단위</td>
    </tr>
    </thead>
    <tbody></tbody>
</table>
<div style="width:500px; margin-top:20px;" align="center">
    <button class="btn btn-info btn-mini" id="modifyBtn"><i class="icon-edit"></i>&nbsp;수정</button>
</div>

</body>
</html>