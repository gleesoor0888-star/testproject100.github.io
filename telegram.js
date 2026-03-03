const userIconContainer = document.getElementById('user-icon-container');
const userIcon = document.getElementById('user-telegram-icon');

if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    const user = tg.initDataUnsafe?.user;
    
    if (user) {
        tg.onEvent('userChanged', function() {
            const updatedUser = tg.initDataUnsafe?.user;
            if (updatedUser?.photo_url) {
                userIcon.src = updatedUser.photo_url + '?t=' + Date.now();
            }
        });
        
        if (user.photo_url) {
            userIcon.src = user.photo_url + '?t=' + Date.now();
            userIconContainer.classList.remove('hidden');
            
            fetch(user.photo_url, { method: 'HEAD', cache: 'no-cache' })
                .then(response => {
                    if (!response.ok) {
                        console.log('Ошибка загрузки фото');
                    }
                });
        } else {
            const img = new Image();
            img.src = 'https://t.me/i/userpic/320/' + user.username + '.jpg';
            img.onload = function() {
                userIcon.src = img.src + '?t=' + Date.now();
                userIconContainer.classList.remove('hidden');
            };
            img.onerror = function() {
                userIconContainer.classList.remove('hidden');
                userIcon.src = 'https://t.me/i/userpic/320/' + user.id + '.jpg';
            };
        }
        
        setInterval(() => {
            if (userIcon.src) {
                userIcon.src = userIcon.src.split('?')[0] + '?t=' + Date.now();
            }
        }, 60000);
    }
}
