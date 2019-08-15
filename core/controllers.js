// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
const fs = require('fs');

var files = fs.readdirSync(__dirname + '/../controllers');

// 过滤出控制器文件:
var controllers = files.filter((f) => {
    return f.endsWith('.js');
});

module.exports = controllers;
