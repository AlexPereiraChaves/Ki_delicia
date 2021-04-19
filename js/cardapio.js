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
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    alert('Adicionado no carrinho!')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('O item já foi adicionado ao carrinho!')
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
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVER</button>
</div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
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
function getInputValue(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var Array = [];
    for(var i=0;i< cartRows.length;i++){
      
        var cartRow = cartRows[i]
        var nameElement = cartRow.getElementsByClassName('cart-item-title')[0]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var nome = nameElement.innerText;
        var price = priceElement.innerText;
        var quantity = quantityElement.value;

        Array.push(nome,"Quantidade: ",quantity,"Preço: ",price);
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
     <a class="linkWhats" href="https://wa.me/554896418819?text=Endeço:%20${end}%20Número da residência:%20${numero}%20 Total:${total}%20Pedido:%20${Array}">Envie seu pedido!</a>
    </div>
    <h4 class="linkexplica">Clicando acima, você vai enviar o pedido completo para o whats da Ki-delícia!</>
    </div><div id="overlay"></div>`
    
    popup.innerHTML = htmldisplay
    cartItems.append(popup)
    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
   
}
function abrePopup(classe) {
    if (classe == "um") {
        var popup = document.createElement('div')
        popup.classList.add('pop_up_title')
        var cartItems = document.getElementsByClassName('popups')[0]

        var newpopup = `
        <div class="modal um" id="modal">
<div class="modal-header">
    <div class="title">Café artesanal</div>
    <button data-close-button class="close-button">Fechar janela &times;</button>
</div>
<div class="modal-body 1">
<h4>café quente na garrafa. 350 ml . com acompanhamento de salgadinhos</h4>
<img class="modalimg" src="img/galeria/cafe.jpg">
</div>
</div>
<div id="overlay"></div>`
        popup.innerHTML = newpopup
        cartItems.append(popup)
        popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
    } else {
        if (classe == "dois") {
            var popup = document.createElement('div')
            popup.classList.add('pop_up_title')
            var cartItems = document.getElementsByClassName('popups')[0]

            var newpopup = `
        <div class="modal dois" id="modal">
<div class="modal-header">
    <div class="title">Combo café da manhã</div>
    <button data-close-button class="close-button">Fechar janela &times;</button>
</div>
<div class="modal-body">
<h4>Combo especial da casa! incluindo: torradas, pão fresco, doce de amora e pão de
queijo</h4>
<img class="modalimg" src="img/galeria/combo_pao.jpg">
</div>
</div>
<div id="overlay"></div>`

            popup.innerHTML = newpopup
            cartItems.append(popup)
            popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
        } else {
            if (classe == "tres") {
                var popup = document.createElement('div')
                popup.classList.add('pop_up_title')
                var cartItems = document.getElementsByClassName('popups')[0]

                var newpopup = `
                <div class="modal dois" id="modal">
        <div class="modal-header">
            <div class="title">Docinhos artesanais</div>
            <button data-close-button class="close-button">Fechar janela &times;</button>
        </div>
        <div class="modal-body">
        <h4>Doces de brigadeiro e mais! vem 10 unidades de 20 gramas por item.</h4>
        <img class="modalimg" src="img/galeria/doce.jpg">
        </div>
        </div>
        <div id="overlay"></div>`

                popup.innerHTML = newpopup
                cartItems.append(popup)
                popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
            } else {
                if (classe == "quatro") {
                    var popup = document.createElement('div')
                    popup.classList.add('pop_up_title')
                    var cartItems = document.getElementsByClassName('popups')[0]

                    var newpopup = `
                <div class="modal dois" id="modal">
        <div class="modal-header">
            <div class="title">Maçã do amor</div>
            <button data-close-button class="close-button">Fechar janela &times;</button>
        </div>
        <div class="modal-body">
        <h4>A famosa maçã do amor!vem três unidades de 100 gramas por item.</h4>
        <img class="modalimg" src="img/galeria/maca_do_amor.jpg">
        </div>
        </div>
        <div id="overlay"></div>`

                    popup.innerHTML = newpopup
                    cartItems.append(popup)
                    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
                } else {
                    if (classe == "cinco") {
                        var popup = document.createElement('div')
                        popup.classList.add('pop_up_title')
                        var cartItems = document.getElementsByClassName('popups')[0]

                        var newpopup = `
                <div class="modal dois" id="modal">
        <div class="modal-header">
            <div class="title">Pão rústico</div>
            <button data-close-button class="close-button">Fechar janela &times;</button>
        </div>
        <div class="modal-body">
        <h4>Experimente o melhor dos pães! vêm com 10 por item.</h4>
        <img class="modalimg" src="img/galeria/pao.jpg">
        </div>
        </div>
        <div id="overlay"></div>`

                        popup.innerHTML = newpopup
                        cartItems.append(popup)
                        popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
                    } else {
                        if (classe == "seis") {
                            var popup = document.createElement('div')
                            popup.classList.add('pop_up_title')
                            var cartItems = document.getElementsByClassName('popups')[0]

                            var newpopup = `
                        <div class="modal dois" id="modal">
                <div class="modal-header">
                    <div class="title">Pão integral</div>
                    <button data-close-button class="close-button">Fechar janela &times;</button>
                </div>
                <div class="modal-body">
                <h4>Pãozinho integral. vêm 10 unidades de 50 gramas por item</h4>
                <img class="modalimg" src="img/galeria/pao_chique.jpg">
                </div>
                </div>
                <div id="overlay"></div>`

                            popup.innerHTML = newpopup
                            cartItems.append(popup)
                            popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
                        } else {
                            if (classe == "sete") {
                                var popup = document.createElement('div')
                                popup.classList.add('pop_up_title')
                                var cartItems = document.getElementsByClassName('popups')[0]

                                var newpopup = `
                            <div class="modal dois" id="modal">
                    <div class="modal-header">
                        <div class="title">Pão doce</div>
                        <button data-close-button class="close-button">Fechar janela &times;</button>
                    </div>
                    <div class="modal-body">
                    <h4>Pão doce! vêm 10 unidades de 50 gramas por item</h4>
                    <img class="modalimg" src="img/galeria/pao_doce.jpg">
                    </div>
                    </div>
                    <div id="overlay"></div>`

                                popup.innerHTML = newpopup
                                cartItems.append(popup)
                                popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
                            } else {
                                if (classe == "oito") {
                                    var popup = document.createElement('div')
                                    popup.classList.add('pop_up_title')
                                    var cartItems = document.getElementsByClassName('popups')[0]

                                    var newpopup = `
                                <div class="modal dois" id="modal">
                        <div class="modal-header">
                            <div class="title">Pão de queijo</div>
                            <button data-close-button class="close-button">Fechar janela &times;</button>
                        </div>
                        <div class="modal-body">
                        <h4>O clássico pão de queijo! vêm 10 unidade de 20 gramas por item.</h4>
                        <img class="modalimg" src="img/galeria/pao_queijo.jpg">
                        </div>
                        </div>
                        <div id="overlay"></div>`

                                    popup.innerHTML = newpopup
                                    cartItems.append(popup)
                                    popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
                                } else {
                                    if (classe == "nove") {
                                        var popup = document.createElement('div')
                                        popup.classList.add('pop_up_title')
                                        var cartItems = document.getElementsByClassName('popups')[0]

                                        var newpopup = `
                                    <div class="modal dois" id="modal">
                            <div class="modal-header">
                                <div class="title">Pudim</div>
                                <button data-close-button class="close-button">Fechar janela &times;</button>
                            </div>
                            <div class="modal-body">
                            <h4>Pudim! vem 5 unidades de 30 gramas por item</h4>
                            <img class="modalimg" src="img/galeria/pudim.jpg">
                            </div>
                            </div>
                            <div id="overlay"></div>`

                                        popup.innerHTML = newpopup
                                        cartItems.append(popup)
                                        popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)
                                    } else {
                                        if (classe == "dez") {
                                            var popup = document.createElement('div')
                                            popup.classList.add('pop_up_title')
                                            var cartItems = document.getElementsByClassName('popups')[0]

                                            var newpopup = `
                                        <div class="modal dois" id="modal">
                                <div class="modal-header">
                                    <div class="title">Torta de Morango</div>
                                    <button data-close-button class="close-button">Fechar janela &times;</button>
                                </div>
                                <div class="modal-body">
                                <h4>Torta de morango! Vêm 1 unidade de 300 gramas por item</h4>
                                <img class="modalimg" src="img/galeria/torta_morango.jpg">
                                </div>
                                </div>
                                <div id="overlay"></div>`

                                            popup.innerHTML = newpopup
                                            cartItems.append(popup)
                                            popup.getElementsByClassName('close-button')[0].addEventListener('click', removepopup)

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function removepopup(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    document.getElementById('overlay').parentElement.remove()
}
