

document.addEventListener("DOMContentLoaded", function() {
    // Fetch user data from the API
    var userId = localStorage.getItem('userId')
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/user/profile/'+userId)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Populate the form fields with user data
            document.getElementById('name').value = data.name;
            
            document.getElementById('birthday').value = data.dateOfBirth;
            document.getElementById('gender').value = data.gender;
            document.getElementById('marital_status').value = data.maritalStatus
            document.getElementById('emailId').value = data.emailId;
            document.getElementById('address').value = data.address
            document.getElementById('mobile_number').value = data.mobile;
            document.getElementById('country_select').value = data.country;
            document.getElementById('pincode').value = data.pinCode;
        });
    });

    $('.js-toggleForm').click(function(){
        var form_ele = '.form';
        // get the status of form
       var form_status = $(form_ele).hasClass('form--disabled') ? 'disabled' : 'enabled';
       
       // check if disabled or enabled
       switch (form_status){
         case 'enabled':
          
           const formData = {
                name: document.getElementById('name').value,
                dateOfBirth: document.getElementById('birthday').value,
                gender: document.getElementById('gender').value,
                maritalStatus: document.getElementById('marital_status').value,
                emailId: document.getElementById('emailId').value,
                address: document.getElementById('address').value,
                mobile: document.getElementById('mobile_number').value,
                country: document.getElementById('country_select').value,
                pinCode: document.getElementById('pincode').value
            };
            console.log(formData);
            var userId = localStorage.getItem('userId')
            // Send form data to the API
            fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/user/profile/'+userId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle response from the API
                console.log(data);
                alert("Update profile successfully!");
            });
           break;

       }
     });

     document.getElementById('v-pills-profile-tab').addEventListener('click', function(e){
        let userId = localStorage.getItem('userId')
        let page =1;
        let limit = 10;
        const fetchUrl = `http://localhost:8080/api/booking/list?page=${page}&pageSize=${limit}&userId=${userId}`;
        const payload = {}
        fetch(fetchUrl, { 
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then(response => response.json())
            .then(result => {
                var bookingList = document.getElementById("bookingList");
                
                result.data.forEach(booking => {
                    const checkInDate = new Date(booking.checkIn);
                    const checkOutDate = new Date(booking.checkOut);
                    bookingList.innerHTML += `
                    <tr>
                        <td>
                            <a href="#" class="pack-divsbn">
                                <figure>
                                    <img src="images/d-thums-nx4.jpg" alt="mn"/>
                                </figure>
                                <span> Rome </span>
                            </a>
                        </td>
                        <td>15 Days </td>
                        <td>$320,800</td>
                        <td>${checkInDate.toISOString().split('T')[0]} </td>
                        <td>${checkOutDate.toISOString().split('T')[0]} </td>
                        <td>
                            <div class="d-flex align-items-center justify-content-between">
                                
                                <span>${booking.status} </span>
                                <div class="dropdown">
                                    <button class="btn p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#">Cancel Booking</a></li>
                                        <li><a class="dropdown-item" href="#">Delete Trip</a></li>
                                    
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                
                    `
                });
 

            })
            .catch(error => {
                console.error('Error fetching options:', error);
                alert('Error fetching options: '+ error);
            });

     });