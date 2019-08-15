// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        return '*';// 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyParser());//引入body解析器，用于解析post请求参数

const controllers = require('./core/controllers');
const route_register = require('./core/route-register');
router.add = route_register;

for (var controller of controllers) {
    router.add(controller);
}

// add router middleware:
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(8000);
console.log('app started at port 8000...');
