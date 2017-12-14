var start = function(){
    var content = $('body .content');
    var windowWidth = $(window).width();
    
    //PAGINA DE INICIO
    content.load('p1.html');
    
    
    ////////////////////****************** PAGINADOR *************************///////////////////////
    //VARIABLES
    var paginatorContent = $('.paginator');
    var controlButton = $('.paginator .control');
    var paginator = $('li a.page');
    var limitL, limitR;
    
    
    //FUNCIONES
    var updateContent = function(a){
        for (var i=0; i < paginatorContent.length; i++) {
            paginatorContent.eq(i).find('li a.page').removeClass('active'); 
            
                paginatorContent.eq(i).find('li a.page').each(function(index, element){
                    if($(this).data('page') == a ) {
                        $(this).addClass('active');
                        paginatorContent.eq(i).find('li a.page').parent('li').removeClass('block');
                        var maxWidth = (($('.paginator li').length)/2)-4;
                        
                        //CODIGO PARA 5 PAGINAS
                        paginatorContent.eq(i).find('li a.page').parent('li').removeClass('block');
                        $(this).parent('li').prevUntil(1).addClass('block');
                        $(this).parent('li').nextUntil(5).addClass('block');
                        $(this).parent('li').addClass('block');
                        
                            
                        /*CODIGO PARA MAS DE 5 PAGINAS
                        if (a > 2 && a < maxWidth ) {
                            var limitL = $('.paginator li:nth-child('+(a-2)+')');
                            var limitR = $('.paginator li:nth-child('+(a+4)+')');
                        }
                        else if (a<=2) {
                            var limitL = $('.paginator li:nth-child(1)');
                            var limitR = $('.paginator li:nth-child(7)');
                        }
                        else if (a >= maxWidth ) {
                            var limitL = $('.paginator li:nth-child('+(maxWidth-2)+')');
                            var limitR = $('.paginator li:nth-child('+(maxWidth+4)+')');
                        }
                        $(this).parent('li').prevUntil(limitL).addClass('block');
                        $(this).parent('li').nextUntil(limitR).addClass('block');
                        $(this).parent('li').addClass('block');*/
                    }
                })
                content.find('.gears').remove();
                content.load('p'+a+'.html');
            }
    }
    
    
    //PAGINAS
    paginator.on('click', function(event){
        event.preventDefault();
        updateContent($(this).data('page'));
    })
    
    //BOTON NEXT Y PREV
    controlButton.on('click', function(event){
        event.preventDefault();
        var active = paginatorContent.find('li a.page.active').data('page');
        
        if ( $(this).attr('id') == 'left' ) {
            if ( (active > 1) ) {
                updateContent(active-1);
            }
            else {
                updateContent(1); 
            }    
        }
        else {
            if (active < $('#topPaginator li a.page').length) {
                updateContent(active+1);
            }
            else {
                updateContent($('#topPaginator li a.page').length);
            }
        }
    })
    
    
    ////////////////////****************** FILTRADOR *************************///////////////////////
    //VARIABLES
    var filtrador = $('input.filter');
    var filterLength = 0;
   
    filtrador.on('ifChecked', function(event){
        if ($(this).prop('checked')) {
            localStorage.setItem('filterChoose', $(this).val());
            window.location.replace("filtrador.html");
        }
        
    })
    $('.toogleBox').on('click', function(){
        $(this).toggleClass('open');
        $(this).parents('#filterBox').toggleClass('active');
    })
        
    
    /////////////////********************* MENU ********************************/////////////////
    $('#mainMenu').slicknav({
        label: '',
        prependTo: '#menu'
    });
    
    var url = window.location.href;
    url.indexOf('/equipos')!=-1 ?  $('#menu').append('<a id="logo" href="../../index.html"><img src="../../img/att-logo.png" alt="ATT"> <span>AT&T</span></a>') : $('#menu').append('<a id="logo" href="index.html"><img src="img/att-logo.png" alt="ATT"> <span>AT&T</span></a>') ;
    
    $('#menu .slicknav_btn').on('click', function(){
        $('.paginator#topPaginator').toggleClass('move');
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
    
    //////////****** CARROUSEL *********////////////////////
    $('#main-slider').flexslider({
        animation: "slide",
    	controlNav: "thumbnails"
    });
    
    //////////****** TABS *********////////////////////
    var tabs = $('.tab');
    var contentTabs = $('.tabContent');
    
    tabs.each(function (){
        var current;
        
        $(this).on('click', function(){
            var current = $(this).data('content');            
            
            $(this).siblings('.tab').removeClass('active');
            $(this).addClass('active');
            
            contentTabs.each( function(){
                if ($(this).data('tab') == current ) {
                    $(this).fadeIn('slow');
                }
                else {
                    $(this).css('display','none');
                }
            })
        })
    })
    
}

$(document).on('ready', start);
