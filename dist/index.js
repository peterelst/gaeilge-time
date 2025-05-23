"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIrishTimePhrase = getIrishTimePhrase;
function getIrishTimePhrase(date = new Date()) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const nextHour = (hour + 1) % 24;
    const irishHour = (h) => {
        const hours = {
            0: "dhá dhéag", 1: "haon", 2: "dhá", 3: "trí", 4: "ceathair",
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
            21: "fiche is a haon", 22: "fiche is a dó", 23: "fiche is a trí", 24: "fiche is a ceathair",
            25: "fiche is a cúig", 26: "fiche is a sé", 27: "fiche is a seacht", 28: "fiche is a ocht",
            29: "fiche is a naoi", 31: "tríocha is a haon", 32: "tríocha is a dó", 33: "tríocha is a trí",
            34: "tríocha is a ceathair", 35: "tríocha is a cúig", 36: "tríocha is a sé",
            37: "tríocha is a seacht", 38: "tríocha is a ocht", 39: "tríocha is a naoi"
        };
        if (m === 1) {
            return "aon nóiméad amháin";
        }
        else if (m <= 20 || m === 30) {
            return `${base[m]} nóiméad`;
        }
        else if (fused[m]) {
            return `${fused[m]} nóiméad`;
        }
        else {
            return `${m} nóiméad`;
        }
    };
    if (minute === 0) {
        return `Tá sé a ${irishHour(hour)} a chlog`;
    }
    else if (minute === 30) {
        return `Tá sé leathuair tar éis a ${irishHour(hour)}`;
    }
    else if (minute < 30) {
        return `Tá sé ${minuteToIrishPhrase(minute)} tar éis a ${irishHour(hour)}`;
    }
    else {
        const toMinute = 60 - minute;
        return `Tá sé ${minuteToIrishPhrase(toMinute)} chun a ${irishHour(nextHour)}`;
    }
}
