function getScore() {

    const score = document.querySelector(".score");

    var value = localStorage.getItem("score");

    score.textContent = `Sua pontuação foi de: ${value}`;
}

getScore();