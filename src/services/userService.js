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

function getUser(userEmail){
 
    return fetch(baseUrl+'user/'+userEmail,{
        method: "GET",
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
function listPosts(){
    
    return fetch(baseUrl+'post/list',{
        method: "GET",
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

function setUserName(){
    let user_name = document.getElementById("infoUserName")

    let email = localStorage.getItem('email');
    
    let data = getUser(email)

    data.then(data =>{

        if(data['status'] == "SUCCESS"){
            console.log(data)
            let nickName =  data.user.nickName

            let infoName = `<p> Olá ${nickName}!</p>`

            user_name.innerHTML += infoName
            
        
        }else{
            
        }  
    })
    

}

function createCards(){

    let containerDesktop = document.getElementById("containerFeed")
    let containerMobile = document.getElementById("containerFeed-mobile")
    
    let data = listPosts()
    data.then(data =>{

        if(data['status'] == "SUCCESS"){

           // data[]

            console.log(data['posts'])

            let posts = data['posts']
            let healthStatus;
            let color;
            let ulrPicture;
            for (let  i = 0; i < posts.length; i++){
       
                ulrPicture = posts[i].picture
                color = posts[i].animal.color
                description = posts[i].description

                if (posts[i].animal.healthStatus == "BRUISED" ){
                    healthStatus = "Sim"
                }else{
                    healthStatus = "Não"
                }

                

                card = `
                <div class="card card-item mb-3 shadow p-3 rounded"  >
                                <div class="row card-info card-mobile">
                            
                                    <div class="col-md-6 feed-itens-cards-img " >
                                    <img src="${ulrPicture}" class="img-fluid " alt="...">
                                    </div> 
                            
                                    <div class="row-md-6 feed-itens-cards-info" class="card-mobile-info">
                                            <div class="card-body">
                                                <table class="table table-borderless feed-itens-cards-table">
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>Onde</strong></td>
                                                            <td>adiciona no back</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Cor</strong></td>
                                                            <td>${color}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Está machucado</strong></td>
                                                            <td>${healthStatus}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                
                                                <p class="card-text">
                                                ${description}                                  
                                                </p>
                                                
                                        </div>
                            
                                    </div>
                                
                                </div> 

                                <div class="row icon">

                                    <div class="col icon-share">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-circle" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/>
                                        </svg>

                                    </div>

                                    <div class="col icon-chat">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                                        </svg>
                                        <i class="bi bi-chat-dots"></i>
                                    </div>
                                </div>
                            </div> `;


            containerDesktop.innerHTML += card;
            containerMobile.innerHTML += card;

            }
            

            
        
        }else{
            console.log(data)
        }  
    })

}