package com.skt.adcas.lte.action;

import com.opensymphony.xwork2.ActionContext;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SolutionAction extends ActionSupport4lte {

    /* 기본 셋업 시작*/
    public List<HashMap> getRows() {return rows;}
    public String getMsg() {return msg;}
    public String getStatus() {return status;}
    public Boolean getError() {return error;}
    private List<HashMap> rows = null;
    private String msg = null;
    private String status = null;
    private Boolean error = false;
    private HashMap<String,Object> param = new HashMap<String, Object>();
    /* 기본 셋업 끝*/

    public HashMap getUserCriticalValues() {
        return userCriticalValues;
    }

    public void setUserCriticalValues(HashMap userCriticalValues) {
        this.userCriticalValues = userCriticalValues;
    }

    private HashMap userCriticalValues;
//    public HashMap getUserCriticalValues() {
//        return  userCriticalValues;
//                (HashMap)request.getSession().getAttribute("ADMIN_CRITICAL_VALUES");
//    }

//    public void setYMD(String YMD) {
//        this.YMD = YMD;
//    }
//
//    public void setRTYPE_CD(String RTYPE_CD) {
//        this.RTYPE_CD = RTYPE_CD;
//    }
//
//    public void setDAYTIME_SEQ(String DAYTIME_SEQ) {
//        this.DAYTIME_SEQ = DAYTIME_SEQ;
//    }
//
//    public void setFREQ_KIND(String FREQ_KIND) {
//        this.FREQ_KIND = FREQ_KIND;
//    }
//
//    public void setBONBU_CD(String BONBU_CD) {
//        this.BONBU_CD = BONBU_CD;
//    }
//
//    public void setPART_CD(String PART_CD) {
//        this.PART_CD = PART_CD;
//    }
//
//    public void setBAD_TYPE(String BAD_TYPE) {
//        this.BAD_TYPE = BAD_TYPE;
//    }
//
//    private String YMD         = "";
//    private String RTYPE_CD    = "R3";
//    private String DAYTIME_SEQ = "1";
//    private String FREQ_KIND   = "";
//    private String BONBU_CD    = "";
//    private String PART_CD     = "";
//    private String BAD_TYPE    = "";

    private String USER_ID = "";

    private void parseParam() throws Exception {

//        String USER_ID = (String)request.getSession().getAttribute("USER_ID");
//
//        if (!isLocalHost()) {
//            if(isNull(USER_ID).equals("")){
//                throw new Exception("세션이 만료 되었습니다");
//            }
//        }

//        param.put("YMD"        , YMD.replace("-","").replace(".","").replace("/",""));
//        param.put("RTYPE_CD"   , RTYPE_CD);
//        param.put("DAYTIME_SEQ", DAYTIME_SEQ);
//        param.put("FREQ_KIND"  , FREQ_KIND);
//        param.put("BONBU_CD"   , BONBU_CD);
//        param.put("PART_CD"    , PART_CD);
//        param.put("BAD_TYPE"   , BAD_TYPE);

//        this.log.debug("###################### 파라미터 가져오기 ");
//        this.log.debug(param.toString());

        USER_ID = (String)request.getSession().getAttribute("USER_ID");
        if (request.getRequestURL().indexOf("localhost") != -1) {
            if (USER_ID == null) USER_ID = "qcas";
        }
        Map<String,Object> parameters = ActionContext.getContext().getParameters();
        for (Map.Entry<String, Object> paraEntry : parameters.entrySet() ) {
            String key = paraEntry.getKey();
            String[] value = (String[])paraEntry.getValue();
            //this.log.debug("param========================key = "+key);
            //this.log.debug("param========================value = "+value[0]);
            if (key.equals("YMD")) {
                param.put(key, value[0].replace("-","").replace(".","").replace("/",""));
            } else {
                param.put(key, value[0]);
            }
        }
        param.put("USER_ID",USER_ID);
        this.log.debug("###################### 파라미터 가져오기 ");
        this.log.debug(param.toString());

    }

    public String selectSolutionList() {

        this.log.debug("selectSolutionList Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            this.log.debug("######################데이터 가져오는중 ");
            this.rows = session.selectList("Solution.selectSolutionList",param);

            this.log.debug("###################### 조회완료");
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

        this.log.debug("selectSolutionList End");
        return SUCCESS;
    }

    public String selectSolutionDetail() {

        this.log.debug("selectSolutionDetail Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            this.log.debug("######################데이터 가져오는중 ");
            this.rows = session.selectList("Solution.selectSolutionDetail",param);

            this.log.debug("###################### 조회완료");
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

        this.log.debug("selectSolutionDetail End");
        return SUCCESS;
    }

    public String selectSolutionCellList() {

        this.log.debug("selectSolutionCellList Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            this.log.debug("######################데이터 가져오는중 ");
            this.rows = session.selectList("Solution.selectSolutionCellList",param);

            this.log.debug("###################### 조회완료");
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

        this.log.debug("selectSolutionCellList End");
        return SUCCESS;
    }

    public String selectInterestTroubleList() {

        this.log.debug("selectInterestTroubleList Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            this.log.debug("###################### 사용자 임계치값 가져오기 ");
            HashMap<String,String> param2 = new HashMap<String, String>();
            param2.put("USE_TYPE","USER");
            param2.put("USER_ID",USER_ID);
            List<HashMap> criticalValueMap = session.selectList("Environment.selectCriticalValue",param2);
            if(criticalValueMap.size() != 0) {
                HashMap criticalValue = criticalValueMap.get(0);
                param.put("DL_RRU_VAL1",criticalValue.get("DL_RRU_VAL1"));
                param.put("PRB_USG_VAL1",criticalValue.get("PRB_USG_VAL1"));
                param.put("UL_POWER_VAL1",criticalValue.get("UL_POWER_VAL1"));
                setUserCriticalValues(criticalValue);
                this.log.debug("###################### 파라미터 가져오기 (임계치값포함) ");
                this.log.debug(param.toString());

                this.log.debug("######################데이터 가져오는중 ");
                this.rows = session.selectList("Solution.selectInterestTroubleList",param);

                this.log.debug("###################### 조회완료");
                if(this.rows.size() > 0) {
                    this.msg = "조회되었습니다.";
                } else {
                    this.msg = "조회결과가 없습니다.";
                }
                this.status = "SUCCESS";

            } else {
                this.msg = "사용자 임계치값이 없습니다.\n(사용자 환경변수-임계치설정)";
                this.status = "ERROR";
                this.error = true;
            }

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

        this.log.debug("selectInterestTroubleList End");
        return SUCCESS;
    }

}
