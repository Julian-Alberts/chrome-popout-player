#!/usr/bin/env node
import * as fs from 'fs';
import { execSync } from 'child_process';

const tempDir = prepareTempDir();
const pluginDir = tempDir + '/src';
const commandSeperator = process.platform === 'win32' ? '&' : ';';

fs.mkdirSync(pluginDir);

let buildManifestDone = buildManifest()
console.log('buildManifest ' + (buildManifestDone ? 'done' : 'failed'));
if (!buildManifestDone) {
    process.exit(1);
}


let compileDone = compileTs()
console.log('compileTs ' + (compileDone ? 'done' : 'failed'));
if (!compileDone) {
    process.exit(2);
}

fs.copyFileSync(__dirname + '/../popout-icon.svg', pluginDir + '/popout-icon.svg');
fs.copyFileSync(__dirname + '/../popout-icon.png', pluginDir + '/popout-icon.png');

moveToBin();

function buildManifest(): boolean {
    try {
        let manifest: { content_scripts: ContentScript[] } = JSON.parse(fs.readFileSync(__dirname + '/../manifest.json').toString());

        let contentScript: ContentScript = {
            matches: [],
            js: ['./VideoElement.js']
        };

        let contentScriptAllFrames: ContentScript = {
            matches: [],
            js: ['./VideoElement.js'],
            all_frames: true
        };

        manifest.content_scripts.forEach(script => {
            if (script.all_frames) {
                contentScriptAllFrames.matches = contentScriptAllFrames.matches.concat(script.matches);
            } else {
                contentScript.matches = contentScript.matches.concat(script.matches);
            }
        });

        manifest.content_scripts.unshift(contentScript);
        manifest.content_scripts.unshift(contentScriptAllFrames);

        fs.writeFileSync(pluginDir + '/manifest.json', JSON.stringify(manifest));

    } catch (e) {
        console.error((<Error>e).name + ': ' + (<Error>e).message);
        return false;
    }
    return true;
}

function compileTs(): boolean {
    try {
        let command = `cd ..${commandSeperator} tsc --outDir ` + pluginDir + '/';
        execSync(command);
    } catch (e) {
        console.error((<Error>e).name + ': ' + (<Error>e).message);
        return false;
    }
    return true;
}

function moveToBin() {
    fs.unlinkSync(pluginDir + '/util.spec.js');
    if (fs.existsSync(__dirname + '/../bin')) {
        rmDir(__dirname + '/../bin');
    }
    fs.renameSync(pluginDir, __dirname + '/../bin');
    rmDir(tempDir);
}

function rmDir(path: string) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                rmDir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


function prepareTempDir(): string {
    let tempDir = __dirname + '/temp';
    if (fs.existsSync(tempDir)) {
        rmDir(tempDir)
    }
    fs.mkdirSync(tempDir);
    return tempDir;
}

type ContentScript = { matches: string[], js: string[], all_frames?: boolean };