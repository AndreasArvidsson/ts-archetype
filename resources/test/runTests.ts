import { globSync } from "glob";
import Mocha from "mocha";
import path from "node:path";

const mocha = new Mocha({
    ui: "tdd",
    color: true
});

const cwd = __dirname;
const files = globSync("**/**.test.ts", { cwd }).sort();

files.forEach((f) => mocha.addFile(path.resolve(cwd, f)));

try {
    mocha.run((failures) => {
        if (failures > 0) {
            throw Error(`${failures} tests failed.`);
        }
    });
} catch (error) {
    console.log((error as Error).message);
    process.exit(1);
}
