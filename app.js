const params = new Map(location.search.slice(1).split('&').map(kv => kv.split('=')))
const app = document.querySelector('#area');
let timeSport, timeRest, timeInt;
const exercises = [
  'Выпрыгивания из планки',
  'Выпрыгивания из планки',
  'Выпрыгивания из планки',
  'Присед',
  'Присед',
  'Присед',
  'Переход из положения стоя в планку',
  'Переход из положения стоя в планку',
  'Переход из положения стоя в планку',
  'Поджимания колен в планке',
  'Поджимания колен в планке',
  'Поджимания колен в планке',
  'Выпады перекрёстные',
  'Выпады перекрёстные',
  'Выпады перекрёстные',
  'Диагональные скручивания с поджатыми коленями',
  'Диагональные скручивания с поджатыми коленями',
  'Диагональные скручивания с поджатыми коленями',
  'Скручивания обычные',
  'Скручивания обычные',
  'Скручивания обычные',
  'Скручивания диагональные',
  'Скручивания диагональные',
  'Скручивания диагональные',
  'Подъемы корпуса, помогаем руками',
  'Подъемы корпуса, помогаем руками',
  'Подъемы корпуса, помогаем руками',
  'Стульчик',
  'Стульчик',
  'Стульчик'
];

class App {
  constructor({ time, restTime, exercises }) {
    this._time = time
    this._restTime = restTime
    this._exercises = exercises
    this._exercise = 0
  }
  _write(limit, text) {
    app.innerHTML = `<h1>${limit}</h1><p>${text}</p>`;
  }
  _timer(time, header, callback) {
    let limit = time;
    timeInt = setInterval(() => {
      if (limit === 0) {
        clearInterval(timeInt);
        callback();
        return;
      }
      limit--;
      this._write(limit, header);
    }, 1000);
  }
  _rest() {
    this._timer(this._restTime, 'Отдых', this.sport);
  }
  _sport() {
    if (this._exercise >= this._exercises.length) {
      this._write('УРА', 'Финиш!');
      return;
    }

    this._timer(this._time, `${this._exercises[this._exercise]}`, () => {
      this._exercise++;
      this._rest();
      return;
    });
  }
  init() {
    this._sport();
  }
}

document.getElementById('start').addEventListener('click', () => {
  const sport = +params.get('sport');
  const rest = +params.get('rest');
  timeSport = sport > 0 ? sport + 1 : 41;
  timeRest = rest > 0 ? rest + 1 : 21;
  clearInterval(timeInt);
  const fatburn = new App({
    time: timeSport,
    restTime: timeRest,
    exercises
  });
  fatburn.init();
});
