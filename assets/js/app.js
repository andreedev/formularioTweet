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
    
    document.querySelector('#tweet').addEventListener('click', seleccionarTextoInput);
})();




//Funciones
function agregarTweet(e) {
    //previene comportamiento por defecto del action del formulario
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    //añade estilos por medio de una clase al botonBorrar
    botonBorrar.classList = 'borrar-tweet';
    //escribe una X en el botonBorrar
    botonBorrar.innerText = 'X';
    
    
    //crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    //añade el tweet al li
    li.innerText = tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista total
    listaTweets.appendChild(li);
    
    //añadir al Local Storage
    agregarTweetLocalStorage(tweet);
}

//Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//mostrar datos del local storage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(i => {
        //crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        
        //crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = i;
        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista total
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
    
    //Elimina la 'X' del string tweet
    tweetBorrar = tweet.substring(0, tweet.length-1);
    
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