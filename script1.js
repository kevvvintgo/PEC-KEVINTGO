let emocionActual = null;

const emociones = {
    felicity: {
        nombre: "Felicity",
        descripcion: "Represento la alegría. Aparezco cuando algo nos emociona, conseguimos algo que queríamos, pasamos tiempo con personas importantes para nosotros o simplemente tenemos un buen día."
    },
    tristesity: {
        nombre: "Tristesity",
        descripcion: "Represento la tristeza. Puedo aparecer cuando perdemos algo importante, nos decepcionamos, extrañamos a alguien o las cosas no salen como esperábamos. Sentirse triste es normal y expresar lo que sentimos puede ayudarnos."
    },
    enojity: {
        nombre: "Enojity",
        descripcion: "Represento el enojo. Aparezco cuando algo nos molesta, nos parece injusto, nos sentimos ignorados o una situación no sale como queríamos. El enojo es válido, pero podemos aprender a expresarlo sin lastimarnos ni lastimar a otras personas."
    },
    anxiety: {
        nombre: "Anxiety",
        descripcion: "Represento la ansiedad. Puedo aparecer cuando pensamos demasiado en lo que podría pasar, tenemos muchas cosas pendientes o enfrentamos una situación que nos preocupa, como un examen, una decisión o algo nuevo. Respirar, organizar lo que podemos controlar y hablar con alguien de confianza puede ayudar."
    },
    frustacity: {
        nombre: "Frustacity",
        descripcion: "Represento la frustración. Aparezco cuando nos esforzamos por conseguir algo y no obtenemos el resultado que esperábamos. A veces puede hacer que queramos rendirnos, pero hacer una pausa, cambiar de estrategia o pedir ayuda puede ayudarnos a continuar."
    },
    insegurity: {
        nombre: "Insegurity",
        descripcion: "Represento la inseguridad. Puedo aparecer cuando dudamos de nuestras capacidades, nos comparamos con otras personas o pensamos demasiado en lo que los demás pueden pensar de nosotros. No tener todo resuelto también es parte de crecer y aprender a confiar en nosotros mismos."
    },
    soledity: {
        nombre: "Soledity",
        descripcion: "Represento la soledad. Puedo aparecer cuando sentimos que nadie nos comprende o cuando nos sentimos alejados de los demás, incluso estando rodeados de personas. Hablar con alguien de confianza y buscar espacios donde podamos sentirnos escuchados puede hacer una diferencia."
    },
    calmity: {
        nombre: "Calmity",
        descripcion: "Represento la calma. Aparezco cuando logramos sentirnos tranquilos después de un momento difícil o cuando hacemos algo que nos ayuda a relajarnos. Respirar, descansar, escuchar música, caminar o simplemente darnos un momento para nosotros puede ayudarnos a recuperar el equilibrio."
    },
    verguenzity: {
        nombre: "Vergüenzity",
        descripcion: "Represento la vergüenza. Puedo aparecer cuando cometemos un error, sentimos que otras personas nos están observando o nos preocupa quedar mal frente a los demás. Aunque puede ser incómoda, equivocarnos o sentirnos inseguros algunas veces no define quiénes somos."
    },
    presionity: {
        nombre: "Presionity",
        descripcion: "Represento la presión. Aparezco cuando sentimos que debemos cumplir con demasiadas expectativas, ya sean de la escuela, nuestra familia, otras personas o nosotros mismos. No tenemos que hacerlo todo perfecto; reconocer nuestros límites también es importante."
    }
};

const colores = {
    felicity: "#FFD43B",
    tristesity: "#4A90E2",
    enojity: "#E74C3C",
    anxiety: "#8E6BBE",
    frustacity: "#FF8C42",
    insegurity: "#708090",
    soledity: "#607D8B",
    calmity: "#4CAF50",
    verguenzity: "#9B7EBD",
    presionity: "#C85A8E"
};

function mostrarEmocion(emocion) {
    const info = document.getElementById("info-emocion");
    const elemento = document.querySelector("." + emocion);

    if (emocionActual === emocion && info.style.display === "block") {
        info.style.display = "none";
        emocionActual = null;
        return;
    }

    emocionActual = emocion;
    const rect = elemento.getBoundingClientRect();
    const seccion = document.getElementById("Conoce").getBoundingClientRect();

    info.style.display = "block";
    info.style.top = (rect.top - seccion.top) + "px";

    if (emocion === "frustacity" || emocion === "presionity") {
        info.style.left = (rect.left - seccion.left - 320) + "px";
    } else {
        info.style.left = (rect.right - seccion.left + 20) + "px";
    }

    const nombre = document.getElementById("nombre-emocion");

    nombre.innerHTML = "¡Hola! Soy <span>" + emociones[emocion].nombre + "</span>";
    nombre.querySelector("span").style.color = colores[emocion];

    document.getElementById("descripcion-emocion").textContent = emociones[emocion].descripcion;
}

