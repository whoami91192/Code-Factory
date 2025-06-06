FROM eclipse-temurin:17-jdk

WORKDIR /app

# Εγκατάσταση Maven
RUN apt-get update && apt-get install -y maven

# Αντιγραφή των αρχείων του backend στο container
COPY . /app

# Build της Spring Boot εφαρμογής
RUN mvn clean install -DskipTests

# Εκκίνηση της εφαρμογής
CMD ["java", "-jar", "target/coursemanager-0.0.1-SNAPSHOT.jar"]
