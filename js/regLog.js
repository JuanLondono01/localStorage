
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginBtn.addEventListener('click', () => {
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerBtn.addEventListener('click', () => {
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });
});

const registrar = () => {
    const user = {
        Nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value,
    };
    // Guardar datos del usuario en localStorage con clave "user"
    localStorage.setItem('user', JSON.stringify(user));
};

const iniciarSesion = () => {
    const correo = document.getElementById('login-correo').value;
    const contrasena = document.getElementById('login-contrasena').value;

    // Recuperar datos del usuario almacenado
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Verificar si los datos coinciden
    if (storedUser && storedUser.correo === correo && storedUser.contrasena === contrasena) {
        alert(`Bienvenido, ${storedUser.Nombre}!`);
        // Redirigir a la página de registros
        window.location.href = 'registros.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
};
