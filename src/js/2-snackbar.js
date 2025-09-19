// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');


function submitFunc(event) {
    event.preventDefault();
    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

    
    new Promise((resolve, reject) => {
            
        setTimeout(() => {

            if (state === 'fulfilled') {
                resolve(delay);
            }
            reject(delay);

        }, delay)
    })
        .then(message => { iziToast.show({
                    message: `✅ Fulfilled promise in ${message}ms`,
                    color: 'green',
                }) })
        .catch(message => { iziToast.show({
                message: `❌ Rejected promise in ${message}ms`,
                color: 'red',
            }) });
    
}
  

form.addEventListener('submit', submitFunc);