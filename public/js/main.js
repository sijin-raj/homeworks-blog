
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



  const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
  


  



})(jQuery);

// Clients carousel (uses the Owl Carousel library)

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

// addUserImagePicker.addEventListener('change',e => {
//   console.log('adder',e.target.files)
//   file = e.target.files
// })

// Create element and render users
const renderUser = doc => {
  
 
  const tr = `


    
						<div class="flex-1  mt-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg  "  data-id='${doc.id}'>
							<a href="postView.html?projectid=${doc.id}" class="flex flex-wrap no-underline hover:no-underline">
								<img   src="${doc.data().image}" class="h-64 w-full rounded-t pb-6">
								<p class="w-full text-gray-600 text-xs md:text-sm px-6">${doc.data().clientName}</p>
								<div class="w-full  font-bold text-xl text-gray-900 px-6">${doc.data().projectName}</div>
								<p class="text-gray-800 font-serif text-base px-6 mb-5">
								</p>
							</a>
              <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden p-6">
							<div class="flex items-center justify-between">
								<img class="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src="http://i.pravatar.cc/300" alt="Avatar of Author">
								<p class="text-gray-600 text-xs md:text-sm">${doc.data().projectDuration} MIN READ</p>
							</div>
						</div
						</div>

  `;
  
  tableUsers.insertAdjacentHTML('beforeend', tr);

}

  

var first = db.collection("blogs").limit(100);
        first.get().then(function (documentSnapshots) {
        documentSnapshots.docs.forEach(doc => {
            
            renderUser(doc)

        });
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    });

    $("#js-previous").on('click', function () {
      var previous = db.collection("blogs")
          .endBefore(firstVisible)
          .limitToLast(3);
      previous.get().then(function (documentSnapshots) {
          documentSnapshots.docs.forEach(doc => {
              renderEmployee(doc);
          });
      });
  });
  










// var docRef = db.collection('blogs');

// docRef.get().then(function(doc) {
//     if (doc.docs) {
//         console.log("Document data:", doc.docs);
//         // let projectid = 
//         doc.docs.map(document => {
//           renderUser(document)
//         })
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

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
