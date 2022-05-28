import React, { useRef, useState, createContext } from "react"
import { Form, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import styled from "styled-components";
import {
  BoxContainer,
  BoldLink,
  Input,
  MutedLink,
  SubmitButton,
  FormContainer,
} from "./common";

// import{
//   BoxContainer,
// } from "./index";
import { Marginer } from "../marginer";
import background from "../../bg-main.png";


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { switchToSignup } = createContext();
  // const BoxContainer = styled.div`
  //   max-width: 280;
  //   max-height: 100vh;
  //   border-radius: 19px;
  //   background-color: #fff;
  //   box-shadow: 0 0 4px rgba(15, 15, 15, 0.28);
  //   position: Center;
  //   overflow: hidden;
  // `;
  //
  // const FormContainer = styled.div`
  //   max-width: 250;
  //   max-height: 100vh;
  //   border-radius: 9px;
  //   background-color: #fff;
  //   box-shadow: 0 0 4px rgba(15, 15, 15, 0.28);
  //   position: Center;
  //   overflow: hidden;
  // `;

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

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Invalid Credentials!!!")
    }

    setLoading(false)
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover'}}>
      <CenteredContainer>
        <BoxContainer>
          <TopContainer>

              <HeaderContainer>
                <HeaderText>Welcome Back</HeaderText>
                <HeaderText>Anteater</HeaderText>
                <SmallText>Here we go again!</SmallText>
              </HeaderContainer>

          </TopContainer>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormContainer>
              <Input type="email" placeholder="Email" ref={emailRef} required />
              <Input type="password" placeholder="Password" ref={passwordRef} required />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <center><Link to="/forgot-password">Forgot Password?</Link></center>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton disabled={loading} className="w-100" type="submit">Signin</SubmitButton>
          </Form>
          <Marginer direction="vertical" margin="1em" />
          <div className="w-200 text-center mt-2">
            <MutedLink href="#">
              Don't have an account?{" "}
              <BoldLink href="/signup" onClick={switchToSignup}>
              Signup
              </BoldLink>
            </MutedLink>
          </div>
        </BoxContainer>
      </CenteredContainer>
    </div>
  )
}
