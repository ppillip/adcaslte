package com.skt.adcas.lte.action;

import com.opensymphony.xwork2.ActionContext;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EnvironmentAction extends ActionSupport4lte {

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

    /* For CONST UPLINK RSRP */
    private String[] RSRP;
    private String[] THRP;

    public void setRSRP(String[] RSRP) {
        this.RSRP = RSRP;
    }

    public void setTHRP(String[] THRP) {
        this.THRP = THRP;
    }
    /* End CONST UPLINK RSRP */

    /* For CONST UPLINK */
    private String[] CONST_TYPE;
    private String[] CONST_VAL;
    private String[] RAMARK;

    public void setCONST_TYPE(String[] CONST_TYPE) {
        this.CONST_TYPE = CONST_TYPE;
    }

    public void setCONST_VAL(String[] CONST_VAL) {
        this.CONST_VAL = CONST_VAL;
    }

    public void setRAMARK(String[] RAMARK) {
        this.RAMARK = RAMARK;
    }
    /* End CONST UPLINK */

    private String USER_ID = "";

    public void parseParam() {
        USER_ID = (String)request.getSession().getAttribute("USER_ID");
        if (request.getRequestURL().indexOf("localhost") != -1) {
            if (USER_ID == null) USER_ID = "qcas";
        }

        Map<String,Object> parameters = ActionContext.getContext().getParameters();
        for (Map.Entry<String, Object> paraEntry : parameters.entrySet() ) {
            String key = paraEntry.getKey();
            String[] value = (String[])paraEntry.getValue();
            this.log.debug("param========================key = "+key);
            this.log.debug("param========================value = "+value[0]);
            param.put(key, value[0]);
            /*for (int i=0; i < value.length; i++) {
                this.log.debug("param========================value("+i+") = "+value[i]);
            }
            if (value.length > 1) {
                param.put(key, value);
            } else {
                param.put(key, value[0]);
            }*/
        }
        param.put("USER_ID",USER_ID);
    }

    public String selectConstCqiThrp(){

        this.log.debug("selectConstCqiThrp Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectConstCqiThrp",param);
            //session.commit();
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectConstCqiThrp End");
        return SUCCESS;
    }

    public String updateConstCqiThrp(){

        this.log.debug("updateConstCqiThrp Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            //HashMap<String,String> subParam = new HashMap<String,String>();

            int no = session.update("Environment.updateConstCqiThrp",param);
            session.commit();
            this.msg = "변경되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("updateConstCqiThrp End");
        return SUCCESS;
    }

    public String selectConstUplinkRsrp(){

        this.log.debug("selectConstUplinkRsrp Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectConstUplinkRsrp",param);
            //session.commit();
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectConstUplinkRsrp End");
        return SUCCESS;
    }

    public String insertConstUplinkRsrp(){

        this.log.debug("insertConstUplinkRsrp Start");
        SqlSession session = null;
        try{
            //parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            session.insert("Environment.deleteConstUplinkRsrp",param);
            for(int i=0; i<RSRP.length; i++) {
                param.put("RSRP",RSRP[i]);
                param.put("THRP", THRP[i]);
                session.insert("Environment.insertConstUplinkRsrp",param);
            }
            session.commit();
            this.msg = "생성되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("insertConstUplinkRsrp End");
        return SUCCESS;
    }

    public String selectConstTable(){

        this.log.debug("selectConstTable Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectConstTable",param);
            //session.commit();
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectConstTable End");
        return SUCCESS;
    }

    public String updateConstTable(){

        this.log.debug("updateConstTable Start");
        SqlSession session = null;
        try{
            //parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            for(int i=0; i<CONST_TYPE.length; i++) {
                param.put("CONST_TYPE",CONST_TYPE[i]);
                param.put("CONST_VAL", CONST_VAL[i]);
                param.put("RAMARK", RAMARK[i]);
                session.update("Environment.updateConstTable",param);
            }
            session.commit();
            this.msg = "변경되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("updateConstTable End");
        return SUCCESS;
    }

    public String selectConstUplink(){

        this.log.debug("selectConstUplink Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectConstUplink",param);
            //session.commit();
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectConstUplink End");
        return SUCCESS;
    }

    public String updateConstUplink(){

        this.log.debug("updateConstUplink Start");
        SqlSession session = null;
        try{
            //parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            for(int i=0; i<CONST_TYPE.length; i++) {
                param.put("CONST_TYPE",CONST_TYPE[i]);
                param.put("CONST_VAL", CONST_VAL[i]);
                param.put("RAMARK", RAMARK[i]);
                session.update("Environment.updateConstUplink",param);
            }
            session.commit();
            this.msg = "변경되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("updateConstUplink End");
        return SUCCESS;
    }

    public String selectCriticalValue(){

        this.log.debug("selectCriticalValue Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectCriticalValue",param);

        //this.log.debug("this.rows.size()="+this.rows.size());
            if (this.rows.size() == 0 && ((String)param.get("USE_TYPE")).equalsIgnoreCase("USER")) {
        //this.log.debug("insertCriticalValue Start");
                session.insert("Environment.insertCriticalValue",param);
        //this.log.debug("insertCriticalValue End");
                session.commit();
                this.rows = session.selectList("Environment.selectCriticalValue",param);
            }
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectCriticalValue End");
        return SUCCESS;
    }

    public String updateCriticalValue(){

        this.log.debug("updateCriticalValue Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            session.update("Environment.updateCriticalValue",param);
            session.commit();
            if(((String)param.get("USE_TYPE")).equalsIgnoreCase("ADMIN")) {
                //Session에 있는 임계치값 변경
                this.log.debug("updateCriticalValue change Session ADMIN_CRITICAL_VALUES");
                HashMap criticalValue = (HashMap)session.selectOne("Environment.selectCriticalValue",param);
                request.getSession().setAttribute("ADMIN_CRITICAL_VALUES",criticalValue);
            }
            this.msg = "변경되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("updateCriticalValue End");
        return SUCCESS;
    }

    public String selectTeamList(){

        this.log.debug("selectTeamList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectTeamList",param);

            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectTeamList End");
        return SUCCESS;
    }

    public String selectConstRssi(){

        this.log.debug("selectConstRssi Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Environment.selectConstRssi",param);
            //session.commit();
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("selectConstRssi End");
        return SUCCESS;
    }

    public String updateConstRssi(){

        this.log.debug("updateConstRssi Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            //HashMap<String,String> subParam = new HashMap<String,String>();

            int no = session.update("Environment.updateConstRssi",param);
            session.commit();
            this.msg = "변경되었습니다";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            if(session != null) {
                session.rollback();
            }
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
        }

        this.log.debug("updateConstRssi End");
        return SUCCESS;
    }

}
