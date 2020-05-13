$(document).ready(function() {
    $('.button').on('click', function() {
        let planet = $(this).text().trim()
        console.log(planet)
    })
    $('.button2').on('click', function() {
        let planet = $(this).text().trim()
        console.log(planet)
    })
    $.ajax({
        url: 'https://api.nasa.gov/planetary/apod?api_key=cVxqhuu8gexD4U5kFQCInoUyj3zRBgN4b8Qsh4qo',
        method: 'GET'
    })
    .then(function(response){
        console.log(response)
    $('.card img').attr('src', response.url)
    $('.card-title').text(response.title)
    })
})