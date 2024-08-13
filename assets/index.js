// Function to open the allImagesmodel and activate the specified tab
function openAllImagesModel(tabClass) {
    
    // Remove the active class from all tabs and galleries
    document.querySelectorAll('.tabsnav .nav').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sidebarGallery .imgGallery').forEach(gallery => {
        gallery.classList.remove('active');
        gallery.style.display = 'none'; // Hide all galleries
    });

    // Add the active class to the specified tab and gallery
    document.querySelector(`.tabsnav .${tabClass}`).classList.add('active');
    const activeGallery = document.querySelector(`.sidebarGallery .${tabClass}`);
    activeGallery.classList.add('active');
    activeGallery.style.display = 'inline-flex'; // Display the active gallery as flex

    // Open the allImagesmodel
    document.querySelector('.allImagesmodel').style.left = '0';
}

// Event listener for clicking on the featureImages section
document.querySelector('.featureImages').addEventListener('click', function (event) {
    if (event.target.closest('.mainImage')) {
        openAllImagesModel('allImages');
    } else if (event.target.closest('.featureimgBox:nth-child(1)')) {
        openAllImagesModel('destinations');
    } else if (event.target.closest('.featureimgBox:nth-child(2)')) {
        openAllImagesModel('properties');
    } else if (event.target.closest('.featureimgBox:nth-child(3)')) {
        openAllImagesModel('activities');
    } else if (event.target.closest('.featureimgBox:nth-child(4)')) {
        openAllImagesModel('allImages'); // Adjust this if the fourth box should open another specific tab
    }
});

// Event listener for the back button
document.querySelector('.back-button').addEventListener('click', function () {
    document.querySelector('.allImagesmodel').style.left = '-100vw';
});

// Event listener for tab switching within the allImagesmodel
document.querySelectorAll('.tabsnav .nav').forEach(tab => {
    tab.addEventListener('click', function () {
        const tabClass = tab.classList[1]; // Assuming the second class is the tab identifier
        openAllImagesModel(tabClass);
    });
});


// Currency Modal

document.addEventListener("DOMContentLoaded", function() {
    // Select the elements
    const currency = document.querySelector('.currency');
    const modal = document.querySelector('.currenciesModal');
    const closeBtn = document.querySelector('.closeBtn');

    // Add click event listener to the "currency" element
    currency.addEventListener('click', function() {
        modal.style.display = 'inline-flex';
    });

    // Add click event listener to the "Close" button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Add a click event listener to the window to close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
// Feature image tabs

document.addEventListener('DOMContentLoaded', function () {
    // Select all tab buttons
    const tabs = document.querySelectorAll('.tabsnav .nav');
    
    // Select all image galleries
    const galleries = document.querySelectorAll('.imgGallery');

    // Function to deactivate all tabs and hide all galleries
    function deactivateAllTabs() {
        tabs.forEach(tab => tab.classList.remove('active'));
        galleries.forEach(gallery => gallery.style.display = 'none');
    }

    // Function to activate a tab and show the corresponding gallery
    function activateTab(tab, galleryClass) {
        tab.classList.add('active');
        document.querySelector(`.imgGallery.${galleryClass}`).style.display = 'inline-flex';
    }

    // Add click event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            deactivateAllTabs();
            activateTab(tab, tab.classList[1]);
        });
    });

    // Initialize the default active tab
    const defaultTab = document.querySelector('.tabsnav .nav.active');
    if (defaultTab) {
        activateTab(defaultTab, defaultTab.classList[1]);
    }
});


// Custom Gallery modal

document.addEventListener('DOMContentLoaded', () => {
    loadIndexJs();
});

function loadIndexJs(){
    const navItems = document.querySelectorAll('.tabsnav .nav');
    const galleries = document.querySelectorAll('.imgGallery');
    const modal = document.getElementById('mygalleryWindow');
    const span = document.getElementsByClassName('close')[0];
    
    navItems.forEach(nav => {
        nav.addEventListener('click', () => {
            navItems.forEach(item => item.classList.remove('active'));
            galleries.forEach(gallery => gallery.classList.remove('active'));
        
            nav.classList.add('active');
            document.querySelector(`.imgGallery.${nav.classList[1]}`).classList.add('active');
        });
    });
    
    document.querySelectorAll('.imgWrapper').forEach(imgWrapper => {
        
        imgWrapper.addEventListener('click', () => {

            modal.style.display = 'inline-flex';

        });
    });

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Second nav sticky

document.addEventListener("DOMContentLoaded", function() {
    const tourView = document.querySelector('.tourView .tabContent');
    const secondNav = document.querySelector('.secondNav');

    window.addEventListener('scroll', () => {
        const tourViewRect = tourView.getBoundingClientRect();

        if (tourViewRect.top <= 0 && tourViewRect.bottom > 0) {
            secondNav.classList.add('secondnavSticky');
        } 
        
        if (tourViewRect.bottom <= 0 || tourViewRect.top > 0) {
            secondNav.classList.remove('secondnavSticky');
        }
    });
});

// Tab TourView

document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".secondNav .tab");
    const tabContents = document.querySelectorAll(".tabContent .itinerarytabContent");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and tab contents
            tabs.forEach(tab => tab.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active class to the clicked tab and corresponding tab content
            tab.classList.add("active");
            tabContents[index].classList.add("active");
        });
    });
});

