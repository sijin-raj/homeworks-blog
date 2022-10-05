
!(function($) {
    "use strict";
  
    // Preloader
    $(window).on('load', function() {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
          $(this).remove();
        });
      }
    });
  
    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 1;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();
  
          var scrollto = target.offset().top - scrolltoOffset;
  
          if ($(this).attr("href") == '#header') {
            scrollto = 0;
          }
  
          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');
  
          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }
  
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-overly').fadeOut();
          }
          return false;
        }
      }
    });
  
    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
      if (window.location.hash) {
        var initial_nav = window.location.hash;
        if ($(initial_nav).length) {
          var scrollto = $(initial_nav).offset().top - scrolltoOffset;
          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');
        }
      }
    });
  
    // Mobile Navigation
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('.mobile-nav').prepend('<button type="button" class="mobile-nav-close"><i class="icofont-close"></i></button>');
      $('#header').append('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
  
      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-overly').toggle();
      });
  
      $(document).on('click', '.mobile-nav-close', function(e) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-overly').fadeOut();
      });
  
      $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
      });
  
      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }
  
    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
        $('#topbar').addClass('topbar-scrolled');
      } else {
        $('#header').removeClass('header-scrolled');
        $('#topbar').removeClass('topbar-scrolled');
      }
    });
  
    if ($(window).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    }
  
    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, .mobile-nav');
  
    $(window).on('scroll', function() {
      var cur_pos = $(this).scrollTop() + 200;
  
      nav_sections.each(function() {
        var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();
  
        if (cur_pos >= top && cur_pos <= bottom) {
          if (cur_pos <= bottom) {
            main_nav.find('li').removeClass('active');
          }
          main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
        }
        if (cur_pos < 300) {
          $(".nav-menu ul:first li:first").addClass('active');
        }
      });
    });
  
    // Back to top button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
  
    $('.back-to-top').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });
  

  

    
  
  
  

  })(jQuery);
  
  
  const addUserImagePicker = document.querySelector('#addimage')
  let file = []
  const modalWrapper = document.querySelector('.modal-wrapper');
  // modal add
  const addModal = document.querySelector('.add-modal');
  const addModalForm = document.querySelector('.add-modal .form');
  
  // modal edit
  const editModal = document.querySelector('.edit-modal');
  const editModalForm = document.querySelector('.edit-modal .form');
  
  const btnAdd = document.querySelector('.btn-add');
  
  const tableUsers = document.querySelector('.table-users');
  
  let id;
  
  
  
  // Create element and render users
  const renderUser = doc => {
  //  console.log('doc',doc) 
    const tr = `


    <div class="  sm:ml-10 lg:ml-28 mb-10"   data-id='${doc.id}'>
    <!--Lead Para-->

    <!--Title-->
    <div class="text-center   pt-5 md:pt-32">
    <p class="text-2xl md:text-3xl px-10 font-bold mb-5">
    ${doc.projectName}
  </p>
    </div>
    
<div class=" items-center px-8 justify-center">
  <img class="container sm:w-1/4 lg:w-full max-w-4xl   absloute mx-auto bg-white bg-cover rounded" src="${doc.image}" height="55vh"></img>
</div>

<div class="container max-w-5xl mx-auto ">
		
<div class="mx-0 sm:mx-6">
  
  <div class="mt-8 bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
    
    <!--Post Content-->
    

   

    <h1 class="font-bold break-normal text-base font-sans pb-2 text-[#1da1f2]  ">#${doc.clientName}</h1>

    <p class="py-6 font-sans ">${doc.projectDescription}</p>				
  
    <p class="py-6 font-sans ">${doc.projectPara1}</p>
    
    <img src="${doc.image1}" class="w-full max-w-4xl mx-auto mt-2 rounded" height="55vh"/>

    <p class="py-6 font-sans">${doc.projectPara2}</p>

    <p class="py-6 font-sans">${doc.projectPara3}</p>


    <p class="py-6 font-sans">${doc.projectPara4}</p>

                    
        
  </div>








  </div>
  </div>

    </div> 


    `;
    tableUsers.insertAdjacentHTML('beforeend', tr);
  
    
  
  }
  
  Share = {
    facebook: function(purl, ptitle, pimg, text) {
    url = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent(ptitle);
    url += '&p[summary]=' + encodeURIComponent(text);
    url += '&p[url]=' + encodeURIComponent(purl);
    url += '&p[images][0]=' + encodeURIComponent(pimg);
    Share.popup(url);
    },
    twitter: function(purl, ptitle) {
    url = 'http://twitter.com/share?';
    url += 'text=' + encodeURIComponent(ptitle);
    url += '&url=' + encodeURIComponent(purl);
    url += '&counturl=' + encodeURIComponent(purl);
    Share.popup(url);
    },
    popup: function(url) {
    window.open(url,'','toolbar=0,status=0,width=626, height=436');
    }
    };
    
  
  
  
  
  
  
  // Get all users
  // db.collection('users').get().then(querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //     renderUser(doc);
  //   })
  // });
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };

  
  var docRef = db.collection('blogs');
  
  docRef.get().then(function(doc) {
      if (doc.docs) {
          // console.log("Document data:", doc.docs);
          // doc.docs.map(d=> console.log(d.data()))
          let projectid = getUrlParameter("projectid")
          // console.log(projectid)
          doc.docs.map(document => {
            // console.log(`document id`,document.id)
            if(document.id == projectid )
            renderUser(document.data())
          })
          // doc.docs.map(document => {
          //   renderUser(document)
          // })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  // Real time listener
  // db.collection('users').onSnapshot(snapshot => {
  //   snapshot.docChanges().forEach(change => {
  //     console.log('hiii',change.doc.data())
  //     if(change.type === 'added') {
  //       renderUser(change.doc);
  //     }
  //     if(change.type === 'removed') {
  //       let tr = document.querySelector(`[data-id='${change.doc.id}']`);
  //       let tbody = tr.parentElement;
  //       tableUsers.removeChild(tbody);
  //     }
  //     if(change.type === 'modified') {
  //       let tr = document.querySelector(`[data-id='${change.doc.id}']`);
  //       let tbody = tr.parentElement;
  //       tableUsers.removeChild(tbody);
  //       renderUser(change.doc);
  //     }
  //   })
  // })
  
  
  
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('myParam');
  