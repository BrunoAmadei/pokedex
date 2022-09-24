const pokemonId = document.querySelector('.pokemon-id')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonType = document.querySelector('.description-type')
const pokemonHeigth = document.querySelector('.description-height')
const pokemonWeight = document.querySelector('.description-weight')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const input = document.querySelector('.search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let activePokemon = 1

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (response.status === 200) {
        const data = await response.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonId.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonId.innerHTML = data.id
        pokemonName.innerHTML = data.name
        pokemonType.innerHTML = data.types[0].type.name
        pokemonHeigth.innerHTML = data.height
        pokemonWeight.innerHTML = data.weight
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        activePokemon = data.id
        input.value = ''
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found =c'
        pokemonId.innerHTML = ''
        input.value = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (activePokemon > 1) {
        activePokemon -= 1
        renderPokemon(activePokemon)
    }
})

buttonNext.addEventListener('click', () => {
    activePokemon += 1
    renderPokemon(activePokemon)
})

renderPokemon(activePokemon)