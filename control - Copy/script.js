const draggable = document.getElementById('drag1');
const targets = document.querySelectorAll('.target');

let isDragging = false;
let offsetX, offsetY;

draggable.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - draggable.offsetLeft;
  offsetY = e.clientY - draggable.offsetTop;
  draggable.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  draggable.style.left = x + 'px';
  draggable.style.top = y + 'px';

  // Check collision
  targets.forEach(target => {
    if (isColliding(draggable, target)) {
      isDragging = false; // stop dragging
      draggable.style.cursor = 'grab';

      // Move the draggable div 2px away from the target
      const dx = draggable.offsetLeft - target.offsetLeft;
      const dy = draggable.offsetTop - target.offsetTop;

      const moveX = dx === 0 ? 2 : 2 * Math.sign(dx);
      const moveY = dy === 0 ? 2 : 2 * Math.sign(dy);

      draggable.style.left = (draggable.offsetLeft + moveX) + 'px';
      draggable.style.top = (draggable.offsetTop + moveY) + 'px';
    }
  });
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  draggable.style.cursor = 'grab';
});

// Utility function to check bounding box collision
function isColliding(rect1, rect2) {
  const r1 = rect1.getBoundingClientRect();
  const r2 = rect2.getBoundingClientRect();

  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}