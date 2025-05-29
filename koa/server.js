const cors = require("@koa/cors")
const Router = require("@koa/router")
const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const helmet = require("koa-helmet")

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(helmet())
app.use(bodyParser())

router.get("/", ctx => {
  ctx.response.body =
    "As we all stand on the shoulders of giants, tomorrow I hope to be the same for you."
})

router.post("/", ctx => {
  ctx.response.body =
    "As we all stand on the shoulders of giants, tomorrow I hope to be the same for you."
})

const basicAuth = process.env.BASIC_AUTH

router.use(async (ctx, next) => {
  //console.log(ctx.request.header);
  if (basicAuth && ctx.request.header.authorization !== basicAuth) {
    ctx.throw(401)
  }
  //console.log("Auth OK");
  await next()
})

router.get("/path", async ctx => {
  ctx.response.status = 200
  ctx.response.body = "OK"
})

router.post("/path", async ctx => {
  ctx.response.body = "OK"
})

router.use(ctx => {
  ctx.response.status = 404
})

app.use(router.routes())

app.on("error", e => {
  console.error(e)
})

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {})
console.log("listening on port " + port)
