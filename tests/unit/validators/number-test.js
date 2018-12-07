import { module, test, skip } from 'qunit';
import validate from 'ember-validation/validators/number';

const checkError = (err, key) => err.key === key;

module('Unit | Validator | number', function() {

  module('Позитивные тесты');

  test('пропускает пустые значения', async function(assert) {

    // Проверка на успех выполнения валидации над отсутствующими свойствами
    assert.ok(await validate('foo', {}), `Успех на отсутствие свойства`);

    // Любые проверяемые здесь значения могут быть сконверстированы в число «0»,
    // а значит с точки зрения валидатора чисел, являются валидными.
    assert.ok(await validate('foo', { 'foo': "" }), `Успех на пустую строку`);
    assert.ok(await validate('foo', { 'foo': null }), `Успех на null`);
    assert.ok(await validate('foo', { 'foo': undefined }), `Успех на undefined`);

  });

  test('пропускает целые числа', async function(assert) {
    assert.ok(await validate('foo', { 'foo': 0 }), `Успех на число 0`);
    assert.ok(await validate('foo', { 'foo': +5 }), `Успех на любые положительные целые числа`);
    assert.ok(await validate('foo', { 'foo': -5 }), `Успех на любые отрицательные целые числа`);
    assert.ok(await validate('foo', { 'foo': Number.MAX_SAFE_INTEGER }), `Успех на большие числа`);
    assert.ok(await validate('foo', { 'foo': Number.MIN_SAFE_INTEGER }), `Успех на маленькие числа`);
    assert.ok(await validate('foo', { 'foo': +Infinity }), `Успех на +∞`);
    assert.ok(await validate('foo', { 'foo': -Infinity }), `Успех на -∞`);
    assert.ok(await validate('foo', { 'foo': '5' }), `Успех на любые строки из целых чисел`);
  });

  test('пропускает дробные числа', async function(assert) {
    assert.ok(await validate('foo', { 'foo': .1 }), `Успех на дробное число начинающееся с точки`);
    assert.ok(await validate('foo', { 'foo': 0.1 }), `Успех на любое число с плавающей точкой`);

    assert.ok(await validate('foo', { 'foo': '0.1' }), `Успех на строку с дробным числом`);
    assert.ok(await validate('foo', { 'foo': '.1' }), `Успех на строку с дробным числом начинающееся с точки`);
    assert.ok(await validate('foo', { 'foo': '3.' }), `Успех на строку с дробным числом начинающееся с точки`);
  });

  test('пропускает 8-миразрядные числа', async function(assert) {
    assert.ok(await validate('foo', { 'foo': '07' }), `Успех на положительное 8-миразрядное число`);
    assert.ok(await validate('foo', { 'foo': '-07' }), `Успех на отрицательное 8-миразрядное число`);
  });

  test('пропускает экспоненциальные числа', async function(assert) {
    assert.ok(await validate('foo', { 'foo': '314e-2' }), `Успех на положительное e-число`);
    assert.ok(await validate('foo', { 'foo': '314e+2' }), `Успех на положительное e-число`);

    assert.ok(await validate('foo', { 'foo': '-314e-2' }), `Успех на отрицательное e-число`);
    assert.ok(await validate('foo', { 'foo': '-314e+2' }), `Успех на отрицательное e-число`);
  });

  test('пропускает 16-тиразрядные числа', async function(assert) {
    assert.ok(await validate('foo', { 'foo': 0x15 }), `Успех на положительное 16-ричное число`);
    assert.ok(await validate('foo', { 'foo': -0x15 }), `Успех на отрицательное 16-ричное число`);
  });

  test('пропускает бинарные числа', async function(assert) {
    assert.ok(await validate('foo', { 'foo': 0b0 }), `Успех на положительное бинарное число`);
    assert.ok(await validate('foo', { 'foo': -0b0 }), `Успех на отрицательное бинарное число`);
  });

  test('пропускает числовые объекты', async function(assert) {

    // Специальный объект, который учавствуя в арифметических операциях,
    // превращается в числовой примитив.
    const obj = { toString() { return 5; } };

    assert.ok(await validate('foo', { 'foo': obj }), `Успех на спец. объект`);
    assert.ok(await validate('foo', { 'foo': Number(5) }), `Успех на положительное бинарное число`);

  });

  test('пропускает значения больше минимального', async function(assert) {
    assert.ok(await validate('foo', { 'foo': 1 }, { min: 0 }), `Успех на число больше минималки`);
    assert.ok(await validate('foo', { 'foo': Number.MIN_SAFE_INTEGER }, { min: -Infinity }), `Любое число больше +∞`);
  });

  test('пропускает значения меньше максимального', async function(assert) {
    assert.ok(await validate('foo', { 'foo': 0 }, { max: 1 }), `Успех на число меньше максималки`);
    assert.ok(await validate('foo', { 'foo': Number.MAX_SAFE_INTEGER }, { max: +Infinity }), `Любое число меньше -∞`);
  });

  test('пропускает значения в диапазон', async function(assert) {
    assert.ok(await validate('foo', { 'foo': 0 }, { min: 0, max: 10 }), `Успех по нижней границе`);
    assert.ok(await validate('foo', { 'foo': 5 }, { min: 0, max: 10 }), `Успех по верхней границе`);
    assert.ok(await validate('foo', { 'foo': 10 }, { min: 0, max: 10 }), `Успех по среднему значению`);
  });

  module('Негативные тесты');

  test('не пропускает буквенные значения', async function(assert) {

    // Функция для проверки кода ошибки
    const isExpectedError = (err) => checkError(err, 'number.not_number');

    assert.rejects(validate('foo', { 'foo': 'Z' }), isExpectedError, `Неуспех на значение из букв`);
    assert.rejects(validate('foo', { 'foo': '1Z' }), isExpectedError, `Неуспех на значение из содержащее букву`);
    assert.rejects(validate('foo', { 'foo': 'Z1' }), isExpectedError, `Неуспех на значение начинающееся с буквы`);

    assert.rejects(validate('foo', { 'foo': '0x' }), isExpectedError, `Неуспех на неполное 16-ричное число`);
    assert.rejects(validate('foo', { 'foo': '0xasd' }), isExpectedError, `Неуспех на псевдо 16-ричное число`);
    assert.rejects(validate('foo', { 'foo': '0A' }), isExpectedError, `Неуспех на псевдо 8-ричное число`);

  });

  test('не пропускает спец. символы', async function(assert) {

    // Функция для проверки кода ошибки
    const isExpectedError = (err) => checkError(err, 'number.not_number');

    assert.rejects(validate('foo', { 'foo': '.' }), isExpectedError, `Неуспех на точку`);
    assert.rejects(validate('foo', { 'foo': '4+' }), isExpectedError, `Неуспех на наличие арифм. операторов`);

  });

  test('не пропускает значения меньше минимального', async function(assert) {
    // Функция для проверки кода ошибки
    const isExpectedError = (err) => checkError(err, 'number.less_then');
    assert.rejects(validate('foo', { 'foo': 0 }, { min: 1 }), isExpectedError, `Неуспех на значение меньше минималки`);
  });

  test('не пропускает значения больше максимального', async function(assert) {
    // Функция для проверки кода ошибки
    const isExpectedError = (err) => checkError(err, 'number.greater_then');
    assert.rejects(validate('foo', { 'foo': 1 }, { max: 0 }), isExpectedError, `Неуспех на значение больше максимального`);
  });

  test('проверяет максимальное значение', async function(assert) {
    // Функция для проверки кода ошибки
    const isExpectedError = (err) => checkError(err, 'number.out_of_range');
    assert.rejects(validate('foo', { 'foo': -1 }, { min: 0, max: 10 }), isExpectedError, `Неуспех на значение меньше минималки`);
    assert.rejects(validate('foo', { 'foo': 11 }, { min: 0, max: 10 }), isExpectedError, `Неуспех на значение больше максимального`);
 });

});
