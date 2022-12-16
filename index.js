const bitpreco = require('./bitpreco')
// bitpreco.ticker()
//     .then(data => console.log(data))
//     .catch(err => console.error(err))

let BTC, BRL

async function loadBalance(){
    console.log('Lodaing the balance...')
    const result = await bitpreco.balance()
    BRL = result.data.BRL
    BTC = result.data.BTC
    console.log(`Conta pabls: R$:${BRL}, BTC:${BTC}`)
}

async function test(){
    //const result = await bitpreco.offer('buy','0.00001084','BTC-BRL','85000,00','',true)
    console.log(process.env.API_KEY)
}

async function doCycle(){
    try{

    if(!BRL)
        await loadBalance()

    }catch(err){
        console.error(err)
    }
}

setInterval(doCycle, 5010)

//doCycle()
test()