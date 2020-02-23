//Variables
const listaTweets = document.querySelector('#lista-tweets');




//Event listeners

//Se autollama la funcion eventListeners
(function eventListeners(){
    //Cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
    
    //Cuando se da click en el input
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
    if (e.target.className === 'fas fa-trash-alt') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//mostrar datos del local storage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(tweet => {
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
    //declaramos 2 variables, una para recibir el parámetro, y otra para el tweet sin la 'x'
    let tweets, tweetBorrar;
    
    // tweetBorrar = tweet.substring(0, tweet.length-1);
    tweetBorrar = tweet;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach((tweet, index)=>{
        //si el tweet a borrar es igual al tweet de la iteración del forEach
        if(tweetBorrar === tweet){
            //splice(la posición del array a eliminar, cuantos elementos después de esa posición se eliminarán);
            tweets.splice(index, 1);
        }
    });
    
    localStorage.setItem('tweets', JSON.stringify(tweets));
    // console.log(tweets);
}

//comprueba si hay un valor en el input
function seleccionarTextoInput() {
    document.getElementById('tweet').select();
}

//enfoca en el campo de texto
function enfocarInput() {
    document.getElementById('tweet').select();
}

//muestra el error de input vacio
function mostrarErrorInputVacio() {
    let mensajeError = document.getElementById('errorInputVacio');
    let input = document.getElementById('tweet');
    input.style.border = '1px solid red';
    mensajeError.style.display = 'block';
}

//oculta el error de input vacio
function ocultarErrorInputVacio() {
    let mensajeError = document.getElementById('errorInputVacio');
    let input = document.getElementById('tweet');
    input.style.border = '1px solid #0d8ab1';
    mensajeError.style.display = 'none';
}

//resetea el borde a su estado inicial
function resetearBordeInput() {
    let input = document.getElementById('tweet');
    input.style.border = '1px solid #000';
}