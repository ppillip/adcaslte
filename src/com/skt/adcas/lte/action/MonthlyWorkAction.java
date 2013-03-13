package com.skt.adcas.lte.action;

import com.google.gson.Gson;
import com.google.gson.internal.StringMap;
import com.google.gson.reflect.TypeToken;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.WorkbookUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;

public class MonthlyWorkAction extends ActionSupport4lte{
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



    private String WORKGROUP_ID   = "";
    private String TERMTYPE       = "";
    private String DAYTIME_SEQ    = "";
    private String VIEWTYPE       = "";
    private String FREQ_KIND      = "";
    private String WORKGROUP_YN   = "N";
    private String CELLGROUP_YN   ="N";
    private String FROMYMD         = "";
    private String TOYMD           = "";
    private String MBTYPE           = "R3";
    private String DUIDs = "";
    private String MFC_CD = "";
    private String JSONDATA = "";


    private void parseParam() throws Exception {

        String USER_ID = (String)request.getSession().getAttribute("USER_ID");//"qcas"; //to do 추후 session 처리 합니다.


        if (!isLocalHost()) {
                throw new Exception("접근불가");
        }


        /*★★★★★★★★★★★★★★★★★★★★★★★★★★★*/
        /*★★★★★★★★★★★★★★★★★★★★★★★★★★★*/
        /*★★★★★★★★ 여기고쳐 바로 실행 ★★★★★★★★★*/
        /*★★★★★★★★★★★★★★★★★★★★★★★★★★★*/
        /*★★★★★★★★★★★★★★★★★★★★★★★★★★★*/
        param.put("YM","201303");



        System.out.println(param.toString());

    }


    public String createMonthlyTable(){

        this.log.debug("selectDailyCellTraffic Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();



            this.log.debug("###################### CALL_TRAFFIC_01 ");
            session.insert("MonthlyWork.CALL_TRAFFIC_01",param);

            this.log.debug("###################### CALL_TRAFFIC_02 ");
            session.insert("MonthlyWork.CALL_TRAFFIC_02",param);

            this.log.debug("###################### CALL_TRAFFIC_03 ");
            session.insert("MonthlyWork.CALL_TRAFFIC_03",param);

            this.log.debug("###################### CALL_TRAFFIC_04 ");
            session.insert("MonthlyWork.CALL_TRAFFIC_04",param);



            this.log.debug("###################### HSDPA_MID_01 ");
            session.insert("MonthlyWork.HSDPA_MID_01",param);

            this.log.debug("###################### HSDPA_MID_02 ");
            session.insert("MonthlyWork.HSDPA_MID_02",param);

            this.log.debug("###################### HSDPA_MID_03 ");
            session.insert("MonthlyWork.HSDPA_MID_03",param);

            this.log.debug("###################### HSDPA_MID_04 ");
            session.insert("MonthlyWork.HSDPA_MID_04",param);



            this.log.debug("###################### PS_NTDATATHRPCELL50_DAY_01 ");
            session.insert("MonthlyWork.PS_NTDATATHRPCELL50_DAY_01",param);

            this.log.debug("###################### PS_NTDATATHRPCELL50_DAY_02 ");
            session.insert("MonthlyWork.PS_NTDATATHRPCELL50_DAY_02",param);

            this.log.debug("###################### PS_NTDATATHRPCELL50_DAY_03 ");
            session.insert("MonthlyWork.PS_NTDATATHRPCELL50_DAY_03",param);



            this.log.debug("###################### QC_API_01 ");
            session.insert("MonthlyWork.QC_API_01",param);

            this.log.debug("###################### QC_API_02 ");
            session.insert("MonthlyWork.QC_API_02",param);

            this.log.debug("###################### QC_API_03 ");
            session.insert("MonthlyWork.QC_API_03",param);



            this.log.debug("###################### RC_RPT_BAS_HIS_01");
            session.insert("MonthlyWork.RC_RPT_BAS_HIS_01",param);

            this.log.debug("###################### RC_RPT_BAS_HIS_02");
            session.insert("MonthlyWork.RC_RPT_BAS_HIS_02",param);




            this.log.debug("###################### PS_DATATHRP220_DAY_01 ");
            session.insert("MonthlyWork.PS_DATATHRP220_DAY_01",param);

            this.log.debug("###################### PS_DATATHRP220_DAY_02 ");
            session.insert("MonthlyWork.PS_DATATHRP220_DAY_02",param);

            this.log.debug("###################### PS_DATATHRP220_DAY_03 ");
            session.insert("MonthlyWork.PS_DATATHRP220_DAY_03",param);



            this.log.debug("###################### PS_CHELEM200_DAY_01 ");
            session.insert("MonthlyWork.PS_CHELEM200_DAY_01",param);

            this.log.debug("###################### PS_CHELEM200_DAY_02 ");
            session.insert("MonthlyWork.PS_CHELEM200_DAY_02",param);

            this.log.debug("###################### PS_CHELEM200_DAY_03 ");
            session.insert("MonthlyWork.PS_CHELEM200_DAY_03",param);



            session.commit();

            this.log.debug("###################### 작업완료");
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


}
