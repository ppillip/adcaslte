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

    <link href="downLinkByQMS.css" rel="stylesheet">
    <script src="downLinkByQMS.js" language="javascript"></script>
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
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"> <strong>&nbsp;&nbsp;LTE 용량분석 > LTE QMS 기반 섹터 TP > 국소별 용량</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 1px 10px">

                                        <div name="divSearch" ID="divSearch" class="" style="margin-top:0px;padding:0; vertical-align:middle;">
                                            <input type="hidden" name="WORKGROUP_YN">
                                            <input type="hidden" name="WORKGROUP_ID">
                                            <input type="hidden" name="DUIDs">
                                            <table border="0">
                                                <colgroup>
                                                    <col width="80px">
                                                    <col width="400px">
                                                    <col width="50px">
                                                    <col width="320px">
                                                    <col width="70px">
                                                    <col width="200px">
                                                </colgroup>
                                                <tr>
                                                    <td colspan="2">
                                                        <button class="btn btn-xmini btn-inverse" name="search"><i class="icon-search icon-white"></i>&nbsp;조 회</button>
                                                        <button class="btn btn-xmini btn-inverse" name="excelDownload" id="excelDownload"><i class="icon-file icon-white"></i>&nbsp;엑셀저장</button>
                                                        <span class="dropdown" id="graphDropDown">
                                                            <button class="dropdown-toggle btn btn-xmini" id="drop1" role="button" data-toggle="dropdown" href="#"><i class="icon-plane"></i> 그래프 <b class="caret"></b> </button>
                                                                <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                                    <li name="showThrpGraph"><a href="#">용량그래프</a></li>
                                                                    <li name="showHistogram"><a href="#">HISTOGRAM</a></li>
                                                                    <%--<li name="showCqiModal"><a href="#" role="button" data-toggle="modal" tabindex="-1" >CQI</a></li>--%>
                                                                </ul>
                                                        </span>
                                                        <span class="dropdown" id="excelDropDown">
                                                                <button class="dropdown-toggle btn btn-xmini" id="drop5" role="button" data-toggle="dropdown" href="#"><i class="icon-file"></i> EXCEL <b class="caret"></b> </button>
                                                                <ul class="dropdown-menu" role="menu" aria-labelledby="drop5">
                                                                    <%--<li  name="downCqiExcel"><a tabindex="-1" href="#">CQI(PDF/CDF) Download</a></li>--%>
                                                                </ul>
                                                        </span>
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>기간</b></td>
                                                    <td>
                                                        <input type="text" name="FROMYMD" id="datepicker01">-
                                                        <input type="text" name="TOYMD"   id="datepicker02">
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>주파수</b></td>
                                                    <td style="font-size: 11px;" >
                                                        <input type="radio" name="FREQ_KIND" value="ALL" checked="true"> 전체
                                                        <input type="radio" name="FREQ_KIND" value="800MHZ"> 800 MHz
                                                        <input type="radio" name="FREQ_KIND" value="1.8GHZ"> 1.8 GHz
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 11px;"> <b>조회대상</b> </td>
                                                    <td>
                                                        <input type="text" name="WORKGROUP_NAME" id="WORKGROUP_NAME" style="width:100px;">
                                                        <button class="btn btn-xmini btn-inverse" name="workgroup" id="workgroup"><i class="icon-filter icon-white"></i>&nbsp;WorkGroup</button>
                                                        <button class="btn btn-xmini btn-inverse" name="tempsearch" id="tempsearch"><i class="icon-filter icon-white"></i>&nbsp;임시조회</button>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td style="font-size: 11px;" ><b>보기방식</b></td>
                                                    <td style="font-size: 11px;" >
                                                        <input type="radio" name="VIEWTYPE" value="" checked="true"> 추세
                                                        <input type="radio" name="VIEWTYPE" value="AVG"> 평균
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
<tr style="vertical-align: top; margin: 0px; padding: 0px;">
    <td><!-- top left   -->
        <div name="divTopLeft" id="divTopLeft">
            <table name="tableTopLeft" id="tableTopLeft" class="table table-bordered table-condensed">
                <tbody>
                <tr style="height:25px;" class="info">
                    <td rowspan="3" name="YMD">날짜</td>
                    <td rowspan="3" name="BTS_NM">DU명</td>
                    <td rowspan="3" name="CELL_ID">CELL ID</td>
                    <%--<td rowspan="3" name="MCID">MCID</td>--%>
                    <td rowspan="3" name="FREQ_KIND">주파수구분</td>
                    <td name="GRAPH"><i class="icon-signal"></i></td>
                </tr>
                <tr style="height:25px;" class="info">
                    <td rowspan="2"><input type="checkbox" name="checkAll"/></td>
                </tr>
                <tr style="height:27px;" class="info"></tr>
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
                    <!-- col class="col01">
                    <col class="col01" 전송로-->
                </colgroup>
                <tbody>
                <tr style="height:23px;" class="info">
                    <td rowspan="3">DL<br>Throughput<br>(Mbps)</td>
                    <td rowspan="3">UL<br>Throughput<br>(Mbps)</td>
                    <td rowspan="3">CQI 평균</td>
                    <td rowspan="3">RI2 비율</td>
                    <td rowspan="3">MCS 평균</td>
                    <td rowspan="3">RSRP 평균</td>
                    <td rowspan="3">RSSI 평균</td>
                    <td rowspan="3">SINR 평균</td>
                    <td rowspan="3">RSRQ 평균</td>
                    <td rowspan="3">PUCCH Tx<br>평균</td>
                    <td rowspan="3">CQI0 비율</td>
                    <td rowspan="3">DL PRB<br>사용율(%)</td>
                    <td colspan="4">RSSI</td>
                    <td rowspan="3">License<br>초과<br>실패호</td>
                    <!-- td colspan="2">전송로</td -->
                </tr>
                <tr style="height:23px;" class="info">
                    <td colspan="2">Total(PUCCH)</td>
                    <td colspan="2">Total(PUSCH)</td>
                    <!-- td rowspan="2">종류</td>
                    <td rowspan="2">갯수</td -->
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


