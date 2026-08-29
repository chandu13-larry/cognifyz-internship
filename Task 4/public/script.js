document.addEventListener('DOMContentLoaded', () => {
    // Select elements from the DOM
    const nameInput = document.querySelector('input[name="name"]');
    const courseSelect = document.querySelector('select[name="course"]');
    const previewName = document.getElementById('preview-name');
    const previewCourse = document.getElementById('preview-course');
    const passwordInput = document.querySelector('input[name="password"]');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    // 1. Dynamic DOM Manipulation: Update ID Card as user types
    nameInput.addEventListener('input', (e) => {
        // If empty, show default text
        previewName.textContent = e.target.value || 'Student Name';
    });

    courseSelect.addEventListener('change', (e) => {
        previewCourse.textContent = e.target.value || 'Full Stack Development';
    });

    // 2. Complex Validation: Password Strength Checker
    passwordInput.addEventListener('input', (e) => {
        const val = e.target.value;
        let strength = 0;

        // Calculate strength based on length and characters
        if (val.length > 5) strength += 1;
        if (val.length > 8) strength += 1;
        if (/[0-9]/.test(val)) strength += 1;
        if (/[^A-Za-z0-9]/.test(val)) strength += 1;

        // Update the visual progress bar width
        strengthBar.style.width = (strength * 25) + '%';
        
        // Change colors and text dynamically
        if (val.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
        } else if (strength <= 1) {
            strengthBar.className = 'progress-bar bg-danger';
            strengthText.textContent = 'Weak';
        } else if (strength === 2 || strength === 3) {
            strengthBar.className = 'progress-bar bg-warning';
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.className = 'progress-bar bg-success';
            strengthText.textContent = 'Strong';
        }
    });
});