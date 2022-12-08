// https://adventofcode.com/2022/day/7

let dirsOfSpecialSize: Directory[];

class Directory {
    name: string;
    size: number;
    parent?: Directory;
    visited: boolean;
    children: Directory[];

    constructor(inName: string, inParent: Directory | undefined) {
        this.name = inName;
        this.parent = inParent;
        this.size = 0;
        this.visited = false;
        this.children = [];
    }
}

export function adventMain(input: string): any {
    dirsOfSpecialSize = [];
    
    const commands: string[] = input.split('\n');

    let cwd = new Directory('/', undefined);
    const root = cwd;
    for(let i = 1; i < commands.length; i++) {
    
        const cmd = commands[i]!;
        // Handle CD
        if(cmd.includes('$ cd')) {
            let newDirName = cmd.substring(5);
            if (newDirName.includes('..')) {
                cwd = (cwd.name === '/') ? cwd : cwd.parent!;
            } else if(cwd.children.some((subDir)=>{return subDir.name === newDirName})) {
                // Subdir already lives in parent
                cwd = cwd.children.filter((subDir)=>{return subDir.name === newDirName})[0]!;
            } else {
                // Make the subdir object and add to parent. Then dive in.
                const subDir = new Directory(newDirName, cwd);
                cwd.children.push(subDir);
                cwd = subDir;
            }
        }
        // Handle LS
        if(cmd!.includes('$ ls')) {
            if (!cwd.visited) {
                cwd.visited = true;
                while(++i < commands.length && commands[i]!.charAt(0) !== '$') {
                    const dirOrSize: string = commands[i]!.split(' ')[0]!;
                    const size: number = dirOrSize.includes('dir') ? 0 : parseInt(dirOrSize);
                    cwd.size += size;
                }
                i--;
            }
        }
    };

    // Now do the math.
    calculateActualSize(root);
    return dirsOfSpecialSize.reduce((accumulator, currentDir)=>{return accumulator + currentDir.size}, 0);
}

function calculateActualSize(dir: Directory) {
    
    for(const subDir of dir.children) {
        calculateActualSize(subDir);
        dir.size += subDir.size;
    }
    if (dir.size <= 100000) {
        dirsOfSpecialSize.push(dir);
    }
}
