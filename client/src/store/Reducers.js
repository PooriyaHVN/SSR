import { combineReducers } from 'redux'
function auth(state={authentication : 'OK'}, action){
	switch (action.type) {
		case 'OPPS': return {authentication : 'OPPS'};
		case 'OK' : return {authentication : 'OK'};	
		default: return state
	}
};

function autoReq(state={autoRequest : 'NO'} , action){
	switch (action.type) {
		case 'YES':return {autoRequest : 'YES'};
		case 'NO':return {autoRequest : 'NO'};
		default: return state
	}
} 

function GuestMode(state={GuestAllow : 'HOME'} , action) {
	switch (action.type) {
		case 'GUEST':return { GuestAllow : 'GUEST' };
		case 'HOME':return { GuestAllow : 'HOME' }	
		default : return state
	}
}

function ClientValidate(state = { letClinetValidate : 'VALIDATE'} , action) {
	switch (action.type) {
		case 'DONT_VALIDATE': return { letClinetValidate: 'DONT_VALIDATE' }	
		case 'VALIDATE': return { letClinetValidate: 'VALIDATE' }
		default : return state
	}
}

function nightMode(state={ DayNight : 'NIGHT' } , action){
	switch (action.type) {
		case 'DAY': return { DayNight : 'DAY' }
		case 'NIGHT': return { DayNight : 'NIGHT' } 
		default: return state
	}
}

function requestProgress( state = { condition : 'NOSENDING' }, action ){
	switch(action.type){
		case 'SENDING' : return { condition : 'SENDING' };
		case 'STOP' : return { condition : 'STOP' } ;
		case "LSENDING" : return { condition : 'LSENDING' };
		case "LSTOP" : return { condition : 'LSTOP' }
		default : return state;
	}
}

function requestCondition( state = { icon : 'DEF ' } , action ){
	switch(action.type){
		case 'FAIL' : return { icon : 'FAIL'};
		case 'SUCCESS' : return { icon : 'SUCCESS' };
		case "LFAIL" : return { icon : "LFAIL" };
		case 'LSUCCESS' : return { icon : 'LSUCCESS' }
		default : return state;
	}
}

function serverMessage(state={ msg : '' } , action){
	if(action.type === 'HAS_MSG'){
		return {
			msg : action.payload
		}
	}else{
		return state
	}
}

function changeFormTurn(state={ turn : 'LOGIN' } , action){
	if(action.type === 'SIGNUP'){
		return { turn : 'SIGNUP' }
	}else if(action.type === 'LOGIN'){
		return { turn : 'LOGIN' }
	}else return state
}

export default combineReducers({ 
	auth,
	autoReq,
	GuestMode,
	ClientValidate ,
	nightMode ,
	requestProgress ,
	requestCondition ,
	serverMessage ,
	changeFormTurn
})