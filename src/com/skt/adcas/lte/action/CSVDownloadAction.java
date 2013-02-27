package com.skt.adcas.lte.action;

import com.google.gson.Gson;
import com.google.gson.internal.StringMap;
import com.google.gson.reflect.TypeToken;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.WorkbookUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;

public class CSVDownloadAction extends ActionSupport4lte implements ResultHandler {

    private static final long serialVersionUID = 1L;
    private FileOutputStream fileOut;
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
        //todo 파일포인터 받아서 Write 만 하기
        /*
             rs.write(m.get("BTS_NM")+","+m.get("BTS_CD")+"\n\r")
         */
        if(this.fileType.equals("EMS")){
            this.writeEMSLine(context);
        }


        System.out.println(context.getResultObject().toString());

    }

    private void writeEMSLine(ResultContext context) {
        HashMap map = (HashMap) context.getResultObject();
        String txt = map.get("BTS_NM") + "," + map.get("CELL_NM") + "," + map.get("THROUGHPUT");
        String txt2 = "\n";
        try {
            fileOut.write(txt.getBytes());
            fileOut.write(txt2.getBytes());
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

            this.fileOut = new FileOutputStream(xlsFileFullPath);

            this.fileType = "EMS";
            session.select("BigDownload.selectBasicData", param, this);

            fileOut.close();

            this.msg = "엑셀이 생성 되었습니다";
            this.status = "SUCCESS";
            this.downloadurl = /*"download" + */ tempFolder + xlsFileName ;

            session.commit();
            this.msg = "생성되었습니다";
            this.status = "SUCCESS";
        }catch (Exception e){
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            session.rollback();
            e.printStackTrace();

        }finally{
            session.close();
        }
        return SUCCESS;
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
        param.put("FROMYMD"       , parseKey(map,"FROMYMD","").replace("-","").replace(".","").replace("/","")  );
        param.put("TOYMD"         , parseKey(map,"TOYMD","").replace("-","").replace(".","").replace("/","")  );
        param.put("USER_ID"       ,  USER_ID  );
        param.put("MBTYPE"        ,  parseKey(map,"MBTYPE",""));
        param.put("MFC_CD"        ,  parseKey(map,"MFC_CD",""));
        param.put("SEARCHTYPE"    , parseKey(map,"SEARCHTYPE",""));
        param.put("MME_GRP_ID"    ,  parseKey(map,"MME_GRP_ID",""));
        param.put("NE_ID"          ,  parseKey(map,"NE_ID",""));
        param.put("PART_CD"        ,  parseKey(map,"PART_CD",""));

        ArrayList<String> alist = new ArrayList<String>();
        String temp01[] = parseKey(map,"DUIDs","").split("\\|");

        for(int i=0;i<temp01.length;i++){
            System.out.println(temp01[i]);

            alist.add(temp01[i]);
        }
        param.put("DUIDs",alist);

        System.out.println(param.toString());

    }

    private String parseKey(Map <String, Object> map, String Key, String None){
        return map.containsKey(Key)?map.get(Key).toString():None;
    }

}
