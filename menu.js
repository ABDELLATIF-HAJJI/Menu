if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
const fruits = [
    {
        image: 'img/apple.jpeg',
        title: 'Apple',
        price:3.99,
    },
    {
        image: 'img/orange.jpeg',
        title: 'Orange',
        price:2.25,
    },
    {
        image: 'img/banana.jpeg',
        title: 'Banana',
        price:3.20,
    },
    {
        image: 'img/grape.jpeg',
        title: 'Grape',
        price:2.99,
    },
    {
        image: 'img/kiwi.jpeg',
        title: 'Kiwi',
        price:3.90,
    },
    {
        image: 'img/watermelon.jpeg',
        title: 'Watermelon',
        price:3.90,
    },
    {
        image: 'img/strawberry.jpeg',
        title: 'Strawberry',
        price:4.26,
    },
    {
        image: 'img/ananas.jpeg',
        title: 'Ananas',
        price:2.71,
    }
];
const fruitsContainer = document.querySelector('.productsContainer');
for(let i=0; i<fruits.length; i++){
    productsContainer(i)
}
function productsContainer(i){
    const card = document.createElement('div');
    card.className = 'card';
    fruitsContainer.appendChild(card);
    const image = document.createElement ('img');
    image.className = 'image';
    image.src = fruits[i].image;
    card.appendChild(image);
    const title = document.createElement('p');
    title.className = 'title';
    title.innerHTML = fruits[i].title;
    card.appendChild(title);
    const priceBox = document.createElement('div');
    priceBox.className = 'priceBox';
    card.appendChild(priceBox)
    const priceName = document.createElement('p');
    priceName.className = 'priceName'
    priceName.innerHTML = 'Price';
    priceBox.appendChild(priceName);
    const price = document.createElement('p');
    price.className = 'price'
    price.innerHTML =  fruits[i].price +'€';
    priceBox.appendChild(price);
    const shoopingCard = document.createElement('button');
    shoopingCard.className = 'shoopingButton';
    shoopingCard.innerHTML = 'shooping';
    card.appendChild(shoopingCard);
};
function ready(){
    let removeButton = document.getElementsByClassName('removeButton')
    for(let i = 0; i < removeButton.length; i++){
        const button = removeButton[i]
        button.addEventListener('click', removecart)
    }
    let quantity = document.getElementsByClassName('quantity');
    for(let i = 0; i < quantity.length; i++){
        const input = quantity[i]
        input.addEventListener('change', Quantitychanged)
    }
    let addCart = document.getElementsByClassName('shoopingButton');
    for(let i = 0; i < addCart.length; i++){
        const addshoopingCart = addCart[i]
        addshoopingCart.addEventListener('click', copyCart)
    }
}
function removecart(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}
function Quantitychanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}
function copyCart(event){
    let addshoopingCart = event.target
    let shopItem = addshoopingCart.parentElement
    let image =  shopItem.getElementsByClassName('image')[0].src
    let title = shopItem.getElementsByClassName('title')[0].innerText
    let price = shopItem.getElementsByClassName('price')[0].innerText
    copyItemsToCart(image, title, price)
    updateTotal()
}
function copyItemsToCart(image, title, price){
    let selectedcart = document.getElementsByClassName('selectedcart')[0];
    let addCartOnlyOnce = selectedcart.getElementsByClassName('title')
    for(let i=0; i<addCartOnlyOnce.length; i++){
        if (addCartOnlyOnce[i].innerText == title){
            alert('This cart has already added')
            return;
        }
    }
    let cartItem = document.createElement('div')
    cartItem.className = 'card';
    selectedcart.appendChild(cartItem)
    let cartContents = `
        <img class="image" src="${image}" alt="fruits" >
        <p class="title">${title}</p>
        <p class="price">${price}</p>
        <input class="quantity" type="number" name="quantity" id="quantity" value="1">
        <button id="remove" class="removeButton">Remove</button>`
    cartItem.innerHTML = cartContents
    ready()
}
function updateTotal(){
    let cartContainer = document.getElementsByClassName('selectedcart')[0];
    let cards  = cartContainer.getElementsByClassName('card')
    var total = 0;
    for(let i = 0; i < cards.length; i++){
        let cart = cards[i]
        let priceEle = cart.getElementsByClassName('price')[0];
        let quantityEle = cart.getElementsByClassName('quantity')[0];
        let price = parseFloat(priceEle.innerText.replace('€', ''))
        let quantity = quantityEle.value
        total = total + (price * quantity);
    }
    total = (Math.round(total * 100) / 100).toFixed(2)
    document.getElementsByClassName('total')[0].innerText = total + '€';
}
document.getElementsByClassName('purchase')[0].addEventListener('click', clickedPurchase)
function clickedPurchase(){
    const total = document.getElementsByClassName('total')[0].innerText;
    const purchaseTotal = parseFloat(total)
    if (purchaseTotal >0){
        alert('you have purchased your items successfuly')
    }
    let cartContainer = document.getElementsByClassName('selectedcart')[0];
    while (cartContainer.hasChildNodes()) {
        cartContainer.removeChild(cartContainer.firstChild)
    }
    updateTotal()
}