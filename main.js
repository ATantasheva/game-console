(function () {
   //конструктор для вопросов

   function QuestionCreate(question, answer, rightAnswer) {
      this.question = question;
      this.answer = answer;
      this.rightAnswer = rightAnswer;
   }
   //метод для показа вопроса с ответами
   //записываем в прототип чтобы все объекты созданные от QuestionCreate могли его использовать
   //он был описан 1 рааз

   QuestionCreate.prototype.displayQuestion = function () {
      console.log('%c' + this.question, 'background: #424242; color:#FAFAFA');
      for (let i = 0; i < this.answer.length; i++) {
         console.log(i + ". " + this.answer[i]);
      }
   };
   //метод для проверки ответа
   QuestionCreate.prototype.checkAnswer = function (answer, callback) {
      let innerscore;
      if (answer === this.rightAnswer) {
         console.log("%c Правильный ответ", 'background: #66BB6A; color:#FAFAFA');
         innerscore = callback(true); //в callback передается keepScore - мы ее прописали в checkanswer 2м аргументом
      } else {
         console.log("%c Неверный ответ", 'background: #ef5350; color:#FAFAFA');
         innerscore = callback(false); //в callback передается keepScore - мы ее прописали в checkanswer 2м аргументом
      }
      //выводим в консоль счет
      this.displayScore(innerscore);
   };
   //метод для вывода счета
   QuestionCreate.prototype.displayScore = function (score) {
      console.log(`%c Ваш счет равен ${score}`, 'background: #FB8C00; color:#FAFAFA');
   }


   const question01 = new QuestionCreate(
      "Кто съел колобка?",
      ["Лиса", "Акула", "Заленился и никуда не покатился"],
      0
   );
   const question02 = new QuestionCreate(
      "Самая молодая галактика во вселенной?",
      ["I Zwicky 18 ", "Андромеда", "Галактика Медвежья лапа"],
      0
   );
   const question03 = new QuestionCreate(
      "Могли бы сейчас жить динозавры?",
      ["Нет ", "Да", "Мы бы были не в курсе - нас съели"],
      0
   );
   const question04 = new QuestionCreate(
      "Будет ли BTC 100тыс USDT?",
      ["Скорее всего(подставьте свое мнение)",
         "Нет",
         "Что такое BTC"],
      0
   );
   //console.log(question01);

   let questionArr = [question01, question02, question03, question04];


   // функция для подсчета прогреса котоая отработав сделает замыкание на себя и к своей внутренней переменной scoreValue 
   function score() {
      let scoreValue = 0;
      //замыкание
      return function (rightAnswer) { //передаем в качестве аргумента rightAnswer)
         if (rightAnswer) {
            scoreValue++;
         }
         return scoreValue;
      }
   }

   let keepScore = score(); //запустили выполнение и рез записали в let


   //чтобы порос поторялся бесконечно все помещаем в функцию nextQuestion()
   function nextQuestion() {
      let n = Math.floor(Math.random() * questionArr.length);

      //console.log(n);
      //в консоль случайн вопрос с вариантами ответов
      questionArr[n].displayQuestion();

      //запрос ответа пользователя
      let answer = prompt("Введите номер верного ответа");

      questionArr[n].checkAnswer(parseInt(answer), keepScore);

      if (answer !== 'exit' && answer !== null) {
         nextQuestion(); // если не равно 'exit' то опять вызываем функцию - рекурсия
      }


   }

   nextQuestion(); // вызываем функцию 1раз
})();


