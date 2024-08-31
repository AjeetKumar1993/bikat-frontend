document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const dateid = params.get('dateid');
    
    if (id) {
      const tourDetails = JSON.parse(localStorage.getItem(id));
     
      const orderSummaryContainer = document.getElementById('order-summary-container');
       let gstPrice = (tourDetails.price * tourDetails.gst)/100;
       let discount = 0;
       let addOnPrice = 0;
       let totalPrice = tourDetails.price + gstPrice - discount;
       
       const dropdown = document.getElementById('selectedDates');
       const storedDate = localStorage.getItem("dateid_"+dateid);

       document.getElementById('payment_tour_id').dataset.id=id;
       
       if (storedDate) {
        // If the date exists in localStorage, set it as the selected option
        const option = document.createElement('option');
        const storedDates = storedDate.split(' - ');

        const fromDate = new Date(storedDates[0]);
        const toDate = new Date(storedDates[1]);
  
        option.text = getFormattedDate(fromDate) +" - "+ getFormattedDate(toDate);
        option.value = storedDates[0];
        
        dropdown.appendChild(option);
      } else {
          // If the date doesn't exist, create options based on other data
          // Clear the existing options
          dropdown.innerHTML = '';

          let entries = Object.entries(tourDetails.availableDate)
          let data = entries.map( ([key, val] = entry) => {
              let entriesVal = Object.entries(val)
              let data = entriesVal.map( ([dateKey, val] = entry) => {
                const fromDate = new Date(val.from);
                const toDate = new Date(val.to);
                
                const option = document.createElement('option');
                option.value = val.from;
                option.text = getFormattedDate(fromDate) +" - "+ getFormattedDate(toDate);
                dropdown.appendChild(option);
              });
            
          });
      }


        const orderSummaryHTML = `
        <div class="oder-summary-item">
            <table class="table checkout-table">
            <thead>
                <tr>
                <th scope="col">Tour Place</th>
                <th scope="col">Duration</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><i class="fas fa-map-marker-alt"></i> ${tourDetails.region}</td>
                <td>${tourDetails.day} D / ${tourDetails.night} N</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="oder-right-details-new">
            <div class="price-sec-order">
            <p class="price-am">Price <span> ₹${tourDetails.price} </span></p>
            <p class="discount-am">GST price <span> ₹${gstPrice} </span></p>
            <p class="discount-am">AddOns price <span id="addOnPrice"> ₹${addOnPrice} </span></p>
            <p class="discount-am">Discount price <span> ₹${discount} </span></p>
            <div class="total-price p-0">
                <p class="discount-am mb-lg-0">Total Amount  <span id="totalPriceId"> ₹${totalPrice} </span></p>
            </div>
            
            </div>
        </div>
        `;

        orderSummaryContainer.innerHTML = orderSummaryHTML;

    } else {
      // Handle the case where no list ID is provided in the URL
      window.location.href = 'listing-details.html'; // Redirect back to the listing page
    }

    loadAddOns(id);

  });

  function loadAddOns(tourId){

    const addOndCheckbox = document.getElementById('addOnsCheckbox');
    addOndCheckbox.innerHTML = "";
    // Replace with your actual backend API endpoint to fetch options
    const optionsUrl = 'https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/'+tourId+'/tour-addOns';

    fetch(optionsUrl)
        .then(response => response.json())
        .then(data => {
         
            // Populate options in the dropdown select element
            data.forEach(option => {
              
                if(!option.active){
                  return;
                }
                addOndCheckbox.innerHTML += `<div class="custom-checkbox">
                                <input type="checkbox" id="addOns1" name="addOns1" value="${option.id}###${option.price}" onchange="addOnsCheckboxOnChange()">
                                <label> ${option.addOnsName}</label> <label>   (₹${option.price})</label>
                              </div>
                              `;
            });
        })
        .catch(error => {
            console.error('Error fetching options:');
        });
  }

  function addOnsCheckboxOnChange(){

    let totalPrice =  parseFloat(document.getElementById('totalPriceId').textContent.replace('₹', ''));
    let totalAddOnPrice =  parseFloat(document.getElementById('addOnPrice').textContent.replace('₹', ''));
    totalPrice -= totalAddOnPrice;
    const checkboxes = document.querySelectorAll('#addOnsCheckbox input[type="checkbox"]');
    const totalPriceElement = document.getElementById('totalPriceId');
    const totalAddOnPriceElement = document.getElementById('addOnPrice');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice(totalPrice));
    });

    function updateTotalPrice(totalPrice) {
        console.log("In update"+totalPrice); 
        let addOnPrice = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let val = (checkbox.value).split('###');
                addOnPrice += parseFloat(val[1]);
            }
        });
        totalPrice += addOnPrice; 
        console.log("after update"+totalPrice); 
       
        totalPriceElement.textContent = "₹"+totalPrice;
        totalAddOnPriceElement.textContent = "₹"+addOnPrice;
    }
  }

  function paypalPayment(){

    let paypal = document.getElementById('paypal-container');
    paypal.innerHTML = '';

    paypal.innerHTML += `<h2> Payment method  </h2> <div id="paypal-button-container"></div>`;
    
  //  initiateBooking();
    paypalButtonRender();

  }

  function paypalButtonRender(){
    let totalPrice =  parseFloat(document.getElementById('totalPriceId').textContent.replace('₹', ''));
    
    paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: Math.trunc(totalPrice/80), // Test amount
                currency_code: 'USD'
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            initiateBooking();
          });
        }
      }).render('#paypal-button-container');
  }

  function initiateBooking(){

    
    const email = document.getElementById('booking_email').value;
    const name = document.getElementById('booking_name').value;
    const phone = document.getElementById('booking_phone').value;
    const dob = document.getElementById('booking_dob').value;

    const gender = document.getElementById('gender').value;
    const address_line = document.getElementById('booking_address_line').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('booking_zipcode').value;
   
    const price = document.getElementById('totalPriceId').innerText.replace('₹','');
    
    let selectedDate = document.getElementById('selectedDates').value;
    selectedDate = selectedDate.substring(0,10);
    const tourId = document.getElementById('payment_tour_id').dataset.id;
   
    let checkboxDiv = document.getElementById('addOnsCheckbox');
    let checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    const addOnsCheckbox = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          let val = (checkbox.value).split('###');
          addOnsCheckbox.push(val[0]);
        }
    });
   

    let booking_adult_count = document.getElementById('booking_adult_count').value;

    const userInfo = {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      dateOfBirth: dob,
      address:{
        address: address_line,
        country:country,
        state: state,
        pinCode:  zipcode
      }
    }

    const data = {
      userId: email,
      tourId: tourId,
      userInfo: userInfo,
      addOns: addOnsCheckbox,
      price: parseFloat(price),
      paymentStatus: "success",
      startDate: selectedDate,
      totalParticipants: parseInt(booking_adult_count)
  };

  console.log(data);

  fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/booking/', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
  
      alert('Booking successfully!');
      window.location.href = "listing.html";
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error tour booking!');
      
  });
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