function seleccionarEstado(emocion) {
    const resultado = document.getElementById("estado-seleccionado");

    let historial = JSON.parse(localStorage.getItem("historialEmocional")) || [];

    historial.push({
        emocion: emocion,
        fecha: new Date().toLocaleDateString()
    });

    localStorage.setItem("historialEmocional", JSON.stringify(historial));

    resultado.style.display = "block";
    resultado.innerHTML = "<h3>Hoy te sientes <span>" + emociones[emocion].nombre + "</span></h3>" +
        "<p>" + emociones[emocion].descripcion + "</p>";

    resultado.querySelector("span").style.color = colores[emocion];

    mostrarHistorial();
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialEmocional")) || [];
    const lista = document.getElementById("lista-emociones");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    historial.slice().reverse().slice(0, 5).forEach(function(registro) {
        const emocion = document.createElement("p");

        emocion.textContent = registro.fecha + " — " + emociones[registro.emocion].nombre;
        emocion.style.color = colores[registro.emocion];

        lista.appendChild(emocion);
    });
}

window.addEventListener("load", function() {
    mostrarHistorial();
});

function guardarEntrada() {
    const texto = document.getElementById("entrada-diario").value.trim();

    if (texto === "") {
        alert("Escribe algo antes de guardar tu entrada.");
        return;
    }

    let entradas = JSON.parse(localStorage.getItem("entradasDiario")) || [];

    entradas.push({
        texto: texto,
        fecha: new Date().toLocaleDateString()
    });

    localStorage.setItem("entradasDiario", JSON.stringify(entradas));

    document.getElementById("entrada-diario").value = "";

    mostrarEntradas();
}

function mostrarEntradas() {
    const entradas = JSON.parse(localStorage.getItem("entradasDiario")) || [];
    const lista = document.getElementById("lista-entradas");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    entradas.slice().reverse().slice(0, 5).forEach(function(entrada) {
        const div = document.createElement("div");

        div.className = "entrada";
        div.innerHTML = "<div class='fecha'>" + entrada.fecha + "</div>" +
            "<p>" + entrada.texto + "</p>";

        lista.appendChild(div);
    });
}

window.addEventListener("load", function() {
    mostrarEntradas();
});

function ejercicioRespiracion() {
    const respiracion = document.getElementById("respiracion");

    respiracion.textContent = "Inhala lentamente... y después exhala.";
}

let tiempo = 60;
let intervalo;

function iniciarPausa() {
    clearInterval(intervalo);
    tiempo = 60;

    const temporizador = document.getElementById("temporizador");
    temporizador.textContent = tiempo;

    intervalo = setInterval(function() {
        tiempo--;
        temporizador.textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            temporizador.textContent = "¡Listo!";
        }
    }, 1000);
}

function nuevaReflexion() {
    const preguntas = [
        "¿Qué fue algo bueno que te pasó hoy?",
        "¿Qué emoción has sentido más durante el día?",
        "¿Qué necesitas en este momento?",
        "¿Hay algo que te gustaría cambiar de hoy?",
        "¿Qué cosa pequeña te hizo sentir bien?",
        "¿Qué puedes hacer hoy para darte un momento de calma?"
    ];

    const numero = Math.floor(Math.random() * preguntas.length);

    document.getElementById("frase-reflexion").textContent = preguntas[numero];
}

function guardarPerfil() {
    const nombre = document.getElementById("nombre-usuario").value.trim();

    if (nombre === "") {
        alert("Escribe tu nombre.");
        return;
    }

    localStorage.setItem("nombreUsuario", nombre);

    document.getElementById("saludo-perfil").textContent = "¡Hola, " + nombre + "! Bienvenido a Emotionality.";
}

window.addEventListener("load", function() {
    const nombre = localStorage.getItem("nombreUsuario");

    if (nombre) {
        document.getElementById("nombre-usuario").value = nombre;
        document.getElementById("saludo-perfil").textContent = "¡Hola, " + nombre + "! Bienvenido a Emotionality.";
    }
});
