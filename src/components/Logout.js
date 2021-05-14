import { useHistory } from 'react-router-dom'


function Logout({ setLoggedIn }) {
  let history = useHistory()
  window.sessionStorage.removeItem("currentUserId")
  setLoggedIn(false)
  history.push("/login")

  return null
}

export default Logout