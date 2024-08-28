// JavaScript Document


$(".fv-list-n").click(function() {
    $(this).toggleClass("favlist");
    
  });
$(document).ready(function() {
    var mixer = mixitup('.bd-part');
});
$(document).ready(function() {
    $(function () {
        $("#datepicker").datepicker({ 
            autoclose: true, 
            todayHighlight: true
        }).datepicker('update', new Date());
    });
});

$(document).ready(function() {
    $(function () {
        $("#datepicker2").datepicker({ 
            autoclose: true, 
            todayHighlight: true
        }).datepicker('update', new Date());
    });
});




$(document).ready(function() {
    $(".wish-list").click(function() {
        $(this).toggleClass("favlist");
        
    });
});

$(document).ready(function() {
    var figure = $(".comon-focus").hover( hoverVideo, hideVideo );

    function hoverVideo(e) {
        $('video', this).get(0).play();
    }
    function hideVideo(e) {
        $('video', this).get(0).pause();
    }
});
$(document).ready(function() {
    $( window ).scroll(function() {
          var height = $(window).scrollTop();
          if(height >= 100) {
              $('.main-menu-div').addClass('fixed-menu');
          } else {
              $('.main-menu-div').removeClass('fixed-menu');
          }
      });
  });
  $(document).ready(function() {
    window.addEventListener('load', async () => {
      let video = document.querySelector('video[muted][autoplay]');
      try {
        await video.play();
      } catch (err) {
        video.controls = true;
      }
    });

  });

  $(document).ready(function(){
    $('.service-slider').owlCarousel({
        loop: true,
        margin: 35,
        autoplay:true,
        nav:true,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1000: {
                items:3
            },
            1200: {
                items:4
            }
        }
    })


    $('.place-slider').owlCarousel({
        loop: true,
        margin: 35,
        autoplay:true,
        nav:false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1000: {
                items:3
            },
            1200: {
                items:6
            }
        }
    })


    $('.sub-page-testmonials').owlCarousel({
        loop: true,
        margin: 35,
        autoplay:true,
        nav:false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:1
            },
            1000: {
                items:1
            },
            1200: {
                items:1
            }
        }
    })


    


    $('.package-deals1').owlCarousel({
        loop: true,
        margin: 35,
        autoplay:true,
        nav:false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1000: {
                items:3
            },
            1200: {
                items:4
            }
        }
    })


    $('.package-deals2').owlCarousel({
        loop: true,
        margin: 35,
        autoplay:true,
        nav:false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1000: {
                items:3
            },
            1200: {
                items:4
            }
        }
    })

    

    
	$('.latest-blog').owlCarousel({
        loop: true,
		autoplay:true,
        margin:40,
        nav: false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1024: {
              items:3
          }
        }
    })

    $('.testimonals-slide').owlCarousel({
        loop: true,
		autoplay:true,
        margin:40,
        nav: false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1024: {
              items:3
          }
        }
    })

    $('.client-slide').owlCarousel({
        
		autoplay:true,
        margin:40,
        loop:true,
        nav: false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:2
            },
            1024: {
              items:5
          }
        }
    })


    $('.pages-slider').owlCarousel({
        
		autoplay:true,
        margin:40,
        loop:true,
        nav: false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:1
            },
            1024: {
              items:1
          }
        }
    })


    $('.linke-aloso').owlCarousel({
        
		autoplay:true,
        margin:40,
        loop:true,
        nav: false,
		dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768: {
                items:1
            },
            1024: {
              items:2
          }
        }
    })



    

    
});


// load more



