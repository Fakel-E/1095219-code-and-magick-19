'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var TEXT_GAP = 20;
var BAR_X = 150;
var BAR_Y = 90;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
// var FONT_GAP = 15;
// var TEXT_WIDTH = 50;
// var BAR_HEIGHT = 20;
// var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

var renderCloud = function (ctx, x, y, color) {
  // функция рисовки облака
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y) {
  // функция вывода поздравления
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.fillText('Ура, вы победили!', x + TEXT_GAP, y + TEXT_GAP * 2);
  ctx.fillText('Список результатов:', x + TEXT_GAP, y + TEXT_GAP * 3);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  // функиция поиска максимального элемента
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  // рисуем тень облака
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba (0, 0, 0, 0.7)'); // Вопрос. Не работает rgba. Почему?
  // рисуем основное облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // выводим поздравление
  renderText(ctx, CLOUD_X, CLOUD_Y);

  ctx.fillStyle = '#000';

  // берём максимальный элемент, для расчёта высоты столбца
  var maxTime = getMaxElement(times);

  // рисуем колонки результатов
  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], BAR_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - CLOUD_Y);
    ctx.fillRect(BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
  // MAX_BAR            BAR[I]
  // ----------  =  -----------
  // BAR_HEIGHT           X
  //  X = (BAR_HEIGHT * BAR[I]) / MAX_BAR
};
