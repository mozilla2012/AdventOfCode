import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/2 for the day's problem.
 */
class Solution02 {
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
        ArrayList<String> inputData = Utils.getInputStrings("src/2021/02");
        // System.out.println(inputData);

        // Part 1
        int dep = 0;
        int hor = 0;
        for (String s : inputData) {
            String row[] = s.split(" ");
            switch(row[0]) {
                case "up":
                    dep -= Integer.parseInt(row[1]);
                    break;
                case "down":
                    dep += Integer.parseInt(row[1]);
                    break;
                case "forward":
                    hor += Integer.parseInt(row[1]);
                    break;
                default:
                    System.out.println("WTF");
            }
        }
        System.out.println(dep * hor);

        // Part 2
        dep = 0;
        hor = 0;
        int aim = 0;
        for (String s : inputData) {
            String row[] = s.split(" ");
            switch(row[0]) {
                case "up":
                    aim -= Integer.parseInt(row[1]);
                    break;
                case "down":
                    aim += Integer.parseInt(row[1]);
                    break;
                case "forward":
                    hor += Integer.parseInt(row[1]);
                    dep += (Integer.parseInt(row[1]) * aim);
                    break;
                default:
                    System.out.println("WTF");
            }
        }
        System.out.println(dep * hor);


    }

}