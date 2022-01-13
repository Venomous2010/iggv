song="";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;

function preload(){
    song = loadSound("https://venomous2010.github.io/music/");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.posenet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}

function modelloaded(){
    console.log('poseNet is initialized');
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeft = " + scoreLeftWrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightwristX + "rightwristY = " + rightwristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX,rightwristY,200);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
        }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHtml = "Volume" + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.setRate(1);
}
