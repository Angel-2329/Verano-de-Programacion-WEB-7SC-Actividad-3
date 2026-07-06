import { componente_tipError, componente_Contraseña} from './componente.js';

const errorCorreo = new componente_tipError('#correo', {
    mensaje: 'Formato de correo no válido',
    posicion: 'right',                     
    tema: 'tema-degradado-azul',           
    distancia: 4,
    regla: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
});

const errorPassword = new componente_tipError('#contraseña', {
    mensaje: 'Debe tener al menos 8 caracteres',
    posicion: 'bottom',                    
    tema: 'tema-degradado-morado',         
    distancia: 4,
    minimo: 8,                             
    alMostrar: () => {console.log('El usuario intentó una contraseña inválida');}
});

const errorNombre = new componente_tipError('#nombre', {
    mensaje: 'El nombre solo debe contener letras',
    posicion: 'left',
    tema: 'tema-degradado-rojo',
    distancia: 12,
    regla: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
});

const nivel_Password = new componente_Contraseña('#contraseña', {
    minimo: 8,
    mostrarTexto: true,
});

const checkboxMostrar = document.querySelector('#mostrar-contraseña');
const inputPassword = document.querySelector('#contraseña');

checkboxMostrar.addEventListener('change', () => {
    if (checkboxMostrar.checked) 
    {
        inputPassword.type = 'text'; 
    } 
    else 
    {
        inputPassword.type = 'password'; 
    }
});