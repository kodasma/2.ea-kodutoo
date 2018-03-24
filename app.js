this.score = 0
this.level = 1
this.guessedWords = 0
/* TYPER */
const TYPER = function () {
  if (TYPER.instance_) {
    return TYPER.instance_
  }
  TYPER.instance_ = this

  this.isReady = false;
  this.routes = TYPER.routes
  this.currentRoute = null

  this.WIDTH = window.innerWidth
  this.HEIGHT = window.innerHeight
  this.canvas = null
  this.ctx = null

  this.words = []
  this.word = null
  this.wordMinLength = 5
  this.guessedWords = 0
  this.playerName = "Unknown"
  console.error()

  this.init()
}

window.TYPER = TYPER

TYPER.routes = {
  'home-view': {
    'render': function() {
      console.log('Home')
    }
  },
  'app-view': {
    'render': function() {
      console.log('App')

      
    }
  },
  'score-view': {
    'render': function() {
      console.log('App')
    }
  }
}

TYPER.prototype = {
  init: function () {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')

    this.canvas.style.width = this.WIDTH + 'px'
    this.canvas.style.height = this.HEIGHT + 'px'

    this.canvas.width = this.WIDTH * 2
    this.canvas.height = this.HEIGHT * 2
    
    this.loadWords()

    window.addEventListener('hashchange', this.routeChange.bind(this))
    var start_button = document.querySelector('#start-button');
    start_button.addEventListener('click', this.setName.bind(this));

    if (!window.location.hash) {
      window.location.hash = 'home-view'
    } else {
      this.routeChange()
    }
  },

  routeChange: function(event) {
    this.currentRoute = location.hash.slice(1)
    if (this.routes[this.currentRoute]) {
      this.updateMenu()

      this.routes[this.currentRoute].render()
    }
  },

  updateMenu: function() {
    document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '')
    document.querySelector('.' + this.currentRoute).className += ' active-menu'
  },

  loadWords: function () {
    const xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.status === 0)) {
        const response = xmlhttp.responseText
        const wordsFromFile = response.split('\n')

        typer.words = structureArrayByWordLength(wordsFromFile)

        //typer.start()
        typer.isReady = true;
      }
    }

    xmlhttp.open('GET', './lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()

    window.addEventListener('keypress', this.keyPressed.bind(this))

    var name = document.querySelector('#name').value;
    this.playerName = name;
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]

    this.word = new Word(wordFromArray, this.canvas, this.ctx)
    level = (parseInt(window.typer.guessedWords / 5) + 1)
  },

  keyPressed: function (event) {
    const letter = String.fromCharCode(event.which)
		if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()
      score+= 1
		  if (this.word.left.length === 0) {
        guessedWords += 1
        this.guessedWords += 1
        this.generateWord()
		  }
		} else {
      score-= 5
    }
    this.word.Draw()
  },
  setName: function(ev) {
    if (!this.isReady) {
      console.log("Still loading...");
      alert("Still loading...");
      return false;
    }
    var name = document.querySelector('#name').value;
    console.log("Name:", name, ev);
    //localStorage.setItem('name', name);
    this.start();
  },
  saveScore: function() {
    var save = {Score: this.score, Name: this.name};
    var scoreboard = localStorage.getItem("scoreboard");
    if (scoreboard === undefined) {
      scoreboard = [];
    } else {
      scoreboard = JSON.parse(scoreboard);
    }

    scoreboard.push(save);
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
  },
  showScoreboard: function() {
    var scoreboard = localStorage.getItem("scoreboard");
    if (scoreboard === undefined) {
      return false; //vaata ise
    }
    scoreboard = JSON.parse(scoreboard);
    
    var makeRow = function (name, score) {
      var node = document.createElement("div");
      node.innerHTML = "<div class='scoreboard-name'>" + name+ "</div>" +
        "<div class='scoreboard-score'>" + score + "</div>";
      return node;
    }

    console.log(scoreboard);
    var node = document.createElement("div");
    for(var i in scoreboard) {
      console.log(scoreboard[i]);
      node.appendChild(makeRow(scoreboard[i].Name, scoreboard[i].Score));
    }
    var score_view = document.querySelector('#score-view');
    score_view.innerHTML = ""; //mida iganes
    score_view.appendChild(node);
    //return node;
  }

}

/* WORD */
const Word = function (word, canvas, ctx) {
  this.word = word
  this.left = this.word
  this.canvas = canvas
  this.ctx = ctx
}

Word.prototype = {
  Draw: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 2)
	
    this.ctx.textAlign = 'left'
    this.ctx.font = '50px Courier'
    this.ctx.fillText("Skoor: " + score, 50, 100)

    this.ctx.textAlign = 'left'
    this.ctx.font = '50px Courier'
    this.ctx.fillText("Arvatud sõnad: " + guessedWords, 50, 200)

    this.ctx.textAlign = 'left'
    this.ctx.font = '50px Courier'
    this.ctx.fillText("Level: " + level, 50, 300)
  },

  removeFirstLetter: function () {
    this.left = this.left.slice(1)
  }
}

/* HELPERS */
function structureArrayByWordLength (words) {
  let tempArray = []

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined)tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}

window.onload = function () {
  const typer = new TYPER()
  window.typer = typer
}