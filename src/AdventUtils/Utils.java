package AdventUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Utils {

    /**
     * Reads in the input data from the input data file.
     * @return a list of the input data.
     */
    public static ArrayList<Integer> getInputData(String workingDir) {
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
}
