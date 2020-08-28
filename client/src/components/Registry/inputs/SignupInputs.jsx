import React from 'react'
import { 
    PersonAdd ,
    Email ,
    LockOpen ,
    Visibility ,
    VisibilityOff ,
    Done ,
    Clear
   } from '@material-ui/icons';
const SignupInputs = ( {icon , type, showPassword , htmlFor, required , divref , guestName , ...otherProp  } )=>{
    return (
        <div className =
        {
                 type === 'email' && !required ? 'opacity-half'
                 :
                 type === 'password' && !required ? 'opacity-half'
                 :
                 icon === 'FAIL' ? 'sinput-wrapper error-input'
                 :
                 icon === 'SUCCESS' ? 'sinput-wrapper success-input'
                 :
                 'sinput-wrapper'
            }>
            <input type={ type } 
            required={ type === 'email' ? required : type === 'password' ? required : true  }
            disabled ={ type ==='password' ? !required : type === 'email' ? !required : false  }
            ref={ divref } { ...otherProp } />
           
            {
                    <>
                    <label htmlFor={ htmlFor } className="labels">
                        {
                           icon === 'FAIL' ?  
                             <Clear className={
                                     icon === 'FAIL' ? 'error-icons icon-up'
                                    :
                                    'icons2 d-none icon-down'
                            } /> 
                             :
                             <Done className={
                                     icon === 'SUCCESS' ? 'success-icons icon-up'
                                      :
                                    'd-none icon-down icons3'
                            } /> 
                         
                        }        
                        {  type === 'text' && <PersonAdd className={ icon === 'FAIL' || icon === 'SUCCESS' ? 'icon-down d-none' : 'icons' } id="username-icon" /> }           
                        {  type === 'email' &&  <Email className={ icon === 'FAIL' || icon === 'SUCCESS' ? 'icon-down d-none' : 'icons' } id="email-icon" /> }
                        {  type === 'password' && <LockOpen className={ icon === 'FAIL' || icon === 'SUCCESS' ? 'icon-down d-none' : 'icons' } id="password-icon" /> }
                    </label>
                    </>
            }
            {
                type === 'password' && <label htmlFor="none" className="show-password" onClick={ showPassword } >
                        <Visibility />
                        <VisibilityOff className="d-none" />
                    </label>
            }

            {
                type === 'text' && <span>you can join as guest just by <em onClick={guestName}>name !</em></span>
            }
        </div>
    )
}

export default React.memo(SignupInputs) 