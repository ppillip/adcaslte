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

    <%--<script src="/adcaslte/common/js/jquery.progress.js"></script>--%>
    <script src="/adcaslte/common/js/jquery.menu.js"></script>
    <script src="/adcaslte/common/js/jquery.checkIEversion.js"></script>

    <link href="downLinkBySTDStatsComp.css" rel="stylesheet">
    <script src="downLinkBySTDStatsComp.js" language="javascript"></script>
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
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"><strong>&nbsp;&nbsp;LTE 용량분석 > LTE 기준 용량분석 > DownLink 통계 전후비교</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 1px 10px">

                                        <div name="divSearch" ID="divSearch" style="width:1210px;vertical-align:middle;">
                                            <input type="hidden" name="TERMTYPE" value="MON">
                                            <input type="hidden" name="VIEWTYPE" value="AVG">
                                            <table border="0">
                                                <colgroup>
                                                    <col width="60px">
                                                    <col width="370px">
                                                    <col width="60px">
                                                    <col width="370px">
                                                    <col width="60px">
                                                    <col width="300px">
                                                </colgroup>
                                                <tr>
                                                    <td colspan="2">
                                                        <button class="btn btn-xmini btn-inverse" name="search"><i class="icon-search icon-white"></i>&nbsp;조 회</button>
                                                        <button class="btn btn-xmini btn-inverse" name="excelDownload" id="excelDownload"><i class="icon-file icon-white"></i>&nbsp;EXCEL</button>
                                                        <span class="dropdown" id="graphDropDown">
                                                            <button class="dropdown-toggle btn btn-xmini" id="drop1" role="button" data-toggle="dropdown" href="#"><i class="icon-plane"></i> 그래프 <b class="caret"></b> </button>
                                                            <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                                <li name="showThrpGraph"><a href="#">용량그래프</a></li>
                                                                <li name="showCqiModal"><a href="#" role="button" data-toggle="modal" tabindex="-1" >CQI</a></li>
                                                            </ul>
                                                        </span>
                                                        <span class="dropdown" id="excelDropDown">
                                                            <button class="dropdown-toggle btn btn-xmini" id="drop5" role="button" data-toggle="dropdown" href="#"><i class="icon-file"></i> EXCEL <b class="caret"></b> </button>
                                                            <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                                <li name="downCqiExcel"><a tabindex="-1" href="#">CQI(PDF/CDF) Download</a></li>
                                                            </ul>
                                                        </span>
                                                    </td>
                                                    <td><b>전기간</b></td>
                                                    <td>
                                                        <select id="FROM_YEAR1" name="FROM_YEAR1"></select>
                                                        <select id="FROM_MONTH1" name="FROM_MONTH1"></select>
                                                        <select id="TO_YEAR1" name="TO_YEAR1"></select>
                                                        <select id="TO_MONTH1" name="TO_MONTH1"></select>
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>시간대</b></td>
                                                    <td>
                                                        <input type="radio" name="DAYTIME_SEQ" value="1" checked="true">전일(全日)
                                                        <input type="radio" name="DAYTIME_SEQ" value="2">09~20시
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <span class="dropdown" id="searchDropDown">
                                                            <button class="dropdown-toggle btn btn-mini" style="padding-top:0.3em;" id="drop2" role="button" data-toggle="dropdown" href="#"><i class="icon-th-list"></i> 조회대상 <b class="caret"></b> </button>
                                                            <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                                <li  name="bonbuSearch"><a tabindex="-1" href="#">본부별</a></li>
                                                                <li  name="teamSearch"><a tabindex="-1" href="#">팀별</a></li>
                                                                <li  name="partSearch"><a tabindex="-1" href="#">파트별</a></li>
                                                                <li  name="citySearch"><a tabindex="-1" href="#">도/특별/광역</a></li>
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
                                                            <span   group="searchSelect" id="cityLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">도/특별/광역</span>
                                                            <span   group="searchSelect" id="uniLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">시/군/구</span>
                                                            <select group="searchSelect" name="CITY" id="CITY" style="display:none"></select>
                                                            <span   group="searchSelect" id="emsLabel" class="label" style="display:none;font-size: 14px;margin-left:5px">EMS</span>
                                                            <select group="searchSelect" name="MME_GRP_ID" id="MME_GRP_ID" style="display:none;width:100px;"></select>
                                                            <select group="searchSelect" name="NE_ID" id="NE_ID" style="display:none;width:120px;"></select>
                                                        </span>
                                                    </td>
                                                    <td><b>후기간</b></td>
                                                    <td>
                                                        <select id="FROM_YEAR2" name="FROM_YEAR2"></select>
                                                        <select id="FROM_MONTH2" name="FROM_MONTH2"></select>
                                                        <select id="TO_YEAR2" name="TO_YEAR2"></select>
                                                        <select id="TO_MONTH2" name="TO_MONTH2"></select>
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>주파수</b></td>
                                                    <td style="font-size: 11px;" >
                                                        <input type="radio" name="FREQ_KIND" value="ALL" checked="true"> 전체
                                                        <input type="radio" name="FREQ_KIND" value="800MHZ"> 800 MHz
                                                        <input type="radio" name="FREQ_KIND" value="1.8GHZ"> 1.8 GHz
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><b>최번기준</b></td>
                                                    <td>
                                                        <select name="MBTYPE" style="width:140px;">
                                                            <option value="R3" selected>PRB최번(Cell기준)</option>
                                                            <option value="R5"  >Data최번(Cell기준)</option>
                                                            <option value="R15" >동접자최번(Cell기준)</option>
                                                            <option value="R3D" >PRB최번(DU기준)</option>
                                                            <option value="R5D" >Data최번(DU기준)</option>
                                                            <option value="R15D">동접자최번(DU기준)</option>
                                                        </select>
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


