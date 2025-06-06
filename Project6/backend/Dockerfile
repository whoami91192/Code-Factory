# Βήμα 1: Χτίσιμο της εφαρμογής με Maven
FROM maven:3.8.5-eclipse-temurin-17 AS build

# Ορίζουμε τον working directory
WORKDIR /app

# Αντιγράφουμε το POM και κατεβάζουμε τις εξαρτήσεις
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Αντιγράφουμε τον υπόλοιπο πηγαίο κώδικα
COPY src ./src

# Δημιουργούμε το executable jar
RUN mvn clean package -DskipTests

# Βήμα 2: Εκτέλεση της εφαρμογής σε slim image
FROM eclipse-temurin:17-jdk-alpine

# Δημιουργούμε φάκελο για την εφαρμογή
WORKDIR /app

# Αντιγράφουμε το JAR από το build stage
COPY --from=build /app/target/*.jar app.jar

# Εκκίνηση της εφαρμογής
ENTRYPOINT ["java", "-jar", "app.jar"]
