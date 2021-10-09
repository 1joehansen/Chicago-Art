let ids;

$('document').ready(function(){
    $("#artwork").hide();
    $("#explore2").hide();

    fetch("./scripts/ids.json")
    .then(response => {
       return response.json();
    })
    .then(function(data) {
        console.log("data loaded");
        ids = data;
    });
});



function getRandomID(){
    let min = 1;
    let max = 5674;

    let rand = Math.floor(Math.random() * (max - min) + min);

    console.log(ids[rand]);

    return ids[rand];
}

function getRandomArt(){

    let url = "https://api.artic.edu/api/v1/artworks/" + getRandomID();

    fetch(url)
    .then(function(response) {

        return response.json();
    }).then(function(json) {
        console.log(json);
        publishArt(json);
    });
}

function getArtInfoByID(id){
    let url = "https://api.artic.edu/api/v1/artworks/" + id;

    alert(fetch(url));
}


function publishArt(art_json){
    $("#artwork").show();
    $("#explore1").hide();
    $("#explore2").show();

    let image_id = art_json["data"]["image_id"];
    image_url = "https://www.artic.edu/iiif/2/" + image_id +"/full/843,/0/default.jpg"

    $("#artwork").attr("src", image_url);

    // title description set
    $("#img-title").text(art_json["data"]["title"])
    $("#img-medium").text(art_json["data"]["medium_display"])
    $("#img-artist").text(art_json["data"]["artist_display"])

    console.log(image_url);
}
