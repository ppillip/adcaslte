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

    <link href="downLinkByNMSStatsComp.css" rel="stylesheet">
    <script src="downLinkByNMSStatsComp.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
    <script src="graph.js" language="javascript"></script>

</head>
<body>
<div id="wrap">
    <div id="quickmenu_container">
        퀵메뉴 작업중입니다.
        <div style="float:right;margin-top:279px;">
            <a href="javascript:close_quickmenu();"><img src="/adcaslte/common/bootstrap/img/bt_close_quickmenu.png"></a>
        </div>
    </div>
    <div id="web_container">
        <div id="header">
            <%--<div id="popup_title">QCAS</div>--%>
            <div id="popup_desc">LTE 용량분석 > LTE NMS 기반 섹터 TP > DownLink 통계 전후비교</div>
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
                            <table width="1240" height="110" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding:0px;border-bottom:2px #ff713a solid;height:10px;" valign="bottom" align="left">
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"> SEARCH
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:10px;padding-left:10px;padding-right:10px;padding-bottom:1px;">

                                        <div name="divSearch" ID="divSearch" style="width:1210px;vertical-align:middle;">
                                            <input type="hidden" name="VIEWTYPE" value="AVG"> <!--평균-->
                                            <table border="0">
                                                <colgroup>
                                                    <col width="60px">
                                                    <col width="350px">
                                                    <col width="60px">
                                                    <col width="350px">
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
                                                                <li name="showCqiModal"><a href="#" role="button" data-toggle="modal" tabindex="-1" >CQI</a></li>
                                                            </ul>
                                                    </span>
                                                    <span class="dropdown" id="excelDropDown">
                                                            <button class="dropdown-toggle btn btn-xmini" id="drop5" role="button" data-toggle="dropdown" href="#"><i class="icon-file"></i> EXCEL <b class="caret"></b> </button>
                                                            <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                                <li  name="downCqiExcel"><a tabindex="-1" href="#">CQI(PDF/CDF) Download</a></li>
                                                            </ul>
                                                    </span>
                                                    </td>
                                                    <td><b>전기간</b></td>
                                                    <td>
                                                        <input type="text" name="FROMYMD" id="datepicker01"/>
                                                        -
                                                        <input type="text" name="TOYMD" id="datepicker02"/>
                                                    </td>
                                                    <td><b>주파수</b></td>
                                                    <td>
                                                        <input type="radio" name="FREQ_KIND" value="ALL" checked="true"> 전체
                                                        <input type="radio" name="FREQ_KIND" value="800MHZ"> 800 MHz
                                                        <input type="radio" name="FREQ_KIND" value="1.8GHZ"> 1.8 GHz
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                    <span class="dropdown" id="searchDropDown">
                                                        <button class="dropdown-toggle btn btn-mini" id="drop2" role="button" data-toggle="dropdown" href="#"><i class="icon-th-list"></i> 조회대상 <b class="caret"></b> </button>
                                                        <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                            <li  name="bonbuSearch"><a tabindex="-1" href="#">본부별</a></li>
                                                            <li  name="teamSearch"><a tabindex="-1" href="#">팀별</a></li>
                                                            <li  name="partSearch"><a tabindex="-1" href="#">파트별</a></li>
                                                            <li  name="citySearch"><a tabindex="-1" href="#">도/특별/광역</a></li>
                                                            <li  name="uniSearch"><a tabindex="-1" href="#">시/군/구</a></li>
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
                                                    </span>
                                                    </td>
                                                    <td><b>후기간</b></td>
                                                    <td>
                                                        <input type="text" name="FROMYMD2" id="datepicker03"/>
                                                        -
                                                        <input type="text" name="TOYMD2" id="datepicker04"/>
                                                    </td>
                                                    <td><b>시간대</b></td>
                                                    <td>
                                                        <input type="radio" name="DAYTIME_SEQ" value="1" checked="true">전일(全日)
                                                        <input type="radio" name="DAYTIME_SEQ" value="2">09~20시
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td><b>통계주기</b></td>
                                                    <td>
                                                        <input type="radio" name="TERMTYPE" value="DAY" checked="true">일간
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
                                                <%--<td><b>보기방식</b></td>
                                                    <td>
                                                        <input type="radio" name="VIEWTYPE" value="" checked="true"> 추세
                                                        <input type="radio" name="VIEWTYPE" value="AVG"> 평균
                                                    </td>--%>
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
                <tr style="height:30px;" class="info">
                    <td rowspan="3" group="title01" id="title01" style="width:100px;font-size:11px;">본부</td>
                    <td rowspan="3" group="title02" id="title02" style="width:100px;font-size:11px;">팀</td>
                    <td rowspan="3" group="title03" id="title03" style="width:100px;font-size:11px;">파트</td>
                    <td rowspan="3" id="titleFREQ" style="width:70px;font-size:11px;">주파수구분</td>
                    <td style="width:60px;font-size:11px;">GRAPH</td>
                </tr>
                <tr style="height:30px;" class="info">
                    <td rowspan="2"><input type="checkbox" name="checkAll"/></td>
                </tr>
                <tr style="height:30px;" class="info"></tr>
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
                <tr style="height:30px;" class="info">
                    <td rowspan="3" name="so">용량(Mbps)</td>
                    <td rowspan="3">CQI 평균</td>
                    <td rowspan="3">CQI0 비율<br/>(%)</td>
                    <td rowspan="3">RI2 비율<br/>(%)</td>
                    <td rowspan="3">DL PRB<br/>사용률(%)</td>

                    <td rowspan="3">MCS평균</td>
                    <td rowspan="2" colspan="2">RSSI</td>
                    <td rowspan="3">MIMO 비율</td>
                    <td rowspan="3">DL <br/>Throughput<br/>(Kbps)</td>
                    <td rowspan="3">License<br/>초과<br>실패호</td>
                    <td rowspan="3">OL MIMO <br>비율(%)</td>
                    <td rowspan="3">MCS0 <br>비율(%)</td>
                    <td colspan="4">RSSI</td>

                    <td colspan="8">데이터 (dBm)</td>
                    <td colspan="4">HD Voice</td>
                    <td colspan="4">영상통화</td>

                    <td colspan="2">전송로</td>

                </tr>
                <tr style="height:30px;" class="info">
                    <td colspan="2">PUCCH</td>
                    <td colspan="2">PUSCH</td>

                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB<br/>사용률(%)</td>
                    <td rowspan="2">DRB<br/>사용률(%)</td>
                    <td rowspan="2">동접자<br/>(Erl)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">접속률<br/>(%)</td>
                    <td rowspan="2">CD율<br/>(%)</td>
                    <td rowspan="2">FA사용률<br/>(%)</td>
                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB<br/>사용률(%)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">점유시간</td>
                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB<br/>사용률(%)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">점유시간</td>

                    <td rowspan="2">종류</td>
                    <td rowspan="2">갯수</td>
                </tr>
                <tr style="height:30px;" class="info">
                    <td>최번시</td>
                    <td>최한시</td>
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
                <colgroup><col class="col01">
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
                <tr style="height:30px;" class="info">
                    <td rowspan="3" group="title01" id="title01After" style="width:100px;font-size:11px;">본부</td>
                    <td rowspan="3" group="title02" id="title02After" style="width:100px;font-size:11px;">팀</td>
                    <td rowspan="3" group="title03" id="title03After" style="width:100px;font-size:11px;">파트</td>
                    <td rowspan="3" id="titleFREQAfter" style="width:70px;font-size:11px;">주파수구분</td>
                    <td style="width:60px;font-size:11px;">GRAPH</td>
                </tr>
                <tr style="height:30px;" class="info">
                    <td rowspan="2"></td>
                </tr>
                <tr style="height:30px;" class="info"></tr>
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
                <tr style="height:30px;" class="info">
                    <td rowspan="3" name="so">용량(Mbps)</td>
                    <td rowspan="3">CQI 평균</td>
                    <td rowspan="3">CQI0 비율<br/>(%)</td>
                    <td rowspan="3">RI2 비율<br/>(%)</td>
                    <td rowspan="3">DL PRB<br/>사용률(%)</td>

                    <td rowspan="3">MCS평균</td>
                    <td rowspan="2" colspan="2">RSSI</td>
                    <td rowspan="3">MIMO 비율</td>
                    <td rowspan="3">DL <br/>Throughput<br/>(Kbps)</td>
                    <td rowspan="3">License<br/>초과<br>실패호</td>
                    <td rowspan="3">OL MIMO <br>비율(%)</td>
                    <td rowspan="3">MCS0 <br>비율(%)</td>
                    <td colspan="4">RSSI</td>

                    <td colspan="8">데이터 (dBm)</td>
                    <td colspan="4">HD Voice</td>
                    <td colspan="4">영상통화</td>

                    <td colspan="2">전송로</td>

                </tr>
                <tr style="height:30px;" class="info">
                    <td colspan="2">PUCCH</td>
                    <td colspan="2">PUSCH</td>

                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB<br/>사용률(%)</td>
                    <td rowspan="2">DRB<br/>사용률(%)</td>
                    <td rowspan="2">동접자<br/>(Erl)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">접속률<br/>(%)</td>
                    <td rowspan="2">CD율<br/>(%)</td>
                    <td rowspan="2">FA사용률<br/>(%)</td>
                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB<br/>사용률(%)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">점유시간</td>
                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB<br/>사용률(%)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">점유시간</td>

                    <td rowspan="2">종류</td>
                    <td rowspan="2">갯수</td>
                </tr>
                <tr style="height:30px;" class="info">
                    <td>최번시</td>
                    <td>최한시</td>
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
        <div name="divMiddleRight" id="divMiddleRightAfter" onscroll="javascript:scrollYAfter();">
            <table name="tableMiddleRight" id="tableMiddleRightAfter" class="table table-bordered table-condensed table-striped">
                <colgroup><col class="col01">
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
    <td><!-- bottom left   -->
        <div class="" name="divBottomLeft" id="divBottomLeft">
            <table name="tableBottomLeft" id="tableBottomLeft" class="table table-condensed">
                <tbody>
                <tr>
                    <td group="title01" style="width:100px;"></td>
                    <td group="title02" style="width:100px;"></td>
                    <td group="title03" style="width:100px;"></td>
                    <td style="width:70px;"></td>
                    <td style="width:60px;"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
    <td><!--  top right   -->
        <div name="divBottomRight" id="divBottomRight" onscroll="javascript:scrollX();">
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
                <tr>
                    <td></td><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                    <td/><td/><td/><td/>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
