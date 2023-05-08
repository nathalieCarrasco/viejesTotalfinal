var Rut = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		rutCompleto = rutCompleto.replaceAll(".","");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;        
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];                
		if ( digv == 'K' ) digv = 'k' ;
		
		return (Rut.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

/**
 * 
 * @param {*} valor 
 * @param {HTMLFormElement} elementoForm 
 * @param {HTMLElement} elementoMsje 
 * @param {Function} fnValidacion - función que retorna true si es válido y false en caso contrario 
 */
function valida(valor, elementoForm, elementoMsje, fnValidacion) {
    try {
        fnValidacion(valor);
        elementoForm.classList.remove("error");
        elementoMsje.classList.remove("error");
        elementoMsje.textContent = "";
        return false;
    } catch (error) {
        elementoForm.classList.add("error");
        elementoMsje.classList.add("error");
        elementoMsje.textContent = error.message;
    }
}

const nombreInputElement = document.querySelector("#nombre");
const nombreSpanElement  = document.querySelector("#nombre + span");
nombreInputElement.addEventListener('input', (evento) => {
    validaNombre();
});
const validaNombre = () => {    
    valida(nombreInputElement.value, nombreInputElement, nombreSpanElement, (valor) => {
        if(valor.length < 3) {
            throw new Error("Porfavor escribe tu nombre completo");
        }
        return true;
    });
}

/* --------------------------------- */
const rutInputElement = document.querySelector("#rut");
const rutSpanElement  = document.querySelector("#rut + span");
rutInputElement.addEventListener('input', (evento) => {
    validaRut();
});
const validaRut = () => {    
    valida(rutInputElement.value, rutInputElement, rutSpanElement, (valor) => {
        const rutLimpio = valor.replaceAll('.', '');

        if(rutLimpio.length < 8) {
            throw new Error("Ingresa un formato de rut");
        }

        if( !Rut.validaRut(rutLimpio) ) {
            throw new Error("RUT no válido!");
        }
        return true;
    });
}

/* --------------------------------- */
const telefonoInputElement = document.querySelector("#telefono");
const telefonoSpanElement  = document.querySelector("#telefono + span");
telefonoInputElement.addEventListener('input', (evento) => {
    validaTelefono();
});
const validaTelefono = () => {    
    valida(telefonoInputElement.value, telefonoInputElement, telefonoSpanElement, (valor) => {
        if(valor.length != 8) {
            throw new Error("El teléfono debe ser de 8 dígitos");
        }

        if( ! /^[0-9]+$/.test(valor) ) {
            throw new Error("Sólo debe contener números!");
        }
        return true;
    });
}
/* --------------------------------- */
const emailInputElement = document.querySelector("#email");
const emailSpanElement  = document.querySelector("#email + span");
emailInputElement.addEventListener('input', (evento) => {
    validaEmail();
});
const validaEmail = () => {
    valida(emailInputElement.value, emailInputElement, emailSpanElement, (valor) => {        
        const regex     = /\S+@\S+\.[a-zA-Z]{2,}$/i;
        const resultado = regex.test(valor);
        if( !resultado ) throw new Error("Email inválido");
        return true;
    });
}

/* --------------------------------- */
const vueloSelectElement = document.querySelector("#vuelo");
const vueloSpanElement  = document.querySelector("#vuelo + span");
vueloSelectElement.addEventListener('input', (evento) => {
    validaVuelo();
});
const validaVuelo = () => {    
    valida(vueloSelectElement.value, vueloSelectElement, vueloSpanElement, (valor) => {
        if(valor.length < 1) {
            throw new Error("Debes selecionar categoria de viaje");
        }
        return true;
    });
};

const mensajeTextareaElement    = document.querySelector("#mensaje");
const mensajeSpanElement        = document.querySelector("#mensaje + span");
mensajeTextareaElement.addEventListener('input', (evento) => {
    validaMensaje();
});
const validaMensaje = () => {    
    valida(mensajeTextareaElement.value, mensajeTextareaElement, mensajeSpanElement, (valor) => {
        if(valor.length < 10) {
            throw new Error("Mensaje demasiado corto! , debes ingresar mas de 10 caracteres");
        }
        return true;
    });
};


/* --------------------------------- */
document.querySelector('form').addEventListener('submit', async (submitEvent) => {
    submitEvent.preventDefault();

    const botonSubmit = document.querySelector('button[type="submit"');
    botonSubmit.disabled = true;

    setTimeout(() => botonSubmit.disabled = false, 15000);

    validaNombre();    
    validaRut();    
    validaTelefono();    
    validaEmail();    
    validaVuelo();
    validaMensaje();
    
   const errores = document.querySelectorAll("span.error").length;
   const elementosMuestraMensaje = document.querySelectorAll("form p.mensaje-form");
   if(errores > 0) {
        elementosMuestraMensaje.forEach(e => e.textContent = `Hay ${errores} error(es) por resolver.`);
   } else {
        elementosMuestraMensaje.forEach(e => e.textContent = "Enviando...");
   }

   const nombre     = nombreInputElement.value;
   const rut        = rutInputElement.value;
   const telefono   = telefonoInputElement.value;
   const vuelo   = vueloSelectElement.value;
   const email      = emailInputElement.value;
   const mensaje    = mensajeTextareaElement.value;

   const contacto = {
    nombre,
    rut,
    telefono,
    email,
    vuelo,
    mensaje
   };
   console.dir(contacto);

   const baseUrl    = getBaseUrl();
   const url        = baseUrl + '/contacto';
   
   try {
    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(contacto)
    }); 
    const datos = await respuesta.json();
    console.log("ENVIADOOOO");
    elementosMuestraMensaje.forEach(e => e.textContent = "Pronto nos comunicaremos contigo, gracias por preferirnos.");
   } catch (error) {
    console.error(error.message);
   }
   
});
