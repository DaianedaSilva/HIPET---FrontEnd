const baseUrl ='https://hipet-server.herokuapp.com/api/';

let _user = {
    "email": "daiane.supereira@gmail.com2",
    "password": "daiane1234",
    "name": "Daiane teste fetch 2",
    "phoneNumber": "11984056252556",
    "document": "452365894251",
    "nickName": "leoteste"
}

function createUser(userRequest){
    
    fetch(baseUrl+'user/create',{
        method: "POST",
        body: JSON.stringify(_user),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}

function loginUser(userRequest){

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

function login(){
    localStorage.setItem('deslogado', 'sim');

    let email = document.getElementById("formLoginEmail").value;
    let password = document.getElementById("formLoginPassword").value;

    let userLoginRequest = {
        "email": email,
        "password": password,
    }

    let data = loginUser(userLoginRequest)

    
    data.then(data =>{

        if(data['status'] == "SUCCESS"){
            window.location.href = "http://127.0.0.1:5500/src/index.html";
            
            localStorage.setItem('deslogado', 'nao');

        }else{
            console.log( "email e senha errada")
            
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl)
            })

        }
        
        

    })

    

    
        
      
    

    
    
   

}