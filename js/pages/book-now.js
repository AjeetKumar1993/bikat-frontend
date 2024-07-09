document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // Get the list ID from the URL
    
    if (id) {
      const tourDetails = JSON.parse(localStorage.getItem(id));
     
      const orderSummaryContainer = document.getElementById('order-summary-container');
       let gstPrice = (tourDetails.price * tourDetails.gst)/100;
       let discount = 0;
       let addOnPrice = 0;
       let totalPrice = tourDetails.price + gstPrice - discount;

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
    const optionsUrl = 'https://decent-line-423710-m0.de.r.appspot.com/api/tour/'+tourId+'/tour-addOns';

    fetch(optionsUrl)
        .then(response => response.json())
        .then(data => {
         
            // Populate options in the dropdown select element
            data.forEach(option => {
              
                if(!option.active){
                  return;
                }
                addOndCheckbox.innerHTML += `<div class="custom-checkbox">
                                <input type="checkbox" id="addOns1" name="addOns1" value="${option.price}" onchange="addOnsCheckboxOnChange()">
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
                addOnPrice += parseFloat(checkbox.value);
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

    paypalButtonRender();
  }

  function paypalButtonRender(){
    paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '1', // Test amount
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