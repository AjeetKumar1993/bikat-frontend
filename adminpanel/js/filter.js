document.addEventListener("DOMContentLoaded", generateFilter);

function generateFilter(){

    const selectionFormForCategory = document.getElementById('selectionFormForCategory');
    const selectionFormForStayCategory = document.getElementById('selectionFormForStayCategory');
    const selectionFormForRegion = document.getElementById('selectionFormForRegion');
    const selectionFormForLocation = document.getElementById('selectionFormForLocation');
  
    fetch("https://decent-line-423710-m0.de.r.appspot.com/api/tour/filter-item",)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(list => {
      console.log(list);
      filterHtmlRender('category', list.category);
      filterHtmlRender('edit-category', list.category);
      filterHtmlRender('product-category', list.category);
      filterHtmlRender('product-stay-category', list.stayCategory);
      filterHtmlRender('edit-product-stay-category', list.stayCategory);

      filterHtmlRender('region', list.region);
      filterHtmlRender('edit-region', list.region);
      filterHtmlRender('product-region', list.region);
      filterHtmlRender('load_location', list.location);
      filterHtmlRender('itinerary_location', list.location);
      filterHtmlRender('event-point-location', list.location);

      filterHtmlRenderWithCheckbox(selectionFormForRegion, 'region', list.region);
      filterHtmlRenderWithCheckbox(selectionFormForLocation, 'region', list.location);
      filterHtmlRenderWithCheckbox(selectionFormForCategory, 'category', list.category);
      filterHtmlRenderWithCheckbox(selectionFormForStayCategory, 'category', list.stayCategory);
    })
    .catch(error => {
      console.error('Fetching error: ', error);
    });
  
    loadEventDatails();
  }
  
  function filterHtmlRender(containerId, items){
    const container = document.getElementById(containerId);
    items.forEach(item => {
        container.innerHTML += `<option value="${item}">${item}</option>`;
    });

  }
  function filterHtmlRenderWithCheckbox(container, type, items){

    items.forEach(item => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-container');
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item; // Use a unique identifier from your data
        checkbox.name = type; // Optional: Set a common name for all checkboxes
        checkbox.value = item; // Adjust based on your data structure
        checkbox.checked = true;
        const label = document.createElement('label');
        label.setAttribute('for', item); // Match label to checkbox id
        label.textContent = item; // Adjust based on your data structure
    
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        container.appendChild(checkboxDiv);
  
  });
  }

  function saveCategoryAndRegion() {
    showLoader();
    let category = [];
    let region = [];
    let stayCategory = [];
    let location = [];
    
    let locationCheckboxDiv = document.getElementById('selectionFormForLocation');
    let locationCheckboxes = locationCheckboxDiv.querySelectorAll('input[type=checkbox]');
    locationCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          location.push(checkbox.value);
        }
    });

    let stayCategoryCheckboxDiv = document.getElementById('selectionFormForStayCategory');
    let stayCategoryCheckboxes = stayCategoryCheckboxDiv.querySelectorAll('input[type=checkbox]');
    stayCategoryCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          stayCategory.push(checkbox.value);
        }
    });

    let categoryCheckboxDiv = document.getElementById('selectionFormForCategory');
    let categoryCheckboxes = categoryCheckboxDiv.querySelectorAll('input[type=checkbox]');
    categoryCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            category.push(checkbox.value);
        }
    });

    
    let regionCheckboxDiv = document.getElementById('selectionFormForRegion');
    let regionCheckboxes = regionCheckboxDiv.querySelectorAll('input[type=checkbox]');
    regionCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            region.push(checkbox.value);
        }
    });

    const data = {
        category: category,
        region: region,
        stayCategory: stayCategory,
        location: location
    };
    
    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/tour/filter-item', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoader();
        alert('Updated successfully!');
    })
    .catch(error => {
        hideLoader();
        console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!'); 
    });
  }

  
function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }
  
  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }