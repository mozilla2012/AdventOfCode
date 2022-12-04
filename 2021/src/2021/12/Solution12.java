import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/12 for the day's problem.
 */
class Solution12 {
    static SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss.S");

    // private static ArrayList<ArrayList<String>> acceptedPaths = new ArrayList<>();
    private static HashSet<String> acceptedPaths = new HashSet<>();

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
        ArrayList<String> inputData = Utils.getInputStrings("src/2021/12");

        HashMap<String, Cave> caveHash = createCaveHashMap(inputData);
        final String startCave = "start";
        
        int numPaths = 0;

        for (Cave smallCave : getSmallCaves(caveHash)) {
            ArrayList<String> visitedCaves = new ArrayList<>();
            visitedCaves.add(caveHash.get(startCave).name);
            for (Cave n : caveHash.get(startCave).neighbors) {
                numPaths = spelunk2(n, caveHash, numPaths, new ArrayList<>(visitedCaves), smallCave);
            }
        }
        System.out.println(acceptedPaths.size());
    }


    private static List<Cave> getSmallCaves(HashMap<String, Cave> caveHash) {
        return caveHash.values().stream()
            .filter(cave -> !cave.isLarge)
            .collect(Collectors.toList());
    }


    /**
     * Recursively dive to the end node.
     * @param currentCave
     * @param caveHash Map of all caves
     * @param numPaths How many paths have been found so far
     * @return the current number of paths found
     */
    private static int spelunk2(Cave currentCave, HashMap<String, Cave> caveHash, 
                                int numPaths, ArrayList<String> visitedCaves, Cave specialSmallCave) {
        final String endCave = "end";
        final String startCave = "start";

        if (currentCave.name.equals(endCave)) {
            numPaths++;
            // System.out.println(visitedCaves);
            acceptedPaths.add(visitedCaves.toString());
            return numPaths;
        }

        if ((currentCave.name.equals(startCave)) || 
            (currentCave.equals(specialSmallCave) && specialCaveVisitedTwice(visitedCaves, specialSmallCave)) || 
            (!currentCave.equals(specialSmallCave) && visitedCaves.contains(currentCave.name) && !currentCave.isLarge))
        {
            return numPaths;
        }

        visitedCaves.add(currentCave.name);

        for (Cave n : currentCave.neighbors) {
            numPaths = spelunk2(n, caveHash, numPaths, new ArrayList<>(visitedCaves), specialSmallCave);
        }
        return numPaths;
    }


    private static boolean specialCaveVisitedTwice(ArrayList<String> visitedCaves, Cave specialSmallCave) {
        int count = 0;
        for (String c : visitedCaves) {
            if (c.equals(specialSmallCave.name)) {
                count++;
            }
            if(count >=2) {
                return true;
            }
        }
    return false;
    }


    /**
     * Recursively dive to the end node.
     * @param currentCave
     * @param caveHash Map of all caves
     * @param numPaths How many paths have been found so far
     * @return the current number of paths found
     */
    private static int spelunk(Cave currentCave, HashMap<String, Cave> caveHash, 
                                int numPaths, ArrayList<String> visitedCaves) {
        final String endCave = "end";

        if (currentCave.name.equals(endCave)) {
            numPaths++;
            // System.out.println(visitedCaves);
            return numPaths;
        }
        if (visitedCaves.contains(currentCave.name) && !currentCave.isLarge) {
            return numPaths;
        }

        visitedCaves.add(currentCave.name);

        for (Cave n : currentCave.neighbors) {
            numPaths = spelunk(n, caveHash, numPaths, new ArrayList<>(visitedCaves));
        }
        return numPaths;
    }


    /***
     * Creates a hashmap of Cave objects from an input list of strings
     * @param inputData Strings representing a connection between two caves
     * @return a hash map of Cave objects and their string name.
     */
    private static HashMap<String, Cave> createCaveHashMap(ArrayList<String> inputData) {
        HashMap<String, Cave> caveHash = new HashMap<>();

        for (String s : inputData) {
            String[] caves = s.split("-");

            for (String caveName : caves) {
                Cave newCave = new Cave(caveName, isCaveLarge(caveName));
                caveHash.putIfAbsent(caveName, newCave);
            }
            caveHash.get(caves[0]).addNeighbor(caveHash.get(caves[1]));
        }
        return caveHash;
    }

    /**
     * Helper function to determine if a cave is "large" or not.
     * It just checks if the string is all uppercase.
     * @param cave String name of cave
     * @return true if cave name is all caps; false otherwise.
     */
    private static boolean isCaveLarge(String cave) {
        return (cave.equals(cave.toUpperCase()));
    }
}


class Cave {
    public String name;
    public ArrayList<Cave> neighbors;
    public boolean isLarge;

    public Cave(String name, boolean isLarge) {
        this.name = name;
        this.isLarge = isLarge;
        this.neighbors = new ArrayList<>();
    }


    /**
     * Creates a relationship between two caves. Adds the caves to each other's list of neighbors if it 
     * doesn't already exist.
     * @param newNeighbor cave to be added as a neighbor of "this"
     */
    public void addNeighbor(Cave newNeighbor) {
        if(!this.neighbors.contains(newNeighbor)) {
            this.neighbors.add(newNeighbor);
        }
        if(!newNeighbor.neighbors.contains(this)) {
            newNeighbor.neighbors.add(this);
        }   
    }


    public String toString(){
        String size = isLarge ? "Large" : "Small";
        String neighborString = "[";
        for (Cave c : this.neighbors) {
            neighborString += (c.name + ",");
        }
        neighborString += "]";
        return String.format("(Name: %s; Size: %s; Neighbors: %s)", this.name, size, neighborString);
    }


    public boolean equals(Cave c) {
        return this.name.equals(c.name);
    }
}