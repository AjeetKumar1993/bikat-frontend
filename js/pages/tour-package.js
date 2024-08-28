document.addEventListener('DOMContentLoaded', function() {
    // Trigger loadTour for the "All" button by default
    loadTour(null, '');
});
function loadTour(event, category){

    var container = document.getElementById('hot_tour_container');
    container.innerHTML = '';

    var buttons = document.querySelectorAll('.filter.btn');
    buttons.forEach(function(button) {
        button.classList.remove('mixitup-control-active');
    });

    if (event) {
        var activeButton = event.currentTarget;
        activeButton.classList.add('mixitup-control-active');
    } else {
        // If no event is provided, highlight the "All" button by default
        document.querySelector('.filter.btn').classList.add('mixitup-control-active');
    }

    const loader = document.getElementById('loader');

    const postData = {
    }

    if(category){
        postData.category = [category]
    }
    const limit = 100;
    const page = 1;
    const apiEndpoint = `https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/list?page=${page}&pageSize=${limit}`;
    showLoader();
    fetch(apiEndpoint, { 
        method: 'POST',
        body: JSON.stringify(postData),
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
        list.data.forEach(element => {
            generateHTML(element);
        });
       
    })
    .catch(error => {
       hideLoader();
       console.error('Fetching error: ', error);
    });
}

function generateHTML(tourDetails) {
    
    var container = document.getElementById('hot_tour_container');

    var colDiv = document.createElement('div');
    colDiv.className = 'col mix category-4';

    var comonItemsWeekDiv = document.createElement('div');
    comonItemsWeekDiv.className = 'comon-items-week';

    var figure = document.createElement('figure');

    var img = document.createElement('img');
    img.src = "https://storage.googleapis.com/bikat_adventure_image/"+tourDetails.tourImage;
    img.alt = 'png2';
    figure.appendChild(img);

    var p = document.createElement('p');
    p.className = 'pol-text btn';
    p.innerText = '10% off';
    figure.appendChild(p);

    comonItemsWeekDiv.appendChild(figure);

    var divTest1 = document.createElement('div');
    divTest1.className = 'div-test1';

    var spanRt = document.createElement('span');
    spanRt.className = 'rt d-block';
    for (var i = 0; i < 5; i++) {
        var starIcon = document.createElement('i');
        starIcon.className = 'fas fa-star';
        spanRt.appendChild(starIcon);
    }
    divTest1.appendChild(spanRt);

    var aTitle = document.createElement('a');
    aTitle.href = `listing-details.html?listId=${tourDetails.tourId}`;
    aTitle.className = 'titel-cm';
    aTitle.innerText = tourDetails.name;
    divTest1.appendChild(aTitle);

    var divBtRating = document.createElement('div');
    divBtRating.className = 'd-md-flex align-items-center bt-rating justify-content-between mt-2';

    var spanClock = document.createElement('span');
    spanClock.innerHTML = `<i class="far fa-clock"></i> ${tourDetails.day} D / ${tourDetails.night} N`;
    divBtRating.appendChild(spanClock);

    divTest1.appendChild(divBtRating);

    var spanRatingBn = document.createElement('span');
    spanRatingBn.className = 'rating-bn';
    spanRatingBn.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${tourDetails.region}`;
    divTest1.appendChild(spanRatingBn);

    var divPrice = document.createElement('div');
    divPrice.className = 'd-flex align-items-center justify-content-between';

    var h5Price = document.createElement('h5');
    h5Price.className = 'ms-2';
    h5Price.innerHTML = `<del class="me-3"> ₹${tourDetails.price}</del> ₹${tourDetails.price}`;
    divPrice.appendChild(h5Price);

    var aBtn = document.createElement('a');
    aBtn.href = `listing-details.html?listId=${tourDetails.tourId}`;
    aBtn.className = 'btn bk-btn';
    aBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16"><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/></svg>';
    divPrice.appendChild(aBtn);

    divTest1.appendChild(divPrice);

    comonItemsWeekDiv.appendChild(divTest1);
    colDiv.appendChild(comonItemsWeekDiv);

    container.appendChild(colDiv);
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}