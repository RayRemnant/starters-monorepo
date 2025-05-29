const Koa = require("koa")
const app = new Koa()
const bodyParser = require("koa-bodyparser")
const Router = require("koa-router")
const router = new Router()

const scrapInit = require("./lib/scrapInit.js")

router.get("/", async ctx => {
  const { asin } = ctx.params

  const { browser, page } = await scrapInit()

  ctx.status = 200
  ctx.body = "OK"

  await browser.close()
})

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.PORT || 3000)
