
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const slug = window.location.pathname.substring(7); // Remove the leading '/'  
    // Check if the path exists in our mapping
    if (slug) {
        loadTourDetails(slug);
    } else {
        // Redirect back to the listing page
      window.location.href = 'listing.html';
    }
})

function loadTourDetails(slug){

    const apiUrl = 'https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+slug; // Replace with your API URL
   
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
        })
        .then(data => {

            const gallery = data.gallery;
            const tripNameContainerId = document.getElementById('trip-name-container');
            tripNameContainerId.innerHTML = '';
            tripNameContainerId.textContent  = data.name;

            const tripNameMobile = document.getElementById('tripName_m');
            tripNameMobile.innerHTML = '';
            tripNameMobile.textContent  = data.name;
            const tripDayMobile = document.getElementById('tripDay_m');

            tripDayMobile.innerHTML = '';
            tripDayMobile.textContent  = data.day+'D/'+data.night+'N';

            const mainPrizeMobile = document.getElementById('mainPrize_m');
            mainPrizeMobile.textContent = 'INR '+data.price;

            const pizeMobile = document.getElementById('prize_m');
            pizeMobile.textContent = 'INR '+data.price;

        
            const tripDayContainerId = document.getElementById('trip-day-container');
            tripDayContainerId.innerHTML = '';
            tripDayContainerId.textContent  = data.day+'D/'+data.night+'N';

            const dayObject = getDayCount(data.itinerary);
            const stayDayContainerId = document.getElementById('stay-day-container');
            stayDayContainerId.innerHTML = '';
        
            getStayDayItemHTML(data.itinerary, stayDayContainerId);

            const facilityContainerId = document.getElementById('facility-container');
            facilityContainerId.innerHTML = '';
            getFacilityHTML(data.facility, facilityContainerId);

            // const prize = document.querySelector('.prize');
            // prize.textContent = 'INR '+data.price;
            // const mainPrize = document.querySelector('.mainPrize');
            // mainPrize.textContent = 'INR '+data.price;
            
            const tripenquiryTitle = document.getElementById('tripenquiryTitle');
            tripenquiryTitle.textContent = data.name;

            const discount = document.getElementById('discount');
            discount.textContent = 'INR '+data.price;
            const mainPrize = document.getElementById('mainPrize');
            mainPrize.textContent = 'INR '+data.price;
            const savedPrize = document.getElementById('savedPrize');
            savedPrize.textContent = 'Save INR 0';

            const tripenquiryTitleM = document.getElementById('tripenquiryTitle_M');
            tripenquiryTitleM.textContent = data.name;

            const discountM = document.getElementById('discount_M');
            discountM.textContent = 'INR '+data.price;
            const mainPrizeM = document.getElementById('mainPrize_M');
            mainPrizeM.textContent = 'INR '+data.price;
            const savedPrizeM = document.getElementById('savedPrize_M');
            savedPrizeM.textContent = 'Save INR 0';

            const highlightId = document.getElementById("trip-highlight-container");
            highlightId.innerHTML = '';
            data.highlight.forEach(highlight => {
              highlightId.innerHTML += `<li>  ${highlight}</li>`;
            });
            var sliderImages = [];
            sliderImages.push(data.tourImage);
           
            const productImageContainer = document.getElementById('productImage-container');
            productImageContainer.innerHTML = ''; 

            productImageContainer.innerHTML += getImageWithViewAllButton(data.tourImage);

            const activitiesImages = gallery.activitiesImages;
            const propertiesImages = gallery.propertiesImages;
            const destinationsImages = gallery.destinationsImages;
            

            const allImageContainer = document.getElementById('allImageContainer');
            allImageContainer.innerHTML = '';
            const allPropetiesContainer = document.getElementById('allPropetiesContainer');
            allPropetiesContainer.innerHTML = '';
            const allDestinationsContainer = document.getElementById('allDestinationsContainer');
            allDestinationsContainer.innerHTML = '';
            const allActivitiesContainer = document.getElementById('allActivitiesContainer');
            allActivitiesContainer.innerHTML = '';
                  
            const activityContainer = document.getElementById('activity-container');
            activityContainer.innerHTML = '';
            let activityFlag = false;
            const propertyContainer = document.getElementById('property-container');
            propertyContainer.innerHTML = '';
            let propertyFlag = false;
            const destinationContainer = document.getElementById('destination-container');
            destinationContainer.innerHTML = '';
            let destinationFlag = false;

           
            let activitiesImgCount = 0;
            let destinationImgCount = 0;
            let propertryImgCount = 0;

           // let galleryList = [];

            let activityInclusionList = [];
            const activityImageMap = new Map();
            let tourActivities = getTitlesByEventType(data.itinerary, 'ACTIVITY'); 
            let tourProperties = getTitlesByEventType(data.itinerary, 'HOTEL'); 
            let activitySlider = false;
            if(activitiesImages){
            
                activitiesImages.forEach(activity => {
                    //galleryList.push(activity);
                    activityInclusionList.push(activity.title);
                    if(activity.galleryMedia && tourActivities.includes(activity.title)){

                        activitiesImgCount += activity.galleryMedia.length;
                        let image1 = "";
                        let image1Flag = false;
                        activity.galleryMedia.forEach(url =>{
                            updateLocationImageMap(activityImageMap, activity.title, [url.original]);
                            if(!activityFlag){
                                activityFlag = true;
                                activityContainer.innerHTML = getImageHTML(url.original, 'Activities');
                                image1 = url.original;
                            }
                            if(!image1Flag){
                                image1Flag = true;
                                image1 = url.original;
                            }
                            if(!activitySlider){
                                activitySlider = true;
                                sliderImages.push(url.original);
                               
                            }
                            
                            allImageContainer.innerHTML += getAllImagesHTML(url.original, activity.title, 'allImages');
                        
                        });
                        allActivitiesContainer.innerHTML += getAllImagesHTML(image1, activity.title, 'activities', activity.galleryMedia.length); 
                    }
                });
            }        
            const locationImageMap = new Map();
            let destinationSlider = false;
            if(destinationsImages){
              
                destinationsImages.forEach(activity => {
                    //galleryList.push(activity);
                    if(activity.galleryMedia){
                        let image1 = "";
                        let image1Flag = false;
                        destinationImgCount += activity.galleryMedia.length;

                        activity.galleryMedia.forEach(url =>{

                            updateLocationImageMap(locationImageMap, activity.title, [url.original]);

                            if(!destinationFlag){
                                destinationFlag = true;
                                destinationContainer.innerHTML = getImageHTML(url.original, 'Destinations');
                                image1 = url.original;
                            }
                            if(!image1Flag){
                                image1Flag = true;
                                image1 = url.original;
                            }
                            if(!destinationSlider){
                                destinationSlider = true;
                                sliderImages.push(url.original);
                            }
                            allImageContainer.innerHTML += getAllImagesHTML(url.original,activity.title, 'allImages');
                        });
                        allDestinationsContainer.innerHTML += getAllImagesHTML(image1, activity.title, 'destinations', activity.galleryMedia.length);
                    }
                });
            }
            let propertiesSlider = false;
            if(propertiesImages){
                let i = 0;
                propertiesImages.forEach(activity => {
                   // galleryList.push(activity);
                    if(activity.galleryMedia && tourProperties.includes(activity.title)){
                        let image1 = "";
                        let image1Flag = false;

                        propertryImgCount += activity.galleryMedia.length;
                       
                        activity.galleryMedia.forEach(url =>{

                            if(!propertyFlag){
                                propertyFlag = true;
                                propertyContainer.innerHTML = getImageHTML(url.original, 'Properties');
                            }
                            if(!image1Flag){
                                image1Flag = true;
                                image1 = url.original;
                            }
                            if(!propertiesSlider){
                               
                                propertiesSlider = true;
                                sliderImages.push(url.original);
                            }
                            
                            allImageContainer.innerHTML += getAllImagesHTML(url.original, activity.title, 'allImages');
                        });
                        allPropetiesContainer.innerHTML += getAllImagesHTML(image1, activity.title, 'properties', activity.galleryMedia.length);      
                    }
                });
            }  
        
            $(document).ready(function(){
                var mainSlider = document.getElementById('main-slider');
                mainSlider.innerHTML = '';
                var owl = $("#main-slider");
               
                owl.owlCarousel('destroy').owlCarousel({
                    items: 1,
                    loop: true,
                    dots: true
                   
                    // other options
                });
                // Add images to Owl Carousel
                sliderImages.forEach(function(src) {
                    var item = `<div class="item"><img src="https://storage.googleapis.com/fullontravel/${src}" alt=""></div>`;
                    owl.trigger('add.owl.carousel', [$(item)]).trigger('refresh.owl.carousel');
                });
            });

            addImageHeaderWithImgCount(activitiesImgCount, destinationImgCount, propertryImgCount);

            getFilterHTML(data.filters);
            getDistinationRouteHTML(data.filters)
            getStayCategoryHTML(data.filters)
            getPackageHTML(data.filters);

           // const itineraryContainer = document.getElementById('itinerary-img-container');
           // itineraryContainer.innerHTML = '';
           // itineraryContainer.innerHTML = getItineraryImgHTML(data.itinerary);

           $(document).ready(function() {
                // Add the HTML to the container
                $('#itinerary-img-container').html(getItineraryHTML(data.itinerary, locationImageMap, activityImageMap));
                getSummarisedItineraryHTML(data.itinerary, locationImageMap, activityImageMap);
                getActivityItineraryHTML(data.itinerary, locationImageMap, activityImageMap);
                getStayItineraryHTML(data.itinerary, locationImageMap, activityImageMap);
                getTransferItineraryHTML(data.itinerary, locationImageMap, activityImageMap);
               // $('.owl-carousel').owlCarousel('destroy');
                // Initialize Owl Carousel
                $('.owl-carousel-img').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: false,
                    items: 1,
                });
                $('.activitySlider').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: true,
                    items: 1,
                    dots: false,
                    navText: [
                        '<i class="fa fa-chevron-left"></i>',
                        '<i class="fa fa-chevron-right"></i>'
                    ]
                })
                $('.activityCorner').owlCarousel({
                    loop: false,
                    margin: 10,
                    dots: false,
                    nav: true,
                    navText: [
                        '<i class="fa fa-chevron-left"></i>',
                        '<i class="fa fa-chevron-right"></i>'
                    ],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        }
                    }
                })
                  $('.itinerary-img').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: true,
                    items: 1,
                    dots: false,
                    navText: [
                        '<i class="fa fa-chevron-left"></i>',
                        '<i class="fa fa-chevron-right"></i>'
                    ]
                });
                $('.owl-carousel').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: false,
                    items: 1,
                });
                 // loadCustomAccordion();
                document.querySelectorAll('.customAccordion .accordion').forEach(accordion => {
                  
                    accordion.addEventListener('click', function() {
                        
                        let customAccordion = this.parentElement;
                        customAccordion.classList.toggle('show');
                    });
                });
                
                // // Simulating data load with a timeout
                // function loadRemainPointData(callback) {
                //     setTimeout(() => {
                //         // Simulate data load completion
                //         callback();
                //     }, 1000); // Adjust as necessary
                // }

                // // After data is loaded
                // loadRemainPointData(updateButtonText);
            });

        

            const inclusionId = document.getElementById("inclusion-container");
            inclusionId.innerHTML = '';

            Object.keys(dayObject).forEach(key => {
                let day = dayObject[key];
                if(day != 1){
                    day -= 1;
                }
                let inclusion = day+" nights stay in "+ key;  
                inclusionId.innerHTML += getInclusionHTML(inclusion);
            });
            activityInclusionList.forEach(inclusion => {
                inclusionId.innerHTML += getInclusionHTML(inclusion);
            });
            data.inclusion.forEach(inclusion => {
                inclusionId.innerHTML += getInclusionHTML(inclusion);
            });

            const exclusionId = document.getElementById("exclusion-container");
            exclusionId.innerHTML = '';
            data.exclusion.forEach(exclusion => {
                exclusionId.innerHTML += getExclusionHTML(exclusion);
            });

            const cancellationPolicy = document.getElementById("cancellationPolicy-container");
            cancellationPolicy.innerHTML = '';
            if(data.policies &&  data.policies.cancellation){
                data.policies.cancellation.forEach(policy => {
                    cancellationPolicy.innerHTML += `<li>  ${policy}</li>`;
                });
            }
            const confirmationPolicy = document.getElementById("confirmationPolicy-container");
            confirmationPolicy.innerHTML = '';
            if(data.policies &&  data.policies.confirmation){
                data.policies.confirmation.forEach(policy => {
                    confirmationPolicy.innerHTML += `<li>  ${policy}</li>`;
                });
            }

            const refundPolicy = document.getElementById("refundPolicy-container");
            refundPolicy.innerHTML = '';
            if(data.policies &&  data.policies.refund){
                data.policies.refund.forEach(policy => {
                    refundPolicy.innerHTML += `<li>  ${policy}</li>`;
                });
            }

            const paymentPolicy = document.getElementById("paymentPolicy-container");
            paymentPolicy.innerHTML = '';
            if(data.policies &&  data.policies.payment){
                data.policies.payment.forEach(policy => {
                    paymentPolicy.innerHTML += `<li>  ${policy}</li>`;
                });
            }
         
            loadAllImagesModel();

            // Simulating data load with a timeout
            function loadRemainPointData(callback) {
                setTimeout(() => {
                    // Simulate data load completion
                    callback();
                }, 1000); // Adjust as necessary
            }

            // After data is loaded
            loadRemainPointData(remainStops);
           
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display error message or handle error as needed
        });
}

