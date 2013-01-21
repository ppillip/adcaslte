$(document).ready(function(){

    var USE_TYPE = window.name;

    if(!USE_TYPE) USE_TYPE = 'ADMIN';

    if (USE_TYPE === 'USER') {
        $("#popup_desc").text("LTE 용량분석 > 사용자 환경변수 > 임계치 설정");
    } else if (USE_TYPE === 'ADMIN') {
        $("#popup_desc").text("LTE 용량분석 > 관리자 환경변수 > 임계치 설정");
    }

    jQuery.post("/adcaslte/svc/Environment-selectCriticalValue",{USE_TYPE:USE_TYPE},function(result,stat){

        var $tbody = $("#criticalValueTable").find("tbody");

        $tbody.find("tr").remove();
//         ＜ ＞≤ ≥
        $(result.rows).each(function(idx,row){
            $("<tr>"
                +"<td class='tdCenter'>DL 용량 (RRU)</td>"
                +"<td class='tdCenter'>"
                +"<div style='float:left; width:35px;'>&nbsp;</div>"
                +"<div style='float:left; width:25px; height:25px; background-color: red;'></div>"
                +"<div style='float:left; width:20px;'> < </div>"
                +"<div style='float:left;'><input type='text' name='DL_RRU_VAL1' value='"+row.DL_RRU_VAL1+"'></div>"
                +"<div style='float:left; width:20px;'> ≤ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: yellow;'></div>"
                +"<div style='float:left; width:20px;'> < </div>"
                +"<div style='float:left;'><input type='text' name='DL_RRU_VAL2' value='"+row.DL_RRU_VAL2+"'></div>"
                +"<div style='float:left; width:20px;'> ≤ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: green;'></div>"
                +"</td>"
                +"<td class='tdCenter'>"+row.DL_RRU_UNIT+"</td>"
                +"</tr>"
                +"<tr>"
                +"<td class='tdCenter'>DL 용량 (중계기)</td>"
                +"<td class='tdCenter'>"
                +"<div style='float:left; width:35px;'>&nbsp;</div>"
                +"<div style='float:left; width:25px; height:25px; background-color: red;'></div>"
                +"<div style='float:left; width:20px;'> < </div>"
                +"<div style='float:left;'><input type='text' name='DL_REPEATER_VAL1' value='"+row.DL_REPEATER_VAL1+"'></div>"
                +"<div style='float:left; width:20px;'> ≤ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: yellow;'></div>"
                +"<div style='float:left; width:20px;'> < </div>"
                +"<div style='float:left;'><input type='text' name='DL_REPEATER_VAL2' value='"+row.DL_REPEATER_VAL2+"'></div>"
                +"<div style='float:left; width:20px;'> ≤ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: green;'></div>"
                +"</td>"
                +"<td class='tdCenter'>"+row.DL_REPEATER_UNIT+"</td>"
                +"</tr>"
                +"<tr>"
                +"<td class='tdCenter'>PRB 사용률</td>"
                +"<td class='tdCenter'>"
                +"<div style='float:left; width:35px;'>&nbsp;</div>"
                +"<div style='float:left; width:25px; height:25px; background-color: red;'></div>"
                +"<div style='float:left; width:20px;'> > </div>"
                +"<div style='float:left;'><input type='text' name='PRB_USG_VAL1' value='"+row.PRB_USG_VAL1+"'></div>"
                +"<div style='float:left; width:20px;'> ≥ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: yellow;'></div>"
                +"<div style='float:left; width:20px;'> > </div>"
                +"<div style='float:left;'><input type='text' name='PRB_USG_VAL2' value='"+row.PRB_USG_VAL2+"'></div>"
                +"<div style='float:left; width:20px;'> ≥ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: green;'></div>"
                +"</td>"
                +"<td class='tdCenter'>"+row.PRB_USG_UNIT+"</td>"
                +"</tr>"
                +"<tr>"
                +"<td class='tdCenter'>UL Interference<br>Power</td>"
                +"<td class='tdCenter'>"
                +"<div style='float:left; width:35px;'>&nbsp;</div>"
                +"<div style='float:left; width:25px; height:25px; background-color: red;'></div>"
                +"<div style='float:left; width:20px;'> > </div>"
                +"<div style='float:left;'><input type='text' name='UL_POWER_VAL1' value='"+row.UL_POWER_VAL1+"'></div>"
                +"<div style='float:left; width:20px;'> ≥ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: yellow;'></div>"
                +"<div style='float:left; width:20px;'> > </div>"
                +"<div style='float:left;'><input type='text' name='UL_POWER_VAL2' value='"+row.UL_POWER_VAL2+"'></div>"
                +"<div style='float:left; width:20px;'> ≥ </div>"
                +"<div style='float:left; width:25px; height:25px; background-color: green;'></div>"
                +"</td>"
                //+"<td class='tdCenter'>"+row.UL_POWER_UNIT+"</td>"
                +"<td class='tdCenter'></td>"
                +"</tr>")
                .appendTo($tbody);

        });

    },"json");

    $("#modifyBtn").click(function (event) {
        event.preventDefault();
        saveCriticalValue(USE_TYPE);
    })

});

/*===============================================================================
 * CQI THRP 저장
 *
 *==============================================================================*/
function saveCriticalValue(USE_TYPE) {

    var param = {};

    $("#criticalValueTable input[type=text]").each(function(idx,obj){
        param[$(obj).attr("name") ] = $(obj).val();
    });
    param['USE_TYPE'] = USE_TYPE;

    jQuery.post("/adcaslte/svc/Environment-updateCriticalValue",param,function(result,stat){

        if (result.status == "SUCCESS") {
            alert('성공적으로 수정되었습니다.');
        }

    },"json");

}