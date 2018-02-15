!function(e){function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=37,s=38,i=39,o=40,d=(t(1),Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}),l=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),c=function(){function e(){var n=this;a(this,e),this.moveSnake=function(){if(!n.isPaused&&!n.isOver){n.direction===r&&n.snakeHead.x--,n.direction===i&&n.snakeHead.x++,n.direction===s&&n.snakeHead.y--,n.direction===o&&n.snakeHead.y++;var e=document.getElementById(n.snakeHead.x+"-"+n.snakeHead.y);if(e.classList.contains("snake")||e.classList.contains("wall"))return console.log(e.classList),n.isOver=!0,n.dashboardAlert.innerHTML="Game Over!",void clearInterval(n.intervalId);if(e.classList.contains("food"))n.score++,n.dashboardScore.textContent=n.score,n.makeFood();else{var t=n.snakeCells.shift();document.getElementById(t.x+"-"+t.y).setAttribute("class","blank")}e.setAttribute("class","snake"),n.snakeCells.push(d({},n.snakeHead))}},this.initField(),this.initSnake(),this.makeFood(),this.handleOnKeydown()}return l(e,[{key:"initField",value:function(){var e=document.createElement("table");e.className="field";for(var n=0;n<30;n++){for(var t=document.createElement("tr"),a=0;a<50;a++){var r=document.createElement("td"),s=0===n||29===n||0===a||49===a;r.className=s?"wall":"blank",r.id=a+"-"+n,t.appendChild(r)}e.appendChild(t)}var i=document.createElement("div");i.className="dashboard",i.innerHTML='\n      <span class="dashboard__score">Score: <span>0</span></span>\n      <span class="dashboard__alert"></span>\n      <ul class="dashboard__controls">\n        <li><kbd>&larr;</kbd> Move Left </li>\n        <li><kbd>&rarr;</kbd> Move Right</li>\n        <li><kbd>&uarr;</kbd> Move Up</li>\n        <li><kbd>&darr;</kbd> Move Down</li>\n        <li><kbd>Space</kbd> Pause</li>\n        <li><kbd>Enter</kbd> Restart</li>\n      </ul>\n    ';var o=document.getElementById("snake");o.appendChild(e),o.appendChild(i),this.dashboardScore=document.querySelector(".dashboard__score span"),this.dashboardAlert=document.querySelector(".dashboard__alert")}},{key:"initSnake",value:function(){this.score=0,this.isOver=!1,this.direction=i,this.snakeHead={x:3,y:1},this.snakeCells=[],this.dashboardAlert.textContent="",document.querySelectorAll(".snake").forEach(function(e){return e.classList.remove("snake")});for(var e=1;e<=3;e++)document.getElementById(e+"-1").setAttribute("class","snake"),this.snakeCells.push({x:e,y:1});this.intervalId=setInterval(this.moveSnake,100)}},{key:"makeFood",value:function(){var e=document.querySelectorAll(".blank");e[Math.floor(Math.random()*e.length)].setAttribute("class","food")}},{key:"handleOnKeydown",value:function(){var e=this;document.addEventListener("keydown",function(n){var t=n.keyCode;t===r&&e.direction!==i&&(e.direction=r),t===s&&e.direction!==o&&(e.direction=s),t===o&&e.direction!==s&&(e.direction=o),t===i&&e.direction!==r&&(e.direction=i),13===t&&e.isOver&&e.initSnake(),32!==t||e.isOver||(e.isPaused=!e.isPaused,e.dashboardAlert.textContent=e.isPaused?"PAUSED":"")})}}]),e}(),u=c;t(2);new u},function(e,n){},function(e,n){}]);