<tr style="vertical-align: top; margin: 0px; padding: 0px;">
    <td><!-- middle left   -->
        <div name="divMiddleLeft" id="divMiddleLeft">
            <table name="tableMiddleLeft"  id="tableMiddleLeft" class="table table-bordered table-condensed table-striped">
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
                    <!-- col class="col01">
                    <col class="col01" 전송로-->
                </colgroup>
                <tbody>

                </tbody>
            </table>
        </div>
    </td>
</tr>

<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- bottom left   -->
        <div name="divBottomLeft" id="divBottomLeft">
            <table name="tableBottomLeft" id="tableBottomLeft" class="table table-bordered table-condensed table-striped">
                <tbody>
                <tr class="info">
                    <td name="YMD"></td>
                    <td name="BTS_NM">전체평균</td>
                    <td name="CELL_ID"></td>
                    <%--<td name="MCID"></td>--%>
                    <td name="FREQ_KIND"></td>
                    <td name="GRAPH"></td>
                </tr>
                <tr class="info">
                    <td></td>
                    <td>최대값</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <%--<td></td>--%>
                </tr>
                <tr class="info">
                    <td></td>
                    <td>최소값</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <%--<td></td>--%>
                </tr>
                <tr class="info">
                    <td></td>
                    <td>표준편차</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <%--<td></td>--%>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
    <td><!--  top right   -->
        <div class="" name="divBottomRight" id="divBottomRight" onscroll="javascript:scrollX();">
            <table name="tableBottomRight" id="tableBottomRight" class="table table-bordered table-condensed table-striped">
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
                    <!-- col class="col01">
                    <col class="col01" 전송로-->
                </colgroup>
                <tbody>
                <tr class='info' style="height:25px;">
                    <td>&nbsp;</td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><!-- td></td 전송로-->
                </tr>
                <tr  class='info'>
                    <td>&nbsp;</td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><!-- td></td 전송로-->
                </tr>
                <tr  class='info'>
                    <td>&nbsp;</td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><!-- td></td 전송로-->
                </tr>
                <tr  class='info'>
                    <td>&nbsp;</td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><!-- td></td 전송로-->
                </tr>
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
        <button type="button" class="btn btn-mini pull-left" name="excelDownload"><i class="icon-download"></i> EXCEL Down </button>
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
