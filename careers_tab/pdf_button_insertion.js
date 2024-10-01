document.querySelector('.upload_button').addEventListener('click', function(){
    const file_Input = document.getElementById('pdf_File');

    this.disabled = true;

    file_Input.click();

    file_Input.addEventListener('change', () =>{
        this.disabled = false;
    });
});

document.getElementById('pdf_Form').addEventListener('submit', function(event){
    event.preventDefault();

    const form_Data = new FormData();
    const file_Input = document.getElementById('pdf_File');
    const file = file_Input.files[0];
    const recaptchaResponse = getcaptcha.getResponse();

    if(!recaptchaResponse){
        alert('reCaptcha incomplete');
        return;
    }

        form_Data.append('pdf_File', file);
        form_Data.append('g-recaptcha-response', recaptchaResponse);

        fetch('/upload',{
            method: 'POST',
            body: form_Data
        })

        .then(response => response.json())
        .then (data => {
            console.log('Success:', data);
            const successMessage = document.getElementById('success');
            successMessage.textContent = "Thank you! We have recieved your resume.";
            successMessage.style.display = 'block';
        })
        
        .catch(error => {
            console.error('Error:', error);
 
        });
});