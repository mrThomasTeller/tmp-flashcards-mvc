const readlineSync = require('readline-sync');

class View {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async chooseTopic() {
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
    const topicNum = Number(readlineSync.question('Введите номер темы: '));
    return topicNum - 1;
  }

  #renderGameHeader() {
    console.clear();
    console.log(`Тема: ${this.#model.getTopicTitle()}`);
    console.log();
  }

  askQuestion() {
    this.#renderGameHeader();

    console.log(this.#model.getCurrentQuestion().question);
    console.log();
    const answer = readlineSync.question('Введите ответ: ');
    return answer;
  }

  showGameQuestionResult() {
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
  }

  renderResult() {
    const { rightQuestions, totalQuestions } = this.#model.getGameStatistics();
    console.clear();
    console.log('Вы закончили игру!');
    console.log();
    console.log(`Вы ответили правильно на ${rightQuestions} из ${totalQuestions} вопросов`);
    console.log();
    console.log('Нажмите любую клавишу для продолжения...');
    readlineSync.question();
  }
}

module.exports = View;
