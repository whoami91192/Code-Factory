
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . /app
RUN ./mvnw clean install -DskipTests
CMD ["java", "-jar", "target/coursemanager-0.0.1-SNAPSHOT.jar"]
