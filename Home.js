const startBtn = document.querySelector('.start');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');

startBtn.onclick = () => {
    main.classList.add('active');
    popupInfo.classList.add('active');
}
exitBtn.onclick = () => {
    main.classList.remove('active');
    popupInfo.classList.remove('active');
}