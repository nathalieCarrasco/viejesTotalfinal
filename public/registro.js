const formulario = document.querySelector("form");
formulario.addEventListener ("submit",async (submitEvent)=>{

    submitEvent.preventDefault();
   /*  const formElement=SubmitEvent.currentTarget; es lo mismo que la constante form que esta arriba 
   representa el elemento HTML que dispara el evento
   */

   const formElement= submitEvent.currentTarget;
   const formData = new FormData(formElement);

   //Const form data GET
    const email=formData.get("email");
    const contrasena=formData.get("contrasena")
    const nuevoUsuario={
        email,
        contrasena
    };

    //console.dir({email,contrasena});

    const baseUrl="https://boiling-purring-finch.glitch.me/";
    const url = baseUrl+ "/registro"

    const fetchConfing = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
    },
    body:JSON.stringify(nuevoUsuario)
};

try{
const respuesta = await fetch(url,fetchConfing);
//si la respuesta esta correcta
if(!respuesta.ok){
// gestionar algun error 
console.error("la respuesta no esta correcta")
return;
}
// en caso de exito
const objetoJson = await respuesta.json();

console.dir(objetoJson);
}catch(error){
    console.error(error.code);
    console.error(error.message);
}



});