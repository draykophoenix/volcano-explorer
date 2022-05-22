import React, { useState } from "react";

import { Input, Form, FormGroup, Label, Button } from "reactstrap";

import { login } from "../auth";


export default function Login( {setInstance} ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Page">
      <h1>Login</h1>;
      <div className="container">
      <Form>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            className="input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value); 
            }} 
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value); 
            }} 
          />
        </FormGroup>
        <Button onClick={() => login(email, password, setInstance)}>Login</Button>
        <br></br>
        <Button id="logout" onClick={() => {
          localStorage.removeItem("instance");
          setInstance({email: "", token: ""});
        }}>Log out</Button>
      </Form>
      </div>
    </div>
  )
}