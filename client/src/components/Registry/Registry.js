import React from 'react'
import Login from './Login'
import Signup from './Signup'
import '../assets/css/night/registry.css'
export default function Registry() {
  return (
    <React.Fragment>
      <div className="box-container">
        <div className="form-container">
          <Login />
          <Signup />
        </div>
      </div>
    </React.Fragment>
  )
}
