const searchInput = document.getElementById('search');
const tableBody = document.querySelector('table tbody');


// Función para añadir una fila a la tabla
const addRowToTable = (index, user) => {
    const row = document.createElement('tr');

    row.innerHTML = `
            <td>${index}</td>
            <td><img src="${user.imagen}" alt="User Picture" style="width:50px;height:50px;object-fit:cover;"></td>
            <td>${user.nombre}</td>
            <td>${user.edad}</td>
            <td>${user.ciudad}</td>
            <td>${user.email}</td>
            <td>${user.telefono}</td>
            <td>${user.documento}</td>
            <td>${user.fecha}</td>
            <td>
                <button class='view-info' onclick="viewUser('${user.documento}')" title="View">
                    <i class="fa-regular fa-eye" style="color: #1567f4;"></i>
                </button>
            </td>
        `;

    tableBody.appendChild(row);
};

// Función para filtrar y mostrar únicamente el registro buscado
const filterUsers = (query) => {
    const keys = Object.keys(localStorage).filter((key) => key !== 'user');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de filtrar

    let found = false; // Para verificar si se encuentra algún resultado

    keys.forEach((key, index) => {
        const user = JSON.parse(localStorage.getItem(key));
        if (
            user.nombre.toLowerCase().includes(query.toLowerCase()) || // Filtrar por nombre
            user.ciudad.toLowerCase().includes(query.toLowerCase()) || // Filtrar por ciudad
            (index + 1).toString().includes(query) || // Filtrar por número de índice
            user.edad.toString().includes(query) // Filtrar por edad
        ) {
            addRowToTable(index + 1, user); // Mostrar solo los que coinciden
            found = true;
        }
    });

    if (!found) {
        // Si no se encuentran resultados, mostrar mensaje en la tabla
        const row = document.createElement('tr');
        row.innerHTML = `
                <td colspan="10" style="text-align: center;">No se encontraron resultados</td>
            `;
        tableBody.appendChild(row);
    }
};

// Listener para el campo de búsqueda
searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query === '') {
        tableBody.innerHTML = ''; // Limpiar tabla si el campo está vacío
    } else {
        filterUsers(query); // Filtrar y mostrar resultados
    }
});

// Función para ver los detalles de un usuario
const viewUser = (documento) => {
    const user = JSON.parse(localStorage.getItem(documento));
    if (user) {
        swal.fire({
            title: 'User Info',
            text: `Nombre: ${user.nombre}
                Edad: ${user.edad}
                Ciudad: ${user.ciudad}
                Email: ${user.email}
                Teléfono: ${user.telefono}
                Documento: ${user.documento}
                Fecha de Inicio: ${user.fecha}`,
        });

        
    } else {
        alert('Usuario no encontrado.');
    }
};
