// CART
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//opern cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// CART working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making function
function ready() {
    // remove items from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Change
    let quantityInput = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    }

    // add to cart
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtoncClicked)
}

// Buy Button
function buyButtoncClicked(){
    alert('سفارش شما انجام شد.')
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

// remove items from cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//quantity Changes
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.parentElement;
    let title =
        shopProduct.getElementsByClassName("product-title")[0].innerText;
    let price = shopProduct.getElementsByClassName("price")[0].innerText;
    let prodictImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, prodictImg);
    updateTotal();
}

function addProductToCart(title, price, prodictImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
            alert("محصول قبلا به سبد خرید اضافه شده است.");
            eturn;
        }
    }

    let cartBoxContent = `
        <img src="${prodictImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity" />
        </div>
        <!-- Remove Cart -->
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}
// Update Total
function updateTotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement =
            cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace());
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }

        // if price contain some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = total;
    
}
