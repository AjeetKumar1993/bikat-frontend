// ****************************************************Add Itinerary****************************//
let itineraryCount = 0;

function addItinerary() {
    itineraryCount++;
    const rulesContainer = document.getElementById('itinerary');
    const newRule = document.createElement('div');
    newRule.classList.add('itinerary-rule');
    newRule.setAttribute('id', `itinerary-rule${itineraryCount}`); // Add unique id to each rule
    newRule.innerHTML = `
        <label for="Day${itineraryCount}">Day ${itineraryCount}:</label><br>
        <label for="title">Title:</label>
        <input type="text" id="titleItinerary${itineraryCount}" name="itinerary${itineraryCount}" required></input>
        <label for="heading">Heading:</label>
        <input type="text" id="headingItinerary${itineraryCount}" name="itinerary${itineraryCount}" required></input>
        <label for="description">Description:</label>
        <textarea id="descriptionItinerary${itineraryCount}" name="itinerary${itineraryCount}" required></textarea>

        <label for="itineraryOtherDetails">Itinerary OtherDetails:</label>
        <div id="itineraryOtherDetails${itineraryCount}">
            
        </div>
        <button type="button" onclick="addItineryOtherDetails(${itineraryCount})">Add Other Details</button><br><br>

        <button type="button" onclick="removeItinery(${itineraryCount})">Remove Itinerary</button><br>
    `;
    rulesContainer.appendChild(newRule);
}

function removeItinery(indexToRemove) {
    const ruleToRemove = document.getElementById(`itinerary-rule${indexToRemove}`);
    ruleToRemove.remove();

    // Update day labels and input IDs/names for remaining rules
    const allRules = document.querySelectorAll('.itinerary-rule');
    itineraryCount--; // Decrement the itinerary count

    allRules.forEach((rule, index) => {
        const currentDay = index + 1;
        const dayLabel = rule.querySelector('label[for^="Day"]');
        if (dayLabel) {
            dayLabel.textContent = `Day ${currentDay}:`;
        }

        // Update IDs and names for inputs
        const inputs = rule.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const nameAttr = input.getAttribute('name');
            if (nameAttr && nameAttr.startsWith('itinerary')) {
                const newAttr = nameAttr.replace(/\d+/, currentDay);
                input.setAttribute('name', newAttr);
                input.setAttribute('id', `${input.getAttribute('id').replace(/\d+/, currentDay)}`);
            }
        });
    });
}
function addItineryOtherDetails(day){
   
    let count = 'day'+day+'Count';
    dayCounts[count]++;

    const rulesContainer = document.getElementById('itineraryOtherDetails'+day);
    const newRule = document.createElement('div');
    //newRule.classList.add('addItineryOtherDetails-rule');
    newRule.innerHTML = `
        <input type="text" id="itineraryOtherDetailsDay${day}${dayCounts[count]}" name="itineraryOtherDetailsDay${day}${dayCounts[count]}" required><br>
        <button type="button" onclick="removeItineryOtherDetails(this,'${count}')">Remove</button>
    `;
    rulesContainer.appendChild(newRule);
}
function removeItineryOtherDetails(button, count){
   
    const ruleDiv = button.parentNode;
    ruleDiv.remove();
    dayCounts[count]--;
}

