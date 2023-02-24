const unitTestingTask = require("../../unitTestingTask");
require("../../lang/uk");

describe("unitTestingTask language - uk", () => {
  describe("set uk language", () => {
    unitTestingTask.lang("uk");

    it("should have uk set as current language", () => {
      expect(unitTestingTask.lang()).toBe("uk");
    });
  });

  describe("should have correct translation for the following format", () => {
    const mockedDate =
      "Mon Jan 23 2023 05:09:03:0023 GMT+0200 (Eastern European Standard Time)";
    const mockedFormat = "DD-MM-YYYY";

    describe("month formats", () => {
      it.concurrent.each([
        ["MMMM", "січень"],
        ["MMM", "січ"],
        ["dd MMMM", "23 січня"],
      ])("for passed format %s should return %s", (format, expected) => {
        expect(unitTestingTask(format, mockedDate)).toBe(expected);
      });
    });

    describe("weekdays formats", () => {
      it.concurrent.each([
        ["DDD", "понеділок"],
        ["DD", "пн"],
        ["D", "пн"],
      ])("for passed format %s should return %s", (format, expected) => {
        expect(unitTestingTask(format, mockedDate)).toBe(expected);
      });
    });

    describe("time meridiem formats", () => {
      it("should returnt 'HH ночі', if hour is before 4", () => {
        const mockedDateNightTime =
          "Mon Jan 23 2023 02:09:03:0023 GMT+0200 (Eastern European Standard Time)";
        expect(unitTestingTask("HH a", mockedDateNightTime)).toBe("02 ночі");
      });

      it("should returnt 'HH ранку', if hour is between 4 and 12", () => {
        expect(unitTestingTask("HH a", mockedDate)).toBe("05 ранку");
      });

      it("should returnt 'HH дня', if hour is between 12 and 17", () => {
        const mockedDateDayTime =
          "Mon Jan 23 2023 13:09:03:0023 GMT+0200 (Eastern European Standard Time)";
        expect(unitTestingTask("HH a", mockedDateDayTime)).toBe("13 дня");
      });

      it("should returnt 'HH вечора', if hour is between 4 and 12", () => {
        const mockedDateEveningTime =
          "Mon Jan 23 2023 19:09:03:0023 GMT+0200 (Eastern European Standard Time)";
        expect(unitTestingTask("HH a", mockedDateEveningTime)).toBe(
          "19 вечора"
        );
      });
    });
  });
});
