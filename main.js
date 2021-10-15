Array_1 = ["alarm clock","book","basketball","baseball","phone","airplane","circle","bridge",];
random_number = Math.floor((Math.random() * Array_1.length) + 1);
console.log(Array_1[random_number]);
sketch = Array_1[random_number];
document.getElementById('guess').innerHTML = 'Sketch to be drawn: ' + sketch

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function updateCanvas(){
    background("white");
    random_number = Math.floor((Math.random() * Array_1.length) + 1);
    console.log(Array_1[random_number]);
    sketch = Array_1[random_number];
    document.getElementById('guess').innerHTML = 'Sketch to be drawn: ' + sketch

}

function setup() {
    canvas = createCanvas(280, 280);
    background("white");
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas() {
    background("white");
}

function draw() {
    strokeWeight(13);
    stroke(0);

    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score++;
        document.getElementById('score').innerHTML = 'score: ' + score;
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Your sketch: ' + drawn_sketch;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
}

function check_sketch(){
    timer_counter++;
    document.getElementById('time').innerHTML = 'Timer: ' + timer_counter;
    console.log(timer_counter);
    
    if(timer_counter > 600){
        timer_counter = 0;
        timer_check = "Completed";
    }
    if(timer_check == "Completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}