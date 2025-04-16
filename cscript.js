const itemContainer = document.querySelector(".items");
const listContainer = document.querySelector(".list-container");
const totalPrice = document.getElementById("total-price");
const checkoutBtn = document.getElementById("openContactForm");
checkoutBtn.onclick = openCheckoutForm;

var cartItem = [];

if (localStorage.getItem("cartArr")) {
	cartItem = JSON.parse(localStorage.getItem("cartArr"));
	showCartItem(cartItem);
} else {
	totalPrice.innerHTML = "0";
}

function showCartItem(Arr) {
	itemContainer.innerHTML = "";
	listContainer.innerHTML = "";

	if (cartItem.length === 0) {
		itemContainer.innerHTML = `<h3 style='text-align: center;'>No products found in Cart</h3>`;
		totalPrice.innerHTML = "0";
	}

	Arr.forEach((ele, index) => {
		itemContainer.innerHTML += `
            <div class="item">
                <img src="${ele.image}" alt="Item" />
                <div class="info">
                    <div style="margin-bottom: 10px; font-weight:600">${ele.title}</div>
                    <div style="font-weight:bold" class="row">
                        <div class="price">Rs.${ele.price}</div>
                    </div>
                    <div style='margin-top:10px;' class="row">Rating: ${Math.floor(ele.rating.rate)}</div>
                </div>
                <button style="background-color: black;" onmouseover="this.style.backgroundColor='rgb(117, 115, 115)'" onmouseout="this.style.backgroundColor='black'" onClick='removeFromCart(${ele.id})'>
  Remove From Cart
</button>

            </div>
        `;

		listContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px; gap:20px">
                <div><strong>${index + 1}.<strong>  ${ele.title}</div>
                <div>Rs.${ele.price}</div>
            </div>
        `;
	});

	totalPrice.innerHTML = totalPriceFunc();
}

function removeFromCart(id) {
	let indexToRemove = cartItem.findIndex((item) => item.id === id);
	cartItem.splice(indexToRemove, 1);
	localStorage.setItem("cartArr", JSON.stringify(cartItem));
	showCartItem(cartItem);
}

function totalPriceFunc() {
	return cartItem.reduce((acc, item) => acc + item.price, 0);
}

function openCheckoutForm() {
	document.getElementById("checkoutModal").style.display = "block";

	let orderSummary = "<ul>";
	cartItem.forEach((item) => {
		orderSummary += `<li>${item.title} - Rs.${item.price}</li>`;
	});
	orderSummary += `<li><strong>Total: Rs.${totalPriceFunc()}</strong></li></ul>`;
	document.getElementById("orderSummary").innerHTML = orderSummary;
}

const firebaseConfig = {
	apiKey: "AIzaSyAY43SDaXkYWpVgsllPal5ZDYCDiG9Hfws",
	authDomain: "contactform-f63d8.firebaseapp.com",
	databaseURL: "https://contactform-f63d8-default-rtdb.firebaseio.com",
	projectId: "contactform-f63d8",
	storageBucket: "contactform-f63d8.appspot.com",
	messagingSenderId: "569083896628",
	appId: "1:569083896628:web:dabcf6afa7b0733976fb61"
};

firebase.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();

	var name = getElementVal("name");
	var emailid = getElementVal("emailid");
	var contact = getElementVal("contact");
	var msgContent = getElementVal("msgContent");

	let orderDetails = cartItem.map(item => `${item.title} - Rs.${item.price}`).join("\n");

	saveMessages(name, emailid, contact, msgContent, orderDetails);

	document.querySelector(".alert").style.display = "block";
	setTimeout(() => document.querySelector(".alert").style.display = "none", 3000);
	document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, contact, msgContent, orderDetails) => {
	contactFormDB.push().set({
		name,
		emailid,
		contact,
		msgContent,
		orderDetails
	});
};

const getElementVal = (id) => document.getElementById(id).value;

// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

document.getElementById("rzp-button1").onclick = function(e) {
	var options = {
		key: "rzp_test_MrpMltSHikGyRF",
		amount: totalPriceFunc() * 100,
		currency: "INR",
		name: "MyShop Checkout",
		description: "This is your order",
		theme: {
			color: "#000",
		},
		image: "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
	};

	var rzpy1 = new Razorpay(options);
	rzpy1.open();
	localStorage.removeItem('cartArr');
	cartItem = [];
	showCartItem(cartItem);
};