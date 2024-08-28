

document.getElementById('tourForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const tourImage = JSON.parse(localStorage.getItem("images_tourImage"));
    const tourImageGallery = JSON.parse(localStorage.getItem("images_tourImages"));

    const data = {

        name: formData.get('name'),
        slug: formData.get('slug'),
        region: formData.get('region'),
        category: formData.get('category'),
        type: formData.get('type'),
        grade: formData.get('grade'),
        altitude: parseInt(formData.get('altitude')),
        day: parseInt(formData.get('day')),
        night: parseInt(formData.get('night')),
        distance: parseInt(formData.get('distance')),
        minimumAge: parseInt(formData.get('minimumAge')),
        maximumGroupSize: parseInt(formData.get('maximumGroupSize')),
        price: parseInt(formData.get('price')),
        gst: parseInt(formData.get('gst')),
        priceFromTo: formData.get('priceFromTo'),
        overview: formData.get('overview'),
        shortOverview: formData.get('shortOverview'),

        location: formData.get('location'),
        tourImage: tourImage[0],
        gallery: tourImageGallery,
        itinerary: JSON.parse(formData.get('itinerary')),
       // availableDate: JSON.parse(formData.get('availableDate')),
        active: formData.get('active') === 'on'
    };
    
    const inclusionList = [];
    const exclusionList = [];
    const highlightList = [];
    const cancelPolicyList = [];
    const packingList = [];

    for (let i = 1; i <= countArray['inclusion']; i++) {
        const ruleValue = document.getElementById(`inclusion${i}`).value;
        if (ruleValue) {
            inclusionList.push(ruleValue);
        }
    }
    for (let i = 1; i <= countArray['exclusion']; i++) {
    
        const ruleValue = document.getElementById(`exclusion${i}`).value;
        if (ruleValue) {
            exclusionList.push(ruleValue);
        }
    }
    for (let i = 1; i <= countArray['highlight']; i++) {
    
        const ruleValue = document.getElementById(`highlight${i}`).value;
        if (ruleValue) {
            highlightList.push(ruleValue);
        }
    }
    for (let i = 1; i <= countArray['cancelPolicy']; i++) {
    
        const ruleValue = document.getElementById(`cancelPolicy${i}`).value;
        if (ruleValue) {
            cancelPolicyList.push(ruleValue);
        }
    }
    for (let i = 1; i <= countArray['packingList']; i++) {
    
        const ruleValue = document.getElementById(`packingList${i}`).value;
        if (ruleValue) {
            packingList.push(ruleValue);
        }
    }
    data.inclusion = inclusionList;
    data.exclusion = exclusionList;
    data.highlight = highlightList;
    data.cancelPolicy = cancelPolicyList;
    data.packingList = packingList;
   
  
    let itineryFinalData = {}
    for(let i = 1 ;i <= itineraryCount;i++){
        let itineryData =  {
            "title": "",
            "isRequired": true,
            "heading": "",
            "description": "",
            "otherDetails" :[]
        }
        const title = document.getElementById(`titleItinerary${i}`).value;
        if(title){
            itineryData.title = title;
        }
        const heading = document.getElementById(`headingItinerary${i}`).value;
        if(heading){
            itineryData.heading = heading;
        }
        const description = document.getElementById(`descriptionItinerary${i}`).value;
        if(description){
            itineryData.description = description;
        }
        const otherDetails = [];
        let key = "edit-itineraryOtherDetailsDay"+i;
        allOtherDetails = document.querySelectorAll(`[id^="${key}"]`);
        allOtherDetails.forEach(details => {
            otherDetails.push(details.value);
        });
        itineryData.otherDetails = otherDetails;

        itineryFinalData['day'+i] = itineryData;
    }
    data.itinerary = itineryFinalData;
   
    await fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Form submitted successfully!');
        handleCheckboxChange(result.id);
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error submitting form!');
    });
});

document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const tourImageGallery = JSON.parse(localStorage.getItem("images_productImages"));
    const data = {

        name: formData.get('name'),
        slug: formData.get('slug'),
        region: formData.get('product-region'),
        // category: formData.get('product-category'),
        stayCategory: formData.get('product-stay-category'),
        tourPackage: formData.get('product-tour-package'),
        day: parseInt(formData.get('day')),
        night: parseInt(formData.get('day')) - 1,
        price: parseInt(formData.get('price')),
        shortOverview: formData.get('shortOverview'),
        location: formData.get('location'),
        tourImage: tourImageGallery[0],
        active: formData.get('active') === 'on'
    };
  
    const highlightList = [];
    for (let i = 1; i <= countArray['tripHighlight']; i++) {
    
        const ruleValue = document.getElementById(`tripHighlight${i}`).value;
        if (ruleValue) {
            highlightList.push(ruleValue);
        }
    }
    const inclusionList = [];
    for (let i = 1; i <= countArray['tripInclusion']; i++) {
    
        const ruleValue = document.getElementById(`tripInclusion${i}`).value;
        if (ruleValue) {
            inclusionList.push(ruleValue);
        }
    }
    const exclusionList = [];
    for (let i = 1; i <= countArray['tripExclusion']; i++) {
    
        const ruleValue = document.getElementById(`tripExclusion${i}`).value;
        if (ruleValue) {
            exclusionList.push(ruleValue);
        }
    }
    data.highlight = highlightList;
    data.exclusion = exclusionList;
    data.inclusion = inclusionList;

    await fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Form submitted successfully!');
        handleCheckboxChange(result.id);
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error submitting form!');
    });
});

let countArray = {
     inclusion : 0,
     exclusion : 0,
     highlight : 0,
     cancelPolicy : 0,
     packingList : 0,
     tripHighlight : 0,
     tripInclusion : 0,
     tripExclusion : 0
}

function addMore(type) {
    countArray[type]++;
    const rulesContainer = document.getElementById(type);
    const newRule = document.createElement('div');
    newRule.classList.add('rule');
    newRule.innerHTML = `
        <input type="text" id="${type}${countArray[type]}" name="${type}${countArray[type]}" required><br>
        <button type="button" onclick="removeRule(this,'${type}')">Remove</button>
    `;
    rulesContainer.appendChild(newRule);
}
function removeRule(button, type) {
    const ruleDiv = button.parentNode;
    ruleDiv.remove();
    countArray[type]--;
   
}


function handleCheckboxChange(id) {
    const selectedOptions = Array.from(document.querySelectorAll('.checkbox:checked')).map(cb => cb.value);
    console.log(selectedOptions);
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id+'/tour-suggestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedOptions)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error sending selected options:', error));
}

let apiData = {};

function edit(){
   // document.getElementById("table-container").innerHTML = "";
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/list')
        .then(response => response.json())
        .then(result => {
            populateTable(result);
        })
        .catch(error => {
            console.error('Error fetching the tours:', error);
        });
}

