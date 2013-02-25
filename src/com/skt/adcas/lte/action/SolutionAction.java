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

    private String USER_ID = "";

    private void parseParam() throws Exception {

        USER_ID = (String)request.getSession().getAttribute("USER_ID");
        if (request.getRequestURL().indexOf("localhost") != -1) {
            if (USER_ID == null) USER_ID = "qcas";
        }
        Map<String,Object> parameters = ActionContext.getContext().getParameters();
        for (Map.Entry<String, Object> paraEntry : parameters.entrySet() ) {
            String key = paraEntry.getKey();
            String[] value = (String[])paraEntry.getValue();
            if (key.equals("YMD")) {
                param.put(key, value[0].replace("-","").replace(".","").replace("/",""));
            } else {
                param.put(key, value[0]);
            }
        }
        param.put("USER_ID",USER_ID);
        this.log.info("###################### 파라미터 가져오기 ");
        this.log.info(param.toString());

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

        this.log.info("selectSolutionCellList Start");
        SqlSession session = null;

        try{
            parseParam();

            this.log.debug("###################### 세션 가져오기 ");
            session = SqlSessionManager.getSqlSession().openSession();

            this.log.debug("######################데이터 가져오는중 ");
            this.rows = session.selectList("Solution.selectSolutionCellList",param);

            this.log.info("###################### 조회완료");
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

    public String selectInterestList() {

        this.log.debug("selectInterestList Start");
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
            if(criticalValueMap.size() == 0) {
                param2.put("USE_TYPE","ADMIN");
                param2.remove("USER_ID");
                criticalValueMap = session.selectList("Environment.selectCriticalValue",param2);
            }
            if(criticalValueMap.size() != 0) {
                HashMap criticalValue = criticalValueMap.get(0);
                param.put("DL_RRU_VAL1",criticalValue.get("DL_RRU_VAL1"));
                param.put("PRB_USG_VAL1",criticalValue.get("PRB_USG_VAL1"));
                param.put("UL_POWER_VAL1",criticalValue.get("UL_POWER_VAL1"));
                setUserCriticalValues(criticalValue);
                this.log.debug("###################### 파라미터 가져오기 (임계치값포함) ");
                this.log.debug(param.toString());

                this.log.debug("######################데이터 가져오는중 ");
                this.rows = session.selectList("Solution.selectInterestList",param);

                this.log.debug("###################### 조회완료");
                if(this.rows.size() > 0) {
                    this.msg = "조회되었습니다.";
                } else {
                    this.msg = "조회결과가 없습니다.";
                }
                this.status = "SUCCESS";
            } else {
                throw new Exception("임계값이 존재하지 않습니다.");
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

        this.log.debug("selectInterestList End");
        return SUCCESS;
    }

}
