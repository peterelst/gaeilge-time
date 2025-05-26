export function getLiteralTranslation(date) {
  if (!(date instanceof Date)) {
    const possibleDate = new Date(date);
    if (!isNaN(possibleDate.getTime())) {
      date = possibleDate;
    } else {
      console.error("Invalid date object provided to getLiteralTranslation:", date);
      return "Error: Invalid date input";
    }
  }

  const hour = date.getHours();
  const minute = date.getMinutes();
  const nextHour = (hour + 1) % 24;

  const getEnglishNumberWord = (num) => {
    switch (num) {
      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";
      case 5: return "five";
      case 6: return "six";
      case 7: return "seven";
      case 8: return "eight";
      case 9: return "nine";
      case 10: return "ten";
      case 11: return "eleven";
      case 12: return "twelve";
      case 13: return "thirteen";
      case 14: return "fourteen";
      case 15: return "fifteen";
      case 16: return "sixteen";
      case 17: return "seventeen";
      case 18: return "eighteen";
      case 19: return "nineteen";
      case 20: return "twenty";
      case 21: return "twenty-one";
      case 22: return "twenty-two";
      case 23: return "twenty-three";
      case 24: return "twenty-four";
      case 25: return "twenty-five";
      case 26: return "twenty-six";
      case 27: return "twenty-seven";
      case 28: return "twenty-eight";
      case 29: return "twenty-nine";
      case 30: return "thirty";
      case 31: return "thirty-one";
      case 32: return "thirty-two";
      case 33: return "thirty-three";
      case 34: return "thirty-four";
      case 35: return "thirty-five";
      case 36: return "thirty-six";
      case 37: return "thirty-seven";
      case 38: return "thirty-eight";
      case 39: return "thirty-nine";
      case 40: return "forty";
      case 41: return "forty-one";
      case 42: return "forty-two";
      case 43: return "forty-three";
      case 44: return "forty-four";
      case 46: return "forty-six";
      case 47: return "forty-seven";
      case 48: return "forty-eight";
      case 49: return "forty-nine";
      case 50: return "fifty";
      case 51: return "fifty-one";
      case 52: return "fifty-two";
      case 53: return "fifty-three";
      case 54: return "fifty-four";
      case 55: return "fifty-five";
      case 56: return "fifty-six";
      case 57: return "fifty-seven";
      case 58: return "fifty-eight";
      case 59: return "fifty-nine";
      default: return num.toString();
    }
  };

  const getEnglishHourWord = (h) => {
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    switch (displayHour) {
      case 12: return "twelve";
      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";
      case 5: return "five";
      case 6: return "six";
      case 7: return "seven";
      case 8: return "eight";
      case 9: return "nine";
      case 10: return "ten";
      case 11: return "eleven";
      default: return displayHour.toString();
    }
  };

  const currentHourEnglish = getEnglishHourWord(hour);
  const nextHourEnglish = getEnglishHourWord(nextHour);

  if (minute === 0) {
    return `It is ${currentHourEnglish} o'clock`;
  } else if (minute === 15) {
    return `It is quarter past ${currentHourEnglish}`;
  } else if (minute === 30) {
    return `It is half past ${currentHourEnglish}`;
  } else if (minute === 45) {
    return `It is quarter to ${nextHourEnglish}`;
  } else if (minute < 30) {
    const englishMinutes = getEnglishNumberWord(minute);
    const minuteText = (minute === 1) ? "minute" : "minutes";
    return `It is ${englishMinutes} ${minuteText} past ${currentHourEnglish}`;
  } else {
    const minutesToNextHour = 60 - minute;
    const englishMinutes = getEnglishNumberWord(minutesToNextHour);
    const minuteText = (minutesToNextHour === 1) ? "minute" : "minutes";
    return `It is ${englishMinutes} ${minuteText} to ${nextHourEnglish}`;
  }
}
