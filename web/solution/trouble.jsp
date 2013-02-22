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
    <script src="/adcaslte/common/js/jquery.paging.js"></script>

    <script src="/adcaslte/common/js/jquery.checkIEversion.js"></script>

    <link href="trouble.css" rel="stylesheet">
    <script src="trouble.js" language="javascript"></script>
    <script src="common.js" language="javascript"></script>
</head>
<body>

<div id="wrap">
    <div id="web_container">
        <div id="header">
            <div id="popup_title" style="vertical-align: top;margin-left:20px;padding-top: 0px;">
                <img src="/adcaslte/common/bootstrap/img/logoSmall.png" style="vertical-align: top;">
            </div>
            <div id="popup_desc">LTE 솔루션 > 관심국소분석 > Trouble국소조회</div>
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
                            <table width="880" height="50" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding:0px;border-bottom:2px #ff713a solid;height:10px;" valign="bottom" align="left">
                                        <img src="/adcaslte/common/bootstrap/img/bullet_1.png" border="0" align="absmiddle"> SEARCH
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:10px;padding-right:10px;padding-bottom:1px;">
                                        <div name="divSearch" ID="divSearch" class="" style="margin-top:0px;padding:0; vertical-align:middle;">
                                            <table border="0">
                                                <colgroup>
                                                    <col width="200px">
                                                    <col width="50px">
                                                    <col width="130px">
                                                    <col width="50px">
                                                    <col width="170px">
                                                    <col width="50px">
                                                    <col width="170px">
                                                </colgroup>
                                                <tr>
                                                    <td>
                                                        <button class="btn btn-xmini btn-inverse" name="search"><i class="icon-search icon-white"></i>&nbsp;조 회</button>
                                                        <button class="btn btn-xmini btn-inverse" name="workgroup" id="workgroup"><i class="icon-filter icon-white"></i>&nbsp;국소설정</button>
                                                    </td>
                                                    <td style="font-size: 11px;"><b>일자</b></td>
                                                    <td style="font-size: 11px;">
                                                        <input name="YMD" id="datepicker01" style="text-align: center;padding:0px; margin: 0px; width:80px; height:18px;font-size:11px;" type="text">
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>시간대</b></td>
                                                    <td>
                                                        <input type="radio" name="DAYTIME_SEQ" value="1" checked="true">전일(全日)
                                                        <input type="radio" name="DAYTIME_SEQ" value="2">09~20시
                                                    </td>
                                                    <td style="font-size: 11px;" ><b>최번기준</b></td>
                                                    <td style="font-size: 11px;" >
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

<div style="width:900px; height:490px;">
    <div style="height:450px; margin:5px;">
        <table id="troubleListTable" class="table table-bordered table-hover table-condensed table-striped">
            <colgroup>
                <col width="100px;">
                <col width="230px;">
                <col width="70px;">
                <col width="70px;">
                <col width="70px;">
                <col width="120px;">
                <col width="120px;">
                <col width="120px;">
            </colgroup>
            <thead>
            <tr class="info">
                <td style="text-align:center; background-color: #FFEDCA;">일자</td>
                <td style="text-align:center; background-color: #FFEDCA;">DU명</td>
                <td style="text-align:center; background-color: #FFEDCA;">CELL ID</td>
                <td style="text-align:center; background-color: #FFEDCA;">MCID</td>
                <td style="text-align:center; background-color: #FFEDCA;">주파수</td>
                <td style="text-align:center; background-color: #FFEDCA;" id="THROUGHPUT">용량(Mbps)</td>
                <td style="text-align:center; background-color: #FFEDCA;" id="DL_PRB_RATE">PRB사용률</td>
                <td style="text-align:center; background-color: #FFEDCA;" id="RSSI">RSSI</td>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div class="pagination pagination-centered">
    </div>
</div>

</body>
</html>