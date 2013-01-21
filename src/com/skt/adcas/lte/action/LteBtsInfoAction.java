package com.skt.adcas.lte.action;

import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;

import java.util.HashMap;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: ppillip
 * Date: 12. 10. 23
 * Time: 오전 9:43
 * To change this template use File | Settings | File Templates.
 */
public class LteBtsInfoAction extends ActionSupport4lte{
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

    public String BTS_NM_CMS = "";
    public void setBTS_NM_CMS(String bTS_NM_CMS) {
        BTS_NM_CMS = bTS_NM_CMS;
    }

    public String selectDUListByCmsName() throws Exception {
        this.log.debug("selectDUListByCmsName Start");
        SqlSession session = null;

        try{

            if( isNull(this.BTS_NM_CMS).equals("") ) {
                throw new Exception("DU명이 없습니다");
            }

            session = SqlSessionManager.getSqlSession().openSession();

            this.param.put("BTS_NM_CMS",BTS_NM_CMS);
            this.rows = session.selectList("LteBtsInfo.selectDUListByCmsName",param);

            session.commit();
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

        this.log.debug("selectDUListByCmsName End");
        return SUCCESS;
    }

}
