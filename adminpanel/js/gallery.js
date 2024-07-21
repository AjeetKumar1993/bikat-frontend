document.addEventListener("DOMContentLoaded", function() {
    fetchImage();
    fetchGalleryItem();

});

function fetchGalleryItem(){
    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/admin/tour/image-items')
    .then(response => response.json())
    .then(data => {
        filterHtmlRender('gallery-category', data.category);
        filterHtmlRender('gallery-location', data.location);
    })
    .catch(error => {
        alert('Error fetching options:', error);
       
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
    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/admin/tour/images')
    .then(response => response.json())
    .then(data => {
        createGallery(data.Destinations,'destinations-gallery-container');
        createGallery(data.Activities,'activities-gallery-container');
        createGallery(data.Properties,'properties-gallery-container');
    })
    .catch(error => {
        alert('Error fetching options:', error);
       
    });
}
function createGallery(data, container_id) {
   
    const container = document.getElementById(container_id);
    if(container === null) {
        return;
    }
    data.forEach(destination => {
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');

        const locationHeader = document.createElement('h2');
        locationHeader.textContent = destination.location;
        locationDiv.appendChild(locationHeader);

        const galleryDiv = document.createElement('div');
        galleryDiv.classList.add('gallery');

        destination.url.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = "https://storage.googleapis.com/bikat_adventure_image/"+url;
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
}
let imageGallery = [];

function uploadGallery() {
    
    var category = document.getElementById('gallery-category');
    var categoryValue = category.options[category.selectedIndex].text;
    var location = document.getElementById('gallery-location');
    var locationValue = location.options[location.selectedIndex].text;

    const data = {
        category: categoryValue,
        location: locationValue
    }
    console.log(imageGallery);
    if(imageGallery.length !== 0){
        data.url = imageGallery;
    }else{
        alert("You must upload at least one image");
        return;
    }
    
    fetch('https://decent-line-423710-m0.de.r.appspot.com/api/admin/tour/images', {
        method: 'POST',
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

async function uploadTourGallery(){
 
    const formData = new FormData();
    var imagesInput = document.getElementById('newTourImages');

    for (const file of imagesInput.files) { 
        formData.append('files', file);
    }
  
    const statusIcon = document.getElementById('gallerStatusIcon');
    try {
        const response =  await fetch('https://decent-line-423710-m0.de.r.appspot.com/api/file/upload/images', {
            method: 'POST',
            body: formData
        });
        const result =  await response.json();
        imageGallery = result.fileNames;
        
        statusIcon.innerHTML = '&#10004;'; // Blue tick (✔)
        statusIcon.className = 'status-icon success';
        statusIcon.style.display = 'inline';
    } catch (error) {
        console.error('Error:', error);
        statusIcon.innerHTML = '&#10008;'; // Red X (✘)
        statusIcon.className = 'status-icon failure';
        statusIcon.style.display = 'inline';
    }
}