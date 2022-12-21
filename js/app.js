
const btnEncriptar = document.querySelector(".btnEncriptar");
const btnDesencriptar = document.querySelector(".btnDesencriptar");
const btnCopiar = document.querySelector(".btnCopiar");
const txtArea = document.querySelector("#mensaje");
txtArea.onkeypress = soloLetras;
txtArea.onkeyup = btnActive;

//txtArea.onpaste = noPaste;

let mensaje;
let encriptado;

btnEncriptar.onclick = encriptar;
btnDesencriptar.onclick = desencriptar;
btnCopiar.onclick = copiar;

ocultarDiv();
btnActive();

function ocultarDiv() {
    let mnjEncript;

    if (encriptado === undefined || mensaje === undefined || mensaje === "" || encriptado === "") {
        document.querySelector(".encryp").style.display = "none";
        document.querySelector(".copy").style.display = "none";
        document.querySelector(".componentes").style.display = "block";
    }

    if (encriptado !== undefined && mensaje !== undefined && encriptado !== "" && mensaje !== "") {
        document.querySelector(".encryp").style.display = "block";
        document.querySelector(".componentes").style.display = "none";
        document.querySelector(".copy").style.display = "grid";

        mnjEncript = document.querySelector(".msjEncriptado");
        mnjEncript.value = encriptado;

    }
}



function noPaste(e) {
    e.preventDefault();


    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Accion no permitida',
        showConfirmButton: false,
        timer: 1000
    })

}

function soloLetras(e) {

    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "abcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 13, 32];

    especial = false;

    for (let i in especiales) {
        if (key == especiales[i]) {
            especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !especial) {
        alert("Solo puedes ingresar letras, que sean minusculas y sin acentos");
        return false;
    }

}

function btnActive() {
    mensaje = document.querySelector(".mensaje").value.trim();

    if (mensaje === "") {
        btnDesencriptar.disabled = true;
        encriptado = "";
    }

    if (mensaje !== "") {
        btnDesencriptar.disabled = false;
    }

    ocultarDiv();

}

function encriptar() {

    // Las "llaves" de encriptación que utilizaremos son las siguientes:

    // La letra "e" es convertida para "enter"
    // La letra "i" es convertida para "imes"
    // La letra "a" es convertida para "ai"
    // La letra "o" es convertida para "ober"
    // La letra "u" es convertida para "ufat"

    mensaje = document.querySelector(".mensaje").value.trim();

    if (mensaje !== "") {
        mensaje = mensaje.toLocaleLowerCase();

        encriptado = mensaje.replace(/e/gi, "enter");
        encriptado = encriptado.replace(/i/gi, "imes");
        encriptado = encriptado.replace(/a/gi, "ai");
        encriptado = encriptado.replace(/o/gi, "ober");
        encriptado = encriptado.replace(/u/gi, "ufat");

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Texto encriptado',
            showConfirmButton: false,
            timer: 1000
        });
    }

    if (mensaje === "") {
        Swal.fire({
            icon: 'error',
            title: 'Ingresa un texto',
            text: 'El mensaje no puede ir vacio',
        })
    }

    ocultarDiv();
}

function desencriptar() {
    mensaje = document.querySelector(".mensaje").value.trim();

    if (mensaje !== "") {
        mensaje = mensaje.toLocaleLowerCase();


        encriptado = mensaje.replace(/enter/gi, "e");
        encriptado = encriptado.replace(/imes/gi, "i");
        encriptado = encriptado.replace(/ai/gi, "a");
        encriptado = encriptado.replace(/ober/gi, "o");
        encriptado = encriptado.replace(/ufat/gi, "u");

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Texto desencriptado',
            showConfirmButton: false,
            timer: 1000
        });
    }

    if (mensaje === "") {
        Swal.fire({
            icon: 'error',
            title: 'Ingresa un texto',
            text: 'El mensaje no puede ir vacio',
        });
    }

    ocultarDiv();

}

async function copiar() {

    let copiado = document.querySelector(".msjEncriptado").value;

    exito = await navigator.clipboard.writeText(copiado);

    if (copiado !== "") {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Texto copiado',
            showConfirmButton: false,
            timer: 1000
        });
    }
}

