document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    })

    // estos son los listeners "escuchan las peticiones/funciones"

    emailInput.addEventListener('blur', function () {
        validateEmail()
    })

    emailInput.addEventListener('change', function () {
        clearError(emailError)
    })

    passwordInput.addEventListener('change', function () {
        clearError(passwordError)
    })

    confirmPasswordInput.addEventListener('change', function () {
        clearError(confirmPasswordError)
    })

    showHideButton.addEventListener('click', function () {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })


    function validateForm() {

        const isValidEmail = validateEmail()
        const isValidPassword = validatePassword()
        const passwordMatch = validatePasswordMatch()

        if (isValidEmail && isValidPassword && passwordMatch) {
            // guardar email en el localStorage y generar un JSON en consola
            saveToLocalStorage();
            alert('login exitoso');
        }

    }


    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim() // el trim lo que hace es eliminar los espacios vacios al comienzo y final del input


        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingrese un email Valido')
            return false;
        }

        return true;
    }


    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            showError(passwordError, 'ingresa una password de al menos 6 caracteres')
            return false;
        }

        return true;

    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) { // si password value es distinto a confirmpasswordvalue retornamos el showerror
            showError(confirmPasswordError, 'la password no coincide')
            return false;
        }

        return true;
    }



    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block'; // le cambiamos el valor para que lo muestre, en el css estaba definido en 'none'
    }
    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }


    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue)
        const body = bodyBuilderJSON()
        console.log(body)

    }


    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }      
});