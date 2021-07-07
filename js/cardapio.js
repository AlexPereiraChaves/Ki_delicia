var firebaseConfig = {
    apiKey: "AIzaSyAJXNHxn37rxJj9hdDjd5nUpleIxw1Upnw",
    authDomain: "testesapp-1bf35.firebaseapp.com",
    projectId: "testesapp-1bf35",
    storageBucket: "testesapp-1bf35.appspot.com",
    messagingSenderId: "728227895920",
    appId: "1:728227895920:web:69359dc7b73915798a72b5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
function abreLogin() {
    var popup = document.createElement('div')
    popup.classList.add('pop_up_title')
    var cartItems = document.getElementsByClassName('popups')[0]

    var newpopup = `<div class='modal'>
    <button data-close-button class="close-button">Fechar janela &times;</button>
    <div>
    <input id="login" type="text" placeholder="insira o e-mail">
    <input id="senha" type="text" placeholder="insira a senha">
    <button id="submit" class="submit" >Submit</button>
    </div>
    </div>`
    popup.innerHTML = newpopup
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopupSimples)
    popup.getElementsByClassName('submit')[0].addEventListener('click', signUpUser)

}

function signUpUser(event) {
    const email = document.getElementById('login'),
        pword = document.getElementById('senha');
    firebase.auth().signInWithEmailAndPassword(email.value, pword.value)
        .then((userCredential) => {

            user = userCredential.user;
            var lin = document.createElement('div')
            var linkPagcriador = ` <button class='logando'>Logando como ${user.email}! seja bem-vindo Ki-delicia! um momento por favor!</button>`
            lin.innerHTML = linkPagcriador;
            var ondevai = document.getElementsByClassName('popups')[0]
            ondevai.append(lin);
            //lin.getElementsByClassName('sair')[0].addEventListener('click', sairConta)
            setTimeout(function () { document.location.reload(true);; }, 3000);

        })
        .catch((error) => {
            alert('informação errada, por favor, tente novamente');
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}

function sairConta(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    firebase.auth().signOut();
    chave = null;
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        chave = 'chave';
        var lin = document.createElement('div')
        var linkPagcriador = ` <button class='sair'>Logado com ${user.email}! Para sair da conta clique aqui!</button>`
        lin.innerHTML = linkPagcriador;
        var ondevai = document.getElementsByClassName('popups')[0]
        ondevai.append(lin);
        lin.getElementsByClassName('sair')[0].addEventListener('click', sairConta)
    }
});


//---------término do login/ início do cardápio----------------------//
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    var descriptionCartButtons = document.getElementsByClassName('btn-descricao')
    for (var i = 0; i < descriptionCartButtons.length; i++) {
        var button = descriptionCartButtons[i]
        button.addEventListener('click', gerapopup)
    }
    var descriptionimage = document.getElementsByClassName('shop-item-image')
    for (var i = 0; i < descriptionimage.length; i++) {
        var button = descriptionimage[i]
        button.addEventListener('click', gerapopupbyimg)
    }
    callValue();
}
var chave;
function callValue() {

    db.collection('post').onSnapshot(function (data) {

        data.docs.map(function (val) {
            var tituloPost = val.data().name;
            var idpost = val.data().id;
            var lin = document.createElement('div')
            var linkPagcriador = `<span  id='${idpost}' class="shop-item-price" onclick="carregaParaMudar()">${tituloPost}</span> `
            lin.innerHTML = linkPagcriador;
            var nomelocal = document.getElementsByClassName(idpost)[0]
            nomelocal.append(lin);

        })
    })

}

function carregaParaMudar() {
    if (chave != null) {
        var descriptionCartButtons = document.getElementsByClassName('shop-item-price')
        for (var i = 0; i < descriptionCartButtons.length; i++) {
            var button = descriptionCartButtons[i]
            button.addEventListener('click', mudaTitulo)
        }
    }
}

function mudaTitulo(event) {
    var elemento = event.target.id;
    
    if (chave != null) {
        var popup = document.createElement('div')
        popup.classList.add('pop_up_title')
        var cartItems = document.getElementsByClassName('popups')[0]

        var newpopup = `<div class='modal'>
      <button data-close-button class="close-button">Fechar janela &times;</button>
      <p class='letrasnormais'>Você está alterando o valor do item: ${elemento}</p>
      <p  class='letrasnormais'>ATENÇÂO! apenas digite o preço, e com ponto apenas, não com vírgula! exemplo: 3.50 ou 2.50. Nunca coloque R$ <p>
      <Input type="text" id='valor' placeholder="Digite o valor"></Input>
      <button id='${elemento}' class='submit'>Confirmar</button>
      </div>`
        popup.innerHTML = newpopup
        cartItems.append(popup)
        popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopupSimples)
        popup.getElementsByClassName('submit')[0].addEventListener('click', alteraValor)
    }
}