function getTitlesByEventType(data, eventType) {
    const titles = [];
    data.locationDayGroup.forEach(group => {
        group.days.forEach(day => {
            day.event.forEach(event => {
                if (event.eventType === eventType) {
                    if(eventType === 'HOTEL'){
                        event.eventData.forEach(event => {
                            titles.push(event.title);
                        });
                    }else{
                        titles.push(event.title);
                    }
                   
                }
            });
        });
    });
    return titles;
}

function updateLocationImageMap(map, key, newValues) {
    // Ensure newValues is an array
    if (!Array.isArray(newValues)) {
        throw new TypeError('newValues must be an array');
    }
    
    // Check if the key already exists in the map
    if (map.has(key)) {
        // Get the existing list and create a new array with the updated values
        const existingList = map.get(key);
        // Use spread operator to create a new array
        map.set(key, [...existingList, ...newValues]);
    } else {
        // Add the new key with the list of values
        map.set(key, newValues);
    }
}


function addImageHeaderWithImgCount(activitiesImgCount, destinationImgCount, propertryImgCount){
    let allImgCount = activitiesImgCount + destinationImgCount + propertryImgCount;
    const allImgTotal = document.getElementById('allImgTotal');
    allImgTotal.innerHTML = `All Images(${allImgCount})`;
    const destinationImgTotal = document.getElementById('destinationImgTotal');
    destinationImgTotal.innerHTML = `Destinations(${destinationImgCount})`;
    const activityImgTotal = document.getElementById('activityImgTotal');
    activityImgTotal.innerHTML = `Activities(${activitiesImgCount})`;
    const propertyImgTotal = document.getElementById('propertyImgTotal');
    propertyImgTotal.innerHTML = `Properties(${propertryImgCount})`;

}

