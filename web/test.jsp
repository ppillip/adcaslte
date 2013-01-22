<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>아주쪼금 수정 해봅니다</title>
    <link href="common/bootstrap/css/bootstrap.css" rel="stylesheet">
    <style>
        li {
            list-style: none;
        }

        ul {
            margin: 0;
        }
    </style>
    <script src="common/bootstrap/js/bootstrap_old.js"></script>
    <script src="common/js/jquery-latest.js"></script>
    <script src="test.js"></script>
</head>
<body>



<div class="well span10" style="margin-top:10px;">
    <button class="btn btn-mini btn-primary" id="searchOne"><i class="icon-search"></i> 검색 합니다</button>
    <button class="btn btn-mini btn-primary" id="searchBTS"><i class="icon-search"></i> 한글 조회</button>
    <input type="text" name="BTS_NAME" id="BTS_NAME">
    <button class="btn btn-mini btn-primary" id="makeBTS"><i class="icon-search"></i> 한글 입력</button>
    <p>
        <input type="text" name="BTS_NM_CMS" id="BTS_NM_CMS">
        <button class="btn btn-mini btn-primary" id="searchDUList"><i class="icon-search"></i>DU목록 가져오기</button>
    </p>

</div>




<div class="span10" style="margin-top:10px;">
    <table id="table02" class="table table-bordered table-hover table-condensed">
        <thead>
        <tr>
            <th>BTS 이름 입니다 즐거운 하루 되세요</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <table id="table01" class="table table-bordered table-hover table-condensed">
        <thead>
        <tr>
            <th>테이블 스페이스명</th>
            <th>크기(MB)</th>
            <th>사용됨(MB)</th>
            <th>남음(MB)</th>
            <th>남은 %</th>
            <th>파일명</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>


    <table id="DUListTable" class="table table-bordered table-hover table-condensed">
        <thead>
        <tr>
            <th>DU 명</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>


</div>
</body>
</html>
