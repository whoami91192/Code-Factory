
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" />
    <title>Καθηγητές</title>
</head>
<body>
    <div class="container">
        <h2>Λίστα Καθηγητών</h2>
        <table border="1">
            <tr><th>ID</th><th>Όνομα</th><th>Επώνυμο</th></tr>
            <c:forEach items="${teachers}" var="t">
                <tr>
                    <td>${t.id}</td>
                    <td>${t.firstname}</td>
                    <td>${t.lastname}</td>
                </tr>
            </c:forEach>
        </table>
        <br>
        <a href="${pageContext.request.contextPath}/dashboard.jsp">Επιστροφή στο Dashboard</a>
    </div>
</body>
</html>