function getMainImageHTML(url, eventType){
    console.log(url);
    let html = `<div class ="item">`;
    html += ` <img src="https://storage.googleapis.com/fullontravel/${url}"
                alt="">`;

    if(eventType){
        html += ` <p class="imageName">${eventType}</p>`;
    } 
    
    return html+`</div>`;   
           
}

function getSliderImageHTML(url){

    return ` <img src="https://storage.googleapis.com/fullontravel/${url}" alt="">`;         
}

function getImageHTML(url, eventType){
    
    let html = ` <img src="https://storage.googleapis.com/fullontravel/${url}"
                alt="">`;

    if(eventType){
        html += ` <p class="imageName">${eventType}</p>`;
    } 
    
    return html;   
           
}

function getImageWithViewAllButton(url){

    let html = getImageHTML(url);
    html += ` <div class="allFeatureimg">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_420_1971)">
                                <path
                                    d="M1.33203 8C1.33203 4.85734 1.33203 3.286 2.30803 2.30934C3.28536 1.33334 4.85603 1.33334 7.9987 1.33334C11.1414 1.33334 12.7127 1.33334 13.6887 2.30934C14.6654 3.28667 14.6654 4.85734 14.6654 8C14.6654 11.1427 14.6654 12.714 13.6887 13.69C12.7134 14.6667 11.1414 14.6667 7.9987 14.6667C4.85603 14.6667 3.2847 14.6667 2.30803 13.69C1.33203 12.7147 1.33203 11.1427 1.33203 8Z"
                                    stroke="#202020"></path>
                                <path
                                    d="M10.6654 6.66667C11.4017 6.66667 11.9987 6.06972 11.9987 5.33334C11.9987 4.59696 11.4017 4 10.6654 4C9.92898 4 9.33203 4.59696 9.33203 5.33334C9.33203 6.06972 9.92898 6.66667 10.6654 6.66667Z"
                                    stroke="#202020"></path>
                                <path
                                    d="M1.33203 8.33334L2.50003 7.31134C2.79279 7.05538 3.17186 6.92023 3.56051 6.93322C3.94916 6.94622 4.31836 7.1064 4.59336 7.38134L7.45336 10.2413C7.6753 10.4632 7.9684 10.5997 8.28106 10.6268C8.59373 10.6539 8.90592 10.5698 9.1627 10.3893L9.36203 10.2493C9.73243 9.98919 10.1801 9.86238 10.6319 9.88963C11.0837 9.91687 11.5129 10.0966 11.8494 10.3993L13.9987 12.3333"
                                    stroke="#202020" stroke-linecap="round"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_420_1971">
                                    <rect width="16" height="16" fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        <span>View All Images</span>
                    </div>`;
    return html;                
}

function getAllImagesHTML(url, title, type, imgTotal){

    let html = ` <div class="imgWrapper">
            <img src="https://storage.googleapis.com/fullontravel/${url}?w=1080&h=auto&dpr=1" alt="${title}">`;
    
    if(type != 'allImages'){
        html += ` <div class="imgContent">
                    <div class="location"> `;

        if(type === 'destinations'){
            html += `<img src="/assets/images/svg/location.svg" alt=""><span id="titleSpan">${title}</span>`;
        }else{
            html += `<span>${title}</span>`;
        }
        html +=`
                    </div>
                    <div class="noOfimg">
                        <span class="totalImg">${imgTotal} </span><span>Images</span><i class="fa-solid fa-arrow-right-long"></i>
                    </div>
                </div>`;
    }
    html += `</div>`;    
    return html;
}

