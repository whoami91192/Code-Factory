FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y maven
RUN mvn clean install -DskipTests
CMD ["java", "-jar", "target/coursemanager-0.0.1-SNAPSHOT.jar"]
