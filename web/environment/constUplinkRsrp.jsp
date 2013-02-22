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

    <link href="constUplinkRsrp.css" rel="stylesheet">
    <script src="constUplinkRsrp.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <div id="popup_title" style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > 관리자 환경변수 > RSRP vs Throughput Table</div>
        </div>
    </div>
</div>

<form id="constUplinkRsrpForm">
    <div style="width:400px; padding-bottom:5px; margin:0 auto; text-align: right">
        <button class="btn btn-info btn-mini" id="modifyBtn"><i class="icon-edit"></i>&nbsp;수정</button>
        <button class="btn btn-info btn-mini" style="display:none" id="saveBtn"><i class="icon-ok"></i>&nbsp;저장</button>
        <button class="btn btn-info btn-mini" style="display:none" id="cancelBtn"><i class="icon-remove"></i>&nbsp;취소</button>
    </div>
    <div style="width:400px; height:380px; margin:0 auto; overflow-y: auto;">
        <table id="constUplinkRsrp" class="table table-bordered table-condensed">
            <thead>
            <tr>
                <td class="col1 tdCenterInfo">RSRP</td>
                <td class="col2 tdCenterInfo">THROUGHPUT</td>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div id="divUpload" style="width:400px; padding-top:20px; margin:0 auto; display:none">
        <p><i class="icon-circle-arrow-down"></i>&nbsp;Excel에서 RSSP, THROUGHPUT 값을 복사해서 붙이고
           <br>&nbsp;&nbsp;&nbsp;&nbsp;적용버튼을 누르면 값이 적용됩니다.</p>
        <textarea id="rsrp" rows="4" style="width:310px; overflow-y:auto"></textarea>
        <span>&nbsp;&nbsp;</span>
        <button class="btn btn-mini" onclick="uploadRsrp(event);"><i class="icon-circle-arrow-up"></i>&nbsp;적용</button>
    </div>

</form>
</body>
</html>