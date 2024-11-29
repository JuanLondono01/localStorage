const modal = document.getElementById('modal');
const newUserButton = document.getElementById('newUserButton');
const closeModal = document.getElementById('closeModal');

document.getElementById('logoutButton').addEventListener('click', () => {
    swal.fire({
        title: `Hasta pronto`,
        timer: 700,
        showConfirmButton: false
    });
    setTimeout(() => {
        window.location.href = './index.html';
    }, 700);
});

// Abrir modal al hacer clic en el botón
newUserButton.addEventListener('click', function () {
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
});

// Cerrar modal al hacer clic en la 'X'
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

guardar.addEventListener('click', function () {
    modal.style.display = 'none';
});

const registromod = () => {
    const fileInput = document.getElementById('photoInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            guardarFormulario(e.target.result); // Usa la nueva imagen
        };
        reader.readAsDataURL(file); // Convierte el archivo a Base64
    } else {
        guardarFormulario(tempImageURL); // Usa la imagen existente si no hay nueva
    }
};

const guardarFormulario = (imageURL) => {
    const formu = {
        documento: document.getElementById('doc').value,
        nombre: document.getElementById('name').value,
        edad: document.getElementById('age').value,
        imagen: imageURL, // Imagen proporcionada
        ciudad: document.getElementById('city').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('phone').value,
        fecha: document.getElementById('startDate').value,
    };

    // Guardar el registro en localStorage
    localStorage.setItem(formu.documento, JSON.stringify(formu));
    loadTable(); // Recargar la tabla
    document.getElementById('modal').style.display = 'none'; // Cerrar el modal
};

newUserButton.addEventListener('click', function () {
    // Limpia los campos del formulario
    document.getElementById('doc').value = '';
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('photoInput').value = '';
    document.getElementById('city').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('startDate').value = '';

    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
});

const loadTable = () => {
    const table = document.getElementById('userTable');
    table.innerHTML = ''; // Limpiar la tabla antes de cargar los datos

    const keys = Object.keys(localStorage).filter((key) => key !== 'user');

    keys.forEach((key, index) => {
        const user = JSON.parse(localStorage.getItem(key));
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${
                user.imagen
            }" alt="User Picture" style="width:50px;height:50px;object-fit:cover;"></td>
            <td>${user.nombre}</td>
            <td>${user.edad}</td>
            <td>${user.ciudad}</td>
            <td>${user.email}</td>
            <td>${user.telefono}</td>
            <td>${user.documento}</td>
            <td>${user.fecha}</td>
            <td class="actions">
                <button onclick="deleteUser('${
                    user.documento
                }')" title="Delete" class="action-btn">
                    <i class="fa-solid fa-trash" style="color: red;"></i>
                </button>
                <button onclick="updateUser('${
                    user.documento
                }')" title="Update" class="action-btn">
                    <i class="fa-solid fa-pen-to-square" style="color: #74C0FC;"></i>
                </button>
            </td>
        `;
        table.appendChild(row);
    });
};

const deleteUser = (index) => {
    Swal.fire({
        title: 'Se eliminara este registro',
        text: 'No podras recuperarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#d3085d6',
        confirmButtonText: 'Eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Registro eliminado',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
            });
            localStorage.removeItem(index);
            loadTable();
        }
    });
};

// Función para abrir el modal con la información de un usuario existente y actualizae
let tempImageURL = ''; // Variable para guardar la URL temporal de la imagen

const updateUser = (documento) => {
    const user = JSON.parse(localStorage.getItem(documento));

    if (user) {
        // Cargar los datos del usuario en el formulario
        document.getElementById('doc').value = user.documento;
        document.getElementById('name').value = user.nombre;
        document.getElementById('age').value = user.edad;
        document.getElementById('photoInput').value = '';
        document.getElementById('city').value = user.ciudad;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.telefono;
        document.getElementById('startDate').value = user.fecha;

        // Guardar la URL de la imagen actual en la variable temporal
        tempImageURL = user.imagen;

        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';

        // Al guardar, actualizar el registro existente
        document.getElementById('guardar').onclick = function () {
            registromod();
        };
    } else {
        alert('Usuario no encontrado.');
    }
};

document.addEventListener('DOMContentLoaded', loadTable);
