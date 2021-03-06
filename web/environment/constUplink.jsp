<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>관리자 환경변수</title>

    <link href="/adcaslte/common/bootstrap/css/bootstrap.css" rel="stylesheet">

    <script src="/adcaslte/common/js/jquery-latest.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap.js"></script>
    <script src="/adcaslte/common/js/accounting.min.js"></script>

    <link href="constUplink.css" rel="stylesheet">
    <script src="constUplink.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <div id="popup_title" style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > 관리자 환경변수 > UpLink 사용환경 비율</div>
        </div>
    </div>
</div>

<form id="constUplinkForm">
    <div style="width:320px; padding-bottom:5px; margin:0 auto; text-align: right">
        <button class="btn btn-info btn-mini" id="modifyBtn"><i class="icon-edit"></i>&nbsp;수정</button>
        <button class="btn btn-info btn-mini" style="display:none" id="saveBtn"><i class="icon-ok"></i>&nbsp;저장</button>
        <button class="btn btn-info btn-mini" style="display:none" id="cancelBtn"><i class="icon-remove"></i>&nbsp;취소</button>
    </div>
    <div style="width:320px; margin:0 auto;">
        <table id="constUplink" class="table table-bordered table-condensed">
            <tbody></tbody>
        </table>
    </div>
</form>
</body>
</html>