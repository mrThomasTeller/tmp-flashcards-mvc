const readlineSync = require('readline-sync');

class View {
  async chooseTopic(error, topics) {
    console.clear();

    if (error) {
      console.log(error);
      console.log();
    }
    console.log('Выберете тему для игры:');

    const themesText = topics.map(({ title }, i) => `${i + 1}. ${title}`).join('\n');

    console.log(themesText);
    console.log();
    const topicNum = Number(readlineSync.question('Введите номер темы: '));
    return topicNum - 1;
  }

  #renderGameHeader(topicTitle) {
    console.clear();
    console.log(`Тема: ${topicTitle}`);
    console.log();
  }

  askQuestion(question) {
    this.#renderGameHeader();

    console.log(question.question);
    console.log();
    const answer = readlineSync.question('Введите ответ: ');
    return answer;
  }

  showGameQuestionResult(question, answerIsRight) {
    this.#renderGameHeader();

    console.log(question.question);
    console.log();
    if (answerIsRight) {
      console.log('Верно!');
    } else {
      console.log(`Неверно! Правильный ответ: ${question.answer}`);
    }
    console.log();
    console.log('Нажмите любую клавишу для продолжения...');
    readlineSync.question();
  }

  renderResult(gameStatistics) {
    const { rightQuestions, totalQuestions } = gameStatistics;
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
