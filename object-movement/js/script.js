(function() {
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');

  var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
  var mvLeft = mvUp = mvRight = mvDown = false;
  
  var character = new Sprite(50, 175, 50, 50, '#00f');
  character.speed = 2;

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
      character.posX -= character.speed;
    }
    if (mvRight && !mvLeft) {
      character.posX += character.speed;
    }
    if (mvUp && !mvDown) {
      character.posY -= character.speed;
    }
    if (mvDown && !mvUp) {
      character.posY += character.speed;
    }
  }

  function update() {
    move();

    // canvas bound
    character.posX = Math.max(0, Math.min(canvas.width - character.width, character.posX));
    character.posY = Math.max(0, Math.min(canvas.height - character.height, character.posY));
  }

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = character.color;
    context.fillRect(character.posX, character.posY, character.width, character.height);        

  }

  function loop() {
    window.requestAnimationFrame(loop, canvas);
    update();
    render();
  }

  loop();

}());
