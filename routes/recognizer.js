const Router = require("koa-router");
const uuidv4 = require("uuid/v4");
const axios = require("axios");
const endpoint = process.env.InkRecognizerEndpoint;
const apikey = process.env.InkRecognizerAPIKey;
const router = new Router();

// POST /convert
router.post("/convert", async (ctx, next) => {
    const strokes = ctx.request.body.strokes;

    const res = await axios.put(endpoint + "/v1.0-preview/recognize", strokes, {
        headers: {
            "x-ms-client-request-id": uuidv4(),
            "Ocp-Apim-Subscription-Key": apikey
        }
    });
    ctx.body = res.data;
    ctx.status = 201;
});

module.exports = router;
