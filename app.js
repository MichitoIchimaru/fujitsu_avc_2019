const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");

// load API
const recognizer = require("./routes/recognizer.js");

const app = new Koa();
const router = new Router();

// BodyParser String -> JSON
app.use(bodyParser({ jsonLimit: "10mb" }));

// x-response-time
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };

        ctx.app.emit("error", err, ctx);
    }
});

app.on("error", (err, ctx) => {
    console.log(err);
});

// Public Directory
app.use(serve(__dirname + "/public"));

// API Routing
router.use("/api/v1/recognizer", recognizer.routes());

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000, function() {
    console.log("Start Server http://localhost:3000");
});
