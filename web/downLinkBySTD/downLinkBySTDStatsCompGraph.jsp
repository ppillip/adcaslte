<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>SK Telecom QCAS System</title>

    <link href="/adcaslte/common/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/adcaslte/common/bootstrap/css/datepicker.css" rel="stylesheet">

    <script src="/adcaslte/common/js/json2.js"></script>
    <script src="/adcaslte/common/js/jquery-latest.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap.js"></script>
    <script src="/adcaslte/common/bootstrap/js/bootstrap-datepicker.js"></script>
    <script src="/adcaslte/common/js/moment.min.js"></script>
    <script src="/adcaslte/common/js/accounting.min.js"></script>

    <%--<script src="/adcaslte/common/js/jquery.progress.js"></script>--%>
    <script src="/adcaslte/common/js/jquery.checkIEversion.js"></script>

    <script src="/adcaslte/common/highchart/js/highcharts.src.js"></script>
    <script src="/adcaslte/common/highchart/js/modules/exporting.js"></script>
    <script src="/adcaslte/common/js/jquery.highcharts.js"></script>

    <link href="downLinkBySTDStatsCompGraph.css" rel="stylesheet">
    <script src="downLinkBySTDStatsCompGraph.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>


</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <div id="popup_title"  style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > LTE 기준 용량분석 > DownLink 통계 전후비교 그래프</div>
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
                            <table width="1060" height="90" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding:0px;border-bottom:2px #ff713a solid;height:10px;" valign="bottom" align="left">
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"> SEARCH
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:10px;padding-right:10px;padding-bottom:1px;">

                                        <div name="divSearch" ID="divSearch" style="width:1000px;vertical-align:middle;">
                                            <input type="hidden" name="VIEWTYPE" value="AVG">
                                            <table border="0">
                                                <colgroup>
                                                    <col width="60px">
                                                    <col width="360px">
                                                    <col width="60px">
                                                    <col width="250px">
                                                    <col width="60px">
                                                    <col width="200px">
                                                </colgroup>
                                                <tr>
                                                    <td colspan="2">
                                                        <button class="btn btn-xmini btn-inverse" name="excelDownload" id="excelDownload"><i class="icon-file icon-white"></i>&nbsp;EXCEL</button>
                                                    </td>
                                                    <td><b>전기간</b></td>
                                                    <td>
                                                        <span id="BEFOREYMD"></span>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>조회대상</b></td>
                                                    <td>
                                                        <span id="SEARCHTYPE_NAME"></span>
                                                    </td>
                                                    <td><b>후기간</b></td>
                                                    <td>
                                                        <span id="AFTERYMD"></span>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </table>

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

<!-- Graph -->
<div id="graphContainer" style="width: 1080px; height: 470px; margin: 0px;"></div>

</body>
</html>