<div name="divDailyDataPad" id="divDataPad">

<table name="dailyData">
<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- top left   -->
        <div class="" name="divTopLeft" id="divTopLeft">
            <table name="tableTopLeft" id="tableTopLeft" class="table table-bordered table-condensed">
                <tbody>
                <tr style="height:23px;" class="info">
                    <td rowspan="3" group="title01" id="title01" style="width:100px;font-size:11px;">본부</td>
                    <td rowspan="3" group="title02" id="title02" style="width:100px;font-size:11px;">팀</td>
                    <td rowspan="3" group="title03" id="title03" style="width:100px;font-size:11px;">파트</td>
                    <td rowspan="3" id="titleFREQ" style="width:70px;font-size:11px;">주파수구분</td>
                    <td style="width:42px;font-size:11px;"><i class="icon-signal"></i></td>
                </tr>
                <tr style="height:23px;" class="info">
                    <td rowspan="2"><input type="checkbox" name="checkAll"/></td>
                </tr>
                <tr style="height:23px;" class="info"></tr>
                </tbody>
            </table>
        </div>
    </td>
    <td><!--  top right   -->
        <div class="" name="divTopRight" id="divTopRight">
            <table name="tableTopRight" id="tableTopRight" class="table table-bordered table-condensed">
                <colgroup>
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                </colgroup>
                <tbody>
                <tr style="height:23px;" class="info">
                    <td rowspan="3">기준용량(Mbps)</td>
                    <td rowspan="3">CQI 평균</td>
                    <td rowspan="3">CQI0 비율</td>
                    <td rowspan="3">RI2 비율</td>
                    <td rowspan="3">DL PRB 사용율(%)</td>
                    <td colspan="4">RSSI</td>
                    <td rowspan="3">License<br/>초과 실패호</td>
                    <td colspan="2">전송로</td>
                </tr>
                <tr style="height:23px;" class="info">
                    <td colspan="2">Total(PUCCH)</td>
                    <td colspan="2">Total(PUSCH)</td>
                    <td rowspan="2">종류</td>
                    <td rowspan="2">갯수</td>
                </tr>
                <tr style="height:23px;" class="info">
                    <td>최번시</td>
                    <td>최한시</td>
                    <td>최번시</td>
                    <td>최한시</td>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
</tr>

<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- middle left   -->
        <div name="divMiddleLeft" id="divMiddleLeft">
            <table name="tableMiddleLeft" id="tableMiddleLeft" class="table table-bordered table-condensed table-striped">
                <tbody>
                </tbody>
            </table>
        </div>
    </td>
    <td><!--  middle right   -->
        <div name="divMiddleRight" id="divMiddleRight" onscroll="javascript:scrollY();">
            <table name="tableMiddleRight" id="tableMiddleRight" class="table table-bordered table-condensed table-striped">
                <colgroup>
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                </colgroup>
                <tbody>

                </tbody>
            </table>
        </div>
    </td>
