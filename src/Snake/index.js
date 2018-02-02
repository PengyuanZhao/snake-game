import {
  TOTAL_ROWS,
  TOTAL_COLS,
  INITIAL_SNAKE_LENGTH,
  MOVING_INTERVAL,
  LEFT,
  UP,
  RIGHT,
  DOWN,
} from './constants';
import './index.scss';

class Snake {
  constructor() {
    this.initField();
    this.initSnake();
    this.makeFood();
    this.handleOnKeydown();
  }

  initField() {
    const table = document.createElement('table');
    table.className = 'field';
    for (let i = 0; i < TOTAL_ROWS; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < TOTAL_COLS; j++) {
        const td = document.createElement('td');
        const isWall = (i === 0 || i === TOTAL_ROWS - 1 || j === 0 || j === TOTAL_COLS - 1);
        td.className = isWall ? 'wall' : 'blank';
        td.id = `${j}-${i}`;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.innerHTML = `
      <span class="dashboard__score">Score: <span>0</span></span>
      <span class="dashboard__alert"></span>
      <ul class="dashboard__controls">
        <li><kbd>&larr;</kbd> Move Left </li>
        <li><kbd>&rarr;</kbd> Move Right</li>
        <li><kbd>&uarr;</kbd> Move Up</li>
        <li><kbd>&darr;</kbd> Move Down</li>
        <li><kbd>Space</kbd> Pause</li>
        <li><kbd>Enter</kbd> Restart</li>
      </ul>
    `;

    const snake = document.getElementById('snake');
    snake.appendChild(table);
    snake.appendChild(dashboard);
    this.dashboardScore = document.querySelector('.dashboard__score span');
    this.dashboardAlert = document.querySelector('.dashboard__alert');
  }

  initSnake() {
    this.score = 0;
    this.isOver = false;
    this.direction = RIGHT;
    this.snakeHead = { x: INITIAL_SNAKE_LENGTH, y: 1 };
    this.snakeCells = [];
    this.dashboardAlert.textContent = '';
    document.querySelectorAll('.snake').forEach(elem => elem.classList.remove('snake'));

    // Show initial snake in top left.
    for (let i = 1; i <= INITIAL_SNAKE_LENGTH; i++) {
      document.getElementById(`${i}-1`).setAttribute('class', 'snake');
      this.snakeCells.push({ x: i, y: 1 });
    }

    this.intervalId = setInterval(this.moveSnake, MOVING_INTERVAL);
  }

  moveSnake = () => {
    if (this.isPaused || this.isOver) return;

    if (this.direction === LEFT) this.snakeHead.x--;
    if (this.direction === RIGHT) this.snakeHead.x++;
    if (this.direction === UP) this.snakeHead.y--;
    if (this.direction === DOWN) this.snakeHead.y++;

    const snakeHeadElem = document.getElementById(`${this.snakeHead.x}-${this.snakeHead.y}`);

    if (snakeHeadElem.classList.contains('snake') || snakeHeadElem.classList.contains('wall')) {
      console.log(snakeHeadElem.classList);
      this.isOver = true;
      this.dashboardAlert.innerHTML = 'Game Over!';
      clearInterval(this.intervalId);
      return;
    }

    // If food is eaten, increment score. Otherwise, cut off the tail cell.
    if (snakeHeadElem.classList.contains('food')) {
      this.score++;
      this.dashboardScore.textContent = this.score;
      this.makeFood();
    } else {
      const snakeTail = this.snakeCells.shift();
      document.getElementById(`${snakeTail.x}-${snakeTail.y}`).setAttribute('class', 'blank');
    }

    // Move forward by adding the new head to snake.
    snakeHeadElem.setAttribute('class', 'snake');
    this.snakeCells.push({ ...this.snakeHead });
  }

  makeFood() {
    const blankCells = document.querySelectorAll('.blank');
    const randomCell = blankCells[Math.floor(Math.random() * blankCells.length)];
    randomCell.setAttribute('class', 'food');
  }

  handleOnKeydown() {
    document.addEventListener('keydown', (e) => {
      const key = e.keyCode;
      if (key === LEFT && this.direction !== RIGHT) this.direction = LEFT;
      if (key === UP && this.direction !== DOWN) this.direction = UP;
      if (key === DOWN && this.direction !== UP) this.direction = DOWN;
      if (key === RIGHT && this.direction !== LEFT) this.direction = RIGHT;
      // If `ENTER` is pressed, restart game
      if (key === 13 && this.isOver) this.initSnake();
      // If `SPACE` is pressed, pause or unpause game
      if (key === 32 && !this.isOver) {
        this.isPaused = !this.isPaused;
        this.dashboardAlert.textContent = this.isPaused ? 'PAUSED' : '';
      }
    });
  }
}

export default Snake;
