import React from 'react'
import { Person ,
    Lock ,
    Visibility ,
    Clear ,
    Done ,
    VisibilityOff ,
} from '@material-ui/icons'

const LoginInput = ( {icon , required , divref , htmlFor , type , labelid , ShowPassword ,  guestName , ...otherProp } )=>{
    return (
        <div className =
        {
                type === 'password' && !required ? 'opacity-half'
                :
                icon === 'LFAIL' ? 'error-input'
                :
                icon === 'LSUCCESS' ? 'success-input'
                :
                'sinput-wrapper'
            }>
            <input
            ref={ divref }
            type={ type }
            disabled = {type === 'password' &&  !required } 
            required={ type === 'text' ? true : type === 'password' ? required : !required } { ...otherProp } />
                
            {
                    <>
                    <label htmlFor={ htmlFor } className="labels">
                        {
                           icon === 'LFAIL' ?  
                            ( <Clear className={
                                    ( icon === 'LFAIL') ? 
                                    ('error-icons icon-up')
                                         :
                                      ('icons2 d-none icon-down')
                            } /> )
                             :
                            ( <Done className={
                                    ( icon === 'LSUCCESS') ?
                                        ('success-icons icon-up')
                                        :
                                        ('d-none icon-down icons3')
                            } /> )
                         
                        }        
                        {  type === 'text' && <Person className={ icon === 'LFAIL'  ? 'icon-down d-none' : 'icons' } id="username-icon" /> }           
                        {  type === 'password' && <Lock className={ icon === 'LFAIL'  ? 'icon-down d-none' : 'icons' } id="password-icon" /> }
                    </label>
                    </>
            }
                  {
                type === 'password' ? (
                    <label htmlFor="none" className="show-password" onClick={ ShowPassword } >
                        <Visibility />
                        <VisibilityOff className="d-none" />
                    </label>
                )
                :
                null
            }    
            
                {type === 'text' &&  <span>you can login as guest just by <em onClick={guestName}>name !</em></span>}
            
        </div>
    )
}

export default LoginInput