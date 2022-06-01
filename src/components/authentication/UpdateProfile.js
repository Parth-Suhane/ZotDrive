import React, { useRef, useState } from "react"
import { Card, Button, Form,Alert } from "react-bootstrap"
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

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

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

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (

    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover'}}>
      <CenteredContainer>
        <BoxContainer>
        <TopContainer>

            <HeaderContainer>
              <HeaderText>Update</HeaderText>
              <HeaderText>Profile</HeaderText>
              <SmallText>Changes incoming?</SmallText>
            </HeaderContainer>

        </TopContainer>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Input type="email" placeholder="Email" ref={emailRef} required defaultValue={currentUser.email}/>
            <Input type="password" placeholder="Password" ref={passwordRef} placeholder="Leave blank to keep the same" />
            <Input type="password" placeholder="Confirm Password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
            <Marginer direction="vertical" margin={10} />
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton disabled={loading} className="w-100" type="submit">Update Profile</SubmitButton>
          </Form>
          <Marginer direction="vertical" margin="1em" />
          <div className="w-100 text-center mt-2">
            <MutedLink href="#">
              Not ready yet?{" "}
              <BoldLink href="/" >
              Cancel
              </BoldLink>
            </MutedLink>
          </div>
        </BoxContainer>
      </CenteredContainer>
    </div>

    // <CenteredContainer>
    //   <Card>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Update Profile</h2>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control
    //             type="email"
    //             ref={emailRef}
    //             required
    //             defaultValue={currentUser.email}
    //           />
    //         </Form.Group>
    //         <Form.Group id="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control
    //             type="password"
    //             ref={passwordRef}
    //             placeholder="Leave blank to keep the same"
    //           />
    //         </Form.Group>
    //         <Form.Group id="password-confirm">
    //           <Form.Label>Password Confirmation</Form.Label>
    //           <Form.Control
    //             type="password"
    //             ref={passwordConfirmRef}
    //             placeholder="Leave blank to keep the same"
    //           />
    //         </Form.Group>
    //         <Button disabled={loading} className="w-100" type="submit">
    //           Update
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     <Link to="/user">Cancel</Link>
    //   </div>
    // </CenteredContainer>
  )
}
