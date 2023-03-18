import { useEffect, useState } from 'react'
import axios from 'axios'

function Home(props) {
  
  useEffect(() => {
    
  }, [])
  return (
    <div>
      {props.logged ? "Content" : "You must be logged in to see this page"}
    </div>
  )
}

export default Home
