const cors = require("@koa/cors")
const Router = require("@koa/router")
const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const helmet = require("koa-helmet")
const fs = require("fs").promises

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(helmet())
app.use(bodyParser())

router.get("/api", ctx => {
  ctx.response.set("Content-Type", "text/html")
  ctx.response.set("Cache-Control", "s-max-age=1, stale-while-revalidate")
  ctx.response.body =
    "As we all stand on the shoulders of giants, tomorrow I hope to be the same for you."
})

router.post("/api", ctx => {
  ctx.response.body =
    "As we all stand on the shoulders of giants, tomorrow I hope to be the same for you."
})

router.use(ctx => {
  ctx.response.status = 404
})

app.use(router.routes())

app.on("error", e => {
  console.error(e)
})

// PORT
const port = process.env.PORT || 5001
app.listen(port, () => {})
console.log("listening on port " + port)

// module.exports = app
