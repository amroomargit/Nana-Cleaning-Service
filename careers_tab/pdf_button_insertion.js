document.getElementById('pdf_file').addEventListener('change',function(){
    const file = this.files[0];
    const error_msg = document.getElementById('incorrect_file');

    if(file && file.type !== 'application/pdf'){
        error_msg.style.display = 'block';
    }
    else{
        error_msg.style.display = 'none';
    }
});

document.querySelector('.upload_button').addEventListener('click', function(){
    document.getElementById('pdf_file').click();
});

document.getElementById('pdfForm').addEventListener('submit', function(event){
    const form_Data = new FormData();
    const file_Input = document.getElementById('pdf_file');
    const file = file_Input.files[0];
    const error_msg = document.getElementById('file_error')

    if(file && file.type === 'application/pdf'){
        error_msg.style.display = "none";

        form_Data.append('pdf_file', file);

        fetch('/upload',{
            method: 'POST',
            body: form_Data
        })

        .then(response => response.json())
        .then (data => {
            console.log('Success:',data);
        })

        .catch(error => {
            console.error('Error:', error);
 
        });

    } else {
        error_msg.style.display = 'block';
    }

});