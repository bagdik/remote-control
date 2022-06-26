import robot from 'robotjs';

export const getMouseCoords = () => {
  const { x, y } = robot.getMousePos();
  return {x, y};
}