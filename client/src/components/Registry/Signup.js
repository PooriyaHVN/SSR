import React , {useState ,useRef , useEffect  } from 'react'
import { connect } from 'react-redux';
import { 
     ReportProblem ,
     Beenhere ,
    } from '@material-ui/icons';
import { changeAutoReq , changeAllow } from '../../store/actions'
import { 
     focuced,
     Blured,
     typing,
     signupHandler,
     toLogin,
     ShowPassword
    } from './Handler/signupHandler'
import '../assets/css/night/signup.css'
import SignupInputs from './inputs/SignupInputs';
function Signup(props) {
    const submitBtn = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const { 
        dispatch ,
        autoReq, 
        allow, 
        progress,
        message,
        icon
    } = props;
    const [ clientValidate , setclientValidate ] = useState(true);
    const username = useRef(null);
    const guestName =React.useCallback( ()=>{
        username.current.focus();
        dispatch(changeAllow(allow));
        setclientValidate(c => allow === 'GUEST' ? false : true );
        username.current.classList.toggle("input-guested");
    },[allow , dispatch])
    const setAutoReq =React.useCallback( ()=>{
        dispatch(changeAutoReq(autoReq));
    },[ autoReq , dispatch ])
   useEffect(()=>{
       if(allow === 'GUEST'){
           setclientValidate(false)
       }else{
        setclientValidate(true)
       }
   },[allow])
    return (
        <section id="signup" className = {
                ( icon === 'FAIL') ? ('error-form')
                :
                (
                    ( icon === 'SUCCESS' ) ? ( 'success-form')
                    : ('d-none')
                )
                
            }>
            <div className={ `progress ${ progress === 'SENDING' && 'progress-on' }`} >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="form-option">
                <input type="checkbox" id="auto-req" onChange={setAutoReq} className={ autoReq === 'YES' ? 'autoReq' : '' } />
                <label htmlFor="auto-req">Auto Request</label>
            </div>
            <h1>Signup</h1>
            <form id="signup-form"  onSubmit={signupHandler} >
                    <SignupInputs 
                    type="text" 
                    onChange={typing}
                    divref={username}
                    onFocus={focuced}
                    onBlur={Blured}
                    id="username"
                    htmlFor="username"
                    guestName = { guestName }
                    autoComplete="off"
                    autoFocus
                    icon={ icon }
                    required
                    />
                 
                    <SignupInputs 
                    type="email" 
                    onChange={ typing } 
                    onFocus={ focuced } 
                    onBlur={ Blured } 
                    id="email"
                    htmlFor="email"
                    divref={ email }  
                    autoComplete="off"
                    icon={ icon }
                    required ={ clientValidate }
                    />
    
                    <SignupInputs 
                    type="password" 
                    onChange={ typing } 
                    onFocus={ focuced } 
                    onBlur={ Blured } 
                    id="spassword" 
                    htmlFor="spassword"
                    divref={ password } 
                    autoComplete="off"
                    showPassword = { ShowPassword }
                    icon = { icon }
                    required ={ clientValidate }
                    />

                <input type="submit" className={ 
                    progress === 'SENDING' ? 'btn-deactive' : ''
                    ||
                    autoReq === 'YES' ? 'btn-deactive' : '' 
                 }  id="signup-btn" value="Signup" 
                 disabled={
                     autoReq === 'YES' ? true : false
                     ||
                    progress === 'SENDING' ? true : false
                } ref={submitBtn} /> 

                <span className={
                         icon === 'FAIL' && progress === 'STOP' ? 'form-status form-fail'
                        :
                         icon === 'SUCCESS' && progress === 'STOP' ? 'form-status form-succed'
                        :
                        'form-status'
                } >
                    {
                         icon === 'FAIL' ? <ReportProblem className={'icons problem-icon icon-up'} /> 
                         :
                         icon === 'SUCCESS' ?  <Beenhere className={'icons success-icon'} />  
                         : ''
                    }
                    <span>{ message } </span>
                </span>
                <aside className="form-way">
                    <button onClick={toLogin}>i have an account </button>
                </aside>
            </form>
        </section>
    )
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

export default connect(mapStateToProps)(React.memo(Signup))
