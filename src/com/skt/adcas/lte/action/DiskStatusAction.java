package com.skt.adcas.lte.action;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.skt.adcas.lte.db.SqlSessionManager;



public class DiskStatusAction extends ActionSupport4lte{
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


    public String BTS_NAME = null;
    public void setBTS_NAME(String bTS_NAME) {
        BTS_NAME = bTS_NAME;
    }

    public String selectDiskList(){
        //this.log.debug("createAcl Start");
        SqlSession session = null;
        try{
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("diskStatus");
            session.commit();
            this.msg = "생성되었습니다";
            this.status = "SUCCESS";
        }catch (Exception e){
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            session.rollback();
            e.printStackTrace();

        }finally{
            session.close();
        }
        return SUCCESS;
    }


    public String selectCharTest(){
        //this.log.debug("createAcl Start");
        SqlSession session = null;
        try{
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("charTest");
            session.commit();
            this.msg = "조회되었습니다";
            this.status = "SUCCESS";
        }catch (Exception e){
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            session.rollback();
            e.printStackTrace();

        }finally{
            session.close();
        }
        System.out.println("직전임");
        this.log.debug("########## 냐냐냐");

        return SUCCESS;
    }

    public String makeKrRecord(){
        this.log.debug("########## makeKrRecord Start");
        SqlSession session = null;
        try{
            session = SqlSessionManager.getSqlSession().openSession();

            this.param.put("BTS_NAME", this.BTS_NAME);
            session.insert("charTestInsert", this.param);

            session.commit();
            this.msg = "야호 트랄랄랄라";
            this.status = "SUCCESS";
        }catch (Exception e){
            this.msg = e.getMessage();
            this.status = "ERROR";
            this.error = true;
            session.rollback();
            e.printStackTrace();

        }finally{
            session.close();
            this.log.debug("########## makeKrRecord End");
        }
        return SUCCESS;
    }


}
