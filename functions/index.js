const { onRequest } = require("firebase-functions/v2/https");
const Region = "asia-northeast1"
const axios = require("axios")
const LINE_MESSAGING_API = "https://api.line.me/v2/bot"
const accessToken = "j0SpGC3Eakq3qIiJ/g5ek8EZyLlzeXuvWYcj+SRxRAnfmWQ9FnHpdxsslHls5dGy57QfJEinsYmivE//6a0WYx2uv12dj64Ay1VuUKji93vYolA8AwSR0WB/2w1Y1VJ/AxTlOZLNaifAOYAu7OAeNAdB04t89/1O/w1cDnyilFU="

exports.webhook = onRequest({ region: Region }, (request, response) => {

    if (request.method === "POST") {
        let event = request.body.events[0]
        if (event.message.type !== "text") {
            reply(event.replyToken, { type: "text", text: event.message.type })
        } else {
            postToDialogflow(request)
        }
    }
    return response.status(200).send("OK");
});

const reply = (token, payload) => {
    axios({
        method: "POST",
        url: `${LINE_MESSAGING_API}/message/reply`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        data: JSON.stringify({
            replyToken: token,
            messages: [payload]
        })
    })
}

const postToDialogflow = payloadRequest => {
    payloadRequest.headers.host = "dialogflow.cloud.google.com"
    axios({
        url: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/cda7a8b5-c2ed-409c-a047-92c0b8cbb425",
        headers: payloadRequest.headers,
        method: "POST",
        data: payloadRequest.body
    })
}