<<<<<<< HEAD
package gr.aueb.cf.ch1.ch1;

public class Project5 {

    private static final int ROWS = 30;
    private static final int COLUMNS = 12;
    private static final boolean[][] seats = new boolean[ROWS][COLUMNS];

    public static void main(String[] args) {
        // Δοκιμή κράτησης και ακύρωσης
        book('C', 2); // Κράτηση θέσης C2
        book('C', 2); // Προσπάθεια κράτησης της ίδιας θέσης
        cancel('C', 2); // Ακύρωση της κράτησης
        cancel('C', 2); // Προσπάθεια ακύρωσης μη κλεισμένης θέσης
    }

    /**
     * Κάνει κράτηση μιας θέσης αν δεν είναι ήδη κλεισμένη.
     * @param column η στήλη (A-L)
     * @param row η σειρά (1-30)
     */
    public static void book(char column, int row) {
        int colIndex = column - 'A';
        int rowIndex = row - 1;

        if (isValidSeat(colIndex, rowIndex)) {
            if (!seats[rowIndex][colIndex]) {
                seats[rowIndex][colIndex] = true;
                System.out.println("Η θέση " + column + row + " κρατήθηκε επιτυχώς.");
            } else {
                System.out.println("Η θέση " + column + row + " είναι ήδη κλεισμένη.");
            }
        } else {
            System.out.println("Μη έγκυρη θέση: " + column + row);
        }
    }

    /**
     * Ακυρώνει την κράτηση μιας θέσης αν είναι ήδη κλεισμένη.
     * @param column η στήλη (A-L)
     * @param row η σειρά (1-30)
     */
    public static void cancel(char column, int row) {
        int colIndex = column - 'A';
        int rowIndex = row - 1;

        if (isValidSeat(colIndex, rowIndex)) {
            if (seats[rowIndex][colIndex]) {
                seats[rowIndex][colIndex] = false;
                System.out.println("Η κράτηση της θέσης " + column + row + " ακυρώθηκε επιτυχώς.");
            } else {
                System.out.println("Η θέση " + column + row + " δεν είναι κλεισμένη.");
            }
        } else {
            System.out.println("Μη έγκυρη θέση: " + column + row);
        }
    }

    /**
     * Ελέγχει αν μια θέση είναι έγκυρη.
     * @param colIndex ο δείκτης της στήλης
     * @param rowIndex ο δείκτης της σειράς
     * @return true αν η θέση είναι έγκυρη, αλλιώς false
     */
    private static boolean isValidSeat(int colIndex, int rowIndex) {
        return colIndex >= 0 && colIndex < COLUMNS && rowIndex >= 0 && rowIndex < ROWS;
    }
}
=======
package gr.aueb.cf.ch1.ch1;

public class Project5 {

    private static final int ROWS = 30;
    private static final int COLUMNS = 12;
    private static final boolean[][] seats = new boolean[ROWS][COLUMNS];

    public static void main(String[] args) {
        // Δοκιμή κράτησης και ακύρωσης
        book('C', 2); // Κράτηση θέσης C2
        book('C', 2); // Προσπάθεια κράτησης της ίδιας θέσης
        cancel('C', 2); // Ακύρωση της κράτησης
        cancel('C', 2); // Προσπάθεια ακύρωσης μη κλεισμένης θέσης
    }

    /**
     * Κάνει κράτηση μιας θέσης αν δεν είναι ήδη κλεισμένη.
     * @param column η στήλη (A-L)
     * @param row η σειρά (1-30)
     */
    public static void book(char column, int row) {
        int colIndex = column - 'A';
        int rowIndex = row - 1;

        if (isValidSeat(colIndex, rowIndex)) {
            if (!seats[rowIndex][colIndex]) {
                seats[rowIndex][colIndex] = true;
                System.out.println("Η θέση " + column + row + " κρατήθηκε επιτυχώς.");
            } else {
                System.out.println("Η θέση " + column + row + " είναι ήδη κλεισμένη.");
            }
        } else {
            System.out.println("Μη έγκυρη θέση: " + column + row);
        }
    }

    /**
     * Ακυρώνει την κράτηση μιας θέσης αν είναι ήδη κλεισμένη.
     * @param column η στήλη (A-L)
     * @param row η σειρά (1-30)
     */
    public static void cancel(char column, int row) {
        int colIndex = column - 'A';
        int rowIndex = row - 1;

        if (isValidSeat(colIndex, rowIndex)) {
            if (seats[rowIndex][colIndex]) {
                seats[rowIndex][colIndex] = false;
                System.out.println("Η κράτηση της θέσης " + column + row + " ακυρώθηκε επιτυχώς.");
            } else {
                System.out.println("Η θέση " + column + row + " δεν είναι κλεισμένη.");
            }
        } else {
            System.out.println("Μη έγκυρη θέση: " + column + row);
        }
    }

    /**
     * Ελέγχει αν μια θέση είναι έγκυρη.
     * @param colIndex ο δείκτης της στήλης
     * @param rowIndex ο δείκτης της σειράς
     * @return true αν η θέση είναι έγκυρη, αλλιώς false
     */
    private static boolean isValidSeat(int colIndex, int rowIndex) {
        return colIndex >= 0 && colIndex < COLUMNS && rowIndex >= 0 && rowIndex < ROWS;
    }
}
>>>>>>> 3d4ba7fc22302007d202b1e6a9ffa2ee5cb6aad5
