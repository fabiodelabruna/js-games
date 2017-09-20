var Sprite = function(posX, posY, width, height, color) {
  this.posX = posX;
  this.posY = posY;
  this.width = width;
  this.height = height;
  this.color = color;
  this.visible = true;
}

Sprite.prototype.halfWidth = function() {
  return this.width / 2;
}

Sprite.prototype.halfHeight = function() {
  return this.height / 2;
}

Sprite.prototype.centerX = function() {
  return this.posX + this.halfWidth();
}

Sprite.prototype.centerY = function() {
  return this.posY + this.halfHeight();
}
