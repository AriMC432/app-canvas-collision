/*const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";
class Circle {
constructor(x, y, radius, color, text, speed) {
this.posX = x;
this.posY = y;
this.radius = radius;
this.color = color;
this.text = text;
this.speed = speed;
this.dx = 1 * this.speed;
this.dy = 1 * this.speed;
}
draw(context) {
context.beginPath();
context.strokeStyle = this.color;
context.textAlign = "center";
context.textBaseline = "middle";
context.font = "20px Arial";
context.fillText(this.text, this.posX, this.posY);
context.lineWidth = 2;
context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
context.stroke();
context.closePath();
}
update(context) {
this.draw(context);
// Actualizar la posición X
this.posX += this.dx;
// Cambiar la dirección si el círculo llega al borde del canvas en X
if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
this.dx = -this.dx;
}
// Actualizar la posición Y
this.posY += this.dy;
// Cambiar la dirección si el círculo llega al borde del canvas en Y
if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
this.dy = -this.dy;
}
}
}
// Crear un array para almacenar N círculos
let circles = [];

// Función para generar círculos aleatorios
function generateCircles(n) {
for (let i = 0; i < n; i++) {
let radius = Math.random() * 30 + 20; // Radio entre 20 y 50
let x = Math.random() * (window_width - radius * 2) + radius;
let y = Math.random() * (window_height - radius * 2) + radius;
let color = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Color aleatorio
let speed = Math.random() * 2 + 1; // Velocidad entre 1 y 3
let text = `C${i + 1}`; // Etiqueta del círculo
circles.push(new Circle(x, y, radius, color, text, speed));
}
}
// Función para animar los círculos
function animate() {
ctx.clearRect(0, 0, window_width, window_height); // Limpiar el canvas
circles.forEach(circle => {
circle.update(ctx); // Actualizar cada círculo
});
requestAnimationFrame(animate); // Repetir la animación
}
// Generar N círculos y comenzar la animación
generateCircles(10); // Puedes cambiar el número de círculos aquí
animate();*/

/*const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color; // Guardar el color original
        this.text = text;
        this.speed = speed;
        this.dx = (Math.random() < 0.5 ? -1 : 1) * this.speed; // Dirección aleatoria
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
        this.isInCollision = false; // Estado de colisión
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        // Actualizar la posición X
        this.posX += this.dx;

        // Cambiar la dirección si el círculo llega al borde del canvas en X
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        // Actualizar la posición Y
        this.posY += this.dy;

        // Cambiar la dirección si el círculo llega al borde del canvas en Y
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
    }

    // Método para detectar colisiones con otro círculo
    isColliding(otherCircle) {
        const distX = this.posX - otherCircle.posX;
        const distY = this.posY - otherCircle.posY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Si la distancia entre los centros es menor que la suma de los radios, hay colisión
        return distance < this.radius + otherCircle.radius;
    }
}

// Crear un array para almacenar N círculos
let circles = [];

// Función para generar círculos aleatorios
function generateCircles(n) {
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 30 + 20; // Radio entre 20 y 50
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;
        let color = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Color aleatorio
        let speed = Math.random() * 2 + 1; // Velocidad entre 1 y 3
        let text = `C${i + 1}`; // Etiqueta del círculo
        circles.push(new Circle(x, y, radius, color, text, speed));
    }
}

// Función para detectar colisiones entre círculos
function detectCollisions() {
    circles.forEach(circle => {
        circle.isInCollision = false; // Reiniciar el estado de colisión al principio de cada cuadro
    });

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (circles[i].isColliding(circles[j])) {
                // Cambiar a color azul si hay colisión
                circles[i].color = "#0000FF";
                circles[j].color = "#0000FF";
                circles[i].isInCollision = true;
                circles[j].isInCollision = true;
            }
        }
    }

    // Restaurar el color original de los círculos que no están en colisión
    circles.forEach(circle => {
        if (!circle.isInCollision) {
            circle.color = circle.originalColor;
        }
    });
}

// Función para animar los círculos
function animate() {
    ctx.clearRect(0, 0, window_width, window_height); // Limpiar el canvas

    circles.forEach(circle => {
        circle.update(ctx); // Actualizar cada círculo
    });

    detectCollisions(); // Detectar colisiones
    requestAnimationFrame(animate); // Repetir la animación
}

// Generar N círculos y comenzar la animación
generateCircles(10); // Puedes cambiar el número de círculos aquí
animate();*/

