/*
    Función del archivo: Lógica frontend del inicio de sesión
    Nombre del archivo: script-client-login.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 3/7/2024
*/

// Obtiene acceso a los elementos que corresponden alos formularios
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

// Valida que sea una contraseña válida
function isValidPassword(password)
{
    // Se vuelve invisible el contenedor que muestra los criterios de la seguridad de la contraseña
    document.getElementById('seguridad-contrasena').style.display = 'none';

    // Se definen las expresiones regulares
    const numberRegex = /\d+/;
    const specialCharacterRegex = /[!#$%&@*+.,\-]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const lengthRegex = /^.{8,}$/;
    let strenghtCounter = 0;

    // Se verifica que coincida con la expresiones regulares, si no coincide, se imprime un mensaje que diga que no coincide
    if (!lengthRegex.test(password))
    {
        document.querySelector('.li:nth-child(1)').textContent = "Contiene al menos 8 caracteres";
        strenghtCounter -= 1;
    }
    else
    {
        document.querySelector('.li:nth-child(1)').textContent = '';
        strenghtCounter += 1;
    }

    if (!upperCaseRegex.test(password))
    {
        document.querySelector('.li:nth-child(2)').textContent = "Contiene al menos una letra mayúscula";
        strenghtCounter -= 1;
    }
    else
    {
        document.querySelector('.li:nth-child(2)').textContent = '';
        strenghtCounter += 1;
    }

    if (!lowerCaseRegex.test(password))
    {
        document.querySelector('.li:nth-child(3)').textContent = "Contiene al menos una letra minúscula";
        strenghtCounter -= 1;
    }
    else
    {
        document.querySelector('.li:nth-child(3)').textContent = '';
        strenghtCounter += 1;
    }

    if (!numberRegex.test(password))
    {
        document.querySelector('.li:nth-child(4)').textContent = "Contiene al menos un número";
        strenghtCounter -= 1;
    }
    else
    {
        document.querySelector('.li:nth-child(4)').textContent = '';
        strenghtCounter += 1;
    }

    if (!specialCharacterRegex.test(password))
    {
        document.querySelector('.li:nth-child(5)').textContent = "Contiene al menos un carácter especial";
        strenghtCounter -= 1;
    }
    else
    {
        document.querySelector('.li:nth-child(5)').textContent = '';
        strenghtCounter += 1;
    }

    // Controla la aparición del contenedor basado en un sistema de puntaje
    if (strenghtCounter === 5) {
        document.getElementById('seguridad-contrasena').style.display = 'none';
    }
    else {
        document.getElementById('seguridad-contrasena').style.display = 'flex';
    }
}

// Se vuelve invisible el contenedor que muestra los criterios de la seguridad de la contraseña
document.getElementById('seguridad-contrasena').style.display = 'none';

// Lanza una alerta al usuario cuando su contraseña no sea segura
passwordInput_1.addEventListener('input', function() {
    // Almacena el valor del campo de texto en una variable
    let passwordInputValue = this.value;

    // Verifica que el número de cáracteres de la contraseña sea menor a 8
    if (passwordInputValue.length < 8) {
        // Se envía un mensaje de validación señalando que la contraseña debe de tener al menos 8 carácteres
        this.setCustomValidity('La contraseña debe tener al menos 8 caracteres');
    }
    else {
        // En caso de que la contraseña sea mayor a 8, se elimina el mensaje de validación
        this.setCustomValidity('');
    }

    isValidPassword(passwordInputValue);
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