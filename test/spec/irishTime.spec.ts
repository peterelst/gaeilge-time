import { getIrishTimePhrase } from '../../src/index';

interface TestCase {
  input: string;
  expected: string;
}

describe('Irish Time Phrase', () => {
  describe('with specific dates', () => {
    const testCases: TestCase[] = [
      { input: '2025-05-21T00:00:00', expected: 'Tá sé a dó dhéag an chloig' },
      { input: '2025-05-21T12:00:00', expected: 'Tá sé a dó dhéag an chloig' },
      { input: '2025-05-21T01:00:00', expected: 'Tá sé a haon an chloig' },
      { input: '2025-05-21T02:00:00', expected: 'Tá sé a dó an chloig' },
      { input: '2025-05-21T03:00:00', expected: 'Tá sé a trí an chloig' },
      { input: '2025-05-21T04:00:00', expected: 'Tá sé a ceathair an chloig' },
      { input: '2025-05-21T05:00:00', expected: 'Tá sé a cúig an chloig' },
      { input: '2025-05-21T06:00:00', expected: 'Tá sé a sé an chloig' },
      { input: '2025-05-21T07:00:00', expected: 'Tá sé a seacht an chloig' },
      { input: '2025-05-21T08:00:00', expected: 'Tá sé a hocht an chloig' },
      { input: '2025-05-21T09:00:00', expected: 'Tá sé a naoi an chloig' },
      { input: '2025-05-21T10:00:00', expected: 'Tá sé a deich an chloig' },
      { input: '2025-05-21T11:00:00', expected: 'Tá sé a haon déag an chloig' },

      { input: '2025-05-21T00:01:00', expected: 'Tá sé aon nóiméad tar éis a dó dhéag' },
      { input: '2025-05-21T12:01:00', expected: 'Tá sé aon nóiméad tar éis a dó dhéag' },
      { input: '2025-05-21T01:02:00', expected: 'Tá sé dhá nóiméad tar éis a haon' },
      { input: '2025-05-21T01:03:00', expected: 'Tá sé trí nóiméad tar éis a haon' },
      { input: '2025-05-21T01:04:00', expected: 'Tá sé ceithre nóiméad tar éis a haon' },
      { input: '2025-05-21T01:05:00', expected: 'Tá sé cúig nóiméad tar éis a haon' },
      { input: '2025-05-21T01:06:00', expected: 'Tá sé sé nóiméad tar éis a haon' },
      { input: '2025-05-21T01:07:00', expected: 'Tá sé seacht nóiméad tar éis a haon' },
      { input: '2025-05-21T01:08:00', expected: 'Tá sé ocht nóiméad tar éis a haon' },
      { input: '2025-05-21T01:09:00', expected: 'Tá sé naoi nóiméad tar éis a haon' },
      { input: '2025-05-21T01:10:00', expected: 'Tá sé deich nóiméad tar éis a haon' },
      { input: '2025-05-21T01:11:00', expected: 'Tá sé aon déag nóiméad tar éis a haon' },
      { input: '2025-05-21T01:12:00', expected: 'Tá sé dó dhéag nóiméad tar éis a haon' },

      { input: '2025-05-21T02:13:00', expected: 'Tá sé trí déag nóiméad tar éis a dó' },
      { input: '2025-05-21T02:14:00', expected: 'Tá sé ceithre déag nóiméad tar éis a dó' },
      { input: '2025-05-21T02:16:00', expected: 'Tá sé sé déag nóiméad tar éis a dó' },
      { input: '2025-05-21T02:17:00', expected: 'Tá sé seacht déag nóiméad tar éis a dó' },
      { input: '2025-05-21T02:18:00', expected: 'Tá sé ocht déag nóiméad tar éis a dó' },
      { input: '2025-05-21T02:19:00', expected: 'Tá sé naoi déag nóiméad tar éis a dó' },

      { input: '2025-05-21T02:20:00', expected: 'Tá sé fiche nóiméad tar éis a dó' },
      { input: '2025-05-21T07:21:00', expected: 'Tá sé fiche is aon nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:22:00', expected: 'Tá sé fiche is dhá nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:23:00', expected: 'Tá sé fiche is trí nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:24:00', expected: 'Tá sé fiche is ceithre nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:25:00', expected: 'Tá sé fiche is cúig nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:26:00', expected: 'Tá sé fiche is sé nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:27:00', expected: 'Tá sé fiche is seacht nóiméad tar éis a seacht' },
      { input: '2025-05-21T07:28:00', expected: 'Tá sé fiche is ocht nóiméad tar éis a seacht' },
      { input: '2025-05-21T06:29:00', expected: 'Tá sé fiche is naoi nóiméad tar éis a sé' },

      { input: '2025-05-21T04:15:00', expected: 'Tá sé ceathrú tar éis a ceathair' },
      { input: '2025-05-21T05:45:00', expected: 'Tá sé ceathrú chun a sé' },
      { input: '2025-05-21T11:45:00', expected: 'Tá sé ceathrú chun a dó dhéag' },
      { input: '2025-05-21T23:45:00', expected: 'Tá sé ceathrú chun a dó dhéag' },

      { input: '2025-05-21T03:30:00', expected: 'Tá sé leathuair tar éis a trí' },

      { input: '2025-05-21T06:31:00', expected: 'Tá sé fiche is naoi nóiméad chun a seacht' },
      { input: '2025-05-21T06:32:00', expected: 'Tá sé fiche is ocht nóiméad chun a seacht' },
      { input: '2025-05-21T06:33:00', expected: 'Tá sé fiche is seacht nóiméad chun a seacht' },
      { input: '2025-05-21T06:34:00', expected: 'Tá sé fiche is sé nóiméad chun a seacht' },
      { input: '2025-05-21T06:35:00', expected: 'Tá sé fiche is cúig nóiméad chun a seacht' },
      { input: '2025-05-21T06:36:00', expected: 'Tá sé fiche is ceithre nóiméad chun a seacht' },
      { input: '2025-05-21T06:37:00', expected: 'Tá sé fiche is trí nóiméad chun a seacht' },
      { input: '2025-05-21T22:38:00', expected: 'Tá sé fiche is dhá nóiméad chun a haon déag' },
      { input: '2025-05-21T06:39:00', expected: 'Tá sé fiche is aon nóiméad chun a seacht' },

      { input: '2025-05-21T06:40:00', expected: 'Tá sé fiche nóiméad chun a seacht' },
      { input: '2025-05-21T06:41:00', expected: 'Tá sé naoi déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:42:00', expected: 'Tá sé ocht déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:43:00', expected: 'Tá sé seacht déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:44:00', expected: 'Tá sé sé déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:46:00', expected: 'Tá sé ceithre déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:47:00', expected: 'Tá sé trí déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:48:00', expected: 'Tá sé dó dhéag nóiméad chun a seacht' },
      { input: '2025-05-21T06:49:00', expected: 'Tá sé aon déag nóiméad chun a seacht' },
      { input: '2025-05-21T06:50:00', expected: 'Tá sé deich nóiméad chun a seacht' },
      { input: '2025-05-21T06:51:00', expected: 'Tá sé naoi nóiméad chun a seacht' },
      { input: '2025-05-21T06:52:00', expected: 'Tá sé ocht nóiméad chun a seacht' },
      { input: '2025-05-21T06:53:00', expected: 'Tá sé seacht nóiméad chun a seacht' },
      { input: '2025-05-21T06:54:00', expected: 'Tá sé sé nóiméad chun a seacht' },
      { input: '2025-05-21T06:55:00', expected: 'Tá sé cúig nóiméad chun a seacht' },
      { input: '2025-05-21T06:56:00', expected: 'Tá sé ceithre nóiméad chun a seacht' },
      { input: '2025-05-21T06:57:00', expected: 'Tá sé trí nóiméad chun a seacht' },
      { input: '2025-05-21T06:58:00', expected: 'Tá sé dhá nóiméad chun a seacht' },
      { input: '2025-05-21T23:59:00', expected: 'Tá sé aon nóiméad chun a dó dhéag' }
    ];

    test.each(testCases)('formats time correctly for %s', ({ input, expected }) => {
      const date = new Date(input);
      const result = getIrishTimePhrase(date);
      expect(result).toBe(expected);
    });
  });

  describe('with current time', () => {
    let originalDate: DateConstructor;

    beforeEach(() => {
      originalDate = global.Date;
      const mockDate = new Date('2025-05-21T15:30:00');
      global.Date = class extends Date {
        constructor() {
          super();
          return mockDate;
        }
      } as DateConstructor;
    });

    afterEach(() => {
      global.Date = originalDate;
    });

    test('returns correct phrase for current time when no date is provided', () => {
      const result = getIrishTimePhrase();
      expect(result).toBe('Tá sé leathuair tar éis a trí');
    });
  });
});