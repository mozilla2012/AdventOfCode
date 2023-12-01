# Welcome to 2023!

https://adventofcode.com/2023/

This year I have decided to continue to use TypeScript.

## Daily setup:
1. Copy the day 00 folder and rename it (and 00.ts) for the appropriate day.
1. Copy the day's sample input and sample output from the official website. Paste them into the sample.txt below and above the line, respectively.
1. Paste part 1's input into puzzle.txt. When done with part 1, paste part 2's input into puzzle.txt.

## Running

To run a certain day (e.g. day 2), call this:

```
 npm run buildrun 2
```

...and the util does all the rest. It reads in the sample, tests it first, then tries your actual puzzle input.

The targets in `package.json` are set up nicely. Target `buildrun` does a clean build and runs the given day.

## Initial setup

1. Check out this package
1. Ensure you have `npm` installed
1. Run `npm install typescript` (since for some reason `npm install` doesn't handle that for you)
1. Run the command in the 

## Todo:
1. Add puzzle.txt to .gitignore. I shouldn't be committing that.
1. Add auto-submission to testing