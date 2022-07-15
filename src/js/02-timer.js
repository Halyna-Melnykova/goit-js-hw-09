// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('button[data-start]');
// кнопка спочатку неактивна
startBtnEl.disabled = true;
const selector = document.querySelector('input[type="text"]');

const now = Date.now();
// console.log(now);
let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    
    if (selectedDates[0].getTime() <= now) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        startBtnEl.disabled = false;
        selectDate = selectedDates[0];
        // console.log(selectDate);
    }
  },
};

flatpickr(selector, options);

// Таймер
const timerEl = document.querySelector('.timer');

const timer = {
  intervalId: null,

  start(rootSelector, deadline) {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const ms = deadline - now;

      if (ms <= 0) {
        this.stop();
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(ms);

      rootSelector.querySelector('[data-days]').textContent = this.addLeadingZero(days);
      rootSelector.querySelector('[data-hours]').textContent = this.addLeadingZero(hours);
      rootSelector.querySelector('[data-minutes]').textContent = this.addLeadingZero(minutes);
      rootSelector.querySelector('[data-seconds]').textContent = this.addLeadingZero(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    startBtnEl.disabled = false;
  },

  convertMs(ms) {
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
   
  },
//  функція додає 0, якщо в числі менше двох символів
  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }
};

startBtnEl.addEventListener('click', () => {
    timer.start(timerEl, selectDate);
    startBtnEl.disabled = true;
})