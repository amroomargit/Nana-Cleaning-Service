document.querySelector('.upload_button').addEventListener('click', function () {
    const file_Input = document.getElementById('pdf_File');
    
    file_Input.removeEventListener('change', fileInputChangeHandler);

    function fileInputChangeHandler() {
        this.disabled = false;
    }

    this.disabled = true;
    file_Input.click();

    file_Input.addEventListener('change', fileInputChangeHandler);
});

document.getElementById('pdf_Form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form_Data = new FormData();
    const file_Input = document.getElementById('pdf_File');
    const file = file_Input.files[0];
    const recaptchaResponse = getcaptcha.getResponse();

    if (!recaptchaResponse) {
        alert('reCaptcha incomplete');
        return;
    }

    form_Data.append('pdf_File', file);
    form_Data.append('g-recaptcha-response', recaptchaResponse);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: form_Data
        });
        const data = await response.json();
        console.log('Success:', data);

        const successMessage = document.getElementById('success');
        successMessage.textContent = "Thank you! We have received your resume.";
        successMessage.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
});