function populateTable(data) {
    apiData = data;
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    data.forEach(item => {
      if(!item.active){
         return;
      }  
      const row = document.createElement('tr');
      let region = item.region !== null ? item.region: "NA";
      let category = item.category !== null ? item.category: "NA";
      let type = item.type !== null ? item.type: "NA";
      let price = item.price !== null ? item.price: "0.0";
      let day = item.day !== null ? item.day: "0";
      let night = item.night !== null ? item.night: "0";
      row.innerHTML = `
        <td data-name="tourId">${item.slug}</td>
        <td data-name="name">${item.name}</td>
        <td data-name="region">${region}</td>
        <!-- <td data-name="category">${category}</td>
        <td data-name="type">${type}</td> -->
        <td data-name="stayCategory">${item.stayCategory}</td>
        <td data-name="packageOption">${item.tourPackage}</td>
        <td>${day} Days / ${night} Nights</td>
        <td data-name="price">${price}</td>
        <td data-name="active">${item.active}</td>
        <td>
                <div class="dropdown">
                    <button class="dropdown-btn">Actions</button>
                    <div class="dropdown-content">
                        <!--<button class="view-btn" data-id="${item.id}">Date View</button>
                        <button class="addOns-view-btn" data-id="${item.id}">AddOns View</button> -->
                        <button class="edit-btn" data-id="${item.id}">Edit</button>
                        <button class="duplicate-btn" data-id="${item.id}">Duplicate</button>
                        <button class="isActive-btn" onclick="isActive('${item.id}', ${item.active})" >${item.active ? 'Disable': 'Enable'}</button>
                    </div>
                </div>
        </td>
        <td data-name="grade"  class="hidden">${item.grade}</td>
        <td data-name="altitude"  class="hidden">${item.altitude}</td>
        <td data-name="day"  class="hidden">${item.day}</td>
        <td data-name="night"  class="hidden">${item.night}</td>      
        <td data-name="distance"  class="hidden">${item.distance}</td>
        <td data-name="minimumAge"  class="hidden">${item.minimumAge}</td>
        <td data-name="maximumGroupSize"  class="hidden">${item.maximumGroupSize}</td>
        <td data-name="night"  class="hidden">${item.night}</td>
        <td data-name="gst"  class="hidden">${item.gst}</td>
        <td data-name="priceFromTo"  class="hidden">${item.priceFromTo}</td>
        <td data-name="overview"  class="hidden">${item.overview}</td>
        <td data-name="shortOverview"  class="hidden">${item.shortOverview}</td>      
        <td data-name="tourImage"  class="hidden">${item.tourImage}</td>
        <td data-name="tourImageGallery"  class="hidden">${item.tourImageGallery}</td>
        <td data-name="itinerary"  class="hidden">${item.itinerary}</td>
        <td data-name="inclusion"  class="hidden">${item.inclusion}</td>
        <td data-name="location"  class="hidden">${item.location}</td>
        <td data-name="exclusion"  class="hidden">${item.exclusion}</td>
        <td data-name="highlight"  class="hidden">${item.highlight}</td>
        <td data-name="cancelPolicy"  class="hidden">${item.cancelPolicy}</td>
        <td data-name="packingList"  class="hidden">${item.packingList}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Open edit popup with data for editing
  function openEditPopup(id) {
    
    const item = apiData.find(item => item.id === id);
    console.log(item);
    if (item) {
      document.getElementById("tour-id").innerHTML = item.name;
      document.getElementById("edit-name").value = item.name;
      document.getElementById("edit-tourId").value = item.slug;
      document.getElementById('edit-region').value = item.region;
      document.getElementById('edit-price').value = item.price;
    //   document.getElementById('edit-gst').value = item.gst;
    //   document.getElementById('edit-priceFromTo').value = item.priceFromTo;
      //document.getElementById('edit-category').value = item.category;
      document.getElementById('edit-product-stay-category').value = item.stayCategory;
      document.getElementById('edit-product-package-option').value = item.tourPackage;
     // document.getElementById('edit-type').value = item.type;
      //document.getElementById('edit-grade').value = item.grade;
      document.getElementById('edit-day').value = item.day;
    //   document.getElementById('edit-night').value = item.night;
    //   document.getElementById('edit-altitude').value = item.altitude;
    //   document.getElementById('edit-distance').value = item.distance;
     
    //   document.getElementById('edit-minimumAge').value = item.minimumAge;
    //   document.getElementById('edit-maximumGroupSize').value = item.maximumGroupSize;
    //   document.getElementById('edit-overview').value = item.overview;
      document.getElementById('edit-shortOverview').value = item.shortOverview;
    //   document.getElementById('edit-active').value = item.active;


        // Inclusion
        const checkboxesContainer = document.getElementById('edit-inclusions');
        if(item.inclusion){
            item.inclusion.forEach(item => {
                checkboxGenerate(item, checkboxesContainer);
            });
        }
       
    
        // Exclusion
        if(item.exclusion){
            const exclusionId = document.getElementById("edit-exclusions");
            item.exclusion.forEach(item => {
                checkboxGenerate(item, exclusionId);
            });
        }
       
        // Highlist
        if(item.highlight){
            const highlightId = document.getElementById("edit-highlight");
            item.highlight.forEach(item => {
                checkboxGenerate(item, highlightId);
            });
        }
       

        // // Cancel policy
        // if(item.cancelPolicy){
        //     const cancelPolicyId = document.getElementById("edit-cancelPolicy");
        //     item.cancelPolicy.forEach(item => {
        //         checkboxGenerate(item, cancelPolicyId);
        //     });
        // }
        
        // // Pacling List
        // if(item.packingList){
        //     const packingListId = document.getElementById("edit-packingList");
        //     item.packingList.forEach(item => {
        //         checkboxGenerate(item, packingListId);
        //     });
        // }
        
       
        fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/list')
        .then(response => response.json())
        .then(data => {
           
            const checkboxesContainer = document.getElementById('suggestedTourCheckboxes');
                checkboxesContainer.innerHTML = '';  // Clear existing content
                data.forEach(option => {
                    if(option.id === id){
                        return;
                    }
                    const checkboxDiv = document.createElement('div');
                    checkboxDiv.classList.add('checkbox-container');
                    const label = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = option.id;
                    checkbox.name = 'options';
                    checkbox.classList.add('checkbox');  // Add class for styling
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(option.name));

                    checkboxDiv.appendChild(label);
                    checkboxesContainer.appendChild(checkboxDiv);
                });
        })
        .catch(error => {
            console.error('Error fetching options: 2', error);
            const checkboxesContainer = document.getElementById('suggestedTourCheckboxes');
            checkboxesContainer.innerHTML = '<label>Error loading options</label>';
        }); 
      

      const locationId = document.getElementById("edit-location");
      locationId.innerHTML += `<iframe src="${item.location}" width="100%" height="300" frameborder="0" style="border:0"></iframe>`;
  
      const tourImageId = document.getElementById("edit-tour-image");
      tourImageId.innerHTML += `
            
            <img src="https://storage.googleapis.com/bikat_adventure_image/${item.tourImage}" alt="sm" style="width:30%;height:30%" />
            
      `;
      const galleryId = document.getElementById("edit-tour-gallery");
     
      if(item.gallery){
        item.gallery.forEach(gallery => {
            galleryId.innerHTML += `
                                        <img src="https://storage.googleapis.com/bikat_adventure_image/${gallery}" alt="npm" style="width:30%;height:30%" />
                                   `;
          });
      }
      
      if(item.itinerary){
        editItinerary(item.itinerary);
      }


      document.getElementById('edit-popup').style.display = 'block';
      document.getElementById('save-edit-group-a').dataset.id = id;
    //   document.getElementById('save-edit-group-b').dataset.id = id;
    //   document.getElementById('save-edit-group-c').dataset.id = id;
      document.getElementById('save-edit-group-d').dataset.id = id;
    //   document.getElementById('save-edit-group-e').dataset.id = id;
      document.getElementById('save-edit-group-f').dataset.id = id;
    //   document.getElementById('save-edit-group-g').dataset.id = id; 
      document.getElementById('save-edit-group-h').dataset.id = id;
      document.getElementById('save-edit-group-i').dataset.id = id;
    //   document.getElementById('save-edit-group-j').dataset.id = id;
    }
  }
  
 
  

  function checkboxGenerate(item, checkboxesContainer){
    const checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add('checkbox-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = item; // Use a unique identifier from your data
    checkbox.name = 'checkboxes'; // Optional: Set a common name for all checkboxes
    checkbox.value = item; // Adjust based on your data structure
    checkbox.checked = true;
    const label = document.createElement('label');
    label.setAttribute('for', item); // Match label to checkbox id
    label.textContent = item; // Adjust based on your data structure

    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    checkboxesContainer.appendChild(checkboxDiv);
  }

  function generateCheckboxes(inputId, editId) {
    // Clear previous checkboxes
   // document.getElementById('checkboxContainer').innerHTML = '';

    // Get the input value and split by comma
    let inputText = document.getElementById(inputId).value.trim();
    if(inputText === ''){
        return;
    }
    let item = inputText;//.split(',');

    //items.forEach(item => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item; // Use a unique identifier from your data
        checkbox.name = item; // Optional: Set a common name for all checkboxes
        checkbox.value = item; // Adjust based on your data structure
        checkbox.checked = true;
        const label = document.createElement('label');
        label.setAttribute('for', item); // Match label to checkbox id
        label.textContent = item; // Adjust based on your data structure

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
   
        document.getElementById(editId).appendChild(checkboxDiv);
        document.getElementById(inputId).value = '';
   // });
  }

  // Save edited data
  document.getElementById('save-edit-group-a').addEventListener('click', function() {

    const id = this.dataset.id;
    const region = document.getElementById('edit-region').value;
    const stayCategory = document.getElementById('edit-product-stay-category').value;
    const packageOptions = document.getElementById('edit-product-package-option').value;
    const price = document.getElementById('edit-price').value;
    const name = document.getElementById('edit-name').value;
    const tourId = document.getElementById('edit-tourId').value;
    const day = document.getElementById('edit-day').value;
     
    const data = {
        id: id,
        tourId: tourId,
        name: name,
        region: region,
        stayCategory: stayCategory,
        tourPackage: packageOptions,
        price: price,
        day : day,
        night : day - 1
    };


    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Tour updated successfully!');
       
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
        
    });


  });

//   document.getElementById('save-edit-group-b').addEventListener('click', function() {
//     const id = this.dataset.id;
  
//     const day = document.getElementById('edit-day').value;
//     const night = document.getElementById('edit-night').value;
//     const altitude = document.getElementById('edit-altitude').value;
//     const distance = document.getElementById('edit-distance').value;
//     const minimumAge = document.getElementById('edit-minimumAge').value;
//     const maximumGroupSize = document.getElementById('edit-maximumGroupSize').value;
     
//     const data = {
//         id: id, // Replace with actual ID value

//         day: parseInt(day), // Convert to integer if needed
//         night: parseInt(night), // Convert to integer if needed
//         altitude: parseFloat(altitude), // Convert to float if needed
//         distance: parseFloat(distance), 
//         minimumAge: parseInt(minimumAge),
//         maximumGroupSize: parseInt(maximumGroupSize)
//     };
   
//     console.log(data);

//     fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
//         method: 'PUT',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
//            },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log('Success:', result);
//         alert('Tour updated successfully!');
       
//     })
//     .catch(error => {
// 		console.log('Error:'+ error);
//         console.error('Error:', error);
//         alert('Error tour updating!');
       
//     });


//   });

//   document.getElementById('save-edit-group-c').addEventListener('click', function() {
//     const id = this.dataset.id;
//     const price = document.getElementById('edit-price').value;
//     const gst = document.getElementById('edit-gst').value;
//     const priceFromTo = document.getElementById('edit-priceFromTo').value;
   
     
//     const data = {
//         id: id, // Replace with actual ID value
//         price: parseFloat(price), // Convert to float if needed
//         gst: parseFloat(gst), // Convert to float if needed
//         priceFromTo: priceFromTo
//     };
   
//     console.log(data);

//     fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
//         method: 'PUT',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
//            },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log('Success:', result);
//         alert('Tour updated successfully!');
       
//     })
//     .catch(error => {
// 		console.log('Error:'+ error);
//         console.error('Error:', error);
//         alert('Error tour updating!');
       
//     });


//   });

  document.getElementById('save-edit-group-d').addEventListener('click', function() {
    const id = this.dataset.id;
   
   // const overview = document.getElementById('edit-overview').value;
    const shortOverview = document.getElementById('edit-shortOverview').value;

    const data = {
        id: id, // Replace with actual ID value
       // overview: overview,
        shortOverview: shortOverview
    };
   
   // console.log(data);

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Tour updated successfully!');
       
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
       
    });


  });

  function isActive(id, isActive){
    
    const data = {
        id: id, // Replace with actual ID value
        active: !isActive
    };
   
    console.log(data);

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Tour updated successfully!');
       
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
        
    });


  }


  function saveGroupF(type){  

    const id = document.getElementById('save-edit-group-f').dataset.id;
   
    let inclusionList = [];
    let exclusionList = [];
    let highlightList = [];
    //let cancelPolicyList = [];
    //let packingList = [];

    let checkboxDiv = document.getElementById('edit-inclusions');
    let checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            inclusionList.push(checkbox.value);
        }
    });

    checkboxDiv = document.getElementById('edit-exclusions');
    checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            exclusionList.push(checkbox.value);
        }
    });
   
    checkboxDiv = document.getElementById('edit-highlight');
    checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            highlightList.push(checkbox.value);
        }
    });

    // checkboxDiv = document.getElementById('edit-cancelPolicy');
    // checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    // checkboxes.forEach((checkbox) => {
    //     if (checkbox.checked) {
    //         cancelPolicyList.push(checkbox.value);
    //     }
    // });

    // checkboxDiv = document.getElementById('edit-packingList');
    // checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    // checkboxes.forEach((checkbox) => {
    //     if (checkbox.checked) {
    //         packingList.push(checkbox.value);
    //     }
    // });

    const data = {
        id: id, // Replace with actual ID value
    };
    if(type === 'inclusion'){
        data.inclusion = inclusionList;
    }else if(type === 'exclusion'){
        data.exclusion = exclusionList;
    }else if(type === 'highlight'){
        data.highlight = highlightList;
    }
    // }else if(type === 'cancelPolicy'){
    //     data.cancelPolicy = cancelPolicyList;
    // }else if(type === 'packingList'){
    //     data.packingList = packingList;
    // }

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Tour updated successfully!');
      
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
       
    });
  }

//   document.getElementById('save-edit-group-g').addEventListener('click', function() {
//     const id = this.dataset.id;
   
//     let tours = [];

//     let checkboxDiv = document.getElementById('suggestedTourCheckboxes');
//     let checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
//     checkboxes.forEach((checkbox) => {
//         if (checkbox.checked) {
//             tours.push(checkbox.value);
//         }
//     });

//     fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id+'/tour-suggestion', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
//            },
//         body: JSON.stringify(tours)
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log('Success:', result);
//         alert('Tour updated successfully!');
       
//     })
//     .catch(error => {
// 		console.log('Error:'+ error);
//         console.error('Error:', error);
//         alert('Error tour updating!');
//     });


//   });

  document.getElementById('save-edit-group-h').addEventListener('click', function() {
    const id = this.dataset.id;

    let newLocation = document.getElementById('newLocation').value;
    console.log(newLocation);
    const data = {
        location : newLocation
    }

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Tour updated successfully!');
      
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
       
    });


  });

  document.getElementById('save-edit-group-i').addEventListener('click', function() {
    const id = this.dataset.id;

    const tourImage = JSON.parse(localStorage.getItem("images_editNewTourImage"));
    //const tourImageGallery = JSON.parse(localStorage.getItem("images_editNewTourImages"));
    const data = {}
    let isUpdate = false;
    if(tourImage.length !== 0){
        data.tourImage = tourImage[0];
        isUpdate = true;
    }
    // if(tourImageGallery.length !== 0){
    //     data.gallery = tourImageGallery;
    //     isUpdate = true;
    // }

    if(isUpdate === false){
        alert("No update");
        return;
    }

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Tour updated successfully!');
       
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
       
    });

  });


  // Close edit popup
  function closeEditPopup() {
   
     // Reset input fields in Group A
     document.getElementById("edit-name").value = "";
 
    // document.getElementById("edit-stay-category").value = "";
    //  document.getElementById("edit-type").value = "";
    //  document.getElementById("edit-grade").value = "";
 
     // Reset input fields in Group B
    //  document.getElementById("edit-altitude").value = "";
     document.getElementById("edit-day").value = "";
    //  document.getElementById("edit-night").value = "";
    //  document.getElementById("edit-distance").value = "";
    //  document.getElementById("edit-minimumAge").value = "";
    //  document.getElementById("edit-maximumGroupSize").value = "";
 
     // Reset input fields in Group C
     document.getElementById("edit-price").value = "";
    //  document.getElementById("edit-gst").value = "";
    //  document.getElementById("edit-priceFromTo").value = "";
 
     // Reset input fields in Group D
    //  document.getElementById("edit-overview").value = "";
     document.getElementById("edit-shortOverview").value = "";
 
     // Reset input fields in Group E
    //  document.getElementById("edit-active").value = "";
 
     // Reset dynamically generated checkboxes in Group F
     document.getElementById("edit-inclusions").innerHTML = "";
     document.getElementById("edit-exclusions").innerHTML = "";
     document.getElementById("edit-highlight").innerHTML = "";
    //  document.getElementById("edit-cancelPolicy").innerHTML = "";
    //  document.getElementById("edit-packingList").innerHTML = "";
 
     // Reset input fields and content in Group G (assuming it's dynamically loaded)
    //  document.getElementById("suggestedTourCheckboxes").innerHTML = '<label>Loading...</label>';
 
     // Reset input fields in Group H
     document.getElementById("edit-location").innerHTML = "";
     document.getElementById("newLocation").value = "";
 
     // Reset input fields and content in Group I (assuming it's related to images)
     document.getElementById("editNewTourImage").innerHTML = "";
     document.getElementById("editNewImagePreview").value = "";
     document.getElementById("edit-tour-image").innerHTML = "";
    //  document.getElementById("editNewTourImages").innerHTML = "";
    //  document.getElementById("editNewImagePreviewContainer").value = "";

     // Reset input fields and content in Group J (assuming it's related to itinerary)
    //  document.getElementById("edit-itinerary").innerHTML = "";
 
     // Additional resets can be added as per your actual requirements
 
     // Optionally, reset any other state or variables related to the popup

     
    document.getElementById('edit-popup').style.display = 'none';

  }
  function closeDateEditPopup() {
    document.getElementById('edit-tour-date-popup').style.display = 'none';
  } 
  function closeAddOnsEditPopup() {
    document.getElementById('edit-tour-addOns-popup').style.display = 'none';
  }
 // Event delegation for edit buttons
 document.getElementById('data-table').addEventListener('click', function(e) {
    
    if (e.target.classList.contains('edit-btn')) {
        const id = (e.target.getAttribute('data-id'));
        openEditPopup(id);
    }else if (e.target.classList.contains('view-btn')) {
        const id = (e.target.getAttribute('data-id'));
        viewTourDate(id);
    }else if (e.target.classList.contains('duplicate-btn')) {
        const id = (e.target.getAttribute('data-id'));
        //duplicateRecord(e.target);
        duplicateTour(id);
    }else if (e.target.classList.contains('addOns-view-btn')) {
        const id = (e.target.getAttribute('data-id'));
        viewTourAddOns(id);
    }

  });

  function duplicateTour(id){

    fetch("https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/duplicate/"+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
       
        if(data.errorMessage){
            alert('Failed: '+ data.errorMessage);
        }else{
           alert("Duplicate successfull!");
        }
    })

  }
  function duplicateRecord(button) {
    var row = button.closest('tr');
    // Clone the row
    var clone = row.cloneNode(true);
    // Append the cloned row to the table
    document.getElementById('data-table').getElementsByTagName('tbody')[0].appendChild(clone);

    var name = clone.querySelector('[data-name="name"]').innerText;
    var slug = clone.querySelector('[data-name="tourId"]').innerText;
    var region = clone.querySelector('[data-name="region"]').innerText;
    var stayCategory = clone.querySelector('[data-name="stayCategory"]').innerText;
    var tourPackage = clone.querySelector('[data-name="packageOption"]').innerText;
    var day = clone.querySelector('[data-name="day"]').innerText;
    var price = clone.querySelector('[data-name="price"]').innerText;
    var gst = clone.querySelector('[data-name="gst"]').innerText;
    var shortOverview = clone.querySelector('[data-name="shortOverview"]').innerText;
    var location = clone.querySelector('[data-name="location"]').innerText;
    var tourImage = clone.querySelector('[data-name="tourImage"]').innerText;
   
    var active = clone.querySelector('[data-name="active"]').innerText;

    // Prepare data to send to the backend
    const data = {

        name: name+"_CLONE",
        slug: slug+"_CLONE",
        region: region,
        stayCategory: stayCategory,
        tourPackage: tourPackage,
        day: parseInt(day),
        night: parseInt(day) - 1,
        price: parseInt(price),
        gst: parseInt(gst),
        shortOverview: shortOverview,
        location: location,
        tourImage: tourImage,
    
        active: active
    };

    console.log(data);
    // Send data to the backend
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Form duplicate successfully!');
        handleCheckboxChange(result.id);
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error while tour duplication!');
    });

}

  function updateTourDate(id, isActive){
      
        const data = {
            active: isActive, // Replace with actual ID value
        };
        fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id+'/date', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
        
            alert('Tour date updated successfully!');
        
        })
        .catch(error => {
            console.log('Error:'+ error);
            console.error('Error:', error);
            alert('Error tour updating!');
            
        });
    }
  
    function updateTourAddOns(id, isActive){
        
        const data = {
            active: isActive, // Replace with actual ID value
        };
        fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id+'/tour-addOns', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
        
            alert('Tour date updated successfully!');
        
        })
        .catch(error => {
            console.log('Error:'+ error);
            console.error('Error:', error);
            alert('Error tour updating!');
            
        });
    }
  function viewTourDate(id) {
   
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id+'/date')
    .then(response => response.json())
    .then(result => {
        viewDatePopup(result);
    })
    .catch(error => {
        console.error('Error fetching the tours:', error);
    });
  }
  function viewTourAddOns(id) {
   
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/'+id+'/tour-addOns')
    .then(response => response.json())
    .then(result => {
        viewAddOnPopup(result);
    })
    .catch(error => {
        console.error('Error fetching the tours:', error);
    });
  }

  function getFormattedDate(date){
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based, so we add 1
    const day = ('0' + date.getDate()).slice(-2);

    // Form the desired date string in yyyy-MM-dd format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

  function viewDatePopup(data){

    document.getElementById('edit-tour-date-popup').style.display = 'block';
    
    const tableBody = document.querySelector('#tour-date-view-table tbody');
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');
      let fromDate = new Date(item.from);
      let toDate = new Date(item.to);
    
      row.innerHTML = `
        <td>${getFormattedDate(fromDate)}</td>
        <td>${getFormattedDate(toDate)}</td>
      `;

      if(item.active == true){
        row.innerHTML += ` <td><button type="button" style="background-color:blue" onclick="updateTourDate('${item.id}', false)">Disable</button></td>`;
      }else{
        row.innerHTML += ` <td><button type="button" onclick="updateTourDate('${item.id}', true)">Enable</button></td>`;
      }

      tableBody.appendChild(row);
    });
  }
  function viewAddOnPopup(data){

    document.getElementById('edit-tour-addOns-popup').style.display = 'block';
    
    const tableBody = document.querySelector('#tour-addOns-view-table tbody');
    tableBody.innerHTML = '';
    
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.addOnsName}</td>
        <td>${item.price}</td>
      `;

      if(item.active == true){
        row.innerHTML += ` <td><button type="button" style="background-color:blue" onclick="updateTourAddOns('${item.id}', false)">Disable</button></td>`;
      }else{
        row.innerHTML += ` <td><button type="button" onclick="updateTourAddOns('${item.id}', true)">Enable</button></td>`;
      }

      tableBody.appendChild(row);
    });
  }
  


  function toggleGroup(groupId) {

    var groups = document.querySelectorAll('.form-group'); // Select all groups
    groups.forEach(function(group) {
        if (group.id === groupId) {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });
}




document.addEventListener('DOMContentLoaded', function() {
    const optionsSelect = document.getElementById('options');
    const savedDatesContainer = document.getElementById('savedDates');
    const statusMessage = document.getElementById('statusMessage');

    // Fetch options for dropdown from backend
    fetchOptions();

    function fetchOptions() {
        // Replace with your actual backend API endpoint to fetch options
        const optionsUrl = 'https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/list';

        fetch(optionsUrl)
            .then(response => response.json())
            .then(data => {
                // Populate options in the dropdown select element
                const productSlugContainer = document.getElementById('product-slug-container');
                productSlugContainer.innerHTML = '';
                const productSlugPolicyContainer = document.getElementById('product-slug-policy-container');
                productSlugPolicyContainer.innerHTML = '';
                const productSlugEventContainer = document.getElementById('product-slug-event-container');
                productSlugEventContainer.innerHTML = '';
                data.forEach(option => {
                    if(option.stayCategory){
                        productSlugContainer.innerHTML += `<option value="${option.id}">${option.slug}</option>`;
                        productSlugPolicyContainer.innerHTML += `<option value="${option.id}">${option.slug}</option>`;
                        productSlugEventContainer.innerHTML += `<option value="${option.id}">${option.slug}</option>`;
                    }
                    
                    const optionElement = document.createElement('option');
                    optionElement.value = option.id;
                    optionElement.textContent = option.name;
                    optionsSelect.appendChild(optionElement);
                });
                loadAddOnOptions(data);
            })
            .catch(error => {
                console.error('Error fetching options: 3', error);
                statusMessage.textContent = 'Failed to fetch options';
            });
    }

    // Function to fetch and display saved dates
    function fetchAndDisplaySavedDates() {
        // Replace with your actual backend API endpoint to fetch saved dates
        const datesUrl = 'https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/date';

        fetch(datesUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous content
                savedDatesContainer.innerHTML = '';

                // Loop through each saved date and create HTML elements
                data.dates.forEach(date => {
                    // Create container div for each date-row
                    const dateRow = document.createElement('div');
                    dateRow.classList.add('date-row');
                    const dateFormat = new Date(date);
                   
                    // Create checkbox
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = getFormattedDate(dateFormat);
                    checkbox.id = getFormattedDate(dateFormat); // You can set a unique ID here if needed

                    // Create label for checkbox
                    const label = document.createElement('label');
                    label.htmlFor = getFormattedDate(dateFormat);
                    label.textContent = getFormattedDate(dateFormat);

                    // Append checkbox and label to the dateRow container
                    dateRow.appendChild(checkbox);
                    dateRow.appendChild(label);

                    // Append the dateRow to the savedDatesContainer
                    savedDatesContainer.appendChild(dateRow);
                });
            })
            .catch(error => {
                console.error('Error fetching saved dates:', error);
                statusMessage.textContent = 'Failed to fetch saved dates';
            });
    }

    // Initial fetch and display saved dates when the page loads
    fetchAndDisplaySavedDates();
});


