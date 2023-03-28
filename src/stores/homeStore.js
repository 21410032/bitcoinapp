import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import showStore from '../stores/showStore'
import {create} from 'zustand';
import axios from 'axios';


const homeStore = create((set) => ({
   coins: [],
   trending:[],
   query:'',
   setQuery: (e)=>{
    set({query:e.target.value})
    homeStore.getState().searchcoin()
   },
   searchcoin: async ()=>{
    const {query,trending}=homeStore.getState()
    if (query.length>2){
    const res= await axios.get(`https://api.coingecko.com/api/v3/search?${query}=bitcoin`)
    const newcoins =res.data.coins.map(coin=>{
    return(
        {
        name:coin.name,
        image:coin.large,
        id:coin.id
        }
    )
   })
   set({coins:newcoins})
}
else{

set({coins:trending})
   
}
},
   fetchcoins: async ()=>{
    const [res,btcres]=await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/search/trending'),
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
    ])
   const btcprice=btcres.data.bitcoin.usd;
   const newcoins = res.data.coins.map(coin =>
    {
    return(
        {
        name:coin.item.name,  
        image:coin.item.large,
        id:coin.item.id,
        priceBtc:coin.item.price_btc,
        priceusd:(coin.item.price_btc*btcprice).toFixed(10)
        }
    )
   })
   set({trending:newcoins})
   set({coins:newcoins})
   }
  }))
export default homeStore