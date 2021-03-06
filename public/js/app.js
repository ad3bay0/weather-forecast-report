

const weatherForm = document.querySelector('form');
const query = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';
query.value ='';

weatherForm.addEventListener('submit', (e) => {


    e.preventDefault();
    messageOne.textContent = 'please wait loading data........';
    messageTwo.textContent = '';
    const location = query.value;

    fetch(`/weather?address=${location}`).then(response => {

        response.json().then(data => {

            if (data.error) {

                messageOne.textContent = '';
                messageTwo.textContent = data.error;

            } else {
                messageOne.textContent = '';
                messageTwo.textContent = `The weather in ${data.location} is ${data.forecast} at tempature at ${data.temperature} \xB0C`;
                query.value ='';
            }

        });
    })
});

