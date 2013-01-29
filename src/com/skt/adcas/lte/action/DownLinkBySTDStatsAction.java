package com.skt.adcas.lte.action;

import com.google.gson.Gson;
import com.google.gson.internal.StringMap;
import com.google.gson.reflect.TypeToken;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.Configuration;
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

public class DownLinkBySTDStatsAction extends ActionSupport4lte {
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

    public void setSEARCHTYPE(String SEARCHTYPE) {
        this.SEARCHTYPE = SEARCHTYPE;
    }
    public String getSEARCHTYPE() {
        return SEARCHTYPE;
    }
    public void setBONBU_CD(String BONBU_CD) {
        this.BONBU_CD = BONBU_CD;
    }
    public void setOPER_TEAM_CD(String OPER_TEAM_CD) {
        this.OPER_TEAM_CD = OPER_TEAM_CD;
    }
    public void setCITY(String CITY) {
        this.CITY = CITY;
    }
    public void setMME_GRP_ID(String MME_GRP_ID) {
        this.MME_GRP_ID = MME_GRP_ID;
    }
    public void setNE_ID(String NE_ID) {
        this.NE_ID = NE_ID;
    }
    public void setTERMTYPE(String TERMTYPE) {
        this.TERMTYPE = TERMTYPE;
    }
    public void setFROMYMD(String FROMYMD) {
        this.FROMYMD = FROMYMD;
    }
    public void setTOYMD(String TOYMD) {
        this.TOYMD = TOYMD;
    }
    public void setDAYTIME_SEQ(String DAYTIME_SEQ) {
        this.DAYTIME_SEQ = DAYTIME_SEQ;
    }
    public void setFREQ_KIND(String FREQ_KIND) {
        this.FREQ_KIND = FREQ_KIND;
    }
    public void setMBTYPE(String MBTYPE) {
        this.MBTYPE = MBTYPE;
    }
    public void setVIEWTYPE(String VIEWTYPE) {
        this.VIEWTYPE = VIEWTYPE;
    }
    public void setSUBLIST(String SUBLIST) {
        this.SUBLIST = SUBLIST;
    }
    public void setJSONDATA(String JSONDATA) {
        this.JSONDATA = JSONDATA;
    }
    public void setJSONDATA2(String JSONDATA2) {
        this.JSONDATA2 = JSONDATA2;
    }

    private String SEARCHTYPE    = "";
    private String BONBU_CD      = "";
    private String OPER_TEAM_CD  = "";
    private String CITY          = "";
    private String MME_GRP_ID    = "";
    private String NE_ID         = "";
    private String TERMTYPE      = "";
    private String FROMYMD       = "";
    private String TOYMD         = "";
    private String DAYTIME_SEQ   = "";
    private String FREQ_KIND     = "";
    private String MBTYPE        = "R3";
    private String VIEWTYPE      = "";
    //For Graph
    private String SUBLIST        = "";
    //For Excel
    private String JSONDATA      = "";
    private String JSONDATA2     = "";


    private void parseParam() throws Exception {

        String USER_ID = (String)request.getSession().getAttribute("USER_ID");//"qcas"; //to do 추후 session 처리 합니다.

        if (!isLocalHost()) {
            if(isNull(USER_ID).equals("")){
                throw new Exception("세션이 만료 되었습니다");
            }
        }

        param.put("SEARCHTYPE"    , SEARCHTYPE);
        param.put("BONBU_CD"      , BONBU_CD);
        param.put("OPER_TEAM_CD"  , OPER_TEAM_CD);
        param.put("CITY"          , CITY);
        param.put("MME_GRP_ID"    , MME_GRP_ID);
        param.put("NE_ID"         , NE_ID);
        param.put("TERMTYPE"      , TERMTYPE);
        param.put("FROMYMD"       , FROMYMD.replace("-","").replace(".","").replace("/",""));
        param.put("TOYMD"         , TOYMD.replace("-","").replace(".","").replace("/",""));
        param.put("DAYTIME_SEQ"   , DAYTIME_SEQ);
        param.put("FREQ_KIND"     , FREQ_KIND);
        param.put("MBTYPE"        , MBTYPE);
        param.put("VIEWTYPE"      , VIEWTYPE);
        param.put("USER_ID"       , USER_ID);

        this.log.debug("######################"+SUBLIST);
        if (!SUBLIST.equals("")) {
            ArrayList<String> subList = new ArrayList<String>();
            String temp01[] = SUBLIST.split("\\|");

            for(int i=0;i<temp01.length;i++){
                this.log.debug("######################"+temp01[i]);

                subList.add(temp01[i]);
            }
            if (subList.size() > 0) param.put("SUBLIST",subList);

        }
        this.log.debug("###################### 파라미터 가져오기 ");
        this.log.debug(param.toString());

    }


