const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const REGION = "asia-northeast1"
const thailandPost = require("./thailandPost");
const msgTemplate = require("./msgTemplate")
const lineHelper = require("./lineHelper")

exports.webhook = onRequest({ region: REGION }, (async (request, response) => {

    let event = request.body.events[0]
    const { replyToken, message, type } = event

    try {
        if (type === "message" && message.type === "text") {

            if (message.text.trim().toUpperCase().endsWith("TH")) {
                console.log("ส่งข้อความไปค้นหาพัสดุ", message.text)
                //นำไปสร้าง ACTION ต่อไป
            } else {
                console.log("ส่งข้อความไป DialogFlow", message.text)
                await postToDialogflow(request)
            }
        }
    } catch (error) {
        console.log(error)
    }
    response.send("OK").end();
}));

const postToDialogflow = async (payloadRequest) => {
    try {
        payloadRequest.headers.host = "dialogflow.cloud.google.com"

        const response = await axios({
            url: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/cda7a8b5-c2ed-409c-a047-92c0b8cbb425",
            headers: payloadRequest.headers,
            method: "POST",
            data: payloadRequest.body
        })
        console.log("Send payload completed, Status:", response.status)
    } catch (error) {
        console.log(error.message)
    }
}