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

public class DownLinkByNMSStatsAction extends ActionSupport4lte {
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
    private HashMap adminCriticalValues;
    public HashMap getAdminCriticalValues() {
        return (HashMap)request.getSession().getAttribute("ADMIN_CRITICAL_VALUES");
    }
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

    private String SEARCHTYPE     = "";
    private String BONBU_CD       = "";
    private String OPER_TEAM_CD   = "";
    private String CITY           = "";
    private String MME_GRP_ID     = "";
    private String NE_ID          = "";
    private String TERMTYPE       = "";
    private String FROMYMD        = "";
    private String TOYMD          = "";
    private String DAYTIME_SEQ    = "";
    private String FREQ_KIND      = "";
    private String MBTYPE         = "R3";
    private String VIEWTYPE       = "";
    //For Graph
    private String SUBLIST        = "";
    //For Excel
    private String JSONDATA       = "";
    private String JSONDATA2      = "";


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
            this.log.debug("###################### 데이터 가져오기="+"DownLinkByNMSStats.selectCellTrafficStats");
            this.rows = session.selectList("DownLinkByNMSStats.selectCellTrafficStats",param);
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

    //Double 값들중 있는것만 넣기위함
    public void setCellDoubleIfExistValue(Cell cell, StringMap map, String str){
        if(map.containsKey(str)) cell.setCellValue(Double.parseDouble(map.get(str).toString()));
    }

