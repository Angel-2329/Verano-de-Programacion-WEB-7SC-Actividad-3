# Instituto Tecnológico de Oaxaca
**Materia:** Verano de Programación Web  
**Docente:** Martinez Nieto Adelina  
**Alumno:** Mendez Garcia Angel de Jesus  

---

## Librería de Componentes Visuales Interactivos

### ¿Qué problema resuelve?

Esta componente ofrece una solución elegante y amigable para validar datos en tiempo real. Cuenta con tooltips inteligentes que guían al usuario exactamente donde está el error, y una barra dinámica que mide la fuerza de la contraseña mientras se escribe. 

---

## Instalación

Para incluir estos componentes en tu proyecto HTML, solo necesitas enlazar los archivos CSS y JS. Al estar construidos con Módulos de JavaScript, recuerda usar un servidor local (como XAMPP o Live Server) para que funcionen correctamente.

1. **Incluir el CSS:** Agrega el archivo de estilos en la cabecera de tu documento o impórtalo en tu CSS principal.
```html
<head>
    <link rel="stylesheet" href="css/componente.css">
</head>
```

2. **Incluir el JavaScript:** Enlaza tu archivo principal al final del cuerpo del documento, asegurándote de indicarle al navegador que es un módulo.
```html
<body>
    <script type="module" src="js/index.js"></script>
</body>
```

---

## El Código de los Componentes

El componente se divide en dos grandes herramientas que viven juntas dentro del archivo principal llamado `componente.js`. 

Para mantenerlo simple, a continuación te muestro la parte más importante de cada herramienta: el **constructor**. Esta es la sección donde tú (o cualquier persona que instale la librería) tienes el control total para modificar los colores, las distancias y las reglas sin necesidad de tocar las matemáticas internas del código.

### 1. El Validador de Errores (Tooltip)

Esta primera parte funciona como un asistente silencioso. Su trabajo es vigilar lo que escribes y, si detecta que falta algo o el formato no es el adecuado, hace aparecer un pequeño globo de color flotando justo a un lado para decirte cómo corregirlo. 

Al usar este componente, lo único que necesitas modificar son sus **opciones** de configuración para que se adapte perfectamente al estilo visual de tu proyecto:

```javascript
export class componente_tipError
{
    // El constructor es la puerta de entrada: aquí defines cómo se comportará el globo.
    constructor(id_input, opciones = {})
    {
        this.input = document.querySelector(id_input);

        // ¡Aquí es donde ocurre la magia de la personalización!
        // Si no mandas una opción, el componente usará estos valores por defecto.
        this.opciones =
        {
            mensaje: opciones.mensaje || 'Este campo es obligatorio', // El texto de ayuda que leerá el usuario.
            posicion: opciones.posicion || 'bottom',                  // ¿Dónde quieres que aparezca? (top, bottom, left, right).
            regla: opciones.regla || null,                            // Fórmulas personalizadas (ej. para validar correos o solo letras).
            minimo: opciones.minimo || null,                          // Límite de letras mínimo.
            maximo: opciones.maximo || null,                          // Límite de letras máximo.
            distancia: opciones.distancia || 5,                       // Qué tan despegado se ve del cuadro de texto.
            tema: opciones.tema || 'tema-degradado-azul',             // El estilo visual y color del globo.
            alMostrar: opciones.alMostrar || (() => {}),              // ¿Quieres ejecutar algún código extra cuando aparezca?
            alOcultar: opciones.alOcultar || (() => {})               // ¿O cuando desaparezca?
        };

    // ... 
    // (El resto del archivo contiene los métodos internos que calculan la posición en pantalla, 
    // validan el texto y animan el componente de forma 100% automática).
    // ...
}
```

---

## Capturas de Pantalla

Formulario limpio sin errores al empezar la interacción:

<img src="img/index-sinerrores.png" alt="Formulario inicial" width="60%">

Validación de campos funcionando en tiempo real de manera simultánea en diferentes posiciones (izquierda, derecha y abajo):

<img src="img/index-errores.png" alt="Validación de errores" width="60%">

Medidor de fuerza analizando una contraseña básica (Regular):

<img src="img/index-contraseñamala.png" alt="Contraseña Regular" width="60%">

Medidor de fuerza detectando una contraseña compleja, mostrando además la función de hacer visible el texto:

<img src="img/index-contraseñasegura.png" alt="Contraseña Segura" width="60%">

---

## Video Promocional y Demo

A continuación se presenta un demo narrado mostrando la problemática de los formularios tradicionales y cómo nuestra librería lo soluciona, garantizando una excelente experiencia de usuario.

[![Demo de los Componentes Visuales](https://img.youtube.com/vi/WnbolW5VE74/0.jpg)](https://youtu.be/WnbolW5VE74)

---

## Uso y Ejemplos

### 1. Estructura HTML básica
El componente requiere que los inputs tengan un atributo id único para poder conectarse a ellos. Para la función de mostrar contraseña, se requiere una estructura con un checkbox, tal como se muestra en este ejemplo de registro.

```html
<div class="grupo-input">
    <label for="nombre">Nombre Completo</label>
    <input type="text" id="nombre" placeholder="Tu nombre">
</div>

<div class="grupo-input">
    <label for="correo">Correo Electrónico</label>
    <input type="text" id="correo" placeholder="ejemplo@correo.com">
</div>

<div class="grupo-input">
    <label for="contraseña">Crear Contraseña</label>
    <input type="password" id="contraseña" placeholder="Mínimo 8 caracteres">
    
    <div class="mostrar-contraseña-contenedor">
        <input type="checkbox" id="mostrar-contraseña">
        <label for="mostrar-contraseña" class="label-checkbox">Mostrar contraseña</label>
    </div>
</div>
```

### 2. Inicialización en JavaScript
En tu archivo `index.js`, importa las clases desde tu archivo de componentes e instáncialas pasando el selector del input y un objeto con tus opciones de configuración.

```javascript
import { componente_tipError, componente_Contraseña } from './componente.js';

// Validar Nombre (Acepta solo letras y espacios, aparece a la izquierda)
const errorNombre = new componente_tipError('#nombre', {
    mensaje: 'El nombre solo debe contener letras',
    posicion: 'left',
    tema: 'tema-degradado-rojo',
    distancia: 12,
    regla: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/
});

// Validar Correo Electrónico (Aparece a la derecha)
const errorCorreo = new componente_tipError('#correo', {
    mensaje: 'Formato de correo no válido',
    posicion: 'right',                     
    tema: 'tema-degradado-azul',           
    distancia: 12,
    regla: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
});

// Validar Contraseña (Tooltip de longitud mínima, aparece abajo)
const errorPassword = new componente_tipError('#contraseña', {
    mensaje: 'Debe tener al menos 8 caracteres',
    posicion: 'bottom',                    
    tema: 'tema-degradado-morado',         
    distancia: 30,
    minimo: 8
});

// Activar Barra de Fuerza de Contraseña
const nivel_Password = new componente_Contraseña('#contraseña', {
    minimo: 8,
    mostrarTexto: true
});

// Lógica para Mostrar/Ocultar contraseña mediante el checkbox
const checkboxMostrar = document.querySelector('#mostrar-contraseña');
const inputPassword = document.querySelector('#contraseña');

checkboxMostrar.addEventListener('change', () => {
    if (checkboxMostrar.checked) {
        inputPassword.type = 'text'; 
    } else {
        inputPassword.type = 'password'; 
    }
});
```
