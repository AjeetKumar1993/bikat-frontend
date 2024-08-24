// Function to open the allImagesmodel and activate the specified tab
function openAllImagesModel(tabClass) {
    document
      .querySelectorAll(".tabsnav .nav")
      .forEach((tab) => tab.classList.remove("active"));
    document
      .querySelectorAll(".sidebarGallery .imgGallery")
      .forEach((gallery) => {
        gallery.classList.remove("active");
        gallery.style.display = "none";
      });
  
    document.querySelector(`.tabsnav .${tabClass}`).classList.add("active");
    const activeGallery = document.querySelector(`.sidebarGallery .${tabClass}`);
    activeGallery.classList.add("active");
    activeGallery.style.display = "inline-flex";
  
    document.querySelector(".allImagesmodel").style.left = "0";
  }
  
  // Event listener for clicking on the featureImages section
  document
    .querySelector(".featureImages")
    .addEventListener("click", function (event) {
      if (event.target.closest(".mainImage")) {
        openAllImagesModel("allImages");
      } else if (event.target.closest(".featureimgBox:nth-child(1)")) {
        openAllImagesModel("destinations");
      } else if (event.target.closest(".featureimgBox:nth-child(2)")) {
        openAllImagesModel("properties");
      } else if (event.target.closest(".featureimgBox:nth-child(3)")) {
        openAllImagesModel("activities");
      } else if (event.target.closest(".featureimgBox:nth-child(4)")) {
        openAllImagesModel("allImages");
      }
    });
  
  // Event listener for the back button
  document.querySelector(".back-button").addEventListener("click", function () {
    document.querySelector(".allImagesmodel").style.left = "-100vw";
  });
  
  // Event listener for tab switching within the allImagesmodel
  document.querySelectorAll(".tabsnav .nav").forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabClass = tab.classList[1];
      openAllImagesModel(tabClass);
    });
  });
  
  // Currency Modal
  document.addEventListener("DOMContentLoaded", function () {
    const currency = document.querySelector(".currency");
    const modal = document.querySelector(".currenciesModal");
    const closeBtn = document.querySelector(".closeBtn");
  
    currency.addEventListener("click", function () {
      modal.style.display = "inline-flex";
    });
  
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  
  // Feature image tabs
  document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tabsnav .nav");
    const galleries = document.querySelectorAll(".imgGallery");
  
    function deactivateAllTabs() {
      tabs.forEach((tab) => tab.classList.remove("active"));
      galleries.forEach((gallery) => (gallery.style.display = "none"));
    }
  
    function activateTab(tab, galleryClass) {
      tab.classList.add("active");
      const gallery = document.querySelector(`.imgGallery.${galleryClass}`);
      if (gallery) {
        gallery.style.display = "inline-flex";
      } else {
        console.error(`No gallery found with class: ${galleryClass}`);
      }
    }
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        deactivateAllTabs();
        activateTab(tab, tab.classList[1]);
      });
    });
  
    const defaultTab = document.querySelector(".tabsnav .nav.active");
    if (defaultTab) {
      activateTab(defaultTab, defaultTab.classList[1]);
    }
  });
  
  // Custom Gallery modal
  document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".tabsnav .nav");
    const galleries = document.querySelectorAll(".imgGallery");
    const modal = document.getElementById("mygalleryWindow");
    const span = document.getElementsByClassName("close")[0];
  
    navItems.forEach((nav) => {
      nav.addEventListener("click", () => {
        navItems.forEach((item) => item.classList.remove("active"));
        galleries.forEach((gallery) => gallery.classList.remove("active"));
  
        nav.classList.add("active");
        document
          .querySelector(`.imgGallery.${nav.classList[1]}`)
          .classList.add("active");
      });
    });
  
    document.querySelectorAll(".imgWrapper").forEach((imgWrapper) => {
      imgWrapper.addEventListener("click", () => {
        modal.style.display = "inline-flex";
      });
    });
  
    span.onclick = function () {
      modal.style.display = "none";
    };
  
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
  
  // Second nav sticky
  document.addEventListener("DOMContentLoaded", function () {
    const tourView = document.querySelector(".tourView .tabContent");
    const secondNav = document.querySelector(".secondNav");
  
    window.addEventListener("scroll", () => {
      const tourViewRect = tourView.getBoundingClientRect();
  
      if (tourViewRect.top <= 0 && tourViewRect.bottom > 0) {
        secondNav.classList.add("secondnavSticky");
      }
  
      if (tourViewRect.bottom <= 0 || tourViewRect.top > 0) {
        secondNav.classList.remove("secondnavSticky");
      }
    });
  });
  
  // Tab TourView
  document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".secondNav .tab");
    const tabContents = document.querySelectorAll(
      ".tabContent .itinerarytabContent"
    );
  
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((tab) => tab.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
  
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
        moreTripsButton.innerHTML = "Show Less";
      } else {
        const hiddenTrips = document.querySelectorAll(".trips:not(.show)");
        moreTripsButton.innerHTML = `+<span class="count">${hiddenTrips.length}</span> More`;
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
  
    // Ensure moreTripsButton exists before adding the event listener
    if (moreTripsButton) {
      moreTripsButton.addEventListener("click", toggleTrips);
      updateButton();
    }
  });
  
  // Info Modal
  document.addEventListener("DOMContentLoaded", function () {
    const moreButton = document.querySelector(".more");
    const modal = document.querySelector(".additionalInformationModal");
    const closeButton = document.querySelector(".closeBtn");
  
    moreButton.addEventListener("click", function () {
      modal.style.display = "inline-flex";
    });
  
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  
  // Add show class to regular gallery
  document.addEventListener("DOMContentLoaded", function () {
    const itineraryContents = document.querySelectorAll(
      ".itineraryContent .itinerary-img .owl-stage-outer"
    );
  
    itineraryContents.forEach((itineraryContent) => {
      itineraryContent.addEventListener("click", function () {
        const galleryWindow = document.getElementById("mygalleryWindow");
        galleryWindow.style.display = "inline-flex";
  
        if (!$(galleryWindow).data("owl.carousel")) {
          $(galleryWindow)
            .find(".galleryWindow-carousel")
            .owlCarousel({
              loop: true,
              margin: 10,
              nav: true,
              items: 1,
              navText: [
                '<i class="fa-solid fa-angle-left"></i>',
                '<i class="fa-solid fa-angle-right"></i>',
              ],
            });
        }
        updateSlideCount();
      });
    });
  
    const closeBtn = document.querySelector(".mygalleryWindow .close");
    closeBtn.addEventListener("click", function () {
      const galleryWindow = document.getElementById("mygalleryWindow");
      galleryWindow.style.display = "none";
    });
  
    function updateSlideCount() {
      const galleryCarousel = document.querySelector(".galleryWindow-carousel");
      const currentSlide = galleryCarousel.querySelector(".owl-item.active");
      const currentIndex =
        Array.from(galleryCarousel.querySelectorAll(".owl-item")).indexOf(
          currentSlide
        ) + 1;
      const totalSlides = galleryCarousel.querySelectorAll(".owl-item").length;
  
      document.querySelector(".titleCount .current").textContent = currentIndex;
      document.querySelector(".titleCount .totalSlide").textContent = totalSlides;
    }
  
    $(".galleryWindow-carousel").on("changed.owl.carousel", updateSlideCount);
  });
  
  // customAccordion
  document
    .querySelectorAll(".customAccordion .accordion")
    .forEach((accordion) => {
      accordion.addEventListener("click", function () {
        let customAccordion = this.parentElement;
        customAccordion.classList.toggle("show");
      });
    });
  
  // allImagesmodel Script
  
  document.addEventListener("DOMContentLoaded", function () {
    const allImages = document.querySelectorAll(
      ".sidebarGallery img:not(.location img)"
    );
    const imgSrcMap = new Map();
    let idCounter = 1;
  
    allImages.forEach((img) => {
      const src = img.getAttribute("src");
      if (!imgSrcMap.has(src)) {
        imgSrcMap.set(src, idCounter);
        idCounter++;
      }
      img.id = "img" + imgSrcMap.get(src);
    });
  
    const galleryWindowCarousel = document.querySelector(
      ".galleryWindow-carousel"
    );
    galleryWindowCarousel.innerHTML = "";
  
    imgSrcMap.forEach((id, src) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
  
      const imgElement = document.createElement("img");
      imgElement.src = src;
      imgElement.alt = "";
  
      const imgInfoDiv = document.createElement("div");
      imgInfoDiv.classList.add("imgInfo");
  
      const imgCapDiv = document.createElement("div");
      imgCapDiv.classList.add("imgCap");
      imgCapDiv.innerText = "Image " + id;
  
      imgInfoDiv.appendChild(imgCapDiv);
      itemDiv.appendChild(imgElement);
      itemDiv.appendChild(imgInfoDiv);
      galleryWindowCarousel.appendChild(itemDiv);
    });
  
    const totalSlide = document.querySelector(".titleCount .totalSlide");
    totalSlide.innerText = imgSrcMap.size;
  
    $(".galleryWindow-carousel").owlCarousel({
      loop: false,
      margin: 10,
      nav: true,
      items: 1,
      dots: false,
      navText: [
        '<i class="fa fa-chevron-left"></i>',
        '<i class="fa fa-chevron-right"></i>',
      ],
    });
  
    const mygalleryWindow = document.getElementById("mygalleryWindow");
    const closeBtn = document.querySelector(".mygalleryWindow .close");
    const currentSlideElement = document.querySelector(".current");
  
    function updateCurrentSlide(index) {
      currentSlideElement.innerText = index + 1;
  
      const allImgWrapper = document.querySelector(".allImg .imgWrapper");
      const allImgElements = allImgWrapper.querySelectorAll("img");
      allImgElements.forEach((img, idx) => {
        img.classList.toggle("active", idx === index);
      });
    }
  
    function setCarouselToIndex(index) {
      $(".owl-carousel").trigger("to.owl.carousel", [index, 300]);
    }
  
    allImages.forEach((img) => {
      img.addEventListener("click", () => {
        mygalleryWindow.style.display = "block";
        const currentIndex = [...imgSrcMap.keys()].indexOf(
          img.getAttribute("src")
        );
        setCarouselToIndex(currentIndex);
        updateCurrentSlide(currentIndex);
      });
    });
  
    $(".galleryWindow-carousel").on("changed.owl.carousel", function (event) {
      const currentIndex = event.item.index % imgSrcMap.size;
      updateCurrentSlide(currentIndex);
    });
  
    closeBtn.addEventListener("click", () => {
      mygalleryWindow.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === mygalleryWindow) {
        mygalleryWindow.style.display = "none";
      }
    });
  
    const allImgWrapper = document.querySelector(".allImg .imgWrapper");
    allImgWrapper.innerHTML = "";
  
    imgSrcMap.forEach((id, src) => {
      const imgElement = document.createElement("img");
      imgElement.src = src;
      imgElement.alt = "";
      imgElement.id = "img" + id;
  
      imgElement.addEventListener("click", () => {
        const index = [...imgSrcMap.keys()].indexOf(src);
        setCarouselToIndex(index);
        updateCurrentSlide(index);
      });
  
      allImgWrapper.appendChild(imgElement);
    });
  
    updateCurrentSlide(0);
  
    const navPrev = document.querySelector(".allImg .navPrev");
    const navNext = document.querySelector(".allImg .navNext");
  
    navPrev.addEventListener("click", () => {
      const activeImg = document.querySelector(".allImg .imgWrapper img.active");
      if (activeImg) {
        const currentIndex = [...imgSrcMap.keys()].indexOf(
          activeImg.getAttribute("src")
        );
        const newIndex = (currentIndex - 1 + imgSrcMap.size) % imgSrcMap.size;
        setCarouselToIndex(newIndex);
        updateCurrentSlide(newIndex);
      }
    });
  
    navNext.addEventListener("click", () => {
      const activeImg = document.querySelector(".allImg .imgWrapper img.active");
      if (activeImg) {
        const currentIndex = [...imgSrcMap.keys()].indexOf(
          activeImg.getAttribute("src")
        );
        const newIndex = (currentIndex + 1) % imgSrcMap.size;
        setCarouselToIndex(newIndex);
        updateCurrentSlide(newIndex);
      }
    });
  });
  
  // mobile view for enquiry form
  
  document
    .querySelector(".enquiryBtnbg .enquiryBtn")
    .addEventListener("click", function () {
      var enquiryForm = document.querySelector(".mobileEnquiryform .darkFrombg");
      enquiryForm.style.display = "block";
    });
  
  document
    .querySelector(".darkFrombg .closeBtn")
    .addEventListener("click", function () {
      var darkFormBg = document.querySelector(".darkFrombg");
      darkFormBg.style.display = "none";
    });
  
  // tranferinfo
  
  function isMobileView() {
    return window.innerWidth <= 991.98;
  }
  
  // Stops
  function isMobileView() {
    return window.innerWidth <= 991.98;
  }
  
  function openCustomModal(content) {
    const modal = document.getElementById("transferModal");
    const modalBody = document.getElementById("transferModalBody");
  
    modalBody.innerHTML = "";
    modalBody.appendChild(content.cloneNode(true));
  
    modal.style.display = "block";
  }
  
  function closeCustomModal() {
    const modal = document.getElementById("transferModal");
    modal.style.display = "none";
  }
  
  document
    .querySelector(".transfer-modal-close")
    .addEventListener("click", closeCustomModal);
  
  
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("transferModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
 
  function remainStops(){
    document.querySelectorAll(".remainStops").forEach(function (button) {
      const stopAccord = button.previousElementSibling;
      const numberOfStops = stopAccord.querySelectorAll(".timeline").length;
      button.innerHTML = `<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.60711 3.57014C6.49573 3.67442 6.35397 3.72656 6.18183 3.72656C6.00969 3.72656 5.86792 3.67442 5.75654 3.57014L3.38709 1.35172L1.01765 3.57014C0.906263 3.67442 0.764501 3.72656 0.592362 3.72656C0.420222 3.72656 0.27846 3.67442 0.167076 3.57014C0.0556919 3.46585 4.69169e-09 3.33313 6.61359e-09 3.17196C8.53549e-09 3.01079 0.0556919 2.87806 0.167076 2.77378L2.96181 0.157184C3.02256 0.100302 3.08838 0.0599151 3.15926 0.0360244C3.23014 0.012513 3.30609 0.000757018 3.38709 0.000757019C3.4681 0.00075702 3.54404 0.012513 3.61492 0.0360244C3.68581 0.0599151 3.75162 0.100302 3.81238 0.157184L6.60711 2.77378C6.71849 2.87806 6.77419 3.01079 6.77419 3.17196C6.77419 3.33313 6.71849 3.46585 6.60711 3.57014Z" fill="#202020"></path><path d="M0.166327 6.92986C0.277711 6.82558 0.419472 6.77344 0.591612 6.77344C0.763751 6.77344 0.905513 6.82558 1.0169 6.92986L3.38634 9.14828L5.75579 6.92986C5.86717 6.82558 6.00894 6.77344 6.18108 6.77344C6.35322 6.77344 6.49498 6.82558 6.60636 6.92986C6.71775 7.03415 6.77344 7.16687 6.77344 7.32804C6.77344 7.48921 6.71775 7.62194 6.60636 7.72622L3.81163 10.3428C3.75087 10.3997 3.68506 10.4401 3.61418 10.464C3.54329 10.4875 3.46735 10.4992 3.38634 10.4992C3.30534 10.4992 3.22939 10.4875 3.15851 10.464C3.08763 10.4401 3.02181 10.3997 2.96106 10.3428L0.166327 7.72622C0.0549426 7.62193 -0.000750096 7.48921 -0.000750089 7.32804C-0.000750082 7.16687 0.0549426 7.03415 0.166327 6.92986Z" fill="#202020"></path></svg><span>View ${numberOfStops} Stops</span>`;
    });
  }

  document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('remainStops')) {
      const stopAccord = this.previousElementSibling;
  
      if (isMobileView()) {
        openCustomModal(stopAccord);
      } else {
        if (stopAccord.classList.contains("show")) {
          stopAccord.classList.remove("show");
          this.innerHTML = `<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.60711 3.57014C6.49573 3.67442 6.35397 3.72656 6.18183 3.72656C6.00969 3.72656 5.86792 3.67442 5.75654 3.57014L3.38709 1.35172L1.01765 3.57014C0.906263 3.67442 0.764501 3.72656 0.592362 3.72656C0.420222 3.72656 0.27846 3.67442 0.167076 3.57014C0.0556919 3.46585 4.69169e-09 3.33313 6.61359e-09 3.17196C8.53549e-09 3.01079 0.0556919 2.87806 0.167076 2.77378L2.96181 0.157184C3.02256 0.100302 3.08838 0.0599151 3.15926 0.0360244C3.23014 0.012513 3.30609 0.000757018 3.38709 0.000757019C3.4681 0.00075702 3.54404 0.012513 3.61492 0.0360244C3.68581 0.0599151 3.75162 0.100302 3.81238 0.157184L6.60711 2.77378C6.71849 2.87806 6.77419 3.01079 6.77419 3.17196C6.77419 3.33313 6.71849 3.46585 6.60711 3.57014Z" fill="#202020"></path><path d="M0.166327 6.92986C0.277711 6.82558 0.419472 6.77344 0.591612 6.77344C0.763751 6.77344 0.905513 6.82558 1.0169 6.92986L3.38634 9.14828L5.75579 6.92986C5.86717 6.82558 6.00894 6.77344 6.18108 6.77344C6.35322 6.77344 6.49498 6.82558 6.60636 6.92986C6.71775 7.03415 6.77344 7.16687 6.77344 7.32804C6.77344 7.48921 6.71775 7.62194 6.60636 7.72622L3.81163 10.3428C3.75087 10.3997 3.68506 10.4401 3.61418 10.464C3.54329 10.4875 3.46735 10.4992 3.38634 10.4992C3.30534 10.4992 3.22939 10.4875 3.15851 10.464C3.08763 10.4401 3.02181 10.3997 2.96106 10.3428L0.166327 7.72622C0.0549426 7.62193 -0.000750096 7.48921 -0.000750089 7.32804C-0.000750082 7.16687 0.0549426 7.03415 0.166327 6.92986Z" fill="#202020"></path></svg><span>View Stops</span>`;
        } else {
          stopAccord.classList.add("show");
          this.innerHTML = `<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.60711 3.57014C6.49573 3.67442 6.35397 3.72656 6.18183 3.72656C6.00969 3.72656 5.86792 3.67442 5.75654 3.57014L3.38709 1.35172L1.01765 3.57014C0.906263 3.67442 0.764501 3.72656 0.592362 3.72656C0.420222 3.72656 0.27846 3.67442 0.167076 3.57014C0.0556919 3.46585 4.69169e-09 3.33313 6.61359e-09 3.17196C8.53549e-09 3.01079 0.0556919 2.87806 0.167076 2.77378L2.96181 0.157184C3.02256 0.100302 3.08838 0.0599151 3.15926 0.0360244C3.23014 0.012513 3.30609 0.000757018 3.38709 0.000757019C3.4681 0.00075702 3.54404 0.012513 3.61492 0.0360244C3.68581 0.0599151 3.75162 0.100302 3.81238 0.157184L6.60711 2.77378C6.71849 2.87806 6.77419 3.01079 6.77419 3.17196C6.77419 3.33313 6.71849 3.46585 6.60711 3.57014Z" fill="#202020"></path><path d="M0.166327 6.92986C0.277711 6.82558 0.419472 6.77344 0.591612 6.77344C0.763751 6.77344 0.905513 6.82558 1.0169 6.92986L3.38634 9.14828L5.75579 6.92986C5.86717 6.82558 6.00894 6.77344 6.18108 6.77344C6.35322 6.77344 6.49498 6.82558 6.60636 6.92986C6.71775 7.03415 6.77344 7.16687 6.77344 7.32804C6.77344 7.48921 6.71775 7.62194 6.60636 7.72622L3.81163 10.3428C3.75087 10.3997 3.68506 10.4401 3.61418 10.464C3.54329 10.4875 3.46735 10.4992 3.38634 10.4992C3.30534 10.4992 3.22939 10.4875 3.15851 10.464C3.08763 10.4401 3.02181 10.3997 2.96106 10.3428L0.166327 7.72622C0.0549426 7.62193 -0.000750096 7.48921 -0.000750089 7.32804C-0.000750082 7.16687 0.0549426 7.03415 0.166327 6.92986Z" fill="#202020"></path></svg><span>Close ${numberOfStops} Stops</span>`;
        }
      }
    }
});

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
