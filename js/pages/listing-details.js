var tourId = '';
function fetchData(tourID){
  
  let id =  localStorage.getItem('tourID_'+tourID);
  tourId = id;
  const apiEndpoint = `https://decent-line-423710-m0.de.r.appspot.com/api/tour/${id}`;
  
  fetch(apiEndpoint, { 
      method: 'GET'
    })
    .then(response =>  { 
      return response.json();
    }).then(tourDetails => {
      // use the json
    
      document.getElementById('bookNowBtn').dataset.id = id;
      localStorage.setItem(id, JSON.stringify(tourDetails));

      let image = "images/bg-how.jpg";
      if(tourDetails.tourImage !== null){
        image = "https://storage.googleapis.com/bikat_adventure_image/"+tourDetails.tourImage; 
      }
      let region = tourDetails.region !== null ? tourDetails.region: "NA";
      let name = tourDetails.name !== null ? tourDetails.name: "NA";
      let category = tourDetails.category !== null ? tourDetails.category: "NA";
      let overview = tourDetails.overview !== null ? tourDetails.overview: "NA";
      let price = tourDetails.price !== null ? tourDetails.price: "0.0";
      let day = tourDetails.day !== null ? tourDetails.day: "0";
      let night = tourDetails.night !== null ? tourDetails.night: "0";
      let minimumAge = tourDetails.minimumAge !== null ? tourDetails.minimumAge: "0";
      let gst = tourDetails.gst !== null ? tourDetails.gst: "0";
      let priceFromTo = tourDetails.priceFromTo !== null ? tourDetails.priceFromTo: "NA";
      let maximumGroupSize = tourDetails.maximumGroupSize !== null ? tourDetails.maximumGroupSize: "0";
      let distance = tourDetails.distance !== null ? tourDetails.distance: "0";
      let altitude = tourDetails.altitude !== null ? tourDetails.altitude: "0";


      const tourImageId = document.getElementById("tourImage");
      tourImageId.innerHTML += `<img src="${image}" class="d-block w-100" alt="...">`;
      
      // region
      const regionId = document.getElementById("region");
      regionId.innerHTML += `<i class="fas fa-map-marker-alt"></i> ${region}`;
      // tour_heading
      const tourHeadingId = document.getElementById("tour_heading");
      tourHeadingId.innerHTML += `<h2 class="comon-head-m mt-2 mb-5"> ${name} </h2>`;
      tourHeadingId.innerHTML += `<h3 class="tour-price"> ₹${price} <span>+${gst}% GST (${priceFromTo})  </span> </h3>`;

      // tour_type
      const tourTypeId = document.getElementById("tour_type");
      tourTypeId.innerHTML += `<li> <i class="far fa-clock"></i> ${day} Days / ${night} Nights</li>`;
      tourTypeId.innerHTML += `<li  class="mx-2 mx-md-2 mx-lx-4"> <i class="fas fa-tachometer-alt"></i> ${category}</li>`;
      tourTypeId.innerHTML += `<li> <i class="far fa-user"></i> ${minimumAge}+ Age</li>`;
      tourTypeId.innerHTML += `<li class="mx-2 mx-md-2 mx-lx-4"> <i class="fa fa-group"></i> Max ${maximumGroupSize}</li>`;
      tourTypeId.innerHTML += `<li> <i class="fas fa-hiking"></i>  ${distance} KM</li>`;
      tourTypeId.innerHTML += `<li class="mx-2 mx-md-2 mx-lx-4"> <i class="fas fa-mountain"></i>  ${altitude} M</li>`;
      
      // overview
      const overviewId = document.getElementById("overview");
      overviewId.innerHTML += `${overview}`;
      
      // Inclusion
      const inclusionId = document.getElementById("inclusions");
      const inclusionList = tourDetails.inclusion;
      inclusionList.forEach(inclusion => {
        inclusionId.innerHTML += `<li> <i class="far fa-check-circle"></i> ${inclusion}</li>`;
      });

      // Exclusion
      const exclusionId = document.getElementById("exclusions");
      const exclusionList = tourDetails.exclusion;
      exclusionList.forEach(exclusion => {
        exclusionId.innerHTML += `<li> <i class="far fa-check-circle"></i> ${exclusion}</li>`;
      });
      // Highlist
      const highlightId = document.getElementById("highlight");
      const highlightList = tourDetails.highlight;
      highlightList.forEach(highlight => {
        highlightId.innerHTML += `<li> <i class="far fa-check-circle"></i> ${highlight}</li>`;
      });

      // Highlist
      const packingListId = document.getElementById("packingList");
      const packingList = tourDetails.packingList;
      packingList.forEach(packingList => {
        packingListId.innerHTML += `<li> <i class="far fa-check-circle"></i> ${packingList}</li>`;
      });

       // availableDate
      let availableDateList = tourDetails.availableDate;
      
      
      let entries = Object.entries(availableDateList)
      let data = entries.map( ([key, val] = entry) => {
        
        if(!isMonthPassed(key)){
          const summaryMonth = document.getElementById("dateMonth");
          summaryMonth.innerHTML += ` <details class="month">
                    <summary>${key}</summary>
                    <ul class="date-list" id="${key}">
                    </ul>
                  </details>`;
    
          let entriesVal = Object.entries(val)

          let data = entriesVal.map( ([dateKey, val] = entry) => {
            const datesList = document.getElementById(key);
            const fromDate = new Date(val.from);
            const toDate = new Date(val.to);
            localStorage.setItem("dateid_"+val.id, val.from +" - "+ val.to);  
            datesList.innerHTML += `<a  style="text-decoration: none;color:black" href="book-now.html?id=${tourDetails.id}&&dateid=${val.id}"> <li class="date-item"><span>${getFormattedDate(fromDate)} - ${getFormattedDate(toDate)}</span> <span class="wl">WL</span></li> </a>`;
      
          });
        }
      }); 
       
      
      
    // itinerary 
    const tourPlanId = document.getElementById("accordionExample");
    const tourPlanList = tourDetails.itinerary;
    
   
    var expanded="";
    var count=1;
    let entriesItinerary = Object.entries(tourPlanList)
    let itineraryData = entriesItinerary.map( ([key, val] = entry) => {
      
      const countWord = intToEnglish(count);
   
      if(count===1){
        expanded = "show";
      }else{
        expanded = "";
      }
      count++;
        
      tourPlanId.innerHTML += `
      <div class="accordion-item">
                          <h2 class="accordion-header" id="heading${countWord}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${countWord}" aria-expanded="true" aria-controls="collapse${countWord}">
                              <span> ${key} </span> ${val.title}
                            </button>
                          </h2>
                          <div id="collapse${countWord}" class="accordion-collapse collapse ${expanded}" aria-labelledby="heading${countWord}" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                              <div class="comon-tour-days">
                                <h5>  ${val.heading}</h5>
                                <p class="mt-3"> ${val.description} </p>
                                <ul class="list-unstyled features-list1 mt-3" id="tourPlanOtherDetails${countWord}"> 
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>`;

            val.otherDetails.forEach(otherDetails =>{
              const tourPlanOtherDetailsId = document.getElementById("tourPlanOtherDetails".concat(countWord));
              tourPlanOtherDetailsId.innerHTML += `<li>  <i class="far fa-check-circle"></i> ${otherDetails} </li> `;
      
            })
    
    });
    
     
      // gallery
      const galleryId = document.getElementById("gallery");
      const galleryLIst = tourDetails.gallery;
      galleryLIst.forEach(gallery => {
        galleryId.innerHTML += `<div class="col">
                            <a class="comon-glry" data-fancybox="gl" href="https://storage.googleapis.com/bikat_adventure_image/${gallery}">
                                <figure>
                                    <img src="https://storage.googleapis.com/bikat_adventure_image/${gallery}" alt="npm"/>
                                </figure>
                            </a>
                        </div>`;
      });
      
      const locationId = document.getElementById("location");
      locationId.innerHTML += `<iframe src="${tourDetails.location}" width="100%" height="300" frameborder="0" style="border:0"></iframe>`;

      


    })
    .catch(error => console.log(error));

  }
 
  function getFormattedDate(date){
    const year = date.getFullYear();
    const month = monthNames[(date.getMonth() + 1)]; // Months are zero based, so we add 1
    const day = ('0' + date.getDate()).slice(-2);

    // Form the desired date string in yyyy-MM-dd format
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('listId'); // Get the list ID from the URL
  
    if (listId) {
      fetchData(listId);
    } else {
      // Handle the case where no list ID is provided in the URL
      window.location.href = 'listing.html'; // Redirect back to the listing page
    }
  });

  function itineraryCalculator(count){
    const countWord = intToEnglish(count);

    if(i===1){
      heading1 = "headingOne";
      collapse1 = "collapseOne";
      expanded = "show";
      itineraryDetails = tourPlan.day1;
      tourPlanOtherDetails1 = "tourPlanOtherDetailsOne"
    }else if(i===2){
      heading1 = "headingTwo";
      collapse1 = "collapseTwo";
      expanded = "";
      itineraryDetails = tourPlan.day2;
      tourPlanOtherDetails1 = "tourPlanOtherDetailsTwo"
    }else if(i===3){
      heading1 = "headingThree";
      collapse1 = "collapseThree";
      expanded = "";
      itineraryDetails = tourPlan.day3;
      tourPlanOtherDetails1 = "tourPlanOtherDetailsThree"
    }   
  }

  function intToEnglish(number) {

    var NS = [
      { value: 10000000, str: "Crore" },
      { value: 100000, str: "Lakh" },
      { value: 1000, str: "Thousand" },
      { value: 100, str: "Hundred" },
      { value: 90, str: "Ninety" },
      { value: 80, str: "Eighty" },
      { value: 70, str: "Seventy" },
      { value: 60, str: "Sixty" },
      { value: 50, str: "Fifty" },
      { value: 40, str: "Forty" },
      { value: 30, str: "Thirty" },
      { value: 20, str: "Twenty" },
      { value: 19, str: "Nineteen" },
      { value: 18, str: "Eighteen" },
      { value: 17, str: "Seventeen" },
      { value: 16, str: "Sixteen" },
      { value: 15, str: "Fifteen" },
      { value: 14, str: "Fourteen" },
      { value: 13, str: "Thirteen" },
      { value: 12, str: "Twelve" },
      { value: 11, str: "Eleven" },
      { value: 10, str: "Ten" },
      { value: 9, str: "Nine" },
      { value: 8, str: "Eight" },
      { value: 7, str: "Seven" },
      { value: 6, str: "Six" },
      { value: 5, str: "Five" },
      { value: 4, str: "Four" },
      { value: 3, str: "Three" },
      { value: 2, str: "Two" },
      { value: 1, str: "One" }
    ];
  
    var result = '';
    for (var n of NS) {
      if (number >= n.value) {
        if (number <= 99) {
          result += n.str;
          number -= n.value;
          if (number > 0) result += ' ';
        } else {
          var t = Math.floor(number / n.value);
          // console.log(t);
          var d = number % n.value;
          if (d > 0) {
            return intToEnglish(t) + ' ' + n.str + ' ' + intToEnglish(d);
          } else {
            return intToEnglish(t) + ' ' + n.str;
          }
  
        }
      }
    }
    return result;
  }

  function isMonthPassed(givenMonth){
    var m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var currMonth = m_names[date.getMonth()]; 
       
    let givenMonthIndex = m_names.indexOf(givenMonth);
    let currMonthIndex = m_names.indexOf(currMonth);
    
    if(givenMonthIndex < currMonthIndex){ 
       return true; 
    }
    else {
      return false;
    }
  }

    document.getElementById('reviewForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = {
          rating: document.querySelector('input[name="rating2"]:checked').value,
          name: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          comment: document.getElementById('reviewText').value
      };
     
      fetch('https://decent-line-423710-m0.de.r.appspot.com/api/tour/'+tourId+'/comments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
          if (data.status) {
              alert('Review submitted successfully!');
              // Optionally, reset the form
              document.getElementById('reviewForm').reset();
          } else {
              alert('Failed to submit review. Please try again.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Error submitting review. Please try again later.');
      });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Replace with your backend API URL
    const apiURL = 'https://decent-line-423710-m0.de.r.appspot.com/api/tour/'+tourId+'/comments';

    // Fetch comments from the backend API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const commentsContainer = document.getElementById('comments-container');
            
            data.comments.forEach(comment => {
                // Create the comment HTML structure
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-user-div';

                const userPicDiv = document.createElement('div');
                userPicDiv.className = 'userp';

                const usPicDiv = document.createElement('div');
                usPicDiv.className = 'us-pic';
                const img = document.createElement('img');
                img.src = 'images/testimonials-1-1.jpg';
                img.alt = 'user-pic';
                usPicDiv.appendChild(img);

                userPicDiv.appendChild(usPicDiv);

                const userDslDiv = document.createElement('div');
                userDslDiv.className = 'user-dsl';

                const userName = document.createElement('h6');
                userName.textContent = comment.name;
                
                const starsSpan = document.createElement('span');
                starsSpan.className = 'd-block';
                for (let i = 0; i < comment.rating; i++) {
                    const starIcon = document.createElement('i');
                    starIcon.className = 'fas fa-star';
                    starsSpan.appendChild(starIcon);
                }
                userName.appendChild(starsSpan);

                const dateSpan = document.createElement('span');
                dateSpan.textContent = ` ${new Date(comment.createdAt).toLocaleDateString()}`;
                userName.appendChild(dateSpan);

                const commentText = document.createElement('p');
                commentText.textContent = comment.comment;

                userDslDiv.appendChild(userName);
                userDslDiv.appendChild(commentText);

                commentDiv.appendChild(userPicDiv);
                commentDiv.appendChild(userDslDiv);

                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
});



 function loadCarouselItems() {
  try {
    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/tour/'+tourId+'/tour-suggestion', { 
      method: 'GET'
    })
    .then(response =>  { 
      return response.json();
    }).then(data => {
        let carouselContainer = document.getElementById('carousel-container');
        let html = ` <div class="linke-aloso owl-carousel owl-theme mt-4">`;
          
          data.tours.forEach(item => {
              
              localStorage.setItem('tourID_'+item.tourId, item.id);
              redirectHref = `listing-details.html?listId=${item.tourId}`;
              
              html +=`<div class="comon-items-week">

                        <figure>
                            <img src="https://storage.googleapis.com/bikat_adventure_image/${item.tourImage}" alt="png2"/>
                        </figure>
                        <a class="wish-list"><i class="fas fa-heart"></i></a>
                        <div class="div-test1">
                            <span class="loactions-ts d-block"><i class="fas fa-map-marker-alt"></i> ${item.region}</span>
                            <a href="${redirectHref}" class="titel-cm">${item.name}</a>
                            <h5>₹${item.price} <span>per person</span></h5>
                            
                            <hr/>
                            <div class="d-md-flex align-items-center bt-rating justify-content-between">
                                <span><i class="far fa-clock"></i> ${item.day} D / ${item.night} N</span>
                                <span><i class="fas fa-star"></i> 5K(Rating)</span>
                            </div>
                        </div>
                      </div>  
                    `;
          });
          
          html += `</div>`;
          carouselContainer.innerHTML = html; // Set all HTML at once
         
          // Initialize owl-carousel slider after setting HTML
          $('.linke-aloso').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                },
                600: {
                    items: 2,
                    nav: false,
                },
                1000: {
                    items: 3,
                    loop: true,
                    nav: true,
                }
            }
        });
    
    }).catch( error => {
      console.error('Error fetching comments:', error);
    });
     
  
  } catch (error) {
    console.error('Error loading carousel items:', error);
  }
}

// Load carousel items on page load
document.addEventListener('DOMContentLoaded', loadCarouselItems);




function bookTour (){
  const id = document.getElementById('bookNowBtn').dataset.id;
  window.location.href = 'book-now.html?id='+id;
}