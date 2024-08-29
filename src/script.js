
let cart = [];
let total = 0;


function addToCart(id, name, price) {
  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
    
  }

  updateCartDisplay();
  updateCartCount();
  updateCartBorder(id);
  updateCartButton(id);
}

  function updateCartButton(id) {
    const product = cart.find(item => item.id === id);
    const buttonContainer = document.getElementById(`cartButton${id}`);
  
    if (buttonContainer) {
      if (product && product.quantity > 0) {
        buttonContainer.innerHTML = `
          <div class="py-2 px-2 gap-10 flex items-center justify-center bg-orange-700 rounded-full text-sm font-semibold text-white transition -mt-10 shadow-lg">
            <!-- Decrement Button -->
            <button onclick="decrementQuantity(${id})" class="px-1 py-2 border-2 border-white rounded-full transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="#fff" viewBox="0 0 10 2">
                <path fill="#FFFFFF" d="M0 .375h10v1.25H0V.375Z"/>
              </svg>
            </button>
            <!-- Quantity Display --> 
            <span id="productQuantity${id}">${product.quantity}</span>
            <!-- Increment Button -->
            <button onclick="incrementQuantity(${id})" class="p-1 border-2 border-white rounded-full transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#FFFFFF" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
              </svg>
            </button>
          </div>
        `;
      }else{
        const cartItem = cartItems.find(item => item.id === id);
        if (cartItem) {
      buttonContainer.innerHTML = `
       <button onclick="addToCart(${id}, '${cartItem.name}', ${cartItem.price})" class="py-2 px-6 gap-1 flex items-center justify-center bg-white border border-black rounded-full text-sm font-semibold text-slate-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 -mt-10 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="#FFA500" viewBox="0 0 21 20">
            <g fill="#C73B0F" clip-path="url(#a)">
              <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
              <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M.333 0h20v20h-20z"/>
              </clipPath>
            </defs>
          </svg>
          Add to Cart 
        </button>
      `;
        }
      }
    }
  }

  function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount > 0 ? `(${cartCount})` : '';
    }
  }

function decrementQuantity(id) {
  const productIndex = cart.findIndex(item => item.id === id);
  if (productIndex > -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
      total -= cart[productIndex].price; 
    } else {
      total -= cart[productIndex].price; 
      cart.splice(productIndex, 1); 

      const product = cartItems.find(item => item.id === id);
      if (product) {
        const buttonContainer = document.getElementById(`cartButton${id}`);
        if (buttonContainer) {
          buttonContainer.innerHTML = `
            <button onclick="addToCart(${id}, '${product.name}', ${product.price})" class="py-2 px-6 gap-1 flex items-center justify-center bg-white border border-black rounded-full text-sm font-semibold text-slate-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 -mt-10 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="#FFA500" viewBox="0 0 21 20">
                <g fill="#C73B0F" clip-path="url(#a)">
                  <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                  <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.333 0h20v20h-20z"/>
                  </clipPath>
                </defs>
              </svg>
              Add to Cart 
            </button>
          `;
        }
      }
    }
    updateCartDisplay();
    updateCartButton(id);
    updateCartCount();
    updateCartBorder(id);
    updateTotal(); 
  }
}

function incrementQuantity(id) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity += 1;
    updateCartDisplay();
    updateCartButton(id);
    updateCartCount();
  }
}


function updateCartBorder(id) {
  const productCard = document.querySelector(`.card-product[data-id="${id}"]`);
  if (productCard) {
    const productImage = productCard.querySelector('img');
    if (productImage) {
      const product = cart.find(item => item.id === id);
      if (product && product.quantity > 0) {
        productImage.classList.add('border-4', 'border-orange-500');
      } else {
        productImage.classList.remove('border-4', 'border-orange-500');
      }
    }
  }
}


function updateCartDisplay() {
  updateCartCount();
  const cartItemsDiv = document.getElementById("cartItems");
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");
  const DeliveryInfo = document.getElementById("DeliveryInfo");

  cartItemsDiv.innerHTML = ""; 

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
      <img src="./assets/images/illustration-empty-cart.svg" class="mx-auto" alt="empty cart">
      <div class="text-rose-900 text-sm mt-5">Your added items will appear here</div>
    `;
    confirmOrderBtn.classList.add("hidden");
    DeliveryInfo.classList.add("hidden"); 
    return;
  }

  cart.forEach((item) => {
    cartItemsDiv.innerHTML += `
    <div class="flex justify-between items-center mb-4">
      <div class="flex flex-col text-left">
        <span class="font-semibold">${item.name}</span>
        <div class="flex items-center gap-2">
          <span class="text-orange-600 text-sm font-bold">${item.quantity}x</span>
          <span class="text-gray-500 text-sm">@ $${item.price.toFixed(2)}</span>
          <span class="text-gray-500 text-sm">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button onclick="removeItem(${item.id})" class="border-2 rounded-full border-gray-500 hover:border-orange-500  text-gray-500 hover:text-orange-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `;  
  });

  cartItemsDiv.innerHTML += `
    <div class="flex justify-between items-center mt-4">
      <span class="text-base font-normal text-gray-500">Order Total</span>
      <span class="font-bold text-lg">$${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
    </div>
  `;

  confirmOrderBtn.classList.remove("hidden");
  DeliveryInfo.classList.remove("hidden");
}