function getGelleryImagesHTML(url, title){

    return  ` <div class="item">
                            <img src="https://storage.googleapis.com/fullontravel/${url}" alt="">
                            <div class="imgInfo">
                                <div class="imgCap">${title}</div>
                            </div>
                        </div>`;
}
function getDayCount(itinerary){
    var dayObject = {};
    if(itinerary && itinerary.locationDayGroup){

        itinerary.locationDayGroup.forEach(item =>{
            dayObject[item.location] =  item.days.length; 
        });
    }
    return dayObject;
}

function getStayDayItemHTML(itinerary, id){
    
    if(itinerary && itinerary.locationDayGroup){

        itinerary.locationDayGroup.forEach(item =>{
            id.innerHTML += ` <div class="day">
            <span>${item.days.length}</span>
                <div class="place">
                        ${item.days.length === 1 ? 'Day In' : 'Days In'}
                    <span>${item.location}</span>
                </div>
        </div>`; 
        });
    }
}

function getFacilityHTML(facility, id){

    if(facility.transfer){
        id.innerHTML += ` <div class="facilityType">
                            <img src="/assets/images/svg/car.svg" alt="" class="svgImg">
                            Transfer Included
                        </div>`;
    }
    if(facility.stay){
        id.innerHTML += `<div class="facilityType">
                            <img src="/assets/images/svg/stay.svg" alt="" class="svgImg">Stay Included
                        </div>`;
    }
   
    if(facility.breakfast){
        id.innerHTML += ` <div class="facilityType">
                                <img src="/assets/images/svg/breakfast.svg" alt="" class="svgImg">
                                Breakfast Included
                            </div>`;
    }

    if(facility.sightseeing){
        id.innerHTML += ` <div class="facilityType">
                            <img src="/assets/images/svg/balloon.svg" alt="" class="svgImg">
                            Sightseeing Included
                        </div>`;
    }
}

function getInclusionHTML(inclusion){
    return ` <div class="info">
                <img src="/assets/images/tick.png" alt="" class="signImg">
                <div>${inclusion}</div>
            </div>`;
}

function getExclusionHTML(exclusion){
    return ` <div class="info">
                <img src="/assets/images/cross.png" alt="" class="signImg">
                <div>${exclusion}</div>
            </div>`;
}

function getFilterHTML(filters){
   
    const similarTripContainer = document.getElementById('similar-trip-container');
    similarTripContainer.innerHTML = '';
   
    if(filters && filters.numberOfDaysFilters){

        filters.numberOfDaysFilters.forEach(trip => {
            var html = "";
            if(trip.isSelected){
                html += `<div class="trips show active" onclick="load_index('${trip.slug}')">`;                                        
            }else{
                html += `<div class="trips show" onclick="load_index('${trip.slug}')">`;
               
            }

            html += `<div class="tripImg">
                            <img src="https://storage.googleapis.com/fullontravel/${trip.tourImage}"
                                alt="">
                            <div class="days">${trip.numberOfDays} Days</div>
                        </div>
                        <div class="prize">
                            <p>Starting From</p>
                            <span>INR ${trip.price}</span>
                        </div>  
                    </div>`;                                     
        
           
            similarTripContainer.innerHTML += html;
            
        });

    }
   
}

function getDistinationRouteHTML(filters){
    
    const destinationRouteContainer = document.getElementById('destinationRoute-container');
    destinationRouteContainer.innerHTML = '';

    if(filters && filters.routeFilters){
    
        filters.routeFilters.forEach(trip => {
            var routeHtml = '';
            
            if(trip.destinationRoute){
                //let destinationRoute = uniqueDestinationRoute(trip.destinationRoute);
                
                if(trip.isSelected){
                    routeHtml += `<div class="destinationRoute active">`                                      
                }else{
                    routeHtml += `<div class="destinationRoute" onclick="load_index('${trip.slug}')">`
                }
                
                trip.destinationRoute.forEach(route =>{
    
                    var html = `<div class="routeWrapper">
                                    <div class="routeName">
                                    ${route}
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.832 10L4.16537 10M15.832 10L10.832 15M15.832 10L10.832 5"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div> `;  
                    routeHtml += html;                          
                });
                
                routeHtml += `</div>`;
                
                
            }
           
            destinationRouteContainer.innerHTML += routeHtml;
        });
       
    }   
          
}

function getStayCategoryHTML(filters){
    
    const stayCategoryContainer = document.getElementById('stay-category-container');
    stayCategoryContainer.innerHTML = '';

    if(filters && filters.stayCategoryFilters){

        filters.stayCategoryFilters.forEach(trip => {
            var html = "";
            if(trip.isSelected){
                html += `<div class="stayWrapper active">`;                                        
            }else{
                html += `<div class="stayWrapper" onclick="load_index('${trip.slug}')">`;
                
            }

            html += `<div class="stayName">
                                    ${trip.stayCategory}
                     </div>            
                </div>`;                                     
        
            
            stayCategoryContainer.innerHTML += html;
            
        });
            
    }         
}

function getPackageHTML(filters){

    const packageContainer = document.getElementById('package-container');
    packageContainer.innerHTML = '';

    if(filters && filters.tourPackageFilters){

        filters.tourPackageFilters.forEach(trip => {
            var html = "";
            if(trip.isSelected){
                html += `<div class="propertyWrapper active" >`;                                        
            }else{
                html += `<div class="propertyWrapper" onclick="load_index('${trip.slug}')" >`;
                
            }

            html += ` <div class="propertyName">
                            ${trip.tourPackage}
                    </div>
                </div>`;                                     
        
            packageContainer.innerHTML += html;
            
        });
            
    }  
}

