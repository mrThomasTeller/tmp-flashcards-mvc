const readlineSync = require('readline-sync');

class View {
  chooseTopic(error, topics) {
    console.clear();

    if (error) {
      console.log(error);
      console.log();
    }
    console.log('Выберете тему для игры:');

    const themesText = topics.map(({ title }, i) => `${i + 1}. ${title}`).join('\n');

    console.log(themesText);
    console.log();
    const topicNum = readlineSync.question('Введите номер темы: ');
    return topicNum - 1;
  }

  #renderGameHeader(topicTitle) {
    console.clear();
    console.log(`Тема: ${topicTitle}`);
    console.log();
  }

  askQuestion(topicTitle, currentQuestion) {
    this.#renderGameHeader(topicTitle);

    console.log(currentQuestion.question);
    console.log();
    const answer = readlineSync.question('Введите ответ: ');
    return answer;
  }

  showGameQuestionResult(topicTitle, currentQuestion, isRight) {
    this.#renderGameHeader(topicTitle);

    console.log(currentQuestion.question);
    console.log();
    if (isRight) {
      console.log('Верно!');
    } else {
      console.log(`Неверно! Правильный ответ: ${currentQuestion.answer}`);
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
