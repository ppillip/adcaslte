package com.skt.adcas.lte.action;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;

import java.io.*;
import java.lang.reflect.Type;
import java.util.*;

public class CSVDownloadAction extends ActionSupport4lte implements ResultHandler {

    private static final long serialVersionUID = 1L;
    private BufferedWriter fileOut;
    private String fileType;

    /* 기본 셋업 시작*/
    public List<HashMap> getRows() {return rows;}
    public List<HashMap> getSTATS() {return STATS;}
    public String getMsg() {return msg;}
    public String getStatus() {return status;}
    public Boolean getError() {return error;}
    public String getDownloadurl() {return downloadurl;}
    private List<HashMap> rows = null;
    private List<HashMap> STATS = null;
    private String msg = null;
    private String status = null;
    private Boolean error = false;
    private HashMap<String,Object> param = new HashMap<String, Object>();
    private String downloadurl = "";

    /* 기본 셋업 끝*/


    public void setJSONDATA(String JSONDATA) {
        this.JSONDATA = JSONDATA;
    }

    private String JSONDATA       = "";

    public void handleResult(ResultContext context) {

        if(this.param.get("SEARCHTYPE").equals("EMS")){
            this.writeEMSLine(context);
        }else if(this.param.get("SEARCHTYPE").equals("PART")){
            this.writeEMSLine(context);
        }else if(this.param.get("SEARCHTYPE").equals("UNI")){
            this.writeEMSLine(context);
        }

    }
    public static String nvl(Object obj,String str){
        if(obj==null) return str;
        else return obj.toString();
    }