    public String selectCellTrafficStats(){

        this.log.debug("selectCellTrafficStats Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            //this.param.put("BTS_NM_CMS",BTS_NM_CMS);
            this.log.debug("###################### 데이터 가져오기="+"DownLinkBySTDStats.selectCellTrafficStats");
            this.rows = session.selectList("DownLinkBySTDStats.selectCellTrafficStats",param);
            this.log.debug("###################### 조회완료");
            if(this.rows.size() > 0) {
                this.msg = "조회되었습니다.";
            } else {
                this.msg = "조회결과가 없습니다.";
            }
            this.status = "SUCCESS";
        }catch (Exception e){
            this.msg = "에러가 발생하였습니다. 관리자에게 문의하세요.\n\n" + e.getMessage();
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

        this.log.debug("selectCellTrafficStats End");
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

    public String selectCellTrafficStatsCQIExcelDownload(){

        this.log.debug("selectCellTrafficStatsCQIExcelDownload Start");
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            String searchType = this.SEARCHTYPE;
            log.debug("SEARCHTYPE : " + searchType);

            Workbook wb = new HSSFWorkbook();

            //PDFsheet 만들고
            String sheetName = "CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(PDFsheet, map, searchType, "PDF");

            //CDFsheet 만들고
            sheetName = "CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(CDFsheet, map, searchType, "CDF");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkBySTDStatsCQI(PDF_CDF).xls";

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
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
        }

        this.log.debug("selectCellTrafficStatsCQIExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficStatsCompCQIExcelDownload(){

        this.log.debug("selectCellTrafficStatsCompCQIExcelDownload Start");
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map      = gson.fromJson(this.JSONDATA, type);
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATA2, type);

            log.debug("json data : " + this.JSONDATA);
            log.debug("json data : " + this.JSONDATA2);

            String searchType = this.SEARCHTYPE;
            log.debug("SEARCHTYPE : " + searchType);

            Workbook wb = new HSSFWorkbook();

            String sheetName = "전기간 CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(PDFsheet, map, searchType, "PDF");

            sheetName = "전기간 CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(CDFsheet, map, searchType, "CDF");

            sheetName = "후기간 CQI PDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheetAfter = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(PDFsheetAfter, mapAfter, searchType, "PDF");

            sheetName = "후기간 CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheetAfter = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(CDFsheetAfter, mapAfter, searchType, "CDF");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkBySTDStatsCompCQI(PDF_CDF).xls";

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
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
        }

        this.log.debug("selectCellTrafficStatsCQIExcelDownload End");
        return SUCCESS;
    }