$(document).ready(function(){
    $(".colm").show();
    $("#seeMore").click(function(e){
      e.preventDefault();
      $(".colm:hidden").fadeIn("slow");
      
      if($(".colm:hidden").length == 0){
         $("#seeMore").fadeOut("slow");
        }
    });
  })


  $(document).ready(function(){
    $(".collist").show();
    $("#seeMore2").click(function(e){
      e.preventDefault();
      $(".collist:hidden").fadeIn("slow");
     
    });
  })


  //-----JS for Price Range slider-----

  function getVals(){
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
      let slide1 = parseFloat( slides[0].value );
      let slide2 = parseFloat( slides[1].value );
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    let displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = "₹" + slide1 + " - ₹" + slide2;
  }
  
  window.onload = function(){
    // Initialize Sliders
    let sliderSections = document.getElementsByClassName("range-slider");
        for( let x = 0; x < sliderSections.length; x++ ){
          let sliders = sliderSections[x].getElementsByTagName("input");
          for( let y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
  }


  $(document).ready(function () {
	$(".star label").click(function(){
	  $(this).parent().find("label").css({"background-color": "#a2be2d"});
	  $(this).css({"background-color": "#a2be2d"});
	  $(this).nextAll().css({"background-color": "#a2be2d"});
	});
	$(".star label").click(function(){
	  $(this).parent().find(".star label").css({"color": "#bbb"});
	  $(this).css({"color": "#a2be2d"});
	  $(this).nextAll().css({"color": "#a2be2d"});
	  $(this).css({"background-color": "transparent"});
	  $(this).nextAll().css({"background-color": "transparent"});
	});
});


// products list grid js
$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
    $('#list').click(function(event){event.preventDefault();$('#products .item').removeClass('grid-group-item');});
  });
  
$(document).ready(function(){
$('.listed-bn ul li a').click(function(){
    $('.listed-bn li a').removeClass("active");
    $(this).addClass("active");
});
});


//  bank js
$(document).ready(function(){
    $("#customRadio1").click(function(){
      $("#ac-2").hide();
    });
    $("#customRadio1").click(function(){
      $("#ac-1").show();
    });
     $("#customRadio2").click(function(){
      $("#ac-1").hide();
    });
    $("#customRadio2").click(function(){
      $("#ac-2").show();
    });
  });



// quantity js

$(document).ready(function(){
           
    var QtyInput = (function () {
        var $qtyInputs = $(".qty-input");
    
        if (!$qtyInputs.length) {
            return;
        }
    
        var $inputs = $qtyInputs.find(".product-qty");
        var $countBtn = $qtyInputs.find(".qty-count");
        var qtyMin = parseInt($inputs.attr("min"));
        var qtyMax = parseInt($inputs.attr("max"));
    
        $inputs.change(function () {
            var $this = $(this);
            var $minusBtn = $this.siblings(".qty-count--minus");
            var $addBtn = $this.siblings(".qty-count--add");
            var qty = parseInt($this.val());
    
            if (isNaN(qty) || qty <= qtyMin) {
                $this.val(qtyMin);
                $minusBtn.attr("disabled", true);
            } else {
                $minusBtn.attr("disabled", false);
    
                if (qty >= qtyMax) {
                    $this.val(qtyMax);
                    $addBtn.attr("disabled", true);
                } else {
                    $this.val(qty);
                    $addBtn.attr("disabled", false);
                }
            }
        });
    
        $countBtn.click(function () {
            var operator = this.dataset.action;
            var $this = $(this);
            var $input = $this.siblings(".product-qty");
            var qty = parseInt($input.val());
    
            if (operator == "add") {
                qty += 1;
                if (qty >= qtyMin + 1) {
                    $this.siblings(".qty-count--minus").attr("disabled", false);
                }
    
                if (qty >= qtyMax) {
                    $this.attr("disabled", true);
                }
            } else {
                qty = qty <= qtyMin ? qtyMin : (qty -= 1);
    
                if (qty == qtyMin) {
                    $this.attr("disabled", true);
                }
    
                if (qty < qtyMax) {
                    $this.siblings(".qty-count--add").attr("disabled", false);
                }
            }
    
            $input.val(qty);
        });
    })();
    
});


// add room


