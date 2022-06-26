import robot from 'robotjs';

export const mouseUp = (distance: number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x, y - distance);  
}

export const mouseDown = (distance: number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x, y + distance);
}

export const mouseLeft = (distance: number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x - distance, y);
}

export const mouseRight = (distance: number) => {
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x + distance, y);
}