const baseUrl ='https://hipet-server.herokuapp.com/api/';

export function createUser(userRequest){
    
    return fetch(baseUrl+'user/create',{
        method: "POST",
        body: JSON.stringify(userRequest),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw new Error(response.status)
        }
    }) 
    .then(json => {return json})
    .catch(err => {return err})
        
}

export function loginUser(userRequest){

    return fetch(baseUrl+'user/login',{
        method: "POST",
        body: JSON.stringify(userRequest),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then(response =>{
            if(response.status === 200){
                return response.json()
            }else{
                throw new Error(response.status)
            }

        }) 
    .then(json => {return json})
    .catch(err => {return err})
}
