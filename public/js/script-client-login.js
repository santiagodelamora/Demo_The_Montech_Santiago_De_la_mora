/*
    Función del archivo: Lógica frontend del inicio de sesión
    Nombre del archivo: script-client-login.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 3/7/2024
*/

// Obtiene una referencia a los elementos que corresponden alos formularios
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');
var usernameInput_1 = document.getElementById('username-input-1');
var emailInput_1 = document.getElementById('email-input-1');
var passwordInput_1 = document.getElementById('password-input-1');

// Envía los datos del formulario de registro de cuentas del cliente al servidor (archivo Node.js)
signUpForm.addEventListener('submit', (e) => {
    // Evita que se envíe el formulario de forma normal
    e.preventDefault();    

    // Almacena los valores en un objeto de JavaScript y extrae los valores de los campos de entrada
    const data = {
        username: usernameInput_1.value,
        email: emailInput_1.value,
        password: passwordInput_1.value,
        formType: 'sign up form'
    };

    // Hace uso de "fetch" para enviar los datos
    // A fetch se le pasan dos parámetros, la ruta del archivo al que se enviarán los datos y un objeto JSON donde se envían los datos
    fetch('http://localhost:3000/login', {
        // Se especifica el método mediante el cuál se hace la solicitud
        method: 'POST',

        // Se especifican los encabezados de la solicitud
        headers: {'Content-Type': 'application/json'},

        // En "body" se envían los datos que se obtuvieron anteriormente y se convierten en una cadena JSON con el método stringify()
        body: JSON.stringify(data)
    })

    // Convierte la respuesta de la solicitud en datos utilizables para poder utilizarlos en el ".then" siguiente
    .then(response => response.json())

    // Se utilizan los datos enviados por servidor para realizar acciones
    .then(data => {
        // Depuración
        console.log(data);

        // Verifica que la respuesta sea correcta
        if (data.success)
        {
            alert(data.message);
            console.log("La operación ha sido realizada con éxito");
            usernameInput_1.value = '';
            emailInput_1.value = '';
            passwordInput_1.value = '';
        }
        else
        {
            alert(data.message);
            console.error("La operación ha fallado.", data.message);
        }
    })

    // Se muestra cualquier mensaje de error que haya ocurrido en la solicitud
    .catch(error => {
        console.error("Error al realizar la solicitud:", error);
    })
});

// Envía los datos del formulario de inicio de sesión del cliente al servidor (archivo Node.js)
signInForm.addEventListener('submit', (e) => {
    // Evita que se envíe el formulario de forma normal
    e.preventDefault();

    // Obtiene una referencia de los elementos HTLML de los campos de entrada
    const emailInput_2 = document.getElementById('email-input-2');
    const passwordInput_2 = document.getElementById('password-input-2');

    // Se almacenan los valores en un objeto de JavaScript y se extraen los valores de los campos de entrada
    const data = {
        email: emailInput_2.value,
        password: passwordInput_2.value,
        formType: 'sign in form'
    };

    // Hace uso de "fetch" para enviar los datos
    // A fetch se le pasan dos parámetros, la ruta del archivo al que se enviarán los datos y un objeto JSON donde se envían los datos
    fetch('http://localhost:3000/login', {
        // Se especifica el método mediante el cuál se hace la solicitud
        method: 'POST',

        // Se especifican los encabezados de la solicitud
        headers: {'Content-Type': 'application/json'},

        // En "body" se envían los datos que se obtuvieron anteriormente y se convierten en una cadena JSON con el método stringify()
        body: JSON.stringify(data)
    })

    // Convierte la respuesta de la solicitud en datos utilizables para poder utilizarlos en el ".then" siguiente
    .then(response => response.json())

    // Se trabaja con los datos convertidos a JSON en la promesa anterior
    .then(data => {
        // Depuración
        console.log(data);

        // Verifica que la respuesta sea correcta
        if (data.success === true)
        {
            alert(data.message);
            console.log("La operación ha sido realizada con éxito");
            emailInput_2.value = '';
            passwordInput_2.value = '';
        }
        else
        {
            alert(data.message);
            console.log("La operación ha fallado.", data.message);
        }
    })

    // Se muestra cualquier mensaje de error que haya ocurrido en la solicitud
    .catch(error => {
        console.error("Error al realizar la solicitud:", error);
    })
});

// Valida que el nombre de usuario tenga al menos 3 carácteres
document.getElementById('username-input-1').addEventListener('input', function() {
    let value = this.value;

    if (value.length < 3) {
        this.setCustomValidity("Debe ingresar al menos 3 letras.")
    }
    else {
        this.setCustomValidity('');
    }
});

