import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/13 for the day's problem.
 */
class Solution13 {
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
        ArrayList<String> inputData = Utils.getInputStrings("src/2021/13");
        Grid grid = parseInput(inputData);

        // grid.print();

        for (Fold f : grid.folds) {
            grid = foldGrid(grid, f);
        }
        grid.print();

    }


    /**
     * Folds the grid on itself across the given Fold object. 
     * @param grid to be folded
     * @param fold to be folded across
     * @return modified grid after the fold.
     */
    private static Grid foldGrid(Grid grid, Fold fold) {
        int numRows = grid.maxY;
        int numCols = grid.maxX;

        // System.out.println("folding at " + fold.line);

        if (fold.isVertical) {
            for(int y = fold.line + 1; y < numRows; y++)
            {
                for(int x = 0; x < numCols; x++)
                {
                    // System.out.println("Checking "+ x + " " + y);
                    if(grid.grid[x][y]) {
                        // System.out.println("Found!");
                        int newY = fold.line - (y - fold.line);
                        // System.out.println(newY);
                        grid.grid[x][newY] = true;
                        grid.grid[x][y] = false;
                    }
                }
            }
            grid.maxY = fold.line;

        } else {

            for(int y = 0; y < numRows; y++)
            {
                for(int x = fold.line + 1; x < numCols; x++)
                {
                    if(grid.grid[x][y]) {
                        int newX = fold.line - (x - fold.line);
                        grid.grid[newX][y] = true;
                        grid.grid[x][y] = false;
                    }
                }
            }
            grid.maxX = fold.line;
        }
        // grid.print();
        // System.out.println(grid.countDots());
        // System.exit(0);
        return grid;
    }


    /**
     * Parses the list of input data Strings into a usable Grid object, which contains the list of Folds.
     * @param inputData strings of data input
     * @return a usable Grid object
     */
    private static Grid parseInput(ArrayList<String> inputData) {
        ArrayList<Integer> xVals = new ArrayList<>();
        ArrayList<Integer> yVals = new ArrayList<>();
        int maxX = 0;
        int maxY = 0;

        Grid grid = new Grid();
        int foldListIndex = 0;

        // First, read in the Grid of points.
        for(int i = 0; i < inputData.size(); i++) {
            String s = inputData.get(i);
            if (s.equals("")) {
                // Time to parse the folds!
                foldListIndex = i+1;
                break;
            } else {
                String[] strVals = s.split(",");
                int x = Integer.parseInt(strVals[0]);
                int y = Integer.parseInt(strVals[1]);
                xVals.add(x);
                yVals.add(y);
                // Keep track of the bounds of the grid.
                if (x > maxX) {
                    maxX = x;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
        }
        assert xVals.size() == yVals.size();  // We should have the same number of values.
        
        // Second, actually create the grid from the read-in values.
        boolean[][] boolGrid = new boolean[maxX+1][maxY+1];
        for (int i = 0; i < xVals.size(); i++) {
            boolGrid[xVals.get(i)][yVals.get(i)] = true;
        }
        
        // Populate the Grid object itself.
        grid.grid = boolGrid;
        grid.maxY = grid.grid[0].length;
        grid.maxX = grid.grid.length;
        // Utils.printBoolGrid(grid.grid);

        final int isVerticalIndex = 11;
        final int valSubstring = 13;

        // Lastly, we must read in the fold values.
        for(int i = foldListIndex; i < inputData.size(); i++) { 
            String row = inputData.get(i);
            // System.out.println(row);
            boolean isVertical = (row.charAt(isVerticalIndex) == 'y');
            int line = Integer.parseInt(row.substring(valSubstring));
            Fold f = new Fold(line, isVertical);
            // System.out.println(f.line + " " + f.isVertical);
            grid.folds.add(f);
        }

        return grid;
    }
}


/**
 * This simple class represents a fold. A line and a direction.
 */
class Fold {
    int line;
    boolean isVertical;

    Fold(int line, boolean isVertical) {
        this.line = line;
        this.isVertical = isVertical;
    }
    public String toString() {
        return String.format("%c = %d", this.isVertical ? 'y' : 'x', line);
    }
}


/**
 * This represents the grid. The points, the max size, and the list of folds to apply
 */
class Grid {
    boolean[][] grid = {};
    int maxX;
    int maxY;
    ArrayList<Fold> folds = new ArrayList<>();
    
    public Grid() {
    }


    public void print() {
        Utils.printBoolGrid(this.grid, this.maxX, this.maxY);
        System.out.println(folds);
    }

    /**
     * Used for Part 1. Counts the number of dots present in the grid.
     * @return the number of dots in the grid.
     */
    public int countDots() {
        int count = 0;
        for(int y = 0; y < this.maxY; y++)
        {
            for(int x = 0; x < this.maxX; x++)
            {
                if (this.grid[x][y]) {
                    count++;
                }
            }
        }
        return count;
    }
}