const express = require("express");

const app = express();

app.set("view engine", "pug");

app.use("/main", function(request, response){
    response.render("index", {title:"main"})
});
app.use("/", function(request, response){
    response.status(404).render("error404", {});

});

app.listen(3000);
