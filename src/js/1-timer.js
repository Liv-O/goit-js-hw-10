// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const btnStart = document.querySelector('.btn-start');
const dataSpan = [...document.querySelectorAll('.value')];
const inp = document.querySelector("#datetime-picker");
let userSelectedDate, userTime;

let now = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    userTime = userSelectedDate.getTime();
    if (userTime < now) {
      //window.alert("Please choose a date in the future");
      iziToast.show({
         title: 'X',
        message: 'Please choose a date in the future',
        color: 'red',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
    
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}



function startFunc() {
  btnStart.disabled = true;
  inp.disabled = true;
  const intervalId = setInterval(() => {

    const restTime = userTime - Date.now();
    const convertTime = convertMs(restTime);
    for (let [text, num] of Object.entries(convertTime)) {
      
      dataSpan.find((el) => el.hasAttribute(`data-${text}`)).textContent = addLeadingZero(num);
      
    }
    if (Object.values(convertTime).every(value => Number(value) === 0)) {
      inp.disabled = false;
      clearInterval(intervalId);
    }
    
 
  }, 1000);


}

btnStart.addEventListener('click', startFunc);