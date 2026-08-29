document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
    });
    const data = await res.json();
    alert(data.message || data.error);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value
        })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('authToken', data.token);
        alert('Login successful! Token saved to browser.');
    } else {
        alert(data.error);
    }
});

document.getElementById('fetch-data-btn').addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');
    const outputBox = document.getElementById('secure-output');
    outputBox.style.display = 'block';

    if (!token) {
        outputBox.textContent = "Error: You must login first to get a token!";
        return;
    }

    const res = await fetch('/api/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    outputBox.textContent = JSON.stringify(data, null, 2);
});