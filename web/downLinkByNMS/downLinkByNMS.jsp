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

    <script src="/adcaslte/common/js/jquery.progress.js"></script>
    <script src="/adcaslte/common/js/jquery.checkIEversion.js"></script>

    <link href="downLinkByNMS.css" rel="stylesheet">
    <script src="downLinkByNMS.js" language="javascript"></script>

    <script>
        $(document).ready(function () {
            $('#quickmenu_trigger').toggle(function() {
                $('#quickmenu_container').show();
            }, function() {
                $('#quickmenu_container').hide();
            });
        });

        function close_quickmenu() {
            $('#quickmenu_container').hide();
        }
    </script>

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
            <div id="popup_title"  style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 용량분석 > NMS 기반 섹터 TP > DownLink</div>
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
                                    <td style="padding-left:10px;padding-right:10px;padding-bottom:1px;">

                                        <div name="divSearch" ID="divSearch" class="" style="margin-top:0px;padding:0; vertical-align:middle;">
                                            <table border="0">
                                                <tr>
                                                    <td colspan="2">
                                                        <button class="btn btn-xmini btn-inverse" name="search"><i class="icon-search icon-white"></i>&nbsp;조 회</button>
                                                        <button class="btn btn-xmini btn-inverse" name="excelDownload" id="excelDownload"><i class="icon-file icon-white"></i>&nbsp;엑셀저장</button>
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
                                                    <td style="font-size: 11px;" width="50px;"><b>제조사</b></td>
                                                    <td style="font-size: 11px;" width="320px;">
                                                        <input type="radio" name="MFC_CD" value="MFC00001" checked="true"> SS
                                                        <input type="radio" name="MFC_CD" value="MFC00002"> ELG
                                                        <input type="radio" name="MFC_CD" value="MFC00014"> NSN
                                                    </td>
                                                    <td style="font-size: 11px;" width="70px;"><b>통계주기</b></td>
                                                    <td style="font-size: 11px;" width="200px;">
                                                        <input type="radio" name="TERMTYPE" value="DAY" checked="true">일간
                                                        <input type="text" name="WORKGROUP_YN" style="text-align: center;padding:0 0 0 0; margin: 0 0 0 0; width:20px; height:18px;font-size:11px;">
                                                        <input type="text" name="WORKGROUP_ID" style="text-align: center;padding:0 0 0 0; margin: 0 0 0 0; width:100px; height:18px;font-size:11px;">
                                                        <input type="text" name="DUIDs" style="text-align: center;padding:0 0 0 0; margin: 0 0 0 0; width:100px; height:18px;font-size:11px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 11px;" width="80px;"> <b>조회대상</b> </td>
                                                    <td width="400px;">
                                                        <input type="text" name="WORKGROUP_NAME" style="text-align: center;padding:0 0 0 0; margin: 0 0 0 0; width:100px; height:18px;font-size:11px;">
                                                        <button class="btn btn-xmini btn-inverse" name="workgroup" id="workgroup"><i class="icon-filter icon-white"></i>&nbsp;WorkGroup</button>
                                                        <button class="btn btn-xmini btn-inverse" name="tempsearch" id="tempsearch"><i class="icon-filter icon-white"></i>&nbsp;임시조회</button>
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>시간대</b></td>
                                                    <td>
                                                        <input type="radio" name="DAYTIME_SEQ" value="1" checked="true">전일(全日)
                                                        <input type="radio" name="DAYTIME_SEQ" value="2">09~20시
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>최번기준</b></td>
                                                    <td style="font-size: 11px;" >
                                                        <select name="MBTYPE" style="height:24px; width:140px;font-size:11px;margin: 0 0 0 0;">
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
                                                    <td style="font-size: 11px;" ><b>기간</b></td>
                                                    <td>
                                                        <input style="text-align: center;padding:0 0 0 0; margin: 0 0 0 0; width:100px; height:18px;font-size:11px;" type="text" name="FROMYMD" id="datepicker01"/>-
                                                        <input style="text-align: center;padding:0 0 0 0; margin: 0 0 0 0; width:100px; height:18px;font-size:11px;" type="text"  name="TOYMD" id="datepicker02"/>
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>주파수</b></td>
                                                    <td style="font-size: 11px;" >
                                                        <input type="radio" name="FREQ_KIND" value="ALL" checked="true"> 전체
                                                        <input type="radio" name="FREQ_KIND" value="800MHz"> 800 MHz
                                                        <input type="radio" name="FREQ_KIND" value="1.8GHz"> 1.8 GHz
                                                    </td>
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
<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- top left   -->
        <div class="" name="divTopLeft" id="divTopLeft">
            <table name="tableTopLeft" id="tableTopLeft" class="table table-bordered table-condensed">
                <tbody>
                <tr style="height:30px;" class="info">
                    <td rowspan="3" name="YMD">날짜</td>
                    <td rowspan="3" name="MB_TIME">최번시간</td>
                    <td rowspan="3" name="BTS_NM">DU명</td>
                    <td rowspan="3" name="CELL_ID">CELL ID</td>
                    <td rowspan="3" name="MCID">MCID</td>
                    <td rowspan="3" name="FREQ_KIND">주파수구분</td>
                    <td name="GRAPH">GRAPH</td>
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
                    <col class="col01">
                </colgroup>
                <tbody>
                <tr style="height:30px;" class="info">
                    <td rowspan="3">MIMO 구분</td>
                    <td rowspan="3" name="so">용량(Mbps)</td>
                    <td rowspan="3">CQI 평균</td>
                    <td rowspan="3"><span id="cqi0_rate_text">CQI0</span><br/>비율(%)</td>
                    <td rowspan="3">RI2 비율<br/>(%)</td>
                    <td rowspan="3">DL PRB<br/>사용률(%)</td>

                    <td class='mnf MFC00001' rowspan="3">MCS평균</td>
                    <td class='mnf MFC00001' rowspan="2" colspan="2">RSSI (dBm)</td>
                    <td class='mnf MFC00002' style="display:none;" rowspan="3">OL MIMO <br>비율(%)</td>
                    <td class='mnf MFC00002' style="display:none;" rowspan="3">DL <br/>Throughput<br/>(kbps)</td>
                    <td class='mnf MFC00002' style="display:none;" rowspan="3">License<br/>초과<br>실패호</td>
                    <td class='mnf MFC00014' style="display:none;" rowspan="3">OL MIMO <br>비율(%)</td>
                    <td class='mnf MFC00014' style="display:none;" rowspan="3">MCS0 <br>비율(%)</td>
                    <td class='mnf MFC00002 MFC00014' style="display:none;" colspan="4">RSSI</td>

                    <td colspan="8">데이터</td>
                    <td colspan="4">HD Voice</td>
                    <td colspan="4">영상통화</td>

                    <td colspan="2">전송로</td>

                </tr>
                <tr style="height:30px;" class="info">
                    <td class='mnf MFC00002 MFC00014' style="display:none;" colspan="2">PUCCH</td>
                    <td class='mnf MFC00002 MFC00014' style="display:none;" colspan="2">PUSCH</td>

                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB사용률<br/>(%)</td>
                    <td rowspan="2">DRB사용률<br/>(%)</td>
                    <td rowspan="2">동접자<br/>(Erl)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">접속률<br/>(%)</td>
                    <td rowspan="2">CD율<br/>(%)</td>
                    <td rowspan="2">FA사용률<br/>(%)</td>
                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB사용률<br/>(%)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">점유시간</td>
                    <td rowspan="2">트래픽<br/>(MB)</td>
                    <td rowspan="2">PRB사용률<br/>(%)</td>
                    <td rowspan="2">시도호수</td>
                    <td rowspan="2">점유시간</td>

                    <td rowspan="2">종류</td>
                    <td rowspan="2">갯수</td>
                </tr>
                <tr style="height:30px;" class="info">
                    <td class='mnf MFC00001'>최번시</td>
                    <td class='mnf MFC00001'>최한시</td>
                    <td class='mnf MFC00002 MFC00014' style="display:none;" >최번시</td>
                    <td class='mnf MFC00002 MFC00014' style="display:none;" >최한시</td>
                    <td class='mnf MFC00002 MFC00014' style="display:none;" >최번시</td>
                    <td class='mnf MFC00002 MFC00014' style="display:none;" >최한시</td>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
