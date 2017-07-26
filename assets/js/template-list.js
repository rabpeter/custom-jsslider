$('.scroll-template').click(function() {
    $('#showcase2').css('display', '');
    $('#header').css('display', 'none');
    $('#showcase').css('display', 'none');
    var current_showcase = $('.showcase-current').attr('data-template');
    $('#iframe-showcase[template-id="'+current_showcase+'"]').addClass('active');

});
$('#toggle-template').click(function() {
    $('.template').removeClass('template-closed');
});
$('#close-template').click(function() {
    $('.template').addClass('template-closed');
});
// Process event when  Click template item to show iframe
$('.template-link').on('click', function() {
    if($(this).attr('data-template') === 'home') {
        if($('#showcase2').css('display') === 'none') {
            console.log('home');
        } else {
            $('#showcase2').css('display', 'none'); 
            $('#header').css('display', '');
            $('#showcase').css('display', '');
        }
    } else {
        $('#showcase2').css('display', '');
        $('#header').css('display', 'none');
        $('#showcase').css('display', 'none');
        $('.iframe-template').removeClass('active');
        var target = $(this).attr('data-template'); 
        $('#iframe-showcase[template-id="'+target+'"]').addClass('active');
    }
});

