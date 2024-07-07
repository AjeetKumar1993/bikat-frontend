
  // ****************************************************Edit Itinerary****************************//
let editItineraryCount = 0;

function editAddItinerary() {
    editItineraryCount++;
    const rulesContainer = document.getElementById('edit-itinerary');
    const newRule = document.createElement('div');
    newRule.classList.add('edit-itinerary-rule');
    newRule.setAttribute('id', `edit-itinerary-rule${editItineraryCount}`); // Add unique id to each rule
    newRule.innerHTML = `
        <label for="Day${editItineraryCount}">Day ${editItineraryCount}:</label><br>
        <label for="title">Title:</label>
        <input type="text" id="edit-titleItinerary${editItineraryCount}" name="edit-itinerary${editItineraryCount}" required></input>
        <label for="heading">Heading:</label>
        <input type="text" id="edit-headingItinerary${editItineraryCount}" name="edit-itinerary${editItineraryCount}" required></input>
        <label for="description">Description:</label>
        <textarea id="edit-descriptionItinerary${editItineraryCount}" name="edit-itinerary${editItineraryCount}" required></textarea>

        <label for="itineraryOtherDetails">Itinerary OtherDetails:</label>
        <div id="edit-itineraryOtherDetails${editItineraryCount}">
            
        </div>
        <button type="button" onclick="editAddItineryOtherDetails(${editItineraryCount})">Add Other Details</button><br><br>

        <button type="button" onclick="editRemoveItinery(${editItineraryCount})">Remove Itinerary</button><br>
    `;
    rulesContainer.appendChild(newRule);
}


function editRemoveItinery(indexToRemove) {
    const ruleToRemove = document.getElementById(`edit-itinerary-rule${indexToRemove}`);
    ruleToRemove.remove();

    // Update day labels and input IDs/names for remaining rules
    const allRules = document.querySelectorAll('.edit-itinerary-rule');
    editItineraryCount--; // Decrement the itinerary count

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
            if (nameAttr && nameAttr.startsWith('edit-itinerary')) {
                const newAttr = nameAttr.replace(/\d+/, currentDay);
                input.setAttribute('name', newAttr);
                input.setAttribute('id', `${input.getAttribute('id').replace(/\d+/, currentDay)}`);
            }
        });
    });
}



function editItinerary(itinerary){
    
    let entries = Object.entries(itinerary)
    let data = entries.map( ([key, val] = entry) => {
        daysAppend(val);
    });
    
  }
  function daysAppend(item){
    editItineraryCount++;
    const rulesContainer = document.getElementById('edit-itinerary');
    const newRule = document.createElement('div');
    newRule.classList.add('edit-itinerary-rule');
    newRule.setAttribute('id', `edit-itinerary-rule${editItineraryCount}`); // Add unique id to each rule

        newRule.innerHTML = `
            <label for="Day${editItineraryCount}">Day ${editItineraryCount}:</label><br>
            <label for="title">Title:</label>
            <input type="text" id="edit-titleItinerary${editItineraryCount}" name="edit-itinerary${editItineraryCount}" value="${item.title}"></input>
            <label for="heading">Heading:</label>
            <input  type="text" id="edit-headingItinerary${editItineraryCount}" name="edit-itinerary${editItineraryCount}" value="${item.heading}"></input>
            <label for="description">Description:</label>
            <textarea id="edit-descriptionItinerary${editItineraryCount}" name="edit-itinerary${editItineraryCount}" >${item.description}</textarea>
   
            <label for="itineraryOtherDetails">Itinerary OtherDetails:</label>
               <div id="edit-itineraryOtherDetails${editItineraryCount}">`;
              
            let count = 1;
           
            item.otherDetails.forEach(details =>{
                let key = 'day'+editItineraryCount+'Count';
                dayCounts[key]++;
              
                const childNewRule = document.createElement('div');
                childNewRule.innerHTML += `
                <input type="text" id="edit-itineraryOtherDetailsDay${editItineraryCount}${count}" name="edit-itineraryOtherDetailsDay${editItineraryCount}${count}" value="${details}"><br>
                <button type="button" onclick="removeEditItineryOtherDetails(this,'${count}')">Remove</button>`;
               
                newRule.appendChild(childNewRule);
                count++;
                
            });
            
        newRule.innerHTML += ` </div>
            <button type="button" onclick="editAddItineryOtherDetails(${editItineraryCount})">Add Other Details</button><br><br>

        <button type="button" onclick="editRemoveItinery(${editItineraryCount})">Remove Itinerary</button><br>
        `;
        rulesContainer.appendChild(newRule);
       
  }

function editAddItineryOtherDetails(day){

    let count = 'day'+day+'Count';
    dayCounts[count]++;

    const rulesContainer = document.getElementById('edit-itineraryOtherDetails'+day);
    const newRule = document.createElement('div');
    //newRule.classList.add('editAddItineryOtherDetails-rule');
    newRule.innerHTML = `
        <input type="text" id="edit-itineraryOtherDetailsDay${day}${dayCounts[count]}" name="itineraryOtherDetailsDay${day}${dayCounts[count]}" required><br>
        <button type="button" onclick="removeEditItineryOtherDetails(this,'${count}')">Remove</button>
    `;
    rulesContainer.appendChild(newRule);
} 

function removeEditItineryOtherDetails(button, count){
   
    const ruleDiv = button.parentNode;
    ruleDiv.remove();
    dayCounts[count]--;
}

  document.getElementById('save-edit-group-j').addEventListener('click', function() {
    const id = this.dataset.id;
   
    const data = {}
    let itineryFinalData = {}
    for(let i = 1 ;i <= editItineraryCount;i++){
        let itineryData =  {
            "title": "",
            "isRequired": true,
            "heading": "",
            "description": "",
            "otherDetails" :[]
        }
        const title = document.getElementById(`edit-titleItinerary${i}`).value;
        if(title){
            itineryData.title = title;
        }
        const heading = document.getElementById(`edit-headingItinerary${i}`).value;
        if(heading){
            itineryData.heading = heading;
        }
        const description = document.getElementById(`edit-descriptionItinerary${i}`).value;
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

    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/tour/'+id, {
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
        closeEditPopup();
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error tour updating!');
        closeEditPopup();
    });

  });