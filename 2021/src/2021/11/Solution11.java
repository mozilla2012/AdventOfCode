import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/11 for the day's problem.
 */
class Solution11 {
    static SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss.S");  
    static long numFlashes = 0;

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
        int[][] octoGrid = Utils.getInputDataGrid("src/2021/11");
        int numRows = octoGrid[0].length;
        int numCols = octoGrid.length;
        int numOctos = numCols * numRows;
        Utils.printGrid(octoGrid);
        
        int stepGoal = 10000;
        for(int i = 1; i <= stepGoal; i++) {
            // First, increase all octopuses by one.
            for(int y = 0; y < numRows; y++)
            {
                for(int x = 0; x < numCols; x++)
                {
                    octoGrid[x][y]++;
                }
            }

            // Then, if any are at value of 10, increase all neighbors. Set to 11 once it has flashed.
            for(int y = 0; y < numRows; y++)
            {
                for(int x = 0; x < numCols; x++)
                {
                    if(octoGrid[x][y] > 9) {
                        joltNeighbors(octoGrid, x, y);
                    }
                }
            }
            
            // Then set all octopuses over 9 back to zero.
            int flashes = 0;
            for(int y = 0; y < numRows; y++)
            {
                for(int x = 0; x < numCols; x++)
                {
                    if(octoGrid[x][y] > 9) {
                        octoGrid[x][y] = 0;
                        flashes++;
                    }
                }
            }
            if (flashes == numOctos){
                System.out.printf("All flash on step %d\n",i);
                System.exit(0);
            }
        }    
        System.out.println("");
        Utils.printGrid(octoGrid);
        System.out.println(numFlashes);    
    }


    private static void joltNeighbors(int[][] octoGrid, int x, int y) {
        int numRows = octoGrid[0].length;
        int numCols = octoGrid.length;

        if (x < 0 || y < 0 || x >= numCols || y >= numRows) {
            return;
        }
        // Utils.printGrid(octoGrid);
        // System.out.println();

        if (octoGrid[x][y] != Integer.MAX_VALUE) {
            octoGrid[x][y]++;
            if(octoGrid[x][y] > 9) {
                numFlashes++;
                octoGrid[x][y] = Integer.MAX_VALUE;
                joltNeighbors(octoGrid, x+1, y-1);
                joltNeighbors(octoGrid, x+1, y);
                joltNeighbors(octoGrid, x+1, y+1);
                joltNeighbors(octoGrid, x, y-1);
                joltNeighbors(octoGrid, x, y+1);
                joltNeighbors(octoGrid, x-1, y-1);
                joltNeighbors(octoGrid, x-1, y);
                joltNeighbors(octoGrid, x-1, y+1);    
            }
        }      
    }
}