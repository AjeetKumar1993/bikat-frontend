document.addEventListener("DOMContentLoaded", generateFilter);

function generateFilter(){

    const regionContainer = document.getElementById('region');
    const categoryContainer = document.getElementById('category');
    const editRegionContainer = document.getElementById('edit-region');
    const editCategoryContainer = document.getElementById('edit-category');

    const selectionFormForCategory = document.getElementById('selectionFormForCategory');
    const selectionFormForRegion = document.getElementById('selectionFormForRegion');
  
    fetch("https://decent-line-423710-m0.de.r.appspot.com/api/tour/filter-item",)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(list => {
      filterHtmlRender(categoryContainer, list.category);
      filterHtmlRender(editCategoryContainer, list.category);
      filterHtmlRender(regionContainer, list.region);
      filterHtmlRender(editRegionContainer, list.region);

      filterHtmlRenderWithCheckbox(selectionFormForRegion, 'region', list.region);
      filterHtmlRenderWithCheckbox(selectionFormForCategory, 'category', list.category);
    })
    .catch(error => {
      console.error('Fetching error: ', error);
    });
  
  }
  
  function filterHtmlRender(container, items){
    
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
        region: region
    };
    
    fetch('http://localhost:8080/api/tour/filter-item', {
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