function form() {
    // Форма
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        formContact = document.getElementById('form'),
        inputContact = formContact.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    // function submitForm(nameForm, inputForm) {
    //     nameForm.addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         nameForm.appendChild(statusMessage);
    
    //         let request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //         request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
    //         // let formData = new FormData(nameForm);
    //         // request.send(formData);

    //         let formData = new FormData(nameForm);
    //         let obj = {};
    //         formData.forEach(function(value, key) {
    //             obj[key] = value;
    //         });
    //         let json = JSON.stringify(obj);

    //         request.send(json);
    
    //         request.addEventListener('readystatechange', function() {
    //             if (request.readyState < 4) {
    //                 statusMessage.innerHTML = message.loading;
    //             } else if(request.readyState === 4 && request.status == 200) {
    //                 statusMessage.innerHTML = message.success;
    //             } else {
    //                 statusMessage.innerHTML = message.failure;
    //             }
    //         });
    
    //         for (let i = 0; i < inputForm.length; i++) {
    //             inputForm[i].value = '';
    //         }
    //     });
    // }

    // submitForm(form, input);
    // submitForm(formContact, inputContact);

    // Отправка форм с использованием Promise
    function submitForm(nameForm, nameInput) {
        nameForm.addEventListener('submit', function(event) {
            event.preventDefault();

            nameForm.appendChild(statusMessage);

            let formData = new FormData(nameForm);
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            function postData(data) {

                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            
                    request.addEventListener('readystatechange', function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if(request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                    request.send(data);
                });
            }

            function clearInput() {
                for (let i = 0; i < nameInput.length; i++) {
                    nameInput[i].value = '';
                }
            }

        postData(json)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);
        });
    }

    submitForm(form, input);
    submitForm(formContact, inputContact);
}

module.exports = form;