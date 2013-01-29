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

    <link href="downLinkByNMSStatsGraph.css" rel="stylesheet">
    <script src="downLinkByNMSStatsGraph.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
    <%--<script src="graph.js" language="javascript"></script>--%>


</head>
<body>
<div id="wrap">
    <div id="web_container">
        <div id="header">
            <div id="popup_title"  style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > LTE NMS 기반 TP > DownLink 통계 그래프</div>
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
                                                        <button class="btn btn-xmini btn-inverse" name="search" id="searchBtn"><i class="icon-search icon-white"></i>&nbsp;조 회</button>
                                                        <button class="btn btn-xmini btn-inverse" name="excelDownload" id="excelDownload"><i class="icon-file icon-white"></i>&nbsp;EXCEL</button>
                                                    </td>
                                                    <td><b>통계주기</b></td>
                                                    <td>
                                                        <input type="radio" name="TERMTYPE" value="DAY">일간
                                                        <input type="radio" name="TERMTYPE" value="WK">주간
                                                        <input type="radio" name="TERMTYPE" value="MON">월간
                                                    </td>
                                                    <td><b>최번기준</b></td>
                                                    <td>
                                                        <select name="MBTYPE">
                                                            <option value="R3" selected>PRB최번(Cell기준)</option>
                                                            <option value="R5"  >Data최번(Cell기준)</option>
                                                            <option value="R15" >동접자최번(Cell기준)</option>
                                                            <option value="R3D" >PRB최번(DU기준)</option>
                                                            <option value="R5D" >Data최번(DU기준)</option>
                                                            <option value="R15D">동접자최번(DU기준)</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>조회대상</b></td>
                                                    <td>
                                                        <span id="SEARCHTYPE_NAME"></span>
                                                        <input type="hidden" name="SEARCHTYPE"     id="SEARCHTYPE">
                                                        <input type="hidden" name="BONBU_CD"       id="BONBU_CD">
                                                        <input type="hidden" name="OPER_TEAM_CD"   id="OPER_TEAM_CD">
                                                        <input type="hidden" name="CITY"           id="CITY">
                                                        <input type="hidden" name="MME_GRP_ID"     id="MME_GRP_ID">
                                                        <input type="hidden" name="NE_ID"          id="NE_ID">
                                                        <input type="hidden" name="FREQ_KIND"      value="ALL">
                                                    </td>
                                                    <td><b>시간대</b></td>
                                                    <td>
                                                        <input type="radio" name="DAYTIME_SEQ" value="1" checked="true">전일(全日)
                                                        <input type="radio" name="DAYTIME_SEQ" value="2">09~20시
                                                    </td>
                                                    <td><b>보기방식</b></td>
                                                    <td>
                                                        <input type="radio" name="VIEWTYPE" value="" checked="true"> 추세
                                                        <input type="radio" name="VIEWTYPE" value="AVG"> 평균
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>기간</b></td>
                                                    <td>
                                                        <input  group="TERMTYPE" id="datepicker01" style="text-align: center;padding:0px; margin: 0px; width:80px; height:18px;font-size:11px;" type="text" />
                                                        <span   group="TERMTYPE" id="dash" style="margin-left: 5px;margin-right: 5px;">-</span>
                                                        <input  group="TERMTYPE" id="datepicker02" style="text-align: center;padding:0px; margin: 0px; width:80px; height:18px;font-size:11px;" type="text" />
                                                        <span   group="TERMTYPE" id="fromto" style="display:none; margin-left: 10px;"></span>
                                                        <select group="TERMTYPE" id="fromYear" style="display:none;width:80px;"></select>
                                                        <select group="TERMTYPE" id="fromMonth" style="display:none;width:80px;"></select>
                                                        <select group="TERMTYPE" id="toYear" style="display:none;width:80px;"></select>
                                                        <select group="TERMTYPE" id="toMonth" style="display:none;width:80px;"></select>
                                                        <input type="hidden" name="FROMYMD">
                                                        <input type="hidden" name="TOYMD">
                                                    </td>
                                                    <td></td>
                                                    <td></td>
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
<div style="margin-left:20px;">
    용량그래프 : <input type="radio"  name="CHARTTYPE" value="THROUGHPUT">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    HISTOGRAM : <input type="radio" name="CHARTTYPE" value="HISTOGRAM">
</div>
<div id="graphContainer" style="width: 1080px; height: 470px; margin: 0px;"></div>

</body>
</html>