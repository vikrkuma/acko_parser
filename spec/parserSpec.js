describe("Custom JSON Parser", function () {

  it("should be able to parse a number", function () {
    var input = '123';
    var output = [123, ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it("should be able to separate all data after numerics ended", function () {
    var input = '123abc';
    var output = [123, 'abc'];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it("should be able to parse a number as a string", function () {
    var input = '"123"abc';
    var output = ['123', 'abc'];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it("should be able parse string and separate the rest input", function () {
    var input = '"abc"[1,2,3]';
    var output = ["abc", '[1,2,3]'];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should be able to parse an array', function () {
    var input = '[1,2,3]';
    var output = [[1, 2, 3], ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should separate out other data from initial array', function () {
    var input = '[1,2,3][abc]';
    var output = [[1, 2, 3], '[abc]'];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse empty array', function () {
    var input = '[]';
    var output = [[], ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse empty array collections', function () {
    var input = '[[],[[]]]';
    var output = [[[], [[]]], ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse empty nested arrays', function () {
    var input = '[[[]]]';
    var output = [[[[]]], ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse the complex array collection', function () {
    var input = '["a",123,["x","y", []], 6, []]';
    var output = [['a', 123, ['x', 'y', []], 6, []], ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse an object', function () {
    var input = '{"a": 5, "t": "abc"}';
    var output = [{ a: 5, t: 'abc' }, ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should separate other data from initial object', function () {
    var input = '{"a": 5, "t": "abc"}abc';
    var output = [{ a: 5, t: 'abc' }, 'abc'];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse empty object', function () {
    var input = '{}';
    var output = [{}, ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse empty object collections', function () {
    var input = '{"a": {}, "b": {"c": {}}}';
    var output = [{ a: {}, b: { c: {} } }, ''];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });

  it('should parse the complex object collection', function () {
    var input = '{"a": 5, "b": {"c": {"d": 6}}, "e": 8}human';
    var output = [{ a: 5, b: { c: { d: 6 } }, e: 8 }, 'human'];
    var result = NewParser.parse(input);
    expect(result).toEqual(output);
  });
});
