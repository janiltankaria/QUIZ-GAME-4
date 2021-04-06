(function() {
  var questions = [{
    question: "FOR loop uses a loop index, the type of loop index is _________",
    choices: ["STD_LOGIC_VECTOR", "BIT_VECTOR", "INTEGER", "REAL" , "NONE"],
    correctAnswer: 2
  }, {
    question: "Where do we declare the loop index of a FOR LOOP?",
    choices: ["Entity", "Architecture",  "Library", "It doesn’t have to be declared" , "NONE"],
    
    correctAnswer: 3
  }, {
    question: "A package may consist of _________ design units.",
    choices: [2, 3, 4, 5, 6],
    correctAnswer: 0
  }, {
    question: "For a signal used in sequential assignment, it can have _______ driver(s).",
    choices: [1, 2, 3, 4, 5],
    correctAnswer: 0
  }, {
    question: "Which of the following is not a combinational circuit?",
    choices: [ "Adder", "Code convertor", "Multiplexer",  "Counter", "NONE"],
    correctAnswer: 4
  }];
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var score1 = displayScore();
          var score = displayScore1();
          
          $('#next').hide();
          $('#prev').hide();
          if(score1 > 1){
            quiz.append(score).fadeIn();
            $('#game').show();
            
          }else{
            quiz.append(score).fadeIn();
          $('#start').show();
          }
        }

      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score,numCorrect;
    }
    function displayScore1() {
        var score = $('<p>',{id: 'question'});
        
        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
          if (selections[i] === questions[i].correctAnswer) {
            numCorrect++;
          }
        }
        
        score.append('You got ' + numCorrect + ' questions out of ' +
                     questions.length + ' right!!!');
        return score;
      }
  })();