function confirmOrder() {
  const orderPopup = document.getElementById("orderPopup");
  const orderDetails = document.getElementById("orderDetails");
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  orderDetails.innerHTML = "";

  cart.forEach((item) => {

    const itemImage = cartItems.find(cartItem => cartItem.id === item.id).image;
    orderDetails.innerHTML += `       
    <div class="flex justify-between items-center">
  <div class="flex items-center gap-3">
    <!-- Product Image -->
    <div>
      <img src="${itemImage}" class="w-16 h-16 rounded-lg" alt="${item.name}">
    </div>
    
    <!-- Product Details -->
    <div class="flex flex-col">
      <span class="font-semibold">${item.name}</span>
      <div class="flex items-center gap-2">
        <span class="text-orange-600 text-sm font-bold">${item.quantity}x</span>
        <span class="text-gray-500 text-sm">@ $${item.price.toFixed(2)}</span>
      </div>
    </div>
  </div>
  
  <!-- Total Price -->
  <span class="text-black font-bold text-md">$${(item.price * item.quantity).toFixed(2)}</span>
</div>
    `;
  });

  orderDetails.innerHTML += ` 
  <div class="flex justify-between items-center mt-4">
      <span class="text-base font-normal text-gray-500">Order Total</span>  
      <span class="font-bold text-lg">$${totalAmount.toFixed(2)}</span>
    </div>
  `;

  // Show the popup
  orderPopup.classList.remove("hidden");
}

// Sample data structure
const cartItems = [
  { id: 1, name: "Waffle", price: 6.5 , image:"assets/images/image-waffle-desktop.jpg"},
  { id: 2, name: "Crème Brûlée", price: 7.0, image:"assets/images/image-creme-brulee-desktop.jpg"},
  { id: 3, name: "Macaron", price: 8.0, image:"assets/images/image-macaron-desktop.jpg"},
  { id: 4, name: "Tiramisu", price: 5.5 ,image:"assets/images/image-tiramisu-desktop.jpg"},
  { id: 5, name: "Baklava", price: 4.0 ,image:"assets/images/image-baklava-desktop.jpg"},
  { id: 6, name: "Pie", price: 5.0 ,image:"assets/images/image-meringue-desktop.jpg"},
  { id: 7, name: "Cake", price: 4.5 ,image:"assets/images/image-cake-desktop.jpg"},
  { id: 8, name: "Brownie", price: 5.5 ,image:"assets/images/image-brownie-desktop.jpg"},
  { id: 9, name: "Panna Cotta", price: 6.5 , image:"assets/images/image-panna-cotta-desktop.jpg"},
];

function removeItem(itemId) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    updateCartDisplay();
    updateCartButton(itemId);
    updateCartCount();
    updateCartBorder(itemId);

    const buttonContainer = document.getElementById(`cartButton${itemId}`);
    if (buttonContainer) {
      const product = cartItems.find(item => item.id === itemId);
      if (product) {
        buttonContainer.innerHTML = `
          <button onclick="addToCart(${itemId}, '${product.name}', ${product.price})" class="py-2 px-6 gap-1 flex items-center justify-center bg-white border border-black rounded-full text-sm font-semibold text-slate-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 -mt-10 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="#FFA500" viewBox="0 0 21 20">
              <g fill="#C73B0F" clip-path="url(#a)">
                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.333 0h20v20h-20z"/>
                </clipPath>
              </defs>
            </svg>
            Add to Cart 
          </button>
        `;
      }
    }up
  }
}


function updateCartUI() {
  // Clear existing cart display
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";

  // Re-render items
  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.name} - $${item.price}`;
    cartContainer.appendChild(itemElement);
  });

  // Optionally, show a message if the cart is empty
  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.textContent = "Your cart is empty.";
    cartContainer.appendChild(emptyMessage);
  }
}

function startNewOrder() {
  document.getElementById("orderPopup").classList.add("hidden");
  cart = [];
  updateCartDisplay();
  updateCartCount();

  cartItems.forEach(item => {
    updateCartButton(item.id);
    updateCartBorder(item.id);
  });
}
      
function updateAllBorders() {
  cartItems.forEach(item => {
    updateCartBorder(item.id);
  });
}

document.addEventListener('DOMContentLoaded', updateAllBorders);


function updateCartTitle(count) {
  const cartCountElement = document.getElementById('cartCount');

  if (count > 0) {
      cartCountElement.textContent = `(${count})`; // Display the count in parentheses
  } else {
      cartCountElement.textContent = ''; // Empty if count is 0
  }
}

function addItemToCart() {
  let currentCount = parseInt(document.getElementById('cartCount').textContent.replace(/\D/g,'')) || 0;
  currentCount += 1; // Increment the count (you can adjust this as per your logic)
  updateCartTitle(currentCount);
}

function removeItemFromCart() {
  let currentCount = parseInt(document.getElementById('cartCount').textContent.replace(/\D/g,'')) || 0;
  if (currentCount > 0) {
      currentCount -= 1; // Decrement the count (you can adjust this as per your logic)
  }
  updateCartTitle(currentCount);``
}

updateCartTitle(0);
updateCartCount();