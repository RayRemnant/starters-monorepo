const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
puppeteer.use(StealthPlugin())

//const cookiesStorage = require("./db/_cookiesStorage.js")

// rotating

module.exports = async function init() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true
    // args: ['--proxy-server=http://158.247.199.162:3128'],
  })
  const page = await browser.newPage()

  const device_width = 1920
  const device_height = 1080

  await page.setCacheEnabled(false)
  await page.setViewport({ height: device_height, width: device_width })
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  )

  //page.setRequestInterception(true)

  // const client = await page.target().createCDPSession();
  // await client.send("Page.setDownloadBehavior", {
  // 	behavior: "allow",
  // 	downloadPath: "/tmp",
  // });

  //db.read()
  //const cookies = await cookiesStorage.get()
  //console.log("INIT COOKIES ", cookies)

  //const cookies = await kv.get("cookies");

  /* if (cookies) {
		await page.setCookie(...cookies);
	} else {
		console.log("previous cookies not found")
	} */

  return { browser, page }
}
