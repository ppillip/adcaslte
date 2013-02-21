(function($) {

    //메뉴 호출하기
    $.extend({
        openMenu : function(target,size,name) {

            if(target === '/temp') return;

            var width  = '1280';
            var height = '700';
            if(size) {
                width  = size.split('-')[0];
                height = size.split('-')[1];
            }
            var windowName = '';
            if(name) {
                windowName = name;
            }

            if (target.indexOf('/adcas/') != -1) {
                window.open(target,windowName,'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width='+width+',height='+height);
            } else if (target.indexOf('/adcaslte/') != -1) {
                window.open(target,windowName,'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width='+width+',height='+height);
            } else {
                window.open(target,windowName,'scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width='+width+',height='+height);
            }
        }
    });

    $.fn.quickMenuForLTE = function() {

        var $this = $(this);

        var setQuickMenu = function () {
            var quickMenu =
            "<div style=\"float:left;\">" +
                "<div style=\"margin:10px 15px; color:white; font-size:15px; font-weight:bold\">" +
                    "<i class=\"icon-list icon-white\"></i><span style=\"margin-left:5px;\">LTE 용량 분석</span>" +
                "</div>";
            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">LTE NMS 기반 섹터 TP</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMS.jsp','1280-700')\">DownLink</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMSStats.jsp','1280-700')\">DownLink 통계</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMSComp.jsp','1280-700')\">DownLink 전후비교</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMSStatsComp.jsp','1280-700')\">DownLink 통계 전후비교</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";

            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">LTE QMS 기반 섹터 TP</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkByQMS/downLinkByQMS.jsp','1280-700')\">국소별 용량</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkByQMS/downLinkByQMSStats.jsp','1280-700')\">통계단위별 용량</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";

            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">LTE 기준 용량분석</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTD.jsp','1280-700')\">DownLink</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTDStats.jsp','1280-700')\">DownLink 통계</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTDComp.jsp','1280-700')\">DownLink 전후비교</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTDStatsComp.jsp','1280-700')\">DownLink 통계 전후비교</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";

            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">MAP</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('http://150.23.13.142/ciss_2012/map/qcasMap.php','1280-700')\">MAP</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";

            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">관리자 환경변수</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/constCqiThrp.jsp','1010-500')\">CQI vs Throughput Table</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/constUplinkRsrp.jsp','550-630')\">RSRP vs Throughput Table</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/constTable.jsp','550-500')\">DownLink 사용환경 비율</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/constUplink.jsp','550-500')\">UpLink 사용환경 비율</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/criticalValue.jsp','520-500','ADMIN')\">임계값 설정</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/constRssi.jsp','1010-500')\">UL Interference 평균값</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";

            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">사용자 환경변수</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/workgroup/workgroup.jsp','860-700')\">WorkGroup 관리</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/adcaslte/environment/criticalValue.jsp','520-500','USER')\">임계값 설정</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";

            quickMenu = quickMenu +
                "<div style=\"float:left; margin:6px;\">" +
                    "<dl>" +
                        "<dt style=\"color:white\">도움말</dt>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/temp')\">도움말 보기</span></dd>" +
                        "<dd><i class=\"icon-minus icon-white\"></i><span style=\"margin-left:5px; color:white; cursor:pointer\" onClick=\"$.openMenu('/temp','USER')\">Download</span></dd>" +
                    "</dl>" +
                "</div>" +
                "<div style=\"float:left; margin:6px;\">" +
                    "<img src=\"/adcaslte/common/img/verticalLine.jpg\" style=\"width:1px; height:250px;\">" +
                "</div>";


            quickMenu = quickMenu + "</div>";

            $this.prepend(quickMenu);
        }

        setQuickMenu();

    };

    $.fn.qcasMenu = function() {

        var $this = $(this);

        var setQcasMenu = function () {
            var i = 1;
            var j = 1;
            var qcasMenu = "";
            qcasMenu = qcasMenu +
            "<div class='menu_box'>" +
                "<div class='menu_box_top' id='"+i+"'>LTE 용량 분석" +
                    "<div class='arrow2'><img src='/adcaslte/common/bootstrap/img/main_plus_active.jpg'></div>" +
                "</div>" +
                "<div class='menu_box_bottom' id='menu_"+i+"'>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>LTE NMS 기반 섹터 TP" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMS.jsp','1280-700')\">DownLink</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMSStats.jsp','1280-700')\">DownLink 통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMSComp.jsp','1280-700')\">DownLink 전후비교</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkByNMS/downLinkByNMSStatsComp.jsp','1280-700')\">DownLink 통계 전후비교</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>LTE QMS 기반 섹터 TP" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkByQMS/downLinkByQMS.jsp','1280-700')\">국소별 용량</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkByQMS/downLinkByQMSStats.jsp','1280-700')\">통계단위별 용량</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>LTE 기준 용량분석" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTD.jsp','1280-700')\">DownLink</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTDStats.jsp','1280-700')\">DownLink 통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTDComp.jsp','1280-700')\">DownLink 전후비교</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/downLinkBySTD/downLinkBySTDStatsComp.jsp','1280-700')\">DownLink 통계 전후비교</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>MAP" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('http://150.23.13.142/ciss_2012/map/qcasMap.php','1280-700')\">MAP</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>관리자 환경변수" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/constCqiThrp.jsp','1010-500')\">CQI vs Throughput Table</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/constUplinkRsrp.jsp','550-630')\">RSRP vs Throughput Table</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/constTable.jsp','550-500')\">DownLink 사용환경 비율</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/constUplink.jsp','550-500')\">UpLink 사용환경 비율</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/criticalValue.jsp','520-500','ADMIN')\">임계값 설정</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/constRssi.jsp','1010-500')\">UL Interference 평균값</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>사용자 환경변수" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/workgroup/workgroup.jsp','860-700')\">WorkGroup 관리</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/environment/criticalValue.jsp','520-500','USER')\">임계값 설정</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>도움말" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/temp')\">도움말 보기</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/temp')\">Download</span></li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>";
            i++;
            j = 1;
            qcasMenu = qcasMenu +
            "<div class='menu_box'>" +
                "<div class='menu_box_top' id='"+i+"'>LTE 솔루션" +
                    "<div class='arrow2'><img src='/adcaslte/common/bootstrap/img/main_plus_active.jpg'></div>" +
                "</div>" +
                "<div class='menu_box_bottom' id='menu_"+i+"'>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>관심국소분석" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/solution/interest.jsp','900-700')\">관심국소조회</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcaslte/solution/trouble.jsp','900-700')\">Trouble국소조회</span></li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>";
            i++;
            j = 1;
            qcasMenu = qcasMenu +
            "<div class='menu_box'>" +
                "<div class='menu_box_top' id='"+i+"'>WCDMA 용량분석" +
                    "<div class='arrow2'><img src='/adcaslte/common/bootstrap/img/main_plus_active.jpg'></div>" +
                "</div>" +
                "<div class='menu_box_bottom' id='menu_"+i+"'>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>NMS기반 섹터 TP" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/nmsmx/main.jsp','1280-1024')\">DownLink</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/dnNmsAddr/main.jsp','1280-1024')\">DownLink 통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/qcenterup/main.jsp','1280-1024')\">UpLink</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/upQcenterAddr/main.jsp','1280-1024')\">UpLink통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/nmsmxCompare/main.jsp','1280-1024')\">DownLink 전후비교</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/dnNmsAddrCompare/main.jsp','1280-1024')\">DownLink통계 전후비교</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/qcenterupCompare/main.jsp','1280-1024')\">UpLink 전후비교</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/upQcenterAddrCompare/main.jsp','1280-1024')\">UpLink통계 전후비교</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>QMS기반 섹터 TP" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/nodebmx/main.jsp','1280-1024')\">DownLink</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/dnQmsAddr/main.jsp','1280-1024')\">DownLink통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/nodebup/main.jsp','1280-1024')\">UpLink</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/upQmsAddr/main.jsp','1280-1024')\">UpLink통계</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>기준용량분석" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/downlinkcap/main.jsp','1280-1024')\">DownLink 기준 용량분석</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/stdDownlinkcapstats/main.jsp','1280-1024')\">DownLink 기준 용량분석 통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/uplinkcap/main.jsp','1280-1024')\">UpLink 분기 용량분석</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/stuNmsAddr/main.jsp','1280-1024')\">UpLink 분기 용량분석 통계</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/downlinkcapCompare/main.jsp','1280-1024')\">DownLink 기준 전후비교</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/stdDownlinkcapstatsCompare/main.jsp','1280-1024')\">DownLink 기준 통계 전후비교</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>MAP" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/ah03/ah03_010.jsp?NET_TYPE=2','1280-1024')\">MAP</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>관리자 환경변수" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/citycat/main.jsp','1000-600')\">지역별 단말 Category 비율</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/poission/main.jsp','650-700')\">POISSION 임계치</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/cqimpornc/main.jsp','650-700')\">RNC Measurement power offset</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/stdthrp/main.jsp','650-700')\">기준 용량 downlink 임계치 설정</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/stdupthrp/main.jsp','650-700')\">분기 용량 uplink 임계치 설정</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/adjcell/main.jsp','650-700')\">인접셀 loading 용량감소율 설정</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/loading/main.jsp','650-700')\">DOWNLINK LOADING 환산계수</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/voicevar/main.jsp','650-700')\">DOWNLINK 음성환산계수</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/ah04/ah04_010.jsp','650-700')\">CQI vs Throughput Table</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/rscptable/main.jsp','650-700')\">RSCP vs Throughput Table</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/multicellcoe/main.jsp','650-700')\">UPLINK 멀티셀계수</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/uloading/main.jsp','650-700')\">UPLINK LOADING 환산계수</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/uvoicevar/main.jsp','650-700')\">UPLINK 음성환산계수</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/imtable/main.jsp','650-700')\">HSUPA Input Mapping Table 보정계수</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>사용자 환경변수" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/ah05/ah05_110.jsp?NET_TYPE=2','1000-700')\">WorkGroup 관리</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/criticalValue/main.jsp','650-700')\">임계값 설정</span></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>도움말" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/helpReading/main.html','1280-1024')\">도움말 보기</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/adcas/download.jsp?file=adcas_help_ver3.0.zip')\">Download</span></li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>";
            i++;
            j = 1;
            qcasMenu = qcasMenu +
            "<div class='menu_box'>" +
                "<div class='menu_box_top' id='"+i+"'>WCDMA 솔루션" +
                    "<div class='arrow2'><img src='/adcaslte/common/bootstrap/img/main_plus_active.jpg'></div>" +
                "</div>" +
                "<div class='menu_box_bottom' id='menu_"+i+"'>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>솔루션 시스템" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                    "<ul>" +
                        "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/di2/speedFallWg/soldecCapFrame.jsp?NET_TYPE=02','880-650')\">용량저하국소검출</span></li>" +
                        "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/di2/speedFallWg/soldecSpdFrame.jsp?NET_TYPE=02','880-650')\">속도저하국소검출</span></li>" +
                        "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/di2/speedFallWg/soldecResFrame.jsp?NET_TYPE=02','880-650')\">자원부족국소검출</span></li>" +
                    "</ul>" +
                    "</div>" +
                    "<div class='menu1 depth_1' id='"+i+j+"'>관심국소분석" +
                        "<div class='arrow'><img src='/adcaslte/common/bootstrap/img/sub_plus_active.jpg'></div>" +
                    "</div>" +
                    "<div class='depth_2' id='menu_"+i+(j++)+"'>" +
                        "<ul>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/di2/cellReq/selectBtsFrame.jsp?net=2','880-650')\">관심국소조회</span></li>" +
                            "<li>·<span style='cursor:pointer; margin-left:5px;' onClick=\"$.openMenu('/di2/cellReq/selectBtsTTFrame.jsp?net=1','880-650')\">Trouble국소조회</span></li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>";

            $this.prepend(qcasMenu);
        }

        setQcasMenu();
    };

})(jQuery);