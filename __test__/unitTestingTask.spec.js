const unitTestingTask = require("../unitTestingTask");
const { lang } = require("../unitTestingTask");

describe("unitTestingTask lang function", () => {
  afterEach(() => lang("en"));

  it('should return "en" if no arguments are passed', () => {
    expect(lang()).toBe("en");
  });

  it("should return the current language if unexisting language argument is passed", () => {
    expect(lang("de")).toBe("en");
  });

  it("should return passed language symbol if options argument was provided", () => {
    expect(lang("de", {})).toBe("de");
  });

  it("should return uk language", () => {
    expect(lang("uk")).toBe("uk");
  });
});

describe("unitTestingTask function", () => {
  const mockedDate =
    "Mon Jan 23 2023 05:09:03:0023 GMT+0200 (Eastern European Standard Time)";
  const mockedFormat = "DD-MM-YYYY";

  describe("called with wrong arguments", () => {
    const wrongFormatArgumentTypeMessage = "Argument `format` must be a string";
    const incorrectDateArgumentTypeMessage =
      "Argument `date` must be instance of Date or Unix Timestamp or ISODate String";

    it(`should trow a TypeError "${wrongFormatArgumentTypeMessage}" if first "format" argument is a number`, () => {
      expect(() => unitTestingTask(12, mockedDate)).toThrow(
        new TypeError(wrongFormatArgumentTypeMessage)
      );
    });

    it(`should trow a TypeError "${wrongFormatArgumentTypeMessage}" if first "format" argument is a undefined`, () => {
      expect(() => unitTestingTask(undefined, mockedDate)).toThrow(
        new TypeError(wrongFormatArgumentTypeMessage)
      );
    });

    it(`should trow a TypeError "${wrongFormatArgumentTypeMessage}" if first "format" argument is an object`, () => {
      expect(() => unitTestingTask({}, mockedDate)).toThrow(
        new TypeError(wrongFormatArgumentTypeMessage)
      );
    });

    it(`should trow a TypeError "${wrongFormatArgumentTypeMessage}" if first "format" argument is an empty string`, () => {
      expect(() => unitTestingTask("", mockedDate)).toThrow(
        new TypeError(wrongFormatArgumentTypeMessage)
      );
    });

    it(`should throw an error "${incorrectDateArgumentTypeMessage}" if second "date" argument is null`, () => {
      expect(() => unitTestingTask(mockedFormat, null)).toThrow(
        new TypeError(incorrectDateArgumentTypeMessage)
      );
    });

    it(`should throw an error "${incorrectDateArgumentTypeMessage}" if second "date" argument is object`, () => {
      expect(() => unitTestingTask(mockedFormat, {})).toThrow(
        new TypeError(incorrectDateArgumentTypeMessage)
      );
    });

    it(`should throw an error "${incorrectDateArgumentTypeMessage}" if second "date" argument is array`, () => {
      expect(() => unitTestingTask(mockedFormat, [])).toThrow(
        new TypeError(incorrectDateArgumentTypeMessage)
      );
    });
  });

  describe("called with correct arguments", () => {
    it("should not throw error with correct argument", () => {
      expect(() => unitTestingTask(mockedFormat, mockedDate)).not.toThrow();
    });

    it("should not throw error if 'format' argument is passed as dummy string", () => {
      expect(() => unitTestingTask("dummy string", mockedDate)).not.toThrow();
    });

    it("should not throw error if 'date' argument is passed as dummy string", () => {
      expect(() => unitTestingTask(mockedFormat, "dummy string")).not.toThrow();
    });

    it("should not throw error if 'date' argument is passed as dummy number", () => {
      expect(() => unitTestingTask(mockedFormat, 12345)).not.toThrow();
    });
  });

  describe("year formats", () => {
    it("should return 2023 if passed format YYYY", () => {
      expect(unitTestingTask("YYYY", mockedDate)).toBe("2023");
    });

    it("should return 23 if passed format YY", () => {
      expect(unitTestingTask("YY", mockedDate)).toBe("23");
    });
  });

  describe("month formats", () => {
    it.concurrent.each([
      ["MMMM", "January"],
      ["MMM", "Jan"],
      ["MM", "01"],
      ["M", "1"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });

  describe("day formats", () => {
    it.concurrent.each([
      ["DDD", "Monday"],
      ["DD", "Mon"],
      ["D", "Mo"],
      ["dd", "23"],
      ["d", "23"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });

  describe("hours formats", () => {
    it.concurrent.each([
      ["HH", "05"],
      ["H", "5"],
      ["hh", "05"],
      ["h", "5"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });

  describe("minutes formats", () => {
    it.concurrent.each([
      ["mm", "09"],
      ["m", "9"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });

  describe("seconds formats", () => {
    it.concurrent.each([
      ["ss", "03"],
      ["s", "3"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });

  describe("milliseconds formats", () => {
    it.concurrent.each([
      ["ff", "023"],
      ["f", "23"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });

  describe("AM/PM formats", () => {
    const pmTimeMockedDate =
      "Mon Jan 23 2023 15:09:03:0023 GMT+0200 (Eastern European Standard Time)";
    it.concurrent.each([
      ["A", "AM"],
      ["a", "am"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });

    it.concurrent.each([
      ["A", "PM"],
      ["a", "pm"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, pmTimeMockedDate)).toBe(expected);
    });
  });

  describe("timezones formats", () => {
    it.concurrent.each([
      ["ZZ", "+0200"],
      ["Z", "+02:00"],
    ])("for passed format %s should return %s", (format, expected) => {
      expect(unitTestingTask(format, mockedDate)).toBe(expected);
    });
  });
});
