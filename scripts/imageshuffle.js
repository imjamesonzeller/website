let image = document.getElementById("headshot");

fetch('../data/imagelist.json')
    .then(response => response.json())
    .then(data => {
        images = data
        let i = 0;
        setInterval(function() {
        $('#headshot').fadeOut(function() {
        $(this).attr('src', images[(i = (i + 1) % images.length)]).fadeIn();
    });
}, 3000);
    })
    .catch(error => console.error('Error:', error));