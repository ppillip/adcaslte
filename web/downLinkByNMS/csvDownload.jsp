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

    <script src="/adcaslte/common/highchart/js/highcharts.src.js"></script>
    <script src="/adcaslte/common/highchart/js/modules/exporting.js"></script>
    <script src="/adcaslte/common/js/jquery.highcharts.js"></script>

    <script src="/adcaslte/common/js/jquery.menu.js"></script>
    <script src="/adcaslte/common/js/jquery.progress.js"></script>
    <script src="/adcaslte/common/js/jquery.checkIEversion.js"></script>

    <link href="csvDownload.css" rel="stylesheet">
    <script src="csvDownload.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>

</head>
<body>
<div id="wrap">
    <div id="quickmenu_container">
        <div style="float:right;margin-top:279px;">
            <a href="javascript:close_quickmenu();"><img src="/adcaslte/common/bootstrap/img/bt_close_quickmenu.png"></a>
        </div>
    </div>
    <div id="web_container">
        <div id="header">
            <div id="popup_title"  style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > LTE NMS 기반 섹터 TP > DownLink CSV 다운로드</div>
            <div id="quickmenu_trigger"><img src="/adcaslte/common/bootstrap/img/bt_quickmenu.png"></div>
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
                            <table width="1240" height="90" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding:0px;border-bottom:2px #ff713a solid;height:10px;" valign="bottom" align="left">
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"> SEARCH
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 1px 10px">

                                        <div name="divSearch" ID="divSearch" style="width:1210px;vertical-align:middle;">
                                            <table border="0">
                                                <colgroup>
                                                    <col width="60px">
                                                    <col width="400px">
                                                    <col width="60px">
                                                    <col width="300px">
                                                    <col width="60px">
                                                    <col width="300px">
                                                </colgroup>
                                                <tr>
                                                    <td colspan="2">
                                                        <button class="btn btn-mini btn-inverse" name="search"><i class="icon-file icon-white"></i>&nbsp;CSV Download</button>
                                                    </td>
                                                    <td><b>주파수</b></td>
                                                    <td>
                                                        <input type="radio" name="FREQ_KIND" value="ALL" checked="true"> 전체
                                                        <input type="radio" name="FREQ_KIND" value="800MHZ"> 800 MHz
                                                        <input type="radio" name="FREQ_KIND" value="1.8GHZ"> 1.8 GHz
                                                    </td>
                                                    <td><!--b>통계주기</b--></td>
                                                    <td><!--일간 기본-->
                                                        <input type="radio" name="TERMTYPE" value="DAY" checked="true" style="display:none;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                    <span class="dropdown" id="searchDropDown">
                                                        <button class="dropdown-toggle btn btn-mini" id="drop2" role="button" data-toggle="dropdown" href="#"><i class="icon-th-list"></i> 조회대상 <b class="caret"></b> </button>
                                                        <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                            <%--<li  name="bonbuSearch"><a tabindex="-1" href="#">본부별</a></li>-->
                                                            <%--<li  name="teamSearch"><a tabindex="-1" href="#">팀별</a></li>--%>
                                                            <li  name="partSearch"><a tabindex="-1" href="#">파트별</a></li>
                                                            <%--<li  name="citySearch"><a tabindex="-1" href="#">도/특별/광역</a></li>--%>
                                                            <li  name="uniSearch"><a tabindex="-1" href="#">시/군/구</a></li>
                                                            <li  name="emsSearch"><a tabindex="-1" href="#">EMS</a></li>
                                                        </ul>
                                                        <input type="hidden" name="SEARCHTYPE" id="SEARCHTYPE">
                                                    </span>
                                                    <span>
                                                        <span   group="searchSelect" id="bonbuLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">본부별</span>
                                                        <span   group="searchSelect" id="teamLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">팀별</span>
                                                        <span   group="searchSelect" id="partLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">파트별</span>
                                                        <select group="searchSelect" name="BONBU_CD" id="BONBU_CD" style="display:none;width:100px;"></select>
                                                        <select group="searchSelect" name="OPER_TEAM_CD" id="OPER_TEAM_CD" style="display:none;width:100px;"></select>
                                                        <select group="searchSelect" name="PART_CD"       id="PART_CD" style="display:none;width:100px;"></select>
                                                        <span   group="searchSelect" id="cityLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">도/특별/광역</span>
                                                        <span   group="searchSelect" id="uniLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">시/군/구</span>
                                                        <select group="searchSelect" name="CITY" id="CITY" style="display:none"></select>
                                                        <span   group="searchSelect" id="emsLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">EMS</span>
                                                        <select group="searchSelect" name="MME_GRP_ID" id="MME_GRP_ID" style="display:none;width:100px;"></select>
                                                        <select group="searchSelect" name="NE_ID" id="NE_ID" style="display:none;width:120px;"></select>
                                                    </span>
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
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>날짜</b></td>
                                                    <td>
                                                        <input  group="TERMTYPE" id="datepicker01" style="text-align: center;padding:0px; margin: 0px; width:80px; height:18px;font-size:11px;" type="text" />
                                                        <span   group="TERMTYPE" id="dash" style="margin-left: 5px;margin-right: 5px;"></span>
                                                        <input  group="TERMTYPE" id="datepicker02" style="display:none;text-align: center;padding:0px; margin: 0px; width:80px; height:18px;font-size:11px;" type="text" />
                                                        <span   group="TERMTYPE" id="fromto"        style="display:none; margin-left: 10px;"></span>
                                                        <select group="TERMTYPE" id="fromYear"     style="display:none;width:80px;"></select>
                                                        <select group="TERMTYPE" id="fromMonth"    style="display:none;width:80px;"></select>
                                                        <select group="TERMTYPE" id="toYear"        style="display:none;width:80px;"></select>
                                                        <select group="TERMTYPE" id="toMonth"      style="display:none;width:80px;"></select>
                                                        <input type="hidden" name="FROMYMD">
                                                        <input type="hidden" name="TOYMD">
                                                    </td>
                                                    <td><b>시간대</b></td>
                                                    <td>
                                                        <input type="radio" name="DAYTIME_SEQ" value="1" checked="true">전일(全日)
                                                        <input type="radio" name="DAYTIME_SEQ" value="2">09~20시
                                                    </td>
                                                    <td><b> </b></td>
                                                    <td>
                                                        <input type="radio" name="VIEWTYPE" value="" checked="true" style="display:none;"> <!-- 보기방식 --><!-- 추세 기본 -->
                                                    </td>
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

</body>
</html>