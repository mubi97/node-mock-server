const fs = require('fs');
const path = require('path');
const jsf = require('json-schema-faker');

function mkDirByPathSync(targetDir, {
    isRelativeToScript = false
} = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
}


exports.define = (req, res) => {
    let data = req.body;
    var endpoints = [];

    for (var path in data) {
        endpoints.push(path);
        mkDirByPathSync('app/data-routes' + path);
        for (var reqType in data[path]) {
            let def = Object.keys(data[path][reqType])[0];
            let content = JSON.stringify(data[path][reqType][def]);
            if(def == 'responseSchema') {
                content = content.replace('int', 'number');
                var fakeData = jsf(JSON.parse(content));
                content = JSON.stringify(fakeData);
            }
            fs.writeFileSync('app/data-routes' + path + '/' + reqType + '.json', content);
            
        }
    }

    res.send({
        message: 'Registered Successfully!'
    });
}