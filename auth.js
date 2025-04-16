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

function adminLogin() {
	let email = document.getElementById("adminEmail").value;
	let password = document.getElementById("adminPassword").value;

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			localStorage.setItem("adminLoggedIn", "true");
			window.location.href = "admin.html";
		})
		.catch((error) => {
			document.getElementById("errorMessage").innerText = "Invalid credentials!";
		});
}

if (localStorage.getItem("adminLoggedIn") === "true") {
	window.location.href = "admin.html";
}
