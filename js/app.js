$('#loginForm').submit(function(e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    axios.post('http://localhost:8080/api/auth/signin', {
        username: username,
        password: password
    })
    .then(response => {
        
        localStorage.setItem('jwt', response.data.token);
        window.location.href = '/users.html';
    })
    .catch(error => {
        alert('Login failed: ' + error.response.data.message);
    });
});


$('#signupForm').submit(function(e) {
    e.preventDefault();

    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();

    axios.post('http://localhost:8080/api/auth/signup', {
        username: username,
        email: email,
        password: password
    })
    .then(response => {
        alert('Signup successful! Please login.');
        window.location.href = 'login.html';
    })
    .catch(error => {
        alert('Signup failed: ' + error.response.data.message);
    });
});

function fetchAllUsers() {
    axios.get('http://localhost:8080/api/auth/users', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then(response => {
        const users = response.data;
        let usersList = '';
        users.forEach(user => {
            usersList += `<li>${user.username} - ${user.email}</li>`;
        });
        $('#usersList').html(usersList);
    })
    .catch(error => {
        alert('Failed to fetch users: ' + error.response.data.message);
    });
}
