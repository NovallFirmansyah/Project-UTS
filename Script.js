const inputs = document.querySelector(".inputs"),
pertanyaan = document.querySelector(".pertanyaan span"),
sisajawab = document.querySelector(".sisa-pertanyaan span"),
salahjawab = document.querySelector(".huruf-salah span"),
Level= document.querySelector(".Level span"),
timer= document.querySelector(".timer span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];
let currentIndex = 0;
let timerInterval = null; // Menyimpan ID interval timer

if (currentIndex >= wordList.length) {
    currentIndex = 0; // Kembali ke awal
}

function randomWord() {
    // Mendapatkan soal random dari wordlist
    let currentItem = wordList[currentIndex];
    word = currentItem.word; // Mendapatkan kata dari objek acak
    maxGuesses = word.length >= 5 ? 3 : 3;
    correctLetters = [];
    incorrectLetters = [];
    // Menampilkan level
    Level.innerText = currentItem.Level;
    // Menampilkan Pertanyaan
    pertanyaan.innerText = currentItem.pertanyaan;
    // Menampilkan max sisa jawaban
    sisajawab.innerText = maxGuesses;
    // Menampilkan pesan jawaban salah
    salahjawab.innerText = incorrectLetters;
    // Menampilkan Timer
    timeLeft = 30;
    timer.innerText = timeLeft;

    // Program perulangan untuk menampilkan pertanyaan
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
    currentIndex++;

    // Memulai ulang timer
    clearInterval(timerInterval); // Menghentikan timer sebelum memulai ulang
    countdown(); // Memulai timer kembali
}

// Input saat memainkan game
let timeLeft = 30;
function countdown() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timer.innerText = timeLeft;
        } else {
            clearInterval(timerInterval); // Menghentikan timer jika waktu habis
            alert("Waktu habis! Kamu tidak mempunyai sisa waktu!");
            window.location.href = 'Game.html';
        }
    }, 1000);
}

// Panggil countdown() untuk memulai timer pertama kali
countdown();

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
            alert(`Congrats! Kamu menemukan jawabannya! ${word.toUpperCase()},
Silahkan Anda Melanjutkan Ke Level Selanjutnya`);
             if (currentIndex === wordList.length ) {
                // Ini adalah soal terakhir, kembali ke halaman web lain
                alert("Selamat Kamu Telah Berhasil Menyelesaikan Semua Level yang ada di permainan ini ANJOYYYYY")
                window.location.href = 'Homegame.html'; // Ganti dengan URL halaman web lain yang diinginkan
            } else {
                // Bukan soal terakhir, lanjutkan ke soal berikutnya
                randomWord(); // Memulai soal baru
            }
        } else if(maxGuesses < 1) {
            alert("Game over! Kamu tidak mempunyai sisa tebakan!");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            window.location.href = 'Game.html';
        }
    }, 100);
}

randomWord();
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
