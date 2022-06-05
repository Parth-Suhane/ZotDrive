import React, { useState } from "react"
import { Navbar } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import background from "../../zot-logo.png";
import { Button } from "react-bootstrap"
import FileSearch from "../search/fileSearch";

export default function NavbarComponent() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Navbar style={{backgroundColor:'rgba(1,33,64,0.6)'}} expand="sm">
      <Navbar.Brand as={Link} to="/">
        <img
          src={background}
          width="40"
          height="30"
          className="d-inline-block align-top"
        />
        Zot Drive
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <FileSearch currentUser={currentUser.uid} />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="/user">{currentUser.email}</a> |
      </Navbar.Text>
      <Button variant="" onClick={handleLogout}>
        Log Out
      </Button>
    </Navbar.Collapse>
    </Navbar>
  )
}
