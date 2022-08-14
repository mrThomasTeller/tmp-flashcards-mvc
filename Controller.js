const Model = require('./Model');
const View = require('./View');

class Controller {
  #model;
  #view;

  constructor() {
    this.#model = new Model({
      onUpdate: () => this.#view.render(),
    });

    this.#view = new View(this.#model, {
      onUserChoseTopicIndex: (topicIndex) => this.#model.chooseTopic(topicIndex),
      onUserAnswered: (answer) => this.#model.checkAnswer(answer),
      onUserRequestedNextQuestion: () => this.#model.nextQuestion(),
      onUserRequestedNewGame: () => this.#model.newGame(),
    });
  }

  run() {
    this.#view.render();
  }
}

module.exports = Controller;
