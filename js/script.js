const cartButton = document.getElementById("cart-button");
const popupCart = document.getElementById('popup-cart');
const decrementButton = document.getElementById('decrement');
const incrementButton = document.getElementById('increment');
const addToCartCounter = document.getElementById('counter');
const addToCartButton = document.getElementById('add-to-cart');
const emptyText = document.getElementById('empty-text');
const deleteItemButton = document.getElementById('delete-item');
const cartContentsWrapper = document.getElementById('cart-contents');
const itemQuantity = document.getElementById('item-quantity');
const itemTotalPrice = document.getElementById('item-total-price');
const cartButtonQuantity = document.getElementById('cart-button-quantity');
const thumbnailButtons = document.querySelectorAll('.thumbnail-button');
const mainImage = document.getElementById('main-image');
const mainImageButton = document.getElementById('main-image-button');
const overlay = document.getElementById('overlay');
const overlayThumbnailButtons = document.querySelectorAll('.overlay-thumbnail-button');
const closeOverlay = document.getElementById('close-overlay');
const mainOverlayImage = document.getElementById('overlay-main-image');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const previousMobile = document.getElementById('previous-mobile');
const nextMobile = document.getElementById('next-mobile');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const navBarMobile = document.getElementById('nav-bar-mobile');
const body = document.getElementById("body");
const mobileMenuClose = document.getElementById("mobile-menu-close");

// preload images

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    "./assets/images/image-product-1.jpg",
    "./assets/images/image-product-2.jpg",
    "./assets/images/image-product-3.jpg",
    "./assets/images/image-product-4.jpg"
)

// Cart

let counter = 0;

const basket = {
    "fallLimitedEditionSneakers": {
        quantity: 0,
        price: 125.00
    },
};

function updateCounter() {
    addToCartCounter.textContent = counter;
}

function updateCart() {
    if(basket.fallLimitedEditionSneakers.quantity > 0) {
        emptyText.classList.add('hide');
        cartContentsWrapper.classList.remove('hide');
        const totalPrice = (basket.fallLimitedEditionSneakers.quantity * basket.fallLimitedEditionSneakers.price).toFixed(2);
        itemQuantity.textContent = basket.fallLimitedEditionSneakers.quantity;
        itemTotalPrice.textContent = `$${totalPrice}`;
        if(cartButtonQuantity.classList.contains('hide')){
            cartButtonQuantity.classList.remove('hide');
        }
        cartButtonQuantity.textContent = basket.fallLimitedEditionSneakers.quantity;
    } else {
        emptyText.classList.remove('hide');
        cartContentsWrapper.classList.add('hide');
        cartButtonQuantity.classList.add('hide');
    }
}

cartButton.addEventListener('click', ()=> {
    popupCart.classList.toggle('hide');
    const isExpanded = cartButton.getAttribute('aria-expanded') === 'true';
    cartButton.setAttribute('aria-expanded', !isExpanded);
});

incrementButton.addEventListener('click', ()=> {
    counter += 1;
    updateCounter();
});

decrementButton.addEventListener('click', ()=> {
    if(counter > 0) {
        counter -= 1;
        updateCounter();
    }
});

addToCartButton.addEventListener('click', ()=> {
    if(counter > 0) {
        basket.fallLimitedEditionSneakers.quantity += counter;
        counter = 0;
        updateCounter();
        updateCart();
    }
});

deleteItemButton.addEventListener('click', ()=> {
    basket.fallLimitedEditionSneakers.quantity = 0;
    updateCart();
});

// Front page thumbnails and main image

thumbnailButtons.forEach((button) => {
    button.addEventListener('click', () => {
        thumbnailButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        const dataImgValue = button.getAttribute('data-img');
        const newImageSrc = `./assets/images/image-product-${dataImgValue}.jpg`;
        mainImage.src = newImageSrc;
    });
});

mainImageButton.addEventListener('click', ()=> {
    document.body.style.overflow = 'hidden';
    overlay.classList.toggle("hide");
    mainOverlayImage.src = mainImage.src;
    const button = document.querySelector(".thumbnail-button.selected");
    const dataImgValue = button.getAttribute('data-img');
    const buttonWithDataImg = Array.from(overlayThumbnailButtons).find(
        (btn) => btn.getAttribute('data-img') === dataImgValue
    );
    overlayThumbnailButtons.forEach(btn => btn.classList.remove('selected'));
    if (buttonWithDataImg) {
        buttonWithDataImg.classList.add('selected');
    }
});

// Picture viewer overlay

closeOverlay.addEventListener('click', ()=> {
    document.body.style.overflow = '';
    overlay.classList.toggle("hide");
});

