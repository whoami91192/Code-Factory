package Project1;

import java.io.*;
import java.util.*;

public class Project1 {

    public static void main(String[] args) {
        String inputFileName = "numbers.txt";
        String outputFileName = "filtered_combinations.txt";

        try {
            // Step 1: Read numbers from file
            List<Integer> numbers = readNumbersFromFile(inputFileName);

            // Step 2: Sort the numbers
            Collections.sort(numbers);

            // Step 3: Generate combinations of 6 numbers
            List<int[]> combinations = generateCombinations(numbers);

            // Step 4: Filter combinations
            List<int[]> filteredCombinations = filterCombinations(combinations);

            // Step 5: Write filtered combinations to output file
            writeCombinationsToFile(filteredCombinations, outputFileName);

            System.out.println("Filtered combinations have been written to " + outputFileName);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    private static List<Integer> readNumbersFromFile(String fileName) throws IOException {
        List<Integer> numbers = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                for (String numStr : line.split(",")) {
                    int num = Integer.parseInt(numStr.trim());
                    if (num >= 1 && num <= 49) {
                        numbers.add(num);
                    }
                }
            }
        }
        if (numbers.size() < 6 || numbers.size() > 49) {
            throw new IllegalArgumentException("The file must contain between 6 and 49 numbers.");
        }
        return numbers;
    }

    private static List<int[]> generateCombinations(List<Integer> numbers) {
        List<int[]> combinations = new ArrayList<>();
        int n = numbers.size();
        int[] combination = new int[6];
        generateCombinationsRecursive(numbers, n, 6, 0, combination, 0, combinations);
        return combinations;
    }

    private static void generateCombinationsRecursive(List<Integer> numbers, int n, int r, int index, int[] combination, int i, List<int[]> combinations) {
        if (index == r) {
            combinations.add(combination.clone());
            return;
        }
        if (i >= n) return;

        combination[index] = numbers.get(i);
        generateCombinationsRecursive(numbers, n, r, index + 1, combination, i + 1, combinations);
        generateCombinationsRecursive(numbers, n, r, index, combination, i + 1, combinations);
    }

    private static List<int[]> filterCombinations(List<int[]> combinations) {
        List<int[]> filtered = new ArrayList<>();
        for (int[] combination : combinations) {
            if (isValidCombination(combination)) {
                filtered.add(combination);
            }
        }
        return filtered;
    }

    private static boolean isValidCombination(int[] combination) {
        return isEvenValid(combination) && isOddValid(combination) && isContiguousValid(combination)
                && isSameEndingValid(combination) && isSameTenValid(combination);
    }

    private static boolean isEvenValid(int[] combination) {
        int evenCount = 0;
        for (int num : combination) {
            if (num % 2 == 0) evenCount++;
        }
        return evenCount <= 4;
    }

    private static boolean isOddValid(int[] combination) {
        int oddCount = 0;
        for (int num : combination) {
            if (num % 2 != 0) oddCount++;
        }
        return oddCount <= 4;
    }

    private static boolean isContiguousValid(int[] combination) {
        for (int i = 1; i < combination.length; i++) {
            if (combination[i] - combination[i - 1] == 1) {
                return false;
            }
        }
        return true;
    }

    private static boolean isSameEndingValid(int[] combination) {
        int[] endings = new int[10];
        for (int num : combination) {
            endings[num % 10]++;
        }
        for (int count : endings) {
            if (count > 3) return false;
        }
        return true;
    }

    private static boolean isSameTenValid(int[] combination) {
        int[] tens = new int[5];
        for (int num : combination) {
            tens[num / 10]++;
        }
        for (int count : tens) {
            if (count > 3) return false;
        }
        return true;
    }

    private static void writeCombinationsToFile(List<int[]> combinations, String fileName) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(fileName))) {
            for (int[] combination : combinations) {
                bw.write(Arrays.toString(combination));
                bw.newLine();
            }
        }
    }
}
