import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/9 for the day's problem.
 */
class Solution09 {
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
        int[][] grid = Utils.getInputDataGrid("src/2021/09");
        int numRows = grid[0].length;
        int numCols = grid.length;
        //Utils.printGrid(grid);

        int riskSum = 0;
        for(int y = 0; y < numRows; y++)
        {
            for(int x = 0; x < numCols; x++)
            {
                if (lessThanNeighbors(grid, x, y)) {
                    //System.out.println("Low point found at "+x+", "+y+": " + grid[x][y]);
                    riskSum += grid[x][y]+1;
                }
            }
        }
        System.out.println(riskSum);
    }


    private static boolean lessThanNeighbors(int[][] grid, int x, int y) {
        int numRows = grid[0].length;
        int numCols = grid.length;
        boolean lessThanLeft  = (x == 0         || grid[x][y] < grid[x-1][y]);
        boolean lessThanRight = (x == numCols-1 || grid[x][y] < grid[x+1][y]);
        boolean lessThanAbove = (y == 0         || grid[x][y] < grid[x][y-1]);
        boolean lessThanBelow = (y == numRows-1 || grid[x][y] < grid[x][y+1]);
        
        return lessThanAbove && lessThanBelow && lessThanLeft && lessThanRight;
    }
}