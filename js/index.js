document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('handpickedCollections');
  const popularCollections = document.getElementById('popularCollections');

  const optionsUrl = 'https://decent-line-423710-m0.de.r.appspot.com/api/tour/list';
  
  fetch(optionsUrl)
      .then(response => response.json())
      .then(data => {
         
          let html = ` <div class="service-slider owl-carousel owl-theme">`;
          
          data.forEach(option => {
              let shortOverview = option.shortOverview;
              if (option.shortOverview.length >= 60) {
                  shortOverview = option.shortOverview.substring(0, 60);
              }
              
              localStorage.setItem('tourID_'+option.tourId, option.id);
              redirectHref = `listing-details.html?listId=${option.tourId}`;
              
              html += `<div class="comon-items-week">
                  <figure>
                      <img src="https://storage.googleapis.com/bikat_adventure_image/${option.tourImage}" alt="png2"/>
                      <span class="price"> 20% off </span>
                  </figure>
                  <a class="wish-list"> <i class="fas fa-heart"></i> </a>
                  <div class="div-test1">
                      <span class="d-block start-tbs"> <i class="fas fa-star"></i> 4.2(300) </span>
                      <a href="${redirectHref}" class="titel-cm"> ${option.name} </a>
                      <p> ${shortOverview}</p>
                      <h6 class="d-flex justify-content-between align-items-center"> <span class="loactions-ts"> <i class="fas fa-map-marker-alt"></i> ${option.region} </span>
                          <span class="loactions-ts"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="far fa-clock" viewBox="0 0 16 16">
                              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                          </svg> ${option.day} D / ${option.night} N </span>
                      </h6>
                  </div>
              </div>`;
          });
          
          html += `</div>`;
          container.innerHTML = html; // Set all HTML at once
          popularCollections.innerHTML = html;
          
          // Initialize owl-carousel slider after setting HTML
          $('.service-slider').owlCarousel({
              loop: true,
              margin: 10,
              responsiveClass: true,
              responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: false
                },
                1000: {
                    items: 4,
                    nav: true,
                    loop: false
                }
            }
              
          });

          popularDistination(data);
      })
      .catch(error => {
          console.error('Error fetching options:', error);
      });
});

function popularDistination(data){

  const regionMap = new Map();
 
  data.map((obj) => {
    if(regionMap.has(obj.region)){
      regionMap.get(obj.region).push(obj);
    }else{
      regionMap.set(obj.region, [obj]);
    }
  });

    var container = document.querySelector('.row.g-lg-3'); // Selecting the main container to append destinations
    var col8Added = false; // Flag to track if col-md-8 has been added
    let index = 0;
    regionMap.forEach((values, keys) => {
       if(index > 5){
            return;
       }
     
        var colClass = 'col-md-4'; // Always start with col-md-4 for the first item

        var col = document.createElement('div');
        col.className = colClass;

        var link = document.createElement('a');
        link.href = 'listing.html?region='+keys;
        link.className = index == 0 ? 'comon-ps-1 big-ds' : 'comon-ps-1 small-ds'; // Always big-ds for the first item

        var figure = document.createElement('figure');
        var img = document.createElement('img');
        let imgVal = values[0].tourImage; 
        img.src = "https://storage.googleapis.com/bikat_adventure_image/"+imgVal;
        img.alt = 'ds';

        figure.appendChild(img);
        link.appendChild(figure);

        var content = document.createElement('div');
        content.className = 'content-text2';

        var h2 = document.createElement('h2');
        h2.textContent = keys;

        var p = document.createElement('p');
        p.textContent = values.length + ' Tour';

        var h6 = document.createElement('h6');
        h6.className = 'btn';
        h6.innerHTML = 'Dicover <i class="fas fa-long-arrow-alt-right"></i>';

        content.appendChild(h2);
        content.appendChild(p);
        content.appendChild(h6);

        link.appendChild(content);
        col.appendChild(link);
        
         
         
        
        if (!col8Added && index !== 0) {
            // Add col-md-8 and row-cols-1.row-cols-md-2.gx-lg-3 only once
            var col8 = document.createElement('div');
            col8.className = 'col-md-8';

            var rowCols = document.createElement('div');
            rowCols.className = 'row row-cols-1 row-cols-md-2 gx-lg-3';
            col8.appendChild(rowCols);

            container.appendChild(col8);
            col8Added = true;
        }else{
              if(index == 0){
                container.appendChild(col);
              }else{
                var colInner = document.createElement('div');
                colInner.className = 'col';
                colInner.appendChild(link);
        
                var rowColsContainer = document.querySelector('.col-md-8 .row-cols-1.row-cols-md-2.gx-lg-3');
                if (rowColsContainer) {
                    rowColsContainer.appendChild(colInner);
                }
              }
        }

       index++;
    });
      
}