    public void createCellTrafficStatsCQIExcelSheet(Sheet sheet, Map<String, Object> map, String searchType, String type) throws Exception {

        this.log.debug("createCellTrafficStatsCQIExcelSheet Start");

        Row hrow0 = sheet.createRow((short) 0 );
        hrow0.setHeightInPoints(20);
        int a = 0;
        hrow0.createCell(a++).setCellValue("날짜");
        if (searchType.equalsIgnoreCase("BONBU")) {
            hrow0.createCell(a++).setCellValue("본부");
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            hrow0.createCell(a++).setCellValue("본부");
            hrow0.createCell(a++).setCellValue("팀");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow0.createCell(a++).setCellValue("본부");
            hrow0.createCell(a++).setCellValue("팀");
            hrow0.createCell(a++).setCellValue("파트");
        } else if (searchType.equalsIgnoreCase("CITY")) {
            hrow0.createCell(a++).setCellValue("도/특별/광역");
        } else if (searchType.equalsIgnoreCase("시/군/구")) {
            hrow0.createCell(a++).setCellValue("도/특별/광역");
            hrow0.createCell(a++).setCellValue("시/군/구");
        }
        hrow0.createCell(a++).setCellValue("주파수구분");
        hrow0.createCell(a++).setCellValue(type+"#00");
        hrow0.createCell(a++).setCellValue(type+"#01");
        hrow0.createCell(a++).setCellValue(type+"#02");
        hrow0.createCell(a++).setCellValue(type+"#03");
        hrow0.createCell(a++).setCellValue(type+"#04");
        hrow0.createCell(a++).setCellValue(type+"#05");
        hrow0.createCell(a++).setCellValue(type+"#06");
        hrow0.createCell(a++).setCellValue(type+"#07");
        hrow0.createCell(a++).setCellValue(type+"#08");
        hrow0.createCell(a++).setCellValue(type+"#09");
        hrow0.createCell(a++).setCellValue(type+"#10");
        hrow0.createCell(a++).setCellValue(type+"#11");
        hrow0.createCell(a++).setCellValue(type+"#12");
        hrow0.createCell(a++).setCellValue(type+"#13");
        hrow0.createCell(a++).setCellValue(type+"#14");
        hrow0.createCell(a++).setCellValue(type+"#15");

        ArrayList list01 = (ArrayList) map.get("rows");
        Iterator iterator = (Iterator) list01.iterator();
        short i = 1;
        while (iterator.hasNext()){
            StringMap jrow = (StringMap)iterator.next();
            //한줄 만들고 셋팅
            Row row = sheet.createRow((short) i );
            row.setHeightInPoints(20);
            int b = 0;
            row.createCell(b++).setCellValue((String) jrow.get("YMD"));
            if (searchType.equalsIgnoreCase("BONBU")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
            } else if (searchType.equalsIgnoreCase("TEAM")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE02"));
            } else if (searchType.equalsIgnoreCase("PART")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE02"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE03"));
            } else if (searchType.equalsIgnoreCase("CITY")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
            } else if (searchType.equalsIgnoreCase("시/군/구")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE02"));
            }
            row.createCell(b++).setCellValue((String) jrow.get("FREQ_KIND"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_00") ? jrow.get("CQI_"+type+"_00").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_01") ? jrow.get("CQI_"+type+"_01").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_02") ? jrow.get("CQI_"+type+"_02").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_03") ? jrow.get("CQI_"+type+"_03").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_04") ? jrow.get("CQI_"+type+"_04").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_05") ? jrow.get("CQI_"+type+"_05").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_06") ? jrow.get("CQI_"+type+"_06").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_07") ? jrow.get("CQI_"+type+"_07").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_08") ? jrow.get("CQI_"+type+"_08").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_09") ? jrow.get("CQI_"+type+"_09").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_10") ? jrow.get("CQI_"+type+"_10").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_11") ? jrow.get("CQI_"+type+"_11").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_12") ? jrow.get("CQI_"+type+"_12").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_13") ? jrow.get("CQI_"+type+"_13").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_14") ? jrow.get("CQI_"+type+"_14").toString():"0"));
            row.createCell(b++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_"+type+"_15") ? jrow.get("CQI_"+type+"_15").toString():"0"));

            i++;
        }

        this.log.debug("selectCellTrafficStatsCQIExcelDownload End");

    }

    public String selectCellTrafficStatsExcelDownload() {

        this.log.debug("selectCellTrafficStatsExcelDownload Start");
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            String searchType = this.SEARCHTYPE;

            Workbook wb = new HSSFWorkbook();
            CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "data";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);

            //sheet 만들고
            Sheet sheet = wb.createSheet(safeName);

            createCellTrafficStatsExcelSheet(sheet, map, searchType);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkBySTDStatsData.xls";

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
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
        }

        this.log.debug("selectCellTrafficStatsExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficStatsCompExcelDownload() {

        this.log.debug("selectCellTrafficStatsCompExcelDownload Start");
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map      = gson.fromJson(this.JSONDATA, type);
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATA2, type);

            log.debug("json data : " + this.JSONDATA);
            log.debug("json data : " + this.JSONDATA2);

            String searchType = this.SEARCHTYPE;

            Workbook wb = new HSSFWorkbook();
            CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "전기간";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheet = wb.createSheet(safeName);

            createCellTrafficStatsExcelSheet(sheet, map, searchType);

            sheetName = "후기간";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheetAfter = wb.createSheet(safeName);

            createCellTrafficStatsExcelSheet(sheetAfter, mapAfter, searchType);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkBySTDStatsCompData.xls";

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
            e.printStackTrace();
        }finally{
            try { if(fileOut!=null) fileOut.close();}
            catch (IOException e) { e.printStackTrace(); }
        }

        this.log.debug("selectCellTrafficStatsCompExcelDownload End");
        return SUCCESS;
    }

    public void createCellTrafficStatsExcelSheet(Sheet sheet, Map<String, Object> map, String searchType) throws Exception {

        this.log.debug("createCellTrafficStatsExcelSheet Start");

        Row hrow0 = sheet.createRow((short) 0 );
        hrow0.setHeightInPoints(20);
        int a = 0;
        hrow0.createCell(a++).setCellValue("");
        if (searchType.equalsIgnoreCase("BONBU")) {
            hrow0.createCell(a++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            hrow0.createCell(a++).setCellValue("");
            hrow0.createCell(a++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow0.createCell(a++).setCellValue("");
            hrow0.createCell(a++).setCellValue("");
            hrow0.createCell(a++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("CITY")) {
            hrow0.createCell(a++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("시/군/구")) {
            hrow0.createCell(a++).setCellValue("");
            hrow0.createCell(a++).setCellValue("");
        }
        hrow0.createCell(a++).setCellValue("");         //  주파수구분
        hrow0.createCell(a++).setCellValue("");         //   "DL_THRP"
        hrow0.createCell(a++).setCellValue("");         //   "THROUGHPUT"
        hrow0.createCell(a++).setCellValue("");         //   "CQI_AVERAGE"
        hrow0.createCell(a++).setCellValue("");         //   "CQI0_RATE"
        hrow0.createCell(a++).setCellValue("");         //   "RI_RATE"
        hrow0.createCell(a++).setCellValue("");         //   "DL_PRB_RATE"
        hrow0.createCell(a++).setCellValue("RSSI");    //   "RSSI0_PUCCH"
        hrow0.createCell(a++).setCellValue("RSSI");    //   "RSSI1_PUCCH"
        hrow0.createCell(a++).setCellValue("RSSI");    //   "RSSI0_PUSCH"
        hrow0.createCell(a++).setCellValue("RSSI");    //   "RSSI1_PUSCH"
        hrow0.createCell(a++).setCellValue("");        //   "LICENSE_FAIL"

        if (searchType.equalsIgnoreCase("BONBU")) {
            sheet.addMergedRegion(new CellRangeAddress(0,0,9,12));
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            sheet.addMergedRegion(new CellRangeAddress(0,0,10,13));
        } else if (searchType.equalsIgnoreCase("PART")) {
            sheet.addMergedRegion(new CellRangeAddress(0,0,11,14));
        } else if (searchType.equalsIgnoreCase("CITY")) {
            sheet.addMergedRegion(new CellRangeAddress(0,0,9,12));
        } else if (searchType.equalsIgnoreCase("시/군/구")) {
            sheet.addMergedRegion(new CellRangeAddress(0,0,10,13));
        }

        Row hrow1 = sheet.createRow((short) 1 );
        hrow1.setHeightInPoints(20);
        int b = 0;
        hrow1.createCell(b++).setCellValue("");
        if (searchType.equalsIgnoreCase("BONBU")) {
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("CITY")) {
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("시/군/구")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        }
        hrow1.createCell(b++).setCellValue("");
        hrow1.createCell(b++).setCellValue("");       //   "DL_THRP"
        hrow1.createCell(b++).setCellValue("");       //   "THROUGHPUT"
        hrow1.createCell(b++).setCellValue("");         //   "CQI_AVERAGE"
        hrow1.createCell(b++).setCellValue("");         //   "CQI0_RATE"
        hrow1.createCell(b++).setCellValue("");         //   "RI_RATE"
        hrow1.createCell(b++).setCellValue("");         //   "DL_PRB_RATE"
        hrow1.createCell(b++).setCellValue("Total(PUCCH)");                  //   "RSSI0_PUCCH"
        hrow1.createCell(b++).setCellValue("Total(PUCCH)");                  //   "RSSI1_PUCCH"
        hrow1.createCell(b++).setCellValue("Total(PUSCH)");                  //   "RSSI0_PUSCH"
        hrow1.createCell(b++).setCellValue("Total(PUSCH)");                  //   "RSSI1_PUSCH"
        hrow1.createCell(b++).setCellValue("");     //   "LICENSE_FAIL"

        if (searchType.equalsIgnoreCase("BONBU")) {
            sheet.addMergedRegion(new CellRangeAddress(1,1,9,10));
            sheet.addMergedRegion(new CellRangeAddress(1,1,11,12));
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            sheet.addMergedRegion(new CellRangeAddress(1,1,10,11));
            sheet.addMergedRegion(new CellRangeAddress(1,1,12,13));
        } else if (searchType.equalsIgnoreCase("PART")) {
            sheet.addMergedRegion(new CellRangeAddress(1,1,11,12));
            sheet.addMergedRegion(new CellRangeAddress(1,1,13,14));
        } else if (searchType.equalsIgnoreCase("CITY")) {
            sheet.addMergedRegion(new CellRangeAddress(1,1,9,10));
            sheet.addMergedRegion(new CellRangeAddress(1,1,11,12));
        } else if (searchType.equalsIgnoreCase("시/군/구")) {
            sheet.addMergedRegion(new CellRangeAddress(1,1,10,11));
            sheet.addMergedRegion(new CellRangeAddress(1,1,12,13));
        }

        Row hrow2 = sheet.createRow((short) 2 );
        hrow2.setHeightInPoints(20);
        int c = 0;
        hrow2.createCell(c++).setCellValue("날짜");
        if (searchType.equalsIgnoreCase("BONBU")) {
            hrow2.createCell(c++).setCellValue("본부");
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            hrow2.createCell(c++).setCellValue("본부");
            hrow2.createCell(c++).setCellValue("팀");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow2.createCell(c++).setCellValue("본부");
            hrow2.createCell(c++).setCellValue("팀");
            hrow2.createCell(c++).setCellValue("파트");
        } else if (searchType.equalsIgnoreCase("CITY")) {
            hrow2.createCell(c++).setCellValue("도/특별/광역");
        } else if (searchType.equalsIgnoreCase("시/군/구")) {
            hrow2.createCell(c++).setCellValue("도/특별/광역");
            hrow2.createCell(c++).setCellValue("시/군/구");
        }
        hrow2.createCell(c++).setCellValue("주파수구분");
        hrow2.createCell(c++).setCellValue("용량(Mbps)");       //   "DL_THRP"
        hrow2.createCell(c++).setCellValue("기준용량(Mbps)");       //   "THROUGHPUT"
        hrow2.createCell(c++).setCellValue("CQI 평균");         //   "CQI_AVERAGE"
        hrow2.createCell(c++).setCellValue("CQI0 비율 ");         //   "CQI0_RATE"
        hrow2.createCell(c++).setCellValue("RI2 비율");         //   "RI_RATE"
        hrow2.createCell(c++).setCellValue("DL PRB 사용율");         //   "DL_PRB_RATE"
        hrow2.createCell(c++).setCellValue("최번시");                  //   "RSSI0_PUCCH"
        hrow2.createCell(c++).setCellValue("최한시");                  //   "RSSI1_PUCCH"
        hrow2.createCell(c++).setCellValue("최번시");                  //   "RSSI0_PUSCH"
        hrow2.createCell(c++).setCellValue("최한시");                  //   "RSSI1_PUSCH"
        hrow2.createCell(c++).setCellValue("License 초과 실패호");     //   "LICENSE_FAIL"

        ArrayList list01 = (ArrayList) map.get("rows");
        Iterator iterator = (Iterator) list01.iterator();
        short i = 3;
        while (iterator.hasNext()){
            StringMap jrow = (StringMap)iterator.next();
            //한줄 만들고 셋팅
            Row row = sheet.createRow((short) i );
            row.setHeightInPoints(20);
            int d = 0;
            row.createCell(d++).setCellValue((String) jrow.get("YMD"));
            if (searchType.equalsIgnoreCase("BONBU")) {
                row.createCell(d++).setCellValue((String) jrow.get("TITLE01"));
            } else if (searchType.equalsIgnoreCase("TEAM")) {
                row.createCell(d++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(d++).setCellValue((String) jrow.get("TITLE02"));
            } else if (searchType.equalsIgnoreCase("PART")) {
                row.createCell(d++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(d++).setCellValue((String) jrow.get("TITLE02"));
                row.createCell(d++).setCellValue((String) jrow.get("TITLE03"));
            } else if (searchType.equalsIgnoreCase("CITY")) {
                row.createCell(d++).setCellValue((String) jrow.get("TITLE01"));
            } else if (searchType.equalsIgnoreCase("시/군/구")) {
                row.createCell(d++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(d++).setCellValue((String) jrow.get("TITLE02"));
            }
            row.createCell(d++).setCellValue((String) jrow.get("FREQ_KIND"));

            row.createCell(d++).setCellValue(Double.parseDouble(parseKey(jrow,"DL_THRP","0")));
            row.createCell(d++).setCellValue(Double.parseDouble(parseKey(jrow,"THROUGHPUT","0")));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("CQI_AVERAGE") ?jrow.get("CQI_AVERAGE").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("CQI0_RATE") ?jrow.get("CQI0_RATE").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("RI_RATE")?jrow.get("RI_RATE").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("DL_PRB_RATE")?jrow.get("DL_PRB_RATE").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("RSSI0_PUCCH")?jrow.get("RSSI0_PUCCH").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("RSSI1_PUCCH")?jrow.get("RSSI1_PUCCH").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("RSSI0_PUSCH")?jrow.get("RSSI0_PUSCH").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("RSSI1_PUSCH")?jrow.get("RSSI1_PUSCH").toString():"0"));
            row.createCell(d++).setCellValue(Double.parseDouble(jrow.containsKey("LICENSE_FAIL")?jrow.get("LICENSE_FAIL").toString():"0"));
            i++;

        }

        this.log.debug("createCellTrafficStatsExcelSheet End");
    }

}