// ---- Variables ----
const APIKEYNASA = 'pGv9lTf2ocdPsrdSrIEbZ6FCqm8cI1iACdnEJbba';
var slideshow = document.getElementById("slideshow");

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
            for (var i = 0; i < data.photos.length; i++) {
                var newImage = document.createElement("img");
                newImage.src = data.photos[i].img_src;
                newImage.classList.add('rounded');
                newImage.classList.add('slide');

                var newContentSol = document.createTextNode('Sol: ' + String(data.photos[i].sol));
                var options = {year: 'numeric', month: 'long', day: 'numeric' };
                var newDate = new Date(data.photos[i].earth_date).toLocaleDateString('en-US', options);
                var newContentDate = document.createTextNode('Date: ' + newDate);
                var newContentCamera = document.createTextNode('Camera: ' + String(data.photos[i].camera.full_name));

                var newLISol = document.createElement("li");
                newLISol.appendChild(newContentSol);

                var newLIDate = document.createElement('li');
                newLIDate.appendChild(newContentDate);

                var newLICamera = document.createElement('li');
                newLICamera.appendChild(newContentCamera);

                var newUL = document.createElement('ul');
                newUL.classList.add('meta');
                newUL.appendChild(newLISol);
                newUL.appendChild(newLIDate);
                newUL.appendChild(newLICamera);

                var newDiv = document.createElement('div');
                newDiv.classList.add('content');
                newDiv.appendChild(newUL);

                var newFigure = document.createElement("figure");
                newFigure.appendChild(newImage);
                newFigure.appendChild(newDiv);
                newFigure.classList.add('image');

                slideshow.appendChild(newFigure);
                console.log(data.photos[i]);
                var slideIndex = 1;
                showDivs(slideIndex);
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

// TODO: Comment and customize
// With help from: https://www.w3schools.com/w3css/w3css_slideshow.asp
function plusDivs(n) {
    showDivs(slideIndex += n);
}

// TODO: Comment and customize
// With help from: https://www.w3schools.com/w3css/w3css_slideshow.asp
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slide");
    var y = document.getElementsByClassName("meta");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        y[i].style.display = "none";
    }
    if (x[slideIndex-1] !== undefined) {
        x[slideIndex-1].style.display = "block";
        y[slideIndex-1].style.display = "block";
    }
}

// ---- Main ----
queryMarsPhotos(APIKEYNASA, 'curiosity', 'NAVCAM', 1848, 1);

var slideIndex = 1;
showDivs(slideIndex);