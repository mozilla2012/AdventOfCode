package AdventUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Utils {

    /**
     * Reads in the input data from the input data file. Assumes each number is separated by a comma.
     * @return a list of the input data.
     */
    public static ArrayList<Integer> getInputDataList(String workingDir) {
        ArrayList<Integer> input = new ArrayList<>();
        try {
            File myObj = new File(workingDir + "/input.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String line = myReader.nextLine();
                String[] vals = line.split(",");
                for (String s : vals) {
                    input.add(Integer.parseInt(s));
                }
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return input;
    }

    /**
     * Reads in the input data from the input data file.
     * @return a grid (int[][]) of the input data.
     */
    public static int[][] getInputDataGrid(String workingDir) {
        int lineCount = 0;
        int lineLength = 0;

        // First, get the size of the grid
        try {
            File myObj = new File(workingDir + "/input.txt");
            Scanner myReader = new Scanner(myObj);
            while(myReader.hasNextLine()) {
                lineLength = myReader.nextLine().length();
                lineCount++;
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        int[][] inputGrid = new int[lineLength][lineCount];

        // Then, actually read in the grid.
        try {
            File myObj = new File(workingDir + "/input.txt");
            Scanner myReader = new Scanner(myObj);
            int y = 0;
            while(myReader.hasNextLine()) {
                String line = myReader.nextLine();
                char[] lineChars = line.toCharArray();
                int x = 0;
                for (char c : lineChars) {
                    inputGrid[x][y] = Character.getNumericValue(c);
                    x++;
                }
                y++;
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return inputGrid;
    }

    /**
     * Prints a grid of ints.
     * @param grid of ints to print.
     */
    public static void printGrid(int[][] grid) {
        int numRows = grid[0].length;
        int numCols = grid.length;
        for(int y = 0; y < numRows; y++)
        {
            for(int x = 0; x < numCols; x++)
            {
                System.out.printf("%d", grid[x][y]);
            }
            System.out.printf("\n");
        }
    }

     /**
     * Prints a grid of ints.
     * @param grid of ints to print.
     */
    public static void printBoolGrid(boolean[][] grid, int maxX, int maxY) {
        for(int y = 0; y < maxY; y++)
        {
            for(int x = 0; x < maxX; x++)
            {
                System.out.printf("%c", grid[x][y] ? '#' : '.');
            }
            System.out.printf("\n");
        }
    }

    /**
     * Reads in the input data from the input data file.
     * @return a list of Strings. Each line in the file is a String.
     */
    public static ArrayList<String> getInputStrings(String workingDir) {
        ArrayList<String> input = new ArrayList<>();
        try {
            File myObj = new File(workingDir + "/input.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                input.add(myReader.nextLine());
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return input;
    }
}
