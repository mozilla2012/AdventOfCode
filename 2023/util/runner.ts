import * as fs from 'fs';

async function runner() {

    // First, parse the arg so we can tell what day we're starting with.
    const myArgs = process.argv.slice(2);
    if (myArgs.length !== 1) {
        throw new Error(`Expected exactly one arg: The day of the challenge. Received args: ${myArgs}`);
    }
    // The standard I'm using is that all days will be two digits, padded with zeros if need be.
    const dayToRunNum: number = parseInt(myArgs[0]!);
    const dayToRun: string = (`00${dayToRunNum}`).slice(-2); // This is a hacky way to do pad zeros.

    console.log(`Running day ${dayToRun}...`);


    // Loading a module like this is probably a violation of the Geneva Conventions.
    const pathToDir: string = `days/${dayToRun}`;
    const pathToCode: string =   `../${pathToDir}/${dayToRun}.js`; // Reading in a module? Your starting dir is the built .js file.
    const pathToTest: string =   `build/${pathToDir}/sample.txt`;  // Reading in a file? Your starting point is ...the root of the project?
    const pathToPuzzle: string = `build/${pathToDir}/puzzle.txt`;  //                    Again, this code is probably highly illegal.
    

    // Import the day's module:
    const importedModule = await import(pathToCode);


    // Read in the test file
    const testFileContent: string = fs.readFileSync(pathToTest, 'utf8');
    const testFileLines: string[] = testFileContent.split('\n');
    if (testFileLines.length < 2) {
        throw new Error('The test file (sample.txt) should start with two lines: The first being the expected answer and the second some' 
            + 'sort of divider. The test data should start on line 3.');
    }
    const expectedTestResult = testFileLines.shift();
    testFileLines.shift();
    const testData = testFileLines.join('\n');


    // Run the test data!
    console.log('Testing...\n');
    const testResult: any = await importedModule.adventMain(testData);
    if (testResult != expectedTestResult) {
        console.log(`Expected to get ${expectedTestResult} but got ${testResult}.`)
        process.exit(1);
    }
    console.log('\nTest passed! Attempting main puzzle...\n');
    

    // Run the main puzzle!
    const puzzleFileContent: string = fs.readFileSync(pathToPuzzle, 'utf8');
    const mainResult: any = await importedModule.adventMain(puzzleFileContent);
    console.log('\nTry this!:\n' + mainResult + '\n');
}

runner();