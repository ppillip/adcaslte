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

public class DownLinkByNMSAction extends ActionSupport4lte implements ResultHandler {
    private static final long serialVersionUID = 1L;

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

    public void setDUIDs(String DUIDs) {
        this.DUIDs = DUIDs;
    }

    public void setWORKGROUP_ID(String WORKGROUP_ID) {
        this.WORKGROUP_ID = WORKGROUP_ID;
    }

    public void setTERMTYPE(String TERMTYPE) {
        this.TERMTYPE = TERMTYPE;
    }

    public void setDAYTIME_SEQ(String DAYTIME_SEQ) {
        this.DAYTIME_SEQ = DAYTIME_SEQ;
    }

    public void setVIEWTYPE(String VIEWTYPE) {
        this.VIEWTYPE = VIEWTYPE;
    }

    public void setFREQ_KIND(String FREQ_KIND) {
        this.FREQ_KIND = FREQ_KIND;
    }

    public void setFROMYMD(String FROMYMD) {
        this.FROMYMD = FROMYMD;
    }

    public void setTOYMD(String TOYMD) {
        this.TOYMD = TOYMD;
    }
    public void setMBTYPE(String MBTYPE) {
        this.MBTYPE = MBTYPE;
    }
    public void setMFC_CD(String MFC_CD) {
        this.MFC_CD = MFC_CD;
    }
    public void setJSONDATA(String JSONDATA) {
        this.JSONDATA = JSONDATA;
    }
    public void setJSONDATAAFTER(String JSONDATAAFTER) {
        this.JSONDATAAFTER = JSONDATAAFTER;
    }

    public void setSEARCHTYPE(String SEARCHTYPE) {
        this.SEARCHTYPE = SEARCHTYPE;
    }
    public void setBAD_TYPE(String BAD_TYPE) {
        this.BAD_TYPE = BAD_TYPE;
    }

    public void setPART_CD(String PART_CD) {
        this.PART_CD = PART_CD;
    }

    /*다시 커밋*/
    private String WORKGROUP_ID   = "";
    private String TERMTYPE       = "";
    private String DAYTIME_SEQ    = "";
    private String VIEWTYPE       = "";
    private String FREQ_KIND      = "";
    private String FROMYMD         = "";
    private String TOYMD           = "";
    private String MBTYPE           = "R3";
    private String DUIDs = "";
    private String MFC_CD = "";
    private String JSONDATA = "";
    private String JSONDATAAFTER = "";
    private HashMap adminCriticalValues;

    private String SEARCHTYPE = "WORKGROUP";
    private String PART_CD    = ""  ;
    private String BAD_TYPE   = ""  ;

    public void handleResult(ResultContext context) {
        //todo 파일포인터 받아서 Write 만 하기
        /*
             rs.write(m.get("BTS_NM")+","+m.get("BTS_CD")+"\n\r")
         */
        System.out.println(context.getResultObject().toString());

    }



    public HashMap getAdminCriticalValues() {
        return (HashMap)request.getSession().getAttribute("ADMIN_CRITICAL_VALUES");
    }

    private void parseParam() throws Exception {

        String USER_ID = (String)request.getSession().getAttribute("USER_ID");//"qcas"; //to do 추후 session 처리 합니다.


        if (!isLocalHost()) {
            if(isNull(USER_ID).equals("")){
                throw new Exception("세션이 만료 되었습니다");
            }
        }

        param.put("WORKGROUP_ID" , WORKGROUP_ID  );
        param.put("TERMTYPE"      , TERMTYPE      );
        param.put("DAYTIME_SEQ"   , DAYTIME_SEQ   );
        param.put("VIEWTYPE"      , VIEWTYPE      );
        param.put("FREQ_KIND"     , FREQ_KIND     );
        param.put("FROMYMD"       , FROMYMD.replace("-","").replace(".","").replace("/","")  );
        param.put("TOYMD"         , TOYMD.replace("-","").replace(".","").replace("/","")  );
        param.put("USER_ID"       ,  USER_ID  );
        param.put("MBTYPE"       ,  MBTYPE  );
        param.put("MFC_CD"       ,  MFC_CD  );

        param.put("SEARCHTYPE"   , SEARCHTYPE     );
        param.put("PART_CD"      , PART_CD     );
        param.put("BAD_TYPE"     , BAD_TYPE     );

       ArrayList<String> alist = new ArrayList<String>();
        String temp01[] = DUIDs.split("\\|");

        for(int i=0;i<temp01.length;i++){
            System.out.println(temp01[i]);

            alist.add(temp01[i]);
        }
        param.put("DUIDs",alist);

        System.out.println(param.toString());

    }


    public String selectDailyCellTraffic(){

        this.log.debug("selectDailyCellTraffic Start");
        SqlSession session = null;

        try{
            parseParam();

/*            if( isNull(this.BTS_NM_CMS).equals("") ) {
                throw new Exception("DU명이 없습니다");
            }
*/
            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            //this.param.put("BTS_NM_CMS",BTS_NM_CMS);
            this.log.debug("###################### 트레픽 데이터 가져오는중 ");
            this.rows = session.selectList("DownLinkByNMS.selectDailyCellTraffic"+VIEWTYPE,param);

            this.log.debug("###################### 세션커밋");
            //session.commit();
            this.log.debug("###################### 커밋완료");
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        }catch (Exception e){
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session!=null){
                session.rollback();
            }
            e.printStackTrace();
        }finally{
            if(session!=null){
                session.close();
            }
        }

