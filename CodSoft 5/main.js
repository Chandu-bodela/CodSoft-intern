// main.js
document.addEventListener('DOMContentLoaded', function () {
    // Keep your existing demo button behavior if present
    const buttonElement = document.querySelector('#my-button');
    if (buttonElement) {
        buttonElement.addEventListener('click', function () {
            alert('Button clicked!');
        });
    }

    // Logout button
    const logoutBtn = document.querySelector('#logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function (e) {
            e.preventDefault();

            // UI feedback
            logoutBtn.disabled = true;
            const originalText = logoutBtn.textContent;
            logoutBtn.textContent = 'Logging out...';

            try {
                const res = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin', // important for cookies/sessions
                    body: JSON.stringify({}) // optional payload
                });

                if (res.ok) {
                    // Expecting JSON { success: true, redirect: '/login' } (see server)
                    let data;
                    try { data = await res.json(); } catch (_) { data = null; }
                    const redirectTo = data && data.redirect ? data.redirect : '/';
                    window.location.href = redirectTo;
                } else {
                    const text = await res.text();
                    alert('Logout failed: ' + (text || res.statusText));
                    logoutBtn.disabled = false;
                    logoutBtn.textContent = originalText;
                }
            } catch (err) {
                console.error('Logout error:', err);
                alert('Network error while logging out. Check console for details.');
                logoutBtn.disabled = false;
                logoutBtn.textContent = originalText;
            }
        });
    }
});