let dayCounts = {
    day1Count: 0,
    day2Count: 0,
    day3Count: 0,
    day4Count: 0,
    day5Count: 0,
    day6Count: 0,
    day7Count: 0,
    day8Count: 0,
    day9Count: 0,
    day10Count: 0,
    day11Count: 0,
    day12Count: 0,
    day13Count: 0,
    day14Count: 0,
    day15Count: 0,
  };


  document.getElementById('itineraryForm').addEventListener('submit', async function(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    
    const data = {

       
        tourId: formData.get('product-slug-container'),
        title: formData.get('product_title'),
        location: formData.get('itinerary_location'),
        dayNumber: formData.get('dayNumber'),
        description: formData.get('description'),
        wikiParsedDescription: formData.get('wikiDescription'),
        isLeisureDay: formData.get('isLeisureDay') === 'on',
       
    };
 
    
    await fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status >= 500 && response.status < 600) {
                // Handle server errors (5xx)
                throw new Error(`Server Error: ${response.status}`);
            }
            // Handle other HTTP errors
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json(); // or response.text() based on your needs
    })
    .then(result => {
        
        if(result.errorMessage){
            alert('Failed: '+ result.errorMessage);
            return;
        }
        document.getElementById('itineraryId').dataset.id = result.id;
        alert('Itinerary submitted successfully!');
        
        event.target.elements['itinerary_location'].disabled = true;
        event.target.elements['product-slug-container'].disabled = true;
       // handleCheckboxChange(result.id);
      // var contentDiv = document.getElementById('eventData');
      // contentDiv.classList.remove('hidden');
      // contentDiv.classList.add('visible');
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error submitting form!');
    });

  });

  function disableFormDataFields(event, formData){

    for (const pair of formData.entries()) {
        const [fieldName, _] = pair;
        const inputElement = event.target.elements[fieldName];
        if (inputElement) {
            inputElement.disabled = true;
        }
    }
  }
  document.getElementById('eventPointForm').addEventListener('submit', async function(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const imageGallery = JSON.parse(localStorage.getItem("images_eventPointImage"));
    const data = {

        location: formData.get('event-point-location'),
        eventType: formData.get('eventType'),
        title: formData.get('evevntTitle'),
        mapUrl: formData.get('googleMap'),
        imageUrl: imageGallery[0]
    };
 
    
    await fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/transfer/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        
        if(result.errorMessage){
            alert('Failed: '+ result.errorMessage);
            return;
        }
        alert('Transfer added successfully!');
      
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error submitting form!');
    });

  });

  function loadEventDatails(){
    
     fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/transfer/event')
         .then(response => response.json())
         .then(result => {
            viewEventData(result);
         })
         .catch(error => {
             console.error('Error fetching the tours:', error);
         });
 }
 
 function viewEventData(data) {
     apiData = data;
     const tableBody = document.querySelector('#view-event tbody');
     tableBody.innerHTML = '';
     const locationTransferMap = new Map();
     const locationAttractionMap = new Map();
     data.forEach(item => {

       const row = document.createElement('tr');
       row.innerHTML = `
         <td data-name="location">${item.location}</td>
         <td data-name="eventType">${item.eventType}</td>
         <td data-name="title">${item.title}</td>
         <td data-name="googleMap"><a href="${item.mapUrl}" target="_blank">Link</a></td>
         <td data-name="imageUrl"> <img src="https://storage.googleapis.com/fullontravel/${item.imageUrl}" alt="sm" class="image-preview" /></td>
       `;
       tableBody.appendChild(row);

    
       const idAndTitleMap = new Map();
       idAndTitleMap.set(item.id, item.title);
      
       if(item.eventType === 'attraction'){
            if (locationAttractionMap.has(item.location)) {
                locationAttractionMap.get(item.location).push(idAndTitleMap);
            } else {
                locationAttractionMap.set(item.location, [idAndTitleMap]);
            }
       }else{
            if (locationTransferMap.has(item.location)) {
                locationTransferMap.get(item.location).push(idAndTitleMap);
            } else {
                locationTransferMap.set(item.location, [idAndTitleMap]);
            }
       }
   
     });

    let transferObject = {};
    locationTransferMap.forEach((value, key) => {
        let arrayValue = value.map(map => Array.from(map));
        transferObject[key] = JSON.stringify(arrayValue);
    });
   
    localStorage.setItem('transferPoints', JSON.stringify(transferObject));

    let attractionObject = {};
    locationAttractionMap.forEach((value, key) => {
        let arrayValue = value.map(map => Array.from(map));
        attractionObject[key] = JSON.stringify(arrayValue);
    });
   
    localStorage.setItem('attractionPoints', JSON.stringify(attractionObject));
    
}

function fetchItineraryEventCategory(){

    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/images')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("itinerary_event_data", Json.stringify(data));
    })
    .catch(error => {
        alert('Error fetching options: 4', error);
        
    });
}  
function loadItineraryEventCategory(location) {
   
  
   const data = localStorage.getItem('itinerary_event_data');
   
   if(data.Activities){
        const eventTypeTitle = document.getElementById('activityTitle');
        eventTypeTitle.innerHTML = '';
    
        data.Activities.forEach(activity =>{
            if(activity.location === location){
                eventTypeTitle.innerHTML += `<option value="${activity.titile}">${activity.titile}</option>`;
            }
        });
    }
    if(data.Properties){
        const eventTypeTitle = document.getElementById('hotelTitle');
        eventTypeTitle.innerHTML = '';
    
        data.Properties.forEach(activity =>{
            if(activity.location === location){
                eventTypeTitle.innerHTML += `<option value="${activity.titile}">${activity.titile}</option>`;
            }
        });
    }
    
   

}
function handleLocationChange(selectElement) {
    
    var selectedValue = selectElement.value;

    loadItineraryEventCategory(selectedValue);

}

