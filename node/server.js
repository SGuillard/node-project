'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Only run this in development
if (process.env.NODE_ENV !== "production") {
  const chokidar = require("chokidar");

  //Set up watcher to watch all files in ./server/app
  const watcher = chokidar.watch("./src");

  watcher.on("ready", function() {
    //On any file change event
    //You could customise this to only run on new/save/delete etc
    //This will also pass the file modified into the callback
    //however for this example we aren't using that information
    watcher.on("all", function() {
      console.log("Reloading server...");
      //Loop through the cached modules
      //The "id" is the FULL path to the cached module
      Object.keys(require.cache).forEach(function(id) {
        //Get the local path to the module
        const localId = id.substr(process.cwd().length);

        //Ignore anything not in server/app
        if(!localId.match(/^\/src\//)) return;

        //Remove the module from the cache
        delete require.cache[id];
      });
      console.log("Server reloaded.");
    });
  });
}


// App
const app = express();

//Hot reload!
//ALL server routes are in this module!
app.use((req, res, next) => {
  require("./src/router")(req, res, next);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:49160`);
