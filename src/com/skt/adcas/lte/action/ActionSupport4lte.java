package com.skt.adcas.lte.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;
import sun.rmi.transport.ObjectTable;

import java.util.HashMap;
import java.util.List;
import java.util.Properties;

public class ActionSupport4lte extends ActionSupport implements ServletRequestAware,ServletResponseAware {

    /**
     *
     */
    protected static Log log = LogFactory.getLog("com.skt.adcas.lte.action");

    private static final long serialVersionUID = 1L;

    protected HttpServletRequest request;
    protected HttpServletResponse response;

    public static Properties properties = SqlSessionManager.getSqlSession().getConfiguration().getVariables();

    public ActionSupport4lte() {

    }

    public void setServletRequest(HttpServletRequest request){
        this.request = request;
    }

    public HttpServletRequest getServletRequest(){
        return request;
    }

    public void setServletResponse(HttpServletResponse response){
        this.response = response;
    }

    public HttpServletResponse getServletResponse(){
        return response;
    }

    protected String isNull(String str){
        if(str==null) return "";
        else return str;
    }

    protected String ifNull(String str,String rtn){

        if(isNull(str).equals("")){
            return rtn;
        }

        return str;

    }

    protected boolean isLocalHost(){
        return request.getRequestURL().indexOf("localhost") != -1;
    }

    protected void setAdminCriticalValues() {

        this.log.debug("setAdminCriticalValues Start");
        SqlSession session = null;

        try{
            if(request.getSession().getAttribute("ADMIN_CRITICAL_VALUES") == null) {
                this.log.debug("###################### 세션 가져오기 ");
                session = SqlSessionManager.getSqlSession().openSession();
                HashMap<String,String> param2 = new HashMap<String, String>();
                param2.put("USE_TYPE","ADMIN");
                HashMap criticalValue = (HashMap)session.selectOne("Environment.selectCriticalValue",param2);
                request.getSession().setAttribute("ADMIN_CRITICAL_VALUES",criticalValue);
                this.log.debug("getAdminCriticalValues = "+ ((HashMap)request.getSession().getAttribute("ADMIN_CRITICAL_VALUES")).toString());
            }  else {
                this.log.debug("###################### ADMIN_CRITICAL_VALUES 세션 존재 ");
            }
        }catch (Exception e){
            this.log.debug("getAdminCriticalValues Error");
            if(session!=null){
                session.rollback();
            }
            e.printStackTrace();
        }finally{
            if(session!=null){
                session.close();
            }
        }
        this.log.debug("getAdminCriticalValues End");
    }

}