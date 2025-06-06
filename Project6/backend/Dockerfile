# Βήμα 1: Maven build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Αντιγραφή αρχείων POM και source code
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

# Χτίσιμο της εφαρμογής
RUN mvn clean package -DskipTests

# Βήμα 2: Εκτέλεση με JDK runtime
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Αντιγραφή του jar από το build stage
COPY --from=build /app/target/coursemanager-0.0.1-SNAPSHOT.jar app.jar

# Άνοιγμα θύρας
EXPOSE 8080

# Εκτέλεση της εφαρμογής
ENTRYPOINT ["java", "-jar", "app.jar"]