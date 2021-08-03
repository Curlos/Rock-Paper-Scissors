const typeEffectiveness = {
    "fire": "grass",
    "water": "fire",
    "grass": "water",
}

const elemTypes = ["fire", "water", "grass"]

const firePokémonPlayer = document.querySelector('.playerPokémon .fire')
const waterPokémonPlayer = document.querySelector('.playerPokémon .water')
const grassPokémonPlayer = document.querySelector('.playerPokémon .grass')

const handleClickPlayer = ((event) => {
    let pokémonElemType = event.target.classList[0]
    console.log(pokémonElemType)


    let randomElemIndex = getRandomElemType(0, elemTypes.length)
    let randomElem = elemTypes[randomElemIndex]
    let botPokémon = document.querySelector(`.botPokémon .${randomElem}`)
    let botPokémonElemType = botPokémon.classList[0]
    botPokémon.click()
    console.log(botPokémon)
    console.log(botPokémonElemType)

})

const getRandomElemType = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

firePokémonPlayer.addEventListener('click', handleClickPlayer)
waterPokémonPlayer.addEventListener('click', handleClickPlayer)
grassPokémonPlayer.addEventListener('click', handleClickPlayer)