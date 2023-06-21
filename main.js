song = "";
status = "";
objects = [];

function preload() {
    song = loadSound("ringing_old_phone.mp3");
}


function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 400, 400);
    objectDetector.detect(video, gotResult);
    if (status != "") {

        r = random(255);
        g = random(255);
        b = random(255)
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Object Detected";

            fill(r, g, b);
            percentage = floor(objects[i].confidence*100);
            console.log(percentage);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                if (song.isPlaying()) {
                    song.stop();
                }

                document.getElementById("number_of_objects").innerHTML = "Baby Found";
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                song.play();
            }
        }



    }

}


function modelLoaded() {
    console.log("Model Loaded!");
    status = true;


}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}