const formulario = document.querySelector("form");
        formulario.addEventListener("submit", async (eventoSubmit) => { 
            eventoSubmit.preventDefault();            
            const formElement   = eventoSubmit.currentTarget; 
            const formData      = new FormData( formElement );            
            const email         = formData.get("email");
            const contrasena    = formData.get("contrasena");
            const nuevoUsuario = {
                email,
                contrasena
            };

            const baseUrl   = 'https://boiling-purring-finch.glitch.me/';
            const url       = baseUrl + "/login";
            const fetchConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( nuevoUsuario )
            };

            try {
                const respuesta     = await fetch(url, fetchConfig);
                // si la respuesta no es OK 
                if( !respuesta.ok ) {
                   // gestionar error o mensajes recibidos 
                   console.error("La respuesta no está OK");
                   return;
                } 

                // en caso de exito 
                const objetoJson    = await respuesta.json(); 
                console.dir( objetoJson);

                const usuario = objetoJson.usuario;
                // caso éxito 

                // guardo datos del usuario y TOKEN 
                localStorage.setItem('usuario', JSON.stringify(usuario));
                // redirijo a página protegida 
                window.location = 'dashboard.html';

            } catch (error) {
                // gestion errores 
                console.error( error.code );
                console.error( error.message );
            }
        });