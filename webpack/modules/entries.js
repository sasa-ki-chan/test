const globule = require("globule");
const init = require("../init");
const path = require("path");

const jsFiles = globule.find(
`${init.JS_DIR}/*.js`, {ignore:[`${init.JS_DIR}/_*/*.js`, ]}
    );
const cssFiles = globule.find(
`${init.CSS_DIR}/*.scss`, {ignore:[`${init.CSS_DIR}/_*/*.scss`, ]}
    );
const jsEntries = jsFiles.reduce((entry, file) => {
    const name = path.parse(file).name;
    entry[init.DIST.JS + name] = file;
    return entry;
}, {});

const cssEntries = cssFiles.reduce((entry, file) => {
    const name = path.parse(file).name;
    entry[init.DIST.CSS + name] = file;
    return entry;
}, {});

const entries = Object.assign(jsEntries, cssEntries);

module.exports = entries;