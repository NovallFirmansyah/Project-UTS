const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset"),
pertanyaan = document.querySelector(".pertanyaan span"),
sisajawab = document.querySelector(".sisa-pertanyaan span"),
salahjawab = document.querySelector(".huruf-salah span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];


function randomWord() {
    // Mendapatkan soal random dari wordlist
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word; //Mendapatkan kata dari objek acak
    maxGuesses = word.length >= 5 ? 6 : 4;
    correctLetters = []; incorrectLetters = [];
    // Menampilkan Pertanyaan
    pertanyaan.innerText = ranItem.pertanyaan;
    // Menampilkan max sisa jawaban
    sisajawab.innerText = maxGuesses;
    // Menampilkan pesan jawaban salah
    salahjawab.innerText = incorrectLetters;

    //Program perulangan untuk menampilkan pertanyaan
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
// input dalam memainkan game
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        sisajawab.innerText = maxGuesses;
        salahjawab.innerText = incorrectLetters;
    }
    typingInput.value = "";
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! Kamu menemukan jawabannya! ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! Kamu tidak mempunyai sisa tebakan!");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());