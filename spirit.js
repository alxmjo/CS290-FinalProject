// ---- Variables ----
const APIKEYNASA = 'pGv9lTf2ocdPsrdSrIEbZ6FCqm8cI1iACdnEJbba';
var slideshow = document.getElementById('slideshow');

// ---- Functions ----
// Queries NASA's MarsPhotos API and returns object containing metadata and image URLs
function queryMarsPhotos(apiKey, rover, camera, sol, pages) {
    var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover +
        '/photos?api_key=' + apiKey +
        '&camera=' + camera +
        '&sol=' + sol +
        '&page=' + pages;
    getJSON(url, function(err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            // For each image retrieved from API, create HTML elements and append to the page
            for (var i = 0; i < data.photos.length; i++) {
                // Create new image element and append classes
                var newImage = document.createElement('img');
                newImage.src = data.photos[i].img_src;
                newImage.classList.add('rounded');
                newImage.classList.add('roverImage');

                // Create new text elements
                var newContentSol = document.createTextNode('Sol: ' + String(data.photos[i].sol));
                var options = {year: 'numeric', month: 'long', day: 'numeric' };
                var newDate = new Date(data.photos[i].earth_date).toLocaleDateString('en-US', options);
                var newContentDate = document.createTextNode('Date: ' + newDate);
                var newContentCamera = document.createTextNode('Camera: ' + String(data.photos[i].camera.full_name));

                // Create new li's
                var newLISol = document.createElement('li');
                newLISol.appendChild(newContentSol);
                var newLIDate = document.createElement('li');
                newLIDate.appendChild(newContentDate);
                var newLICamera = document.createElement('li');
                newLICamera.appendChild(newContentCamera);

                // Create new ul items and append li's
                var newUL = document.createElement('ul');
                newUL.classList.add('roverMeta');
                newUL.appendChild(newLISol);
                newUL.appendChild(newLIDate);
                newUL.appendChild(newLICamera);

                // Create new div and append ul
                var newDiv = document.createElement('div');
                newDiv.classList.add('content');
                newDiv.appendChild(newUL);

                // Create new figure and append image and div (with ul and li's)
                var newFigure = document.createElement('figure');
                newFigure.appendChild(newImage);
                newFigure.appendChild(newDiv);
                newFigure.classList.add('image');

                // Append figure to existing slideshow element
                slideshow.appendChild(newFigure);

                // Prepare slides on initial query return
                var slideIndex = 1;
                showSlides(slideIndex);
            }
        }
    });
}

// Gets JSON object from API asynchronously
// With help from: https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
function getJSON(url, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'json';
    req.onload = function() {
        var status = req.status;
        if (req.status >= 200 && req.status < 400) {
            callback(null, req.response);
        } else {
            callback(status, req.response);
        }
    };
    req.send();
}

// Move to next (or previous) slide
// If toMove is positive, move forward, if negative, move backwards
// With help from: https://www.w3schools.com/w3css/w3css_slideshow.asp
function plusDivs(toMove) {
    showSlides(slideIndex += toMove);
}

// Show current slide and hide all others
// With help from: https://www.w3schools.com/w3css/w3css_slideshow.asp
function showSlides(currentSlide) {
    // Assemble images and metadatas into arrays
    var images = document.getElementsByClassName('roverImage');
    var metas = document.getElementsByClassName('roverMeta');

    // If currentSlide is past end of either array, reset slideIndex (for looping)
    if (currentSlide > images.length || currentSlide > metas.length) {
        slideIndex = 1
    }

    // If currentSlide is less than 1, reset slideIndex to end (for looping)
    if (currentSlide < 1) {
        slideIndex = images.length;
    }

    // Hide all images
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }

    // Hide all metas
    for (var j = 0; j < metas.length; j++) {
        metas[j].style.display = 'none';
    }

    // Display current image and meta
    if (images[slideIndex - 1] !== undefined && metas[slideIndex - 1] !== undefined) {
        images[slideIndex - 1].style.display = 'block';
        metas[slideIndex - 1].style.display = 'block';
    }
}

// ---- Main ----
queryMarsPhotos(APIKEYNASA, 'spirit', 'NAVCAM', 801, 1);

var slideIndex = 1;
showSlides(slideIndex);