const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreElement = document.querySelector(".score");

// Posição inicial do dinossauro
let position = 0;

let isJumping = false;

let score = 0;

/**
 * @param {KeyboardEvent} event 
 */
function handleKeyUp(event) {
    //console.log(event);
    if(event.code !== undefined && event.code === "Space") {

        if(!isJumping) jump();
    } else if(event.keyCode !== undefined && event.code === 32) {
        // Caso algum browser não tenha implementado o event.code ainda
        // ou a versão dele não tenha a implementação, usa o event.keyCode
        if(!isJumping) jump();
    }
}

function jump() {
    
    isJumping = true;

    // Ser executada em um determinado ciclo de tempo, repetição
    let upInterval = setInterval(() => {

        if(position >= 150) {
            clearInterval(upInterval);

            // descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // subindo
            position += 20
            dino.style.bottom = position + 'px';
        }

        
    }, 20);

}

/**
 * @return {BaseObject}
 */
function createObject() {
    let random = Math.round((Math.random() * 3)); // 0 1 2 3

    console.log(random);
    
    /**
     * @type {BaseObject}
     */
    let object;

    switch (random) {
        case 0:
            object = new JoiaVermelha();
            break;

        case 1:
            object = new JoiaAzul();
            break;

        case 2:
            object = new Pedra();
            break;

        case 3:
            object = new Cactu();
            break;
    
        default:
            object = undefined;
            break;
    }

    return object;
}

createObject();

function play() {
    
    let model = createObject();

    const object = document.createElement('div');

    let randomTime = Math.random() * 6000;

    object.classList.add(addClassToObject(model));
    
    background.appendChild(object);

    // Switch para cada iteração de cada objeto
    switch(model.type) {
        case Types.CACTU:
            toCactu(object);
        break;

        case Types.JOIA_AZUL:
            toJoiaAzul(object,model);
        break;

        case Types.JOIA_VERMELHA:
            toJoiaVermelha(object,model);
        break;

        case Types.PEDRA:
            toPedra(object,model);
        break;
    }

    // Execute uma determinda função depois de um determinado tempo
    setTimeout(play, randomTime);
}

play();

/**
 * @param { BaseObject } model
 * @return { string }
 */
function addClassToObject(model) {
    //debugger;
    let style;

    switch(model.type) {
        case Types.CACTU:
            style = "cactus";
        break;

        case Types.JOIA_AZUL:
            style = "joia-azul";
        break;

        case Types.JOIA_VERMELHA:
            style = "joia-vermelha";
        break;

        case Types.PEDRA:
            style = "pedra";
        break;

        default:
            style = "";
        break;
    }

    return style;
}

/**
 * @param { HTMLDivElement } object
 * @param { BaseObject } model
 */
function toJoiaVermelha(object, model) {

    let objectPosition = 1000; // Onde vai aparecer

    let leftInterval = setInterval(() => {

        // -60 tem a ver com a largura dele, se for -60 quer dizer que saiu todo da tela
        if(objectPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(object);
        } else if(
            objectPosition > 0 && 
            objectPosition < 60 &&
            position < 60 // referente a altura
        ) { // não saiu da tela, mas está no espaço do dinossauro
            
            // Game over
            clearInterval(leftInterval);

            score += model.type;
            
            scoreElement.textContent = `Pontuação: ${score}`;

            background.removeChild(object);

        } else {
            objectPosition -= 10;
            object.style.left = objectPosition + 'px';
        }
    }, 20);
}

/**
 * @param { HTMLDivElement } object
 * @param { BaseObject } model
 */
function toJoiaAzul(object, model) {

    let objectPosition = 1000;

    let leftInterval = setInterval(() => {

        // -60 tem a ver com a largura dele, se for -60 quer dizer que saiu todo da tela
        if(objectPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(object);
        } else if(
            objectPosition > 0 && 
            objectPosition < 60 &&
            position < 60 // referente a altura
        ) { // não saiu da tela, mas está no espaço do dinossauro
            
            // Game over
            clearInterval(leftInterval);

            score += model.type;
            
            scoreElement.textContent = `Pontuação: ${score}`;

            background.removeChild(object);

        } else {
            objectPosition -= 10;
            object.style.left = objectPosition + 'px';
        }
    }, 20);
}

/**
 * @param { HTMLDivElement } object
 * @param { BaseObject } model
 */
function toPedra(object, model) {

    let objectPosition = 1000;

    let leftInterval = setInterval(() => {

        // -60 tem a ver com a largura dele, se for -60 quer dizer que saiu todo da tela
        if(objectPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(object);
        } else if(
            objectPosition > 0 && 
            objectPosition < 60 &&
            position < 60 // referente a altura
        ) { // não saiu da tela, mas está no espaço do dinossauro
            
            // Game over
            clearInterval(leftInterval);

            score += model.type;

            if(score < 0) {
                goToPageGameOver();
            }
            
            scoreElement.textContent = `Pontuação: ${score}`;

            background.removeChild(object);

        } else {
            objectPosition -= 10;
            object.style.left = objectPosition + 'px';
        }
    }, 20);
}

/**
 * @param { HTMLDivElement } object
 */
function toCactu(object) {

    let objectPosition = 1000;

    let leftInterval = setInterval(() => {

        // -60 tem a ver com a largura dele, se for -60 quer dizer que saiu todo da tela
        if(objectPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(object);
        } else if(
            objectPosition > 0 && 
            objectPosition < 60 &&
            position < 60
        ) { // não saiu da tela, mas está no espaço do dinossauro
            
            // Game over
            clearInterval(leftInterval);

            //document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1>`

            goToPageGameOver();

        } else {
            objectPosition -= 10;
            object.style.left = objectPosition + 'px';
        }
    }, 20);
}

function goToPageGameOver() {
    var url = window.location.href;

    var newUrl = url.substring(0,url.indexOf("/start_game.html")) + "/game_over.html";

    // guardando a informação no storage local para pegar na tela de game_over
    localStorage.setItem("score", score.toString());

    window.location.href = newUrl;
}

// Para pular, eu preciso interceptar o pressionamento de teclas
document.addEventListener('keyup', handleKeyUp);