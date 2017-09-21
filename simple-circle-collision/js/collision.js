function collide(circle1, circle2) {
  var dx = circle2.x - circle1.x; // distance between x
  var dy = circle2.y - circle1.y; // distance between y
  var distance = Math.sqrt(dx * dx + dy * dy); // Pythagorean Theory
  var minDistance = circle1.radius + circle2.radius;
  
  if (distance < minDistance) {
    circle2.color = '#f00';
  } else {
    circle2.color = '#0f0';
  }
}