</tr>

<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- top left   -->
        <div class="" name="divTopLeft" id="divTopLeftAfter">
            <table name="tableTopLeft" id="tableTopLeftAfter" class="table table-bordered table-condensed">
                <tbody>
                <tr style="height:23px;" class="info">
                    <td rowspan="3" group="title01" id="title01After" style="width:100px;font-size:11px;">본부</td>
                    <td rowspan="3" group="title02" id="title02After" style="width:100px;font-size:11px;">팀</td>
                    <td rowspan="3" group="title03" id="title03After" style="width:100px;font-size:11px;">파트</td>
                    <td rowspan="3" id="titleFREQAfter" style="width:70px;font-size:11px;">주파수구분</td>
                    <td style="width:42px;font-size:11px;"><i class="icon-signal"></i></td>
                </tr>
                <tr style="height:23px;" class="info">
                    <td rowspan="2"></td>
                </tr>
                <tr style="height:23px;" class="info"></tr>
                </tbody>
            </table>
        </div>
    </td>
    <td><!--  top right   -->
        <div class="" name="divTopRight" id="divTopRightAfter">
            <table name="tableTopRight" id="tableTopRightAfter" class="table table-bordered table-condensed">
                <colgroup>
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                </colgroup>
                <tbody>
                <tr style="height:23px;" class="info">
                    <td rowspan="3">기준용량(Mbps)</td>
                    <td rowspan="3">CQI 평균</td>
                    <td rowspan="3">CQI0 비율</td>
                    <td rowspan="3">RI2 비율</td>
                    <td rowspan="3">DL PRB 사용율(%)</td>
                    <td colspan="4">RSSI</td>
                    <td rowspan="3">License<br/>초과 실패호</td>
                    <td colspan="2">전송로</td>
                </tr>
                <tr style="height:23px;" class="info">
                    <td colspan="2">Total(PUCCH)</td>
                    <td colspan="2">Total(PUSCH)</td>
                    <td rowspan="2">종류</td>
                    <td rowspan="2">갯수</td>
                </tr>
                <tr style="height:23px;" class="info">
                    <td>최번시</td>
                    <td>최한시</td>
                    <td>최번시</td>
                    <td>최한시</td>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
</tr>

<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- middle left   -->
        <div name="divMiddleLeft" id="divMiddleLeftAfter">
            <table name="tableMiddleLeft" id="tableMiddleLeftAfter" class="table table-bordered table-condensed table-striped">
                <tbody>
                </tbody>
            </table>
        </div>
    </td>
    <td><!--  middle right   -->
        <div name="divMiddleRight" id="divMiddleRightAfter" onscroll="javascript:scrollY();">
            <table name="tableMiddleRight" id="tableMiddleRightAfter" class="table table-bordered table-condensed table-striped">
                <colgroup>
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                </colgroup>
                <tbody>

                </tbody>
            </table>
        </div>
    </td>
</tr>

<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td style="height:16px;"><!-- bottom left   -->
        <div class="" name="divBottomLeft" id="divBottomLeft">
            <table name="tableBottomLeft" id="tableBottomLeft" class="table table-condensed">
                <tbody>
                <tr>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
    <td style="height:16px;"><!--  top right   -->
        <div style="height:16px;" name="divBottomRight" id="divBottomRight" onscroll="javascript:scrollX();">
            <table name="tableBottomRight" id="tableBottomRight" class="table table-condensed">
                <colgroup>
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                    <col class="col01">
                </colgroup>
                <tbody>
                </tbody>
            </table>
        </div>
    </td>
</tr>

</table>

</div>

<!-- Modal -->
<div id="cqiModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cqiModalLabel" aria-hidden="true"
     style="width: 1000px; postion:absolute; top:430px; left:450px;">
    <div class="modal-footer" style="height:30px; vertical-align: middle">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <button type="button" class="btn btn-mini pull-left" name="excelDownload"><i class="icon-download"></i> EXCEL Download </button>
        <div class="pull-left" style="margin-left:20px;">
            CQI PDF graph :<input type="radio" name="cqiFlag" value="PDF" checked>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            CQI CDF graph :<input type="radio" name="cqiFlag" value="CDF">
        </div>
    </div>
    <div class="modal-body">
        <div id="graphContainer" style="width: 960px; height: 390px; margin: 0px;"></div>
    </div>
</div>

</body>
</html>