function alteraValor(event) {
    var valorID = event.target.id;
    var citiesRef = db.collection("post");
    var valortexto = document.getElementById('valor').value;
    var finalValor = 'R$' + valortexto;
    citiesRef.doc(valorID).set({
        name: finalValor,
        id: valorID
    });
    setTimeout(function () { document.location.reload(true);; }, 4000);
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    var lin = document.createElement('div')
    var linkPagcriador = ` <button class='logando'>Aplicando alterações! um momento por favor!</button>`
    lin.innerHTML = linkPagcriador;
    var ondevai = document.getElementsByClassName('popups')[0]
    ondevai.append(lin);
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
function gerapopup(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    var popup = document.createElement('div')
    popup.classList.add('pop_up_title')
    var cartItems = document.getElementsByClassName('popups')[0]

    var newpopup = `
    <div class="modal um" id="modal">
<div class="modal-header">
<div class="title">${title}</div>
<button data-close-button class="close-button">Fechar janela &times;</button>
</div>
<div class="modal-body 1">
<h4>${price}</h4>
<img class="modalimg" src="${imageSrc}">
</div>
</div>
<div id="overlay"></div>`
    popup.innerHTML = newpopup
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
}
function gerapopupbyimg(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    var popup = document.createElement('div')
    popup.classList.add('pop_up_title')
    var cartItems = document.getElementsByClassName('popups')[0]

    var newpopup = `
    <div class="modal um" id="modal">
<div class="modal-header">
<div class="title">${title}</div>
<button data-close-button class="close-button">Fechar janela &times;</button>
</div>
<div class="modal-body 1">
<h4>${price}</h4>
<img class="modalimg" src="${imageSrc}">
</div>
</div>
<div id="overlay"></div>`
    popup.innerHTML = newpopup
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
}
//((((((((((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))))))))))
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src


    var popup = document.createElement('div')
    popup.classList.add('pop_up_title')
    var cartItems = document.getElementsByClassName('popups')[0]

    var newpopup = `<div class='modal'>
  <button data-close-button class="close-button">Fechar janela &times;</button>
  <p class='textoquantidade'>${title}</p><img class="cart-item-image inputdocartantes" src='${imageSrc}'/> 
  <p class='textoquantidade'>Escolha a quantidade(aperte no quadrado abaixo):</p>
  <input class="cart-quantity-input  inputdocartantes" id="${price}" type="number" value="1">
  <p class='textoquantidade'>Valor por unidade:<span class='valorfixo'>${price}</span> Total: </p> <span class="precounico precovalorunico">${price}</span>
  <br><button id='${title}' class='submit paracolocar'>Colocar quantidade no carrinho</button>
  </div>`
    popup.innerHTML = newpopup
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopupSimples)
    popup.getElementsByClassName('submit')[0].addEventListener('click', quantidadeDesejada)
    popup.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', attvalorunico)


    addItemToCart(title, price, imageSrc)

}
function attvalorunico(event) {
    var input = event.target;
    var shopitem = input.parentElement.parentElement;
    var precofixoelement = shopitem.getElementsByClassName('valorfixo')[0]
    var precofixo = parseFloat(precofixoelement.innerText.replace('R$', ''))
    var quantidade = shopitem.getElementsByClassName('cart-quantity-input')[0].value;
    var total = 0
    total = total + (precofixo * quantidade)
    total = Math.round(total * 100) / 100
    if(total<0){
        shopitem.getElementsByClassName('precounico')[0].innerText = 'R$' +'00.00'
    }else{
        shopitem.getElementsByClassName('precounico')[0].innerText = 'R$' + total
    }
   
}
function quantidadeDesejada(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var tituloAtual = event.target.id;
    var quantidade = shopItem.getElementsByClassName('cart-quantity-input')[0].value;

    var shopcart = document.getElementsByClassName('cart-items')[0];
    var cartitemTitle = shopcart.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartitemTitle.length; i++) {
        if (cartitemTitle[i].innerText == tituloAtual) {
            var shopdoValor = cartitemTitle[i].innerText;

            var input = document.getElementsByClassName('cart-quantity-input ' + tituloAtual)[0];
            if (isNaN(quantidade) || quantidade <= 0) {
                input.value = 1
                updateCartTotal()
            } else {
                input.value = quantidade;
                updateCartTotal()
            }
            shopItem.remove()


        }
    }

}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    alert('Adicionado no carrinho!')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input ${title}" id="tosc" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVER</button>
</div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal()

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('R$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R$' + total
}