overlayThumbnailButtons.forEach((button) => {
    button.addEventListener('click', () => {
        overlayThumbnailButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        const dataImgValue = button.getAttribute('data-img');
        const newImageSrc = `./assets/images/image-product-${dataImgValue}.jpg`;
        mainOverlayImage.src = newImageSrc;
    });
});

function changeOverlayImage(imgNumber) {
    overlayThumbnailButtons.forEach(btn => btn.classList.remove('selected'));
    const buttonWithDataImg = Array.from(overlayThumbnailButtons).find(
        (btn) => btn.getAttribute('data-img') === imgNumber
    );
    if (buttonWithDataImg) {
        buttonWithDataImg.classList.add('selected');
    }
    const newImageSrc = `./assets/images/image-product-${imgNumber}.jpg`;
    mainOverlayImage.src = newImageSrc;
}

function nextPreviousImage(direction) {
    const button = document.querySelector(".overlay-thumbnail-button.selected");
    if (!button) {
        console.error("No selected button found.");
        return;
    }
    const dataImgValue = button.getAttribute('data-img');
    const imgValueInt = parseInt(dataImgValue, 10);
    if (direction === "next") {
        if(imgValueInt < 4 ) {
            changeOverlayImage(String(imgValueInt + 1));
            return;
        } else {
            return;
        }
    } else if (direction === "previous") {
        if(imgValueInt > 1) {
            changeOverlayImage(String(imgValueInt - 1));
            return;
        } else {
            return;
        }
    }
}

previousButton.addEventListener('click', ()=> nextPreviousImage("previous"));
nextButton.addEventListener("click", ()=> nextPreviousImage("next"));

//  Mobile view change images

function changeImage(imgNumber) {
    thumbnailButtons.forEach(btn => btn.classList.remove('selected'));
    const buttonWithDataImg = Array.from(thumbnailButtons).find(
        (btn) => btn.getAttribute('data-img') === imgNumber
    );
    if (buttonWithDataImg) {
        buttonWithDataImg.classList.add('selected');
    }
    const newImageSrc = `./assets/images/image-product-${imgNumber}.jpg`;
    mainImage.src = newImageSrc;
}

function nextPreviousMobile(e, direction) {
    e.stopPropagation();
    const button = document.querySelector(".thumbnail-button.selected");
    if (!button) {
        console.error("No selected button found.");
        return;
    }
    const dataImgValue = button.getAttribute('data-img');
    const imgValueInt = parseInt(dataImgValue, 10);
    
    if (direction === "next") {
        if(imgValueInt < 4 ) {
            changeImage(String(imgValueInt + 1));
            return;
        } else {
            return;
        }
    } else if (direction === "previous") {
        if(imgValueInt > 1) {
            changeImage(String(imgValueInt - 1));
            return;
        } else {
            return;
        }
    }
}

previousMobile.addEventListener('click', (e)=> nextPreviousMobile(e, "previous"));
nextMobile.addEventListener('click', (e)=> nextPreviousMobile(e, "next"));

// Mobile menu

function overlayListener() {
    mobileMenuOverlay.setAttribute('aria-hidden', true);
    mobileMenuOverlay.removeEventListener('transitionend', overlayListener);
}

function menuListener() {
    menu.setAttribute('aria-hidden', true);
    menu.removeEventListener('transitionend', menuListener);
}

function toggleMenu() {
    const isMenuOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    
    // Change attributes to new menu states
    mobileMenuButton.setAttribute('aria-expanded', !isMenuOpen);

    if (!isMenuOpen) {
        //open menu

        //overlay settings
        mobileMenuOverlay.removeEventListener('transitionend', overlayListener);
        mobileMenuOverlay.setAttribute('aria-hidden', false);

        //menu settings
        navBarMobile.removeEventListener('transitionend', menuListener);
        navBarMobile.setAttribute('aria-hidden', isMenuOpen);

        void mobileMenuOverlay.offsetHeight;

        //prevent scroll on body
        body.classList.add("no-scroll");

        //overlay settings
        mobileMenuOverlay.classList.add('mobile-menu-overlay--active');

        //menu settings
        navBarMobile.classList.add('nav-bar-mobile--active');

    } else {

        //close menu

        //overlay settings
        mobileMenuOverlay.addEventListener('transitionend', overlayListener);
        mobileMenuOverlay.classList.remove('mobile-menu-overlay--active');

        //remove prevent scroll on body
        body.classList.remove("no-scroll");

        //menu 
        navBarMobile.addEventListener('transitionend', menuListener);
        navBarMobile.classList.remove('nav-bar-mobile--active');
        
    }

}

mobileMenuButton.addEventListener('click', ()=> toggleMenu());
mobileMenuClose.addEventListener('click', ()=> toggleMenu());