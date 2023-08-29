import * as actions from '../redux/AuthActions'

export default function AuthReducder(state,action){

    if(typeof state === 'undefined'){
        const defaultState={
            userDetails:{}
        }
        return defaultState
    }

switch(action.type){
    case 'GET_TOKEN_AND_USERDETAILS':
        return{
            ...state,
            userDetails: action.payload
        }
    default:
        return state;

}
    
}