$(document).ready(function(){
    $('#extra-fields-customer-add-booking').click(function() {
    $('.customer_records-add-booking').clone().appendTo('.customer_records_dynamic-add-booking');
    $('.customer_records_dynamic-add-booking .customer_records-add-booking').addClass('single remove');
    $('.single .extra-fields-customer-add-booking').remove();
    $('.single').append('<a href="#" class="remove-field btn-remove-customer col-1"> <img src="images/dl-icon.svg" al="bt"/>  </a>');
    $('.customer_records_dynamic-add-booking > .single').attr("class", "row mt-3 align-items-center remove");
  
    $('.customer_records_dynamic-add-booking input').each(function() {
      var count = 0;
      var fieldname = $(this).attr("name");
      $(this).attr('name', fieldname + count);
      count++;
    });
  
  
  
  });
  });
  $(document).on('click', '.remove-field', function(e) {
  $(this).parent('.remove').remove();
  e.preventDefault();
  });


// datepicker
  $(document).ready(function () {
    $('#example').DataTable();
});

$(document).ready(function () {
    $('#example2').DataTable();
});



$(document).ready(function () {
var form_ele = '.form';

// make eveything disabled
var disableFormEdit = function(selector){	
  $(selector).removeClass('form--enabled').addClass('form--disabled');
	$(selector + ' input, ' + selector + ' select, ' + selector + ' button').prop('disabled', true);
}


// make eveything enabled
var enableFormEdit = function(selector){	
	$(selector + ' input, ' + selector + ' select, ' + selector + ' button ').prop('disabled', false);
  $(selector).removeClass('form--disabled').addClass('form--enabled');
}


disableFormEdit(form_ele);


$('.js-toggleForm').click(function(){
   // get the status of form
  var form_status = $(form_ele).hasClass('form--disabled') ? 'disabled' : 'enabled';
  
  // check if disabled or enabled
  switch (form_status){
    case 'disabled':
      enableFormEdit(form_ele);
      $(this).text('Save')
      break;
    case 'enabled':
      disableFormEdit(form_ele);
      $(this).text('Edit Profile')
      break;
  }
});

});


document.getElementById('registerBtn').addEventListener('click', function () {
    const fullName = document.getElementById('fullName').value;
    const emailOrPhone = document.getElementById('emailOrPhoneId').value;
    const password = document.getElementById('passwordId').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsCheck = document.getElementById('exampleCheck1').checked;

    if (!termsCheck) {
        alert('You must agree to the terms and conditions.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const requestData = {
        name: fullName,
        email: emailOrPhone,
        password: password,
        confirmPassword: confirmPassword
    };

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Please try after sometime.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Registration successful!');
        $('#registerModal').modal('hide'); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed.');
    });
});


document.getElementById('loginBtn').addEventListener('click', function () {

    const emailOrPhone = document.getElementById('emailOrPhone').value;
    const password = document.getElementById('password').value;

    const requestData = {
        email: emailOrPhone,
        password: password
    };

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Please try after sometime.');
        }
    

        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
       
       
        localStorage.setItem('isUserLoggedIn', "true");
        localStorage.setItem('userId', data.id);
        var myAccount = document.getElementById("myAccount");
        var loginId = document.getElementById("loginId");
        $('#loginModal').modal('hide'); 
        myAccount.style.display = "block";
        loginId.style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed.');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var isLoggedIn = checkUserLoggedIn(); 

    if (isLoggedIn) {
        document.getElementById('loginId').style.display = 'none';
        document.getElementById('myAccount').style.display = 'block';
    } else {
        document.getElementById('loginId').style.display = 'block';
        document.getElementById('myAccount').style.display = 'none';
    }
});

document.getElementById('logOut').addEventListener('click', function () {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('userId');// Delete the cookie
    window.location.href = "index.html";
    document.getElementById('loginId').style.display = 'inline';
    document.getElementById('myAccount').style.display = 'none';
});

function checkUserLoggedIn() {
    var isLoggedIn = localStorage.getItem('isUserLoggedIn'); 
    console.log(isLoggedIn);
    if(isLoggedIn){
        return true;
    }
    return false;
}

function setCookie(name, value, days) {
   
    var expires = "";
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
   
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    console.log(ca);
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

document.getElementById('adminPanelId').addEventListener('click', function () {
    console.log("called");
    var userId = localStorage.getItem('userId');
    
    window.location.href = 'adminpanel/admin.html?userId='+userId;
});