    public String selectCellTrafficStatsCQIExcelDownload(){

        this.log.debug("selectCellTrafficStatsCQIExcelDownload Start");
        SqlSession session = null;
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


            //PDFsheet
            String sheetName = "CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(PDFsheet, "PDF", searchType, map);

            //CDFsheet
            sheetName = "CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(CDFsheet, "CDF", searchType, map);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsCQI(PDF_CDF)(NMS).xls";

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

        this.log.debug("selectCellTrafficStatsCQIExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficStatsCompCQIExcelDownload(){

        this.log.debug("selectCellTrafficStatsCompCQIExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATA2, type);

            log.debug("json data  : " + this.JSONDATA);
            log.debug("json2 data : " + this.JSONDATA2);


            String searchType = this.SEARCHTYPE;
            log.debug("SEARCHTYPE : " + searchType);


            Workbook wb = new HSSFWorkbook();

            //PDFsheet
            String sheetName = "전기간 CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(PDFsheet, "PDF", searchType, map);

            //CDFsheet
            sheetName = "전기간 CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(CDFsheet, "CDF", searchType, map);

            //PDFsheet
            sheetName = "후기간 CQI PDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheetAfter = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(PDFsheetAfter, "PDF", searchType, mapAfter);

            //CDFsheet
            sheetName = "후기간 CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheetAfter = wb.createSheet(safeName);

            createCellTrafficStatsCQIExcelSheet(CDFsheetAfter, "CDF", searchType, mapAfter);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsCompCQI(PDF_CDF)(NMS).xls";

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

        this.log.debug("selectCellTrafficStatsCompCQIExcelDownload End");
        return SUCCESS;
    }

    public void createCellTrafficStatsCQIExcelSheet(Sheet sheet, String type, String searchType, Map<String, Object> map) throws Exception {

        this.log.debug("createCellTrafficStatsCQIExcelSheet Start");

        //header 만들자
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
        } else if (searchType.equalsIgnoreCase("UNI")) {
            hrow0.createCell(a++).setCellValue("도/특별/광역");
            hrow0.createCell(a++).setCellValue("시/군/구");
        } else if (searchType.equalsIgnoreCase("EMS")) {
            hrow0.createCell(a++).setCellValue("MME GROUP");
            hrow0.createCell(a++).setCellValue("EMS");
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
            if (searchType.equalsIgnoreCase("BONBU") ||
                searchType.equalsIgnoreCase("CITY")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
            } else if (searchType.equalsIgnoreCase("TEAM") ||
                       searchType.equalsIgnoreCase("UNI")  ||
                       searchType.equalsIgnoreCase("EMS")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE02"));
            } else if (searchType.equalsIgnoreCase("PART")) {
                row.createCell(b++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE02"));
                row.createCell(b++).setCellValue((String) jrow.get("TITLE03"));
            }
            row.createCell(b++).setCellValue((String) jrow.get("FREQ_KIND"));
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_00");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_01");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_02");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_03");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_04");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_05");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_06");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_07");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_08");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_09");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_10");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_11");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_12");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_13");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_14");
            setCellDoubleIfExistValue(row.createCell(b++),jrow,"CQI_"+type+"_15");

            i++;
        }

        this.log.debug("selectCellTrafficStatsCQIExcelDownload End");

    }


    public String selectCellTrafficStatsExcelDownload(){

        this.log.debug("selectCellTrafficStatsExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            String searchType = this.SEARCHTYPE;

            Workbook wb = new HSSFWorkbook();
            //CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "data";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);

            //sheet 만들고
            Sheet sheet = wb.createSheet(safeName);

            createCellTrafficStatsExcelSheet(sheet, searchType, map);

            log.debug("selectCellTrafficStatsExcelDownload : file start");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsData(NMS).xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);
            log.debug("selectCellTrafficStatsExcelDownload : file end");

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

        this.log.debug("selectCellTrafficStatsExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficStatsCompExcelDownload(){

        this.log.debug("selectCellTrafficStatsCompExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATA2, type);

            log.debug("json data : " + this.JSONDATA);
            log.debug("json2 data : " + this.JSONDATA2);

            String searchType = this.SEARCHTYPE;

            Workbook wb = new HSSFWorkbook();
            //CreationHelper createHelper = wb.getCreationHelper();

            //sheet 만들고
            String sheetName = "전기간";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheet = wb.createSheet(safeName);

            //전기간 Sheet 생성
            createCellTrafficStatsExcelSheet(sheet, searchType, map);

            //After sheet 만들고
            sheetName = "후기간";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheetAfter = wb.createSheet(safeName);

            //전기간 Sheet 생성
            createCellTrafficStatsExcelSheet(sheetAfter, searchType, mapAfter);

            log.debug("selectCellTrafficStatsExcelDownload : file start");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsCompData(NMS).xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);
            log.debug("selectCellTrafficStatsExcelDownload : file end");

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

        this.log.debug("selectCellTrafficStatsCompExcelDownload End");
        return SUCCESS;
    }

    public void createCellTrafficStatsExcelSheet(Sheet sheet, String searchType, Map<String, Object> map) throws Exception {

        this.log.debug("createCellTrafficStatsExcelSheet Start");

        //header 만들자
        log.debug("createCellTrafficStatsExcelSheet : hrow0 start");
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
        } else if (searchType.equalsIgnoreCase("UNI")) {
            hrow0.createCell(a++).setCellValue("도/특별/광역");
            hrow0.createCell(a++).setCellValue("시/군/구");
        }
        hrow0.createCell(a++).setCellValue("주파수구분");
        hrow0.createCell(a++).setCellValue("용량(Mbps)");           //"용량(Mbps) : THROUGHPUT"
        hrow0.createCell(a++).setCellValue("CQI 평균");             //"CQI 평균 : CQI_AVERAGE"
        hrow0.createCell(a++).setCellValue("CQI0 비율");            //"CQI0 비율 : CQI0_RATE"
        hrow0.createCell(a++).setCellValue("RI2 비율(%)");          //"RI2 비율(%) : RI_RATE"
        hrow0.createCell(a++).setCellValue("DL PRB 사용율(%)");     //"DL PRB 사용율(%) : DL_PRB_RATE"
        hrow0.createCell(a++).setCellValue("MCS 평균");             //"MCS 평균 : MCS_AVERAGE"
        hrow0.createCell(a++).setCellValue("MIMO 비율");            //"MIMO 비율 : MIMO_RATE"
        hrow0.createCell(a++).setCellValue("DL Throughput(Kbps)");  //"DL Throughput(Kbps) : DL_THROUGHPUT"
        hrow0.createCell(a++).setCellValue("License 초과실패호");    //"License 초과실패호 : LICENSE_FAIL"
        hrow0.createCell(a++).setCellValue("OL MIMO 비율(%)");      //"OL MIMO 비율(%) : MIMO_RATE"
        hrow0.createCell(a++).setCellValue("MCS0 비율(%)");         //"MCS0 비율(%) : MCS_AVERAGE"
        hrow0.createCell(a++).setCellValue("RSSI");                //"PUCCH-최번시 : PUCCH_AVG"
        hrow0.createCell(a++).setCellValue("RSSI");                //"PUCCH-최한시 : R2_PUCCH_AVG"
        hrow0.createCell(a++).setCellValue("RSSI");                //"PUSCH-최번시 : PUSCH_AVG"
        hrow0.createCell(a++).setCellValue("RSSI");                //"PUSCH-최한시 : R2_PUSCH_AVG"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-트래픽(MB) : PDCP_DL_MB"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-PRB 사용율(%) : PRB_USG_RATE"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-DRB 사용율(%) : DRB_USG_RATE"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-동접자 : CON_TIME"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-시도호수 : TRY_CCNT"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-접속률(%) : CON_RATE"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-CD율(%) : CDC_RATE"
        hrow0.createCell(a++).setCellValue("데이터 (dBm)");         //"데이터 (dBm)-FA 사용율(%)"
        hrow0.createCell(a++).setCellValue("HD Voice");            //"HD Voice - 트래픽(MB)"
        hrow0.createCell(a++).setCellValue("HD Voice");            //"HD Voice - PRB 사용률(%)"
        hrow0.createCell(a++).setCellValue("HD Voice");            //"HD Voice - 시도호수"
        hrow0.createCell(a++).setCellValue("HD Voice");            //"HD Voice - 점유시간"
        hrow0.createCell(a++).setCellValue("영상통화");             //"영상통화 - 트래픽(MB)"
        hrow0.createCell(a++).setCellValue("영상통화");             //"영상통화 - PRB 사용률(%)"
        hrow0.createCell(a++).setCellValue("영상통화");             //"영상통화 - 시도호수"
        hrow0.createCell(a++).setCellValue("영상통화");             //"영상통화 - 점유시간"
//        hrow0.createCell(a++).setCellValue("전송로");               //"전송로"
//        hrow0.createCell(a++).setCellValue("전송로");               //"전송로"

        log.debug("createCellTrafficStatsExcelSheet : hrow0 end");
        log.debug("createCellTrafficStatsExcelSheet : hrow1 start");
        Row hrow1 = sheet.createRow((short) 1 );
        hrow1.setHeightInPoints(20);
        int b = 0;
        hrow1.createCell(b++).setCellValue("");  //날짜
        if (searchType.equalsIgnoreCase("BONBU") ||
            searchType.equalsIgnoreCase("CITY")) {
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("TEAM") ||
                   searchType.equalsIgnoreCase("UNI")  ||
                   searchType.equalsIgnoreCase("EMS")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        }
        hrow1.createCell(b++).setCellValue("");               //주파수구분
        hrow1.createCell(b++).setCellValue("");               //"용량(Mbps) : THROUGHPUT"
        hrow1.createCell(b++).setCellValue("");               //"CQI 평균 : CQI_AVERAGE"
        hrow1.createCell(b++).setCellValue("");               //"CQI0 비율 : CQI0_RATE"
        hrow1.createCell(b++).setCellValue("");               //"RI2 비율(%) : RI_RATE"
        hrow1.createCell(b++).setCellValue("");               //"DL PRB 사용율(%) : DL_PRB_RATE"
        hrow1.createCell(b++).setCellValue("");               //"MCS 평균 : MCS_AVERAGE"
        hrow1.createCell(b++).setCellValue("");               //"MIMO 비율 : MIMO_RATE"
        hrow1.createCell(b++).setCellValue("");               //"DL Throughput(Kbps) : DL_THROUGHPUT"
        hrow1.createCell(b++).setCellValue("");               //"License 초과실패호 : LICENSE_FAIL"
        hrow1.createCell(b++).setCellValue("");               //"OL MIMO 비율(%) : MIMO_RATE"
        hrow1.createCell(b++).setCellValue("");               //"MCS0 비율(%) : MCS_AVERAGE"
        hrow1.createCell(b++).setCellValue("PUCCH");          //"PUCCH-최번시 : PUCCH_AVG"
        hrow1.createCell(b++).setCellValue("PUCCH");          //"PUCCH-최한시 : R2_PUCCH_AVG"
        hrow1.createCell(b++).setCellValue("PUSCH");          //"PUSCH-최번시 : PUSCH_AVG"
        hrow1.createCell(b++).setCellValue("PUSCH");          //"PUSCH-최한시 : R2_PUSCH_AVG"
        hrow1.createCell(b++).setCellValue("트래픽(MB)");      //"데이터 (dBm)-트래픽(MB) : PDCP_DL_MB"
        hrow1.createCell(b++).setCellValue("PRB 사용율(%)");   //"데이터 (dBm)-PRB 사용율(%) : PRB_USG_RATE"
        hrow1.createCell(b++).setCellValue("DRB 사용율(%)");   //"데이터 (dBm)-DRB 사용율(%) : DRB_USG_RATE"
        hrow1.createCell(b++).setCellValue("동접자");          //"데이터 (dBm)-동접자 : CON_TIME"
        hrow1.createCell(b++).setCellValue("시도호수");        //"데이터 (dBm)-시도호수 : TRY_CCNT"
        hrow1.createCell(b++).setCellValue("접속률(%)");       //"데이터 (dBm)-접속률(%) : CON_RATE"
        hrow1.createCell(b++).setCellValue("CD율(%)");        //"데이터 (dBm)-CD율(%) : CDC_RATE"
        hrow1.createCell(b++).setCellValue("FA 사용율(%)");    //"데이터 (dBm)-FA 사용율(%)"
        hrow1.createCell(b++).setCellValue("트래픽(MB)");      //"HD Voice - 트래픽(MB)"
        hrow1.createCell(b++).setCellValue("PRB 사용률(%)");   //"HD Voice - PRB 사용률(%)"
        hrow1.createCell(b++).setCellValue("시도호수");        //"HD Voice - 시도호수"
        hrow1.createCell(b++).setCellValue("점유시간");        //"HD Voice - 점유시간"
        hrow1.createCell(b++).setCellValue("트래픽(MB)");      //"영상통화 - 트래픽(MB)"
        hrow1.createCell(b++).setCellValue("PRB 사용률(%)");   //"영상통화 - PRB 사용률(%)"
        hrow1.createCell(b++).setCellValue("시도호수");        //"영상통화 - 시도호수"
        hrow1.createCell(b++).setCellValue("점유시간");        //"영상통화 - 점유시간"
//        hrow1.createCell(b++).setCellValue("종류");           //"전송로-종류"
//        hrow1.createCell(b++).setCellValue("갯수");           //"전송로-갯수"

        log.debug("createCellTrafficStatsExcelSheet : hrow1 end");

        log.debug("createCellTrafficStatsExcelSheet : hrow2 start");
        Row hrow2 = sheet.createRow((short) 2 );
        hrow2.setHeightInPoints(20);
        int c = 0;
        hrow2.createCell(c++).setCellValue("");  //날짜
        if (searchType.equalsIgnoreCase("BONBU") ||
            searchType.equalsIgnoreCase("CITY")) {
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("TEAM") ||
                   searchType.equalsIgnoreCase("UNI")  ||
                   searchType.equalsIgnoreCase("EMS")) {
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
        }
        hrow2.createCell(c++).setCellValue("");               //주파수구분
        hrow2.createCell(c++).setCellValue("");               //"용량(Mbps) : THROUGHPUT"
        hrow2.createCell(c++).setCellValue("");               //"CQI 평균 : CQI_AVERAGE"
        hrow2.createCell(c++).setCellValue("");               //"CQI0 비율 : CQI0_RATE"
        hrow2.createCell(c++).setCellValue("");               //"RI2 비율(%) : RI_RATE"
        hrow2.createCell(c++).setCellValue("");               //"DL PRB 사용율(%) : DL_PRB_RATE"
        hrow2.createCell(c++).setCellValue("");               //"MCS 평균 : MCS_AVERAGE"
        hrow2.createCell(c++).setCellValue("");               //"MIMO 비율 : MIMO_RATE"
        hrow2.createCell(c++).setCellValue("");               //"DL Throughput(Kbps) : DL_THROUGHPUT"
        hrow2.createCell(c++).setCellValue("");               //"License 초과실패호 : LICENSE_FAIL"
        hrow2.createCell(c++).setCellValue("");               //"OL MIMO 비율(%) : MIMO_RATE"
        hrow2.createCell(c++).setCellValue("");               //"MCS0 비율(%) : MCS_AVERAGE"
        hrow2.createCell(c++).setCellValue("최번시");          //"PUCCH-최번시 : PUCCH_AVG"
        hrow2.createCell(c++).setCellValue("최한시");          //"PUCCH-최한시 : R2_PUCCH_AVG"
        hrow2.createCell(c++).setCellValue("최번시");          //"PUSCH-최번시 : PUSCH_AVG"
        hrow2.createCell(c++).setCellValue("최한시");          //"PUSCH-최한시 : R2_PUSCH_AVG"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-트래픽(MB) : PDCP_DL_MB"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-PRB 사용율(%) : PRB_USG_RATE"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-DRB 사용율(%) : DRB_USG_RATE"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-동접자 : CON_TIME"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-시도호수 : TRY_CCNT"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-접속률(%) : CON_RATE"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-CD율(%) : CDC_RATE"
        hrow2.createCell(c++).setCellValue("");               //"데이터 (dBm)-FA 사용율(%)"
        hrow2.createCell(c++).setCellValue("");               //"HD Voice - 트래픽(MB)"
        hrow2.createCell(c++).setCellValue("");               //"HD Voice - PRB 사용률(%)"
        hrow2.createCell(c++).setCellValue("");               //"HD Voice - 시도호수"
        hrow2.createCell(c++).setCellValue("");               //"HD Voice - 점유시간"
        hrow2.createCell(c++).setCellValue("");               //"영상통화 - 트래픽(MB)"
        hrow2.createCell(c++).setCellValue("");               //"영상통화 - PRB 사용률(%)"
        hrow2.createCell(c++).setCellValue("");               //"영상통화 - 시도호수"
        hrow2.createCell(c++).setCellValue("");               //"영상통화 - 점유시간"
//        hrow2.createCell(c++).setCellValue("");               //"전송로-종류"
//        hrow2.createCell(c++).setCellValue("");               //"전송로-갯수"

        int d = 0;
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "날짜"
        if (searchType.equalsIgnoreCase("BONBU") ||
            searchType.equalsIgnoreCase("CITY")) {
            sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));
        } else if (searchType.equalsIgnoreCase("TEAM") ||
                   searchType.equalsIgnoreCase("UNI")  ||
                   searchType.equalsIgnoreCase("EMS")) {
            sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));
            sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));
        } else if (searchType.equalsIgnoreCase("PART")) {
            sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));
            sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));
            sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));
        }
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //주파수구분
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"용량(Mbps) : THROUGHPUT"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"CQI 평균 : CQI_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"CQI0 비율 : CQI0_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"RI2 비율(%) : RI_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"DL PRB 사용율(%) : DL_PRB_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"MCS 평균 : MCS_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"MIMO 비율 : MIMO_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"DL Throughput(Kbps) : DL_THROUGHPUT"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"License 초과실패호 : LICENSE_FAIL"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"OL MIMO 비율(%) : MIMO_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   //"MCS0 비율(%) : MCS_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+3));   //"RSSI"
        sheet.addMergedRegion(new CellRangeAddress(1,1,d,d+1));   //"Total(PUCCH)"
        sheet.addMergedRegion(new CellRangeAddress(1,1,d+2,d+3)); // "Total(PUSCH)"
        d += 4;
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+7));   //"데이터 (dBm)"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d,d));     //"데이터 (dBm)-트래픽(MB) : PDCP_DL_MB"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+1,d+1)); //"데이터 (dBm)-PRB 사용율(%) : PRB_USG_RATE"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+2,d+2)); //"데이터 (dBm)-DRB 사용율(%) : DRB_USG_RATE"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+3,d+3)); //"데이터 (dBm)-동접자 : CON_TIME"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+4,d+4)); //"데이터 (dBm)-시도호수 : TRY_CCNT"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+5,d+5)); //"데이터 (dBm)-접속률(%) : CON_RATE"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+6,d+6)); //"데이터 (dBm)-CD율(%) : CDC_RATE"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+7,d+7)); //"데이터 (dBm)-FA 사용율(%)"
        d += 8;
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+3));   //"HD Voice"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d,d));     //"HD Voice - 트래픽(MB)"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+1,d+1)); //"HD Voice - PRB 사용률(%)"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+2,d+2)); //"HD Voice - 시도호수"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+3,d+3)); //"HD Voice - 점유시간"
        d += 4;
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+3));   //"영상통화"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d,d));     //"영상통화 - 트래픽(MB)"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+1,d+1)); //"영상통화 - PRB 사용률(%)"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+2,d+2)); //"영상통화 - 시도호수"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+3,d+3)); //"영상통화 - 점유시간"
        d += 4;
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+1));   // "전송로"
//        sheet.addMergedRegion(new CellRangeAddress(1,2,d,d));     // "전송로-종류"
//        sheet.addMergedRegion(new CellRangeAddress(1,2,d+1,d+1)); // "전송로-갯수"

        log.debug("createCellTrafficStatsExcelSheet : hrow2 end");

        log.debug("createCellTrafficStatsExcelSheet : row start");
        ArrayList list01 = (ArrayList) map.get("rows");
        Iterator iterator = (Iterator) list01.iterator();
        short i = 3;
        while (iterator.hasNext()) {
            StringMap jrow = (StringMap)iterator.next();
            //한줄 만들고 셋팅
            Row row = sheet.createRow((short) i );
            row.setHeightInPoints(20);
            int e = 0;
            row.createCell(e++).setCellValue((String) jrow.get("YMD"));
            if (searchType.equalsIgnoreCase("BONBU") ||
                searchType.equalsIgnoreCase("CITY")) {
                row.createCell(e++).setCellValue((String) jrow.get("TITLE01"));
            } else if (searchType.equalsIgnoreCase("TEAM") ||
                       searchType.equalsIgnoreCase("UNI")  ||
                       searchType.equalsIgnoreCase("EMS")) {
                row.createCell(e++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(e++).setCellValue((String) jrow.get("TITLE02"));
            } else if (searchType.equalsIgnoreCase("PART")) {
                row.createCell(e++).setCellValue((String) jrow.get("TITLE01"));
                row.createCell(e++).setCellValue((String) jrow.get("TITLE02"));
                row.createCell(e++).setCellValue((String) jrow.get("TITLE03"));
            }
            row.createCell(e++).setCellValue((String) jrow.get("FREQ_KIND"));

            setCellDoubleIfExistValue(row.createCell(e++),jrow,"THROUGHPUT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CQI_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CQI0_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RI_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DL_PRB_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"MCS_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"MIMO_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DL_THROUGHPUT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"LICENSE_FAIL");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"MIMO_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"MCS_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"PUCCH_AVG");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"R2_PUCCH_AVG");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"PUSCH_AVG");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"R2_PUSCH_AVG");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"PDCP_DL_MB");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"PRB_USG_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DRB_USG_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CON_TIME");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"TRY_CCNT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CON_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CDC_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DL_FA_USG_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"VOICE_DL_MB");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"VOICE_DL_PRB");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"VOICE_TRY_CCNT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"VOICE_TIME");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"IMAGE_DL_MB");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"IMAGE_DL_PRB");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"IMAGE_TRY_CCNT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"IMAGE_TIME");
