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
                resolve({
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    color: 'green',
                });
            }
            reject({
                message: `❌ Rejected promise in ${delay}ms`,
                color: 'red',
            });

        }, delay)
    })
        .then(message => { iziToast.show(message) })
        .catch(message => { iziToast.show(message) });
    
}
  

form.addEventListener('submit', submitFunc);