function mainGallery(mainGalleryContainer){
    
    // Create the main container div
    const galleryWindow = document.createElement('div');
    galleryWindow.className = 'galleryWindow';

    // Create and append the h1 element
    const h1 = document.createElement('h1');
    h1.textContent = 'Gallery';
    galleryWindow.appendChild(h1);

    // Create and append the carousel container
    const carousel = document.createElement('div');
    carousel.className = 'owl-carousel owl-theme galleryWindow-carousel';

    // Create a function to add carousel items
    function addCarouselItems(count) {
        const itemSrc = 'https://media1.thrillophilia.com/filestore/ky4h2mw6iwsbrpmwhkgrya7zqjk1_ferpgzla6unygjbv711opn52eji6_shutterstock_1551710702.jpg?w=580&dpr=2';
        const itemCap = 'Thiksey Monastery, Ladakh';

        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            item.className = 'item';

            const img = document.createElement('img');
            img.src = itemSrc;
            img.alt = '';

            const imgInfo = document.createElement('div');
            imgInfo.className = 'imgInfo';

            const imgCap = document.createElement('div');
            imgCap.className = 'imgCap';
            imgCap.textContent = itemCap;

            imgInfo.appendChild(imgCap);
            item.appendChild(img);
            item.appendChild(imgInfo);
            carousel.appendChild(item);
        }
    }

    // Add items to the carousel
    addCarouselItems(16); // Adjust the count as needed

    // Append the carousel to the gallery window
    galleryWindow.appendChild(carousel);

    // Create and append the image count section
    const imgCount = document.createElement('div');
    imgCount.className = 'imgCount';

    const titleCount = document.createElement('div');
    titleCount.className = 'titleCount';

    const imgText = document.createElement('span');
    imgText.className = 'imgText';
    imgText.textContent = 'Ladakh Sightseeing Tour with Flights';

    const currentSlide = document.createElement('span');
    currentSlide.className = 'current';
    currentSlide.textContent = '1';

    const totalSlide = document.createElement('span');
    totalSlide.className = 'totalSlide';
    totalSlide.textContent = '84';

    // Append elements to titleCount
    titleCount.appendChild(imgText);
    titleCount.appendChild(document.createTextNode(' || ( '));
    titleCount.appendChild(currentSlide);
    titleCount.appendChild(document.createTextNode(' / '));
    titleCount.appendChild(totalSlide);
    titleCount.appendChild(document.createTextNode(' )'));

    const allImg = document.createElement('div');
    allImg.className = 'allImg';

    // Create and append navigation buttons
    const navBtn = document.createElement('div');
    navBtn.className = 'navBtn';

    const navPrev = document.createElement('button');
    navPrev.className = 'navPrev';
    navPrev.innerHTML = '<i class="fa-solid fa-angle-left"></i>';

    const navNext = document.createElement('button');
    navNext.className = 'navNext';
    navNext.innerHTML = '<i class="fa-solid fa-angle-right"></i>';

    navBtn.appendChild(navPrev);
    navBtn.appendChild(navNext);
    allImg.appendChild(navBtn);

    // Create and append the image wrapper
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'imgWrapper';

    function addImageWrapperImages(count) {
        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            img.src = 'https://storage.googleapis.com/fullontravel/dev/kuala%20hotel%201.jpg-122277.jpg?w=1080&h=auto&dpr=1';
            img.alt = '';
            imgWrapper.appendChild(img);
        }
    }

    // Add images to the image wrapper
    addImageWrapperImages(20); // Adjust the count as needed

    allImg.appendChild(imgWrapper);
    imgCount.appendChild(titleCount);
    imgCount.appendChild(allImg);

    // Append the image count section to the gallery window
    galleryWindow.appendChild(imgCount);

    // Append the gallery window to the body or another container
    mainGalleryContainer.appendChild(galleryWindow);

}

let iconMap = {
    airport:'/assets/images/svg/routeFlight.svg',
    hotel : '/assets/images/svg/stay.svg',
    activity : '/assets/images/svg/activity.svg',
    location_point: '/assets/images/svg/nature.svg',
    ACTIVITY : '/assets/images/svg/balloon.svg',
    TRANSFER : '/assets/images/svg/car.svg',
    HOTEL : '/assets/images/svg/stay.svg',
}
function getSummarisedItineraryHTML(itinerary, locationImageMap, activityImageMap) {
    const tripSummaryContainer = document.getElementById('summarised-img-container');

    let hotelCount = 0;
    let transferCount = 0;
    let activityCount = 0;

    itinerary.locationDayGroup.forEach(location => {
        location.days.forEach(day => {
            const groupedEventTypes = groupEventsByType(day.event);

            transferCount += groupedEventTypes.TRANSFER ? groupedEventTypes.TRANSFER.length : 0;
            hotelCount += groupedEventTypes.HOTEL ? groupedEventTypes.HOTEL.length : 0;
            activityCount += groupedEventTypes.ACTIVITY ? groupedEventTypes.ACTIVITY.length : 0;
        });
    });

    const summaryHTML = generateSummaryHTML(activityCount, transferCount, hotelCount);

    let itineraryDaysHTML = '';

    itinerary.locationDayGroup.forEach(location => {
        location.days.forEach(day => {
            const groupedEventTypes = groupEventsByType(day.event);

            const dayHTML = generateDayHTML(day, location, groupedEventTypes);

            itineraryDaysHTML += dayHTML;
        });
    });

    tripSummaryContainer.innerHTML = summaryHTML + itineraryDaysHTML + '</div>';
}

function groupEventsByType(events) {
    return events.reduce((acc, event) => {
        acc[event.eventType] = acc[event.eventType] || [];
        acc[event.eventType].push(event);
        return acc;
    }, {});
}

function generateSummaryHTML(activityCount, transferCount, hotelCount) {
    return `
        <div class="tripSummary">
            <div class="summaryHead">
                <h2>Trip Summary</h2>
                <div class="bottomSection">
                    <div class="events">
                        <div class="icon"><img src="/assets/images/svg/balloon.svg" alt="Activity Icon"></div>
                        <div class="name">${activityCount} Activities</div>
                    </div>
                    <div class="divider"></div>
                    <div class="events">
                        <div class="icon"><img src="/assets/images/svg/car.svg" alt="Transfer Icon"></div>
                        <div class="name">${transferCount} Transfers</div>
                    </div>
                    <div class="divider"></div>
                    <div class="events">
                        <div class="icon"><img src="/assets/images/svg/stay.svg" alt="Hotel Icon"></div>
                        <div class="name">${hotelCount} Hotels</div>
                    </div>
                </div>
            </div>`;
}