    private void writeEMSLine(ResultContext context) {
        HashMap map = (HashMap) context.getResultObject();
        String txt = "";
        String txt2 = "\n";
        try {
            txt = (String)  map.get("YMD")                              //날짜
                          + "," + nvl(map.get("MB_TIME")       ,"")   //최번시간
                          + "," + nvl(map.get("INGR_ERP_CD")  ,"")   //ERP 코드
                          + "," + nvl(map.get("C_UID")         ,"")   //C_UID
                          + "," + nvl(map.get("MFC_CD")         ,"")  //제조사코드
                          + "," + nvl(map.get("BTS_NM")        ,"")   //DU 명
                          + "," + nvl(map.get("CELL_ID")       ,"")   //CELL_ID
                          + "," + nvl(map.get("CELL_NM")       ,"")   //CELL 명
                          + "," + (nvl(map.get("MCID"),"").equals("T")?"":nvl(map.get("MCID"),""))   // MCID
                          + "," + nvl(map.get("UNI")     ,"")          // 시/군/구
                          + "," + nvl(map.get("FREQ_KIND")     ,"")  // 주파수구분
                          + "," + nvl(map.get("MIMO_TYPE")     ,"")  // MIMO 구분
                          + "," + nvl(map.get("THROUGHPUT")    ,"")  // 용량(Mbps)
                          + "," + nvl(map.get("CQI_AVERAGE")   ,"")  // CQI 평균");
                          + "," + nvl(map.get("CQI0_RATE")     ,"")  // CQI0 비율(%)
                          + "," + nvl(map.get("RI_RATE")       ,"")  // RI2 비율(%)
                          + "," + nvl(map.get("DL_PRB_RATE")   ,"")  // DL PRB사용률(%)
                          + "," + nvl(map.get("MCS_AVERAGE")   ,"")  // MCS평균");               //SS
                          + "," + nvl(map.get("RSSI")          ,"")   // RSSI 최번시");          //SS
                          + "," + nvl(map.get("R2_RSSI")       ,"")  // RSSI 최한시");          //SS
                          + "," + nvl(map.get("MIMO_RATE")     ,"")  // MIMO 비율");            //    ELG
                          + "," + nvl(map.get("DL_THROUGHPUT") ,"") // DL Throughput(kbps)");  //    ELG
                          + "," + nvl(map.get("LICENSE_FAIL")  ,"") // License 초과 실패호");  //    ELG
                          + "," + nvl(map.get("MIMO_RATE")     ,"") // OL MIMO 비율(%)");      //ELG + NSN
                          + "," + nvl(map.get("MCS_AVERAGE")   ,"") // MCS0 비율(%)");         //ELG + NSN
                          + "," + nvl(map.get("PUCCH_AVG")     ,"") // RSSI PUCCH 최번시");    //ELG + NSN
                          + "," + nvl(map.get("R2_PUCCH_AVG")  ,"") // RSSI PUCCH 최한시");     //NSN
                          + "," + nvl(map.get("PUSCH_AVG")     ,"") // RSSI PUSCH 최번시");    //NSN
                          + "," + nvl(map.get("R2_PUSCH_AVG")  ,"") // RSSI PUSCH 최한시");     //NSN
                          + "," + nvl(map.get("PDCP_DL_MB")    ,"") // 데이터 트래픽(MB)");
                          + "," + nvl(map.get("PRB_USG_RATE")  ,"") // 데이터 PRB사용률(%)");
                          + "," + nvl(map.get("DRB_USG_RATE")  ,"") // 데이터 DPR사용률(%)");
                          + "," + nvl(map.get("CON_TIME")      ,"") // 데이터 동접자(Erl)");
                          + "," + nvl(map.get("TRY_CCNT")      ,"") // 데이터 시도호수");
                          + "," + nvl(map.get("CON_RATE")      ,"") // 데이터 접속률(%)");
                          + "," + nvl(map.get("CDC_RATE")      ,"") // 데이터 CD율(%)");
                          + "," + nvl(map.get("DL_FA_USG_RATE")      ,"") // FA 사용률(%)");
                          + "," + nvl(map.get("VOICE_DL_MB")   ,"") // HD Voice 다운로드
                          + "," + nvl(map.get("VOICE_DL_PRB")  ,"") // HD Voice PRB 사용률(%)");
                          + "," + nvl(map.get("VOICE_TRY_CCNT")  ,"") // HD Voice 시도호수");
                          + "," + nvl(map.get("VOICE_TIME")    ,"") // HD Voice 점유시간");
                          + "," + nvl(map.get("IMAGE_DL_MB")   ,"") // 영상통화 트래픽 (MB)");
                          + "," + nvl(map.get("IMAGE_DL_PRB")  ,"") // 영상통화 PRB사용률(%)");
                          + "," + nvl(map.get("IMAGE_TRY_CCNT")  ,"") // 영상통화 시도호수");
                          + "," + nvl(map.get("IMAGE_TIME")    ,"") // 영상통화 점유시간");
                          + "," + nvl(map.get("CHNL_TYPE")     ,"")  // 전송로 종류");
                          + "," + nvl(map.get("CHNL_COUNT")    ,"")   // 전송로 갯수");



                          ;

            fileOut.write(txt);
            fileOut.newLine();

            if (isLocalHost()) {
                System.out.println(txt);
            }


        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
    private void writeEMSHeader() {
        String txt = "";
        String txt2 = "\n";
        try {
            txt =    "날짜"
                    +"," + "최번시간"
                    +"," + "ERP 코드"
                    +"," + "C_UID"
                    +"," + "제조사코드"
                    +"," + "DU 명"
                    +"," + "CELL_ID"
                    +"," + "CELL 명"
                    +"," + "MCID"
                    +"," + "시/군/구"
                    +"," + "주파수구분"
                    +"," + "MIMO 구분"
                    +"," + "용량(Mbps)"
                    +"," + "CQI 평균"
                    +"," + "CQI0 비율(%)"
                    +"," + "RI2 비율(%)"
                    +"," + "DL PRB사용률(%)"
                    +"," + "MCS평균"                 //SS
                    +"," + "RSSI 최번시"            //SS
                    +"," + "RSSI 최한시"            //SS
                    +"," + "MIMO 비율"              //    ELG
                    +"," + "DL Throughput(kbps)"  //    ELG
                    +"," + "License 초과 실패호"  //    ELG
                    +"," + "OL MIMO 비율(%)"      //ELG + NSN
                    +"," + "MCS0 비율(%)"         //ELG + NSN
                    +"," + "RSSI PUCCH 최번시"    //ELG + NSN
                    +"," + "RSSI PUCCH 최한시"    //NSN
                    +"," + "RSSI PUSCH 최번시"    //NSN
                    +"," + "RSSI PUSCH 최한시"    //NSN
                    +"," + "데이터 트래픽(MB)"
                    +"," + "데이터 PRB사용률(%)"
                    +"," + "데이터 DPR사용률(%)"
                    +"," + "데이터 동접자(Erl)"
                    +"," + "데이터 시도호수"
                    +"," + "데이터 접속률(%)"
                    +"," + "데이터 CD율(%)"
                    +"," + "FA 사용률 (%)"
                    +"," + "HD Voice 다운로드"
                    +"," + "HD Voice PRB 사용률(%)"
                    +"," + "HD Voice 시도호수"
                    +"," + "HD Voice 점유시간"
                    +"," + "영상통화 트래픽 (MB)"
                    +"," + "영상통화 PRB사용률(%)"
                    +"," + "영상통화 시도호수"
                    +"," + "영상통화 점유시간"
                    +"," + "전송로 종류"
                    +"," + "전송로 갯수"
            ;

            fileOut.write(txt);
            fileOut.newLine();

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
    public HashMap getAdminCriticalValues() {
        return (HashMap)request.getSession().getAttribute("ADMIN_CRITICAL_VALUES");
    }

    public String selectBasicData(){

        this.log.debug("selectBasicData Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/nice.csv";
            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            log.debug(xlsFileFullPath);

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            //this.fileOut = new FileOutputStream(xlsFileFullPath);

            FileOutputStream fos = new FileOutputStream(xlsFileFullPath);
            OutputStreamWriter osw=new OutputStreamWriter(fos,"EUC-KR");
            this.fileOut =new BufferedWriter(osw);
            //this.fileOut = new BufferedWriter(new FileWriter(xlsFileFullPath));

            writeHeader();

            log.debug(param);

            session.select("BigDownload.selectBasicData_"+param.get("SEARCHTYPE"), param, this);

            fileOut.close();

            this.msg = "엑셀이 생성 되었습니다";
            this.status = "SUCCESS";
            this.downloadurl = /*"download" + */ tempFolder + xlsFileName ;

            session.commit();
            this.msg = "생성되었습니다";
            this.status = "SUCCESS";
        }catch (Exception e){
            e.printStackTrace();
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            session.rollback();

        }finally{
            session.close();
        }
        return SUCCESS;
    }

    private void writeHeader() {
        writeEMSHeader();
    }


    private void parseParam() throws Exception {

        String USER_ID = (String)request.getSession().getAttribute("USER_ID");//"qcas"; //to do 추후 session 처리 합니다.


        if (!isLocalHost()) {
            if(isNull(USER_ID).equals("")){
                throw new Exception("세션이 만료 되었습니다");
            }
        }

        /*uri parsing*/
        Type type = new TypeToken<Map<String, Object>>(){}.getType();
        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

        param.put("WORKGROUP_ID" , parseKey(map,"WORKGROUP_ID",""));
        param.put("TERMTYPE"      , parseKey(map,"TERMTYPE",""));
        param.put("DAYTIME_SEQ"   , parseKey(map,"DAYTIME_SEQ",""));
        param.put("VIEWTYPE"      , parseKey(map,"VIEWTYPE",""));
        param.put("FREQ_KIND"     , parseKey(map,"FREQ_KIND",""));
        param.put("FROMYMD"       , parseKey(map,"FROMYMD","").replace("-","").replace(".","").replace("/", "")  );
        param.put("TOYMD"         , parseKey(map,"TOYMD","").replace("-","").replace(".","").replace("/", "")  );
        param.put("USER_ID"       ,  USER_ID  );
        param.put("MBTYPE"        ,  parseKey(map,"MBTYPE",""));
        param.put("MFC_CD"        ,  parseKey(map,"MFC_CD",""));
        param.put("SEARCHTYPE"    , parseKey(map,"SEARCHTYPE",""));
        param.put("MME_GRP_ID"    ,  parseKey(map,"MME_GRP_ID",""));
        param.put("NE_ID"          ,  parseKey(map,"NE_ID",""));

        param.put("PART_CD"        ,  parseKey(map,"PART_CD",""));
        param.put("BONBU_CD"       ,  parseKey(map,"BONBU_CD",""));
        param.put("OPER_TEAM_CD"  ,  parseKey(map,"OPER_TEAM_CD",""));

        param.put("CITY_CD"        ,  parseKey(map,"CITY",""));

        ArrayList<String> alist = new ArrayList<String>();
        String temp01[] = parseKey(map,"DUIDs","").split("\\|");

        for(int i=0;i<temp01.length;i++){
            alist.add(temp01[i]);
        }
        param.put("DUIDs",alist);

        System.out.println(param.toString());

    }

    private String parseKey(Map <String, Object> map, String Key, String None){
        if(map.containsKey(Key)){
            if( map.get(Key) == null ) return None;
            else return map.get(Key).toString();
        }else{
            return None;
        }
    }

}
