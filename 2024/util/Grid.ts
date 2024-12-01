import { hashString, p } from "./utils";

const DEFAULT_DELIMITER = '';

/**
 * A simple Grid object with handy helper functions built-in for easier parsing and manipulation.
 * 
 * Constructors:
 *   const griddy: Grid<number> = 
 *       = new Grid<number>([[1,2,3],[4,5,6]]);    // Creates a 2x3 grid
 *       = Grid.fromDimensions<number>(5, 10, 0);  // Initializes a 5x10 grid with all zeros
 *       = Grid.fromRows<number>(['123','456']);   // Creates a 2x3 grid. Useful for parsing input line-by-line.
 *       = Grid.fromString<number>('123\n456');    // Creates a 2x3 grid
 *       = Grid.fromString<number>('1 2 3\n4 5 6', ' '); // Creates a 2x3 grid; different parsing
 *       = Grid.fromString<number>('123 456', '', ' ');  // Creates a 2x3 grid; different parsing
 * 
 * Helpers:
 *   griddy.print();
 *     or griddy.p();
 *   griddy.transpose();
 *   griddy.rotateCw();
 *   griddy.rotateCcw();
 *   const hash: number = griddy.hash();
 *   const value: number = griddy.getCell(1, 2);  // Can throw errors!
 */
export class Grid<T> {
    data: T[][];
    delimeter: string;
    numRows: number;
    numCols: number;

    /**
     * Create a Grid object from a 2D array of type T.
     * 
     * Invoke like so:
     *   const griddy: Grid<number> = new Grid<number>([[1],[2]]); // Most type safety
     *   const griddy: Grid<number> = new Grid([[1],[2]]); // Some type safety
     *   const griddy = new Grid<number>([[1],[2]]); // Some type safety
     *   const griddy = new Grid([[1],[2]]); // Least type safety; assumes based off the input
     * @param grid a 2D array of objects of type T.
     * @param delimeter the delimiter to be used for printing the grid; defaults to empty string
     */
    constructor(grid: T[][], delimeter = DEFAULT_DELIMITER) {
        this.data = grid;
        this.delimeter = delimeter;
        this._countRowsAndCols();
    }

    /**
     * Given a size and a type, create an empty Grid object.
     * An optional initialValue can be provided to initialize the grid, if you'd like. Otherwise initializes to undefined.
     * 
     * Example: 
     *   const griddy: Grid<string> = Grid.fromDimensions(4, 7, 'a');
     *   const griddy: Grid<number> = Grid.fromDimensions(1, 10);
     */
    static fromDimensions<T>(numRows: number, numCols: number, initialValue: T = undefined): Grid<T> {
        const grid: T[][] = [...Array(numRows).keys()].map(() => [...Array(numCols).keys()].map(() => initialValue));
        return new this(grid);
    }

    /**
     * Create a Grid object from a list of rows and a delimeter.
     * Invoke like so:
     *   const gritty: Grid<number> = Grid.fromRows<number>(['123','456']);
     *   const gritty: Grid<number> = Grid.fromRows<number>(['1 2 3','4 5 6'], ' ');
     * @param rows to be converted into a grid
     * @param delimeter defaults to empty string, but could be specified. Each row will be split using this.
     * @returns a new Grid object of the type specified.
     */
    static fromRows<RowType>(rows: string[], delimeter = DEFAULT_DELIMITER): Grid<RowType> {
        let containsWhitespace = false;
        return new this(rows.map((row: string) => {
            const stringVals: string[] = row.split(delimeter);
            if(!containsWhitespace && stringVals.some((val: string) => val.match(/^\s+$/))) {
                console.warn('Your grid parsing includes some whitespace! Did you set up your delimeter properly? It defaults to \'\'');
                containsWhitespace = true;
            }
            return stringVals as RowType[];
        })
        );
    }

    /**
     * Create a Grid object from a string that contains a grid.
     * Invoke like so:
     *   const gritty: Grid<number> = Grid.fromString<number>('123\n456');
     *   const gritty: Grid<number> = Grid.fromString<number>('1 2 3\n4 5 6', ' ');
     *   const gritty: Grid<number> = Grid.fromString<number>('123 456', '', ' ');
     * @param rows to be converted into a grid
     * @param delimeter defaults to empty string, but could be specified. Each row will be split using this.
     * @returns a new Grid object of the type specified.
     */
    static fromString<RowType>(grid: string, colDelimeter = DEFAULT_DELIMITER, rowDelimeter = '\n'): Grid<RowType> {
        return Grid.fromRows<RowType>(grid.split(rowDelimeter), colDelimeter);
    }

