const { EventEmitter } = require('events');
const readlineSync = require('readline-sync');

class View extends EventEmitter {
  #model;

  constructor(model) {
    super();
    this.#model = model;
    this.#model.on('update', () => this.render());
  }

  render() {
    const page = this.#model.getPage();
    switch (page) {
      case 'chooseTopic':
        this.#renderChooseTopic();
        break;
      case 'gameQuestion':
        this.#renderGameQuestion();
        break;
      case 'gameQuestionResult':
        this.#renderGameQuestionResult();
        break;
      case 'result':
        this.#renderResult();
        break;
      default:
        throw new Error(`Unknown page: ${page}`);
    }
  }

  async #renderChooseTopic() {
    console.clear();

    const error = this.#model.getTopicChooseError();
    if (error) {
      console.log(error);
      console.log();
    }
    console.log('Выберете тему для игры:');

    const topics = await this.#model.getTopics();
    const themesText = topics.map(({ title }, i) => `${i + 1}. ${title}`).join('\n');

    console.log(themesText);
    console.log();
    const topicNum = readlineSync.question('Введите номер темы: ');
    this.emit('userChoseTopicIndex', topicNum - 1);
  }

  #renderGameHeader() {
    console.clear();
    console.log(`Тема: ${this.#model.getTopicTitle()}`);
    console.log();
  }

  #renderGameQuestion() {
    this.#renderGameHeader();

    console.log(this.#model.getCurrentQuestion().question);
    console.log();
    const answer = readlineSync.question('Введите ответ: ');
    this.emit('userAnswered', answer);
  }

  #renderGameQuestionResult() {
    this.#renderGameHeader();

    console.log(this.#model.getCurrentQuestion().question);
    console.log();
    if (this.#model.answerIsRight()) {
      console.log('Верно!');
    } else {
      console.log(`Неверно! Правильный ответ: ${this.#model.getCurrentQuestion().answer}`);
    }
    console.log();
    console.log('Нажмите любую клавишу для продолжения...');
    readlineSync.question();
    this.emit('userRequestedNextQuestion');
  }

  #renderResult() {
    const { rightQuestions, totalQuestions } = this.#model.getGameStatistics();
    console.clear();
    console.log('Вы закончили игру!');
    console.log();
    console.log(`Вы ответили правильно на ${rightQuestions} из ${totalQuestions} вопросов`);
    console.log();
    console.log('Нажмите любую клавишу для продолжения...');
    readlineSync.question();
    this.emit('userRequestedNewGame');
  }
}

module.exports = View;
