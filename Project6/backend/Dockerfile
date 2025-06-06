# -------- Στάδιο Build --------
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Ορίζουμε working directory
WORKDIR /app

# Αντιγραφή των dependency files
COPY pom.xml .

# Προφόρτωση dependencies για cache optimization
RUN mvn dependency:go-offline -B

# Αντιγραφή του υπόλοιπου source code
COPY src ./src

# Δημιουργία του jar χωρίς tests
RUN mvn clean package -DskipTests

# -------- Στάδιο Εκτέλεσης --------
FROM eclipse-temurin:17-jdk-alpine

# Ορίζουμε working directory
WORKDIR /app

# Αντιγραφή του jar από το build stage
COPY --from=build /app/target/*.jar app.jar

# Πόρτα της εφαρμογής
EXPOSE 8080

# Εντολή εκκίνησης
ENTRYPOINT ["java", "-jar", "app.jar"]
