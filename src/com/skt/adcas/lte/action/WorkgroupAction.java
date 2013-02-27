package com.skt.adcas.lte.action;

import com.opensymphony.xwork2.ActionContext;
import com.skt.adcas.lte.db.SqlSessionManager;
import org.apache.ibatis.session.SqlSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class WorkgroupAction extends ActionSupport4lte {
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

    private String USER_ID = "";

    public void parseParam() {
        USER_ID = (String)request.getSession().getAttribute("USER_ID");
        //this.log.debug("param========================USER_ID = "+USER_ID);
        if (request.getRequestURL().indexOf("localhost") != -1) {
            //this.log.debug("request========================URL = "+request.getRequestURL());
            if (USER_ID == null) USER_ID = "qcas";
        }
        Map<String,Object> parameters = ActionContext.getContext().getParameters();
        for (Map.Entry<String, Object> paraEntry : parameters.entrySet() ) {
            String key = paraEntry.getKey();
            String[] value = (String[])paraEntry.getValue();
            //this.log.debug("param========================key = "+key);
            //this.log.debug("param========================value = "+value[0]);
            param.put(key, value[0]);
        }
        param.put("USER_ID",USER_ID);
        this.log.info("###################### 파라미터 가져오기 ");
        this.log.info(param.toString());
    }

    public String selectBonbuList(){
        this.log.debug("########## selectBonbuList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectBonbuList",this.param);
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
            this.log.debug("########## selectBonbuList End");
        }
        return SUCCESS;
    }

    public String selectOperTeamList(){
        this.log.debug("########## selectOperTeamList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectOperTeamList",this.param);
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
            this.log.debug("########## selectOperTeamList End");
        }
        return SUCCESS;
    }

    public String selectPartList(){
        this.log.debug("########## selectPartList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectPartList",this.param);
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
            this.log.debug("########## selectPartList End");
        }
        return SUCCESS;
    }

    public String selectCityList(){
        this.log.debug("########## selectCityList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectCityList",this.param);
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
            this.log.debug("########## selectCityList End");
        }
        return SUCCESS;
    }

    public String selectGuList(){
        this.log.debug("########## selectGuList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectGuList",this.param);
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
            this.log.debug("########## selectGuList End");
        }
        return SUCCESS;
    }

    public String selectDongList(){
        this.log.debug("########## selectDongList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectDongList",this.param);
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
            this.log.debug("########## selectDongList End");
        }
        return SUCCESS;
    }

    public String selectMMEList(){
        this.log.debug("########## selectMMEList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectMMEList",this.param);
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
            this.log.debug("########## selectMMEList End");
        }
        return SUCCESS;
    }

    public String selectNEList(){
        this.log.debug("########## selectNEList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectNEList",this.param);
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
            this.log.debug("########## selectNEList End");
        }
        return SUCCESS;
    }

    public String selectDUList(){
        this.log.debug("########## selectDUList Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectDUList",this.param);
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
            this.log.debug("########## selectDUList End");
        }
        return SUCCESS;
    }

    public String selectDUListByWorkgroup(){
        this.log.debug("########## selectDUListByWorkgroup Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectDUListByWorkgroup",this.param);
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
            this.log.debug("########## selectDUListByWorkgroup End");
        }
        return SUCCESS;
    }

    public String selectWorkgroup(){
        this.log.debug("########## selectWorkgroup Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            this.rows = session.selectList("Workgroup.selectWorkgroup",this.param);
            if(this.rows.size() == 0) {
                if (param.get("WORKGROUP_ID").equalsIgnoreCase("INTEREST")) { //관심국소
                    param.put("WORKGROUP_ID", "INTEREST");
                    param.put("WORKGROUP_NAME", "관심국소");
                    int no = session.insert("Workgroup.insertWorkgroup",this.param);
                    session.commit();
                    this.rows = session.selectList("Workgroup.selectWorkgroup",this.param);
                }
            }
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

            this.log.debug("########## selectWorkgroup End");
        }
        return SUCCESS;
    }

    public String insertWorkgroup(){
        this.log.debug("########## insertWorkgroup Start");
        SqlSession session = null;
        try{

            session = SqlSessionManager.getSqlSession().openSession();

            parseParam();
            param.put("WORKGROUP_ID", UUID.randomUUID().toString());
            /*Map<String,Object> parameters = ActionContext.getContext().getParameters();
            for (Map.Entry<String, Object> paraEntry : parameters.entrySet() ) {
                String key = paraEntry.getKey();
                String[] value = (String[])paraEntry.getValue();
                this.log.debug("param========================key = "+key);
                this.log.debug("param========================value = "+value[0]);
                if (key.equals("WORKGROUP_ID")) {
                    param.put(key, UUID.randomUUID().toString());
                    this.log.debug("param========================WORKGROUP_ID = " + param.get("WORKGROUP_ID"));
                } else {
                    param.put(key, value[0]);
                }
                param.put("USER_ID",USER_ID);
            }*/

            //this.log.debug("START========================WorkgroupVO");
            //WorkgroupVO paramVO = new WorkgroupVO();
            //paramVO.setUSER_ID(this.param.get("USER_ID"));
            //paramVO.setWORKGROUP_NAME(this.param.get("WORKGROUP_NAME"));
            //this.log.debug("END========================WorkgroupVO");
            int no = session.insert("Workgroup.insertWorkgroup",this.param);
            //this.log.debug("return========================id = "+paramVO.getWORKGROUP_ID());
            //this.param.put("WORKGROUP_ID",paramVO.getWORKGROUP_ID());
            session.commit();
            this.rows = session.selectList("Workgroup.selectWorkgroup",this.param);
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

    public String deleteWorkgroup(){
        this.log.debug("########## deleteWorkgroup Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            int no = session.delete("Workgroup.deleteWorkgroup",this.param);
            if (no > 0)
                session.delete("Workgroup.deleteWorkgroupDU",this.param);
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

            this.log.debug("########## deleteWorkgroup End");
        }
        return SUCCESS;
    }

    public String insertWorkgroupDU(){
        this.log.debug("########## insertWorkgroupDU Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            String DUIDs = (String)param.get("DUIDs");
            if (DUIDs == null) {
                session.insert("Workgroup.insertWorkgroupDU",this.param);
            } else {
                String temp01[] = DUIDs.split("\\|");
                for(int i=0;i<temp01.length;i++){
                    System.out.println(temp01[i]);
                    this.log.debug("########## "+ temp01[i]);
                    String temp02[] = temp01[i].split("_");
                    param.put("C_UID", temp02[0]);
                    param.put("INGR_ERP_CD", temp02[1]);
                    this.log.debug("########## C_UID="+ temp02[0] + ", INGR_ERP_CD="+temp02[1]);
                    session.insert("Workgroup.insertWorkgroupDU",this.param);
                }
            }
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

            this.log.debug("########## insertWorkgroupDU End");
        }
        return SUCCESS;
    }

    public String deleteWorkgroupDU(){
        this.log.debug("########## deleteWorkgroupDU Start");
        SqlSession session = null;
        try{
            parseParam();
            session = SqlSessionManager.getSqlSession().openSession();
            int no = session.delete("Workgroup.deleteWorkgroupDU",this.param);
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

            this.log.debug("########## deleteWorkgroupDU End");
        }
        return SUCCESS;
    }

}
