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
function createPost(postRequest){
    
    return fetch(baseUrl+'post/create',{
        method: "POST",
        body: JSON.stringify(postRequest),
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

function createNewPost(){
    // let post_abandonedStatus = document.getElementById("inputAbandonedStatus").value;
    // let post_castrationState = document.getElementById("inputCastrationState").value;
    // let post_vaccinationStatus = document.getElementById("inputVaccinationStatus").value;
    
    let post_animalSpecie = document.getElementById("inputAnimalSpecie").value;
    let post_description = document.getElementById("inputDescription").value;
    let post_animalColor = document.getElementById("inputAnimalColor").value;
    let post_healthState = document.getElementById("inputHealthState").value;
    let post_picture = document.getElementById("inputLinkPicture").value;

    //verificar não preenchimento
    let user_email =  localStorage.getItem('email');

//    let post_picture = 'https://conteudo.imguol.com.br/c/entretenimento/eb/2022/03/23/cachorro-da-raca-lulu-da-pomeramia-1648065976007_v2_900x506.jpg.webp'

    let animal_info = {
        "specie": post_animalSpecie,
        "color": post_animalColor,
        "healthStatus": post_healthState
    }

    let _post_request = {
        "userEmail": user_email,
        "picture": post_picture,
       "description": post_description,
        "animal": animal_info
    }
    console.log( _post_request);

    let data = createPost(_post_request)

    data.then(data =>{

        if(data['status'] == "SUCCESS"){
            console.log(data)

            let popUpOkay =  `
            <div class="modal-header">
                <h5 class="modal-title" id="popUpCadastroLabel"> Post criado com sucesso!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Obrigado por ajudar uma vida :D
            </div>
            <div class="modal-footer">
                <a href="feed.html"> <button type="button" class="btn btn-primary" >Ir para o Feed</button> </a>
            </div>
            `

            let divPopUp = document.querySelector('.modal-content')

            divPopUp.innerHTML = popUpOkay
            
        }else{
            // tratativa de erro
           let popUpOkay =  `
           <div class="modal-header">
               <h5 class="modal-title" id="poppopUpNewPostLabel">Não foi possivel criar o post!</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
               Verifique as informações :(
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

// export type CreatePostRequest={
//     userEmail: string
//     picture: string
//     description: string
//     animal: Animal
//   }

// postDTO.user = this.toUser(user)
//     postDTO.createdAt = new Date()
//     postDTO.picture = postRequest.picture
//     postDTO.description = postRequest.description
//     postDTO.animal = postRequest.animal



// export class Animal {
//     specie: SpeciesOptions
//     color: ColorOptions
//     healthStatus: HealthStatusOptions
//   }
  