function handleEventTypeChange(selectElement) {
    
    var selectedValue = selectElement.value;
    
    var eventDivs = document.querySelectorAll('.event-data');
    eventDivs.forEach(function(div) {
        // If the div id matches the eventType, show it; otherwise, hide it
        if (div.id === selectedValue) {
            div.classList.remove('hidden');
            div.classList.add('visible');
        } else {
            div.classList.remove('visible');
            div.classList.add('hidden');
        }
    });
    
    addTransferPoints();
    addAttractionPoints();
    addActivitesData();
    addPropertiesData();

}

function addPropertiesData(){

    let retrievedMap = new Map();
    let retrievedMapObject = JSON.parse(localStorage.getItem('propertiesActivityData'));
    Object.keys(retrievedMapObject).forEach(key => {
        let parsedArray = JSON.parse(retrievedMapObject[key]);
        let mapArray = parsedArray.map(entry => new Map(entry));
        retrievedMap.set(key, mapArray);
    });
    
    const location = document.getElementById('itinerary_event_location').value;
    
    const hotelLists = document.getElementById('hotelLists');
    hotelLists.innerHTML = '';
   
 
    let selectHTML = `<select id="hotelPoints" name="hotelPoints" style="margin-right: 10px;">`;

    if(retrievedMap.has(location)){
        retrievedMap.get(location).forEach((valueMap) => {
           
            let [key, value] = [...valueMap.entries()][0]; 
            selectHTML += `<option value="${key}">${value}</option>`;
        });
    }
    selectHTML  += `</select>`;
    selectHTML += `<button type="button" onclick="selectAndAddTransfer('hotelPoints')">Add</button>`;

    hotelLists.innerHTML += selectHTML;
}

function addActivitesData(){

    let retrievedMap = new Map();
    let retrievedMapObject = JSON.parse(localStorage.getItem('activitiesActivityData'));
    Object.keys(retrievedMapObject).forEach(key => {
        let parsedArray = JSON.parse(retrievedMapObject[key]);
        let mapArray = parsedArray.map(entry => new Map(entry));
        retrievedMap.set(key, mapArray);
    });

   
    const location = document.getElementById('itinerary_event_location').value;
    
    const activitactivityListyTitle = document.getElementById('activityList');
    activitactivityListyTitle.innerHTML = '';

    if(retrievedMap.has(location)){
        retrievedMap.get(location).forEach((valueMap) => {
           
            let [key, value] = [...valueMap.entries()][0]; 
            activitactivityListyTitle.innerHTML += `<option value="${key}">${value}</option>`;
        });
    }
}

function addAttractionPoints(){
    
    const addAttractionPoints = document.getElementById('addAttractionPoints');
    addAttractionPoints.innerHTML = '';
    const leisurePlaceLists = document.getElementById('leisurePlaceLists');
    leisurePlaceLists.innerHTML = '';
    const location = document.getElementById('itinerary_event_location').value;
    
   // Retrieve Object from localStorage and convert back to Map
    let retrievedMap = new Map();
    let retrievedMapObject = JSON.parse(localStorage.getItem('attractionPoints'));
    
    if(retrievedMapObject){
        Object.keys(retrievedMapObject).forEach(key => {
            let parsedArray = JSON.parse(retrievedMapObject[key]);
            let mapArray = parsedArray.map(entry => new Map(entry));
            retrievedMap.set(key, mapArray);
        });
    
    }
   
    let selectHTML = `<select id="attractionPoints" name="attractionPoints" style="margin-right: 10px;">`;

    if(retrievedMap.has(location)){
        retrievedMap.get(location).forEach((valueMap) => {
           
            let [key, value] = [...valueMap.entries()][0]; 
            selectHTML += `<option value="${key}">${value}</option>`;
        });
    }
    selectHTML  += `</select>`;
    selectHTML += `<button type="button" onclick="selectAndAddTransfer('attractionPoints')">Add</button>`;

    addAttractionPoints.innerHTML = selectHTML;
    leisurePlaceLists.innerHTML = selectHTML;
   
}

