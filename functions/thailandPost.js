const axios = require("axios")
const token = "HaL$FzPkNwNxIQL*O&ZkE-L;ZNUkG7L_QVDhZxQ-MKYyOeLmSnQkE1T4JqB;DjT_PwKkQZC!G!HNYTX?NWZAY7V7QrJ!QPW0AmKS"

class ThailandPost {
    async getToken() {
        let result = null
        await axios({
            url: "https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token",
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            result = response.data
        }).catch((error) => {
            console.log(error)
        })
        return result
    }

    async getItems(barCode) {
        let result = null
        const authToken = await this.getToken()
        await axios({
            url: "https://trackapi.thailandpost.co.th/post/api/v1/track",
            method: "POST",
            headers: {
                "Authorization": `Token ${authToken.token}`,
                "Content-Type": "application/json"
            },
            data: {
                status: "all",
                language: "TH",
                barcode: [barCode]
            }
        }).then((response) => {
            result = response.data
        }).catch((error) => {
            console.log(error)
        })
        return result
    }
}
module.exports = new ThailandPost()