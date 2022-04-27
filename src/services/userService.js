// import { createUser, loginUser } from '';
// const api = require("../utilities/hipetAPI")
const baseUrl ='https://hipet-server.herokuapp.com/api/';

function createUser(userRequest){
    
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

function register(){
    let user_email = document.getElementById("inputEmail").value;
    let user_password = document.getElementById("inputPassword").value;
    let user_name = document.getElementById("inputName").value;
    let user_phoneNumber = document.getElementById("inputPhoneNumber").value;
    let user_document = document.getElementById("inputDocument").value;
    let user_nickName = document.getElementById("inputNickName").value;

    let _user = {
        "email": user_email,
        "password": user_password,
        "name": user_name,
        "phoneNumber": user_phoneNumber,
        "document": user_document,
        "nickName": user_nickName
    }

    //fazer verificação dos dados, se estão vazios

    let data = createUser(_user)

    data.then(data =>{

        if(data['status'] == "SUCCESS"){
            let popUpOkay =  `
            <div class="modal-header">
                <h5 class="modal-title" id="popUpCadastroLabel">Usuário Criado Com Sucesso!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Seu usuário foi criado com sucesso use o e-mail e o password para logar :D
            </div>
            <div class="modal-footer">
                <a href="login.html"> <button type="button" class="btn btn-primary" >Ir para Login</button> </a>
            </div>
            `

            let divPopUp = document.querySelector('.modal-content')

            divPopUp.innerHTML = popUpOkay

            
            localStorage.setItem('deslogado', 'sim');

            
        }else{
           // tratativa de erro
           let popUpOkay =  `
            <div class="modal-header">
                <h5 class="modal-title" id="popUpCadastroLabel">Usuário Não Criado!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Seu usuário não pode ser criado verifique as informações :(
            </div>
            <div class="modal-footer">
                
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            `

            let divPopUp = document.querySelector('.modal-content')

            divPopUp.innerHTML = popUpOkay
        }
    })
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
            localStorage.setItem('deslogado', 'nao');
            localStorage.setItem('email', email);

            
            window.location.href = "feed.html";
        
        }else{
            console.log( "email e senha errada")
            
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl)
            })
        }  
    })
}