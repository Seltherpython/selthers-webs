const maxUsers = 50;

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;

        if (signUp(username, password)) {
            setFormMessage(createAccountForm, "success", "Sign-up successful!");
        } else {
            setFormMessage(createAccountForm, "error", "Sign-up failed. Please try again.");
        }
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("Attempting to sign in with", username, password);

        if (signIn(username, password)) {
            console.log("Sign-in successful! Redirecting...");
            window.location.href = "anotherfile.html"; // Redirect to another file
        } else {
            console.log("Sign-in failed. Invalid username/password combination");
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

function signUp(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length >= maxUsers) {
        alert("Maximum number of users reached.");
        return false;
    }

    if (username === "" || password === "") {
        alert("Username and password cannot be empty.");
        return false;
    }

    for (let user of users) {
        if (user.username === username) {
            alert("Username already exists.");
            return false;
        }
    }

    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

function signIn(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    for (let user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }

    return false;
}