function generateDayHTML(day, location, groupedEventTypes) {
    const transferLength = groupedEventTypes.TRANSFER ? groupedEventTypes.TRANSFER.length : 0;
    const hotelLength = groupedEventTypes.HOTEL ? groupedEventTypes.HOTEL.length : 0;
    const activityLength = groupedEventTypes.ACTIVITY ? groupedEventTypes.ACTIVITY.length : 0;

    let dayHTML = `
        <div class="itineraryDay">
            <div class="dayHeader">
                <h4>Day ${day.dayNumber} - ${location.location}</h4>
                <div class="dayEvent">
                    ${activityLength > 0 ? generateEventCountHTML('balloon', activityLength) : ''}
                    ${hotelLength > 0 ? generateEventCountHTML('stay', hotelLength) : ''}
                    ${transferLength > 0 ? generateEventCountHTML('car', transferLength) : ''}
                </div>
            </div>
            <div class="dayContent">`;

    dayHTML += generateEventDetailsHTML(groupedEventTypes, day);

    if (hotelLength > 0) {
        dayHTML += `
            <div class="mealWrapper">
                <div class="lunchDnnr">
                    <div class="mealTime">
                        <img src="/assets/images/svg/lunch.svg" alt="Lunch Icon">
                        <span>Lunch</span>
                    </div>
                    <div class="sep">Or</div>
                    <div class="mealTime">
                        <img src="/assets/images/svg/dinner.svg" alt="Dinner Icon">
                        <span>Dinner at ${groupedEventTypes.HOTEL[0].title}</span>
                    </div>
                </div>
            </div>`;
    }

    dayHTML += `</div></div>`;
    return dayHTML;
}

function generateEventCountHTML(iconType, count) {
    return `
        <div class="eventCount">
            <span class="count">${count}</span>
            <img src="/assets/images/svg/${iconType}.svg" alt="${iconType} Icon">
        </div>
        <div class="divider"></div>`;
}

function generateEventDetailsHTML(groupedEventTypes, day) {
    let eventHTML = '';

    for (const [eventType, details] of Object.entries(groupedEventTypes)) {
        if (details.length > 1 && eventType === 'TRANSFER') {
            eventHTML += `
                <div class="dayEvent">
                    <div class="leftSection">
                        <img src="${iconMap[eventType] || '/assets/images/svg/nature.svg'}" alt="${eventType} Icon">
                    </div>
                    <div class="rightSection">
                        <div class="eventTitle">${eventType.charAt(0).toUpperCase() + eventType.slice(1).toLowerCase()}s:</div>
                        ${generateMultipleTransferEventHTML(details)}
                        
                    </div>
                </div>`;
        } else {
            let title = details[0].title;
            if (eventType === 'TRANSFER') {
                const events = details[0].eventData;
                const firstTitle = events[0] ? events[0].title : '';
                const lastTitle = events[events.length - 1] ? events[events.length - 1].title : '';
                title = `Transfer from ${firstTitle} to ${lastTitle}`;
            }
            eventHTML += `
                <div class="dayEvent">
                    <div class="leftSection">
                        <img src="${iconMap[eventType] || '/assets/images/svg/nature.svg'}" alt="${eventType} Icon">
                    </div>
                    <div class="rightSection">
                        <div class="eventTitle">${eventType.charAt(0).toUpperCase() + eventType.slice(1).toLowerCase()}:</div>
                        <span class="singleEvent">${title}</span>
                    </div>
                </div>`;
        }
    }

    return eventHTML;
}

function generateMultipleTransferEventHTML(details) {
    let htmlOutput = '<ul class="mutliEvents">';

    details.forEach(detail => {
        // Extract eventData and get first and last titles
        const eventData = detail.eventData;
        const firstTitle = eventData[0] ? eventData[0].title : '';
        const lastTitle = eventData[eventData.length - 1] ? eventData[eventData.length - 1].title : '';

        // Create a list item for each entry
        htmlOutput += `<li>${firstTitle} to ${lastTitle}</li>`;
    });

    htmlOutput += '</ul>';
    return htmlOutput;
}

function getStayItineraryHTML(itinerary, locationImageMap, activityImageMap) {
    const tripStayContainer = document.getElementById('stay-img-container');
    let html = '';

    itinerary.locationDayGroup.forEach(location => {
        location.days.forEach(day => {
            const hotels = day.event.filter(event => event.eventType === 'HOTEL');

            if (hotels.length > 0) {
                html += `
                <div class="customAccordion show">
                    <div class="accordion">
                        <div class="accordionTitle">
                            <div class="day">Day ${day.dayNumber}</div>
                            <div class="title">${day.title}</div>
                        </div>
                        <img src="/assets/images/svg/arrow.svg" alt="Arrow" class="arrowImg">
                    </div>
                    <div class="accordionDetails">
                        <div class="details">
                            ${hotels.map(event => subStayItineraryHTML(event, location.days.length)).join('')}
                        </div>
                    </div>
                </div>`;
            }
        });
    });

    tripStayContainer.innerHTML = html;
}

function subStayItineraryHTML(event, dayCountForTour) {
    if (event.eventType !== 'HOTEL') return '';

    const stayDuration = dayCountForTour === 1 ? 1 : dayCountForTour - 1;
    const eventDataHtml = event.eventData.map(eventData => `
        <div class="hotelCard">
            <div class="hotelImg">
                <img src="https://storage.googleapis.com/fullontravel/${eventData.imageUrl}" alt="${eventData.title}">
                <div class="imgContent">
                    <div class="rating">
                        <img src="/assets/images/svg/whiteStar.svg" alt="Rating"><span>4.5 / 5</span>
                    </div>
                </div>
            </div>
            <div class="hotelName">${eventData.title}</div>
        </div>
    `).join('');

    const inclusionsHtml = event.inclusions ? event.inclusions.map(inclusion => `
        <div class="includeWrapper">
            <div class="includeName">
                <img src="/assets/images/svg/breakfast.svg" alt="Inclusion">${inclusion}
            </div>
            <div class="includeStatus">
                <img src="/assets/images/svg/doubletick.svg" alt="Included">Included
            </div>
        </div>
        <div class="vrLine"></div>
    `).join('') : '';

    return `
    <div class="stay">
        <div class="basicHead">
            <div class="headIcon">
                <img src="/assets/images/svg/stay.svg" alt="Stay Icon">Stay At
            </div>
            <div class="headName">${event.title}</div>
        </div>
        <div class="stayTimeline">
            <div class="start">
                <span class="head">Check In</span>
                <span class="time">${event.startTime}</span>
            </div>
            <div class="separator">
                <div class="duration">${stayDuration}N</div>
            </div>
            <div class="end">
                <span class="head">Check Out</span>
                <span class="time">${event.endTime}</span>
            </div>
        </div>
    </div>
    <div class="hotelList">
        <div class="optionHeading">Stays will be allocated based on availability or similar category</div>
        <div class="hotelCards">
            ${eventDataHtml}
        </div>
        <div class="includedSection">
            <div class="includeTitle">Inclusions :</div>
            <div class="includeList">
                ${inclusionsHtml}
            </div>
        </div>
    </div>`;
}

