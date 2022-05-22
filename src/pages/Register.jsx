import React, { useState } from "react";

import { Input, Form, FormGroup, Label, Button } from "reactstrap";

import { register } from "../auth";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Page">
      <h1>Register</h1>;
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
          >
            Email
          </Input>
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
          >
            Email
          </Input>
        </FormGroup>
        <Button onClick={() => register(email, password)}>Register</Button>
      </Form>
      </div>
    </div>
  )
}