function addTransferPoints(){
   
    const addTransferPoints = document.getElementById('transferPoints');
    addTransferPoints.innerHTML = '';

    const location = document.getElementById('itinerary_event_location').value;
    
   // Retrieve Object from localStorage and convert back to Map
    let retrievedMap = new Map();
    let retrievedMapObject = JSON.parse(localStorage.getItem('transferPoints'));
    if(retrievedMapObject){
        Object.keys(retrievedMapObject).forEach(key => {
            let parsedArray = JSON.parse(retrievedMapObject[key]);
            let mapArray = parsedArray.map(entry => new Map(entry));
            retrievedMap.set(key, mapArray);
        });
    
    }


    let selectHTML = `<select id="transferPointss" name="transferPointss" style="margin-right: 10px;">`;
    const slug = document.getElementById('product-slug-container').value;
    console.log(slug);
    const lastDayTransferPointData =  localStorage.getItem("lastDayTransferPoint_"+slug);
    console.log(lastDayTransferPointData);
    if(lastDayTransferPointData){
        const lastDayTransferPoint = JSON.parse(lastDayTransferPointData);
        Object.keys(lastDayTransferPoint).forEach(key => {
            let value = lastDayTransferPoint[key];
           
            if (typeof key !== undefined && typeof value !== undefined) {
                //selectHTML += `<option value="${key}">${value}</option>`;
            }
        
        });
    }
   
    if(retrievedMap.has(location)){
        retrievedMap.get(location).forEach((valueMap) => {
            
            let [key, value] = [...valueMap.entries()][0]; 
    
            selectHTML += `<option value="${key}">${value}</option>`;
            
           
        });
    }
    selectHTML  += `</select>`;
    selectHTML += `<button type="button" onclick="selectAndAddTransfer('transferPoints')">Add</button>`;

    addTransferPoints.innerHTML = selectHTML;       
}

function selectAndAddTransfer(id){

    var eventType = document.getElementById('eventType');
    var eventTypeValue = eventType.options[eventType.selectedIndex].value;
   
    var activityTypeId;
    var eventPoints;
    if(id === 'attractionPoints'){
        if(eventTypeValue === 'leisureDayEvent'){
            activityTypeId = document.getElementById('leisurePlaceList');
            eventPoints = document.getElementById('attractionPoints'); 
        }else{
            activityTypeId = document.getElementById('attractionList');
            eventPoints = document.getElementById('attractionPoints'); 
        }
       
    }else if(id === 'transferPoints'){
        activityTypeId = document.getElementById('transferPointList');
        eventPoints = document.getElementById('transferPointss'); 
    }else if(id === 'hotelPoints'){
        activityTypeId = document.getElementById('hotelList');
        eventPoints = document.getElementById('hotelPoints'); 
    } else{

    }

   console.log(eventPoints);
    var eventPointsText = eventPoints.options[eventPoints.selectedIndex].text;
    var eventPointsValue = eventPoints.options[eventPoints.selectedIndex].value;
    if (eventPointsText) {
        // Create a new list item element
        let li = document.createElement('li');
        li.id = eventPointsValue;
        // Set the text content of the list item
        li.textContent = eventPointsText;
        
         // Create a span for the red "x"
        let deleteButton = document.createElement('span');
        deleteButton.textContent = '❌'; // Red "x" character
        deleteButton.classList.add('deleteButton');

        // Style the red "x" for better visibility
        deleteButton.style.color = 'red';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.marginLeft = '5px';

        // Append delete button (red "x") to the list item
        li.appendChild(deleteButton);

        // Append the list item to the list
        activityTypeId.appendChild(li);

        // Add click event listener to delete button
        deleteButton.addEventListener('click', function() {
            li.remove();
        });
    }


}

