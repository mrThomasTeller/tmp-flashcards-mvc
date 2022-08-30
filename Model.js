const fs = require('fs').promises;
const path = require('path');

const pages = {
  chooseTopic: 'chooseTopic',
  gameQuestion: 'gameQuestion',
  gameQuestionResult: 'gameQuestionResult',
  result: 'result',
};

class Model {
  static #getTopicTitle(fileName) {
    return fileName.split('_')[0];
  }

  #page = pages.chooseTopic;
  #topics;
  #topic;
  #topicChooseError;
  #questions;
  #question;
  #questionIndex;
  #answerIsRight;
  #rightQuestions = 0;

  constructor() {
    this.#page = pages.chooseTopic;
  }

  getPage() {
    return this.#page;
  }

  getCurrentQuestion() {
    return this.#question;
  }

  answerIsRight() {
    return this.#answerIsRight;
  }

  getTopicChooseError() {
    return this.#topicChooseError;
  }

  getGameStatistics() {
    return {
      rightQuestions: this.#rightQuestions,
      totalQuestions: this.#questions.length,
    };
  }

  getTopicTitle() {
    return this.#topic.title;
  }

  async getTopics() {
    if (!this.#topics) {
      const filesNames = await fs.readdir(path.join(__dirname, 'topics'));
      this.#topics = filesNames.map((fileName) => ({
        title: Model.#getTopicTitle(fileName),
        fileName,
      }));
    }

    return this.#topics;
  }

  async chooseTopic(topicIndex) {
    const topics = await this.getTopics();
    this.#topic = topics[topicIndex];
    if (!this.#topic) {
      this.#topicChooseError = 'Неправильный номер темы';
      return;
    }

    this.#topicChooseError = undefined;
    this.#page = pages.gameQuestion;
    this.#questions = await this.#getTopicQuestions();
    this.#questionIndex = 0;
    // eslint-disable-next-line prefer-destructuring
    this.#question = this.#questions[this.#questionIndex];
  }

  async checkAnswer(answer) {
    this.#answerIsRight =
      this.#question.answer.toLowerCase().trim() === answer.toLowerCase().trim();

    if (this.#answerIsRight) {
      this.#rightQuestions += 1;
    }

    this.#page = pages.gameQuestionResult;
  }

  nextQuestion() {
    this.#questionIndex += 1;
    if (this.#questionIndex < this.#questions.length) {
      this.#question = this.#questions[this.#questionIndex];
      this.#page = pages.gameQuestion;
    } else {
      this.#page = pages.result;
    }
  }

  newGame() {
    this.#page = pages.chooseTopic;
    this.#rightQuestions = 0;
  }

  async #getTopicQuestions() {
    const questionsData = await fs.readFile(
      path.join(__dirname, 'topics', this.#topic.fileName),
      'utf8'
    );
    const questionsLines = questionsData.split('\n');
    const questions = [];
    for (let i = 0; i < questionsLines.length; i += 3) {
      questions.push({
        question: questionsLines[i],
        answer: questionsLines[i + 1],
      });
    }
    return questions;
  }
}

module.exports = Model;
