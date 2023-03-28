export default function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
import {create} from 'zustand'
import axios from 'axios'


const showStore = create((set) => ({
    graphdata:[],
   fetchdata: async (id)=>{
    const [graphRes,dataRes]= await Promise.all(
        [ 
           await axios.get(`api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=1392577232&to=1422577232`),
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
        ]
    )
   
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
console.log(dataRes)
set({fetchgraphdata});
},

}))
export default showStore
import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import showStore from '../stores/showStore'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function Show() {
const store=showStore()
const params=useParams()
console.log(params)
useEffect(()=>{
  store.fetchdata(params.id)
},[])
if(!store.data) {
return <></>
}

  return (
    <div>
      <header>
        <img src={store.data.image.large}></img>
        <h2>{store.data.name}{store.data.symbol}</h2>
      </header>
      <AreaChart
          width={500}
          height={400}
          data={store.graphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <div>
          <h4>Market cap rank</h4>
          <span>${store.data.market_cap_rank}</span>
        </div>
        <div>
          <h4>24 high</h4>
          <span>${store.data.market_data.high_24th.usd}</span>
        </div>
        <div>
          <h4>24 low</h4>
          <span>${store.data.market_data.low_24th.usd}</span>
        </div>
        <div>
          <h4>circulating supply</h4>
          <span>${store.data.market_data.circulating supply}</span>
        </div>
    </div>
    
  )
}

export default Show