</tr>


<tr style="vertical-align: top; margin: 0 0 0 0; padding: 0 0 0 0;">
    <td><!-- middle left   -->
        <div class="" name="divMiddleLeft" id="divMiddleLeft">
            <table name="tableMiddleLeft"  id="tableMiddleLeft" class="table table-bordered table-condensed table-striped">
                <colgroup>
                    <col class="col01">
                    <col class="col02">
                    <col class="col03">
                    <col class="col04">
                    <col class="col05">
                    <col class="col06">
                    <col class="col07">
                    <col class="col08">
                </colgroup>
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
        <div name="divBottomLeft" id="divBottomLeft">
            <table name="tableBottomLeft" id="tableBottomLeft" class="table table-bordered table-condensed table-striped">
                <tbody>
                <tr class="info">
                    <td name="YMD"></td>
                    <td name="MB_TIME"></td>
                    <td name="BTS_NM">전체평균</td>
                    <td name="CELL_ID"></td>
                    <td name="MCID"></td>
                    <td name="FREQ_KIND"></td>
                    <td name="GRAPH"></td>
                </tr>
                <tr class="info">
                    <td></td>
                    <td></td>
                    <td>최대값</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="info">
                    <td></td>
                    <td></td>
                    <td>최소값</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="info">
                    <td></td>
                    <td></td>
                    <td>표준편차</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
                <tr class='info'>
                    <!-- 고정 -->
                    <td>&nbsp;</td><td/><td/><td/><td/><td/>
                    <!-- 제조사별 -->
                    <td class='mnf MFC00001'/><td class='mnf MFC00001'/><td class='mnf MFC00001'/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 시작 -->
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 끝  -->
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/>
                    <!-- 뒤쪽 고정 -->
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/>
                </tr>
                <tr class='info'>
                    <!-- 고정 -->
                    <td>&nbsp;</td><td/><td/><td/><td/><td/>
                    <!-- 제조사별 -->
                    <td class='mnf MFC00001'/><td class='mnf MFC00001'/><td class='mnf MFC00001'/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 시작 -->
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 끝  -->
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/>
                    <!-- 뒤쪽 고정 -->
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/>
                </tr>
                <tr class='info'>
                    <td>&nbsp;</td><td/><td/><td/><td/><td/>
                    <td class='mnf MFC00001'/><td class='mnf MFC00001'/><td class='mnf MFC00001'/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 시작 -->
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 끝  -->
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/>
                </tr>
                <tr class='info'>
                    <td>&nbsp;</td><td/><td/><td/><td/><td/>
                    <td class='mnf MFC00001'/><td class='mnf MFC00001'/><td class='mnf MFC00001'/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 시작 -->
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>
                    <td class='mnf MFC00002 MFC00014' style="display:none;"/>    <!-- RSSI 4개 끝  -->
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/><td class='mnf MFC00014' style="display:none;"/>
                    <td class='mnf MFC00014' style="display:none;"/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/><td/><td/>
                    <td/><td/><td/>
                </tr>
                </tbody>
            </table>
        </div>
    </td>
</tr>

</table>

</div>
<script src="/adcaslte/common/highchart/js/highcharts.js"></script>
<script src="/adcaslte/common/highchart/js/modules/exporting.js"></script>

<!-- Modal -->
<div id="cqiModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cqiModalLabel" aria-hidden="true"
     style="width: 800px; postion:absolute; top:260px; left:300px;">
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
<!-- 교정이 시급합니다. -->
</body>
</html>
