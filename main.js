import { display } from "./display.js";
import { resize, resetGame, checkAutoServe } from "./utils.js";
import { movePaddles } from "./movePaddles.js";
import { moveBall } from "./moveBall.js";
import "./events.js";
resize();
resetGame();
requestAnimationFrame(gameLoop);
let previousTimestamp = 0;
function gameLoop(timestamp) {
    if (previousTimestamp === 0) {
        previousTimestamp = timestamp;
        requestAnimationFrame(gameLoop);
        return;
    }
    const deltaTime = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    checkAutoServe(deltaTime);
    movePaddles(deltaTime);
    moveBall(deltaTime);
    display();
    requestAnimationFrame(gameLoop);
}
