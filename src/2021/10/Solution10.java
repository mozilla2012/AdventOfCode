import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Stack;

import javax.swing.plaf.synth.SynthScrollBarUI;
import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/10 for the day's problem.
 */
class Solution10 {
    static SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss.S");  
    private static final char[] LEFT_BRACKETS  = {'(', '{', '[', '<'};
    private static final char[] RIGHT_BRACKETS = {')', '}', ']', '>'};

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
        ArrayList<String> inputData = Utils.getInputStrings("src/2021/10");

        
        int score1 = 0;
        ArrayList<Long> scores2 = new ArrayList<>();
        for (String line : inputData) {
            Stack<Character> leftBrackets = new Stack<Character>();
            for (int i = 0; i < line.length(); i++) {
                char bracket = line.charAt(i);
                if(isLeftBracket(bracket)) {
                    leftBrackets.push(bracket);
                } else {
                    if (doBracketsPair(leftBrackets.peek(), bracket)) {
                        leftBrackets.pop();
                    } else {
                        // System.out.printf("Expected %c, but found %c instead.\n", leftBrackets.peek(), bracket);
                        score1 += bracketValue(bracket);
                        leftBrackets.clear();
                        break;
                    }
                }
            }
            // System.out.println(leftBrackets);
            if(!leftBrackets.empty()) {
                scoreRow(scores2, leftBrackets);
            }
        }
        System.out.printf("Part 1 score: %d\n", score1);

        Collections.sort(scores2);
        System.out.printf("Part 2 score: %d\n", scores2.get((scores2.size()/2)));
    }


    private static void scoreRow(ArrayList<Long> scores, Stack<Character> remainingBrackets) {
        // System.out.println(remainingBrackets);
        int itemsToPop = remainingBrackets.size();
        long score = 0;
        for(int i = 0; i < itemsToPop; i++) {
            char bracket = remainingBrackets.pop();
            score *= 5;
            score += bracketValuePart2(bracket);
            // System.out.printf("popped %c, score is now %d;   ", bracket, score);
        }
        scores.add(score);
        // System.out.println("   " + score);
    }


    private static int bracketValuePart2(char bracket) {
        if (bracket == '(') {
            return 1;
        }
        if (bracket == '[') {
            return 2;
        }
        if (bracket == '{') {
            return 3;
        }
        if (bracket == '<') {
            return 4;
        }
        System.out.println("This shouldn't happen.");
        return -1;
    }


    private static int bracketValue(char bracket) {
        if (bracket == ')') {
            return 3;
        }
        if (bracket == ']') {
            return 57;
        }
        if (bracket == '}') {
            return 1197;
        }
        if (bracket == '>') {
            return 25137;
        }
        System.out.println("This shouldn't happen.");
        return -1;
    }


    private static boolean doBracketsPair(char left, char right) {
        return (
            (left == '{' && right == '}') ||
            (left == '(' && right == ')') ||
            (left == '<' && right == '>') ||
            (left == '[' && right == ']')
        );
    }


    private static boolean isLeftBracket(char bracket) {
        for (char b : LEFT_BRACKETS) {
            if (b == bracket) {
                return true;
            }
        }
        return false;
    }
}