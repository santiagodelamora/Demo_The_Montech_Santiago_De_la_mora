/*
    Función del archivo: Archivo que recive los datos de la base de datos desde el servidor y crea las filas y columnas en el cliente
    Nombre del archivo: script-client-crud.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 26/7/2024
*/

/******* CREATE *******/
// Función que crea un nuevo registro en la base de datos
function addRecord(formType)
{
    let invalid = false;
    let email = '';
    let password = '';
    let username = '';

    if (formType === 'sign up')
    {
        do
        {
            username = prompt("Ingrese el nuevo nombre de usuario.");
            if (username === null || username === "")
            {
                alert("No puede dejar el campo vacío.");
                invalid = true;
            }
            else if (username.length < 3 || username.length >= 50)
            {
                alert("El nombre de usuario debe tener entre 3 y 50 caracteres.");
                invalid = true;
            }
            else {
                invalid = false;
            }
        }
        while (invalid === true);
    }

    do
    {
        email = prompt("Ingrese el nuevo correo electrónico.");
        if (email === null || email === "")
        {
            alert("No puede dejar el campo vacío.");
            invalid = true;
        }
        else if ((/^[A-Za-z0-9._%+-]{1, 50}@[A-Za-z.-]{3, 10}\.[A-Z|a-z]{2, 10}$/).test(email))
        {
            alert("Formato de correo electrónico inválido. Formato sugerido: myEmail123@email.com");
            invalid = true;
        }
        else {
            invalid = false;
        }
    }
    while (invalid === true);

    do
    {
        password = prompt("Ingrese la nueva contraseña.");
        if (password === null || password === "")
        {
            alert("No puede dejar el campo vacío.");
            invalid = true;
        }
        else if (password.length < 1 || password.length > 20)
        {
            alert("La contraseña debe de tener entre 1 y 20 carácteres.");
            invalid = true;
        }
        else {
            invalid = false;
        }
    }
    while (invalid === true);

    let data = {
        email: email,
        password: password,
        formType: formType
    };

    if (formType === 'sign up')
        data.username = username;

    fetch('http://localhost:3000/crud', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadRecords();
    })
    .catch(error => console.error("El error es:", error));
}

/******* READ *******/
// Función para mostrar los registros de la tabla de creación de cuentas
function loadRecords()
{
    fetch('http://localhost:3000/crud')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-registros-cuentas').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="td">${record.id}</td>
                    <td class="td">${record.username}</td>
                    <td class="td">${record.email}</td>
                    <td class="td">${record.password}</td>
                    <td class="td">${record.added_at}</td>
                    <td class="td">
                        <button class="btn-accion" onclick="updateRecords(${record.id}, 'sign up')">Editar</button>
                        <button class="btn-accion" onclick="deleteRecord(${record.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error:", error));

    fetch('http://localhost:3000/crud')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabla-registros-inises').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="td">${record.id}</td>
                    <td class="td">${record.email}</td>
                    <td class="td">${record.password}</td>
                    <td class="td">${record.added_at}</td>
                    <td class="td">
                        <button class="btn-accion" onclick="updateRecords(${record.id}, 'sign in')">Editar</button>
                        <button class="btn-accion" onclick="deleteRecord(${record.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error:", error));
}

/******* UPDATE *******/
// Función para acutualizar los registros de las dos tablas de la base de datos
function updateRecords(id, formType)
{
    let invalid = false;
    let newEmail = '';
    let newPassword = '';
    let newUsername = '';

    if (formType === 'sign up')
    {
        do
        {
            newUsername = prompt("Ingrese el nuevo nombre de usuario.");
            if (newUsername === null || newUsername === "")
            {
                alert("No puede dejar el campo vacío.");
                invalid = true;
            }
            else if (newUsername.length < 3 || newUsername.length >= 50)
            {
                alert("El nombre de usuario debe tener entre 3 y 50 caracteres.");
                invalid = true;
            }
            else {
                invalid = false;
            }
        }
        while (invalid === true);
    }

    do
    {
        newEmail = prompt("Ingrese el nuevo correo electrónico.");
        if (newEmail === null || newEmail === "")
        {
            alert("No puede dejar el campo vacío.");
            invalid = true;
        }
        else if ((/^[A-Za-z0-9._%+-]{1, 50}@[A-Za-z.-]{3, 10}\.[A-Z|a-z]{2, 10}$/).test(newEmail))
        {
            alert("Formato de correo electrónico inválido. Formato sugerido: myEmail123@email.com");
            invalid = true;
        }
        else {
            invalid = false;
        }
    }
    while (invalid === true);

    do
    {
        newPassword = prompt("Ingrese la nueva contraseña.");
        if (newPassword === null || newPassword === "")
        {
            alert("No puede dejar el campo vacío.");
            invalid = true;
        }
        else if (newPassword.length < 1 || newPassword.length > 20)
        {
            alert("La contraseña debe de tener entre 1 y 20 carácteres.");
            invalid = true;
        }
        else {
            invalid = false;
        }
    }
    while (invalid === true);

    let data = {
        id: id,
        newEmail: newEmail,
        newPassword: newPassword,
        formType: formType
    };

    if (formType === 'sign up')
        data.newUsername = newUsername;

    fetch('http://localhost:3000/crud', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadRecords();
    })
    .catch(error => console.error("El error es:", error));
}

/******* DELETE *******/
// Función para eliminar un registro en alguna de las dos tablas de la base de datos
function deleteRecord(id)
{
    let confirmElimination = confirm("¿Desea eliminar este record?");

    if (confirmElimination)   // Esto es igual a que "confirmElimination === true"
    {
        fetch('http://localhost:3000/crud', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadRecords();
        })
        .catch(error => console.error("El error es:", error));
    }
}

// Hace que el el contenido de la base de datos se muestre en la tabla CRUD cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadRecords);