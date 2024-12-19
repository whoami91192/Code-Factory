package Project3;

import java.io.*;
import java.util.*;

public class Project3 {
    public static void main(String[] args) {
        // Πίνακας 128x2
        int[][] charFrequency = new int[128][2];

        // Αρχικοποίηση του πίνακα με τους χαρακτήρες ASCII
        for (int i = 0; i < 128; i++) {
            charFrequency[i][0] = i; // Αποθήκευση του χαρακτήρα
            charFrequency[i][1] = 0; // Μηδενισμός συχνότητας
        }

        // Διαβάζουμε το αρχείο
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
            int ch;
            while ((ch = br.read()) != -1) {
                // Ελέγχουμε αν ο χαρακτήρας είναι λατινικός και όχι κενός
                if (ch >= 0 && ch < 128 && !Character.isWhitespace(ch)) {
                    charFrequency[ch][1]++; // Αύξηση συχνότητας
                }
            }
        } catch (IOException e) {
            System.err.println("Σφάλμα κατά την ανάγνωση του αρχείου: " + e.getMessage());
            return;
        }

        // Ταξινόμηση του πίνακα ανά χαρακτήρα (προαιρετικά)
        Arrays.sort(charFrequency, Comparator.comparingInt(a -> a[0]));
        System.out.println("Στατιστικά ταξινομημένα ανά χαρακτήρα:");
        for (int[] entry : charFrequency) {
            if (entry[1] > 0) {
                System.out.println((char) entry[0] + ": " + entry[1]);
            }
        }

        // Ταξινόμηση του πίνακα ανά συχνότητα
        Arrays.sort(charFrequency, (a, b) -> b[1] - a[1]);
        System.out.println("\nΣτατιστικά ταξινομημένα ανά συχνότητα:");
        for (int[] entry : charFrequency) {
            if (entry[1] > 0) {
                System.out.println((char) entry[0] + ": " + entry[1]);
            }
        }
    }
}
