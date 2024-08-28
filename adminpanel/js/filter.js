document.addEventListener("DOMContentLoaded", generateFilter);

function generateFilter(){

    // const selectionFormForCategory = document.getElementById('selectionFormForCategory');
    const selectionFormForStayCategory = document.getElementById('selectionFormForStayCategory');
    const selectionFormForRegion = document.getElementById('selectionFormForRegion');
    const selectionFormForLocation = document.getElementById('selectionFormForLocation');
    const selectionFormForPackage = document.getElementById('selectionFormForPackage');

    fetch("https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/filter-item",)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(list => {
     
      filterHtmlRender('category', list.category);
      filterHtmlRender('edit-category', list.category);
      filterHtmlRender('product-category', list.category);
      filterHtmlRender('product-stay-category', list.stayCategory);
      filterHtmlRender('edit-product-stay-category', list.stayCategory);
      filterHtmlRender('edit-product-package-option', list.tourPackage);
      filterHtmlRender('product-tour-package', list.tourPackage);

      policyHtmlRender('product-confirmationPolicy', list.confirmationPolicy);
      policyHtmlRender('product-refundPolicy', list.refundPolicy);
      policyHtmlRender('product-cancellationPolicy', list.cancellationPolicy);
      policyHtmlRender('product-paymentPolicy', list.paymentPolicy);
    

      filterHtmlRender('region', list.region);
      filterHtmlRender('edit-region', list.region);
      filterHtmlRender('product-region', list.region);
      filterHtmlRender('load_location', list.location);
      filterHtmlRender('itinerary_location', list.location);
      filterHtmlRender('event-point-location', list.location);

      filterHtmlRenderWithCheckbox(selectionFormForRegion, 'region', list.region);
      filterHtmlRenderWithCheckbox(selectionFormForLocation, 'region', list.location);
      // filterHtmlRenderWithCheckbox(selectionFormForCategory, 'category', list.category);
      filterHtmlRenderWithCheckbox(selectionFormForStayCategory, 'category', list.stayCategory);
      filterHtmlRenderWithCheckbox(selectionFormForPackage,'package', list.tourPackage);

      policyHtmlRenderWithCheckbox(document.getElementById('confirmationPolicy'),'confirmationPolicy', list.confirmationPolicy);
      policyHtmlRenderWithCheckbox(document.getElementById('refundPolicy'),'refundPolicy', list.refundPolicy);
      policyHtmlRenderWithCheckbox(document.getElementById('cancellationPolicy'),'cancellationPolicy', list.cancellationPolicy);
      policyHtmlRenderWithCheckbox(document.getElementById('paymentPolicy'),'paymentPolicy', list.paymentPolicy);
      
    })
    .catch(error => {
      console.error('Fetching error: ', error);
    });
  
    loadEventDatails();
  }
  
  function policyHtmlRender(containerId, items){
    const container = document.getElementById(containerId);
    console.log(items);
    Object.entries(items).map(entry => {
      container.innerHTML += `<option value="${entry[0]}">${entry[1]}</option>`;
  });

  }
  function policyHtmlRenderWithCheckbox(container, type, items){

    Object.entries(items).map(entry => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-container');
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = entry[1]; // Use a unique identifier from your data
        checkbox.name = entry[1]; // Optional: Set a common name for all checkboxes
        checkbox.value = entry[0]; // Adjust based on your data structure
        checkbox.checked = true;
        const label = document.createElement('label');
        label.setAttribute('for', entry[1]); // Match label to checkbox id
        label.textContent = entry[1]; // Adjust based on your data structure
    
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        container.appendChild(checkboxDiv);
  
    });
  }

  function filterHtmlRenderWithCheckbox(container, type, items){

    items.forEach(item => {
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
        container.appendChild(checkboxDiv);
  
    });
  }

  function saveTourComponent(containerId, componentType) {
    
    showLoader();

    let compnentList = [];
    let compnentCheckboxDiv = document.getElementById(containerId);
    let componentCheckboxes = compnentCheckboxDiv.querySelectorAll('input[type=checkbox]');
    componentCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          console.log(checkbox);
          compnentList.push(checkbox.name);
        }
    });

    const data = {};
    if(componentType == 'category'){
      data.category = compnentList;
    }else if(componentType == 'region'){
      data.region = compnentList;
    }else if(componentType == 'stayCategory'){
      data.stayCategory = compnentList;
    }else if(componentType == 'location'){
      data.location = compnentList;
    }else if(componentType == 'tourPackage'){
      data.tourPackage = compnentList;
    }else if(componentType == 'confirmationPolicy'){
      data.confirmation = compnentList;
    }else if(componentType == 'refundPolicy'){
      data.refund = compnentList;
    }else if(componentType == 'cancellationPolicy'){
      data.cancellation = compnentList;
    }else if(componentType == 'paymentPolicy'){
      data.payment= compnentList;
    }
    
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/filter-item', {
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