// https://adventofcode.com/2024/day/9

import { p } from "../../util/utils";

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let fixed: number[] = [];
    const vals: number[] = lines[0].split('').map(s=>parseInt(s));
    const numFiles = Math.ceil(vals.length/2);
    const numSpace = Math.floor(vals.length/2);
    p(numFiles, numSpace);
    let fileId = 0;
    let reverseFileId = numFiles - 1;
    let isFile = true;
    let valIter = 0;
    let itemSize = vals[valIter++];
    let reverseFileSize = vals[reverseFileId*2];
    p(`Reverse file size: ${reverseFileSize}, id: ${reverseFileId}`);
    p(vals);
    p();
    let checksum = 0;
    let checksumIndex = 0;
    let run = true;
    let loopCount = 0;
    while(run) {
        
        if(isFile) {
            p(`${fileId} has size ${itemSize}`);
            itemSize--;
            fixed.push(fileId);
            if(itemSize <= 0) {
                isFile = false;
                itemSize = vals[valIter++];
                p(`Finished block ${fileId}, blank space of size ${itemSize}`);
                fileId++;
                if(fileId >= reverseFileId) {
                    run = false;
                }
            }
        } else {
            // Is empty:
            if(itemSize <= 0) {
                isFile = true;
                itemSize = vals[valIter++];
                p('New size file', itemSize);
                if(itemSize <= 0) {
                    p('ITEM SIZE IS ZERO! WHAT DO WE DO?')
                    p(valIter-1, isFile);
                    break;
                }
                p('Switching back to the real block')
                // p(fixed);
            } else {
                itemSize--;
                p(`Reverse file size: ${reverseFileSize}, id: ${reverseFileId}`);
                // Push one block of the last file ID
                fixed.push(reverseFileId);
                reverseFileSize--;
                if(reverseFileSize <= 0) {
                    reverseFileId--;
                    if(reverseFileId !== fileId) {
                        reverseFileSize = vals[reverseFileId*2];
                    }
                    p(`New reverse file: ${reverseFileId}, size: ${reverseFileSize}`);
                }
            }
        }
        if(fixed[0] === -1) {
            p('fail');
            break;
        }
        p(String(fixed));
        if(loopCount++ >= 10 && fixed.length > 0){
            checksum += fixed.shift() * checksumIndex++;
        }
        // if(valIter > 60) {
        //     break;
        // }
    }
    // AFTER LOOP ===================================
    
    p('remaining file', reverseFileSize);
    p(String(fixed));
    for(let i = 0; i < reverseFileSize; i++) {
        p('pushing!');
        fixed.push(reverseFileId);
        p(String(fixed));
    }

    while(fixed.length > 0) {
        checksum += fixed.shift() * checksumIndex++;
        p(String(fixed));
    }
    p(String(fixed.length), checksumIndex);
    return checksum;
}
