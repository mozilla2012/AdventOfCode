# Welcome to 2022!

https://adventofcode.com/2022/

For this year I have decided to try TypeScript.

To run a certain day (e.g. day 2), call this:

```
 npm run buildrun 2
```

...and the util does all the rest. It reads in the sample, tests it first, then tries your actual puzzle input.

The targets in `package.json` are set up nicely. Target `buildrun` does a clean build and runs the given day.
