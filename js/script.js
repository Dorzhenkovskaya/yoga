window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    // Табы на странице
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Таймер
    let deadline = '2021-07-09';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            
            function addZeroForNumber(number) {
                if (number < 10) {
                    return '0' + number;
                } else return number;
            }
            
            hours.textContent = addZeroForNumber(t.hours);
            minutes.textContent = addZeroForNumber(t.minutes);
            seconds.textContent = addZeroForNumber(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Модальное окно
    let more = document.querySelector('.more'),
        overvlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelectorAll('.description-btn');

    function showModal(btn) {
        btn.addEventListener('click', function() {
            overvlay.style.display = 'block';
            this.classList.add('more-splash'); 
            document.body.style.overflow = 'hidden';
        });
    
        close.addEventListener('click', function() {
            overvlay.style.display = 'none';
            btn.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    }

    showModal(more);
    
    description.forEach(function(item) {
        showModal(item);
    });

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

    function submitForm(nameForm, inputForm) {
        nameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            nameForm.appendChild(statusMessage);
    
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
            // let formData = new FormData(nameForm);
            // request.send(formData);

            let formData = new FormData(nameForm);
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(json);
    
            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if(request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });
    
            for (let i = 0; i < inputForm.length; i++) {
                inputForm[i].value = '';
            }
        });
    }

    submitForm(form, input);
    submitForm(formContact, inputContact);

    
    // Отправка форм с использованием Promise
    // function submitForm(nameForm, nameInput) {
    //     nameForm.addEventListener('submit', function(event) {
    //         event.preventDefault();

    //         nameForm.appendChild(statusMessage);

    //         let formData = new FormData(nameForm);
    //         let obj = {};
    //         formData.forEach(function(value, key) {
    //             obj[key] = value;
    //         });
    //         let json = JSON.stringify(obj);

    //         function postData(data) {

    //             return new Promise(function(resolve, reject) {
    //                 let request = new XMLHttpRequest();

    //                 request.open('POST', 'server.php');

    //                 request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            
    //                 request.addEventListener('readystatechange', function() {
    //                     if (request.readyState < 4) {
    //                         resolve();
    //                     } else if(request.readyState === 4 && request.status == 200) {
    //                         resolve();
    //                     } else {
    //                         reject();
    //                     }
    //                 });
    //                 request.send(data);
    //             });
    //         }

    //         function clearInput() {
    //             for (let i = 0; i < nameInput.length; i++) {
    //                 nameInput[i].value = '';
    //             }
    //         }

    //     postData(json)
    //         .then(() => statusMessage.innerHTML = message.loading)
    //         .then(() => statusMessage.innerHTML = message.success)
    //         .catch(() => statusMessage.innerHTML = message.failure)
    //         .then(clearInput);
    //     });
    // }

    // submitForm(form, input);
    // submitForm(formContact, inputContact);

    // Слайдер
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if(n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        } 
    });
});