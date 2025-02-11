const axios = require("axios")
const accessToken = "j0SpGC3Eakq3qIiJ/g5ek8EZyLlzeXuvWYcj+SRxRAnfmWQ9FnHpdxsslHls5dGy57QfJEinsYmivE//6a0WYx2uv12dj64Ay1VuUKji93vYolA8AwSR0WB/2w1Y1VJ/AxTlOZLNaifAOYAu7OAeNAdB04t89/1O/w1cDnyilFU="

class lineHelper {

    async reply(replyToken, payload) {
            await axios({
                url: "https://api.line.me/v2/bot/message/reply",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                data: {
                    replyToken: replyToken,
                    messages: [payload]
                }
            }).catch((error) => {
                console.log(error)
            })
    }
}
module.exports = new lineHelper()