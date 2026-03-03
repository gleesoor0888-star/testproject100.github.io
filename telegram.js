const userIconContainer = document.getElementById('user-icon-container');
const userIcon = document.getElementById('user-telegram-icon');

function loadTelegramAvatar() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        
        const user = tg.initDataUnsafe?.user;
        
        if (user) {
            userIconContainer.classList.remove('hidden');
            
            if (user.photo_url) {
                userIcon.src = user.photo_url + '?t=' + Date.now();
            } else if (user.username) {
                userIcon.src = 'https://t.me/i/userpic/320/' + user.username + '.jpg?t=' + Date.now();
            } else {
                userIcon.src = 'https://t.me/i/userpic/320/' + user.id + '.jpg?t=' + Date.now();
            }
        }
    }
}

loadTelegramAvatar();
setInterval(loadTelegramAvatar, 3000);
