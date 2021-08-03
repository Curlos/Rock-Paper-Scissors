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
let evolveTimes = 0

const playRound = ((event) => {
    let playerPokémon = event.target
    let playerPokémonElemType = playerPokémon.classList[0]
    console.log(`player: ${playerPokémonElemType}`)


    let randomElemIndex = getRandomElemType(0, elemTypes.length)
    let randomElem = elemTypes[randomElemIndex]
    let botPokémon = document.querySelector(`.botPokémon .${randomElem}`)
    let botPokémonElemType = botPokémon.classList[0]
    console.log(`bot: ${botPokémonElemType}`)
    handleElemTypes(playerPokémonElemType, botPokémonElemType)
})

const handleElemTypes = (playerElemType, botElemType) => {
    let playerScoreNum = Number(playerScoreElem.textContent)
    let botScoreNum = Number(botScoreElem.textContent)

    if(playerScoreNum >= 5) {
        alert('You win! You got ₽10000000 for winning.')
    } else if (botScoreNum >= 5) {
        alert('BOT wins...BOT got ₽10000000 for winning.')
    } else if (botElemType == typeEffectiveness[playerElemType]) {
        playerScoreElem.textContent = String(playerScoreNum + 1)
        resultTextElem.textContent = `PLAYER used ${playerElemType} on Bot's ${botElemType}. It was super effective!`
    } else if (playerElemType == typeEffectiveness[botElemType]) {
        botScoreElem.textContent = String(botScoreNum + 1)
        resultTextElem.textContent = `PLAYER used ${playerElemType} on Bot's ${botElemType}. It was not very effective...`
    } else {
        resultTextElem.textContent = `PLAYER used ${playerElemType} on Bot's ${botElemType}. It was not very effective...`
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

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

firePokémonPlayer.addEventListener('click', playRound)
waterPokémonPlayer.addEventListener('click', playRound)
grassPokémonPlayer.addEventListener('click', playRound)
evolveButton.addEventListener('click', changeEvolution)
devolveButton.addEventListener('click', changeEvolution)