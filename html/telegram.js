const userIconContainer = document.getElementById('user-icon-container');
const userIcon = document.getElementById('user-telegram-icon');
const currencySelector = document.getElementById('currencySelector');
const rubHighlight = document.querySelector('.rub-highlight');
const currencyIcon = document.querySelector('.currency-select-icon');
const balanceAmount = document.querySelector('.balance-amount');
const currencyPrices = document.querySelectorAll('.currency-price');
const currencyTotals = document.querySelectorAll('.currency-total');

let currentCurrency = 'RUB';

const currencySymbols = {
    RUB: '₽',
    USD: '$',
    EUR: '€'
};

const currencyIcons = {
    RUB: 'Photo/photo_2026-03-03_15-10-06_X-Design.png',
    USD: 'Photo/photo_2026-03-03_15-10-06_X-Design (1).png',
    EUR: 'Photo/photo_2026-03-03_15-10-06_X-Design (2).png'
};

function updateAvatar() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe?.user;
        
        if (user) {
            userIconContainer.classList.remove('hidden');
            
            const timestamp = Date.now();
            let avatarUrl = '';
            
            if (user.photo_url) {
                avatarUrl = user.photo_url.includes('?') 
                    ? user.photo_url + '&t=' + timestamp 
                    : user.photo_url + '?t=' + timestamp;
            } else {
                avatarUrl = `https://t.me/i/userpic/320/${user.id}.jpg?t=` + timestamp;
            }
            
            userIcon.src = avatarUrl;
        }
    }
}

function updateCurrencyDisplay() {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && ['RUB', 'USD', 'EUR'].includes(savedCurrency)) {
        currentCurrency = savedCurrency;
    }
    
    if (currencyIcon) {
        currencyIcon.src = currencyIcons[currentCurrency];
    }
    
    if (rubHighlight) {
        rubHighlight.textContent = currentCurrency;
    }
    
    if (balanceAmount) {
        const currentText = balanceAmount.textContent;
        const numberMatch = currentText.match(/[\d.]+/);
        if (numberMatch) {
            balanceAmount.textContent = currencySymbols[currentCurrency] + numberMatch[0];
        } else {
            balanceAmount.textContent = currencySymbols[currentCurrency] + '0';
        }
    }
    
    currencyPrices.forEach(price => {
        const currentText = price.textContent;
        const numberMatch = currentText.match(/[\d.]+/);
        if (numberMatch) {
            price.textContent = numberMatch[0] + ' ' + currencySymbols[currentCurrency];
        }
    });
    
    currencyTotals.forEach(total => {
        const currentText = total.textContent;
        const numberMatch = currentText.match(/[\d.]+/);
        if (numberMatch) {
            total.textContent = numberMatch[0] + ' ' + currencySymbols[currentCurrency];
        }
    });
}

function goToCurrencySelector() {
    window.location.href = 'currency.html';
}

currencySelector.addEventListener('click', goToCurrencySelector);

if (rubHighlight) {
    rubHighlight.addEventListener('click', goToCurrencySelector);
}

window.addEventListener('storage', (e) => {
    if (e.key === 'selectedCurrency') {
        updateCurrencyDisplay();
    }
});

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    updateAvatar();
    setInterval(updateAvatar, 3000);
}

updateCurrencyDisplay();