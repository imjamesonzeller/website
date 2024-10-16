(function () {
    fetch('../data/words.json')
    .then(response => response.json())
    .then(data => {
        var words = data;
        i = 0;
        setInterval(function(){ $('#words').fadeOut(function(){
        $(this).html(words[(i = (i + 1) % words.length)]).fadeIn();
        }); }, 3000)
    })
    .catch(error => console.error('Error:', error));
})();