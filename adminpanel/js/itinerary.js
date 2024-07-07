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

