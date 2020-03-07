//Variables
const listaTweets = document.querySelector('#lista-tweets');

//Event listeners
(function eventListeners(){
    //Cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    
    //edita tweet
    listaTweets.addEventListener('click', editarTweet);
    
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
    
    //Cuando se da click en el textarea para escribir un Tweet
    document.querySelector('#tweet').addEventListener('click', seleccionarTextoInput);
    
    //Cuando se escribe una tecla en el input
    document.querySelector('#tweet').addEventListener('keypress', ocultarErrorInputVacio);
    
    //Cuando se pierde el foco en el campo de texto
    document.querySelector('#tweet').addEventListener('onblur', resetearBordeInput);
})();




//Funciones
function agregarTweet(e) {
    //previene comportamiento por defecto del action del formulario
    e.preventDefault();
    
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    
    
    if (tweet === ''){
        mostrarErrorInputVacio();
        enfocarInput();
    } else{
        resetearBordeInput();
        //crear el botón de editar
        const botonEditar = document.createElement('i');
        botonEditar.classList = 'fas fa-edit';
        
        //crear boton de eliminar
        const botonBorrar = document.createElement('i');
        botonBorrar.classList = 'fas fa-trash-alt';
        
        //crear un elemento li
        const li = document.createElement('li');
        //le añade la clase clearfix al li
        li.classList = 'clearfix';
        //crea un elemento p
        const p = document.createElement('p');
        //añade el texto del tweet al parrafo
        p.innerText = tweet;
        //añade el parrafo al li
        li.appendChild(p);
        //añade el botonEditar al li
        li.appendChild(botonEditar);
        //añade el botonBorrar al li
        li.appendChild(botonBorrar);
        
        
        //añade el li a la lista total de tweets
        listaTweets.appendChild(li);
        
        //añadir al Local Storage
        agregarTweetLocalStorage(tweet);
    }
}

//Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    let tweet;
    if (e.target.className === 'fas fa-trash-alt') {
        e.target.parentElement.remove();
        tweet = e.target.parentElement.innerText;
        borrarTweetLocalStorage(tweet);
    }
}

//mostrar datos del local storage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(tweet => {
        //crear el botón de editar
        const botonEditar = document.createElement('i');
        botonEditar.classList = 'fas fa-edit';
        
        //crear boton de eliminar
        const botonBorrar = document.createElement('i');
        botonBorrar.classList = 'fas fa-trash-alt';
        
        //crear un elemento li
        const li = document.createElement('li');
        //le añade la clase clearfix al li
        li.classList = 'clearfix';
        //crea un elemento p
        const p = document.createElement('p');
        //añade el texto del tweet al parrafo
        p.innerText = tweet;
        //añade el parrafo al li
        li.appendChild(p);
        //añade el botonEditar al li
        li.appendChild(botonEditar);
        //añade el botonBorrar al li
        li.appendChild(botonBorrar);
        
        //añade el li a la lista total de tweets
        listaTweets.appendChild(li);
    });
}

//Agregar el tweet al local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //añadir el nuevo tweet
    tweets.push(tweet);
    //convertir de string a array para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// comprobar que haya elementos en local storage, retorna un array
function obtenerTweetsLocalStorage() {
    let tweets;
    //revisamos los valores del local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet del local storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    tweetBorrar = tweet;
    
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach((tweet, index)=>{
        //si el tweet a borrar es igual al tweet de la iteración del forEach
        if(tweetBorrar === tweet){
            //pr: parámetros
            //splice pr:(la posición del array a eliminar, cuantos elementos después de esa posición se eliminarán);
            tweets.splice(index, 1);
        }
    });
    
    localStorage.setItem('tweets', JSON.stringify(tweets));
    // console.log(tweets);
}

//==================================================================

//Función que ayuda a mejorar la UI,
//autoseleccionando todo el texto que haya en el textarea cuando se vuelva a enfocar en este
function seleccionarTextoInput() {
    document.getElementById('tweet').select();
}

//==================================================================
//Funciones que validan el formulario del tweet, se invocarán si al dar click en agregar el textarea del tweet está sin texto

//Enfocará el cursor en el textarea para que el usuario escriba
function enfocarInput() {
    document.getElementById('tweet').select();
}

//Mostrará un mensaje de validación al usuario indicando que debe rellenar el textarea del tweet
function mostrarErrorInputVacio() {
    let input = document.getElementById('tweet');
    input.style.border = '1px solid red';
    let mensajeError = document.getElementById('errorInputVacio');
    mensajeError.style.display = 'block';
}

//Ocultará el mensaje de validación mostrado anteriormente por la función mostrarErrorInputVacio(), y el borde rojo del textarea cuando el usuario presione una tecla en el textarea, o, en otras palabras cuando escriba en el textarea del Tweet.
function ocultarErrorInputVacio() {
    let mensajeError = document.getElementById('errorInputVacio');
    let input = document.getElementById('tweet');
    input.style.border = '1px solid #0d8ab1';
    mensajeError.style.display = 'none';
}

//Al manipular los bordes por defecto del textarea con las funciones de validacion de la misma, se pierde el efecto de reseteo natural del textarea, por ello esta función: resetea el color del borde del textarea a su estado original cuando el usuario manda un tweet válido
function resetearBordeInput() {
    let input = document.getElementById('tweet');
    input.style.border = '1px solid #000';
}


//Función que permite editar un tweet ya agregado previamente
function editarTweet(e) {
    e.preventDefault();
    let tweet;//tweet editado
    if (e.target.className === 'fas fa-edit') {
        tweet = e.target.parentElement.querySelector('p');
        //convierte el párrafo en uno editable
        tweet.setAttribute('contenteditable', 'true');
        tweet.style.border = 'none';
        tweet.focus();
        
        const tweetViejo = tweet.innerText;
        
        //Y deshabilita el atributo contenteditable al salir del campo de texto o presionar enter
        tweet.addEventListener('blur', (e)=>{
            e.preventDefault();
            e.stopImmediatePropagation();
            tweet.setAttribute('contenteditable', 'false');
            editarTweetLocalStorage(tweetViejo, tweet);
        });
        tweet.addEventListener('keypress', (e)=>{
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                e.stopImmediatePropagation();
                tweet.setAttribute('contenteditable', 'false');
            }
        });
    }
}

//Edita un tweet previamente editado con el botón de editar tweet, toma 2 parámetros: (el tweetViejo que sirve como identificador del tweet a modificar, el tweet ya modificado)
function editarTweetLocalStorage(tweetViejo, tweetNuevo){
    //Guarda el valor del tweet ya editado
    let tweetModificado = tweetNuevo.innerText;
    //Guarda el valor del tweet antes de ser editado
    let tweetAnterior = tweetViejo;
    
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach((i, index)=>{
        //si el tweet viejo, antes de ser modificado, es igual al tweet de la iteración del foreach, ese es el tweet del array que hay que modificar por el nuevo tweet ya modificado
        if(tweetAnterior === i){
            tweets[index] = tweetModificado;
        }
    });
    
    //Sube al localStorage el array stringifeado ya modificado.
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
