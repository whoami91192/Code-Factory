
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" />
    <title>Μαθητές</title>
</head>
<body>
    <div class="container">
        <h2>Λίστα Μαθητών</h2>
        <table border="1">
            <tr><th>ID</th><th>Όνομα</th><th>Επώνυμο</th><th>Βαθμός</th></tr>
            <c:forEach items="${students}" var="s">
                <tr>
                    <td>${s.id}</td>
                    <td>${s.firstname}</td>
                    <td>${s.lastname}</td>
                    <td>${s.grade}</td>
                </tr>
            </c:forEach>
        </table>
        <br>
        <a href="${pageContext.request.contextPath}/dashboard.jsp">Επιστροφή στο Dashboard</a>
    </div>
</body>
</html>