function getTransferItineraryHTML(itinerary, locationImageMap, activityImageMap) {
    const tripTransferContainer = document.getElementById('transfers-img-container');
    let html = '';

    itinerary.locationDayGroup.forEach(location => {
        const dayCountForTour = location.days.length;
        location.days.forEach(day => {
            const transfers = day.event.filter(event => event.eventType === 'TRANSFER');

            if (transfers.length > 0) {
                html += `
                <div class="customAccordion show">
                    <div class="accordion">
                        <div class="accordionTitle">
                            <div class="day">Day ${day.dayNumber}</div>
                            <div class="title">${day.title}</div>
                        </div>
                        <img src="/assets/images/svg/arrow.svg" alt="Arrow" class="arrowImg">
                    </div>
                    <div class="accordionDetails">
                        <div class="details">
                            ${transfers.map(event => subTransferItineraryHTML(event, dayCountForTour)).join('')}
                        </div>
                    </div>
                </div>`;
            }
        });
    });

    tripTransferContainer.innerHTML = html;
}

function subTransferItineraryHTML(event, dayCountForTour) {
    if (event.eventType !== 'TRANSFER') return '';

    const transferClass = event.eventData.length > 2 ? 'dayEvent transfer' : 'transfer';
    const transferDetails = event.eventData.map((eventData, index) =>
        generateTransferEventHTML(eventData, index, event.eventData.length)
    ).join('');

    return `
    <div class="${transferClass}">
        <div class="basicHead">
            <div class="headIcon">
                <img src="/assets/images/svg/car.svg" alt="Car Icon">${event.transportType}
            </div>
            <div class="headName">${event.title}</div>
        </div>
        <div class="destinationTimeline">
            ${transferDetails}
        </div>
    </div>`;
}

function generateTransferEventHTML(eventData, index, total) {
    // Assuming this function generates the HTML for each transfer event.
    return `
    <div class="transferEvent">
        <div class="eventIndex">${index + 1} of ${total}</div>
        <div class="eventTitle">${eventData.title}</div>
        <div class="eventLocation">${eventData.location}</div>
    </div>`;
}

function getActivityItineraryHTML(itinerary, locationImageMap, activityImageMap) {
    const tripActivitiesContainer = document.getElementById('activities-img-container');
    let html = '';

    itinerary.locationDayGroup.forEach(location => {
        location.days.forEach(day => {
            const activities = day.event.filter(event => event.eventType === 'ACTIVITY');

            if (activities.length > 0) {
                html += `
                <div class="customAccordion show">
                    <div class="accordion">
                        <div class="accordionTitle">
                            <div class="day">Day ${day.dayNumber}</div>
                            <div class="title">${day.title}</div>
                        </div>
                        <img src="/assets/images/svg/arrow.svg" alt="Arrow" class="arrowImg">
                    </div>
                    <div class="accordionDetails">
                        <div class="details">
                            ${activities.map(event => subActivityItineraryHTML(event, activityImageMap)).join('')}
                        </div>
                    </div>
                </div>`;
            }
        });
    });

    tripActivitiesContainer.innerHTML = html;
}

function subActivityItineraryHTML(event, activityImageMap) {
    if (event.eventType !== 'ACTIVITY') return '';

    const imageList = activityImageMap.get(event.title) || [];
    const attachedEventsHTML = event.attachedEvents ? `
        <div class="optionHeading">You’ll be covering these amazing experiences</div>
        <div class="owl-carousel owl-theme activityCorner">
            ${event.attachedEvents.map((attachedEvent, index) => `
                <div class="item">
                    <div class="activityCard">
                        <img src="https://storage.googleapis.com/fullontravel/${attachedEvent.imageUrl}" style="height:284.21px" alt="">
                        <p>${index + 1}. ${attachedEvent.title}</p>
                    </div>
                </div>
            `).join('')}
        </div>` : '';

    return `
    <div class="activity">
        <div class="basicHead">
            <div class="headIcon">
                <img src="/assets/images/svg/balloon.svg" alt="Balloon Icon">Activity
            </div>
            <div class="headName">${event.title}</div>
        </div>
        <div class="owl-carousel owl-theme activitySlider">
            ${imageList.map(img => `
            <div class="item">
                <img src="https://storage.googleapis.com/fullontravel/${img}" alt="${event.title} Image">
            </div>`).join('')}
        </div>
        ${attachedEventsHTML}
    </div>`;
}


/**
 * Generates HTML for the itinerary based on location and events.
 * @param {Object} itinerary - An object containing locationDayGroup and other data.
 * @param {Map} locationImageMap - A Map where keys are location names and values are arrays of image URLs.
 * @returns {string} The generated HTML string for the itinerary.
 */