</tr>

</table>

</div>
<script src="/adcaslte/common/highchart/js/highcharts.src.js"></script>
<script src="/adcaslte/common/highchart/js/modules/exporting.js"></script>

<!-- Modal -->
<div id="cqiModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cqiModalLabel" aria-hidden="true"
     style="width: 800px; postion:absolute; top:330px; left:400px;">
    <div class="modal-footer" style="height:30px; vertical-align: middle">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <button type="button" class="btn btn-mini pull-left" name="excelDownload"><i class="icon-download"></i> EXCEL Down </button>
        <div class="pull-left" style="margin-left:20px;">
            CQI PDF graph :<input type="radio" name="cqiFlag" value="cqiPDFContainer" checked="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            CQI CDF graph :<input type="radio" name="cqiFlag" value="cqiCDFContainer">
        </div>
    </div>
    <div class="modal-body">
        <div id="cqiPDFContainer" style="width: 760px; height: 400px; margin: 0 0 0 0;"></div>
        <div id="cqiCDFContainer" style="width: 760px; height: 400px; margin: 0 0 0 0;"></div>
    </div>
    <div class="modal-footer" style="height:30px;">
        <button class="btn btn-mini" data-dismiss="modal" aria-hidden="true">닫기</button>
        <!-- button class="btn btn-primary btn-mini">Save changes</button -->
    </div>
</div>

</body>
</html>