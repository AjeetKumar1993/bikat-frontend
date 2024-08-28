let page = 1;
let postDataForLoadMore = JSON.stringify({});
function fetchData(postData) {

    const limit = 10;
    const apiEndpoint = `https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/list?page=${page}&pageSize=${limit}`;
    showLoader();
    fetch(apiEndpoint, { 
        method: 'POST',
        body: postData,
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
      })
    .then(response => {
      hideLoader();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(list => {
      renderData(list.data); // Function to render data on the page
      const totalPage = Math.ceil(list.total/list.pageSize);
     
      if (page >= totalPage) {
        document.getElementById('seeMore2').style.display = 'none';
      }else{
        document.getElementById('seeMore2').style.display = 'inline-block';
      }
      page++;
      //setupPagination(totalPage, page); // Function to setup pagination buttons
    })
    .catch(error => {
      hideLoader();
      console.error('Fetching error: ', error);
    });
}

function renderData(tourDetailsList) {
   
    var listing = document.getElementById("listing");
    
    tourDetailsList.forEach(tourDetails =>{

        if(tourDetails.shortOverview == null){
            tourDetails.shortOverview = "";
        }
        if(tourDetails.shortOverview.length >= 150){
            tourDetails.shortOverview = tourDetails.shortOverview.substring(0, 100) + "...";
        }
       
        redirectHref = `tours/${tourDetails.slug}`;

        let image = "images/bg-how.jpg";
        if(tourDetails.tourImage !== null){
          image = "https://storage.googleapis.com/bikat_adventure_image/"+tourDetails.tourImage; 
        }
        let region = tourDetails.region !== null ? tourDetails.region: "NA";
        let name = tourDetails.name !== null ? tourDetails.name: "NA";
        let category = tourDetails.category !== null ? tourDetails.category: "NA";
        let shortOverview = tourDetails.shortOverview !== null ? tourDetails.shortOverview: "NA";
        let price = tourDetails.price !== null ? tourDetails.price: "0.0";
        let day = tourDetails.day !== null ? tourDetails.day: "0";
        let night = tourDetails.night !== null ? tourDetails.night: "0";
        let minimumAge = tourDetails.minimumAge !== null ? tourDetails.minimumAge: "0";
        listing.innerHTML += `<div class="item list-item col-md-2 col-lg-6 view-group list-group-item collist">
            <div class="comon-items-d1">

                <a href="${redirectHref}" class="left-div-list">
                <figure class="mb-0">
                    <img src="${image}" alt="sm">
                    <span class="btn-sm strat-r "> ${tourDetails.rating === 0 ? 5: tourDetails.rating} <i class="fas fa-star"></i> </span> 
                </figure> 
                </a>
            
                <div class="right-list-div">
                    <div class="d-flex mb-1 justify-content-between align-items-center">
                        <h6 class="locations-ts" id="region"> <i class="fas fa-map-marker-alt"></i> ${region}</h6>
                    
                    </div> 
                    <a href="${redirectHref}" class="titel-product">${name}</a>

                    <ul class="list-unstyled mt-0 mb-3 list-sort d-flex">
                        <li><i class="far fa-clock"></i> ${day} Days / ${night} Nights </li>
                        <li class="mx-2 mx-lg-2 mx-lx-4"> <i class="fas fa-tachometer-alt"></i> ${category} </li>
                        <li ><i class="far fa-user"></i> ${minimumAge}+ Age </li>
                    </ul>


                    <p>${shortOverview}</p>
                    <h2>₹${price}</h2>
                    
                    <hr>
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="${redirectHref}" class="btn view-products mt-0"> View Details
                        <i class="fas fa-long-arrow-alt-right"></i> </a>
                        <ul class="list-unstyled m-0">
                        <li>
                            <a class="btn comon-likke fv-list-n" data-bs-toggle="tooltip" data--bs-placement="top" title="Click to Shortlist"> 
                            <i class="fas fa-heart"></i> 
                            </a>
                            <a class="share-bn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fas fa-share-alt"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>`;
      
       
    })
  }

function loadMore(){
  document.getElementById('seeMore2').addEventListener('click', fetchData(postDataForLoadMore));
}  

function fetchDataWithFilter(){
  page=1;

  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
  // Array to store checked values
  var category = [];
  var region = [];
  var duration = [];
  
  // Iterate over checked checkboxes and push their values into the array
  checkboxes.forEach(function(checkbox) {
    const nameAttribute = checkbox.getAttribute('name');
  
    if (nameAttribute === 'category') {
      category.push(checkbox.value);
    } 
     if (nameAttribute === 'region') {
      region.push(checkbox.value);
    }
    
    if(nameAttribute === 'duration'){
      const days = checkbox.value.split(',');
      days.forEach(function(day){
        duration.push(day);
      });
    
    }
      
  });
  
  let slider1 = document.getElementById('slider1');
  let slider2 = document.getElementById('slider2');
  let slide1 = parseFloat(slider1.value);
  let slide2 = parseFloat(slider2.value);
  if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
  
  let postData = {};

  // Add key-value pairs based on conditions
  if (category.length !== 0) {
    postData["category"] = category;
  }
  if (region.length !== 0) {
    postData["regions"] = region;
  }
  if (duration.length !== 0) {
    postData["days"] = duration;
  }  
  postData["priceFrom"] = slide1;
  postData["priceTo"] = slide2;

    
  const jsonBody = JSON.stringify(postData);
  var listing = document.getElementById("listing");
  listing.innerHTML = "";
  postDataForLoadMore = jsonBody;
  fetchData(jsonBody);
}


document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const selectedRegion = params.get('region'); // Get the list ID from the URL
  generateFilter(selectedRegion);
  if (selectedRegion) {
    let destinationId = document.getElementById('destinationId');
    destinationId.innerHTML = '';
    destinationId.innerHTML = 'Tours in '+selectedRegion;
    
    let data = {
      'regions': [selectedRegion]
    };
   
    
    fetchData(JSON.stringify(data));
  } else {
    //console.log("without");
    fetchData(JSON.stringify({}));
  }
});


function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

function generateFilter(selectedRegion){

  const regionContainer = document.getElementById('region-filter-container');
 // const categoryContainer = document.getElementById('category-filter-container');
  regionContainer.innerHTML = '';
  //categoryContainer.innerHTML = '';
  fetch("https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/filter-item",)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(list => {
   // filterHtmlRender(categoryContainer, 'category', list.category);
    filterHtmlRender(regionContainer, 'region', list.region, selectedRegion);
  })
  .catch(error => {
    console.error('Fetching error: ', error);
  });

}

function filterHtmlRender(container, type, items, selectedRegion){

  items.forEach(item => {
    
    const div = document.createElement('div');
    div.className = 'form-check';

    const input = document.createElement('input');
    input.className = 'form-check-input';
    input.type = 'checkbox';
    input.value = item;
    input.id = `flexCheck${item}`;
    input.name = type;
    if (item === selectedRegion) {
      input.checked = true;
    }
    input.onchange = (event) => fetchDataWithFilter();

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = `flexCheck${item}`;
    label.textContent = item.charAt(0).toUpperCase() + item.slice(1);

    div.appendChild(input);
    div.appendChild(label);

    container.appendChild(div);
});
}