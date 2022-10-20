class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  async run() {
    const page = this.#model.getPage();
    const model = this.#model;
    const view = this.#view;

    switch (page) {
      case 'chooseTopic': {
        const newTopicIndex = await view.chooseTopic(
          model.getTopicChooseError(),
          await model.getTopics()
        );
        await model.chooseTopic(newTopicIndex);
        return this.run();
      }

      case 'gameQuestion': {
        const answer = view.askQuestion(model.getCurrentQuestion());
        await model.checkAnswer(answer);
        return this.run();
      }

      case 'gameQuestionResult':
        view.showGameQuestionResult(model.getCurrentQuestion(), model.answerIsRight());
        model.nextQuestion();
        return this.run();

      case 'result':
        view.renderResult(model.getGameStatistics());
        model.newGame();
        return this.run();

      default:
        throw new Error(`Unknown page: ${page}`);
    }
  }
}

module.exports = Controller;
