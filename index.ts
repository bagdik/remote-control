import { httpServer } from './src/http_server/index';
import { WebSocketServer } from 'ws';

import { 
  mouseUp, mouseDown, mouseLeft, mouseRight, getMouseCoords 
} from './src/robotjs/mouseMove';

import { drawCircle, drawRectangle } from './src/robotjs/draw';

import { screenCapture } from './src/robotjs/screenCapture';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('connection', wsClient => {
  console.log(`Connection accepted`);

  wsClient.on('message', (message) => {

    const [ command, ...params ] = message.toString().split(' ');
    console.log('<- ' + message.toString() + '\0');
    switch(command) {
      case 'mouse_up':
        mouseUp(+params[0]);
        wsClient.send(`${command}`);
        break;
      case 'mouse_down':
        mouseDown(+params[0]);
        wsClient.send(`${command}`);
        break;
      case 'mouse_left':
        mouseLeft(+params[0]);
        wsClient.send(`${command}`);
        break;
      case 'mouse_right':
        mouseRight(+params[0]);
        wsClient.send(`${command}`);
        break;
      case 'draw_circle':
        drawCircle(+params[0]);   
        wsClient.send(`${command}`);
        break;
      case 'draw_rectangle':
        drawRectangle(+params[0], +params[1]);     
        wsClient.send(`${command}`);    
        break;
      case 'mouse_position':
        const { x, y } = getMouseCoords();
        wsClient.send(`${command} ${x} ${y}`);  
        console.log(`-> ${command} ${x} ${y} \0`);
        break;
      case 'prnt_scrn': {
        screenCapture()
          .then((screen) => {
            console.log(`-> ${command} ${screen} \0`);
            wsClient.send(`${command} ${screen}`); 
          });
        break;
      }
      default:
        console.log('Invalid input');
    }

  });

  wsClient.on('close', () => {
    console.log('Client disconnected');
  });
});
