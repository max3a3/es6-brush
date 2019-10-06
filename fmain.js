var head = document.getElementsByTagName("head")[0],
    cssLink = document.createElement("link");

cssLink.href = "https://fonts.googleapis.com/css?family=Mansalva"
cssLink.id="dynamic-mansalva";
cssLink.rel="stylesheet";
cssLink.type="text/css";

head.appendChild(cssLink);

cssLink = document.createElement("link");
cssLink.href = "https://fonts.googleapis.com/css?family=Indie+Flower"
cssLink.id="dynamic-indieflower";
cssLink.rel="stylesheet";
cssLink.type="text/css";

head.appendChild(cssLink);

cssLink = document.createElement("link");
cssLink.href = "https://fonts.googleapis.com/css?family=Pacifico"
cssLink.id="dynamic-pacifico";
cssLink.rel="stylesheet";
cssLink.type="text/css";

// Write ES6 code!
const appDiv = document.getElementById('app');
if (appDiv)
appDiv.innerHTML = `<h1>ES6 Starter</h1>`;