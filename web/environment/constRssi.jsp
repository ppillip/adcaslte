<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>관리자 환경변수</title>

    <link href="/adcaslte/common/bootstrap/css/bootstrap.css" rel="stylesheet">

    <script src="/adcaslte/common/js/jquery-latest.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap.js"></script>

    <link href="constRssi.css" rel="stylesheet">
    <script src="constRssi.js" language="javascript"></script>
</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <%--<div id="popup_title">QCAS</div>--%>
            <div id="popup_desc">LTE 용량분석 > 관리자 환경변수 > UL Interference 평균값</div>
        </div>
        <div id="middle">
            <div id='search_table'>
                <table>
                    <tr>
                        <td background="/adcaslte/common/bootstrap/img/searchbox_top_l.png" style="height:9px;">&nbsp;</td>
                        <td background="/adcaslte/common/bootstrap/img/searchbox_top_c.png">&nbsp;</td>
                        <td background="/adcaslte/common/bootstrap/img/searchbox_top_r.png">&nbsp;</td>
                    </tr>
                    <tr>
                        <td background="/adcaslte/common/bootstrap/img/searchbox_center1.png" style="width:6px;">&nbsp;</td>
                        <td>
                            <table width="985px" height="80" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding:0px;border-bottom:2px #ff713a solid;height:10px;" valign="bottom" align="left">
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"> SEARCH
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:10px;padding-right:10px;padding-bottom:1px;">
                                        <div>
                                            제조사 :
                                            <select id="mfcSelect">
                                                <option value="ALL" selected>ALL</option>
                                                <option value="MFC00001">삼성</option>
                                                <option value="MFC00002">LG</option>
                                                <option value="MFC00014">NSN</option>
                                            </select>
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

        </div>
    </div>
</div>

<table id="rssiTable" class="table table-bordered table-hover table-condensed table-striped" style="width:1000px; margin: 0 5px;">
    <thead>
    <tr>
        <td style="width:40px;">&nbsp;</td>
        <td>일자</td>
        <td>제조사</td>
        <td>RSSI 01</td>
        <td>RSSI 02</td>
        <td>RSSI 03</td>
        <td>RSSI 04</td>
        <td>RSSI 05</td>
        <td>RSSI 06</td>
        <td>RSSI 07</td>
        <td>RSSI 08</td>
        <td>RSSI 09</td>
        <td>RSSI 10</td>
        <td>RSSI 11</td>
        <td>RSSI 12</td>
        <td>RSSI 13</td>
        <td>RSSI 14</td>
        <td>RSSI 15</td>
        <td>RSSI 16</td>
    </tr>
    </thead>
    <tbody></tbody>
</table>

<div id="modifyRssiModal" class="modal hide fade" style="width:500px" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-body" style="overflow-y:hidden">
    </div>
    <div class="modal-footer">
        <button class="btn btn-info btn-mini" onclick="saveRssi();"><i class="icon-ok"></i>&nbsp;저장</button>
        <button class="btn btn-info btn-mini" data-dismiss="modal"><i class="icon-off"></i>&nbsp;닫기</button>
    </div>
</div>

</body>
</html>