/*const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color; // Guardar el color original
        this.text = text;
        this.speed = speed;
        this.dx = (Math.random() < 0.5 ? -1 : 1) * this.speed; // Dirección aleatoria
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
        this.isInCollision = false; // Estado de colisión
        this.flashFrames = 0; // Contador para el efecto de flash
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        // Actualizar la posición X
        this.posX += this.dx;

        // Cambiar la dirección si el círculo llega al borde del canvas en X
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        // Actualizar la posición Y
        this.posY += this.dy;

        // Cambiar la dirección si el círculo llega al borde del canvas en Y
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Si hay un efecto de flash activo, lo gestionamos
        if (this.flashFrames > 0) {
            this.flashFrames--;
            if (this.flashFrames === 0) {
                this.color = this.originalColor; // Restaurar el color original tras el flash
            }
        }
    }

    // Método para detectar colisiones con otro círculo
    isColliding(otherCircle) {
        const distX = this.posX - otherCircle.posX;
        const distY = this.posY - otherCircle.posY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Si la distancia entre los centros es menor que la suma de los radios, hay colisión
        return distance < this.radius + otherCircle.radius;
    }

    // Método para cambiar dirección tras colisión
    bounce() {
        this.dx = -this.dx;
        this.dy = -this.dy;
        this.color = "#0000FF"; // Cambiar a color azul durante la colisión
        this.flashFrames = 5; // Duración del flash en color azul (en cuadros)
    }
}

// Crear un array para almacenar N círculos
let circles = [];

// Función para generar círculos aleatorios
function generateCircles(n) {
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 30 + 20; // Radio entre 20 y 50
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;
        let color = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Color aleatorio
        let speed = Math.random() * 5 + 1; // Velocidad entre 1 y 3
        let text = `C${i + 1}`; // Etiqueta del círculo
        circles.push(new Circle(x, y, radius, color, text, speed));
    }
}

// Función para detectar colisiones entre círculos
function detectCollisions() {
    circles.forEach(circle => {
        circle.isInCollision = false; // Reiniciar el estado de colisión al principio de cada cuadro
    });

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (circles[i].isColliding(circles[j])) {
                // Hacer que los círculos reboten cambiando su dirección
                circles[i].bounce();
                circles[j].bounce();
                circles[i].isInCollision = true;
                circles[j].isInCollision = true;
            }
        }
    }
}

// Función para animar los círculos
function animate() {
    ctx.clearRect(0, 0, window_width, window_height); // Limpiar el canvas

    circles.forEach(circle => {
        circle.update(ctx); // Actualizar cada círculo
    });

    detectCollisions(); // Detectar colisiones
    requestAnimationFrame(animate); // Repetir la animación
}

// Generar N círculos y comenzar la animación
generateCircles(10); // Puedes cambiar el número de círculos aquí
animate();*/

