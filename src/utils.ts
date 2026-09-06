import { pathToFileURL } from "bun";
import fg from "fast-glob";

import path from "path";
import fs from "fs";

const system = new Map();
let runs = 0;

async function SaveData () {
    let route = path.join(__dirname, "data.txt");
    let data = JSON.stringify(Object.fromEntries(system.entries()));
    await fs.writeFileSync(route, data);
}

setInterval(() => {
    if (runs == 0) {
        const previous = fs.readFileSync(path.join(__dirname, "data.txt"), { encoding: 'utf8' });
        const json = JSON.parse(previous);
        for (let key in json) {
            system.set(key, json[key]);
        }
        runs++
        return;
    }

    SaveData()
    runs++
}, 2.5e3);

async function SearchRoutes(path : string, callback: any) {
    const data = new Map<any, any>();
    const files = await fg(`${path}/**/*`);

    const assign = (k: any, m: any, v: any) => {
        if (data.has(k)) {
            let a = data.get(k);
            if (Object.hasOwn(a, m)) return;
            a[m] = v;
            data.set(k, a);

        } else {
            let a = { [m]: v };
            data.set(k, a);
        }
    };

    for (let i of files) {
        let urls = i.split(/\//).slice(2).filter(x => !x.includes("."));
        if (urls.length <= 0) continue;
        
        const construct = "/" + urls.slice(1).join("/");
        const method = i.split(/\//).at(-1)?.split(/\./).shift();
        const file = (await import(pathToFileURL(i).href)).default;

        assign(construct, method, file);
    }

    callback(Array.from(data.entries()));
}

export { SearchRoutes, system };