document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    let isValid = true;
    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const cardNumber = document.getElementById("cardNumber");
    const expiryDate = document.getElementById("expiryDate");
    const cvv = document.getElementById("cvv");

    if (!name.checkValidity()) {
        document.getElementById("nameError").innerText = "Only alphabets allowed";
        isValid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }
    if (!email.checkValidity()) {
        document.getElementById("emailError").innerText = "Invalid email format";
        isValid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }
    if (!phone.checkValidity()) {
        document.getElementById("phoneError").innerText = "Enter a valid phone number";
        isValid = false;
    } else {
        document.getElementById("phoneError").innerText = "";
    }
    if (!address.checkValidity()) {
        document.getElementById("addressError").innerText = "Address is required";
        isValid = false;
    } else {
        document.getElementById("addressError").innerText = "";
    }
    if (!cardNumber.checkValidity()) {
        document.getElementById("cardError").innerText = "Card must be 16 digits";
        isValid = false;
    } else {
        document.getElementById("cardError").innerText = "";
    }
    if (!expiryDate.checkValidity()) {
        document.getElementById("expiryError").innerText = "Invalid expiry date";
        isValid = false;
    } else {
        document.getElementById("expiryError").innerText = "";
    }
    if (!cvv.checkValidity()) {
        document.getElementById("cvvError").innerText = "CVV must be 3 digits";
        isValid = false;
    } else {
        document.getElementById("cvvError").innerText = "";
    }

    if (!isValid) {
        event.preventDefault();
    }
});

