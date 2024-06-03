const path = require('path');
//公開ディレクトリの名前
const DIST_NAME = 'htdocs';



const MODE = process.env.NODE_ENV;
console.log(MODE);
const SRC_DIR = path.resolve(__dirname, '../src');
const DIST_DIR = path.resolve(__dirname, `../${DIST_NAME}`);
const ASSETS_DIR = path.resolve(SRC_DIR, './assets');
const JS_DIR = path.resolve(ASSETS_DIR, './js');
const CSS_DIR = path.resolve(ASSETS_DIR, './css');
const IMG_DIR = path.resolve(ASSETS_DIR, './img');

console.log(SRC_DIR);

const DIST = {
    JS:  path.join('/assets', 'js/'),
    CSS: path.join('/assets', 'css/'),
    IMG: path.join('/assets', 'img/'),
}
module.exports = { SRC_DIR, DIST_DIR, ASSETS_DIR, JS_DIR, CSS_DIR, IMG_DIR, DIST, MODE};