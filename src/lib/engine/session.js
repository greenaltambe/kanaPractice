export class Session {
  constructor() {
    this.startTime = Date.now();
    this.totalAnswered = 0;
    this.totalCorrect = 0;
    this.totalWrong = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
    this.kanaMistakes = new Map(); // kana -> mistake count
    this.history = []; // { kana, correct, responseTimeMs, timestamp }
  }

  recordAnswer(kana, isCorrect, responseTimeMs) {
    this.totalAnswered++;
    this.history.push({ kana, isCorrect, responseTimeMs, timestamp: Date.now() });

    if (isCorrect) {
      this.totalCorrect++;
      this.currentStreak++;
      if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
      }
    } else {
      this.totalWrong++;
      this.currentStreak = 0;
      const prev = this.kanaMistakes.get(kana) || 0;
      this.kanaMistakes.set(kana, prev + 1);
    }
  }

  getStats() {
    const durationSeconds = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));
    const accuracy = this.totalAnswered > 0 
      ? Math.round((this.totalCorrect / this.totalAnswered) * 100) 
      : 0;

    // Characters per minute
    const cpm = Math.round((this.totalAnswered / durationSeconds) * 60);

    // Top 3 weakest kana
    const sortedMistakes = Array.from(this.kanaMistakes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([kana, count]) => ({ kana, count }));

    return {
      totalAnswered: this.totalAnswered,
      totalCorrect: this.totalCorrect,
      totalWrong: this.totalWrong,
      currentStreak: this.currentStreak,
      bestStreak: this.bestStreak,
      accuracy,
      cpm,
      durationSeconds,
      weakest: sortedMistakes,
    };
  }

  reset() {
    this.startTime = Date.now();
    this.totalAnswered = 0;
    this.totalCorrect = 0;
    this.totalWrong = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
    this.kanaMistakes.clear();
    this.history = [];
  }
}
