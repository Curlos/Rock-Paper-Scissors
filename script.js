const typeEffectiveness = {
    "fire": "grass",
    "water": "fire",
    "grass": "water",
}

const pokédexEntries = {
    "Bulbasaur": "001",
    "Ivysaur": "002",
    "Venasaur": "003",
    "Charmander": "004",
    "Charmeleon": "005",
    "Charizard": "006",
    "Squirtle": "007",
    "Wartortle": "008",
    "Blastoise": "009",
}

const elemTypes = ["fire", "water", "grass"]

const playerScoreElem = document.getElementById('playerScore')
const botScoreElem = document.getElementById('botScore')
const firePokémonPlayer = document.querySelector('.playerPokémon .fire')
const waterPokémonPlayer = document.querySelector('.playerPokémon .water')
const grassPokémonPlayer = document.querySelector('.playerPokémon .grass')
const resultTextElem = document.querySelector('.resultText')
const evolveButton = document.getElementById('evolve')
const devolveButton = document.getElementById('devolve')
const playAgainButton = document.getElementById('playAgain')
const allPokémon = document.querySelectorAll('.pokemon')
let evolveTimes = 0
let gameOver = false

const playRound = ((event) => {
    if (!gameOver) {
        let playerPokémon = event.target
        let playerPokémonElemType = playerPokémon.classList[1]
        console.log(`player: ${playerPokémonElemType}`)


        let randomElemIndex = getRandomElemType(0, elemTypes.length)
        let randomElem = elemTypes[randomElemIndex]
        let botPokémon = document.querySelector(`.botPokémon .${randomElem}`)
        let botPokémonElemType = botPokémon.classList[1]

        handleElemTypes(playerPokémonElemType, botPokémonElemType)
        fadeUnchosenPokémon('playerPokémon',playerPokémonElemType)
        fadeUnchosenPokémon('botPokémon',botPokémonElemType)
    }
})

const fadeUnchosenPokémon = (trainerPokémon, chosenType) => {
    let pokémon = document.querySelectorAll(`.${trainerPokémon} .pokémon`)
    console.log(pokémon)
    console.log('CHOSEN TYPE: ', chosenType)

    for (let elem of pokémon) {
        const classList = Object.values(elem.classList)

        if (!classList.includes(chosenType)) {
            console.log(chosenType)
            elem.classList.remove('noFade')
            elem.classList.add('fade')
        } else if (classList.includes(chosenType)) {
            elem.classList.remove('fade')
            elem.classList.add('noFade')
        }
    }
}

const handleElemTypes = (playerElemType, botElemType) => {
    let playerScoreNum = Number(playerScoreElem.textContent)
    let botScoreNum = Number(botScoreElem.textContent)

    if (botElemType == typeEffectiveness[playerElemType]) {
        playerScoreNum += 1
        playerScoreElem.textContent = String(playerScoreNum)
        resultTextElem.textContent = `PLAYER used ${playerElemType} on BOT'S ${botElemType}. It was super effective!`
        checkIfGameOver(playerScoreNum, botScoreNum)
        
    } else if (playerElemType == typeEffectiveness[botElemType]) {
        botScoreNum += 1
        botScoreElem.textContent = String(botScoreNum)
        resultTextElem.textContent = `PLAYER used ${playerElemType} on BOT'S ${botElemType}. It was not very effective...`
        checkIfGameOver(playerScoreNum, botScoreNum)
    } else {
        resultTextElem.textContent = `PLAYER used ${playerElemType} on BOT'S ${botElemType}. It was not very effective...`
    }
}

const getRandomElemType = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const changeEvolution = ((event) => {
    const firePokémon = document.querySelectorAll('.fire')
    const waterPokémon = document.querySelectorAll('.water')
    const grassPokémon = document.querySelectorAll('.grass')
    const allPokémon = [...firePokémon, ...waterPokémon, ...grassPokémon]

    console.log(event.target.id)
    
    for(let pokémon of allPokémon) {
        let pokémonName = pokémon.alt
        let entry = Number(pokédexEntries[pokémonName])

        console.log(evolveTimes)

        if (event.target.id == 'evolve' && evolveTimes < 12) {
            entry += 1
            evolveTimes += 1
        } else if (event.target.id == 'devolve' && evolveTimes > 0) {
            entry -= 1
            evolveTimes -= 1
        }
        
        let newEntryStr = '00' + String(entry)
        let evolutionName = getKeyByValue(pokédexEntries, newEntryStr)
        pokémon.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newEntryStr}.png`
        pokémon.alt = evolutionName
    }
})

const checkIfGameOver = (playerScoreNum, botScoreNum) => {
    if(playerScoreNum >= 5) {
        alert('You win! You got ₽10000000 for winning.')
        endGame()
    } else if (botScoreNum >= 5) {
        alert('BOT wins...BOT got ₽10000000 for winning.')
        endGame()
    }
}

const endGame = () => {
    gameOver = true
    playAgainButton.removeAttribute('hidden')
}

const resetGame = () => {
    location.reload()
}

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

firePokémonPlayer.addEventListener('click', playRound)
waterPokémonPlayer.addEventListener('click', playRound)
grassPokémonPlayer.addEventListener('click', playRound)
evolveButton.addEventListener('click', changeEvolution)
devolveButton.addEventListener('click', changeEvolution)
playAgainButton.addEventListener('click', resetGame)