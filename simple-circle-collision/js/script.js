(function() {
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  
  var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
  var mvLeft = mvUp = mvRight = mvDown = false;

  var character = new Circle(50, 50, '#00f');
  var stopedCircle = new Circle(150, 150, '#0f0');

  window.addEventListener('keydown', keydownHandler, false);
  window.addEventListener('keyup', keyupHandler, false);

  function keydownHandler(event) {
    var key = event.keyCode;
    switch (key) {
      case LEFT: mvLeft = true; break;
      case UP: mvUp = true; break;
      case RIGHT: mvRight = true; break;
      case DOWN: mvDown = true; break;
    }
  }

  function keyupHandler(event) {
    var key = event.keyCode;
    switch (key) {
      case LEFT: mvLeft = false; break;
      case UP: mvUp = false; break;
      case RIGHT: mvRight = false; break;
      case DOWN: mvDown = false; break;
    }
  }

  function move() {
    if (mvLeft && !mvRight) {
      character.x -= character.speed;
    }
    if (mvRight && !mvLeft) {
      character.x += character.speed;
    }
    if (mvUp && !mvDown) {
      character.y -= character.speed;
    }
    if (mvDown && !mvUp) {
      character.y += character.speed;
    }
  }

  function update() {
    move();

    // canvas bound
    character.x = Math.max(character.radius, Math.min(canvas.width - character.radius, character.x));
    character.y = Math.max(character.radius, Math.min(canvas.height - character.radius, character.y));

    collide(character, stopedCircle);
  }

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw character
    context.beginPath();
    context.fillStyle = character.color;
    context.arc(character.x, character.y, character.radius, 0, Math.PI*2);
    context.closePath();
    context.fill();

    // draw stoped circle
    context.beginPath();
    context.fillStyle = stopedCircle.color;
    context.arc(stopedCircle.x, stopedCircle.y, stopedCircle.radius, 0, Math.PI*2);
    context.closePath();
    context.fill();
  }

  function loop() {
    window.requestAnimationFrame(loop, canvas);
    update();
    render();
  }

  loop();
}());