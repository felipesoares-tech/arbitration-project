const axios = require('axios')

const signature = process.env.API_SIGNATURE
const api_key = process.env.API_KEY
const auth = signature + api_key

function balance() {
    return call('trading', { cmd: 'balance', auth_token: auth }, 'POST')
}

function offer(cmd,amount, market, price, volume, limited) {
    const auth = signature + api_key

    return call('trading', {cmd, auth_token: auth, market, price, volume, amount, limited }, 'POST')
}

async function call(endpoint, params, method = 'GET') {
    const headers = { 'Content-Type': 'application/json' }

    const url = `https://api.bitpreco.com/${endpoint}`
    let data = undefined

    if (method == 'POST') {
        params = params || {}
        data = JSON.stringify(params, Object.keys(params).sort())

        data = JSON.parse(data)
    }

    const config = {
        url,
        method,
        headers,
        data,
        timeout: 5000
    }

    console.log(data)

    const result = await axios(config)
    return result
}

module.exports = {
    balance,
    offer
}