// Show Trips

document.addEventListener("DOMContentLoaded", function () {
  const moreTripsButton = document.querySelector(".moreTrips");
  const trips = document.querySelectorAll(".trips");
  let isShowingMore = false;

  function updateButton() {
      if (isShowingMore) {
          moreTripsButton.innerHTML = 'Show Less';
      } else {
          const hiddenTrips = document.querySelectorAll(".trips:not(.show)");
          //moreTripsButton.innerHTML = `+<span class="count">${hiddenTrips.length}</span> More`;
      }
  }

  function toggleTrips() {
      isShowingMore = !isShowingMore;
      trips.forEach((trip, index) => {
          if (index >= 3) {
              if (isShowingMore) {
                  trip.classList.add("show");
              } else {
                  trip.classList.remove("show");
              }
          }
      });
      updateButton();
  }

 // moreTripsButton.addEventListener("click", toggleTrips);

  updateButton();
});

// Info Modal

document.addEventListener("DOMContentLoaded", function() {
    // Select the elements
    const moreButton = document.querySelector('.more');
    const modal = document.querySelector('.additionalInformationModal');
    const closeButton = document.querySelector('.closeBtn');

    // Add click event listener to the "Read More" button
    moreButton.addEventListener('click', function() {
        modal.style.display = 'inline-flex';
    });

    // Add click event listener to the "Close" button
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
});


// Add show class to regular gallery
document.addEventListener('click', function(event) {
//document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'itinerary-img'
    var itineraryImages = document.querySelectorAll('.itinerary-img .owl-stage-outer');

    // Add click event listener to each of the elements
    itineraryImages.forEach(function(itineraryImage) {
        itineraryImage.addEventListener('click', function() {
            // Select all elements with the class 'regularGallery'
            var galleries = document.querySelectorAll('.regularGallery');

            // Add the 'show' class to each of the elements
            galleries.forEach(function(gallery) {
                gallery.classList.add('show');
            });
        });
    });

    // Select all elements with the class 'itinerary-img'
    var sharedImages = document.querySelectorAll('.sharedImg img');

    // Add click event listener to each of the elements
    sharedImages.forEach(function(sharedImage) {
        sharedImage.addEventListener('click', function() {
            // Select all elements with the class 'regularGallery'
            var galleries = document.querySelectorAll('.regularGallery');

            // Add the 'show' class to each of the elements
            galleries.forEach(function(gallery) {
                gallery.classList.add('show');
            });
        });
    });

    // Select all elements with the class 'gridGallery'
    var gridGalleries = document.querySelectorAll('.gridGallery');

    // Add click event listener to each of the elements
    gridGalleries.forEach(function(gridGallery) {
        gridGallery.addEventListener('click', function() {
            // Select all elements with the class 'regularGallery' and 'itinerary-img'
            var galleries = document.querySelectorAll('.regularGallery, .itinerary-img');

            // Add the 'show' class to each of the elements
            galleries.forEach(function(gallery) {
                gallery.classList.add('show');
            });
        });
    });

    // Select all close buttons within the regularGallery elements
    var closeButtons = document.querySelectorAll('.regularGallery .galleryWrapper .closeBtn .btnclose');

    // Add click event listener to each close button
    closeButtons.forEach(function(closeButton) {
        closeButton.addEventListener('click', function() {
            // Find the parent regularGallery element and remove the 'show' class
            var gallery = closeButton.closest('.regularGallery');
            if (gallery) {
                gallery.classList.remove('show');
            }
        });
    });
});

// // Stops
// document.querySelectorAll('.remainStops').forEach(function(button) {
//     button.addEventListener('click', function() {
//         const stopAccord = this.previousElementSibling;
//         const numberOfStops = stopAccord.querySelectorAll('.timeline').length;
//         if (stopAccord.classList.contains('show')) {
//             stopAccord.classList.remove('show');
//             this.textContent = `View ${numberOfStops} Stops`;
//         } else {
//             stopAccord.classList.add('show');
//             this.textContent = `Close ${numberOfStops} Stops`;
//         }
//     });
// });

// // Initial button text update based on the number of stops
// document.querySelectorAll('.remainStops').forEach(function(button) {
//     const stopAccord = button.previousElementSibling;
//     const numberOfStops = stopAccord.querySelectorAll('.timeline').length;
//     button.textContent = `View ${numberOfStops} Stops`;
// });

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('remainStops')) {
        const button = event.target;
        const stopAccord = button.previousElementSibling;
        const numberOfStops = stopAccord.querySelectorAll('.timeline').length;

        if (stopAccord.classList.contains('show')) {
            stopAccord.classList.remove('show');
            button.textContent = `View ${numberOfStops} Stops`;
        } else {
            stopAccord.classList.add('show');
            button.textContent = `Close ${numberOfStops} Stops`;
        }
    }
});

