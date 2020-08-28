export const changeAllow = allowGuest => ({type: allowGuest === 'GUEST' ? 'HOME' : 'GUEST'})
export const changeAutoReq = autoReq => ({ type : autoReq === 'NO' ? 'YES' : 'NO' })
export const changeClientValidate = validate => ({ type: validate === 'DONT_VALIDATE' ? 'VALIDATE' : 'DONT_VALIDATE'});
export const changeNightMode = nightmode => ({ type: nightmode === 'DAY' ? 'NIGHT' : 'DAY'})
export const changeRequestProgress = progress => ({ 
    type : progress === 'SENDING' ? 'SENDING' 
    : progress === 'LSENDING' ? 'LSENDING'
    : progress === 'LSTOP' ?  'LSTOP'
    : 'STOP' });
export const changeRequestCondition = condition =>  ({ type : condition === 'FAIL' ? 'FAIL'
: condition === 'LSUCCESS' ? 'LSUCCESS'
: condition === 'LFAIL' ? 'LFAIL'
: 'SUCCESS' });
export const changeFormStatus = msg => ({ type : 'HAS_MSG' , payload : msg });

//thunk
export function thunkChangeRequestProgress( progress ){
     return ( dispatch )=> {
         if( progress === 'SENDING' ){
             dispatch(changeRequestProgress("SENDING"))
         }else if(progress === 'STOP'){
             dispatch(changeRequestProgress("STOP"))
         }else if(progress === 'LSENDING'){
            dispatch(changeRequestProgress("LSENDING"))             
         }else{
            dispatch(changeRequestProgress("LSTOP"))
         }
     }
}

export function thunkChangeRequestCondition( condition ){
    return ( dispatch )=> {
        if(condition === 'FAIL'){
            dispatch(changeRequestCondition("FAIL"))
        }else if( condition === 'SUCCESS' ){
            dispatch(changeRequestCondition("SUCCESS"))
        }else if( condition === 'LFAIL'){
            dispatch(changeRequestCondition("LFAIL"))
        }else{
            dispatch(changeRequestCondition("LSUCCESS"))
        }
    }
}