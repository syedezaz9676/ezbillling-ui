import useLocalStorage from "../../localStorage/localStorage";


export const isLoggedin=()=>{
    // const [user, setUser] = useLocalStorage('user', '');
    let user = localStorage.getItem('user');
    if(user != null){
        return true;
    }else{
        return false;
    }
}

export const doLogin=(data, next)=>{
    localStorage.setItem('user',JSON.stringify(data));
    next()
}

export const doLogut=(next)=>{
    localStorage.removeItem('data');
    next()
}

export const getCurrentUser=()=>{
    if(isLoggedin){
        return JSON.parse(localStorage.getItem('user'));
    }else{
        return false;
    }
}