function getItineraryHTML(itinerary, locationImageMap, activityImageMap) {
    if (!itinerary || !Array.isArray(itinerary.locationDayGroup) || !(locationImageMap instanceof Map)) {
        throw new TypeError('Invalid arguments');
    }

    let html = '';
    let dayCount = 1;

    itinerary.locationDayGroup.forEach(tour => {
        const imageList = locationImageMap.get(tour.location) || [];
        const dayCountForTour = tour.days.length;

        // Generate itinerary content with images
        html += `
            <div class="itineraryContent">
                <div class="owl-carousel owl-theme itinerary-img">
                    ${imageList.map(url => `
                        <div class="item">
                            <img src="https://storage.googleapis.com/fullontravel/${url}" alt="">
                        </div>
                    `).join('')}
                </div>
                <div class="tripDetails">
                    <div class="day">
                        <span>${dayCountForTour}</span>
                        <div class="place">
                            ${dayCountForTour === 1 ? 'Day': 'Days'} In
                            <span>${tour.location}</span>
                        </div>
                    </div>
                    <div class="totalSlide">
                        <div class="currentSlide">1</div>/<div class="totalSlides">${imageList.length}</div>
                    </div>
                </div>
            </div>
        `;

        // Generate day details
        tour.days.forEach(day => {
            html += `
                <div class="customAccordion">
                    <div class="accordion">
                        <div class="accordionTitle">
                            <div class="day">Day ${dayCount++}</div>
                            <div class="title">${day.title}</div>
                        </div>
                        <img src="/assets/images/svg/arrow.svg" alt="" class="arrowImg">
                    </div>
                    <div class="accordionDetails">
                        <div class="details">
                            <p>${day.description}</p>
                            ${day.event.map(event => generateEventHTML(event, dayCountForTour, activityImageMap)).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    });

    return html;
}

/**
 * Generates HTML for a specific event.
 * @param {Object} event - The event object containing type and details.
 * @returns {string} The generated HTML string for the event.
 */
function generateEventHTML(event, dayCountForTour, activityImageMap) {
    let html = '';
    const imageList = activityImageMap.get(event.title) || [];

    switch (event.eventType) {
        case 'TRANSFER':
            
            html += `
                <div class="${event.eventData.length > 2 ? 'dayEvent transfer' : 'transfer'}">
                    <div class="basicHead">
                        <div class="headIcon"><img src="/assets/images/svg/car.svg" alt="">${event.transportType}</div>
                        <div class="headName">${event.title}</div>
                    </div>
                    <div class="destinationTimeline">
                        ${event.eventData.map((eventData, index) => generateTransferEventHTML(eventData, index, event.eventData.length)).join('')}
                    </div>
                </div>
            `;
            break;

        case 'HOTEL':
            html += `
                <div class="stay">
                    <div class="basicHead">
                        <div class="headIcon"><img src="/assets/images/svg/stay.svg" alt="">Stay At</div>
                        <div class="headName">${event.title}</div>
                    </div>
                    <div class="stayTimeline">
                        <div class="start">
                            <span class="head">Check In</span>
                            <span class="time">${event.startTime}</span>
                        </div>
                        <div class="separator">
                            <div class="duration">${dayCountForTour === 1 ? 1 : dayCountForTour - 1}N</div>
                        </div>
                        <div class="end">
                            <span class="head">Check Out</span>
                            <span class="time">${event.endTime}</span>
                        </div>
                    </div>
                </div>
                <div class="hotelList">
                    <div class="optionHeading">Stays will be allocated based on availability or similar category</div>
                    <div class="hotelCards">
                        ${event.eventData.map(eventData => `
                            <div class="hotelCard">
                                <div class="hotelImg">
                                    <img src="https://storage.googleapis.com/fullontravel/${eventData.imageUrl}" alt="">
                                    <div class="imgContent">
                                        <div class="rating">
                                            <img src="/assets/images/svg/whiteStar.svg"
                                                alt=""><span>4.5 / 5</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="hotelName">${eventData.title}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="includedSection">
                        <div class="includeTitle">Inclusions :</div>
                        <div class="includeList">
                            ${event.inclusions ? event.inclusions.map(inclusion => `
                                <div class="includeWrapper">
                                    <div class="includeName">
                                        <img src="/assets/images/svg/breakfast.svg" alt="">${inclusion}
                                    </div>
                                    <div class="includeStatus">
                                        <img src="/assets/images/svg/doubletick.svg" alt="">Included
                                    </div>
                                </div>
                                <div class="vrLine"></div>
                            `).join('')  : ''}
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'ACTIVITY':
            
            html += `
                <div class="activity">
                    <div class="basicHead">
                        <div class="headIcon"><img src="/assets/images/svg/balloon.svg" alt="">Activity</div>
                        <div class="headName">${event.title}</div>
                    </div>
                    <div class="owl-carousel owl-theme activitySlider">
                        
                         ${imageList.map(img => `
                           <div class="item">
                                <img src="https://storage.googleapis.com/fullontravel/${img}" alt="">
                            </div>`).join('')}
                    </div>
                    ${event.attachedEvents ? `
                        
                        <div class="optionHeading">You’ll be covering these amazing experiences</div>
                        <div class="owl-carousel owl-theme activityCorner">
                            ${event.attachedEvents.map((attachedEvent, index) => `
                                <div class="item">
                                    <div class="activityCard">
                                        <img src="https://storage.googleapis.com/fullontravel/${attachedEvent.imageUrl}" style="height:284.21px" alt="">
                                        <p>${index + 1}. ${attachedEvent.title}</p>
                                    </div>
                                </div>
                            `).join('')}    

                        </div>` : ''
                    }
                    
                </div>
            `;
            break;
    }

    return html;
}

/**
 * Generates HTML for a transfer event.
 * @param {Object} eventData - The event data object containing title and other details.
 * @param {number} index - The index of the event data.
 * @param {number} length - The total length of event data.
 * @param {string} icon - The icon to be used for the event.
 * @returns {string} The generated HTML string for the transfer event.
 */
function generateTransferEventHTML(eventData, index, length) {
    
    const icon = iconMap[eventData.eventType] || '/assets/images/svg/nature.svg';
            
    if (index === 0) {
        return `
            <div class="timeline">
                <div class="transferIndicator">From</div>
                <div class="transferWrapper">
                    <div class="transferTitle">
                        <div class="icon"><img src="${icon}" alt=""></div>
                        <div class="title"><div>${eventData.title}</div></div>
                    </div>
                </div>
            </div>
        `;
    } else if (index === length - 1) {
        return `
            ${length >=3  ? '</div> <div class="remainStops">View ${length - 1} Stops</div>' : ''}
           
            <div class="timeline">
                <div class="transferIndicator">To</div>
                <div class="transferWrapper">
                    <div class="transferTitle">
                        <div class="icon"><img src="${icon}" alt=""></div>
                        <div class="title"><div>${eventData.title}</div></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            ${index === 1 ? '<div class="stopAccord">' : ''}
            <div class="timeline">
                <div class="transferWrapper">
                    <div class="transferTitle">
                        <div class="icon"><img src="/assets/images/svg/nature.svg" alt=""></div>
                        <div class="title"><div>${eventData.title}</div></div>
                    </div>
                </div>
            </div>
        `;
    }
}

function load_index(slug){
    
    loadTourDetails(slug);
    history.pushState({}, '',  `/tours/${slug}`);
}
