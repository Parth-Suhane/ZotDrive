import React, { useRef, useState, createContext  } from "react"
import { Form, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import styled from "styled-components";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import background from "../../bg-main.png";

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { switchToSignin } = createContext();

  const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `;

  const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0;
  `;

  const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
  `;

  const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover'}}>
      <CenteredContainer>
        <BoxContainer>
        <TopContainer>

            <HeaderContainer>
              <HeaderText>Join</HeaderText>
              <HeaderText>ZotDrive</HeaderText>
              <SmallText>Time to join the gang!</SmallText>
            </HeaderContainer>

        </TopContainer>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Input type="email" placeholder="Email" ref={emailRef} required />
            <Input type="password" placeholder="Password" ref={passwordRef} required />
            <Input type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required />
            <Marginer direction="vertical" margin={10} />
            <center><Link to="/forgot-password">Forgot Password?</Link></center>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton disabled={loading} className="w-100" type="submit">Signup</SubmitButton>
          </Form>
          <Marginer direction="vertical" margin="1em" />
          <div className="w-100 text-center mt-2">
            <MutedLink href="#">
              Already have an account?{" "}
              <BoldLink href="/login" onClick={switchToSignin}>
              Signin
              </BoldLink>
            </MutedLink>
          </div>
        </BoxContainer>
      </CenteredContainer>
    </div>
    // <CenteredContainer>
    //   <Card>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Sign Up</h2>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control type="email" ref={emailRef} required />
    //         </Form.Group>
    //         <Form.Group id="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control type="password" ref={passwordRef} required />
    //         </Form.Group>
    //         <Form.Group id="password-confirm">
    //           <Form.Label>Password Confirmation</Form.Label>
    //           <Form.Control type="password" ref={passwordConfirmRef} required />
    //         </Form.Group>
    //         <Button disabled={loading} className="w-100" type="submit">
    //           Sign Up
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     Already have an account? <Link to="/login">Log In</Link>
    //   </div>
    // </CenteredContainer>
  )
}
