import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
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
        // Utils.printGrid(grid);

        int riskSum = 0;
        ArrayList<Basin> basins = new ArrayList<>();
        for(int y = 0; y < numRows; y++)
        {
            for(int x = 0; x < numCols; x++)
            {
                if (lessThanNeighbors(grid, x, y)) {
                    // System.out.println("Low point found at "+x+", "+y+": " + grid[x][y]);
                    riskSum += grid[x][y]+1;
                    basins.add(new Basin(x, y));
                }
            }
        }

        for (Basin b : basins) {
            int[][] visitedGrid = new int[numCols][numRows];
            b.size = 0;
            getBasinSize(grid, b, b.lowX, b.lowY, visitedGrid);
        }
        
        basins.sort(Comparator.comparing(Basin::getSize).reversed());
        // for (Basin b : basins) {
        //     System.out.println(b);
        // }

        System.out.println("Risk: " + riskSum);
        int part2 = (basins.get(0).size) * (basins.get(1).size) * (basins.get(2).size);
        System.out.println("Part 2: " + part2);
    }

    private static void getBasinSize(int[][] grid, Basin b, int x, int y, int[][] visitedGrid) {
        if (visitedGrid[x][y] == 1) {
            return;
        } else {
            visitedGrid[x][y] = 1;
        }
        int numRows = grid[0].length;
        int numCols = grid.length;
        b.size++;
        if (x != 0         && grid[x][y] < grid[x-1][y] && grid[x-1][y] != 9) {
            getBasinSize(grid, b, x-1, y, visitedGrid);
        }
        if (x != numCols-1 && grid[x][y] < grid[x+1][y] && grid[x+1][y] != 9) {
            getBasinSize(grid, b, x+1, y, visitedGrid);
        }
        if (y != 0         && grid[x][y] < grid[x][y-1] && grid[x][y-1] != 9) {
            getBasinSize(grid, b, x, y-1, visitedGrid);
        }
        if (y != numRows-1 && grid[x][y] < grid[x][y+1] && grid[x][y+1] != 9) {
            getBasinSize(grid, b, x, y+1, visitedGrid);
        }
    }


    /**
     * Given a grid and a point within it, determine if it's less than the value of its neighbors.
     * @param grid the array of points.
     * @param x the x coordinate of the point in question
     * @param y the y coordinate of the point in question
     * @return true if the given point is less than all of its neighbors.
     */
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


class Basin {
    int lowX;
    int lowY;
    int size;

    public Basin(int x, int y) {
        this.lowX = x;
        this.lowY = y;
        this.size = 0;
    }

    public String toString() {
        return String.format("[%d][%d] is size %d", lowX, lowY, size);
    }

    public int getSize() {
        return size;
    }

}