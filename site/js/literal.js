export function getEnglishTimePhrase(date = new Date()) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const nextHour = (hour + 1) % 24;
  const englishHour = (h) => {
    const hours = {
      0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four",
      5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
      10: "ten", 11: "eleven", 12: "twelve"
    };
    return hours[h % 12];
  };
  const minuteToEnglishPhrase = (m) => {
    const base = {
      1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
      7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
      12: "twelve", 13: "thirteen", 14: "fourteen",
      15: "fifteen", 16: "sixteen", 17: "seventeen",
      18: "eighteen", 19: "nineteen", 20: "twenty", 30: "thirty"
    };
    const fused = {
      21: "twenty-one", 22: "twenty-two", 23: "twenty-three", 24: "twenty-four", 25: "twenty-five",
      26: "twenty-six", 27: "twenty-seven", 28: "twenty-eight", 29: "twenty-nine",
      31: "thirty-one", 32: "thirty-two", 33: "thirty-three", 34: "thirty-four",
      35: "thirty-five", 36: "thirty-six", 37: "thirty-seven",
      38: "thirty-eight", 39: "thirty-nine"
    };
    if (m <= 20 || m === 30) {
      return `${base[m]} minutes`;
    } else if (fused[m]) {
      return `${fused[m]} minutes`;
    } else {
      return `${m} minutes`;
    }
  };
  if (minute === 0) {
    return `It is ${englishHour(hour)} o'clock`;
  } else if (minute === 30) {
    return `It is half past ${englishHour(hour)}`;
  } else if (minute < 30) {
    return `It is ${minuteToEnglishPhrase(minute)} past ${englishHour(hour)}`;
  } else {
    const toMinute = 60 - minute;
    return `It is ${minuteToEnglishPhrase(toMinute)} to ${englishHour(nextHour)}`;
  }
}

export function getLiteralTranslation(irishPhrase) {
  function generateTimeMap() {
    const map = {};
    const englishHour = (h) => {
      const hours = {
        0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four",
        5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
        10: "ten", 11: "eleven", 12: "twelve"
      };
      return hours[h % 12];
    };
    const englishNumber = (m) => {
      const base = {
        1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
        7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
        12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
        16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen",
        20: "twenty", 30: "thirty"
      };
      const fused = {
        21: "twenty-one", 22: "twenty-two", 23: "twenty-three", 24: "twenty-four",
        25: "twenty-five", 26: "twenty-six", 27: "twenty-seven", 28: "twenty-eight",
        29: "twenty-nine", 31: "thirty-one", 32: "thirty-two", 33: "thirty-three",
        34: "thirty-four", 35: "thirty-five", 36: "thirty-six", 37: "thirty-seven",
        38: "thirty-eight", 39: "thirty-nine"
      };
      if (m <= 20 || m === 30) {
        return base[m];
      } else if (fused[m]) {
        return fused[m];
      } else {
        return m.toString();
      }
    };
    const irishHour = (h) => {
      const hours = {
        0: "dhá dhéag", 1: "haon", 2: "dó", 3: "trí", 4: "ceathair",
        5: "cúig", 6: "sé", 7: "seacht", 8: "hocht", 9: "naoi",
        10: "deich", 11: "haon déag", 12: "dhá dhéag"
      };
      return hours[h % 12];
    };
    const minuteToIrishPhrase = (m) => {
      const base = {
        1: "aon", 2: "dhá", 3: "trí", 4: "ceithre", 5: "cúig", 6: "sé",
        7: "seacht", 8: "ocht", 9: "naoi", 10: "deich", 11: "a haon déag",
        12: "a dó dhéag", 13: "a trí déag", 14: "a ceathair déag",
        15: "a cúig déag", 16: "a sé déag", 17: "a seacht déag",
        18: "a ocht déag", 19: "a naoi déag", 20: "fiche", 30: "tríocha"
      };
      const fused = {
        21: "fiche haon", 22: "fiche dó", 23: "fiche trí", 24: "fiche ceathair",
        25: "fiche cúig", 26: "fiche sé", 27: "fiche seacht", 28: "fiche ocht",
        29: "fiche naoi", 31: "tríocha haon", 32: "tríocha dó", 33: "tríocha trí",
        34: "tríocha ceathair", 35: "tríocha cúig", 36: "tríocha sé",
        37: "tríocha seacht", 38: "tríocha ocht", 39: "tríocha naoi"
      };
      if (m <= 20 || m === 30) {
        return `${base[m]} nóiméad`;
      } else if (fused[m]) {
        return `${fused[m]} nóiméad`;
      } else {
        return `${m} nóiméad`;
      }
    };
    for (let hour = 0; hour < 12; hour++) {
      const irishPhrase = `Tá sé a ${irishHour(hour)} a chlog`;
      map[irishPhrase] = `It is ${englishHour(hour)} o'clock`;
      for (let minute = 1; minute < 30; minute++) {
        const irishPhrase = `Tá sé ${minuteToIrishPhrase(minute)} tar éis a ${irishHour(hour)}`;
        map[irishPhrase] = `It is ${englishNumber(minute)} minute${minute !== 1 ? 's' : ''} past ${englishHour(hour)}`;
      }
      const halfPastPhrase = `Tá sé leathuair tar éis a ${irishHour(hour)}`;
      map[halfPastPhrase] = `It is half past ${englishHour(hour)}`;
      for (let minute = 31; minute < 60; minute++) {
        const toMinute = 60 - minute;
        const nextHour = (hour + 1) % 12;
        const irishPhrase = `Tá sé ${minuteToIrishPhrase(toMinute)} chun a ${irishHour(nextHour)}`;
        map[irishPhrase] = `It is ${englishNumber(toMinute)} minute${toMinute !== 1 ? 's' : ''} to ${englishHour(nextHour)}`;
      }
    }
    return map;
  }
  const timeMap = generateTimeMap();
  return timeMap[irishPhrase] || 'Translation not found';
}
