window.onload = function () {
    var card = document.getElementById('card-mobile')
    card.onclick = mostrarConteudo;
}


function mostrarConteudo(){
    var card_info = document.getElementById('card-mobile-info')
    if(card_info.style.display === 'block') {
        console.log("tira conteudo");
        card_info.style.display = 'none';
    } else {
        console.log("coloca conteudo");
        card_info.style.display = 'block';
    }

}