import Axios from 'axios'
import { store } from '../../../index'
import { 
  changeFormStatus,
  thunkChangeRequestCondition,
  thunkChangeRequestProgress

 } from '../../../store/actions'
  const Api = Axios.create({
    baseURL: "http://localhost:3001/users/Login",
    headers: { "Content-Type": "application/json" },
  });
//login handler
export function loginHandeler(e){
  e.preventDefault();
  const { ClientValidate , GuestMode } = store.getState();
  const name = document.querySelector("#info").value;
  const password = document.querySelector("#password").value;
  if(GuestMode.GuestAllow !== "GUEST"){
    if(name && password.length >= 8){
      store.dispatch(thunkChangeRequestProgress("LSENDING"));
      Api.post("/LoginUser", JSON.stringify({
        info : name,password
      })).then(resp=>{
        store.dispatch(thunkChangeRequestProgress("LSTOP"));
        store.dispatch(changeFormStatus(resp.data.msg));
        if(resp.data.status === 0){
          store.dispatch(thunkChangeRequestCondition("LFAIL"));
      }else{
        store.dispatch(thunkChangeRequestCondition("LSUCCESS"));
      }
    }).catch(err=>{
      store.dispatch(thunkChangeRequestProgress("LSTOP"));
      store.dispatch(changeFormStatus(String(err)));
      store.dispatch(thunkChangeRequestCondition("LFAIL"));
    })
  }else{    
    if(ClientValidate.letClinetValidate === 'VALIDATE'){
      return
      }
    }
  }else{
      if(name){
        store.dispatch(thunkChangeRequestProgress("LSENDING"));
        Api.post('/LoginGuestUser', JSON.stringify({
          name
        }))
          .then(resp => {
            store.dispatch(thunkChangeRequestProgress("LSTOP"));
            store.dispatch(changeFormStatus(resp.data.msg));
            if(resp.data.status === 1) {
              store.dispatch(thunkChangeRequestCondition("LSUCCESS"));
            } else {
              store.dispatch(thunkChangeRequestCondition("LFAIL"));
            }
          }).catch(err => {
            store.dispatch(thunkChangeRequestProgress("LSTOP"));
            store.dispatch(changeFormStatus(String(err)));
            store.dispatch(thunkChangeRequestCondition("LFAIL"));
          });
      }else{
        if(ClientValidate.letClinetValidate === 'VALIDATE'){
          return
        }
      }
  
  }
}

export const Blured = e =>{
  const status = document.querySelector(".form-status");
  const name = document.querySelector("#info");
  const password = document.querySelector("#password");
  const { GuestMode, autoReq} = store.getState();
  //if auto request is on 
  if(autoReq.autoRequest === 'YES'){
    //if guest mode is true
    if(GuestMode.GuestAllow === 'GUEST'){
      if(name.value){
        store.dispatch(thunkChangeRequestProgress("LSENDING"));
        Api.post('/LoginGuestUser', JSON.stringify({
          name: name.value
        }))
          .then(resp => {
            store.dispatch(thunkChangeRequestProgress("LSTOP"));
            store.dispatch(changeFormStatus(resp.data.msg));
            if(resp.data.status === 1) {
                store.dispatch(thunkChangeRequestCondition("LSUCCESS"))
            }else{
              store.dispatch(thunkChangeRequestCondition("LFAIL"))
            }
          }).catch(err => {
            store.dispatch(thunkChangeRequestProgress("LSTOP"));
            store.dispatch(changeFormStatus(String(err)));
            store.dispatch(thunkChangeRequestCondition("LFAIL"))
          });
      }
    }else{
      if(name.value && password.value){
        status.classList.remove("form-fail", "form-succed");
        store.dispatch(thunkChangeRequestProgress("LSENDING"));
          Api.post('/LoginUser', JSON.stringify({
            info: name.value,
            password : password.value
          }))
            .then(resp => {
              store.dispatch(thunkChangeRequestProgress("LSTOP"));
              store.dispatch(changeFormStatus(resp.data.msg));
              if(resp.data.status === 1) {
                store.dispatch(thunkChangeRequestCondition("LSUCCESS"))
              } else {
                store.dispatch(thunkChangeRequestCondition("LFAIL"))
              }
            }).catch(err => {
              store.dispatch(thunkChangeRequestProgress("LSTOP"));
              store.dispatch(changeFormStatus(String(err)));
              store.dispatch(thunkChangeRequestCondition("LFAIL"))
            })
      }
    }
  }
    e.target.parentElement.classList.remove("input-focuced")
    e.target.parentElement.classList.remove("input-typing")
    if(e.target.value){
      e.target.parentElement.classList.add("zindex-negative")
    }else{
      e.target.parentElement.classList.remove("zindex-negative");
    }

}
export const focuced = (e)=>{
    e.target.parentElement.classList.add("input-focuced");
}
export const typing = (e)=>{
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
  }else{
    flag = false;
    eye.target.parentElement.children.item(0).type = "password";
    eye.target.children.item(1).classList.add("d-none");
    eye.target.children.item(0).classList.remove("d-none")
  }
}
let n = null;
export const toSignup = (e)=>{
  e.preventDefault();
  n = 1;
  const login = document.querySelector("#login");
  const signup = document.querySelector("#signup");
  login.classList.remove("fade-rev");
  login.classList.add("fade");
  signup.classList.add("fade-rev");
  login.addEventListener("animationstart" , ()=>{
    if(n === 1 ){
      setTimeout(() => {
        n = null;
        login.classList.add("d-none");
        login.classList.remove("fade");
        signup.classList.remove("d-none");
      }, 1700);
      signup.addEventListener("animationend" , ()=>{
        signup.classList.remove("fade-rev");
      })
    }
    });
  return
}