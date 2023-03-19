import UserDashboard from '../components/UserDashboard'

function Home(props) {
  return (
    <div>
      {props.logged === '' ? "You must be logged in to see this page" : <UserDashboard />}
    </div>
  )
}

export default Home
