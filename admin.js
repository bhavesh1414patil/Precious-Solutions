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

if (localStorage.getItem("adminLoggedIn") !== "true") {
	window.location.href = "login.html";
}

function adminLogout() {
	localStorage.removeItem("adminLoggedIn");
	window.location.href = "login.html";
}
var contactFormDB = firebase.database().ref("contactForm");

contactFormDB.on("value", (snapshot) => {
	let tableBody = document.getElementById("messageTable");
	tableBody.innerHTML = "";

	if (snapshot.exists()) {
		snapshot.forEach((childSnapshot) => {
			let data = childSnapshot.val();
			let orderDetails = data.orderDetails || "N/A";
			let email = data.emailid || "N/A";

			let orderButton = orderDetails !== "N/A" ?
				`<button onclick="sendOrderConfirmation('${childSnapshot.key}', '${email}')">Confirm Order</button>` :
				"N/A";

			let row = `<tr>
                        <td>${data.name || "N/A"}</td>
                        <td>${email}</td>
                        <td>${data.msgContent || "N/A"}</td>
                        <td>${data.contact || "N/A"}</td> 
                        <td>${orderDetails}</td>
                        <td>${orderButton}</td>
                       </tr>`;

			tableBody.innerHTML += row;
		});
	} else {
		tableBody.innerHTML = `<tr><td colspan="6">No Messages Found</td></tr>`;
	}
});
sendOrderConfirmation('${childSnapshot.key}', '${email}')

let orderButton = orderDetails !== "N/A" 
    ? `<button onclick="sendOrderConfirmation('${data.name}', '${email}')">Confirm Order</button>` 
    : "N/A";

function sendOrderConfirmation(name, email) {
    const templateParams = {
        to_name: name,
        to_email: email,
        message: "Thank you for your order! Your order has been successfully confirmed. We appreciate your business."
    };

    emailjs.send('service_5splxw5', 'template_3qa76dt', templateParams)
    .then(() => {
        alert("✅ Email sent to " + email);
    }, (error) => {
        console.error("❌ EmailJS Error:", error);
        alert("❌ Failed to send email.");
    });
}
