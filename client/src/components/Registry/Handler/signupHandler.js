import Axios from 'axios'
import { store } from '../../../index'
//action
import { 
    thunkChangeRequestProgress ,
    thunkChangeRequestCondition ,
    changeFormStatus ,
} from '../../../store/actions';

const Api = Axios.create({
    baseURL: "http://localhost:3001/users/Signup",
    headers: { "Content-Type": "application/json" },
});
//login handler
export function signupHandler(e) {
    e.preventDefault();
    const { ClientValidate, GuestMode } = store.getState();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#spassword").value;
    const email = document.querySelector("#email").value;
  
    if(GuestMode.GuestAllow !== "GUEST") {
        if(username && email && password.length >= 8) {
            store.dispatch( thunkChangeRequestProgress("SENDING") );
            Api.post("/addUser", JSON.stringify({
                 username, email , password
            })).then(resp => {
                store.dispatch( thunkChangeRequestProgress("STOP") );
                store.dispatch(changeFormStatus(resp.data.msg));
                if(resp.data.status === 0) {
                    store.dispatch(thunkChangeRequestCondition("FAIL"))
                } else {
                    store.dispatch(thunkChangeRequestCondition("SUCCESS"))
                }
            }).catch(err => {
                store.dispatch( thunkChangeRequestProgress("STOP"));
                store.dispatch(changeFormStatus(String(err)));
                store.dispatch(thunkChangeRequestCondition("FAIL"))
            })
        } else {
            if(ClientValidate.letClinetValidate === 'VALIDATE') {
                return
            }
        }
    } else {
        if(username) {
            store.dispatch( thunkChangeRequestProgress("SENDING") );
            Api.post('/addGuest', JSON.stringify({
                username
            }))
                .then(resp => {
                    store.dispatch( thunkChangeRequestProgress("STOP") );
                    store.dispatch(changeFormStatus(resp.data.msg));
                    if(resp.data.status === 1) {
                        store.dispatch(thunkChangeRequestCondition("SUCCESS"))
                    } else {
                        store.dispatch(thunkChangeRequestCondition("FAIL"))
                    }
                }).catch(err => {
                    store.dispatch( thunkChangeRequestProgress("STOP"));
                    store.dispatch(changeFormStatus(String(err)));
                    store.dispatch(thunkChangeRequestCondition("FAIL"))
                });
        } else {
            if(ClientValidate.letClinetValidate === 'VALIDATE') {
                return
            }
        }

    }
}


export const Blured = e => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#spassword");
    const email = document.querySelector("#email");
    const { GuestMode, autoReq } = store.getState();
    //if inputs have value before go behind
    if(e.target.value){
        e.target.parentElement.classList.add("zindex-negative");
    }else{
        e.target.parentElement.classList.remove("zindex-negative");
    }
    //if auto request is on 
    if(autoReq.autoRequest === 'YES') {
        //if guest mode is true
        if(GuestMode.GuestAllow === 'GUEST') {
            if(username.value) {
                store.dispatch( thunkChangeRequestProgress("SENDING") );
                Api.post('/addGuest', JSON.stringify({
                    username: username.value
                }))
                    .then(resp => {
                        store.dispatch( thunkChangeRequestProgress("STOP") );
                        store.dispatch(changeFormStatus(resp.data.msg));
                        if(resp.data.status === 1) {
                            store.dispatch(thunkChangeRequestCondition("SUCCESS"))
                        } else {
                            store.dispatch(thunkChangeRequestCondition("FAIL"))
                        }
                    }).catch(err => {
                        store.dispatch( thunkChangeRequestProgress("STOP"));
                        store.dispatch(changeFormStatus(String(err)));
                        store.dispatch(thunkChangeRequestCondition("FAIL"))
                    });
            }
        } else {
            if(username.value && email.value && password.value) {
                store.dispatch( thunkChangeRequestProgress("SENDING") );
                Api.post('/addUser', JSON.stringify({
                    username: username.value,
                    password: password.value,
                    email : email.value
                }))
                    .then(resp => {
                        store.dispatch( thunkChangeRequestProgress("STOP") );
                        store.dispatch(changeFormStatus(resp.data.msg));
                        if(resp.data.status === 1) {
                            store.dispatch(thunkChangeRequestCondition("SUCCESS"))
                        } else {
                            store.dispatch(thunkChangeRequestCondition("FAIL"))
                        }
                    }).catch(err => {
                        store.dispatch( thunkChangeRequestProgress("STOP"));
                        store.dispatch(changeFormStatus(String(err)));
                        store.dispatch(thunkChangeRequestCondition("FAIL"))
                    })
            }
        }
    }
    e.target.parentElement.classList.remove("input-focuced")
    e.target.parentElement.classList.remove("input-typing")
    if(e.target.value) {
        e.target.parentElement.classList.add("zindex-negative")
    } else {
        e.target.parentElement.classList.remove("zindex-negative");
    }

}
export const focuced = (e) => {
    e.target.parentElement.classList.add("input-focuced");
}
export const typing = (e) => {
    const elm = e.target.parentElement;
    setTimeout(() => {
        elm.classList.add("input-typing");
    }, 100);
}
let flag = false;
export const ShowPassword = (eye) => {
    if(!flag) {
        flag = true;
        eye.target.parentElement.children.item(0).type = "text";
        eye.target.children.item(0).classList.add("d-none");
        eye.target.children.item(1).classList.remove("d-none")
    } else {
        flag = false;
        eye.target.parentElement.children.item(0).type = "password";
        eye.target.children.item(1).classList.add("d-none");
        eye.target.children.item(0).classList.remove("d-none")
    }
}
let m =null;
export const toLogin = (e)=>{
    e.preventDefault();
    m=2;
    const login = document.querySelector("#login");
    const signup = document.querySelector("#signup");
    signup.classList.remove("fade-rev")
    signup.classList.add("fade");
    signup.addEventListener("animationstart", () => {
        login.classList.add("fade-rev");
            if(m === 2){
        setTimeout(() => {
            m = null
            signup.classList.add("d-none");
            signup.classList.remove("fade");
            login.classList.remove("d-none");
        }, 1700); 
        login.addEventListener("animationend" , ()=>{
            login.classList.remove("fade-rev")
        })
    }      
    });
    return 
}
