fetch('../header_footer/banner.html')
.then(response => response.text())
.then(data => {
    document.getElementById('banner').innerHTML = data;
})
.catch(error => console.error('Issue loading the header:', error));