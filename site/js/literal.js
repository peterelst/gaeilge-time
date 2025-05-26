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
        0: "dó dhéag", 1: "haon", 2: "dó", 3: "trí", 4: "ceathair",
        5: "cúig", 6: "sé", 7: "seacht", 8: "hocht", 9: "naoi",
        10: "deich", 11: "haon déag", 12: "dó dhéag"
      };
      return hours[h % 12];
    };

    const minuteToIrishPhrase = (m) => {
      const base = {
        1: "haon", 2: "dó", 3: "trí", 4: "ceathair", 5: "cúig",
        6: "sé", 7: "seacht", 8: "hocht", 9: "naoi", 10: "deich",
        11: "haon déag", 12: "dó dhéag", 13: "trí déag", 14: "ceathair déag",
        15: "cúig déag", 16: "sé déag", 17: "seacht déag",
        18: "hocht déag", 19: "naoi déag", 20: "fiche", 30: "tríocha"
      };
      const fused = {
        21: "fiche is a haon", 22: "fiche is a dó", 23: "fiche is a trí", 24: "fiche is a ceathair",
        25: "fiche is a cúig", 26: "fiche is a sé", 27: "fiche is a seacht", 28: "fiche is a hocht",
        29: "fiche is a naoi", 31: "tríocha is a haon", 32: "tríocha is a dó", 33: "tríocha is a trí",
        34: "tríocha is a ceathair", 35: "tríocha is a cúig", 36: "tríocha is a sé",
        37: "tríocha is a seacht", 38: "tríocha is a hocht", 39: "tríocha is a naoi"
      };
      if (m === 1) {
        return "haon nóiméad";
      } else if (m <= 20 || m === 30) {
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
        if (minute === 15) {
          const irish = `Tá sé ceathrú tar éis a ${irishHour(hour)}`;
          map[irish] = `It is quarter past ${englishHour(hour)}`;
        } else {
          const irish = `Tá sé ${minuteToIrishPhrase(minute)} tar éis a ${irishHour(hour)}`;
          const english = `It is ${englishNumber(minute)} minute${minute > 1 ? 's' : ''} past ${englishHour(hour)}`;
          map[irish] = english;
        }
      }

      const halfPastPhrase = `Tá sé leathuair tar éis a ${irishHour(hour)}`;
      map[halfPastPhrase] = `It is half past ${englishHour(hour)}`;

      for (let minute = 31; minute < 60; minute++) {
        const toMinute = 60 - minute;
        const nextHour = (hour + 1) % 12;
        if (toMinute === 15) {
          const irish = `Tá sé ceathrú chun a ${irishHour(nextHour)}`;
          map[irish] = `It is quarter to ${englishHour(nextHour)}`;
        } else {
          const irish = `Tá sé ${minuteToIrishPhrase(toMinute)} chun a ${irishHour(nextHour)}`;
          const english = `It is ${englishNumber(toMinute)} minute${toMinute > 1 ? 's' : ''} to ${englishHour(nextHour)}`;
          map[irish] = english;
        }
      }
    }
    return map;
  }

  const timeMap = generateTimeMap();
  return timeMap[irishPhrase] || 'Translation not found';
}
