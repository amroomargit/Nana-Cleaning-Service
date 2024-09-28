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

        form_Data.append('pdf_File', file);

        fetch('/upload',{
            method: 'POST',
            body: form_Data
        })

        .then(response => response.json())
        .then (data => {
            console.log('Success:', data);
        })

        .catch(error => {
            console.error('Error:', error);
 
        });
});