    /**
     * Internal helper function; should not be called outside of this class.
     * Updates the numRows and numCals class fields.
     * This function should be called every time the grid shape/size is modified.
     */
    _countRowsAndCols(): void {
        this.numRows = this.data.length;
        this.numCols = this.data[0]?.length ?? 0;
    }

    /**
     * Internal helper function; should not be called outside of this class.
     * Given a row number and/or column number, throw errors if they are out of bounds.
     * This function should be called every time a value from the grid is read.
     * @throws Errors if the index is out of bounds.
     */
    _boundsCheck({rowNum, colNum} : {rowNum?: number, colNum?: number}): void {
        if(   (rowNum !== undefined && (rowNum < 0 || rowNum >= this.numRows))
           || (colNum !== undefined && (colNum < 0 || colNum >= this.numCols))) {
            throw new Error(`Index out of bounds: Tried to read row ${rowNum}, col ${colNum}. `
                            + `Actual rows x cols: ${this.numRows} x ${this.numCols}`);
        }
    }

    /**
     * Print this instance of the Grid object. Uses the internal delimeter if one is not provided.
     * @param delimeter an optional string that is used to join the elements of the grid.
     */
    print(delimeter = this.delimeter): void {
        printGrid(this.data, delimeter);
    }

    /**
     * Alias for print, for brevity.
     */
    p(delimeter = this.delimeter): void {
        this.print(delimeter);
    }

    /**
     * Transpose this instance of the Grid object.
     * In other words, mirror the array over the diagnonal.
     * Returns the Grid object that was transposed.
     */
    transpose(): Grid<T> {
        this.data = transpose(this.data);
        this._countRowsAndCols();
        return this;
    }

    /**
     * Rotate this Grid clockwise.
     * Returns the Grid object that was rotated.
     */
    rotateCw(): Grid<T> {
        this.data = rotateCw(this.data);
        this._countRowsAndCols();
        return this;
    }

    /**
     * Rotate this Grid counter clockwise.
     * Returns the Grid object that was rotated.
     */
    rotateCcw(): Grid<T> {
        this.data = rotateCcw(this.data);
        this._countRowsAndCols();
        return this;
    }

    /**
     * Get a hash number based on this Grid.
     */
    hash(): number {
        return hashGrid(this.data);
    }

    /**
     * Given a row and column index, return the value within that cell.
     * @throws Errors if the index is out of bounds.
     */
    getCell(rowNum: number, colNum: number): T {
        this._boundsCheck({ rowNum, colNum });
        return this.data[rowNum][colNum];
    }

    // todo:
    // Constructor that clones from another Grid. Maybe that should be the default?
    // add row, col
    // delete row, col
    // get row, col
    // set row, col, cell
    // eachRow, eachCol, eachCell iterators. See how ExcelJS does it?
    // Pretty print - Each column should be of equal width. Requires knowing how wide the widest of each column is.
    // If the grid contains numbers, add parsing. Track highest/lowest per row?
    // Unit tests?
    // Should this move to using a "grid params" interface for the constructors?
}

/**
 * Given a 2D array of any type, print each line of the grid.
 * Each row gets joined together and printed as one long string.
 */
export function printGrid(grid: any[][], delimeter = DEFAULT_DELIMITER): void {
    grid.forEach((s)=> console.log(s.join(delimeter)));
    console.log();
}

/**
 * Given a 2D array of any type, create a hash string that represents the grid.
 * Can be used to check if grids are equal.
 * @returns a hashed string representing a 2D array
 */
export function hashGrid(grid: any[][]): number {
    const gridStr = grid.map((row: any[])=>row.join('')).join('');
    return hashString(String(gridStr));
}

/**
 * Given a 2D array of any type, swap the rows and columns.
 * In other words, mirror the array over the diagnonal and return a copy.
 */
export function transpose<T>(grid: T[][]): T[][] {
    return grid[0]!.map((_, colIndex) => grid.map(row => row[colIndex]))
}

/**
 * Given a 2D array of any type, rotate the grid clockwise.
 */
export function rotateCw<T>(grid: T[][]): T[][] {
    return grid[0]!.map((_, colIndex) => grid.map(row => row[colIndex]).reverse())
}

/**
 * Given a 2D array of any type, rotate the grid counterclockwise.
 */
export function rotateCcw<T>(grid: T[][]): T[][] {
    return rotateCw(rotateCw(rotateCw(grid))); // Yeah this should probably be done the right way
}
