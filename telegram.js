const userIconContainer = document.getElementById('user-icon-container');
        
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.expand();
            
            const user = tg.initDataUnsafe?.user;
            const userIcon = document.getElementById('user-telegram-icon');
            
            if (user?.photo_url) {
                userIcon.src = user.photo_url;
                userIconContainer.classList.remove('hidden');
            } else if (user) {
                userIcon.src = 'https://example.com/default-avatar.png';
                userIconContainer.classList.remove('hidden');
            }
        }