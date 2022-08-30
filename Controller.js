const Model = require('./Model');
const View = require('./View');

class Controller {
  #model;
  #view;

  constructor() {
    this.#model = new Model();
    this.#view = new View(this.#model);
  }

  async run() {
    const page = this.#model.getPage();
    const model = this.#model;
    const view = this.#view;

    switch (page) {
      case 'chooseTopic': {
        const newTopicIndex = await view.chooseTopic();
        await model.chooseTopic(newTopicIndex);
        return this.run();
      }

      case 'gameQuestion': {
        const answer = view.askQuestion();
        await model.checkAnswer(answer);
        return this.run();
      }

      case 'gameQuestionResult':
        view.showGameQuestionResult();
        model.nextQuestion();
        return this.run();

      case 'result':
        view.renderResult();
        model.newGame();
        return this.run();

      default:
        throw new Error(`Unknown page: ${page}`);
    }
  }
}

module.exports = Controller;
