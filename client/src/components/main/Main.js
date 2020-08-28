import React , {Fragment} from 'react'
import Profile from './Profile'
import Skills from './Skills'
import '../assets/css/night/main.css'
export default function Main() {
    return (
        <Fragment>
            <Profile />
            <Skills />
        </Fragment>
    )
}