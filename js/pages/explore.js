document.addEventListener('DOMContentLoaded', function() {
    loadTour(null, '');
});

function loadTour(event, category){

    fetch("https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/filter-item",)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(list => {
        const datalistOptions = document.getElementById('datalistOptions');
        datalistOptions.innerHTML = '';
        list.region.forEach(item => {
            datalistOptions.innerHTML += `<option value="${item}">`;
        });
    })
    .catch(error => {
      console.error('Fetching error: ', error);
    });

    

    const limit = 100;
    const page = 1;
    const apiEndpoint = `https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/list?page=${page}&pageSize=${limit}`;
    showLoader();
    fetch(apiEndpoint, { 
        method: 'POST',
        body: JSON.stringify({}),
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

        const seafood = [];
        const wildlife = [];
        const adventures = [];
        list.data.forEach(element => {
            
            if(element.category === 'Vacation'){
                wildlife.push(element);
            }else if(element.category === 'Adventure'){
                adventures.push(element);
            }else if(element.category === 'Family Tour'){
                seafood.push(element);
            }
            
        });
        
        const adventures_container = document.getElementById('adventures-container');
        createTripCard(adventures_container, adventures);

        
        const wildlife_container = document.getElementById('wildlife-container');
        createTripCard(wildlife_container, wildlife);

        const seafood_container = document.getElementById('seafood-container');
        createTripCard(seafood_container, seafood);


       
    })
    .catch(error => {
       hideLoader();
       console.error('Fetching error: ', error);
    });
}


// Function to create the HTML structure
function createTripCard(container, tripData) {
    container.innerHTML = '';
    
    if (!tripData || tripData.length === 0) {
        return container.innerHTML +=`<div class="no-content">No content available</div>`;
    }
    
    tripData.forEach(data =>{
        container.innerHTML += `
        <div class="region comon-expl2 my-3" data-region="${data.region}">
            <div class="col-lg-8">
                <h6 class="location-nm"> <i class="fas fa-map-marker-alt"></i> ${data.region} </h6>
                <h5>${data.name}</h5>
                <ul class="list-unstyled mt-0 mb-3 list-sort d-flex">
                    <li> <i class="far fa-clock"></i> ${data.day}D/${data.night}N </li>
                    <li class="mx-2 mx-lg-4"> <i class="fas fa-suitcase-rolling"></i> ${data.category} </li>
                    <li> <i class="far fa-user"></i> ${data.minimumAge}+ Age</li>
                </ul>
            </div>
            <div class="col-lg-4">
                <h6 class="st-m1"> Starting From </h6>
                <h3> ₹${data.price}</h3>
                <button onclick="redirectToBooking('${data.tourId}')" class="btn book-btn1"> Book Now </button>
            </div>
        </div>
    `;
    });
        
   
}

// Function to filter datalist based on input
function filterContainerDataList(dataListId, containerId) {
    const input = document.getElementById(dataListId).value.toLowerCase();
    const container = document.getElementById(containerId);
    const items = container.getElementsByClassName('region');

    for (let i = 0; i < items.length; i++) {
        const region = items[i].getAttribute('data-region').toLowerCase();
        if (region.includes(input) || input === '') {
            items[i].style.display = 'flex';
        } else {
            items[i].style.display = 'none';
        }
    }
}

// Function to handle redirection
function redirectToBooking(id) {
    window.location.href = "listing-details.html?listId="+id;
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }
  
  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }