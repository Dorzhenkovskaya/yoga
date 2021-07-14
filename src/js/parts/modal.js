function modal() {
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
}

module.exports = modal;