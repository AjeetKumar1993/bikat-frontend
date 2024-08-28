document.getElementById('registerBtn').addEventListener('click', function () {
    const fullName = document.getElementById('fullName').value;
    const emailOrPhone = document.getElementById('emailOrPhone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsCheck = document.getElementById('termsCheck').checked;

    if (!termsCheck) {
        alert('You must agree to the terms and conditions.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const requestData = {
        name: fullName,
        email: emailOrPhone,
        password: password
    };

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Please try after sometime.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Registration successful!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed.');
    });
});