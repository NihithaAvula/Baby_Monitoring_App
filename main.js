sound = "";
status = "";
objects = [];

function preload(){
    sound = loadSound("ringing_old_phone.mp3");
}


function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video,0,0,400,400);
    if(status!=""){  
    
      r = random(255);
      g = random(255);
      b = random(255)
        for(var i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "status: Object Detected";
        if(objects[i].label == "person" ){
            sound.stop();
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
        }
        else{
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        sound.play();
        }
    fill(r,g,b);
    percentage = floor(objects[i].confidence*100);
    text(objects[i].label+" "+percentage+ "%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
    
}

function gotResult(error,results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}