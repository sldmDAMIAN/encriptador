
const btnEncriptar = document.querySelector(".btnEncriptar");
const btnDesencriptar = document.querySelector(".btnDesencriptar");
const btnCopiar = document.querySelector(".btnCopiar");
const txtArea = document.querySelector("#mensaje");
txtArea.onkeypress = soloLetras;

let mensaje = "";
let encriptado = "";

btnEncriptar.onclick = encriptar;
btnDesencriptar.onclick = desencriptar;
btnCopiar.onclick = copiar;

ocultarDiv();

function ocultarDiv() {
    if (encriptado === "") {
        document.querySelector(".encryp").style.display = "none";
        document.querySelector(".copy").style.display = "none";
        document.querySelector(".componentes").style.display = "block";

    }

    if (encriptado !== "") {
        document.querySelector(".encryp").style.display = "block";
        document.querySelector(".componentes").style.display = "none";
        document.querySelector(".copy").style.display = "grid";

        let mnjEncript = document.querySelector(".msjEncriptado");
        mnjEncript.value = encriptado;

    }
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

function encriptar() {

    // Las "llaves" de encriptación que utilizaremos son las siguientes:

    // La letra "e" es convertida para "enter"
    // La letra "i" es convertida para "imes"
    // La letra "a" es convertida para "ai"
    // La letra "o" es convertida para "ober"
    // La letra "u" es convertida para "ufat"

    mensaje = document.querySelector(".mensaje").value.trim();

    encriptado = mensaje.replace(/e/gi, "enter");
    encriptado = encriptado.replace(/i/gi, "imes");
    encriptado = encriptado.replace(/a/gi, "ai");
    encriptado = encriptado.replace(/o/gi, "ober");
    encriptado = encriptado.replace(/u/gi, "ufat");

    ocultarDiv();
}

function desencriptar(){
    mensaje = document.querySelector(".mensaje").value.trim();

    encriptado = mensaje.replace(/enter/gi, "e");
    encriptado = encriptado.replace(/imes/gi, "i");
    encriptado = encriptado.replace(/ai/gi, "a");
    encriptado = encriptado.replace(/ober/gi, "o");
    encriptado = encriptado.replace(/ufat/gi, "u");

    ocultarDiv();

}

async function copiar(){

    let copiado = document.querySelector(".msjEncriptado").value;

    exito = await navigator.clipboard.writeText(copiado);

    if(exito !== ""){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Texto copiado',
            showConfirmButton: false,
            timer: 1000
          });
    }
    }

    