(function() {
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');

  var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
  var mvLeft = mvUp = mvRight = mvDown = false;

  var blocks = [];
  var sprites = [];
  
  var character = new Sprite(50, 175, 50, 50, '#00f');
  character.speed = 2;
  sprites.push(character);

  var block1 = new Sprite(500, 100, 50, 50, '#f00');
  sprites.push(block1);
  blocks.push(block1);
  
  var block2 = new Sprite(200, 300, 100, 50, '#8b6914');
  sprites.push(block2);
  blocks.push(block2);

  var block3 = new Sprite(50, 100, 20, 150, '#7f7f7f');
  sprites.push(block3);
  blocks.push(block3);

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

    // collisions
    for (var i in blocks) {
      var b1 = blocks[i];
      if (b1.visible) {
        blockRect(character, b1);
      }
    }
    
  }

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i in sprites) {
      var sprite = sprites[i];

      if (sprite.visible) {
        context.fillStyle = sprite.color;
        context.fillRect(sprite.posX, sprite.posY, sprite.width, sprite.height);        
      }
    }
  }

  function loop() {
    window.requestAnimationFrame(loop, canvas);
    update();
    render();
  }

  loop();

}());
