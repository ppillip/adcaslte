package com.skt.adcas.lte.action;

import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    public void setYMD(String YMD) {
        this.YMD = YMD;
    }

    public void setRTYPE_CD(String RTYPE_CD) {
        this.RTYPE_CD = RTYPE_CD;
    }

    public void setDAYTIME_SEQ(String DAYTIME_SEQ) {
        this.DAYTIME_SEQ = DAYTIME_SEQ;
    }

    public void setFREQ_KIND(String FREQ_KIND) {
        this.FREQ_KIND = FREQ_KIND;
    }

    public void setBONBU_CD(String BONBU_CD) {
        this.BONBU_CD = BONBU_CD;
    }

    public void setPART_CD(String PART_CD) {
        this.PART_CD = PART_CD;
    }

    public void setBAD_TYPE(String BAD_TYPE) {
        this.BAD_TYPE = BAD_TYPE;
    }

    private String YMD         = "";
    private String RTYPE_CD    = "R3";
    private String DAYTIME_SEQ = "1";
    private String FREQ_KIND   = "";
    private String BONBU_CD    = "";
    private String PART_CD     = "";
    private String BAD_TYPE    = "";

    private void parseParam() throws Exception {

//        String USER_ID = (String)request.getSession().getAttribute("USER_ID");
//
//        if (!isLocalHost()) {
//            if(isNull(USER_ID).equals("")){
//                throw new Exception("세션이 만료 되었습니다");
//            }
//        }

        param.put("YMD"        , YMD.replace("-","").replace(".","").replace("/",""));
        param.put("RTYPE_CD"   , RTYPE_CD);
        param.put("DAYTIME_SEQ", DAYTIME_SEQ);
        param.put("FREQ_KIND"  , FREQ_KIND);
        param.put("BONBU_CD"   , BONBU_CD);
        param.put("PART_CD"    , PART_CD);
        param.put("BAD_TYPE"   , BAD_TYPE);

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

}
