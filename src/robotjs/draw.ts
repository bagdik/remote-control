import robot from 'robotjs';

export const drawCircle = (radius: number) => {
  const { x, y } = robot.getMousePos();
  let newX = x;
  let newY = y;

  robot.mouseToggle('down');

  for (let i = 0; i < 2 * Math.PI ; i += Math.PI / 180) {
    newX = (x - radius) + radius * Math.cos(i);
    newY = y + radius * Math.sin(i);
    robot.dragMouse(newX, newY);
  }
  robot.mouseToggle('up');
}

export const drawRectangle = (width: number, length: number) => {
  let { x, y } = robot.getMousePos();
  let newX = x;
  let newY = y;

  robot.mouseToggle('down');

  for (let i = 0; i < length; i++) {
    newY = y + i;
    robot.dragMouse(newX, newY);
  }

  y = newY;

  for (let i = 0; i <= width; i++) {
    newX = x - i;
    robot.dragMouse(newX, newY);
  }

  x = newX;

  for (let i = 0; i <= length; i++) {
    newY = y - i;
    robot.dragMouse(newX, newY);
  }

  for (let i = 0; i <= width; i++) {
    newX = x + i;
    robot.dragMouse(newX, newY);
  }
  robot.mouseToggle('up');
}