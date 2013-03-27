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

public class DownLinkByQMSStatsAction extends ActionSupport4lte {
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
    public void setFROMYMD(String FROMYMD) {
        this.FROMYMD = FROMYMD;
    }
    public void setTOYMD(String TOYMD) {
        this.TOYMD = TOYMD;
    }
    public void setFREQ_KIND(String FREQ_KIND) {
        this.FREQ_KIND = FREQ_KIND;
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
    private String FROMYMD        = "";
    private String TOYMD          = "";
    private String FREQ_KIND      = "";
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
        param.put("FROMYMD"       , FROMYMD.replace("-","").replace(".","").replace("/",""));
        param.put("TOYMD"         , TOYMD.replace("-","").replace(".","").replace("/",""));
        param.put("FREQ_KIND"     , FREQ_KIND);
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
            this.log.debug("###################### 데이터 가져오기="+"DownLinkByQMSStats.selectCellTrafficStats");
            this.rows = session.selectList("DownLinkByQMSStats.selectCellTrafficStats",param);
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
            String xlsFileName = "/DownLinkStatsCQI(PDF_CDF)(QMS).xls";

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

//            CellStyle cellStyle = wb.createCellStyle();
//            cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
//            cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
            createCellTrafficStatsExcelSheet(sheet, searchType, map);

            log.debug("selectCellTrafficStatsExcelDownload : file start");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkStatsData(QMS).xls";

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

    public void createCellTrafficStatsExcelSheet(Sheet sheet, String searchType, Map<String, Object> map) throws Exception {

        this.log.debug("createCellTrafficStatsExcelSheet Start");

        //header 만들자
        log.debug("createCellTrafficStatsExcelSheet : hrow start");

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
        hrow0.createCell(a++).setCellValue("주파수구분");            // "FREQ_KIND"
        hrow0.createCell(a++).setCellValue("DL Throughput(Mbps)");  // "DL_TPUT"
        hrow0.createCell(a++).setCellValue("UL Throughput(Mbps)");  // "UL_TPUT"
        hrow0.createCell(a++).setCellValue("CQI 평균");             // "CQI_AVERAGE"
        hrow0.createCell(a++).setCellValue("RI2 비율");             // "RI_RANK_INDEX
        hrow0.createCell(a++).setCellValue("MCS 평균");             // "MCS_AVERAGE"
        hrow0.createCell(a++).setCellValue("RSRP 평균");            // "RSRP_AVERAGE
        hrow0.createCell(a++).setCellValue("RSSI 평균");            // "RSSI_AVERAGE"
        hrow0.createCell(a++).setCellValue("SINR 평균");            // "SINR_AVERAGE"
        hrow0.createCell(a++).setCellValue("RSRQ 평균");            // "RSRQ_AVERAGE"
        hrow0.createCell(a++).setCellValue("PUCCH Tx 평균");        // "TXPW_PUCCH"
        hrow0.createCell(a++).setCellValue("CQI0 비율");            // "CQI0_RATE"
        hrow0.createCell(a++).setCellValue("DL PRB 사용율");        // "DL_PRB_RATE"
        hrow0.createCell(a++).setCellValue("RSSI");                // "RSSI0_PUCCH"
        hrow0.createCell(a++).setCellValue("RSSI");                // "RSSI1_PUCCH"
        hrow0.createCell(a++).setCellValue("RSSI");                // "RSSI0_PUSCH"
        hrow0.createCell(a++).setCellValue("RSSI");                // "RSSI1_PUSCH"
        hrow0.createCell(a++).setCellValue("License 초과 실패호");  // "LICENSE_FAIL"
//        hrow0.createCell(a++).setCellValue("전송로");               // "전송로"
//        hrow0.createCell(a++).setCellValue("전송로");               // "전송로"

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
        } else if (searchType.equalsIgnoreCase("UNI")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("EMS")) {
            hrow1.createCell(b++).setCellValue("");
            hrow1.createCell(b++).setCellValue("");
        }
        hrow1.createCell(b++).setCellValue("");              // "FREQ_KIND"
        hrow1.createCell(b++).setCellValue("");              // "DL_TPUT"
        hrow1.createCell(b++).setCellValue("");              // "UL_TPUT"
        hrow1.createCell(b++).setCellValue("");              // "CQI_AVERAGE"
        hrow1.createCell(b++).setCellValue("");              // "RI_RANK_INDEX
        hrow1.createCell(b++).setCellValue("");              // "MCS_AVERAGE"
        hrow1.createCell(b++).setCellValue("");              // "RSRP_AVERAGE
        hrow1.createCell(b++).setCellValue("");              // "RSSI_AVERAGE"
        hrow1.createCell(b++).setCellValue("");              // "SINR_AVERAGE"
        hrow1.createCell(b++).setCellValue("");              // "RSRQ_AVERAGE"
        hrow1.createCell(b++).setCellValue("");              // "TXPW_PUCCH"
        hrow1.createCell(b++).setCellValue("");              // "CQI0_RATE"
        hrow1.createCell(b++).setCellValue("");              // "DL_PRB_RATE"
        hrow1.createCell(b++).setCellValue("Total(PUCCH)");  // "RSSI0_PUCCH"
        hrow1.createCell(b++).setCellValue("Total(PUCCH)");  // "RSSI1_PUCCH"
        hrow1.createCell(b++).setCellValue("Total(PUSCH)");  // "RSSI0_PUSCH"
        hrow1.createCell(b++).setCellValue("Total(PUSCH)");  // "RSSI1_PUSCH"
        hrow1.createCell(b++).setCellValue("");              // "LICENSE_FAIL"
//        hrow1.createCell(b++).setCellValue("종류");          // "전송로-종류"
//        hrow1.createCell(b++).setCellValue("갯수");          // "전송로-갯수"

        Row hrow2 = sheet.createRow((short) 2 );
        hrow2.setHeightInPoints(20);
        int c = 0;
        hrow2.createCell(c++).setCellValue("");
        if (searchType.equalsIgnoreCase("BONBU")) {
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("TEAM")) {
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("PART")) {
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("CITY")) {
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("UNI")) {
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
        } else if (searchType.equalsIgnoreCase("EMS")) {
            hrow2.createCell(c++).setCellValue("");
            hrow2.createCell(c++).setCellValue("");
        }
        hrow2.createCell(c++).setCellValue("");       // "FREQ_KIND"
        hrow2.createCell(c++).setCellValue("");       // "DL_TPUT"
        hrow2.createCell(c++).setCellValue("");       // "UL_TPUT"
        hrow2.createCell(c++).setCellValue("");       // "CQI_AVERAGE"
        hrow2.createCell(c++).setCellValue("");       // "RI_RANK_INDEX
        hrow2.createCell(c++).setCellValue("");       // "MCS_AVERAGE"
        hrow2.createCell(c++).setCellValue("");       // "RSRP_AVERAGE
        hrow2.createCell(c++).setCellValue("");       // "RSSI_AVERAGE"
        hrow2.createCell(c++).setCellValue("");       // "SINR_AVERAGE"
        hrow2.createCell(c++).setCellValue("");       // "RSRQ_AVERAGE"
        hrow2.createCell(c++).setCellValue("");       // "TXPW_PUCCH"
        hrow2.createCell(c++).setCellValue("");       // "CQI0_RATE"
        hrow2.createCell(c++).setCellValue("");       // "DL_PRB_RATE"
        hrow2.createCell(c++).setCellValue("최번시");  // "RSSI0_PUCCH"
        hrow2.createCell(c++).setCellValue("최한시");  // "RSSI1_PUCCH"
        hrow2.createCell(c++).setCellValue("최번시");  // "RSSI0_PUSCH"
        hrow2.createCell(c++).setCellValue("최한시");  // "RSSI1_PUSCH"
        hrow2.createCell(c++).setCellValue("");       // "LICENSE_FAIL"
//        hrow2.createCell(c++).setCellValue("");       // "전송로-종류"
//        hrow2.createCell(c++).setCellValue("");       // "전송로-갯수"

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
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "FREQ_KIND"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "DL_TPUT"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "UL_TPUT"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "CQI_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "RI_RANK_INDEX
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "MCS_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "RSRP_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "RSSI_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "SINR_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "RSRQ_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "TXPW_PUCCH"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "CQI0_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "DL_PRB_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+3));   // "RSSI"
        sheet.addMergedRegion(new CellRangeAddress(1,1,d,d+1));   // "Total(PUCCH)"
        sheet.addMergedRegion(new CellRangeAddress(1,1,d+2,d+3)); // "Total(PUSCH)"
        d += 4;
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));   // "LICENSE_FAIL"
//        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+1));   // "전송로"
//        sheet.addMergedRegion(new CellRangeAddress(1,2,d,d));     // "전송로-종류"
//        sheet.addMergedRegion(new CellRangeAddress(1,2,d+1,d+1)); // "전송로-갯수"

        log.debug("createCellTrafficStatsExcelSheet : hrow end");

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

            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DL_TPUT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"UL_TPUT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CQI_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RANK_INDEX");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"MCS_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSRP_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"SINR_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSRQ_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"TXPW_PUCCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CQI0_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DL_PRB_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI0_PUCCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI1_PUCCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI0_PUSCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI1_PUSCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"LICENSE_FAIL");
//            row.createCell(e++).setCellValue("n/a");
//            row.createCell(e++).setCellValue("n/a");
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
            String xlsFileName = "/DownLinkStatsHistogram(QMS).xls";

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

}