function saveEventInDb(type){
    const slug = document.getElementById('product-day-container');
    const id =slug.options[slug.selectedIndex].value;
    
    const data = {};

    if(type === 'transfer'){

        const transportType = document.getElementById('transportType');
        const transportTypeValue =transportType.options[transportType.selectedIndex].text;
    
        let ul = document.getElementById('transferPointList');
        let transferPointsList = [];
        let liName = '';
        ul.querySelectorAll('li').forEach(li => {
            transferPointsList.push( li.id);
            liName = li.textContent || li.innerText; 
            if (liName.length > 0) {
                liName = liName.slice(0, -1);
            }
        });
     
              
        data.itineraryId = id;
        data.position = document.getElementById('eventPosition').value;
        data.eventType = 'TRANSFER';
        data.title =  document.getElementById('transferTitle').value;
        data.startTime = document.getElementById('transferStartTime').value;
        data.endTime = document.getElementById('transferEndTime').value;
        data.transportType = transportTypeValue;
        data.eventDataId = transferPointsList;
     
        if(transferPointsList,length >= 0){
            let object = {};
            object[transferPointsList[transferPointsList.length - 1]] = liName;

            const slug = document.getElementById('product-slug-container').value;
           
            localStorage.setItem("lastDayTransferPoint_"+slug, JSON.stringify(object));
        }
        
        
    }else if(type === 'activity'){

        const activityList = document.getElementById('activityList');
        const activityValue = activityList.options[activityList.selectedIndex].value;
        const activityTitle = activityList.options[activityList.selectedIndex].text;
    
        let ul = document.getElementById('attractionList');
        let attractionPointsList = [];
        ul.querySelectorAll('li').forEach(li => {
            attractionPointsList.push( li.id);
        });
      
        data.itineraryId = id;
        data.position = document.getElementById('eventPosition').value;
        data.eventType = 'ACTIVITY';
        data.description =  document.getElementById('activityDescription').value;
        data.wikiParsedDescription = document.getElementById('activityWikiParsedDesc').value;
        data.title = activityTitle;
        data.activityId = activityValue;
        data.eventDataId = attractionPointsList;   
    }else if(type === 'hotel'){

        let ul = document.getElementById('hotelList');
        let hotelLists = [];
        ul.querySelectorAll('li').forEach(li => {
            hotelLists.push( li.id);
        });

        let inclusions = [];
        let inclusionList = document.getElementById('hotelInclusions');
        let inclusionListCheckboxes = inclusionList.querySelectorAll('input[type=checkbox]');
        inclusionListCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                inclusions.push(checkbox.value);
            }
        });
      
        data.itineraryId = id;
        data.position = document.getElementById('eventPosition').value;
        data.eventType = 'HOTEL';
        data.title = document.getElementById('hotelTitle').value;
        data.startTime = document.getElementById('hotelStartTime').value;
        data.endTime = document.getElementById('hotelEndTime').value;
        data.inclusions = inclusions;
        data.eventDataId = hotelLists;   
    }else if(type === 'leisureDay'){

        let ul = document.getElementById('leisurePlaceList');
        let leisurePlaceLists = [];
        ul.querySelectorAll('li').forEach(li => {
            leisurePlaceLists.push( li.id);
        });

        data.itineraryId = id;
        data.position = document.getElementById('eventPosition').value;
        data.eventType = 'LEISUREDAY';
        data.title = document.getElementById('leisureDayTitle').value;
        data.eventDataId = leisurePlaceLists;   
    }
  
    if(! data.itineraryId){
       alert("Please create a itinerary days before adding event!");
        return;
    }
    
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        
        if(result.errorMessage){
            alert('Failed: '+ result.errorMessage);
            return;
        }
        alert('Itinerary event submitted successfully!');
        showEventData(data);
       
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error submitting form!');
    });
}

function showEventData(item){
    const tableBody = document.querySelector('#view-event-data tbody');
   // tableBody.innerHTML = '';
    if(!item.transportType){
        item.transportType = "NA"
    }
    const row = document.createElement('tr');
    row.innerHTML = `
        <td data-name="posotion">${item.position}</td>
        <td data-name="transferType">${item.eventType}</td>
        <td data-name="title">${item.title}</td>
        <td data-name="transportType">${item.transportType}</td>
        `;
    tableBody.appendChild(row);
}

function itineraryEvent(){
    const slug = document.getElementById('product-slug-event-container');
    const tourId =slug.options[slug.selectedIndex].value;

    
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/'+tourId)
    .then(response => response.json())
    .then(data => {
       
        const productDayContainer = document.getElementById('product-day-container');
        productDayContainer.innerHTML = '';
       
        data.forEach(option => {
            productDayContainer.innerHTML += `<option value="${option.id}" id='${option.location}'>${option.dayNumber}</option>`;
        });
        itineraryEventDay();
    })
    .catch(error => {
        console.error('Error fetching the tours:', error);
    });
}

