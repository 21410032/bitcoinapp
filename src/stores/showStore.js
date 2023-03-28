import {create} from 'zustand'
import axios from 'axios'


const showStore = create((set) => ({
    graphdata:[],
   fetchdata: async (id)=>{
   const graphRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
   
   const fetchgraphdata = graphRes.data.prices.map(price =>{
   const [timestamp,p]=price;
   const date=new Date(timestamp).toLocaleDateString('en-us')
   return(
   {
   Date:date,
   price:p
   }
)
   }
);

set({fetchgraphdata});
}

}))
export default showStore