function loadAddOnOptions(data) {

    const optionsSelect = document.getElementById('addOns_tour_options');
   
    data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.textContent = option.name;
        optionsSelect.appendChild(optionElement);
    });
        
}

 // Handle form submission to save date
 document.getElementById('add-date-submit').addEventListener('click', function(event) {
    event.preventDefault();

    const selectedDate = document.getElementById('selectedDate').value;

    // Replace with your actual backend API endpoint to save date
    const saveUrl = 'https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/date';

    // Prepare payload in JSON format
    const payload = {
        dates: [selectedDate]
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
       
        if(data.errorMessage){
            console.log(data);
            alert('Failed: '+ data.errorMessage);
           
        }
        else{
           
            // Assuming the response from server contains a success message
            statusMessage.textContent = "Saved";
            alert('Saved');
           
            // Refresh saved dates display after saving
        // fetchAndDisplaySavedDates();
        }
        
        
    })
    .catch(error => {
        console.error('Error saving date:', error);
        statusMessage.textContent = 'Failed to save date';
    });
});




document.getElementById('date-form-submit').addEventListener('click', function(e) {
    
    const selectElement = document.getElementById('options');
    
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    
    const checkboxDiv = document.getElementById('savedDates');
    const checkboxes = checkboxDiv.querySelectorAll('input[type=checkbox]');
    console.log(checkboxes);
   
    let selectedValues = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    

     // Prepare payload in JSON format
     const payload = {
        dates: selectedValues,
        tourIds: selectedOptions
    };

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/available-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response from server contains a success message
        statusMessage.textContent = "Saved";
        alert('Saved');
        // Refresh saved dates display after saving

    })
    .catch(error => {
        console.error('Error saving date:', error);
        statusMessage.textContent = 'Failed to save date';
    });

  });
  