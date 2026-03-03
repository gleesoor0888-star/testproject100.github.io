const backButton = document.getElementById('backButton');
const currencyItems = document.querySelectorAll('.currency-select-item');

function updateSelectedCurrency() {
    const savedCurrency = localStorage.getItem('selectedCurrency') || 'RUB';
    
    currencyItems.forEach(item => {
        const checkIndicator = item.querySelector('.check-indicator');
        const currency = item.dataset.currency;
        
        if (currency === savedCurrency) {
            checkIndicator.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#1b599c" stroke-width="1.5"/>
                    <circle cx="10" cy="10" r="5" fill="#1b599c"/>
                </svg>
            `;
        } else {
            checkIndicator.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#8e8e93" stroke-width="1.5"/>
                </svg>
            `;
        }
    });
}

backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

currencyItems.forEach(item => {
    item.addEventListener('click', () => {
        const currency = item.dataset.currency;
        localStorage.setItem('selectedCurrency', currency);
        updateSelectedCurrency();
    });
});

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
}

updateSelectedCurrency();