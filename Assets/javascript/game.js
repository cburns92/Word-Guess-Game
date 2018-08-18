var words = ['cat','dog','goat','xylophone','sasquatch','cowboy','hangman','desperado','cattle','saloon'];
      var game = {
        guessed: [],
        attempts: 7,
        wins: 0,
        start: function() {
            this.complete = false;
            this.word = words[Math.floor(Math.random() * words.length)];
            this.$wins = document.getElementById("wins")
            this.$wins.textContent = this.wins;
            this.$right = document.getElementById('selected-word');
            this.$wrong = document.getElementById('incorrect-letters');
            this.$remain = document.getElementById('attempts');
            this.$right.textContent = '_'.repeat(this.word.length);
            this.$remain.textContent = this.attempts;
        },
        guess: function(letter) {
            if (this.attempts > 0 && this.complete != true) {
                if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
                this.right(letter);
                } else {
                this.wrong(letter);
                }
            }
        },
        right: function(letter) {
            for(var i = 0; i < this.word.length; i++) {
                if (this.word[i] == letter) {
                var word = this.$right.textContent.split('');
                word[i] = letter;
                this.$right.textContent = word.join('');
                }
            }
            if (this.$right.textContent.indexOf('_') < 0) {
                alert('You won!');
                this.complete = true;
                this.wins++;
                this.$wins.textContent = this.wins
                this.reset();
            }
        },
        wrong: function(letter) {
            this.guessed.push(letter);
            this.$wrong.textContent += ' ' + letter;
            this.attempts--;
            this.$remain.textContent = this.attempts;
            if (this.attempts < 1) {
                alert('You lost! The word was '+ this.word + '!');
                this.complete = true;
                this.reset();
            }
        },
        reset: function(){
            console.log("reset successful")
            this.complete = false;
            this.word = words[Math.floor(Math.random() * words.length)];
            this.$right.textContent = '_'.repeat(this.word.length);
            this.$remain.textContent = 7;
            this.$wrong.textContent = "";
            this.guessed = [];
        }
      };

      game.start();
      document.onkeyup = function(event) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        game.guess(letter);
      };

      
