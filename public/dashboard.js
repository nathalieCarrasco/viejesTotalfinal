const storageUsuario = localStorage.getItem("usuario"); // string 
        if( storageUsuario == null ) {
            // si no está autenticado 
            window.location = "login.html";
        }

        const objetoUsuario = JSON.parse(storageUsuario);
        const token         = objetoUsuario.user.stsTokenManager.accessToken;

        const baseUrl       = 'https://boiling-purring-finch.glitch.me/';
        const url           = baseUrl + '/usuario/checktoken';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            //body: '{}'
        }).then( respuesta => {
            if( !respuesta.ok ) {
                throw new Error("Token no válido");
            }
            respuesta.json();
        }).catch(error => {
            window.location = "login.html"; 
        });