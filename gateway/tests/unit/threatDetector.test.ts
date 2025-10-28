import { threatDetector } from '../../src/middleware/threatDetector';

describe('Threat Detector', () => {
  const testCases = [
    {
      input: { body: "SELECT * FROM users", method: "POST" },
      expectedScore: 70,
      description: "SQL Injection detected"
    },
    {
      input: { body: "<script>alert('XSS')</script>", method: "POST" },
      expectedScore: 60,
      description: "XSS attack detected"
    },
    {
      input: { body: "normal request", method: "GET" },
      expectedScore: 0,
      description: "No threat detected"
    },
    {
      input: { body: "A".repeat(1001), method: "POST" },
      expectedScore: 30,
      description: "Large payload detected"
    },
    {
      input: { body: "login", method: "POST" },
      expectedScore: 0,
      description: "Normal login request"
    }
  ];

  testCases.forEach(({ input, expectedScore, description }) => {
    test(`should return a threat score of ${expectedScore} for ${description}`, () => {
      const score = threatDetector(input);
      expect(score).toBe(expectedScore);
    });
  });
});