/*document.getElementById('pdf_Form').addEventListener('submit', function(event){
    event.preventDefault();

    const file_Input = document.getElementById('pdf_File');
    const form_Data = new FormData();
    const file = file_Input.files[0];

    grecaptcha.ready(function (){
        grecaptcha.execute('6Le4JVQqAAAAAClLPGpwn0ppTcjPsPxPRC70QMX1', {action: 'submit'}).then(function(token){
            document.getElementById('g-recaptcha-response').value = token;

            form_Data.append('pdf_File', file);
            form_Data.append('g-recaptcha-response', token);

            fetch('nanacleaningservicesltd.azurewebsites.net/upload', {
                method: 'POST',
                body: form_Data,
            })

            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                const successMessage = document.getElementById('success');
                successMessage.textContent = 'Thanks! We got your resume!';
                successMessage.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    });
});*/