var Tokens = {
  STRING_START_END: '"',
  LIST_BEGIN: '[',
  LIST_END: ']',
  DELIMITER: ',',
  DICT_SYMBOL: ':',
  DICT_START: '{',
  DICT_END: '}'
};

function isDigit(stringPart) {
  var asciiCode = stringPart.charCodeAt(0);
  return asciiCode >= 48 && asciiCode <= 57;
}

function parseNumber(stringParts) {
  var number = [];
  for (var index = 0; index < stringParts.length; index++)
    if (isDigit(stringParts[index]))
      number.push(stringParts[index]);
    else
      break;
  return [Number(number.join('')), stringParts.slice(index).join('')];
}

function parseString(stringParts) {
  for (var i = 1; i < stringParts.length; i++)
    if (stringParts[i] === Tokens.STRING_START_END)
      break;
  return [stringParts.slice(1, i).join(''), stringParts.slice(i + 1).join('')];
}

function parseList(stringParts) {
  var array = [];
  var start = 1;
  var tokenCount = 1;
  if (stringParts[start] === Tokens.LIST_END)
    return [[], stringParts.slice(start + 1).join('')];

  for (var i = start; i < stringParts.length && tokenCount; i++)
    if (stringParts[i] === Tokens.LIST_BEGIN) {
      tokenCount++;
    } else if (stringParts[i] === Tokens.LIST_END && --tokenCount <= 1) {
      if (start !== i + tokenCount)
        array.push(parse(stringParts.slice(start, i + tokenCount).join(''))[0]);
      start = i + 1;
      if (stringParts[start] === Tokens.DELIMITER)
        i = start++;
    } else if (stringParts[i] === Tokens.DELIMITER && tokenCount === 1) {
      array.push(parse(stringParts.slice(start, i).join(''))[0]);
      start = i + 1;
    }
  return [array, stringParts.slice(i).join('')];
}

function parseDict(stringParts) {
  var dict = {};
  var start = 1;
  var tokenCount = 1;
  var key;
  if (stringParts[start] === Tokens.DICT_END)
    return [{}, stringParts.slice(start + 1).join('')];

  for (var i = start; i < stringParts.length && tokenCount; i++)
    if (stringParts[i] === Tokens.DICT_START) {
      tokenCount++;
    } else if (stringParts[i] === Tokens.DICT_END && --tokenCount <= 1) {
      if (start !== i + tokenCount)
        dict[key] = parse(stringParts.slice(start, i + tokenCount).join(''))[0];
      start = i + 1;
      if (stringParts[start] === Tokens.DELIMITER)
        i = start++;
    } else if (stringParts[i] === Tokens.DICT_SYMBOL && tokenCount === 1) {
      key = parse(stringParts.slice(start, i).join(''))[0];
      start = i + 1;
    } else if (stringParts[i] === Tokens.DELIMITER && tokenCount === 1) {
      dict[key] = parse(stringParts.slice(start, i).join(''))[0];
      start = i + 1;
    }
  return [dict, stringParts.slice(i).join('')];
}

function parse(string) {
  var convertedString = string.replace(/\s/g, '');
  var stringParts = convertedString.split('');
  if (isDigit(stringParts[0]))
    return parseNumber(stringParts);
  else if (stringParts[0] === Tokens.STRING_START_END)
    return parseString(stringParts);
  else if (stringParts[0] === Tokens.LIST_BEGIN)
    return parseList(stringParts);
  else if (stringParts[0] === Tokens.DICT_START)
    return parseDict(stringParts);
}
