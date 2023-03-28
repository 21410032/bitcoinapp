import React from 'react'
import { useEffect } from 'react'
import homeStore from '../stores/homeStore'
import { Link } from 'react-router-dom'
import './Home.css' 

function Home() {
  const store=homeStore()
  useEffect(()=>{
   store.fetchcoins()
  }, [])

  return (
    <div className='Home'>
      <h1 className='search'>Search Here Any Cryptocurrency</h1>
      <p className='search'>Get Details of various Cryptocurrency</p>
     <input className='searchbar' type="text" placeholder='Search Here' value={store.query} onChange={store.setQuery}></input>
       <h1 className='head'>....Trending coins....</h1>
     
      {
        
        store.coins.map(coin=>{
          return(
            
            <div className='trends'>
            <div  key={coin.id}>
              <Link className='trendslink' to={`/${coin.id}`}>
                {coin.name} 

              </Link>
             
              </div>
              

            </div>
          )
        }

        )
      }
    </div>
  )
}

export default Home