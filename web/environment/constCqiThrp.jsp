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

    <link href="constCqiThrp.css" rel="stylesheet">
    <script src="constCqiThrp.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <div id="popup_title" style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > 관리자 환경변수 > CQI vs Throughput Table</div>
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
                            <table width="985px" height="50" cellspacing="0" cellpadding="0" border="0">
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
                                            <span>&nbsp;&nbsp;</span>
                                            RRU TYPE :
                                            <select id="rruSelect">
                                                <option value="ALL" selected>ALL</option>
                                                <option value="MIMO">MIMO</option>
                                                <option value="SIMO">SIMO</option>
                                                <option value="STDS">STDS</option>
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

<table id="cqiThrpTable" class="table table-bordered table-condensed table-striped" style="width:1000px; margin: 0 5px;">
    <thead>
    <tr>
        <td></td>
        <td>일자</td>
        <td>제조사</td>
        <td>RRU TYPE</td>
        <td>CQI OO</td>
        <td>CQI 01</td>
        <td>CQI 02</td>
        <td>CQI 03</td>
        <td>CQI 04</td>
        <td>CQI 05</td>
        <td>CQI 06</td>
        <td>CQI 07</td>
        <td>CQI 08</td>
        <td>CQI 09</td>
        <td>CQI 10</td>
        <td>CQI 11</td>
        <td>CQI 12</td>
        <td>CQI 13</td>
        <td>CQI 14</td>
        <td>CQI 15</td>
    </tr>
    </thead>
    <tbody></tbody>
</table>

<div id="modifyCqiThrpModal" class="modal hide fade" style="width:500px" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-body" style="overflow-y:hidden">
    </div>
    <div class="modal-footer">
        <button class="btn btn-info btn-mini" onclick="saveCqiThrp();"><i class="icon-ok"></i>&nbsp;저장</button>
        <button class="btn btn-info btn-mini" data-dismiss="modal"><i class="icon-off"></i>&nbsp;닫기</button>
    </div>
</div>

</body>
</html>