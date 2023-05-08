const formulario = document.querySelector('form');
formulario.addEventListener('submit',(evento)=>{
    evento.preventDefault();

    const email = document.querySelector("#email").value;
    const contraseña = document.querySelector("#contraseña").value;
    const usuario ={
       email,// email:email
       contraseña//contraseña: contraseña
    };
    fetch('https://boiling-purring-finch.glitch.me/registro-usuario',{
        method:'POST',
        body:JSON.stringify(usuario),
        headers:{
            'content-type':'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>console.dir(data))
    .catch(error=>console.error(error))
});