//전송로            row.createCell(e++).setCellValue("n/a");
//전송로            row.createCell(e++).setCellValue("n/a");
            i++;
        }

        log.debug("createCellTrafficStatsExcelSheet : row end");

        this.log.debug("createCellTrafficStatsExcelSheet End");

    }

    public String selectCellTrafficStatsHistogramExcelDownload(){

        this.log.debug("selectCellTrafficStatsHistogramExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            Workbook wb = new HSSFWorkbook();
            //CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = this.FROMYMD+"~"+this.TOYMD;
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);

            //sheet 만들고
            Sheet sheet = wb.createSheet(safeName);

            //header 만들자
            Row hrow0 = sheet.createRow((short) 0 );
            hrow0.setHeightInPoints(20);
            hrow0.createCell(0).setCellValue("MBPS");
            hrow0.createCell(1).setCellValue("COUNT");
            hrow0.createCell(2).setCellValue("분포도");
            hrow0.createCell(3).setCellValue("CDF");

            StringMap categoryVal = (StringMap) map.get("categoryVal");
            StringMap rVal = (StringMap) map.get("rVal");
            StringMap rate = (StringMap) map.get("rate");
            StringMap cdf = (StringMap) map.get("cdf");

            short i = 1;
            for (int j=0; j<10; j++) {
                //한줄 만들고 셋팅
                Row row = sheet.createRow((short) i );
                row.setHeightInPoints(20);
                row.createCell(0).setCellValue(Double.parseDouble(categoryVal.get(String.valueOf(j)).toString()));
                row.createCell(1).setCellValue(Double.parseDouble(rVal.get(String.valueOf(j)).toString()));
                row.createCell(2).setCellValue(Double.parseDouble(rate.get(String.valueOf(j)).toString()));
                row.createCell(3).setCellValue(Double.parseDouble(cdf.get(String.valueOf(j)).toString()));
                i++;
            }

            log.debug("selectCellTrafficStatsHistogramExcelDownload : file start");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsHistogram(NMS).xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);
            log.debug("selectCellTrafficStatsHistogramExcelDownload : file end");

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

        this.log.debug("selectCellTrafficStatsHistogramExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficStatsThrpCompGraphExcelDownload(){

        this.log.debug("selectCellTrafficStatsThrpCompGraphExcelDownload Start");
        SqlSession session = null;
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            Workbook wb = new HSSFWorkbook();
            //CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "용량 전후비교";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);

            //sheet 만들고
            Sheet sheet = wb.createSheet(safeName);

            //header 만들자
            Row hrow0 = sheet.createRow((short) 0 );
            hrow0.setHeightInPoints(20);
            hrow0.createCell(0).setCellValue("");
            hrow0.createCell(1).setCellValue("전("+this.FROMYMD+")");
            hrow0.createCell(2).setCellValue("후("+this.TOYMD+")");

            StringMap categories   = (StringMap) map.get("categories");
            StringMap beforeSeries = (StringMap) map.get("beforeSeries");
            StringMap afterSeries  = (StringMap) map.get("afterSeries");

            short i = 1;
            for (int j=0; j<categories.size(); j++) {
                //한줄 만들고 셋팅
                Row row = sheet.createRow((short) i );
                row.setHeightInPoints(20);
                row.createCell(0).setCellValue(categories.get(String.valueOf(j)).toString().replaceAll("<br>"," : "));
                row.createCell(1).setCellValue(Double.parseDouble(beforeSeries.get(String.valueOf(j)).toString()));
                row.createCell(2).setCellValue(Double.parseDouble(afterSeries.get(String.valueOf(j)).toString()));
                i++;
            }

            log.debug("selectCellTrafficStatsThrpCompGraphExcelDownload : file start");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsThrpCompGraph(NMS).xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);
            log.debug("selectCellTrafficStatsThrpCompGraphExcelDownload : file end");

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

        this.log.debug("selectCellTrafficStatsThrpCompGraphExcelDownload End");
        return SUCCESS;
    }

}
