import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/3 for the day's problem.
 */
class Solution03 {
    static SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss.S");  

    public static void main (String[] args) {
        Date startTime = new Date();          
        System.out.printf("Starting at %s\n", formatter.format(startTime));

        doPuzzle();

        Date endTime = new Date();
        long time_difference = endTime.getTime() - startTime.getTime();  
        System.out.printf("Finished at %s; took %d milliseconds\n", formatter.format(endTime), time_difference);
    }


    /**
     * Actually runs the puzzle.
     */
    private static void doPuzzle() {
        System.out.println("Puzzling...");
        int[][] binaries = Utils.getInputDataGrid("src/2021/03");
        // Utils.printGrid(binaries);

        int numRows = binaries[0].length;
        int numCols = binaries.length;
        String gammaRate = "";
        String epsilonRate = "";
        for(int x = 0; x < numCols; x++)
        {
            int count0 = 0;
            int count1 = 0;
            for(int y = 0; y < numRows; y++)
            {             
                if(binaries[x][y] == 1) {
                    count1++;
                } else {
                    count0++;
                }
            }
            gammaRate   += (count1 > count0) ? "1" : "0";
            epsilonRate += (count1 > count0) ? "0" : "1";
        }

        // Power consumption: (Part 1)
        System.out.println(Integer.parseInt(epsilonRate, 2) * Integer.parseInt(gammaRate, 2));
    
        // Part 2:
        int o2g = getRating(binaries, true);
        int co2 = getRating(binaries, false);
        System.out.println(o2g + " * " + co2 + " = " + co2*o2g);
    
    }


    /**
     * Gets the O2 or CO2 rating, depending on the input boolean.
     * @param grid The grid of binary for the input
     * @param isO2g True if O2 gen is desired; false if CO2
     * @return the decimal value of the O2 Genarator rating or the CO2 Generator rating
     */
    private static int getRating(int[][] grid, boolean isO2g) {
        int numRows = grid[0].length;
        int numCols = grid.length;

        // First we need to set up a way to track the "valid" rows that could contain the rating.
        ArrayList<Boolean> validRows = new ArrayList<>();
        for (int x = 0; x < numRows; x++){
            validRows.add(true);
        }

        // Then we remove the invalid rows until only one remains.
        for (int x = 0; x < numCols; x++) {
            validRows = removeInvalidRows(grid, x, validRows, isO2g);

            // There's probably a fancier way to do this with lambdas...
            int validCount = 0;
            for(boolean b : validRows) {
                validCount += b ? 1 : 0;
            }
            if (validCount == 1) {
                break;
            } else if (validCount == 0) {
                System.out.println("Woah, we should not have zero rows...");
            }
        }

        // Get the index of the row that contains the rating.
        int indexOfRating = 0;
        for (int y = 0; y < numRows; y++) { 
            if (validRows.get(y) == true) {
                indexOfRating = y;
                break;
            }
        }
        return convertRowToInt(grid, indexOfRating);
    }


    /**
     * Given a the current column index to analyze, determine which is more common: ones or zeros.
     * Then, depending on if we want the O2 generator rating or not, remove the rows that are not
     * valid and return that list.
     * @param grid The grid of values
     * @param currentIndex The index of the column to analyze
     * @param validRows A list of booleans stating which rows are still valid
     * @param isO2g If we are analyzing the O2 Generator rating, the criteria is different compared to
     * the CO2 rating
     * @return a list of valid rows after analyzing the "current Index" column
     */
    private static ArrayList<Boolean> removeInvalidRows(int[][] grid, int currentIndex,
            ArrayList<Boolean> validRows, boolean isO2g) {
        
        // First, determine which value (0 or 1) is more common in the currentIndex column.
        int numRows = grid[0].length;
        int oneCounter = 0;
        for (int y = 0; y < numRows; y++) {
            if (validRows.get(y)) {
                oneCounter += (grid[currentIndex][y] == 0) ? -1 : 1;
            }
        }
        
        // For O2 we want the more common value (between 0 and 1). For C02 we want the less common.
        int valToKeep;
        if (isO2g) {
            valToKeep = (oneCounter >= 0) ? 1 : 0;
        } else {
            valToKeep = (oneCounter >= 0) ? 0 : 1;
        }

        // Cross out (i.e. set to false) the rows that are not valid.
        for (int y = 0; y < numRows; y++){
            if (grid[currentIndex][y] != valToKeep) {
                validRows.set(y, false);
            }
        }
        return validRows;
    }

    /**
     * Given a grid and an index, return the value of that row in Base 10.
     * @param grid A 2D array of boolean values
     * @param indexOfRow The row to convert to an integer.
     * @return The integer value of the bits in the row of the grid.
     */
    private static int convertRowToInt(int[][] grid, int indexOfRow) {
        // You could do this with some power of two math, but this is easier to comprehend IMO.
        String row = "";
        int numCols = grid.length;
        for (int x = 0; x < numCols; x++) { 
            row += grid[x][indexOfRow];
        }
        return Integer.parseInt(row, 2);
    }
}
