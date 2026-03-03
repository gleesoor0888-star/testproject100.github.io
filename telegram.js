const userIconContainer = document.getElementById('user-icon-container');
const userIcon = document.getElementById('user-telegram-icon');

if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    const user = tg.initDataUnsafe?.user;
    
    if (user) {
        userIconContainer.classList.remove('hidden');
        
        if (user.photo_url) {
            fetch(user.photo_url)
                .then(response => {
                    if (response.ok) {
                        userIcon.src = user.photo_url;
                    } else {
                        userIcon.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(user.first_name || 'User');
                    }
                })
                .catch(() => {
                    userIcon.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(user.first_name || 'User');
                });
        } else {
            userIcon.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(user.first_name || 'User');
        }
    }
}
