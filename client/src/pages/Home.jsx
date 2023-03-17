import React from 'react'

function Home(props) {
  return (
    <div>
      {props.logged ? "Content" : "You must be logged in to see this page"}
    </div>
  )
}

export default Home
