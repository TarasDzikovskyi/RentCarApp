const  axios = require('axios');


function httpRequest() {

    const apiUrl = 'http://localhost:3001/api/car';

    const postData = {
        email: 'test@email.com',
        password: '111111',
    };

    axios.get(apiUrl)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}


httpRequest()