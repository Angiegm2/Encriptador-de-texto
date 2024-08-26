
//Criterios importantes
let nivel="-";
let characterToReplace="";
let regexvalidation ="";
let advertencia="";
let regexRemplace=""; 
let elementosOriginal = [];

// buscar valor de variables fontsize en css
const getFontSize = () =>
  parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--font-size'))

const diccionarioEncriptador = {
    a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat'
};


//Asignar valores iniciales a variables globales
async function parameterinit(){

  nivel="nivel1";  
  caracteresaReemplazar =  "aeiou";
  regexRemplace = new RegExp(`[${caracteresaReemplazar}]`, 'gi');
  regexvalidation = new RegExp("^[a-z]+$");
  advertencia= "Solo letras minúsculas y sin acentos";
}

//Asignar valores a la funcion que permitirá encriptar o desencriptar
async function accionBoton(accion){
   
    //Asignamos variables para complementar
    let textoEncriptado ="";
    const cadena = encontrarValorElemento("mensaje");

    //Revisar si el mensaje digitado es valido para cada uno de los niveles siguientes    
    if(!regexvalidation.test(cadena)){ 
        document.getElementById("box__advertencia").style.color = "#ff0000";         
        asignarTextoElemento("advertencia");
        sinRespuesta();
        return false;

    } else {

        if(accion=='encriptar'){
          // Llamar a la funcion para encriptar el mensaje y acciones en botones encriptar y desencriptar
            textoEncriptado = encriptar(cadena);             
            if(document.getElementById('respuesta').innerHTML!=""){
              document.getElementById('desencriptar').removeAttribute('disabled');
            }else{
              document.getElementById('desencriptar').setAttribute('disabled','true');
            }
                      
        }else if(accion=='desencriptar'){
          // Llamar a lafuncion para desencriptar el mensaje y acciones en botones encriptar y desencriptar
            textoEncriptado = desencriptar(cadena);
            if(document.getElementById('respuesta').innerHTML!=""){
              document.getElementById('desencriptar').removeAttribute('disabled');
            }else{
              document.getElementById('desencriptar').setAttribute('disabled','true');
            }
                                             
        }
       
       siresponse();
           
       asignarTextoElemento("respuesta",textoEncriptado);
       document.getElementById("box__advertencia").style.color = "#228B22"
       asignarTextoElemento("advertencia"( `Mensaje  ${(accion === "encriptar") ? 'encriptado' : 'desencriptado'} exitosamente`, 'auto'));
    }
         
}

//Realizar acciones en etiquetas HTML cuando NO hay un mensaje encriptado o desencriptado
function sinRespuesta() {
  
  document.getElementById('boxSinRespuesta').removeAttribute('hidden');
  document.getElementById('boxRespuesta').setAttribute('hidden','true');
  document.getElementById('desencriptar').setAttribute('disabled','true');
  document.getElementById('encriptar').removeAttribute('disabled');

}

 //Realiza acciones en etiquetas HTML cuando hay un mensaje encriptado o desencriptado
function siresponse() {
 
  document.getElementById('mensaje').value = '';
  document.getElementById('boxRespuesta').removeAttribute('hidden');        
  document.getElementById('copiar').removeAttribute('hidden');
  document.getElementById('boxSinRespuesta').setAttribute('hidden','true'); 

}

function encriptar(cadena) {
  // Realizamos los reemplazos segun la expresion regular de cada nivel
  return cadena.replace(
    regexRemplace,
    (match) => diccionarioEncriptador[match]
  );
}

//funcion desencriptar 
function desencriptar(cadena) {
  // Creamos un nuevo objeto para almacenar los reemplazos inversos
  const reemplazosInversos = {};
  for (const vocal in diccionarioEncriptador) {
    reemplazosInversos[diccionarioEncriptador[vocal]] = vocal;
  }
  //console.log(reemplazosInversos);
  // Creamos una expresión regular para encontrar todos los reemplazos
  const regex = new RegExp(Object.keys(reemplazosInversos).join("|"), "gi");
  // Realizamos los reemplazos inversos
  return cadena.replace(regex, (match) => reemplazosInversos[match]);
}


//Funcion que asigna texto a una etiqueta html
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

//Funcion que encuentra el valor de un elemento formulario
function encontrarValorElemento(elemento) {
  return document.getElementById(elemento).value;    
}

// funcion que modificas las variables globales segun el nivel seleccionado
async function levelAccion() {
  if ( document.getElementById("nivel1").checked ) {

    parameterinit();   

  } else if ( document.getElementById("nivel2").checked ) {

    nivel = "nivel2";
    caracteresReemplazar = "aeioubcdfghjklmnopqrstuvwxyz";
    regexRemplace = new RegExp(`[${caracteresReemplazar}]`, "gi");
    regexvalidation = new RegExp("^[a-z0-9 ]+$");
    warning = "Solo letras en minusculas sin acentos y numeros";
    
  } else {
    nivel = "nivel3";
    regexvalidation = new RegExp("^[a-zA-Z0-9\u00C0-\u017F ]+$");
    regexRemplace = new RegExp(Object.keys(diccionarioEncriptador).join("|"),"gi");
    warning = "Solo letras en minusculas con acentos y numeros";   
  }
  document.getElementById("box__advertencia").style.color = "#495057";    
  asignarTextoElemento("advertencia", await traducirTexto( advertencia, 'auto', idiom)  );
}     


//Funcion para copiar al portapapeles valor de texto en etiquetas html
async function copiarBoton() {

  const elementoHTML = document.getElementById("respuesta");
  navigator.clipboard.writeText(elementoHTML.innerText);
  //Pegar texto copiado a campo input del mensaje
  try {
    const text = await navigator.clipboard.readText();
    console.log("Texto del portapapeles:", text);
    document.getElementById("mensaje").value = text;
  } catch (err) {
    console.error("Error al leer del portapapeles:", err);
  }

}

  
// funcion que permite incrementar valor de la fuente asignando variable --font-size  a 1.5 
function fontUp() {

  const checkbox = document.getElementById("textplus");

  if (checkbox.checked) {
    document.documentElement.style.setProperty("--font-size", 1.5);
  } else {
    document.documentElement.style.setProperty("--font-size", 1);
  }

}
parameterinit();