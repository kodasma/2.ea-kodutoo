this.score = 0
this.level = 1
this.guessedWords = 0

/* TYPER */
const TYPER = function () {
  if (TYPER.instance_) {
    return TYPER.instance_
  }
  TYPER.instance_ = this

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
  console.error()

  this.totalTime = 60;
  this.timeLeft = this.totalTime
  this.gameOver = false

  //startGame()
  //this.init()
}

window.TYPER = TYPER

TYPER.routes = {
  'home-view': {
    'render': function () {
      console.log('Home')
    }
  },
  'app-view': {
    'render': function () {
      console.log('App')
    }
  }
  /*'score-view': {
    'render': function () {
      console.log('Score')
    }
  }*/
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

    if (!window.location.hash) {
      window.location.hash = 'home-view'
    } else {
      this.routeChange()
    }
  },

  routeChange: function (event) {
    this.currentRoute = location.hash.slice(1)
    if (this.routes[this.currentRoute]) {
      this.updateMenu()

      this.routes[this.currentRoute].render()
    }
  },

  updateMenu: function () {
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

        typer.start()
      }
    }

    xmlhttp.open('GET', './lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()

    window.addEventListener('keypress', this.keyPressed.bind(this))

    gameTimer()
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]

    this.word = new Word(wordFromArray, this.canvas, this.ctx)
    level = (parseInt(window.typer.guessedWords / 5) + 1)
  },

  keyPressed: function (event) {
    if (typer.gameOver === false) {
      const letter = String.fromCharCode(event.which)
      if (letter === this.word.left.charAt(0)) {
        this.word.removeFirstLetter()
        score += 1
        if (this.word.left.length === 0) {
          guessedWords += 1
          this.guessedWords += 1
          this.generateWord()
        }
      } else {
        score -= 5
      }
      this.word.Draw()
    }
  },

  gameOverButtonPressed: function (event) {
    const letter = String.fromCharCode(event.which)
    if (letter === " " && typer.gameOver === true) {
      location.reload()
      window.location.hash = 'home-view'
      const typer = new TYPER()
      window.typer = typer
      typer.init()
    } else if (letter === "e" && typer.gameOver === true) {
      typer.word.drawScores()
    }
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
    this.ctx.fillText("Aeg: " + typer.timeLeft, 50, 100)

    this.ctx.textAlign = 'left'
    this.ctx.font = '50px Courier'
    this.ctx.fillText("Skoor: " + score, 50, 200)

    this.ctx.textAlign = 'left'
    this.ctx.font = '50px Courier'
    this.ctx.fillText("Arvatud sõnad: " + guessedWords, 50, 300)

    this.ctx.textAlign = 'left'
    this.ctx.font = '50px Courier'
    this.ctx.fillText("Level: " + level, 50, 400)
  },

  drawEndScreen: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillText('Aeg läbi!', this.canvas.width / 2, this.canvas.height / 2 - this.canvas.height / 7)
    this.ctx.font = '80px Courier'
    this.ctx.fillText('Skoor: ' + score, this.canvas.width / 2, this.canvas.height - this.canvas.height / 2.4)
    this.ctx.font = '50px Courier'
    this.ctx.fillText('[E - Edetabel]', this.canvas.width / 2, this.canvas.height - this.canvas.height / 4)
    this.ctx.fillText('[TÜHIK - Mängi uuesti]', this.canvas.width / 2, this.canvas.height - this.canvas.height / 5)

    window.addEventListener('keypress', TYPER.prototype.gameOverButtonPressed.bind(this))
  },

  drawScores: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0, len = JSON.parse(localStorage.getItem('arr')).length; i < len; i++) {
      if (i < 10) {
        this.ctx.textAlign = 'center'
        this.ctx.font = '80px Courier'
        this.ctx.fillText("#" + (i + 1) + ") " +
          "Nimi: " + JSON.parse(localStorage.getItem('arr'))[i][0] + "    " +
          "Skoor: " + JSON.parse(localStorage.getItem('arr'))[i][1],
          this.canvas.width / 2, 200 + 100 * i)
      }
    }
    this.ctx.font = '50px Courier'
    this.ctx.fillText('[TÜHIK - Mängi uuesti]', this.canvas.width / 2, this.canvas.height - this.canvas.height / 10)
  },

  removeFirstLetter: function () {
    this.left = this.left.slice(1)
  }
}

/* HELPERS */
function structureArrayByWordLength(words) {
  let tempArray = []

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined) tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}

function gameTimer() {
  (function timer1() {
    if (typer.timeLeft > 0) {
      typer.word.Draw()
      typer.timeLeft -= 1
      setTimeout(timer1, 1000)
    } else {
      endGame()
    }
  })();
}

function endGame() {
  typer.gameOver = true
  typer.word.drawEndScreen()
  saveScore(name, this.score)
}

function saveScore(playerName, playerScore) {
  arr = []
  stored = []
  if (window.localStorage.length == 0) {
    player = [playerName, playerScore]
    arr.push(player)
    localStorage.setItem('arr', JSON.stringify(arr))
  } else {
    let player2 = [playerName, playerScore]
    stored.push(player2)


    let length = stored.length
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < (length - i - 1); j++) {
        if (stored[j][1] < stored[j + 1][1]) {
          let tmp = stored[j]
          stored[j] = stored[j + 1]
          stored[j + 1] = tmp
        }
      }
    }
    localStorage.setItem('arr', JSON.stringify(stored))
  }
}

let name = ""

function startGame() {
  if (document.querySelector('#nameField').value != "") {
    name = document.querySelector('#nameField').value
    document.querySelector('#app-view').innerHTML = "<canvas></canvas>"
    window.location.hash = 'app-view'
    const typer = new TYPER()
    window.typer = typer
    typer.init()
  } else {
    alert("Kõigepealt sisesta nimi!")
  }
}