/*const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color;
        this.text = text;
        this.speed = speed;
        this.dx = (Math.random() < 0.5 ? -1 : 1) * this.speed;
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
        this.isShrinking = false; // Nuevo: estado de reducción
        this.flashFrames = 0;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        if (this.isShrinking && this.radius > 0) {
            this.radius -= 2; // Reducir el radio rápidamente
        }
        if (this.radius <= 0) return; // No actualizar si el círculo ya no es visible

        this.draw(context);
        this.posX += this.dx;
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.posY += this.dy;
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        if (this.flashFrames > 0) {
            this.flashFrames--;
            if (this.flashFrames === 0) {
                this.color = this.originalColor;
            }
        }
    }

    isColliding(otherCircle) {
        const distX = this.posX - otherCircle.posX;
        const distY = this.posY - otherCircle.posY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance < this.radius + otherCircle.radius;
    }

    bounce() {
        this.dx = -this.dx;
        this.dy = -this.dy;
        this.color = "#0000FF";
        this.flashFrames = 5;
    }

    isClicked(mouseX, mouseY) {
        const distX = mouseX - this.posX;
        const distY = mouseY - this.posY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance <= this.radius;
    }
}

let circles = [];

function generateCircles(n) {
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 30 + 20;
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;
        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        let speed = Math.random() * 5 + 1;
        let text = `C${i + 1}`;
        circles.push(new Circle(x, y, radius, color, text, speed));
    }
}

function detectCollisions() {
    circles.forEach(circle => {
        circle.isInCollision = false;
    });

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (circles[i].isColliding(circles[j])) {
                circles[i].bounce();
                circles[j].bounce();
                circles[i].isInCollision = true;
                circles[j].isInCollision = true;
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach((circle, index) => {
        circle.update(ctx);
        if (circle.radius <= 0) {
            circles.splice(index, 1); // Eliminar círculo cuando desaparece completamente
        }
    });
    detectCollisions();
    requestAnimationFrame(animate);
}

// Evento de clic en el canvas para iniciar el efecto de reducción en el círculo
canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    circles.forEach(circle => {
        if (circle.isClicked(mouseX, mouseY)) {
            circle.isShrinking = true; // Activar la reducción del círculo
        }
    });
});

generateCircles(10);
animate();*/

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

const margin = 10; // Espacio pequeño para evitar que los círculos toquen los márgenes

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.originalColor = color;
        this.text = text;
        this.speed = speed;
        this.dx = 0; // Movimiento solo en Y, así que dx = 0
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed; // Dirección aleatoria hacia arriba o abajo
        this.isShrinking = false;
        this.flashFrames = 0;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        if (this.isShrinking && this.radius > 0) {
            this.radius -= 2;
        }
        if (this.radius <= 0) return;

        this.draw(context);
        this.posY += this.dy; // Movimiento solo en Y

        // Rebote en los bordes superior e inferior con margen
        if (this.posY + this.radius > window_height - margin || this.posY - this.radius < margin) {
            this.dy = -this.dy; // Invertir dirección al tocar el margen
        }
        
        if (this.flashFrames > 0) {
            this.flashFrames--;
            if (this.flashFrames === 0) {
                this.color = this.originalColor; // Restaurar color original tras el parpadeo
            }
        }
    }

    isColliding(otherCircle) {
        const distX = this.posX - otherCircle.posX;
        const distY = this.posY - otherCircle.posY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance < this.radius + otherCircle.radius;
    }

    startFlash() {
        this.color = "#0000FF"; // Cambiar color a azul oscuro
        this.flashFrames = 5; // Duración del parpadeo
    }

    reverseDirection() {
        this.dy = -this.dy; // Invertir la dirección en Y
    }

    isClicked(mouseX, mouseY) {
        const distX = mouseX - this.posX;
        const distY = mouseY - this.posY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance <= this.radius;
    }
}

let circles = [];

function generateCircles(n) {
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 30 + 20;
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;
        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        let speed = Math.random() * 2 + 1;
        let text = `C${i + 1}`;
        circles.push(new Circle(x, y, radius, color, text, speed));
    }
}

function detectCollisions() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (circles[i].isColliding(circles[j])) {
                // Iniciar el parpadeo en ambos círculos al colisionar
                circles[i].startFlash();
                circles[j].startFlash();
                
                // Invertir la dirección de ambos círculos en Y para simular rebote
                circles[i].reverseDirection();
                circles[j].reverseDirection();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach((circle, index) => {
        circle.update(ctx);
        if (circle.radius <= 0) {
            circles.splice(index, 1); // Eliminar círculo cuando desaparece completamente
        }
    });
    detectCollisions();
    requestAnimationFrame(animate);
}

// Evento de clic en el canvas para iniciar el efecto de reducción en el círculo
canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    circles.forEach(circle => {
        if (circle.isClicked(mouseX, mouseY)) {
            circle.isShrinking = true;
        }
    });
});

generateCircles(10);
animate();


