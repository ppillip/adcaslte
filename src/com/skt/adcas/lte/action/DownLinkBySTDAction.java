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

public class DownLinkBySTDAction extends ActionSupport4lte {
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

    public void setWORKGROUP_YN(String WORKGROUP_YN) {
        this.WORKGROUP_YN = WORKGROUP_YN;
    }

    public void setCELLGROUP_YN(String CELLGROUP_YN) {
        this.CELLGROUP_YN = CELLGROUP_YN;
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
    public void setJSONDATA2(String JSONDATA2) {
        this.JSONDATA2 = JSONDATA2;
    }

    private String WORKGROUP_ID   = "";
    private String TERMTYPE       = "";
    private String DAYTIME_SEQ    = "";
    private String VIEWTYPE       = "";
    private String FREQ_KIND      = "";
    private String WORKGROUP_YN   = "N";
    private String CELLGROUP_YN   = "N";
    private String FROMYMD         = "";
    private String TOYMD           = "";
    private String MBTYPE          = "";
    private String DUIDs           = "";
    private String MFC_CD          = "";
    private String JSONDATA        = "";
    private String JSONDATA2       = "";


    private void parseParam() throws Exception {

        String USER_ID = (String)request.getSession().getAttribute("USER_ID");//"qcas"; //to do 추후 session 처리 합니다.

        if (!isLocalHost()) {
            if(isNull(USER_ID).equals("")){
                throw new Exception("세션이 만료 되었습니다");
            }
        } else {
            if(isNull(USER_ID).equals("")){
                USER_ID = "qcas";
            }
        }

        param.put("WORKGROUP_ID" , WORKGROUP_ID  );
        param.put("TERMTYPE"      , TERMTYPE      );
        param.put("DAYTIME_SEQ"   , DAYTIME_SEQ   );
        param.put("VIEWTYPE"      , VIEWTYPE      );
        param.put("FREQ_KIND"     , FREQ_KIND     );
        param.put("WORKGROUP_YN" , WORKGROUP_YN  );
        param.put("CELLGROUP_YN" , CELLGROUP_YN  );
        param.put("FROMYMD"       , FROMYMD.replace("-","").replace(".","").replace("/","")  );
        param.put("TOYMD"         , TOYMD.replace("-","").replace(".","").replace("/","")  );
        param.put("USER_ID"       ,  USER_ID  );
        param.put("MBTYPE"       ,  MBTYPE  );
        param.put("MFC_CD"       ,  MFC_CD  );
        ArrayList<String> alist = new ArrayList<String>();
        String temp01[] = DUIDs.split("\\|");

        for(int i=0;i<temp01.length;i++){
            System.out.println(temp01[i]);

            alist.add(temp01[i]);
        }
        param.put("DUIDs",alist);

        this.log.debug("###################### 파라미터 가져오기 ");
        this.log.debug(param.toString());

    }


    public String selectCellTraffic(){

        this.log.debug("selectCellTraffic Start");
        SqlSession session = null;

        try{
            parseParam();

            session = SqlSessionManager.getSqlSession().openSession();

            //this.param.put("BTS_NM_CMS",BTS_NM_CMS);
            this.log.debug("###################### 데이터 가져오는중="+"DownLinkBySTD.selectCellTraffic"+VIEWTYPE);
            this.rows = session.selectList("DownLinkBySTD.selectCellTraffic"+VIEWTYPE,param);
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

        this.log.debug("selectCellTraffic End");
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

    public String selectCellTrafficCQIExcelDownload() {

        this.log.debug("selectCellTrafficCQIExcelDownload Start");

        FileOutputStream fileOut = null;

        try{
            parseParam();

            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            Workbook wb = new HSSFWorkbook();

            //PDFsheet 만들고
            String sheetName = "CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);

            createCellTrafficCQIExcelSheet(PDFsheet, "PDF", map);

            //CDFsheet 만들고
            sheetName = "CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            createCellTrafficCQIExcelSheet(CDFsheet, "CDF", map);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkCQI(PDF_CDF)(STD).xls";

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

        this.log.debug("selectCellTrafficCQIExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficCompCQIExcelDownload() {

        this.log.debug("selectCellTrafficCompCQIExcelDownload Start");

        FileOutputStream fileOut = null;

        try{
            parseParam();

            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map      = gson.fromJson(this.JSONDATA, type);
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATA2, type);

            Workbook wb = new HSSFWorkbook();

            String sheetName = "전기간 CQI PDF";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheet = wb.createSheet(safeName);

            createCellTrafficCQIExcelSheet(PDFsheet, "PDF", map);

            sheetName = "전기간 CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheet = wb.createSheet(safeName);

            createCellTrafficCQIExcelSheet(CDFsheet, "CDF", map);

            sheetName = "후기간 CQI PDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet PDFsheetAfter = wb.createSheet(safeName);

            createCellTrafficCQIExcelSheet(PDFsheetAfter, "PDF", mapAfter);

            sheetName = "후기간 CQI CDF";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet CDFsheetAfter = wb.createSheet(safeName);

            createCellTrafficCQIExcelSheet(CDFsheetAfter, "CDF", mapAfter);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkCompCQI(PDF_CDF)(STD).xls";

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

        this.log.debug("selectCellTrafficCompCQIExcelDownload End");
        return SUCCESS;
    }

    public void createCellTrafficCQIExcelSheet(Sheet sheet, String type, Map<String, Object> map) throws Exception {

        this.log.debug("createCellTrafficCQIExcelSheet Start");

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
                CQINAME[11] = "12";
                CQINAME[12] = "13";
                CQINAME[13] = "14";
                CQINAME[14] = "15";
                CQINAME[15] = "16";
            }

            //header 만들자
            Row hrow0 = sheet.createRow((short) 0 );
            hrow0.setHeightInPoints(20);
            int a = 0;
            hrow0.createCell(a++).setCellValue("날짜");                 // "YMD"
            hrow0.createCell(a++).setCellValue("DU명");                 // "BTS_NM"
            hrow0.createCell(a++).setCellValue("CELL ID");             // "CELL_ID"
            hrow0.createCell(a++).setCellValue("CELL 명");             //  "CELL_NM"
            hrow0.createCell(a++).setCellValue("MCID");                 //  "MCID"
            hrow0.createCell(a++).setCellValue("주파수구분");           //  "FREQ_KIND"
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[0]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[1]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[2]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[3]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[4]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[5]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[6]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[7]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[8]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[9]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[10]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[11]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[12]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[13]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[14]);
            hrow0.createCell(a++).setCellValue(type+"-"+CQINAME[15]);

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
                row.createCell(b++).setCellValue((String) jrow.get("BTS_NM"));
                row.createCell(b++).setCellValue((String) jrow.get("CELL_ID"));
                row.createCell(b++).setCellValue((String) jrow.get("CELL_NM"));
                row.createCell(b++).setCellValue((String) jrow.get("MCID"));
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


        this.log.debug("createCellTrafficCQIExcelSheet End");

    }

    public String selectCellTrafficExcelDownload() {

        this.log.debug("selectCellTrafficExcelDownload Start");
        FileOutputStream fileOut = null;

        try{
            //parseParam();
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map = gson.fromJson(this.JSONDATA, type);

            log.debug("json data : " + this.JSONDATA);

            Workbook wb = new HSSFWorkbook();
            //CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "data";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheet = wb.createSheet(safeName);

            createCellTrafficExcelSheet(sheet, map);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkData(STD).xls";

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

        this.log.debug("selectCellTrafficExcelDownload End");
        return SUCCESS;
    }

    public String selectCellTrafficCompExcelDownload() {

        this.log.debug("selectCellTrafficCompExcelDownload Start");
        FileOutputStream fileOut = null;

        try{

            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Gson gson = new Gson();
            Map<String, Object> map      = gson.fromJson(this.JSONDATA, type);
            Map<String, Object> mapAfter = gson.fromJson(this.JSONDATA2, type);

            log.debug("json data : " + this.JSONDATA);
            log.debug("json data : " + this.JSONDATA2);

            Workbook wb = new HSSFWorkbook();
            //CreationHelper createHelper = wb.getCreationHelper();

            String sheetName = "전기간";
            String safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheet = wb.createSheet(safeName);

            createCellTrafficExcelSheet(sheet, map);

            sheetName = "후기간";
            safeName = WorkbookUtil.createSafeSheetName(sheetName);
            Sheet sheetAfter = wb.createSheet(safeName);

            createCellTrafficExcelSheet(sheetAfter, mapAfter);

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkCompData(STD).xls";

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

        this.log.debug("selectCellTrafficCompExcelDownload End");
        return SUCCESS;
    }

    public void createCellTrafficExcelSheet(Sheet sheet, Map<String, Object> map) throws Exception {

        this.log.debug("createCellTrafficExcelSheet Start");

        Row hrow0 = sheet.createRow((short) 0 );
        hrow0.setHeightInPoints(20);
        int a = 0;
        hrow0.createCell(a++).setCellValue("날짜");                // "YMD"
        hrow0.createCell(a++).setCellValue("DU명");                // "BTS_NM"
        hrow0.createCell(a++).setCellValue("CELL ID");             // "CELL_ID"
        hrow0.createCell(a++).setCellValue("CELL 명");             // "CELL_NM"
        hrow0.createCell(a++).setCellValue("MCID");               // "MCID"
        hrow0.createCell(a++).setCellValue("주파수구분");           // "FREQ_KIND"
        hrow0.createCell(a++).setCellValue("기준용량(Mbps)");      // "THROUGHPUT"
        hrow0.createCell(a++).setCellValue("CQI 평균");            // "CQI_AVERAGE"
        hrow0.createCell(a++).setCellValue("CQI0 비율 ");          // "CQI0_RATE"
        hrow0.createCell(a++).setCellValue("RI2 비율");            // "RI_RATE"
        hrow0.createCell(a++).setCellValue("DL PRB 사용율");       // "DL_PRB_RATE"
        hrow0.createCell(a++).setCellValue("RSSI");               // "RSSI0_PUCCH"
        hrow0.createCell(a++).setCellValue("RSSI");               // "RSSI1_PUCCH"
        hrow0.createCell(a++).setCellValue("RSSI");               // "RSSI0_PUSCH"
        hrow0.createCell(a++).setCellValue("RSSI");               // "RSSI1_PUSCH"
        hrow0.createCell(a++).setCellValue("License 초과 실패호"); // "LICENSE_FAIL"
        hrow0.createCell(a++).setCellValue("전송로");             // "전송로"
        hrow0.createCell(a++).setCellValue("전송로");             // "전송로"

        Row hrow1 = sheet.createRow((short) 1 );
        hrow1.setHeightInPoints(20);
        int b = 0;
        hrow1.createCell(b++).setCellValue("");              // "YMD"
        hrow1.createCell(b++).setCellValue("");              // "BTS_NM"
        hrow1.createCell(b++).setCellValue("");              // "CELL_ID"
        hrow1.createCell(b++).setCellValue("");              // "CELL_NM"
        hrow1.createCell(b++).setCellValue("");              // "MCID"
        hrow1.createCell(b++).setCellValue("");              // "FREQ_KIND"
        hrow1.createCell(b++).setCellValue("");              // "THROUGHPUT"
        hrow1.createCell(b++).setCellValue("");              // "CQI_AVERAGE"
        hrow1.createCell(b++).setCellValue("");              // "CQI0_RATE"
        hrow1.createCell(b++).setCellValue("");              // "RI_RATE"
        hrow1.createCell(b++).setCellValue("");              // "DL_PRB_RATE"
        hrow1.createCell(b++).setCellValue("Total(PUCCH)");  // "SI0_PUCCH"
        hrow1.createCell(b++).setCellValue("Total(PUCCH)");  // "SI1_PUCCH"
        hrow1.createCell(b++).setCellValue("Total(PUSCH)");  // "SI0_PUSCH"
        hrow1.createCell(b++).setCellValue("Total(PUSCH)");  // "SI1_PUSCH"
        hrow1.createCell(b++).setCellValue("");              // "LICENSE_FAIL"
        hrow1.createCell(b++).setCellValue("종류");          // "전송로-종류"
        hrow1.createCell(b++).setCellValue("갯수");          // "전송로-갯수"

        Row hrow2 = sheet.createRow((short) 2 );
        hrow2.setHeightInPoints(20);
        int c = 0;
        hrow2.createCell(c++).setCellValue("");       // "YMD"
        hrow2.createCell(c++).setCellValue("");       // "BTS_NM"
        hrow2.createCell(c++).setCellValue("");       // "CELL_ID"
        hrow2.createCell(c++).setCellValue("");       // "CELL_NM"
        hrow2.createCell(c++).setCellValue("");       // "MCID"
        hrow2.createCell(c++).setCellValue("");       // "FREQ_KIND"
        hrow2.createCell(c++).setCellValue("");       // "THROUGHPUT"
        hrow2.createCell(c++).setCellValue("");       // "CQI_AVERAGE"
        hrow2.createCell(c++).setCellValue("");       // "CQI0_RATE"
        hrow2.createCell(c++).setCellValue("");       // "RI_RATE"
        hrow2.createCell(c++).setCellValue("");       // "DL_PRB_RATE"
        hrow2.createCell(c++).setCellValue("최번시");  //  "RI0_PUCCH"
        hrow2.createCell(c++).setCellValue("최한시");  //  "RI1_PUCCH"
        hrow2.createCell(c++).setCellValue("최번시");  //  "RI0_PUSCH"
        hrow2.createCell(c++).setCellValue("최한시");  //  "RI1_PUSCH"
        hrow2.createCell(c++).setCellValue("");       // "LICENSE_FAIL"
        hrow2.createCell(c++).setCellValue("");       // "전송로-종류"
        hrow2.createCell(c++).setCellValue("");       // "전송로-갯수"

        int d = 0;
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "YMD"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "BTS_NM"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "CELL_ID"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "CELL_NM"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "MCID"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "FREQ_KIND"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "THROUGHPUT"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "CQI_AVERAGE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "CQI0_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "RI_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "DL_PRB_RATE"
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+3));    // "RSSI"
        sheet.addMergedRegion(new CellRangeAddress(1,1,d,d+1));    // "Total(PUCCH)"
        sheet.addMergedRegion(new CellRangeAddress(1,1,d+2,d+3));  // "Total(PUSCH)"
        d += 4;
        sheet.addMergedRegion(new CellRangeAddress(0,2,d,d++));    // "LICENSE_FAIL"
        sheet.addMergedRegion(new CellRangeAddress(0,0,d,d+1));    // "전송로"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d,d));      // "전송로-종류"
        sheet.addMergedRegion(new CellRangeAddress(1,2,d+1,d+1));  // "전송로-갯수"


        ArrayList list01 = (ArrayList) map.get("rows");
        Iterator iterator = (Iterator) list01.iterator();
        short i = 3;
        while (iterator.hasNext()){
            StringMap jrow = (StringMap)iterator.next();
            //한줄 만들고 셋팅
            Row row = sheet.createRow((short) i );
            row.setHeightInPoints(20);
            int e = 0;
            row.createCell(e++).setCellValue((String) jrow.get("YMD"));
            row.createCell(e++).setCellValue((String) jrow.get("BTS_NM"));
            row.createCell(e++).setCellValue((String) jrow.get("CELL_ID"));
            row.createCell(e++).setCellValue((String) jrow.get("CELL_NM"));
            row.createCell(e++).setCellValue((String) jrow.get("MCID"));
            row.createCell(e++).setCellValue((String) jrow.get("FREQ_KIND"));

            setCellDoubleIfExistValue(row.createCell(e++),jrow,"THROUGHPUT");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CQI_AVERAGE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CQI0_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RI_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"DL_PRB_RATE");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI0_PUCCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI1_PUCCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI0_PUSCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"RSSI1_PUSCH");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"LICENSE_FAIL");
            row.createCell(e++).setCellValue((String) jrow.get("CHNL_TYPE") ); // 전송로 종류");
            setCellDoubleIfExistValue(row.createCell(e++),jrow,"CHNL_COUNT");  // 전송로 갯수");

            i++;

        }

        this.log.debug("createCellTrafficExcelSheet End");

    }

    public String selectCellTrafficThrpCompGraphExcelDownload(){

        this.log.debug("selectCellTrafficThrpCompGraphExcelDownload Start");
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

            String sheetName = "기준용량 전후비교";
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

            log.debug("selectCellTrafficThrpCompGraphExcelDownload : file start");

            String writeFolderPath = (String) super.properties.get("TEMP_FOLDER_PATH");
            String tempFolder = "/" + UUID.randomUUID().toString();
            String xlsFileName = "/DownLinkThrpCompGraph(STD).xls";

            if(!(new File(writeFolderPath + tempFolder)).mkdir() ){
                throw new Exception("엑셀파일 생성에 실패 하였습니다.");
            }

            String xlsFileFullPath = writeFolderPath + tempFolder + xlsFileName ;
            fileOut = new FileOutputStream(xlsFileFullPath);
            wb.write(fileOut);
            log.debug("selectCellTrafficThrpCompGraphExcelDownload : file end");

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

        this.log.debug("selectCellTrafficThrpCompGraphExcelDownload End");
        return SUCCESS;
    }

}