// pop up descricao:
function abrePopupPurchase(cartItems) {
    var popup = document.createElement('div')
    popup.classList.add('pop_up_title')
    var cartItems = document.getElementsByClassName('popups')[0]

    var htmldisplay = `
    <div class="modal um" id="modal">
    <div class="modal-header">
        <div class="title">Falta pouco para finalizar o pedido!</div>
        <button data-close-button class="close-button">Fechar janela &times;</button>
    </div>
    <div class="modal-body 1">
    <h4>Informe o endereço de entrega:(entregamos só na cidade de Correia Pinto)</h4>
    <input type="text"  id="endereco" size="20" maxlength="50"
    placeholder="Clique aqui para digitar o endereço completo" required="required" />
    <img class="modalimg" src="">
    <h4>Informe o número da residência:</h4>
    <input type="text"  id="numCasa" size="20" maxlength="50"
    placeholder="Clique aqui para digitar o número da residência" required="required" />
    <img class="modalimg" src="">
    <button type="submit" data-close-button class="close-button btn btn-primary btn-purchase"  id="submit" onclick="getInputValue();" >Prosseguir-></button>
    </div>
    </div>
    <div id="overlay"></div>
    `
    popup.innerHTML = htmldisplay
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
    popup.getElementsByClassName('close-button')[1].addEventListener('click', removepopup)
}
function getInputValue() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var Array = [];
    for (var i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i]
        var nameElement = cartRow.getElementsByClassName('cart-item-title')[0]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var nome = nameElement.innerText;
        var price = priceElement.innerText;
        var quantity = quantityElement.value;

        Array.push(nome, "Quantidade: ", quantity, "Preço: ", price);
    }
    var precoTotal = document.getElementsByClassName('cart-total-price')[0];
    var total = precoTotal.innerText;


    var popup = document.createElement('div')
    popup.classList.add('pop_up_title')
    var cartItems = document.getElementsByClassName('popups')[0]
    var end = document.getElementById("endereco").value;
    var numero = document.getElementById("numCasa").value;
    var htmldisplay = ` <div class="modal um" id="modal">
    <div class="modal-header">
        <div class="title">Café artesanal</div>
        <button data-close-button class="close-button">Cancelar: &times;</button>
    </div>
    <div class="modal-body 1">
    <h4>   </h4>
     <a class="linkWhats" href="https://wa.me/554991119174?text=Endeço:%20${end}%20Número da residência:%20${numero}%20 Total:${total}%20Pedido:%20${Array}">Envie seu pedido!</a>
    </div>
    <h4 class="linkexplica">Clicando acima, você vai enviar o pedido completo para o whats da Ki-delícia!</>
    </div><div id="overlay"></div>`

    popup.innerHTML = htmldisplay
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)

}
function abrePopup(classe) {
    if (classe == "onze") {
        var popup = document.createElement('div')
        popup.classList.add('pop_up_title')
        var cartItems = document.getElementsByClassName('popups')[0]

        var newpopup = `
    <div class="modal dois" id="modal">
<div class="modal-header">
<div class="title">Galeria de bolos!</div>
<button data-close-button class="close-button">Fechar janela &times;</button>
</div>
<div class="modal-body">
<h4>Trabalhamos com bolos diferentes todos os dias! Por isso entre em contato no whats para receber informações dos bolos do dia clicando na imagem do whatsapp ou prossiga colocando no carrinho</h4>
<a href="https://wa.me/554991119174?text=Oi%20quero%20saber%20sobre%20os%20bolos%20do%20dia!"><img class="whatsapp" src="img/whatsapp.png"/></a>
<section class=central>
<img  class="modalimg slider-img"  src="img/galeria/a (19).jpeg">
</section>
<section class=esquerdotopo id="esquerda" onclick="prev()" )">
<img class="setas" src="img/arrow_invert.png"  />
</section>
<section class="direitotopo">
<img src="img/arrow.png" id="direita" class="setas"  onclick="next()" )"/>
</section>
</div>
</div>
<div id="overlay"></div>`

        popup.innerHTML = newpopup
        cartItems.append(popup)
        popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)

    }
}

function removepopup(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    document.getElementById('overlay').parentElement.remove()
}
function removepopupSimples(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
}
var images = ['a (1).jpeg', 'a (2).jpeg', 'a (17).jpeg', 'a (3).jpeg', 'a (29).jpeg', 'a (18).jpeg', 'a (4).jpeg', 'a (5).jpeg', 'a (6).jpeg', 'a (31).jpeg', 'a (7).jpeg', 'a (8).jpeg', 'a (9).jpeg', 'a (10).jpeg', 'a (11).jpeg', 'a (12).jpeg', 'a (13).jpeg', 'a (14).jpeg', 'a (15).jpeg', 'a (16).jpeg'];
var i = 0;

function prev() {
    if (i <= 0) i = images.length;
    i--;
    return setImg();
}

function next() {
    if (i >= images.length - 1) i = -1;
    i++;
    return setImg();
}

function setImg() {
    var slider_img = document.querySelector('.slider-img');
    return slider_img.setAttribute('src', "img/galeria/" + images[i]);

}