        this.log.debug("selectDailyCellTraffic End");
        return SUCCESS;
    }

    private static void createCell(Workbook wb, Row row, short column , String  value, short halign) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(halign);
        cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cell.setCellStyle(cellStyle);

    }

    private static void createCell(Workbook wb, Row row, short column , double   value, short halign) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value);
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(halign);
        cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cell.setCellStyle(cellStyle);

    }
    private String parseKey(StringMap jrow, String Key, String None){
        return jrow.containsKey(Key)?jrow.get(Key).toString():None;
    }

    private static void createCell(Workbook wb, Row row, short column, short halign, short valign , String text) {
        Cell cell = row.createCell(column);
        cell.setCellValue(text);
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(halign);
        cellStyle.setVerticalAlignment(valign);
        cell.setCellStyle(cellStyle);
    }

    public String selectDailyCellTrafficCQIExcelDownload(){

        this.log.debug("selectDailyCellTrafficCQIExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            parseParam();
            log.debug( this.MFC_CD );
            String [] CQINAME = {"0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"};
            if(MFC_CD.equals("MFC00002")){
                CQINAME[0] = "1";
                CQINAME[1] = "2";
                CQINAME[2] = "3";
                CQINAME[3] = "4";
                CQINAME[4] = "5";
                CQINAME[5] = "6";
                CQINAME[6] = "7";
                CQINAME[7] = "8";
                CQINAME[8] = "9";
                CQINAME[9] = "10";
                CQINAME[10] = "11";
                CQINAME[12] = "12";
                CQINAME[13] = "13";
                CQINAME[14] = "14";
                CQINAME[15] = "15";
            }

            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            //log.debug("json data : " + this.JSONDATA);

            Workbook wb = new HSSFWorkbook();

            //PDFsheet 만들고
            String sheetName = "CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);
            //CDFsheet 만들고
            sheetName = "CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            //header 만들자
            Row PDFhrow0 = PDFsheet.createRow((short) 0 );
            PDFhrow0.setHeightInPoints(20);
            PDFhrow0.createCell(0 ).setCellValue("날짜");                   // "YMD"
            PDFhrow0.createCell(1 ).setCellValue("최번시간");             // "MB_TIME"
            PDFhrow0.createCell(2 ).setCellValue("DU명");                  // "BTS_NM"
            PDFhrow0.createCell(3 ).setCellValue("CELL ID");           // "CELL_ID"
            PDFhrow0.createCell(4 ).setCellValue("CELL 명");           //  "CELL_NM"
            PDFhrow0.createCell(5 ).setCellValue("MCID");                //  "MCID"
            PDFhrow0.createCell(6 ).setCellValue("주파수구분");                //  "MCID"
            PDFhrow0.createCell(7 ).setCellValue("PDF-"+CQINAME[0]);
            PDFhrow0.createCell(8 ).setCellValue("PDF-"+CQINAME[1]);
            PDFhrow0.createCell(9 ).setCellValue("PDF-"+CQINAME[2]);
            PDFhrow0.createCell(10).setCellValue("PDF-"+CQINAME[3]);
            PDFhrow0.createCell(11).setCellValue("PDF-"+CQINAME[4]);
            PDFhrow0.createCell(12).setCellValue("PDF-"+CQINAME[5]);
            PDFhrow0.createCell(13).setCellValue("PDF-"+CQINAME[6]);
            PDFhrow0.createCell(14).setCellValue("PDF-"+CQINAME[7]);
            PDFhrow0.createCell(15).setCellValue("PDF-"+CQINAME[8]);
            PDFhrow0.createCell(16).setCellValue("PDF-"+CQINAME[9]);
            PDFhrow0.createCell(17).setCellValue("PDF-"+CQINAME[10]);
            PDFhrow0.createCell(18).setCellValue("PDF-"+CQINAME[11]);
            PDFhrow0.createCell(19).setCellValue("PDF-"+CQINAME[12]);
            PDFhrow0.createCell(20).setCellValue("PDF-"+CQINAME[13]);
            PDFhrow0.createCell(21).setCellValue("PDF-"+CQINAME[14]);
            PDFhrow0.createCell(22).setCellValue("PDF-"+CQINAME[15]);
            //header 만들자
            Row CDFhrow0 = CDFsheet.createRow((short) 0 );
            CDFhrow0.setHeightInPoints(20);
            CDFhrow0.createCell(0 ).setCellValue("날짜");                   // "YMD"
            CDFhrow0.createCell(1 ).setCellValue("최번시간");             // "MB_TIME"
            CDFhrow0.createCell(2 ).setCellValue("DU명");                  // "BTS_NM"
            CDFhrow0.createCell(3 ).setCellValue("CELL ID");           // "CELL_ID"
            CDFhrow0.createCell(4 ).setCellValue("CELL 명");           //  "CELL_NM"
            CDFhrow0.createCell(5 ).setCellValue("MCID");                //  "MCID"
            CDFhrow0.createCell(6 ).setCellValue("주파수구분");                //  "MCID"
            CDFhrow0.createCell(7 ).setCellValue("CDF-"+CQINAME[0]);
            CDFhrow0.createCell(8 ).setCellValue("CDF-"+CQINAME[1]);
            CDFhrow0.createCell(9 ).setCellValue("CDF-"+CQINAME[2]);
            CDFhrow0.createCell(10).setCellValue("CDF-"+CQINAME[3]);
            CDFhrow0.createCell(11).setCellValue("CDF-"+CQINAME[4]);
            CDFhrow0.createCell(12).setCellValue("CDF-"+CQINAME[5]);
            CDFhrow0.createCell(13).setCellValue("CDF-"+CQINAME[6]);
            CDFhrow0.createCell(14).setCellValue("CDF-"+CQINAME[7]);
            CDFhrow0.createCell(15).setCellValue("CDF-"+CQINAME[8]);
            CDFhrow0.createCell(16).setCellValue("CDF-"+CQINAME[9]);
            CDFhrow0.createCell(17).setCellValue("CDF-"+CQINAME[10]);
            CDFhrow0.createCell(18).setCellValue("CDF-"+CQINAME[11]);
            CDFhrow0.createCell(19).setCellValue("CDF-"+CQINAME[12]);
            CDFhrow0.createCell(20).setCellValue("CDF-"+CQINAME[13]);
            CDFhrow0.createCell(21).setCellValue("CDF-"+CQINAME[14]);
            CDFhrow0.createCell(22).setCellValue("CDF-"+CQINAME[15]);

            ArrayList list01 = (ArrayList) map.get("rows");
            Iterator iterator = (Iterator) list01.iterator();
            short i = 1;
            while (iterator.hasNext()){
                StringMap jrow = (StringMap)iterator.next();
                //한줄 만들고 셋팅
                Row PDFrow = PDFsheet.createRow((short) i );
                Row CDFrow = CDFsheet.createRow((short) i );
                PDFrow.setHeightInPoints(20);
                CDFrow.setHeightInPoints(20);

                PDFrow.createCell(0 ).setCellValue((String) jrow.get("YMD")             );
                PDFrow.createCell(1 ).setCellValue((String) jrow.get("MB_TIME")     );
                PDFrow.createCell(2 ).setCellValue((String) jrow.get("BTS_NM")          );
                PDFrow.createCell(3 ).setCellValue((String) jrow.get("CELL_ID")         );
                PDFrow.createCell(4 ).setCellValue((String) jrow.get("CELL_NM")         );
                PDFrow.createCell(5 ).setCellValue((String) jrow.get("MCID")            );
                PDFrow.createCell(6 ).setCellValue((String) jrow.get("FREQ_KIND")      );

                CDFrow.createCell(0 ).setCellValue((String) jrow.get("YMD")             );
                CDFrow.createCell(1 ).setCellValue((String) jrow.get("MB_TIME")     );
                CDFrow.createCell(2 ).setCellValue((String) jrow.get("BTS_NM")          );
                CDFrow.createCell(3 ).setCellValue((String) jrow.get("CELL_ID")         );
                CDFrow.createCell(4 ).setCellValue((String) jrow.get("CELL_NM")         );
                CDFrow.createCell(5 ).setCellValue((String) jrow.get("MCID")            );
                CDFrow.createCell(6 ).setCellValue((String) jrow.get("FREQ_KIND")      );

                PDFrow.createCell(7 ).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_00") ? jrow.get("CQI_PDF_00").toString():"0"));
                PDFrow.createCell(8 ).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_01") ? jrow.get("CQI_PDF_01").toString():"0"));
                PDFrow.createCell(9 ).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_02") ? jrow.get("CQI_PDF_02").toString():"0"));
                PDFrow.createCell(10).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_03") ? jrow.get("CQI_PDF_03").toString():"0"));
                PDFrow.createCell(11).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_04") ? jrow.get("CQI_PDF_04").toString():"0"));
                PDFrow.createCell(12).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_05") ? jrow.get("CQI_PDF_05").toString():"0"));
                PDFrow.createCell(13).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_06") ? jrow.get("CQI_PDF_06").toString():"0"));
                PDFrow.createCell(14).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_07") ? jrow.get("CQI_PDF_07").toString():"0"));
                PDFrow.createCell(15).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_08") ? jrow.get("CQI_PDF_08").toString():"0"));
                PDFrow.createCell(16).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_09") ? jrow.get("CQI_PDF_09").toString():"0"));
                PDFrow.createCell(17).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_10") ? jrow.get("CQI_PDF_10").toString():"0"));
                PDFrow.createCell(18).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_11") ? jrow.get("CQI_PDF_11").toString():"0"));
                PDFrow.createCell(19).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_12") ? jrow.get("CQI_PDF_12").toString():"0"));
                PDFrow.createCell(20).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_13") ? jrow.get("CQI_PDF_13").toString():"0"));
                PDFrow.createCell(21).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_14") ? jrow.get("CQI_PDF_14").toString():"0"));
                PDFrow.createCell(22).setCellValue(Double.parseDouble(jrow.containsKey("CQI_PDF_15") ? jrow.get("CQI_PDF_15").toString():"0"));

                CDFrow.createCell(7 ).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_00") ? jrow.get("CQI_CDF_00").toString():"0"));
                CDFrow.createCell(8 ).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_01") ? jrow.get("CQI_CDF_01").toString():"0"));
                CDFrow.createCell(9 ).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_02") ? jrow.get("CQI_CDF_02").toString():"0"));
                CDFrow.createCell(10).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_03") ? jrow.get("CQI_CDF_03").toString():"0"));
                CDFrow.createCell(11).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_04") ? jrow.get("CQI_CDF_04").toString():"0"));
                CDFrow.createCell(12).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_05") ? jrow.get("CQI_CDF_05").toString():"0"));
                CDFrow.createCell(13).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_06") ? jrow.get("CQI_CDF_06").toString():"0"));
                CDFrow.createCell(14).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_07") ? jrow.get("CQI_CDF_07").toString():"0"));
                CDFrow.createCell(15).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_08") ? jrow.get("CQI_CDF_08").toString():"0"));
                CDFrow.createCell(16).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_09") ? jrow.get("CQI_CDF_09").toString():"0"));
                CDFrow.createCell(17).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_10") ? jrow.get("CQI_CDF_10").toString():"0"));
                CDFrow.createCell(18).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_11") ? jrow.get("CQI_CDF_11").toString():"0"));
                CDFrow.createCell(19).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_12") ? jrow.get("CQI_CDF_12").toString():"0"));
                CDFrow.createCell(20).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_13") ? jrow.get("CQI_CDF_13").toString():"0"));
                CDFrow.createCell(21).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_14") ? jrow.get("CQI_CDF_14").toString():"0"));
                CDFrow.createCell(22).setCellValue(Double.parseDouble(jrow.containsKey("CQI_CDF_15") ? jrow.get("CQI_CDF_15").toString():"0"));
                i++;
            }

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkCQI(PDF_CDF).xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);

            this.msg = "엑셀이 생성 되었습니다";
            this.status = "SUCCESS";
            this.downloadurl = "download" + tempFolder + xlsFileName ;

        }catch (Exception e){
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session!=null){
                session.rollback();
            }
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
            if(session!=null){
                session.close();
            }
        }

        this.log.debug("selectDailyCellTrafficCQIExcelDownload End");
        return SUCCESS;
    }

    public String selectDailyCellTrafficExcelDownload(){

        this.log.debug("selectDailyCellTrafficExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            parseParam();
            log.debug( this.MFC_CD );
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            Workbook wb = new HSSFWorkbook();
            CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "data";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);

            //sheet 생성 파트로 jump
            this.makeTrafficSheet(wb,safeName,map);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkData.xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);

            this.msg = "엑셀이 생성 되었습니다";
            this.status = "SUCCESS";
            this.downloadurl = "download" + tempFolder + xlsFileName ;

        }catch (Exception e){
            e.printStackTrace();
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session!=null){
                session.rollback();
            }
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
            if(session!=null){
                session.close();
            }
        }

        this.log.debug("selectDailyCellTrafficExcelDownload End");
        return SUCCESS;
    }

    //전후비교
    public String selectDailyCellTrafficCompExcelDownload(){

        this.log.debug("selectDailyCellTrafficCompExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            parseParam();
            log.debug( this.MFC_CD );
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();

            log.debug("json data : " + this.JSONDATA);

            Workbook wb = new HSSFWorkbook();
            CreationHelper createHelper = wb.getCreationHelper();

            // 전
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);
            String sheetName = "전기간 data";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            this.makeTrafficSheet(wb,safeName,map);

            // 후
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATAAFTER, type);
            String sheetNameAfter = "후기간 data";
            String safeNameAfter = WorkbookUtil.createSafeSheetName(sheetNameAfter);
            this.makeTrafficSheet(wb,safeNameAfter,mapAfter);



            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkDataComp.xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);

            this.msg = "엑셀이 생성 되었습니다";
            this.status = "SUCCESS";
            this.downloadurl = "download" + tempFolder + xlsFileName ;

        }catch (Exception e){
            e.printStackTrace();
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session!=null){
                session.rollback();
            }
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
            if(session!=null){
                session.close();
            }
        }

        this.log.debug("selectDailyCellTrafficCompExcelDownload End");
        return SUCCESS;
    }



    private void makeTrafficSheet(Workbook wb ,String safeName ,Map map){
        //sheet 만들고
        Sheet sheet = wb.createSheet(safeName);

        //header 만들자
        Row hrow0 = sheet.createRow((short) 0 );
        hrow0.setHeightInPoints(20);
        createCell(wb,hrow0,(short) 0 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "날짜");
        createCell(wb,hrow0,(short) 1 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최번시간");           // "MB_TIME"
        createCell(wb,hrow0,(short) 2 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DU명");               // "BTS_NM"
        createCell(wb,hrow0,(short) 3 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CELL ID");           // "CELL_ID"
        createCell(wb,hrow0,(short) 4 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CELL 명");           //  "CELL_NM"
        createCell(wb,hrow0,(short) 5 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCID");              //  "MCID"
        createCell(wb,hrow0,(short) 6 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "주파수구분");        //  "FREQ_KIND"
        createCell(wb,hrow0,(short) 7 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MIMO구분");          //   "MIMO_TYPE"
        createCell(wb,hrow0,(short) 8 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "용량(Mbps)");       //   "THROUGHPUT"
        createCell(wb,hrow0,(short) 9 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CQI 평균");         //   "CQI_AVERAGE"
        createCell(wb,hrow0,(short) 10,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CQI0 비율(%)");     //   "RI_RATE"
        createCell(wb,hrow0,(short) 11,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RI2 비율(%)");      //
        createCell(wb,hrow0,(short) 12,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DL PRB사용률(%)");  //
        createCell(wb,hrow0,(short) 13,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCS평균");               //SS
        createCell(wb,hrow0,(short) 14,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI");                  //SS
        createCell(wb,hrow0,(short) 15,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI");                  //SS
        createCell(wb,hrow0,(short) 16,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MIMO 비율");            //    ELG
        createCell(wb,hrow0,(short) 17,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DL Throughput(kbps)");//    ELG
        createCell(wb,hrow0,(short) 18,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "License 초과 실패호"); //    ELG
        createCell(wb,hrow0,(short) 19,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "OL MIMO 비율(%)");      //NSN
        createCell(wb,hrow0,(short) 20,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCS0 비율(%)");         //NSN
        createCell(wb,hrow0,(short) 21,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI");   //NSN
        createCell(wb,hrow0,(short) 22,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI");   //NSN
        createCell(wb,hrow0,(short) 23,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI");   //NSN
        createCell(wb,hrow0,(short) 24,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI");   //NSN
        createCell(wb,hrow0,(short) 25,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 26,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 27,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 28,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 29,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 30,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 31,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 32,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "데이터");
        createCell(wb,hrow0,(short) 33,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "HD Voice");
        createCell(wb,hrow0,(short) 34,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "HD Voice");
        createCell(wb,hrow0,(short) 35,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "HD Voice");
        createCell(wb,hrow0,(short) 36,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "HD Voice");
        createCell(wb,hrow0,(short) 37,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "영상통화");
        createCell(wb,hrow0,(short) 38,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "영상통화");
        createCell(wb,hrow0,(short) 39,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "영상통화");
        createCell(wb,hrow0,(short) 40,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "영상통화");
        createCell(wb,hrow0,(short) 41,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "전송로");
        createCell(wb,hrow0,(short) 42,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "전송로");

        Row hrow1 = sheet.createRow((short) 1 );
        hrow1.setHeightInPoints(20);
        createCell(wb,hrow1,(short) 0  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "날짜");
        createCell(wb,hrow1,(short) 1  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최번시간");           // "MB_TIME"
        createCell(wb,hrow1,(short) 2  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DU명");               // "BTS_NM"
        createCell(wb,hrow1,(short) 3  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CELL ID");           // "CELL_ID"
        createCell(wb,hrow1,(short) 4  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CELL 명");           //  "CELL_NM"
        createCell(wb,hrow1,(short) 5  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCID");              //  "MCID"
        createCell(wb,hrow1,(short) 6  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "주파수구분");        //  "FREQ_KIND"
        createCell(wb,hrow1,(short) 7  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MIMO구분");          //  "MIMO_TYPE"
        createCell(wb,hrow1,(short) 8  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "용량(Mbps)");        //   "THROUGHPUT"
        createCell(wb,hrow1,(short) 9  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CQI 평균");          //   "CQI_AVERAGE"
        createCell(wb,hrow1,(short) 10 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CQI0 비율(%)");     //   "RI_RATE"
        createCell(wb,hrow1,(short) 11 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RI2 비율(%)");      //
        createCell(wb,hrow1,(short) 12 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DL PRB사용률(%)");  //
        createCell(wb,hrow1,(short) 13 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCS평균");               //SS
        createCell(wb,hrow1,(short) 14 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최번시");                //SS
        createCell(wb,hrow1,(short) 15 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최한시");                //SS
        createCell(wb,hrow1,(short) 16 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MIMO 비율");            //    ELG
        createCell(wb,hrow1,(short) 17 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DL Throughput(kbps)");//    ELG
        createCell(wb,hrow1,(short) 18 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "License 초과 실패호"); //    ELG
        createCell(wb,hrow1,(short) 19 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "OL MIMO 비율(%)");     //NSN
        createCell(wb,hrow1,(short) 20 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCS0 비율(%)");         //NSN
        createCell(wb,hrow1,(short) 21 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PUCCH");                 //NSN
        createCell(wb,hrow1,(short) 22 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PUCCH");                 //NSN
        createCell(wb,hrow1,(short) 23 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PUSCH");                 //NSN
        createCell(wb,hrow1,(short) 24 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PUSCH");                 //NSN
        createCell(wb,hrow1,(short) 25 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "트래픽(MB)");
        createCell(wb,hrow1,(short) 26 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PRB사용률(%)");
        createCell(wb,hrow1,(short) 27 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DPR사용률(%)");
        createCell(wb,hrow1,(short) 28 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "동접자(Erl)");
        createCell(wb,hrow1,(short) 29 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "시도호수");
        createCell(wb,hrow1,(short) 30 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "접속률(%)");
        createCell(wb,hrow1,(short) 31 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CD율(%)");
        createCell(wb,hrow1,(short) 32 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "FA사용률(%)");
        createCell(wb,hrow1,(short) 33 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "트래픽(MB)");
        createCell(wb,hrow1,(short) 34 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PRB 사용률(%)");
        createCell(wb,hrow1,(short) 35 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "시도호수");
        createCell(wb,hrow1,(short) 36 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "점유시간");
        createCell(wb,hrow1,(short) 37 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "트래픽 (MB)");
        createCell(wb,hrow1,(short) 38 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PRB사용률(%)");
        createCell(wb,hrow1,(short) 39 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "시도호수");
        createCell(wb,hrow1,(short) 40 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "점유시간");
        createCell(wb,hrow1,(short) 41 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "종류");
        createCell(wb,hrow1,(short) 42 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "갯수");

        Row hrow2 = sheet.createRow((short) 2 );
        hrow2.setHeightInPoints(20);
        createCell(wb,hrow2,(short) 0  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "날짜");
        createCell(wb,hrow2,(short) 1  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최번시간");           // "MB_TIME"
        createCell(wb,hrow2,(short) 2  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DU명");               // "BTS_NM"
        createCell(wb,hrow2,(short) 3  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CELL ID");           // "CELL_ID"
        createCell(wb,hrow2,(short) 4  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CELL 명");           //  "CELL_NM"
        createCell(wb,hrow2,(short) 5  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCID");              //  "MCID"
        createCell(wb,hrow2,(short) 6  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "주파수구분");        //  "FREQ_KIND"
        createCell(wb,hrow2,(short) 7  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MIMO구분");        //  "MIMO_TYPE"
        createCell(wb,hrow2,(short) 8  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "용량(Mbps)");       //   "THROUGHPUT"
        createCell(wb,hrow2,(short) 9  ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CQI 평균");         //   "CQI_AVERAGE"
        createCell(wb,hrow2,(short) 10 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CQI0 비율(%)");         //   "RI_RATE"
        createCell(wb,hrow2,(short) 11 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RI2 비율(%)");
        createCell(wb,hrow2,(short) 12 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DL PRB사용률(%)");
        createCell(wb,hrow2,(short) 13 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCS평균");               //SS
        createCell(wb,hrow2,(short) 14 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI 최번시");          //SS
        createCell(wb,hrow2,(short) 15 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "RSSI 최한시");          //SS
        createCell(wb,hrow2,(short) 16 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MIMO 비율");            //    ELG
        createCell(wb,hrow2,(short) 17 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DL Throughput(kbps)");//    ELG
        createCell(wb,hrow2,(short) 18 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "License 초과 실패호"); //    ELG
        createCell(wb,hrow2,(short) 19 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "OL MIMO 비율(%)");     //NSN
        createCell(wb,hrow2,(short) 20 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "MCS0 비율(%)");         //NSN
        createCell(wb,hrow2,(short) 21 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최번시");                //NSN
        createCell(wb,hrow2,(short) 22 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최한시");                //NSN
        createCell(wb,hrow2,(short) 23 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최번시");                //NSN
        createCell(wb,hrow2,(short) 24 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "최한시");                //NSN
        createCell(wb,hrow2,(short) 25 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "트래픽(MB)");
        createCell(wb,hrow2,(short) 26 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PRB사용률(%)");
        createCell(wb,hrow2,(short) 27 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "DPR사용률(%)");
        createCell(wb,hrow2,(short) 28 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "동접자(Erl)");
        createCell(wb,hrow2,(short) 29 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "시도호수");
        createCell(wb,hrow2,(short) 30 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "접속률(%)");
        createCell(wb,hrow2,(short) 31 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "CD율(%)");
        createCell(wb,hrow2,(short) 32 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "FA사용률(%)");
        createCell(wb,hrow2,(short) 33 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "트래픽(MB)");
        createCell(wb,hrow2,(short) 34 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PRB 사용률(%)");
        createCell(wb,hrow2,(short) 35 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "시도호수");
        createCell(wb,hrow2,(short) 36 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "점유시간");
        createCell(wb,hrow2,(short) 37 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "트래픽 (MB)");
        createCell(wb,hrow2,(short) 38 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "PRB사용률(%)");
        createCell(wb,hrow2,(short) 39 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "시도호수");
        createCell(wb,hrow2,(short) 40 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "점유시간");
        createCell(wb,hrow2,(short) 41 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "종류");
        createCell(wb,hrow2,(short) 42 ,CellStyle.ALIGN_CENTER,CellStyle.VERTICAL_CENTER , "갯수");

        sheet.addMergedRegion(new CellRangeAddress(0,2,0,0));    // ("날짜");
        sheet.addMergedRegion(new CellRangeAddress(0,2,1,1));    // ("최번시간");
        sheet.addMergedRegion(new CellRangeAddress(0,2,2,2));    // ("DU명");
        sheet.addMergedRegion(new CellRangeAddress(0,2,3,3));    // ("CELL ID");
        sheet.addMergedRegion(new CellRangeAddress(0,2,4,4));    // ("CELL 명");
        sheet.addMergedRegion(new CellRangeAddress(0,2,5,5));    // ("MCID");
        sheet.addMergedRegion(new CellRangeAddress(0,2,6,6));    // ("주파수구분");
        sheet.addMergedRegion(new CellRangeAddress(0,2,7,7  ));    // ("MIMO 구분");
        sheet.addMergedRegion(new CellRangeAddress(0,2,8,8  ));    // ("용량(Mbps)");
        sheet.addMergedRegion(new CellRangeAddress(0,2,9,9  ));    // ("CQI 평균");
        sheet.addMergedRegion(new CellRangeAddress(0,2,10,10));    // ("CQI0 비율(%)");
        sheet.addMergedRegion(new CellRangeAddress(0,2,11,11));  // ("RI2 비율(%)");
        sheet.addMergedRegion(new CellRangeAddress(0,2,12,12));  // ("DL PRB사용률(%)");
        sheet.addMergedRegion(new CellRangeAddress(0,2,13,13));  // ("MCS평균");

        sheet.addMergedRegion(new CellRangeAddress(0,0,14,15));  // ("RSSI");    //ss
        sheet.addMergedRegion(new CellRangeAddress(1,2,14,14));  // ("최번시");  //ss
        sheet.addMergedRegion(new CellRangeAddress(1,2,15,15));  // ("최한시");  //ss

        sheet.addMergedRegion(new CellRangeAddress(0,2,16,16));  // ("MIMO 비율");            //    ELG
        sheet.addMergedRegion(new CellRangeAddress(0,2,17,17));  // ("DL Throughput(kbps)");//    ELG
        sheet.addMergedRegion(new CellRangeAddress(0,2,18,18));  // ("License 초과 실패호"); //    ELG
        sheet.addMergedRegion(new CellRangeAddress(0,2,19,19));  // ("OL MIMO 비율(%)");      //NSN
        sheet.addMergedRegion(new CellRangeAddress(0,2,20,20));  // ("MCS0 비율(%)");         //NSN

        sheet.addMergedRegion(new CellRangeAddress(0,0,21,24));  //  RSSI                     //NSN 가로 네칸
        sheet.addMergedRegion(new CellRangeAddress(1,1,21,22));  //  RSSI - PUCCH             //NSN 가로 두칸
        sheet.addMergedRegion(new CellRangeAddress(1,1,23,24));  //  RSSI - PUSCH             //NSN 가로 두칸
        //나머지 4개는 그대로

        sheet.addMergedRegion(new CellRangeAddress(0,0,25,32));  //데이터
        sheet.addMergedRegion(new CellRangeAddress(1,2,25,25));  // 데이터 - ("트래픽(MB)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,26,26));  // 데이터 - ("PRB사용률(%)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,27,27));  // 데이터 - ("DPR사용률(%)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,28,28));  // 데이터 - ("동접자(Erl)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,29,29));  // 데이터 - ("시도호수");
        sheet.addMergedRegion(new CellRangeAddress(1,2,30,30));  // 데이터 - ("접속률(%)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,31,31));  // 데이터 - ("CD율(%)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,32,32));  // 데이터 - ("FA사용률(%)");

        sheet.addMergedRegion(new CellRangeAddress(0,0,33,36));  // HD Voice
        sheet.addMergedRegion(new CellRangeAddress(1,2,33,33));  // HD Voice - ("트래픽(MB)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,34,34));  // HD Voice - ("PRB 사용률(%)");
        sheet.addMergedRegion(new CellRangeAddress(1,2,35,35));  // HD Voice - ("시도호수");
        sheet.addMergedRegion(new CellRangeAddress(1,2,36,36));  // HD Voice - ("점유시간");

        sheet.addMergedRegion(new CellRangeAddress(0,0,37,40));  //영상통화
        sheet.addMergedRegion(new CellRangeAddress(1,2,37,37));  //
        sheet.addMergedRegion(new CellRangeAddress(1,2,38,38));  //
        sheet.addMergedRegion(new CellRangeAddress(1,2,39,39));  //
        sheet.addMergedRegion(new CellRangeAddress(1,2,40,40));  //

        sheet.addMergedRegion(new CellRangeAddress(0,0,41,42));  //전송로
        sheet.addMergedRegion(new CellRangeAddress(1,2,41,41));  //
        sheet.addMergedRegion(new CellRangeAddress(1,2,42,42));  //



        String _MFC_CD = "MFC00001";
        ArrayList list01 = (ArrayList) map.get("rows");
        Iterator iterator = (Iterator) list01.iterator();
        short i = 3;
        while (iterator.hasNext()){

            StringMap jrow = (StringMap)iterator.next();

            if(i==3){
                _MFC_CD = jrow.containsKey("MFC_CD")?jrow.get("MFC_CD").toString():"MFC00001";

                //제조사별 hieddn 컬럼 설정
                if(_MFC_CD.equals("MFC00001")){
                    //삼성외 하이드
//                sheet.setColumnHidden(13,true);
//                sheet.setColumnHidden(14,true);
//                sheet.setColumnHidden(15,true);
                    sheet.setColumnHidden(16,true);
                    sheet.setColumnHidden(17,true);
                    sheet.setColumnHidden(18,true);
                    sheet.setColumnHidden(19,true);
                    sheet.setColumnHidden(20,true);
                    sheet.setColumnHidden(21,true);
                    sheet.setColumnHidden(22,true);
                    sheet.setColumnHidden(23,true);
                    sheet.setColumnHidden(24,true);
                }else if(_MFC_CD.equals("MFC00002")){
                    sheet.setColumnHidden(13,true);
                    sheet.setColumnHidden(14,true);
                    sheet.setColumnHidden(15,true);
//                sheet.setColumnHidden(16,true);
//                sheet.setColumnHidden(17,true);
//                sheet.setColumnHidden(18,true);
                    sheet.setColumnHidden(19,true);
                    sheet.setColumnHidden(20,true);
//                        sheet.setColumnHidden(21,true);
//                        sheet.setColumnHidden(22,true);
//                        sheet.setColumnHidden(23,true);
//                        sheet.setColumnHidden(24,true);
                }else if(_MFC_CD.equals("MFC00014")){
                    sheet.setColumnHidden(13,true);
                    sheet.setColumnHidden(14,true);
                    sheet.setColumnHidden(15,true);
                    sheet.setColumnHidden(16,true);
                    sheet.setColumnHidden(17,true);
                    sheet.setColumnHidden(18,true);
//                sheet.setColumnHidden(19,true);
//                sheet.setColumnHidden(20,true);
//                sheet.setColumnHidden(21,true);
//                sheet.setColumnHidden(22,true);
//                sheet.setColumnHidden(23,true);
//                sheet.setColumnHidden(24,true);
                }

            }

            //한줄 만들고 셋팅
            Row row = sheet.createRow((short) i )   ;
            row.setHeightInPoints(20);

            row.createCell(0 ).setCellValue((String) jrow.get("YMD")             );
            row.createCell(1 ).setCellValue((String) jrow.get("MB_TIME")     );
            row.createCell(2 ).setCellValue((String) jrow.get("BTS_NM")          );
            row.createCell(3 ).setCellValue((String) jrow.get("CELL_ID")         );
            row.createCell(4 ).setCellValue((String) jrow.get("CELL_NM")         );
            row.createCell(5 ).setCellValue((String) jrow.get("MCID")            );
            row.createCell(6 ).setCellValue((String) jrow.get("FREQ_KIND")      );
            row.createCell(7 ).setCellValue(jrow.containsKey("MIMO_TYPE")?jrow.get("MIMO_TYPE").toString():"-");      // 미모타입");       //   "MIMO_TYPE"       //추가됨

            setCellDoubleIfExistValue(row.createCell(8 ),jrow,"THROUGHPUT");      // 용량(Mbps)");       //   "THROUGHPUT"
            setCellDoubleIfExistValue(row.createCell(9 ),jrow,"CQI_AVERAGE");    // CQI 평균");         //   "CQI_AVERAGE"
            setCellDoubleIfExistValue(row.createCell(10),jrow,"CQI0_RATE");         // CQI0 비율(%)");         //   "RI_RATE"
            setCellDoubleIfExistValue(row.createCell(11),jrow,"RI_RATE");              // RI2 비율(%)");
            setCellDoubleIfExistValue(row.createCell(12),jrow,"DL_PRB_RATE");     // DL PRB사용률(%)");

                /*변경*/
            setCellDoubleIfExistValue(row.createCell(13),jrow,"MCS_AVERAGE");      // MCS평균");               //SS
            setCellDoubleIfExistValue(row.createCell(14),jrow,"RSSI");              // RSSI 최번시");          //SS
            setCellDoubleIfExistValue(row.createCell(15),jrow,"R2_RSSI");          // RSSI 최한시");          //SS
            setCellDoubleIfExistValue(row.createCell(16),jrow,"MIMO_RATE");        // MIMO 비율");             //    ELG
            setCellDoubleIfExistValue(row.createCell(17),jrow,"DL_THROUGHPUT");   // DL Throughput(kbps)");   //    ELG
            setCellDoubleIfExistValue(row.createCell(18),jrow,"LICENSE_FAIL");    // License 초과 실패호");   //    ELG
            setCellDoubleIfExistValue(row.createCell(19),jrow,"MIMO_RATE");       // OL MIMO 비율(%)");           //ELG + NSN
            setCellDoubleIfExistValue(row.createCell(20),jrow,"MCS_AVERAGE");     // MCS0 비율(%)");         //ELG + NSN
            setCellDoubleIfExistValue(row.createCell(21),jrow,"PUCCH_AVG");       // RSSI PUCCH 최번시");        //ELG + NSN
            setCellDoubleIfExistValue(row.createCell(22),jrow,"R2_PUCCH_AVG");   // RSSI PUCCH 최한시"); //NSN
            setCellDoubleIfExistValue(row.createCell(23),jrow,"PUSCH_AVG");       // RSSI PUSCH 최번시");        //NSN
            setCellDoubleIfExistValue(row.createCell(24),jrow,"R2_PUSCH_AVG");   // RSSI PUSCH 최한시"); //NSN

                /*공통*/
            setCellDoubleIfExistValue(row.createCell(25),jrow,"PDCP_DL_MB"); // 데이터 트래픽(MB)");
            setCellDoubleIfExistValue(row.createCell(26),jrow,"PRB_USG_RATE"); // 데이터 PRB사용률(%)");
            setCellDoubleIfExistValue(row.createCell(27),jrow,"DRB_USG_RATE"); // 데이터 DPR사용률(%)");
            setCellDoubleIfExistValue(row.createCell(28),jrow,"CON_TIME"); // 데이터 동접자(Erl)");
            setCellDoubleIfExistValue(row.createCell(29),jrow,"TRY_CCNT"); // 데이터 시도호수");
            setCellDoubleIfExistValue(row.createCell(30),jrow,"CON_RATE"); // 데이터 접속률(%)");
            setCellDoubleIfExistValue(row.createCell(31),jrow,"CDC_RATE"); // 데이터 CD율(%)");
            setCellDoubleIfExistValue(row.createCell(32),jrow,"DL_FA_USG_RATE"); //데이터 FA사용률(%)

            setCellDoubleIfExistValue(row.createCell(33),jrow,"VOICE_DL_MB");
            setCellDoubleIfExistValue(row.createCell(34),jrow,"VOICE_DL_PRB"); // HD Voice PRB 사용률(%)");
            setCellDoubleIfExistValue(row.createCell(35),jrow,"VOICE_TRY_CCNT"); // HD Voice 시도호수");
            setCellDoubleIfExistValue(row.createCell(36),jrow,"VOICE_TIME"); // HD Voice 점유시간");
            setCellDoubleIfExistValue(row.createCell(37),jrow,"IMAGE_DL_MB"); // 영상통화 트래픽 (MB)");
            setCellDoubleIfExistValue(row.createCell(38),jrow,"IMAGE_DL_PRB"); // 영상통화 PRB사용률(%)");
            setCellDoubleIfExistValue(row.createCell(39),jrow,"IMAGE_TRY_CCNT"); // 영상통화 시도호수");
            setCellDoubleIfExistValue(row.createCell(40),jrow,"IMAGE_TIME"); // 영상통화 점유시간");
            row.createCell(41).setCellValue((String) jrow.get("CHNL_TYPE") ); // 전송로 종류");
            setCellDoubleIfExistValue(row.createCell(42),jrow,"CHNL_COUNT");  // 전송로 갯수");

            i++;

        }

    }

    //Double 값들중 있는것만 넣기위함
    public void setCellDoubleIfExistValue(Cell cell, StringMap map, String str){
        if(map.containsKey(str)) cell.setCellValue(      Double.parseDouble( map.get(str).toString() )         );
    }


}
