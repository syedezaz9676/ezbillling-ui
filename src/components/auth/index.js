
export const isLoggedin=()=>{
    let data = localStorage.getItem('data');
    console.log('isLogged data',data);
    if(data != null){
        return true;
    }else{
        return false;
    }
}

export const doLogin=(data, next)=>{
    localStorage.setItem('data',JSON.stringify(data));
    next()
}

export const doLogut=(next)=>{
    localStorage.removeItem('data');
    next()
}

export const getCurrentUser=()=>{
    if(isLoggedin){
        return JSON.parse(localStorage.getItem('data').user);
    }else{
        return false;
    }
}