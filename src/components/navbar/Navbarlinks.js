import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import firebase from "gatsby-plugin-firebase"
import { useSelector } from "react-redux"
import { store, setLoggedIn } from "../../redux/store"

const NavItem = styled(Link)`
  text-decoration: none;
  color: #111;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 200ms ease-in;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: goldenrod;
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: goldenrod;
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const NavbarLinks = () => {
  // const [loggedIn, setLoggedIn] = useState(false)
  const loggedIn = useSelector((state) => state.login)

  const Login = async () => {
    var provider = new firebase.auth.GoogleAuthProvider()
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {})
      .catch(function (error) {
        var errorMessage = error.message
        return errorMessage
      })
    // setLoggedIn(true)
    store.dispatch(setLoggedIn(true))
  }

  const Logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(function () {
        return (
          <div>
            <h3 style={{ color: "green" }}>Sign out Successfylly</h3>
          </div>
        )
      })
      .catch(function (error) {
        var errorMessage = error.message
        return errorMessage
      })
    // setLoggedIn(false)
    store.dispatch(setLoggedIn(false))
  }

  return (
    <>
      <NavItem to="/">Blog</NavItem>
      <NavItem to="/">About</NavItem>
      <Button
        variant="outlined"
        onClick={loggedIn ? () => Logout() : () => Login()}
      >
        <strong>{loggedIn ? "Logout" : "Login"}</strong>
      </Button>
    </>
  )
}

export default NavbarLinks
