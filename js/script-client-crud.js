/*
    Función del archivo: Archivo que recive los datos de la base de datos desde el servidor y crea las filas y columnas en el cliente
    Nombre del archivo: script-client-crud.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 26/7/2024
*/

function loadRecords()
{
    fetch('/crud')
        .then(response => response.json())
        .then(data => {
            const tbody = getElementById('tabla-registros-cuentas').getElementByTagName('tbody')[0];
            tbody.innerHTML = '';
            data.forEach(registro => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="td">${registro.id}</td>
                    <td class="td">${registro.username}</td>
                    <td class="td">${registro.email}</td>
                    <td class="td">${registro.password}</td>
                    <td class="td">${registro.addedAt}</td>
                    <td class="td">
                        <button class="btn-accion" onclick="updateRecord(${registro.id}, 'sign up')">Editar</button>
                        <button class="btn-accion" onclick="deleteRecord(${registro.id}, 'sign up')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error:", error));
}

function updateRecord(id, formType)
{
    if (formType === 'sign up')
    {
        do
        {
            let invalido = false;
            let newUsername = prompt("Ingrese el nuevo nombre de usuario.");
            if (newUsername === null || newUsername === "")
            {
                alert("No puede dejar el campo vacío.");
                invalido = true;
            }
            else if (newUsername.length < 5 || newUsername.length >= 50)
            {
                alert("El nombre de usuario debe tener entre 3 y 50 caracteres.");
                invalido = true;
            }
        }
        while (invalido === true);
    }

    do
    {
        let invalido = false;
        let newEmail = prompt("Ingrese el nuevo correo electrónico.");
        if (newEmail === null || newEmail === "")
        {
            alert("No puede dejar el campo vacío.");
            invalido = true;
        }
        else if ((/^[A-Za-z0-9]{1, 50}@[A-Za-z]{3, 10}\.[a-z]{3, 6}$/).test(newEmail))
        {
            alert("Formato de correo electrónico inválido. Formato sugerido: myEmail123@email.com");
            invalido = true;
        }
    }
    while (invalido === true);

    do
    {
        let invalido = false;
        let newPassword = prompt("Ingrese la nueva contraseña.");
        if (newPassword === null || newPassword === "")
        {
            alert("No puede dejar el campo vacío.");
            invalido = true;
        }
        else if (newUsername.length < 1 || newUsername.length > 20)
        {
            alert("El nombre de usuario debe tener entre 3 y 50 caracteres.");
            invalido = true;
        }
    }
    while (invalido === true);
}