song = "";
leftWristx = "";
leftWristy = "";
rightWristx = 0;
rightWristy = 0;
scoreleftWrist = "";
scorerightWrist = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose" , gotPoses);
}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    fill("#00ffdd");
    stroke("#ff3300");
    if(scorerightWrist > 0.2){
    circle(rightWristx , rightWristy , 25);
    
    if(rightWristy > 0 && rightWristy <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }else if(rightWristy > 100 && rightWristy <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }else if(rightWristy > 200 && rightWristy <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }else if(rightWristy > 300 && rightWristy <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }else if(rightWristy > 400 && rightWristy <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }
    if(scoreleftWrist > 0.2){

    circle(leftWristx , leftWristy , 25);
    numberleftWristy = Number (leftWristy);
    remove_decimal = floor (numberleftWristy);
    volume = remove_decimal / 500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume = " + volume;

    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log( "model is loaded !!!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = "+ leftWristx + " leftWristy = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = "+ rightWristx + " rightWristy = " + rightWristy);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftwrist = " + scoreleftWrist + " scorerightWrist = " + scorerightWrist);
    }
}