document.addEventListener("DOMContentLoaded", function() {
    fetchImage();
    fetchGalleryItem();

});

function fetchGalleryItem(){
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/image-items')
    .then(response => response.json())
    .then(data => {
        filterHtmlRender('gallery-category', data.category);
        filterHtmlRender('gallery-location', data.location);
    })
    .catch(error => {
        alert('Error fetching options: 6', error);
       
    });
}

function filterHtmlRender(container_id, items){
    const container = document.getElementById(container_id);
    if(container === null) {
        return;
    }
    items.forEach(item => {
        container.innerHTML += `<option value="${item}">${item}</option>`;
    });
}
function fetchImage(){
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/images')
    .then(response => response.json())
    .then(data => {
        createGallery(data.Destinations,'destinations-gallery-container');
        createGallery(data.Activities,'activities-gallery-container');
        createGallery(data.Properties,'properties-gallery-container');
    })
    .catch(error => {
        alert('Error fetching options: 5', error);
       
    });
}
function createGallery(data, container_id) {
   
    const container = document.getElementById(container_id);
    if(container === null) {
        return;
    }
    const activityMap = new Map();
    data.forEach(destination => {

      
        const idAndTitleMap = new Map();
        idAndTitleMap.set(destination.id, destination.title);
    
        if (activityMap.has(destination.location)) {
          activityMap.get(destination.location).push(idAndTitleMap);
        } else {
          activityMap.set(destination.location, [idAndTitleMap]);
        }


        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');

        const locationHeader = document.createElement('h2');
        if(destination.title && container_id !== 'destinations-gallery-container'){
            locationHeader.textContent = destination.location +' | '+ destination.title;
        }else{
            locationHeader.textContent = destination.location;
        }
       
        locationDiv.appendChild(locationHeader);

        const galleryDiv = document.createElement('div');
        galleryDiv.classList.add('gallery');

        destination.url.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = "https://storage.googleapis.com/fullontravel/"+url;
            img.alt = destination.location;
            if (index > 0) {
                img.style.display = 'none';
            }
            galleryDiv.appendChild(img);
        });

        locationDiv.appendChild(galleryDiv);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.textContent = `${destination.url.length} images`;
        locationDiv.appendChild(overlay);

        const firstImg = galleryDiv.querySelector('img');
        firstImg.addEventListener('click', () => {
            galleryDiv.querySelectorAll('img').forEach(img => {
                img.style.display = 'block';
            });
            overlay.style.display = 'none';
        });

        container.appendChild(locationDiv);
    });
    
    let mapObject = {};
    activityMap.forEach((value, key) => {
        let arrayValue = value.map(map => Array.from(map));
        mapObject[key] = JSON.stringify(arrayValue);
    });
   
    if(container_id === 'activities-gallery-container'){
        localStorage.setItem('activitiesActivityData', JSON.stringify(mapObject));
    }else if( container_id === 'properties-gallery-container'){
        localStorage.setItem('propertiesActivityData', JSON.stringify(mapObject));
    }
   
}

function uploadGallery(containerId) {
    
    var category = document.getElementById('gallery-category');
    var categoryValue = category.options[category.selectedIndex].text;
    
    var location = document.getElementById('load_location');
    var title = document.getElementById('gallery-category-title').value;
    var locationValue = location.options[location.selectedIndex].text;

    if(!location){
        alert("Please fill location!");
        return;
    }
    if(!title){
        alert("Please fill category title!");
        return;
    }
    const data = {
        category: categoryValue,
        location: locationValue,
        title: title
    }
    const imageGallery = localStorage.getItem("images_"+containerId);
    
    if(imageGallery.length !== 0){
        data.url = JSON.parse(imageGallery);
    }else{
        alert("You must upload at least one image");
        return;
    }
    showLoader();
    fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/admin/tour/images', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        hideLoader();
        alert('Tour updated successfully!');
       
    })
    .catch(error => {
        hideLoader();
		console.log('Error:'+ error);
        console.error('Error:', error);
        alert('Error tour updating!');
       
    });

}
function previewImage(event, containerId) {

    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById(containerId);
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}
function previewImages(event, id) {

   
    const imagePreviewContainer = document.getElementById(id);
    imagePreviewContainer.innerHTML = ''; // Clear previous previews

    Array.from(event.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-preview';
            imagePreviewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

async function uploadImages(containerId, statusId){
 
    const formData = new FormData();
    var imagesInput = document.getElementById(containerId);

    for (const file of imagesInput.files) { 
        formData.append('files', file);
    }
  
    const statusIcon = document.getElementById(statusId);
    try {
        showLoader();
        const response =  await fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/file/upload/images', {
            method: 'POST',
            body: formData
        });
        hideLoader();
        const result =  await response.json();
        console.log(result.fileNames);
        localStorage.setItem("images_"+containerId,  JSON.stringify(result.fileNames));
        
        statusIcon.innerHTML = '&#10004;'; // Blue tick (✔)
        statusIcon.className = 'status-icon success';
        statusIcon.style.display = 'inline';
    } catch (error) {
        hideLoader();
        console.error('Error:', error);
        statusIcon.innerHTML = '&#10008;'; // Red X (✘)
        statusIcon.className = 'status-icon failure';
        statusIcon.style.display = 'inline';
    }
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }
  
  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }