import React,{useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import showStore from '../stores/showStore'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Show.css'
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
  const [name,setname]=useState([]);
  const [symbol,setsymbol]=useState([]);
  const [id,setid]=useState([]);
  const [image,setimage]=useState([]);
  const [market_cap_rank,setmarket_cap_rank]=useState([]);
 

      async function showdatta(id){
      const datasow = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
      console.log(datasow)
      setname(datasow.data.name)
      setsymbol(datasow.data.symbol)
      setid(datasow.data.id)
      setimage(datasow.data.image.large)
      setmarket_cap_rank(datasow.data.market_cap_rank)
     
     }
     const params=useParams()
     useEffect(()=>{
      showdatta(params.id)
    },[])
     
const store=showStore()

useEffect(()=>{
  store.fetchdata(params.id)
},[])

  return (
     
   
    <div className='Show'>
      <AreaChart
          width={500}
          height={400}
          data={store.fetchgraphdata}
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
      <div className='data'>
        <div><img src={image}></img></div>
        <div>
      <h2>Name     :    {name}</h2>
      <h2>Symbol    :   {symbol}</h2>
      <h2>Id     :     {id}</h2>
      </div>
      <div>
      <h4>Market cap rank: ${market_cap_rank}</h4>
        </div>
      </div>
        
    </div>
    
  )
}
export default Show