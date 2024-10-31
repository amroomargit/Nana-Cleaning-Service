const uploadButton = document.querySelector('.upload_button');
const fileInput = document.getElementById('pdf_File');

uploadButton.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    uploadButton.disabled = false;
});

document.getElementById('pdf_Form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form_Data = new FormData();
    const file = fileInput.files[0];
    const recaptchaResponse = document.getElementById('g-recaptcha-response').value;

    if (!recaptchaResponse) {
        alert('reCaptcha incomplete');
        return;
    }

    form_Data.append('pdf_File', file);
    form_Data.append('g-recaptcha-response', recaptchaResponse);

    fetch('/upload', {
        method: 'POST',
        body: form_Data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        const successMessage = document.getElementById('success');
        successMessage.textContent = "Thank you! We have received your resume.";
        successMessage.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
