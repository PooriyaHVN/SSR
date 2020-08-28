import React,{ useRef , useEffect , useState} from 'react'
import { connect } from 'react-redux';
import LoginInput from './inputs/LoginInput'
//icons
import {
      ReportProblem ,
      Beenhere ,
} from '@material-ui/icons'
//import method from handler
import { loginHandeler } from "./Handler/handler";
import { 
    ShowPassword,
    Blured,
    focuced,
    typing,
    toSignup
} from './Handler/handler'
import { 
    changeAllow ,
    changeAutoReq ,
    changeClientValidate } 
  from '../../store/actions';
import '../assets/css/night/login.css'

function Login(props) {
  const { 
    dispatch ,
    autoReq, 
    allow, 
    progress,
    message,
    icon,
    } = props;
    const [ clientValidate , setclientValidate ] = useState(true);
  const info = useRef(null);
  const password = useRef(null);
  const submitBtn = useRef(null);
  const guestName =React.useCallback( () => {
    info.current.focus();
    dispatch(changeAllow(allow));
    info.current.classList.toggle("input-guested");
    setclientValidate(c => allow === 'GUEST' ? false : true );
  },[ allow , dispatch])
  const setAutoReq =React.useCallback( ()=>{
    dispatch(changeAutoReq(autoReq));
    dispatch(changeClientValidate(!clientValidate));
  },[autoReq , clientValidate , dispatch])
  useEffect(()=>{
    if(allow === 'GUEST'){
      setclientValidate(false);
    }else{
      setclientValidate(true)
    }
  },[allow])
    return (
      <section id="login" className= {
         icon === 'LFAIL' ? 'error-form'
        :
        icon === 'LSUCCESS' ? 'success-form'
        : 
        icon === 'FAIL' ? 'd-none'
        : 
        icon === 'SUCCESS' ? 'd-none'
        : ''
    }>
        <div className={ `progress  ${ progress === 'LSENDING' && 'progress-on'}` }>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="form-option">
          <input type="checkbox" id="auto-req" onChange={ setAutoReq } className={  autoReq === 'YES' ? 'autoReq' : '' } />
          <label htmlFor="auto-req">Auto Request</label>
        </div>
        <h1>Login</h1>
      
        <form id="login-form" onSubmit={loginHandeler}>
            <LoginInput
              divref={ info }
              htmlFor="info"
              labelid="info-icon"
              type="text"
              id="info"
              autoComplete="off"
              onFocus={focuced}
              onBlur={Blured}
              onKeyDown={typing}
              guestName = { guestName }
              autoFocus
              icon = { icon }
              required
            />
            <LoginInput
              htmlFor="password"
              labelid="password-icon"
              divref={ password }
              ShowPassword = { ShowPassword }
              type="password"
              id="password"
              autoComplete="off"
              onFocus={focuced}
              onBlur={Blured}
              onKeyDown={typing}
              icon = { icon }
              required = { clientValidate }
            />
          <input type="submit" id="login-btn" className={ 
             progress === 'LSENDING' ? 'btn-deactive' : ''
             ||
             autoReq === 'YES' ? 'btn-deactive' : '' 
          } 
          disabled={  
            autoReq === 'YES' ? true : false
            ||
           progress === 'LSENDING' ? true : false
           }  ref={submitBtn} value="Login" />
        <span className={
                        (  icon === 'LFAIL' && progress === 'LSTOP') ?
                             ('form-status form-fail')
                             :
                      ( ( icon === 'LSUCCESS' && progress === 'LSTOP') ?
                             ('form-status form-succed') 
                             :
                              ('form-status') )
                } >
                    { icon === 'LFAIL' && <ReportProblem className={'icons problem-icon icon-up'} /> }
                         { icon === 'LSUCCESS' && <Beenhere className={'icons success-icon'} /> }
                    <span>{ message } </span>
                </span>
          <aside className="form-way">
            <button id="to-signup" onClick={ toSignup }>create an account </button>
          </aside>
        </form>
      </section>
    );
}

const mapStateToProps = ({ 
  autoReq : { autoRequest } ,
  GuestMode : { GuestAllow } ,
  ClientValidate : { letClinetValidate } ,
  requestProgress : { condition } ,
  serverMessage : { msg } ,
  requestCondition : { icon } ,
   })=>{
  return {
      autoReq : autoRequest,
      allow : GuestAllow,
      clientValidate: letClinetValidate,
      progress : condition,
      message : msg,
      icon
  }
}
export default connect(mapStateToProps)(React.memo(Login))