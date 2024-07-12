
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close');
    const contactForm = document.getElementById('contactForm');

    contactBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(error => {
            error.textContent = '';
        });

        // Validation
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Name and Address validation
        if (name === '') {
            isValid = false;
            document.getElementById('nameError').textContent = 'Name is required';
        }

        if (address === '') {
            isValid = false;
            document.getElementById('addressError').textContent = 'Address is required';
        }

        // Phone number validation
        const phoneRegex = /^\+94\d{9}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            document.getElementById('phoneError').textContent = 'Invalid phone number. It should start with +94 and be followed by exactly 9 digits.';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            document.getElementById('emailError').textContent = 'Invalid email format';
        }

        // Message validation
        if (message.length < 10) {
            isValid = false;
            document.getElementById('messageError').textContent = 'Message should be at least 10 characters long';
        }

        // If all validations pass
        if (isValid) {
            const contactData = {
                name,
                address,
                phone,
                email,
                message
            };

            localStorage.setItem('contactData', JSON.stringify(contactData));
            alert('Contact information submitted successfully!');
            modal.style.display = 'none';
        }
    });
});
