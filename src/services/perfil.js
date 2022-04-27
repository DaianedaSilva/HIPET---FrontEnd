const baseUrl ='https://hipet-server.herokuapp.com/api/';

userPerfil()

function getUser(userEmail){
    return fetch( baseUrl+'user/'+userEmail ,{
        method: "GET", 
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

function userPerfil(){
    let _userEmail = window.localStorage.getItem('email')
    
    let _dataUser =getUser(_userEmail)

    let divNameTitle = document.getElementById('nameTitle')
    let divName = document.getElementById('name')
    let divEmail = document.getElementById('email')
    let divNickName = document.getElementById('nickName')
    let divPhoneNumber = document.getElementById('phoneNumber')
    let divDocment = document.getElementById('document')
     
    _dataUser.then(_data =>{
        
        divNameTitle.innerHTML = "Olá " + _data['user']['name'] + "!"
        
        divName.innerHTML = _data['user']['name']
        divEmail.innerHTML = _data['user']['email']
        divNickName.innerHTML = _data['user']['nickName']
        divPhoneNumber.innerHTML = _data['user']['phoneNumber']
        divDocment.innerHTML = _data['user']['document']

    })  
}

function logOut(){

    localStorage.setItem('deslogado', 'sim');
    localStorage.removeItem('email');
    window.location.href = "login.html";

}