function editTourItinerary(){
    const slug = document.getElementById('product-slug-edit-container');
    const tourId =slug.options[slug.selectedIndex].value;

    
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/'+tourId)
    .then(response => response.json())
    .then(data => {
       
        const tableBody = document.querySelector('#tour-itinerary-data tbody');
        tableBody.innerHTML = '';
        data.forEach(item => {
           
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td data-name="dayNumber">${item.dayNumber}</td>
                 <td data-name="location">${item.location}</td>
                 <td data-name="title">${item.title}</td>
                 <td data-name="isLeisureDay">${item.isLeisureDay}</td>
                 <td>  
                    <button id="edit-${item.id}-${item.dayNumber}" class="edit-button"
                        data-id="${item.id}"
                        data-day="${item.dayNumber}"
                        data-location="${item.location}"
                        data-title="${item.title}"
                        data-description="${item.description}"
                        data-wikiParsedDescription="${item.wikiParsedDescription}"
                        data-is-leisure-day="${item.isLeisureDay}"
                        onclick="handleEdit(this)">
                            <i class="fas fa-edit"></i>
                    </button>
                    <button id="delete-${tourId}-${item.dayNumber}" class="delete-button"
                        onclick="handleDelete('${tourId}','${item.dayNumber}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                 </td>   
                 `;
             tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching the tours:', error);
    });
}
// Function to handle the edit operation
function handleEdit(button) {
  
    const id = button.getAttribute('data-id');
    const dayNumber = button.getAttribute('data-day');
    const location = button.getAttribute('data-location');
    const title = button.getAttribute('data-title');
    const wikiParsedDescription = button.getAttribute('data-wikiParsedDescription');
    const description = button.getAttribute('data-description');
    const isLeisureDay = button.getAttribute('data-is-leisure-day') === 'true';

    document.getElementById('tourEdit-dayNumber').value = dayNumber;
    document.getElementById('tourEdit-location').value = location;


    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/event/'+id)
    .then(response => response.json())
    .then(data => {
       
        const tableBody = document.querySelector('#tour-itinerary-event tbody');
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td data-name="posotion">${item.position}</td>
            <td data-name="transferType">${item.eventType}</td>
            <td data-name="title">${item.title}</td>
            <td>
                <button id="delete-${id}-${item.position}" class="delete-button"
                    onclick="handleEventDelete('${id}','${item.position}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
            `;
             tableBody.appendChild(row);
        });

        const tableElement = document.getElementById('tour-itinerary-data');
        if (tableElement) {
            tableElement.classList.add('hidden');
        }
        const element = document.getElementById('tour-itinerary-edit');
        if (element) {
            element.classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error fetching the tours:', error);
    });


}

function handleEventDelete(id, position) {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this item?')) {
        // Perform your delete operation here

        // For demonstration, let's just log the values
        console.log('Deleting item with ID:', id, 'and position:', position);

        // Example API call (modify URL and method as needed)
        fetch(`https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/event/${id}/${position}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Successfully deleted:');
            // Optionally, update the UI after successful deletion
            // For example, remove the item from the DOM
            const button = document.getElementById(`delete-${id}-${position}`);
            if (button) {
                button.closest('tr').remove(); // Remove the row from the table
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Function to handle the delete operation
function handleDelete(id, dayNumber) {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this item?')) {
        // Perform your delete operation here

        // For demonstration, let's just log the values
        console.log('Deleting item with ID:', id, 'and dayNumber:', dayNumber);

        // Example API call (modify URL and method as needed)
        fetch(`https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/${id}/${dayNumber}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Successfully deleted:');
            // Optionally, update the UI after successful deletion
            // For example, remove the item from the DOM
            const button = document.getElementById(`delete-${id}-${dayNumber}`);
            if (button) {
                button.closest('tr').remove(); // Remove the row from the table
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function cancelTourItineraryEdit(){
    const tableElement = document.getElementById('tour-itinerary-data');
    if (tableElement) {
        tableElement.classList.remove('hidden');
    }
    const element = document.getElementById('tour-itinerary-edit');
    if (element) {
        element.classList.add('hidden');
    }
}

function itineraryEventDay(){

    const day = document.getElementById('product-day-container');
    const itineraryId = day.options[day.selectedIndex].value;
    const location = day.options[day.selectedIndex].id;
  
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/itinerary/event/'+itineraryId)
    .then(response => response.json())
    .then(data => {
       
        const tableBody = document.querySelector('#view-event-data tbody');
        tableBody.innerHTML = '';
        data.forEach(option => {
            showEventData(option);
        });
        const itinerary_event_location = document.getElementById('itinerary_event_location');
        itinerary_event_location.value = location;
    })
    .catch(error => {
        console.error('Error fetching the tours:', error);
    });
}