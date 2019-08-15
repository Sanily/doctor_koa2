var add = function (controller) {
    //this指向koa-route
    console.log(`【START】process controller: ${controller}...`);
    //导入控制器的全部action
    let mapping = require(__dirname + '/../controllers/' + controller);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);// 控制器中的写法是GET /index, 此处从4开始取值，正好得到/index
            this.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            this.post(path, mapping[url]);
        } else {
            console.warn(`【START】invalid URL: ${url}`);
        }
        console.log(`【START】register URL mapping: ${controller}/${url}`);
    }
};

module.exports = add;
