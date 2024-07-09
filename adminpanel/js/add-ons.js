document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayAddOns();
    fetchOptions();
});



function fetchAndDisplayAddOns() {

    const addOnsContainer = document.getElementById('savedAddOns');
  
    // Replace with your actual backend API endpoint to fetch saved dates
    const datesUrl = 'https://decent-line-423710-m0.de.r.appspot.com/api/tour/addOns';

    fetch(datesUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.name;
                optionElement.textContent = option.name;
                addOnsContainer.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching saved addOns:');
           
        });
}
function fetchOptions() {

    const optionsSelect = document.getElementById('addOns_tour_options');
    // Replace with your actual backend API endpoint to fetch options
    const optionsUrl = 'https://decent-line-423710-m0.de.r.appspot.com/api/tour/list';

    fetch(optionsUrl)
        .then(response => response.json())
        .then(data => {
            // Populate options in the dropdown select element
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.name;
                optionsSelect.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching options:');
        });
}


 // Handle form submission to save date
  function add_AddOns(){

    const add_addOns = document.getElementById('add_addOns').value;

    // Replace with your actual backend API endpoint to save date
    const saveUrl = 'https://decent-line-423710-m0.de.r.appspot.com/api/tour/addOns';

    // Prepare payload in JSON format
    const payload = {
        name: add_addOns
    };

    fetch(saveUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
       
        if(data.errorCode == '118'){
            console.log(data);
            alert('Failed: '+ data.errorMessage);
        }
        else{
            alert('Added');
        }
        
        
    })
    .catch(error => {
        console.error('Error saving addOns:', error);
    
    });
}


function addTourAddOns(){
    
    const tours = document.getElementById('addOns_tour_options');
    
    const tourList = Array.from(tours.selectedOptions).map(option => option.value);
    
    const addOns = document.getElementById('savedAddOns').value;

    const price = document.getElementById('addOnsPrice').value;

     // Prepare payload in JSON format
     const payload = {
        addOnsName: addOns,
        tourId: tourList,
        price: parseInt(price)
    };

    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/tour/tour-addOns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response from server contains a success message
        console.log(data);
        alert("AddOns added with Tour");
    })
    .catch(error => {
        console.error('Error saving addOns:', error);

    });

  }