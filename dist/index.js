"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIrishTimePhrase = getIrishTimePhrase;
function getIrishTimePhrase(date = new Date()) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const nextHour = (hour + 1) % 24;
    const getFormattedHour = (h) => {
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        const hoursMap = {
            12: "a dó dhéag",
            1: "a haon",
            2: "a dó",
            3: "a trí",
            4: "a ceathair",
            5: "a cúig",
            6: "a sé",
            7: "a seacht",
            8: "a hocht",
            9: "a naoi",
            10: "a deich",
            11: "a haon déag",
        };
        return hoursMap[displayHour];
    };
    const getFormattedMinutePhrase = (m) => {
        let phrase;
        if (m === 1) {
            phrase = "aon nóiméad";
        }
        else if (m === 2) {
            phrase = "dhá nóiméad";
        }
        else if (m === 3) {
            phrase = "trí nóiméad";
        }
        else if (m === 4) {
            phrase = "ceithre nóiméad";
        }
        else if (m >= 5 && m <= 14) {
            const numbersMap = {
                5: "cúig",
                6: "sé",
                7: "seacht",
                8: "ocht",
                9: "naoi",
                10: "deich",
                11: "aon déag",
                12: "dó dhéag",
                13: "trí déag",
                14: "ceithre déag",
            };
            phrase = `${numbersMap[m]} nóiméad`;
        }
        else if (m >= 16 && m <= 19) {
            const numbersMap = {
                16: "sé déag",
                17: "seacht déag",
                18: "ocht déag",
                19: "naoi déag",
            };
            phrase = `${numbersMap[m]} nóiméad`;
        }
        else if (m === 20) {
            phrase = "fiche nóiméad";
        }
        else if (m >= 21 && m <= 29) {
            const unit = m % 10;
            let unitPhrase;
            if (unit === 1)
                unitPhrase = "aon";
            else if (unit === 2)
                unitPhrase = "dhá";
            else if (unit === 3)
                unitPhrase = "trí";
            else if (unit === 4)
                unitPhrase = "ceithre";
            else if (unit === 5)
                unitPhrase = "cúig";
            else if (unit === 6)
                unitPhrase = "sé";
            else if (unit === 7)
                unitPhrase = "seacht";
            else if (unit === 8)
                unitPhrase = "ocht";
            else
                unitPhrase = "naoi";
            phrase = `fiche is ${unitPhrase} nóiméad`;
        }
        else {
            phrase = "";
        }
        return phrase;
    };
    const getFormattedNextHour = (h) => {
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        const hoursMap = {
            12: "a dó dhéag",
            1: "a h-aon",
            2: "a dó",
            3: "a trí",
            4: "a ceathair",
            5: "a cúig",
            6: "a sé",
            7: "a seacht",
            8: "a hocht",
            9: "a naoi",
            10: "a deich",
            11: "a haon déag",
        };
        return hoursMap[displayHour];
    };
    if (minute === 0) {
        return `Tá sé ${getFormattedHour(hour)} an chloig`;
    }
    else if (minute === 15) {
        return `Tá sé ceathrú tar éis ${getFormattedHour(hour)}`;
    }
    else if (minute === 30) {
        return `Tá sé leathuair tar éis ${getFormattedHour(hour)}`;
    }
    else if (minute === 45) {
        return `Tá sé ceathrú chun ${getFormattedNextHour(nextHour)}`;
    }
    else if (minute < 30) {
        return `Tá sé ${getFormattedMinutePhrase(minute)} tar éis ${getFormattedHour(hour)}`;
    }
    else {
        const toMinute = 60 - minute;
        return `Tá sé ${getFormattedMinutePhrase(toMinute)} chun ${getFormattedNextHour(nextHour)}`;
    }
}
