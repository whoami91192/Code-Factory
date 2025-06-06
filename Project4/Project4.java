<<<<<<< HEAD
package Project4;

import java.util.Scanner;

public class Project4 {

    private static final int SIZE = 3; // Μέγεθος πίνακα
    private static char[][] board = new char[SIZE][SIZE]; // Πίνακας του παιχνιδιού
    private static char currentPlayer = 'X'; // Παίκτης που παίζει (X ή O)

    public static void main(String[] args) {
        initializeBoard(); // Αρχικοποίηση του πίνακα
        boolean gameWon = false;
        int moves = 0;

        System.out.println("Καλωσορίσατε στο παιχνίδι Τρίλιζα!");
        printBoard();

        while (!gameWon && moves < SIZE * SIZE) {
            System.out.println("Παίκτης " + currentPlayer + ", κάντε την κίνησή σας (γραμμή και στήλη):");
            int row, col;

            // Επανάληψη μέχρι να γίνει έγκυρη κίνηση
            while (true) {
                row = getInput("Γραμμή (0-2): ");
                col = getInput("Στήλη (0-2): ");

                if (isValidMove(row, col)) {
                    board[row][col] = currentPlayer;
                    break;
                } else {
                    System.out.println("Η θέση είναι κατειλημμένη ή εκτός ορίων. Δοκιμάστε ξανά.");
                }
            }

            printBoard();
            gameWon = checkWin(row, col);

            if (gameWon) {
                System.out.println("Συγχαρητήρια! Ο Παίκτης " + currentPlayer + " κέρδισε!");
                break;
            }

            moves++;
            if (moves == SIZE * SIZE) {
                System.out.println("Ισοπαλία! Δεν υπάρχουν άλλες κινήσεις.");
                break;
            }

            // Εναλλαγή παίκτη
            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        }
    }

    // Αρχικοποίηση πίνακα
    private static void initializeBoard() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                board[i][j] = ' '; // Κενές θέσεις
            }
        }
    }

    // Εμφάνιση πίνακα
    private static void printBoard() {
        System.out.println("Πίνακας:");
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                System.out.print(" " + board[i][j]);
                if (j < SIZE - 1) {
                    System.out.print(" |");
                }
            }
            System.out.println();
            if (i < SIZE - 1) {
                System.out.println("---+---+---");
            }
        }
    }

    // Εισαγωγή και έλεγχος τιμών
    private static int getInput(String message) {
        Scanner scanner = new Scanner(System.in);
        int value;
        while (true) {
            try {
                System.out.print(message);
                value = Integer.parseInt(scanner.nextLine());
                if (value >= 0 && value < SIZE) {
                    return value;
                } else {
                    System.out.println("Παρακαλώ εισάγετε αριθμό μεταξύ 0 και " + (SIZE - 1));
                }
            } catch (NumberFormatException e) {
                System.out.println("Μη έγκυρη είσοδος. Δοκιμάστε ξανά.");
            }
        }
    }

    // Έλεγχος εγκυρότητας κίνησης
    private static boolean isValidMove(int row, int col) {
        return row >= 0 && row < SIZE && col >= 0 && col < SIZE && board[row][col] == ' ';
    }

    // Έλεγχος αν έγινε νίκη
    private static boolean checkWin(int row, int col) {
        // Έλεγχος γραμμής
        if (board[row][0] == currentPlayer && board[row][1] == currentPlayer && board[row][2] == currentPlayer) {
            return true;
        }

        // Έλεγχος στήλης
        if (board[0][col] == currentPlayer && board[1][col] == currentPlayer && board[2][col] == currentPlayer) {
            return true;
        }

        // Έλεγχος κύριας διαγωνίου
        if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer) {
            return true;
        }

        // Έλεγχος αντίθετης διαγωνίου
        if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer) {
            return true;
        }

        return false;
    }
}
=======
package Project4;

import java.util.Scanner;

public class Project4 {

    private static final int SIZE = 3; // Μέγεθος πίνακα
    private static char[][] board = new char[SIZE][SIZE]; // Πίνακας του παιχνιδιού
    private static char currentPlayer = 'X'; // Παίκτης που παίζει (X ή O)

    public static void main(String[] args) {
        initializeBoard(); // Αρχικοποίηση του πίνακα
        boolean gameWon = false;
        int moves = 0;

        System.out.println("Καλωσορίσατε στο παιχνίδι Τρίλιζα!");
        printBoard();

        while (!gameWon && moves < SIZE * SIZE) {
            System.out.println("Παίκτης " + currentPlayer + ", κάντε την κίνησή σας (γραμμή και στήλη):");
            int row, col;

            // Επανάληψη μέχρι να γίνει έγκυρη κίνηση
            while (true) {
                row = getInput("Γραμμή (0-2): ");
                col = getInput("Στήλη (0-2): ");

                if (isValidMove(row, col)) {
                    board[row][col] = currentPlayer;
                    break;
                } else {
                    System.out.println("Η θέση είναι κατειλημμένη ή εκτός ορίων. Δοκιμάστε ξανά.");
                }
            }

            printBoard();
            gameWon = checkWin(row, col);

            if (gameWon) {
                System.out.println("Συγχαρητήρια! Ο Παίκτης " + currentPlayer + " κέρδισε!");
                break;
            }

            moves++;
            if (moves == SIZE * SIZE) {
                System.out.println("Ισοπαλία! Δεν υπάρχουν άλλες κινήσεις.");
                break;
            }

            // Εναλλαγή παίκτη
            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        }
    }

    // Αρχικοποίηση πίνακα
    private static void initializeBoard() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                board[i][j] = ' '; // Κενές θέσεις
            }
        }
    }

    // Εμφάνιση πίνακα
    private static void printBoard() {
        System.out.println("Πίνακας:");
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                System.out.print(" " + board[i][j]);
                if (j < SIZE - 1) {
                    System.out.print(" |");
                }
            }
            System.out.println();
            if (i < SIZE - 1) {
                System.out.println("---+---+---");
            }
        }
    }

    // Εισαγωγή και έλεγχος τιμών
    private static int getInput(String message) {
        Scanner scanner = new Scanner(System.in);
        int value;
        while (true) {
            try {
                System.out.print(message);
                value = Integer.parseInt(scanner.nextLine());
                if (value >= 0 && value < SIZE) {
                    return value;
                } else {
                    System.out.println("Παρακαλώ εισάγετε αριθμό μεταξύ 0 και " + (SIZE - 1));
                }
            } catch (NumberFormatException e) {
                System.out.println("Μη έγκυρη είσοδος. Δοκιμάστε ξανά.");
            }
        }
    }

    // Έλεγχος εγκυρότητας κίνησης
    private static boolean isValidMove(int row, int col) {
        return row >= 0 && row < SIZE && col >= 0 && col < SIZE && board[row][col] == ' ';
    }

    // Έλεγχος αν έγινε νίκη
    private static boolean checkWin(int row, int col) {
        // Έλεγχος γραμμής
        if (board[row][0] == currentPlayer && board[row][1] == currentPlayer && board[row][2] == currentPlayer) {
            return true;
        }

        // Έλεγχος στήλης
        if (board[0][col] == currentPlayer && board[1][col] == currentPlayer && board[2][col] == currentPlayer) {
            return true;
        }

        // Έλεγχος κύριας διαγωνίου
        if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer) {
            return true;
        }

        // Έλεγχος αντίθετης διαγωνίου
        if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer) {
            return true;
        }

        return false;
    }
}
>>>>>>> 3d4ba7fc22302007d202b1e6a9ffa2ee5cb6aad5
