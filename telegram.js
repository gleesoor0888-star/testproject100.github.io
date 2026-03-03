const userIconContainer = document.getElementById('user-icon-container');
const userIcon = document.getElementById('user-telegram-icon');

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

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    updateAvatar();
    setInterval(updateAvatar, 3000);
}
