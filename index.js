const axios = require('axios')
const io = require('socket.io-client')
const QUOUTE = 'USDT'
const AMOUNT = 10

const Sockets = {}
Sockets.ws = {}

getPublicWsToken = async function(baseURL) {
    let endpoint = '/api/v1/bullet-public'
    let url = baseURL + endpoint
    let result = await axios.post(url, {})

    let token = await result.data.data.token
    return token

  }

  const getToken = async () => {
    try {
      const response = await axios.post(
        'https://api.kucoin.com/api/v1/bullet-public',
        {
          'clientOid': '',
          'channel': 'ALL_SYMBOLS_TICKER'
        }
      )

      return response.data.data.token;
    } catch (error) {
      console.error(error);
    }
  };
  


  async function test(){
    
    let token = await getToken()
    
    console.log(token)

    const socket = io('wss://ws-api-spot.kucoin.com/', {
  query: {
    token: token
  }
});

socket.on('connect', () => {
  console.log('Conectado ao Kucoin WebSocket');
});


socket.on('ALL_SYMBOLS_TICKER', (data) => {
  console.log('oi');
});


  

  }

  test()
  

   
  

// const BOOK = {}

// // ws.onmessage = async (event) => {
// //     const obj = JSON.parse(event.data)
// //     BOOK[obj.s] = {ask: parseFloat(obj.a), bid: parseFloat(obj.b)}
// //     console.log(obj)
// // }

// async function exchangeInfo(){
//     const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo')
//     const symbols = response.data.symbols.filter(s => s.status == 'TRADING')
//     return symbols.map(s => {
//         return{
//             symbol: s.symbol,
//             base: s.baseAsset,
//             quote: s.quoteAsset
//         }
//     })
// }

// function getBuyBuySell(buySymbols,allSymbols){
//     const buyBuySell = []

//     for(let i=0; i < buySymbols.length; i++){
//         const buy1 = buySymbols[i]

//         const rightBuy = allSymbols.filter(s => s.quote === buy1.base)

//         for(let j=0; j < rightBuy.length; j++){
//             const buy2 = rightBuy[j]

//             const sell1 = allSymbols.find(s => s.base === buy2.base && s.quote === buy1.quote)
//             if(!sell1) continue

//             buyBuySell.push({buy1,buy2,sell1})
//         }

//     }

//     return buyBuySell
// }

// function getBuySellSell(buySymbols,allSymbols){
//     const buySellSell = []

//     for(let i=0; i < buySymbols.length; i++){
//         const buy1 = buySymbols[i]

//         const rightBuy = allSymbols.filter(s => s.base === buy1.base && s.quote !== buy1.quote)

//         for(let j=0; j < rightBuy.length; j++){
//             const sell1 = rightBuy[j]

//             const sell2 = allSymbols.find(s => s.base === sell1.quote && s.quote === buy1.quote)
//             if(!sell2) continue

//             buySellSell.push({buy1,sell1,sell2})
//         }

//     }

//     return buySellSell
    
// }

// async function process(){
//     const allSymbols = await exchangeInfo()
//     const buySymbols = allSymbols.filter(s => s.quote === QUOUTE) //Verifica Possibilitades de compra com o par atual

//     const buyBuySell = getBuyBuySell(buySymbols,allSymbols) //Possibilidades buy buy sell
//     const buySellSell = getBuySellSell(buySymbols,allSymbols)//Possibilidades buy sell sell

//     // console.log(`Total de pares sendo negociados: ${allSymbols.length}`)
//     // console.log(`Qtd pares buy buy sell: ${buyBuySell.length}`)
//     // console.log(`Qtd pares buy sell sell: ${buySellSell.length}`)
//     // console.log(buySellSell)

// }
