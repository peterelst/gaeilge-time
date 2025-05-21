import { getIrishTimePhrase } from '../../src/index';

interface TestCase {
  input: string;
  expected: string;
}

describe('Irish Time Phrase', () => {
  describe('with specific dates', () => {
    const testCases: TestCase[] = [
      // Exact hours
      { input: '2025-05-21T00:00:00', expected: 'Tá sé a dhá dhéag a chlog' },
      { input: '2025-05-21T12:00:00', expected: 'Tá sé a dhá dhéag a chlog' },

      // Just past the hour
      { input: '2025-05-21T00:01:00', expected: 'Tá sé aon nóiméad tar éis a dhá dhéag' },
      { input: '2025-05-21T12:01:00', expected: 'Tá sé aon nóiméad tar éis a dhá dhéag' },
      { input: '2025-05-21T01:02:00', expected: 'Tá sé dhá nóiméad tar éis a haon' },

      // Quarter past & to
      { input: '2025-05-21T04:15:00', expected: 'Tá sé a cúig déag nóiméad tar éis a ceathair' },
      { input: '2025-05-21T05:45:00', expected: 'Tá sé a cúig déag nóiméad chun a sé' },
      { input: '2025-05-21T11:45:00', expected: 'Tá sé a cúig déag nóiméad chun a dhá dhéag' },
      { input: '2025-05-21T23:45:00', expected: 'Tá sé a cúig déag nóiméad chun a dhá dhéag' },

      // Half past
      { input: '2025-05-21T03:30:00', expected: 'Tá sé leathuair tar éis a trí' },

      // Before and after "to" switch
      { input: '2025-05-21T06:29:00', expected: 'Tá sé fiche naoi nóiméad tar éis a sé' },
      { input: '2025-05-21T06:31:00', expected: 'Tá sé fiche naoi nóiméad chun a seacht' },

      // Fused compound minute forms
      { input: '2025-05-21T07:26:00', expected: 'Tá sé fiche sé nóiméad tar éis a seacht' },
      { input: '2025-05-21T13:21:00', expected: 'Tá sé fiche haon nóiméad tar éis a haon' },

      // Correct "to" logic
      { input: '2025-05-21T22:38:00', expected: 'Tá sé fiche dó nóiméad chun a haon déag' },
      { input: '2025-05-21T23:59:00', expected: 'Tá sé aon nóiméad chun a dhá dhéag' }
    ];

    test.each(testCases)('formats time correctly for $input', ({ input, expected }) => {
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