function updateButtonText() {
    document.querySelectorAll('.remainStops').forEach(function(button) {
        const stopAccord = button.previousElementSibling;
        const numberOfStops = stopAccord.querySelectorAll('.timeline').length;
        button.textContent = `View ${numberOfStops} Stops`;
    });
}

// allImagesmodel Script

function loadAllImagesModel(){
  
    const allImages = document.querySelectorAll('.sidebarGallery img:not(.location img)');
    const imgSrcMap = new Map();
    const imgTitleMap = new Map();
    let idCounter = 1;
    
    allImages.forEach((img) => {
        const src = img.getAttribute('src');
        const title =  img.getAttribute('alt');
    
        if (!imgSrcMap.has(src)) {
            imgSrcMap.set(src, idCounter);
            imgTitleMap.set(idCounter, title);
            idCounter++;
        }
        img.id = 'img' + imgSrcMap.get(src);
    });
   
    const galleryWindowCarousel = document.querySelector('.galleryWindow-carousel');
    galleryWindowCarousel.innerHTML = '';
    imgSrcMap.forEach((id, src) => {

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = imgTitleMap.get(id);

        const imgInfoDiv = document.createElement('div');
        imgInfoDiv.classList.add('imgInfo');

        const imgCapDiv = document.createElement('div');
        imgCapDiv.classList.add('imgCap');
        imgCapDiv.innerText = '';// imgTitleMap.get(id);

        imgInfoDiv.appendChild(imgCapDiv);
        itemDiv.appendChild(imgElement);
        itemDiv.appendChild(imgInfoDiv);
        galleryWindowCarousel.appendChild(itemDiv);
    });

    const totalSlide = document.querySelector('.titleCount .totalSlide');
    totalSlide.innerText = imgSrcMap.size;
    
    const $carousel = $('.galleryWindow-carousel');
    
    // Destroy the existing carousel instance if it exists
    if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel').removeClass('owl-loaded');
    }
    $carousel.owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 1,
        dots: false,
        navText: [
            '<i class="fa fa-chevron-left"></i>',
            '<i class="fa fa-chevron-right"></i>'
        ]
    });

    const mygalleryWindow = document.getElementById('mygalleryWindow');
    const closeBtn = document.querySelector('.mygalleryWindow .close');
    const currentSlideElement = document.querySelector('.current');

    function updateCurrentSlide(index) {
        const title = document.querySelector('.titleCount .imgText');
        title.innerText = imgTitleMap.get(index + 1);

        currentSlideElement.innerText = index + 1;

        const allImgWrapper = document.querySelector('.allImg .imgWrapper');
        const allImgElements = allImgWrapper.querySelectorAll('img');
        allImgElements.forEach((img, idx) => {
            img.classList.toggle('active', idx === index);
        });
    }

    function setCarouselToIndex(index) {
        $(".owl-carousel").trigger('to.owl.carousel', [index, 300]);
    }

    allImages.forEach((img) => {
        img.addEventListener('click', () => {
            mygalleryWindow.style.display = 'block';
            const currentIndex = [...imgSrcMap.keys()].indexOf(img.getAttribute('src'));
            setCarouselToIndex(currentIndex);
            updateCurrentSlide(currentIndex);
        });
    });

    $('.galleryWindow-carousel').on('changed.owl.carousel', function(event) {
        const currentIndex = event.item.index % imgSrcMap.size;
        updateCurrentSlide(currentIndex);
    });

    closeBtn.addEventListener('click', () => {
        mygalleryWindow.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === mygalleryWindow) {
            mygalleryWindow.style.display = 'none';
        }
    });

    const allImgWrapper = document.querySelector('.allImg .imgWrapper');
    allImgWrapper.innerHTML = '';

    imgSrcMap.forEach((id, src) => {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = '';
        imgElement.id = 'img' + id;

        imgElement.addEventListener('click', () => {
            const index = [...imgSrcMap.keys()].indexOf(src);
            setCarouselToIndex(index);
            updateCurrentSlide(index);
        });

        allImgWrapper.appendChild(imgElement);
    });

    updateCurrentSlide(0);

    const navPrev = document.querySelector('.allImg .navPrev');
    const navNext = document.querySelector('.allImg .navNext');

    navPrev.addEventListener('click', () => {
        const activeImg = document.querySelector('.allImg .imgWrapper img.active');
        if (activeImg) {
            const currentIndex = [...imgSrcMap.keys()].indexOf(activeImg.getAttribute('src'));
            const newIndex = (currentIndex - 1 + imgSrcMap.size) % imgSrcMap.size;
            setCarouselToIndex(newIndex);
            updateCurrentSlide(newIndex);
        }
    });

    navNext.addEventListener('click', () => {
        const activeImg = document.querySelector('.allImg .imgWrapper img.active');
        if (activeImg) {
            const currentIndex = [...imgSrcMap.keys()].indexOf(activeImg.getAttribute('src'));
            const newIndex = (currentIndex + 1) % imgSrcMap.size;
            setCarouselToIndex(newIndex);
            updateCurrentSlide(newIndex);
        }
    });
}

