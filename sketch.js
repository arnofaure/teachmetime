var base;
var secondsbase;
var minutesbase;
var hoursbase;
var clockDiameter;
var cx, cy;
var sliderH, sliderM, sliders;
var hourTbase, minTbase;
var btnH, btnM, btnLearn;
var minIsOn = false;
var hourIsOn = true;
var realTime = true;
var showMeTime = false;
var mouseOnRectTime = false;

function setup() {
  // create canvas
  var c = createCanvas(475, 600);
  c.parent("#myCanvas");
  // background(100);

  stroke(0);
  strokeCap(ROUND);

  // base = min(width, height) / 2;
  base = 475 / 2;
  secondsbase = base * 0.72;
  minutesbase = base * 0.55;
  hoursbase = base * 0.40;
  hourTbase = base * 0.86;
  minTbase = base * 0.62;
  clockDiameter = base * 2;

  cx = width / 2;
  cy = (height / 2) - clockDiameter / 8;

  sliderH = select('#hourSlider');
  sliderM = select('#minSlider');
  sliders = select('#slidersWrapper');

  btnH = select('#hourBtn');
  btnH.mousePressed(hourOn);
  btnM = select('#minBtn');
  btnM.mousePressed(minOn);
  btnLearn = select('#learnBtn');
  btnLearn.mousePressed(learnOn);
  btnTime = select('#timeBtn');
  btnTime.mousePressed(showTime);



}

function draw() {
  // Draw the clock background
  fill(255);
  // strokeWeight(5);
  noStroke();

  ellipse(cx, cy, clockDiameter, clockDiameter);

  if (realTime) {
    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  } else {
    var m = map(sliderM.value(), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(sliderH.value(), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  }


  // Draw the hands of the clock
  stroke('#F52F4A');
  strokeWeight(10);
  line(cx, cy, cx + cos(m) * minutesbase, cy + sin(m) * minutesbase);
  stroke('#2963F7');
  strokeWeight(10);
  line(cx, cy, cx + cos(h) * hoursbase, cy + sin(h) * hoursbase);

  // Draw the minutes ticks
  strokeWeight(8);
  stroke(200);
  beginShape(POINTS);
  for (var a = 0; a < 360; a += 6) {
    var angle = radians(a);
    var x = cx + cos(angle) * secondsbase;
    var y = cy + sin(angle) * secondsbase;
    vertex(x, y);
  }
  endShape();

  // Draw the hour ticks
  strokeWeight(20);
  stroke('#2963F7');
  beginShape(POINTS);
  for (var a = 0; a < 360; a += 30) {
    var angle = radians(a);
    var x = cx + cos(angle) * secondsbase;
    var y = cy + sin(angle) * secondsbase;
    vertex(x, y);
  }
  endShape();


  // Display the hour numbers
  if (hourIsOn) {
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER, CENTER)
    noStroke();
    fill(0);
    for (var b = 1; b <= 12; b++) {
      var angleHN = radians(30 * b) - HALF_PI;
      var tx = cx + cos(angleHN) * hourTbase;
      var ty = cy + sin(angleHN) * hourTbase;
      text(b, tx, ty);
    }
  }

  // Display the min numbers
  if (minIsOn) {
    textSize(15);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER)
    noStroke();
    fill(0);
    for (var b = 0; b < 60; b += 5) {
      var angleHN = radians(6 * b) - HALF_PI;
      var tx = cx + cos(angleHN) * minTbase;
      var ty = cy + sin(angleHN) * minTbase;
      text(b, tx, ty);
    }
  }

  //centre dot
  noStroke();
  fill(0);
  ellipse(cx, cy, 15, 15);




  //Digit Time
  var rectTimeWidth = 200;
  var rectTimeHeight = 50;
  var rectTimeYPos = cy + clockDiameter / 1.7;
  rectMode(CENTER);

  fill(255);
  rect(cx, rectTimeYPos, rectTimeWidth, rectTimeHeight, 5);
  textSize(35);
  textStyle(BOLD)
  textAlign(CENTER, CENTER);
  fill(0);
  if (showMeTime) {
    if (!realTime) {
      var mSliderValue = sliderM.value();
      var hSliderValue = floor(sliderH.value());
      if (mSliderValue === 60) {
        var timeM = "00";
      } else if (mSliderValue < 10) {
        timeM = mSliderValue;
        digit = 0;
      } else {
        timeM = mSliderValue;
        digit = "";
      }
      text(hSliderValue + ":" + digit + timeM, cx, cy + clockDiameter / 1.7);
    } else {
      if (hour() > 12) {
        var hour12 = hour() - 12
        var period = "PM";
      } else {
        hour12 = hour()
        period = "AM";
      }
      if (minute() < 10) {
        var add0 = "0";
      } else {
        add0 = "";
      }
      text(hour12 + ":" + add0 + minute() + " " + period, cx, cy + clockDiameter / 1.7);
    }

  } else {
    text("??:??", cx, cy + clockDiameter / 1.7);
  }

}

function showTime() {
  if (showMeTime) {
    showMeTime = false;
    btnTime.html('Show Time');
  } else {
    showMeTime = true;
    btnTime.html('Hide Time');
  }

}

function learnOn() {
  if (realTime) {
    realTime = false;
    btnLearn.html('Show Real Time');
    if ($('#slidersWrapper').hasClass('display-none')) {
      sliders.removeClass('display-none');
    }
  } else {
    realTime = true;
    btnLearn.html('Play with Time');
    if (!$('#slidersWrapper').hasClass('display-none')) {
      sliders.addClass('display-none');
    }
  }
}


function hourOn() {
  if (hourIsOn) {
    hourIsOn = false;
    btnH.html('Show Hours');
  } else {
    hourIsOn = true;
    btnH.html('Hide Hours');
  }
}

function minOn() {
  if (minIsOn) {
    minIsOn = false;
    btnM.html('Show Minutes');
  } else {
    minIsOn = true;
    btnM.html('Hide Minutes');
  }
}