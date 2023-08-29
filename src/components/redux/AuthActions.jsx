import {login} from "../service/services"

export const actions={
    getTokenAndUserDetails:(username, password)=>({
        type:'GET_TOKEN_AND_USERDETAILS',
        payload: {
            promise: login(username,password)
        }
    }

    )
}