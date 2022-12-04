import { AssertionError } from "assert";

async function runner() {

    // First, parse the arg.
    const myArgs = process.argv.slice(2);
    if (myArgs.length !== 1) {
        throw new Error(`Expected exactly one arg: The day of the challenge. Received args: ${myArgs}`);
    }
    // The standard I'm using is that all days will be two digits, padded with zeros if need be.
    const dayToRunNum: number = parseInt(myArgs[0]!);
    const dayToRun: string = (`00${dayToRunNum}`).slice(-2); // This is a hacky way to do pad zeros.

    console.log(`Running day ${dayToRun}...`);

    // Loading a module like this is probably a violation of the Geneva Conventions.
    const pathToFile: string = `../${dayToRun}/${dayToRun}.js`;
    const importedModule = await import(pathToFile);
    importedModule.adventMain();
}

runner();