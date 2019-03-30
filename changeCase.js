/**
 * Объект задаёт диапазоны для поиска букв
 * @property {Array}  upper - Содержит объекты со диапазонами Unicode символов соответствующие буквам верхнего регистра(русские и английские буквы).
 * @property {Array}  lower - Содержит объекты со диапазонами Unicode символов соответствующие буквам нижнего регистра(русские и английские буквы).
 * @property {number} upper[0|1].start - Код символа соответствущего первой букве (английского | русского) алфавита в верхнем регистре.
 * @property {number} upper[0|1].end - Код символа соответствущего последней букве (английского | русского) алфавита в верхнем регистре.
 * @property {number} upper[0|1].gap - Разница которую нужно прибавить к текущему символу чтобы получить символ другого регистра.
 * @property {number} lower[0|1].start - Код символа соответствущего первой букве (английского | русского) алфавита в нижнем регистре.
 * @property {number} lower[0|1].end - Код символа соответствущего последней букве (английского | русского) алфавита в нижнем регистре.
 * @property {number} lower[0|1].gap - Разница которую нужно прибавить к текущему символу чтобы получить символ другого регистра.
 *
 */

let vocabulary = {
  upper: [
    {
      start: 65,
      end: 90,
      gap: 32
    },
    {
      start: 1040,
      end: 1071,
      gap: 32
    },
    {
      start: 1025,
      end: 1025,
      gap: 80
    }
  ],
  lower: [
    {
      start: 97,
      end: 122,
      gap: -32
    },
    {
      start: 1072,
      end: 1103,
      gap: -32
    },
    {
      start: 1105,
      end: 1105,
      gap: -80
    }
  ]
};

/**
 *  Ищет переданную букву в заданных диапазонах "словаря"
 * @param {string} - переданная буква
 * @param {Array} - массив с объектами в которых содержаться диапазоны
 * @returns {string|boolean} - возвращает букву в измененном регистре или false если буква уже в нужном регистре
 */

function parse(letter, arrGap) {
  for (let page of arrGap) {
    let code = letter.charCodeAt(0);
    if (code >= page.start && code <= page.end) {
      return String.fromCharCode(code + page.gap);
    }
  }
  return false;
}

/**
 * Меняет регистр переданной строки
 * @param {string} strToParse - Строка регистр которой надо поменять
 * @param {boolean} register - true - перевести в верхний регистр, false - перевести в  нижний регистр
 * @param {boolean} needSwitch - true - инвертировать первую букву false - не инвертировать
 * @returns {string} Строка с измененным регистром
 */

function changeCase(strToParse, register, needSwitch = false) {
  // Определение позиции первой буквы в строке на случай, если вначале строки не буквы
  let position = strToParse.search(/[A-ZА-ЯЁ]/i);
  let arrayFromString = strToParse.split("");
  let vocCase = register ? vocabulary.lower : vocabulary.upper; // определяем диапазон значений в которых будем проверять
  for (let i = position + Number(needSwitch); i < arrayFromString.length; i++) {
    let temp = parse(arrayFromString[i], vocCase);
    if (!temp) continue; // если возвращается false значит буква уже в нужном регистре
    arrayFromString[i] = temp; // если есть новое значение - присваиваем
  }
  if (needSwitch) {
    // если нужно инвертировать первую букву
    vocCase = register ? vocabulary.upper : vocabulary.lower;
    let temp = parse(arrayFromString[position], vocCase);
    arrayFromString[position] = !temp ? arrayFromString[position] : temp;
  }
  return arrayFromString.join("");
}

console.log(changeCase("dfr234  rr 3rg34f2 v2", true));
