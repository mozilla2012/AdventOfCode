import { hashString, p } from "./utils";
import stringify from 'json-stable-stringify';

/**
 * HashSet!
 */
export class HashSet<T> {
    readonly _data: T[];
    readonly _hash: number[];
    size: number;

    /**
     * Create a HashSet!
     */
    constructor() {
        this._data = [];
        this._hash = [];
        this.size = 0;
    }

    /** 
     * @returns the JSON-stringified version of the provided argument.
     */
    _valueToJson(value: T): string {
        const str = stringify(value as unknown as object);
        if(str) {
            return str;
        } // Else, just stringify normally...
        return JSON.stringify(value);
    }

    /**
     * @returns a numerical hash representing the provided argument.
     */
    _valueToHash(value: T): number {
        return hashString(this._valueToJson(value));
    }

    /**
     * Appends a new element with a specified value to the end of the Set.
     */
    add(value: T): HashSet<T> {
        const hashedValue = this._valueToHash(value);
        if(!this._hasHash(hashedValue)) {
            this._data.push(value);
            this._hash.push(hashedValue);
            this.size++;
        }
        return this;
    }

    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    _hasHash(hashedValue: number): boolean {
        return this._hash.includes(hashedValue);
    }

    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has(value: T): boolean {
        return this._hasHash(this._valueToHash(value));
    }

    /**
     * Removes a specified value from the Set.
     * @returns Returns true if an element in the Set existed and has been removed, or false if the element does not exist.
     */
    delete(value: T): boolean {
        let index = this._hash.indexOf(this._valueToHash(value));
        if (index === -1) {
            return false;
        }
        this._data.splice(index, 1);
        this._hash.splice(index, 1);
        this.size--;
        return true;
    }

    /**
     * Executes a provided function once per each value in the Set object, in insertion order.
     */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        this._data.forEach(callbackfn, thisArg);
    }

    /**
     * Given an array of any type, return a HashSet of that type.
     */
    static fromArray<T>(array: T[]): HashSet<T> {
        const hs: HashSet<T> = new HashSet<T>();
        array.forEach(t=>hs.add(t));
        return hs;
    }

    print(): void {
        console.log(this._data);
    }
    
    p(): void {
        this.print();
    }
}