// Valida que sea una contraseña válida
function isValidPassword(password)
{
    // Se obtiene una referencia al elemento padre de los elementos de la lista "ul"
    let strenghtCounter = 0;
    const ul = document.querySelector('.ul');
    ul.innerHTML = '';

    const criteria = [
        {regex: /\d+/, message: "Contiene al menos un número"},
        {regex: /[!#$%&@*+.,\-]/, message: "Contiene al menos un carácter especial"},
        {regex: /[A-Z]/, message: "Contiene al menos una letra mayúscula"},
        {regex: /[a-z]/, message: "Contiene al menos una letra minúscula"},
        {regex: /^.{8,}$/, message: "Contiene al menos 8 caracteres"}
    ];

    

    for (const criterion of criteria)
    {
        if (!criterion.regex.test(password))
        {
            const newListChild = document.createElement('li');
            newListChild.className = 'li';
            newListChild.textContent = criterion.message;
            ul.appendChild(newListChild);
        }
        else {
            strenghtCounter += 1;
        }
    }

    // Controla la aparición del contenedor basado en un sistema de puntaje
    if (strenghtCounter === 5 || document.getElementById('password-input-1').value.length === 0) {
        document.getElementById('password-security').style.display = 'none';
    }
    else {
        document.getElementById('password-security').style.display = 'flex';
    }
}

// Se vuelve invisible el contenedor que muestra los criterios de la seguridad de la contraseña
document.getElementById('password-security').style.display = 'none';

// Lanza una alerta al usuario cuando su contraseña no sea segura
passwordInput_1.addEventListener('input', function() {
    // Almacena el valor del campo de texto en una variable
    let passwordInputValue = this.value;

    // Verifica que el número de cáracteres de la contraseña sea menor a 8
    if (passwordInputValue.length < 8)
    {
        // Se envía un mensaje de validación señalando que la contraseña debe de tener al menos 8 carácteres
        this.setCustomValidity('La contraseña debe tener al menos 8 caracteres');
    }
    else
    {
        // En caso de que la contraseña sea mayor a 8, se elimina el mensaje de validación
        this.setCustomValidity('');
    }

    isValidPassword(passwordInputValue);
});

// Muestra la contraseña al hacer click en el botón
document.querySelectorAll('.btn-show-password').forEach(btnShowPassword => {
    btnShowPassword.addEventListener('click', (event) => {
        document.querySelectorAll('.password-input').forEach(passwordInput => {
            passwordInput.type = (passwordInput.type == 'password')? 'text' : 'password';
        });
        event.target.classList.toggle('fa-eye');
        event.target.classList.toggle('fa-eye-slash');  
    });
});

// Cambia de color el fondo de la etiqueta "label" dependiendo de si el valor ingresadoe en el campo es válido
const emailInputs = document.querySelectorAll('.email-input');
const passwordInputs = document.querySelectorAll('.password-input');

usernameInput_1.addEventListener('input', function() {
    const parent = this.parentElement;

    if (this.value.length === 0)
    {
        parent.classList.remove('label-valid');
        parent.classList.remove('label-invalid');
        return;
    }

    if (this.validity.valid)
    {
        parent.classList.add('label-valid');
        parent.classList.remove('label-invalid');
    }
    else
    {
        parent.classList.add('label-invalid');
        parent.classList.remove('label-valid');
    }
});

emailInputs.forEach(emailInput => {
    emailInput.addEventListener('input', function() {
        const parent = this.parentElement;

        if (this.value.length === 0)
        {
            parent.classList.remove('label-valid');
            parent.classList.remove('label-invalid');
            return;
        }

        if (this.validity.valid)
        {
            parent.classList.add('label-valid');
            parent.classList.remove('label-invalid');
        }
        else
        {
            parent.classList.remove('label-valid');
            parent.classList.add('label-invalid');
        }
    });
});

passwordInputs.forEach(passwordInput => {
    passwordInput.addEventListener('input', function() {
        const parent = this.parentElement;

        if (this.value.length === 0)
        {
            parent.classList.remove('label-valid');
            parent.classList.remove('label-invalid');
            return;
        }

        if (this.validity.valid)
        {
            parent.classList.add('label-valid');
            parent.classList.remove('label-invalid');
        }
        else
        {
            parent.classList.remove('label-valid');
            parent.classList.add('label-invalid');
        }
    });
});

// Hace que al presionar la combinación de teclas 'Ctrl + Shift + Alt + Ñ' se abra la página 'crud.html' que muestra una tabla con los registros de la base de datos y a la cuál se le pueden realizar acciones CRUD
let pressedKeys = {
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    enieKey: false,
};

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey)
    {
        pressedKeys.ctrlKey = true;
        console.log('Ctrl');
    }
    if (event.shiftKey)
    {
        pressedKeys.shiftKey = true;
        console.log('Shift');
    }
    if (event.altKey)
    {
        pressedKeys.altKey = true;
        console.log('Alt');
    }
    if (event.key.toUpperCase() == 'Ñ')
    {
        pressedKeys.enieKey = true;
        console.log('Ñ');
    }

    if (pressedKeys.ctrlKey && pressedKeys.shiftKey && pressedKeys.altKey && pressedKeys.enieKey)
    {
        alert("Redirigiendo a la página de acciones CRUD...");
        window.location.href = 'crud.html';
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Control' || event.key === 'ControlLeft' || event.key === 'ControlRight') {
        pressedKeys.ctrlKey = false;
    }
    if (event.key === 'Shift' || event.key === 'ShiftLeft' || event.key === 'ShiftRight') {
        pressedKeys.shiftKey = false;
    }
    if (event.key === 'Alt' || event.key === 'AltLeft' || event.key === 'AltRight') {
        pressedKeys.altKey = false;
    }
    if (event.key.toUpperCase() == 'Ñ') {
        pressedKeys.enieKey = false;
    }
});