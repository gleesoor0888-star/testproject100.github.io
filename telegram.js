const userIconContainer = document.getElementById('user-icon-container');
const userIcon = document.getElementById('user-telegram-icon');
        
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.expand();
            
            const user = tg.initDataUnsafe?.user;
            
            if (user) {
                if (user.photo_url) {
                    userIcon.src = user.photo_url;
                } else {
                    const canvas = document.createElement('canvas');
                    canvas.width = 100;
                    canvas.height = 100;
                    const ctx = canvas.getContext('2d');
                    
                    ctx.fillStyle = '#2c2f38';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 40px -apple-system, BlinkMacSystemFont, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    let initials = '';
                    if (user.first_name) {
                        initials += user.first_name.charAt(0).toUpperCase();
                    }
                    if (user.last_name) {
                        initials += user.last_name.charAt(0).toUpperCase();
                    }
                    
                    ctx.fillText(initials || '?', canvas.width/2, canvas.height/2);
                    
                    userIcon.src = canvas.toDataURL();
                }
                userIconContainer.classList.remove('hidden');
            }
        }
