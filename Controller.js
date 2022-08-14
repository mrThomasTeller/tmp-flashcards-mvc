class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.on('userChoseTopicIndex', (topicIndex) => this.#model.chooseTopic(topicIndex));
    this.#view.on('userAnswered', (answer) => this.#model.checkAnswer(answer));
    this.#view.on('userRequestedNextQuestion', () => this.#model.nextQuestion());
    this.#view.on('userRequestedNewGame', () => this.#model.newGame());
  }

  run() {
    this.#view.render();
  }
}

module.exports = Controller;
