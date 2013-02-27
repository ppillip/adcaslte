<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="com.skt.adcas.lte.action.ActionSupport4lte" %>
<%

    String fileTpath = request.getParameter("o");

    String path = ActionSupport4lte.properties.get("TEMP_FOLDER_PATH") + fileTpath ;

    //out.println(path);

    String dnFilename = "result.csv";



    try
    {
        java.io.File f = new java.io.File(path);
        byte b[] = new byte[1024];

        java.io.BufferedInputStream  fin  = new java.io.BufferedInputStream(new java.io.FileInputStream(f));
        java.io.BufferedOutputStream fout = new java.io.BufferedOutputStream(response.getOutputStream());

        String strClient = request.getHeader("User-Agent");

        if (strClient.indexOf("MSIE 5.5") != -1)
        {
            response.setHeader("Content-Type", "doesn/matter; charset=utf-8");
            this.setDBCSHeader("Content-Disposition", "filename="+ new String(dnFilename.getBytes(),"utf-8") +";", response);
        }
        else
        {
            response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
            this.setDBCSHeader("Content-Disposition", "attachment;filename="+ new String(dnFilename.getBytes(),"utf-8") +";", response);
        }

        response.setHeader("Content-Transfer-Encoding", "binary;");
        response.setHeader("Pragma", "no-cache;");
        response.setHeader("Expires", "-1;");

        for (int i; (i = fin.read(b)) != -1; )
        {
            fout.write(b, 0, i);
            fout.flush();
        }

        fin.close();
        fout.flush();
        fout.close();
    }
    catch (java.io.FileNotFoundException e)
    {
        //com.nalbam.common.Log.write(e.toString());
    }
    catch (java.lang.Throwable e)
    {
        //com.nalbam.common.Log.write(e.toString());
    }

%><%!

        public void setDBCSHeader(String header, String value, HttpServletResponse response)
        {
            byte b[];

            try
            {
                b = value.getBytes(response.getCharacterEncoding());
            }
            catch (Exception ex)
            {
                b = value.getBytes();
            }

            char c[] = new char[b.length];

            for (int i = 0; i < b.length; i++)
            {
                c[i] = (char)(((char)b[i])&0xff);
                //com.nalbam.common.Log.write("characters="+ c[i]);
            }

            response.setHeader(header,new String(c));
        }
%>