const HtmlWebpackpPlugin = require('html-webpack-plugin');
const init = require('../init');
const globule = require('globule');
const path = require('path');

const files = globule.find([ `${init.SRC_DIR}/index.pug`, `${init.SRC_DIR}/**/*.pug`], {ignore:[`${init.ASSETS_DIR}/**/*.html`, `${init.ASSETS_DIR}/**/*.pug`]});
console.log(files);

const html = files.map(file => {
    filePath = path.relative(init.SRC_DIR, file);

    fileName = filePath.replace(/\.pug$/, '.html');
    console.log(fileName);
    return new HtmlWebpackpPlugin({
        filename: `${fileName}`,
        template: file,
        inject: false,
        minify: false,
    });
});

module.exports = html;