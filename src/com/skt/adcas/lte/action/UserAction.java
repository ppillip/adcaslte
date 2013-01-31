package com.skt.adcas.lte.action;

import com.opensymphony.xwork2.ActionContext;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserAction extends ActionSupport4lte {
    private static final long serialVersionUID = 1L;

    /* 기본 셋업 시작*/
    public List<HashMap> getRows() {return rows;}
    public String getMsg() {return msg;}
    public String getStatus() {return status;}
    public Boolean getError() {return error;}
    private List<HashMap> rows = null;
    private String msg = null;
    private String status = null;
    private Boolean error = false;
    private HashMap<String,String> param = new HashMap<String, String>();
    /* 기본 셋업 끝*/

    /* 추가 셋업 시작*/
    public String getForwardURL() {return forwardURL;}
    public String getTarget() {return target;}
    private String forwardURL = null;
    private String target = null;
    /* 추가 셋업 끝*/

    public void parseParam() {
        Map<String,Object> parameters = ActionContext.getContext().getParameters();
        for (Map.Entry<String, Object> paraEntry : parameters.entrySet() ) {
            String key = paraEntry.getKey();
            String[] value = (String[])paraEntry.getValue();
            this.log.debug("param========================key = "+key);
            this.log.debug("param========================value = "+value[0]);
            param.put(key, value[0]);
        }
    }

    public String login(){

        this.log.debug("login Start");
        SqlSession session = null;
        try{
            if (request.getSession().getAttribute("USER_ID") == null) {
                this.log.debug("logining...");
                parseParam();
                session = SqlSessionManager.getSqlSession().openSession();
                this.rows = session.selectList("User.selectUserList",param);

                if (this.rows.size() == 1) {
                    HashMap row = this.rows.get(0);
                    if(row.get("CONFIRM_FLAG").equals("Y")) {
                        if (param.get("USER_PW").equals(row.get("USER_PW"))) {
                            this.status = "SUCCESS";
                            this.forwardURL = "index.jsp";
                            this.msg = "로그인되었습니다";
                            request.getSession().setAttribute("USER_ID",row.get("USER_ID"));
                            request.getSession().setAttribute("USER_INFO",row);
                            HashMap<String,String> param2 = new HashMap<String, String>();
                            param2.put("USE_TYPE","ADMIN");
                            List<HashMap> criticalValue = session.selectList("Environment.selectCriticalValue",param2);
                            request.getSession().setAttribute("ADMIN_CRITICAL_VALUES",criticalValue.get(0));
                        } else {
                            this.status = "FAIL";
                            this.target = "USER_PW";
                            this.msg = "비밀번호가 틀립니다.";
                        }
                    } else if(row.get("CONFIRM_FLAG").equals("N")) {
                        this.status = "FAIL";
                        this.target = "USER_ID";
                        this.msg = "아직 승인되지 않은 사용자 계정입니다.";
                    } else if(row.get("CONFIRM_FLAG").equals("R")) {
                        this.status = "FAIL";
                        this.target = "USER_ID";
                        this.msg = "승인 거부된 사용자 계정입니다.";
                    }
                } else if (this.rows.size() == 0) {
                    this.status = "FAIL";
                    this.target = "USER_ID";
                    this.msg = "일치하는 사용자 계정이 없습니다.";
                }
            } else {
                this.log.debug("logined");
                this.status = "SUCCESS";
                this.msg = "로그인된 상태입니다.";
            }
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

        this.log.debug("login End");
        return SUCCESS;
    }

    public String logout(){

        this.log.debug("logout Start");
        try{
            this.forwardURL = "login.jsp";
            request.getSession().removeAttribute("USER_ID");
            request.getSession().removeAttribute("USER_INFO");
            this.msg = "로그아웃되었습니다.";
            this.status = "SUCCESS";
        } catch (Exception e) {
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            e.printStackTrace();
        }

        this.log.debug("logout End");
        return SUCCESS;
    }

    public String selectUserList(){

        this.log.debug("selectUserList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("User.selectUserList",param);
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

        this.log.debug("selectUserList End");
        return SUCCESS;
    }

    public String checkDuplicatedID(){

        this.log.debug("checkDuplicatedID Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("User.checkDuplicatedID",param);
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

        this.log.debug("checkDuplicatedID End");
        return SUCCESS;
    }

    public String selectUserGroupDesc1(){

        this.log.debug("selectUserGroupDesc1 Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("User.selectUserGroupDesc1",param);
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

        this.log.debug("selectUserGroupDesc1 End");
        return SUCCESS;
    }

    public String selectUserGroupDesc2(){

        this.log.debug("selectUserGroupDesc2 Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("User.selectUserGroupDesc2",param);
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

        this.log.debug("selectUserGroupDesc2 End");
        return SUCCESS;
    }

    public String selectUserGroupDesc3(){

        this.log.debug("selectUserGroupDesc3 Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("User.selectUserGroupDesc3",param);
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

        this.log.debug("selectUserGroupDesc3 End");
        return SUCCESS;
    }

    public String insertUserInfo(){
        this.log.debug("########## insertUserInfo Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            session.insert("User.insertUserInfo",this.param);
            session.commit();
            this.msg = "생성되었습니다";
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

            this.log.debug("########## insertWorkgroup End");
        }
        return SUCCESS;
    }

    public String updateUserInfo(){
        this.log.debug("########## updateUserInfo Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            session.update("User.updateUserInfo",this.param);
            session.commit();
            this.msg = "변경되었습니다";
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

            this.log.debug("########## updateUserInfo End");
        }
        return SUCCESS;
    }

    public String deleteUserInfo(){
        this.log.debug("########## deleteUserInfo Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            session.update("User.deleteUserInfo",this.param);
            session.commit();
            this.msg = "삭제되었습니다";
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

            this.log.debug("########## deleteUserInfo End");
        }
        return SUCCESS;
    }

}
