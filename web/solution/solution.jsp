<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>SK Telecom QCAS System</title>

    <link href="/adcaslte/common/bootstrap/css/bootstrap.css" rel="stylesheet">

    <script src="/adcaslte/common/js/jquery-latest.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap.js"></script>
    <script src="/adcaslte/common/js/accounting.min.js"></script>

    <link href="solution.css" rel="stylesheet">
    <script src="solution.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
</head>
<body>

<div style="width:900px; height:490px; margin:15px;">
    <div style="margin-bottom:5px;">
        <ul><li>본부/팀별 현황상세</li></ul>
    </div>
    <div style="height:437px; overflow-y: auto; margin:15px 1px;">
        <table id="solutionListTable" class="table table-bordered table-hover table-condensed table-striped">
            <thead>
            <tr class="info">
                <td style="text-align:center; background-color: #FFEDCA;">일자</td>
                <td style="text-align:center; background-color: #FFEDCA;">본부명</td>
                <td style="text-align:center; background-color: #FFEDCA;">팀명</td>
                <td style="text-align:center; background-color: #FFEDCA;">파트명</td>
                <td style="text-align:center; background-color: #FFEDCA;">주파수</td>
                <td style="text-align:center; background-color: #FFEDCA;">용량저하 셀수</td>
                <td style="text-align:center; background-color: #FFEDCA;">PRB사용률불량 셀수</td>
                <td style="text-align:center; background-color: #FFEDCA;">UL불량 셀수</td>
                <td style="text-align:center; background-color: #FFEDCA;">라이센스실패호 셀수</td>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

</body>
</html>