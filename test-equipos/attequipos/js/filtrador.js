var start = function(){
    var content = $('body .content');
    var filtrador = $('input.filter');
    var windowWidth = $(window).width();
    var allViews = ['p1.html', 'p2.html', 'p3.html', 'p4.html', 'p5.html','p6.html','p7.html'];
    
    //TRIGGER FILTER
    filtrador.each( function( index, element) {
        if (element.value == localStorage.getItem('filterChoose')) {
            element.checked = true;
            
        }
    })
    
    //CARGAR EL CONTENIDO
    templates.load(allViews, "body .content");
    
    
    //MENU
    $('#mainMenu').slicknav({
        label: '',
        prependTo: '#menu'
    });
    
    $('#menu').append('<a id="logo" href="index.html"><img src="img/att-logo.png" alt="ATT"> <span>AT&T</span></a>')
    
    $('.toogleBox').on('click', function(){
        $(this).toggleClass('open');
        $(this).parents('#filterBox').toggleClass('active');
    })
    
     ///////////***** CONTENT **********/////////////////////
    if ( windowWidth >= 1200) {
        $( ".desktopContent" ).wrapAll( "<div class='standard' />");
    }
    
    
    
    /////////////////********************* ICHECK ********************************/////////////////
    $('input.filter').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%' // optional
    });
    
}

$(document).on('ready', start);


//CARGAR TODO EL CONTENIDO
var templates = (function ($) {
   return {
    load: function (templateArray, target) {
        var defferArray = [];
        $.each(templateArray, function (idx, url) {
            var loader = $.get(url)
                .success(function (data) {
                    $(target).append(data);
                })
            defferArray.push(loader);
        })

        $.when.apply(null, defferArray).done(function () {
            console.log(localStorage.getItem('filterChoose'));
            var item = $('.item');
            var filters = $('input.filter');
            var c = 1;
            
            item.each( function(){
                $(this).css('display', 'none');
                if ( $(this).data('filter') == localStorage.getItem('filterChoose')){
                    $(this).css('display','block');
                }
            })
            
            filters.on('ifChecked', function (event){
                var filtradorClase = event.delegateTarget.value;
                
                if ( $(event.delegateTarget).on('ifToggled') ) {
                    $(item).each( function(){
                        if (filtradorClase == $(this).data('filter')){
                            $(this).fadeIn();
                        }
                    })
                    c += 1;
                }
            })
             
            filters.on('ifUnchecked', function(event){
                var filtradorClase = event.delegateTarget.value;
                 $(item).each( function(){
                    if (filtradorClase == $(this).data('filter')){
                        $(this).fadeOut();
                    }
                })
                c -= 1;
                if (c==0){
                    localStorage.removeItem('filterChoose');
                    window.location.replace("index.html");
                }
            })
        });
    }
};
})(jQuery);