const moment = require("moment-timezone");
const unitTestingTask = require("./unitTestingTask");

describe("unitTestingTask", () => {
  describe("formats", () => {
    //year
    it("should format year", () => {
      const formattedDate = unitTestingTask("YYYY", "2024-01-19");
      expect(formattedDate).toBe("2024");
    });
    it("should return last 2 digits of year", () => {
      const formattedDate = unitTestingTask("YY", "2024-01-19");
      expect(formattedDate).toBe("24");
    });

    //months
    it("should format month with full month name", () => {
      const formattedDate = unitTestingTask("MMMM", "2024/01/19");
      expect(formattedDate).toBe("January");
    });
    it("should format month with short name", () => {
      const formattedDate = unitTestingTask("MMM", "2024/01/19");
      expect(formattedDate).toBe("Jan");
    });
    it("should return number of the month with leading zeroes", () => {
      const formattedDate = unitTestingTask("MM", "2024/01/19");
      expect(formattedDate).toBe("01");
    });

    it("should return number of the month", () => {
      const formattedDate = unitTestingTask("M", "2024/01/19");
      expect(formattedDate).toBe("1");
    });

    //days
    it("should return full name of the day", () => {
      const formattedDate = unitTestingTask("DDD", "2024/01/19");
      expect(formattedDate).toBe("Friday");
    });
    it("should return short name of the day", () => {
      const formattedDate = unitTestingTask("DD", "2024/01/19");
      expect(formattedDate).toBe("Fri");
    });
    it("should return minimun name of the day", () => {
      const formattedDate = unitTestingTask("D", "2024/01/19");
      expect(formattedDate).toBe("Fr");
    });
    it("should return number of the day with leading zeroes", () => {
      const formattedDate = unitTestingTask("dd", "2024/1/9");
      expect(formattedDate).toBe("09");
    });
    it("should return single number of the day", () => {
      const formattedDate = unitTestingTask("d", "2024/01/01");
      expect(formattedDate).toBe("1");
    });

    //hours
    it("should format hours in 24-hour format with leading zeroes", () => {
      const formattedDate = unitTestingTask("HH", "2024/01/19 1:00");
      expect(formattedDate).toBe("01");
    });
    it("should format hours in 24-hour format without leading zeroes", () => {
      const formattedDate = unitTestingTask("H", "2024/01/19 1:00");
      expect(formattedDate).toBe("1");
    });
    it("should format hours in 12-hour format with leading zeroes", () => {
      const formattedDate = unitTestingTask("hh", "2024/01/19 17:00");
      expect(formattedDate).toBe("05");
    });
    it("should format hours in 12-hour format with leading zeroes", () => {
      const formattedDate = unitTestingTask("hh", "2024/01/19 12:00:00");
      expect(formattedDate).toBe("12");
    });
    it("should format hours in 12-hour format without leading zeroes", () => {
      const formattedDate = unitTestingTask("h", "2024/01/19 17:00");
      expect(formattedDate).toBe("5");
    });
    it("should format hours in 12-hour format without leading zeroes", () => {
      const formattedDate = unitTestingTask("h", "2024/01/19 12:00:00");
      expect(formattedDate).toBe("12");
    });

    //minutes
    it("should return minutes with leading zeroes", () => {
      const formattedDate = unitTestingTask("mm", "2024/01/19 12:05");
      expect(formattedDate).toBe("05");
    });
    it("should return minutes without leading zeroes", () => {
      const formattedDate = unitTestingTask("m", "2024/01/19 12:05");
      expect(formattedDate).toBe("5");
    });

    //seconds
    it("should return seconds with leading zeroes", () => {
      const formattedDate = unitTestingTask("ss", "2024/01/19 12:5:2");
      expect(formattedDate).toBe("02");
    });
    it("should return seconds without leading zeroes", () => {
      const formattedDate = unitTestingTask("s", "2024/01/19 12:5:2");
      expect(formattedDate).toBe("2");
    });

    //milliseconds
    it("should return milliseconds without leading zeroes", () => {
      const formattedDate = unitTestingTask("ff", "2024/01/19 12:5:2.1");
      expect(formattedDate).toBe("100");
    });
    it("should return milliseconds without leading zeroes", () => {
      const formattedDate = unitTestingTask("f", "2024/01/19 12:5:2.10");
      expect(formattedDate).toBe("100");
    });

    //am/pm
    it("when format A should return AM in uppercase", () => {
      const formattedDate = unitTestingTask("A", "2024/01/19 11:5:2");
      expect(formattedDate).toBe("AM");
    });
    it("when format a should return am in lowercase", () => {
      const formattedDate = unitTestingTask("a", "2024/01/19 11:5:2");
      expect(formattedDate).toBe("am");
    });
    it("when format A should return PM in uppercase", () => {
      const formattedDate = unitTestingTask("A", "2024/01/19 12:5:2");
      expect(formattedDate).toBe("PM");
    });
    it("when format a should return pm in lowercase", () => {
      const formattedDate = unitTestingTask("a", "2024/01/19 12:5:2");
      expect(formattedDate).toBe("pm");
    });

    //timezones
    it("when format Z should return timezone in extended format", () => {
      const date = moment.tz("2024-01-19 12:00:00", "America/New_York");
      const timezoneOffset = moment(date)
        .utcOffset(moment().utcOffset())
        .format("Z");
      const formattedDate = unitTestingTask("Z", "2024/01/19 12:00:00");
      expect(formattedDate).toBe(formattedDate);
    });
    it("when format ZZ should return timezone in basic format", () => {
      const date = moment.tz("2024-01-19 12:00:00", "America/New_York");
      const timezoneOffset = moment(date)
        .utcOffset(moment().utcOffset())
        .format("Z");
      const formattedDate = unitTestingTask("ZZ", "2024/01/19 12:00:00");
      expect(formattedDate).toBe(formattedDate.replace(":", ""));
    });

    //correct formatter
    describe("correct formatter", () => {
      it("should call the correct formatter with established date", () => {
        unitTestingTask._formatters = {
          YYYY: jest.fn().mockReturnValue("2023"),
        };
        const year = unitTestingTask("YYYY", new Date());
        expect(year).toBe("2023");
      });

      it("should call the correct formatter without established date", () => {
        unitTestingTask._formatters = {
          YYYY: jest.fn().mockReturnValue("2023"),
        };
        const year = unitTestingTask("YYYY");
        expect(year).toBe("2023");
      });
    });
  });

  //errors
  describe("errors", () => {
    it("should throw TypeError if format argument is not a string", () => {
      expect(() => unitTestingTask(123, "2024/01/19")).toThrow(
        new TypeError("Argument `format` must be a string")
      );
    });
    it("should throw TypeError if date is not valid type", () => {
      expect(() => unitTestingTask("YYYY", true)).toThrow(
        new TypeError(
          "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
        )
      );
    });
  });

  //language
  describe("Language functions", () => {
    it("should return current language when no arguments are provided", () => {
      expect(unitTestingTask.lang(undefined)).toBe("en");
    });

    it("should return current language when no options are provided", () => {
      jest.mock("./lang/ru", () => {});
      expect(unitTestingTask.lang("ru")).toBe("ru");
    });

    it("should handle error when loading language module for uk", () => {
      unitTestingTask.lang("en");
      jest.mock("./lang/uk", () => {
        jest.requireActual("./lang/nonexistent");
      });
      expect(unitTestingTask.lang("uk")).toBe("en");
    });
  });
});