<<<<<<< HEAD
package Project2;

public class Project2 {

    public static int findMaximumSubarraySum(int[] arr) {
        // Αρχικοποίηση τοπικού και συνολικού μέγιστου
        int localMax = arr[0];
        int globalMax = arr[0];

        // Διατρέχουμε τον πίνακα από τη δεύτερη θέση
        for (int i = 1; i < arr.length; i++) {
            // Υπολογίζουμε το τοπικό μέγιστο
            localMax = Math.max(localMax + arr[i], arr[i]);

            // Ενημερώνουμε το συνολικό μέγιστο
            globalMax = Math.max(globalMax, localMax);
        }

        return globalMax;
    }

    public static void main(String[] args) {
        // Παράδειγμα πίνακα
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

        // Υπολογισμός και εκτύπωση αποτελέσματος
        int maxSum = findMaximumSubarraySum(arr);
        System.out.println("Maximum Subarray Sum: " + maxSum);
    }
=======
package Project2;

public class Project2 {

    public static int findMaximumSubarraySum(int[] arr) {
        // Αρχικοποίηση τοπικού και συνολικού μέγιστου
        int localMax = arr[0];
        int globalMax = arr[0];

        // Διατρέχουμε τον πίνακα από τη δεύτερη θέση
        for (int i = 1; i < arr.length; i++) {
            // Υπολογίζουμε το τοπικό μέγιστο
            localMax = Math.max(localMax + arr[i], arr[i]);

            // Ενημερώνουμε το συνολικό μέγιστο
            globalMax = Math.max(globalMax, localMax);
        }

        return globalMax;
    }

    public static void main(String[] args) {
        // Παράδειγμα πίνακα
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

        // Υπολογισμός και εκτύπωση αποτελέσματος
        int maxSum = findMaximumSubarraySum(arr);
        System.out.println("Maximum Subarray Sum: " + maxSum);
    }
>>>>>>> 3d4ba7fc22302007d202b1e6a9ffa2ee5cb6aad5
}