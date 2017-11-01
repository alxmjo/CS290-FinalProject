var newDiv = document.createElement("div");
var newContent = document.createTextNode("Hi there and greetings!");
newDiv.appendChild(newContent); // add the text node to the newly created div.
document.body.appendChild(newDiv);

// ---- Variables ----
const APIKEYNASA = 'pGv9lTf2ocdPsrdSrIEbZ6FCqm8cI1iACdnEJbba';
queryMarsPhotos(APIKEYNASA, 'curiosity', 'NAVCAM', 1848, 1);

// ---- Functions ----
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
                var img = document.createElement("img");
                img.src = data.photos[i].img_src;
                newDiv.appendChild(img);
                console.log(data.photos[i].img_src);
            }
        }
    });
}