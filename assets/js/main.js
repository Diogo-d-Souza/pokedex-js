const pokemonUl = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const inputName = document.getElementById('name')

const maxRecord = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
        `).join('')

        pokemonUl.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemonItens(offset, limit)
    }

})

function filterPokemon(pokemons, inputValue, returnMatchedPokemons) {
    return pokemons
        .filter(pokemon => {
            const str = pokemon.textContent.trim()
            const word = str.split('\n')
            const pokemonName = word[1].trim()
            const matchedPokemons = pokemonName.toLowerCase().includes(inputValue)
            return returnMatchedPokemons ? matchedPokemons : !matchedPokemons
        })
}

function hiddenPokemon(inputValue, pokemons) {
    filterPokemon(pokemons, inputValue, false)
        .forEach(pokemon => {
            pokemon.classList.add('hidden')
        })
}

function showPokemon(inputValue, pokemons) {
    filterPokemon(pokemons, inputValue, true)
        .forEach(pokemon => {
            pokemon.classList.remove('hidden')
        })
}


inputName.addEventListener('input', (event) => {
    const inputValue = event.target.value.trim().toLowerCase()
    const pokemons = Array.from(pokemonUl.children)

    hiddenPokemon(inputValue, pokemons)
    showPokemon(inputValue, pokemons)

})

function hiddenPokemonSelect(pokemons, text) {


    pokemons.filter(pokemon => {
        const str = pokemon.outerText.split('\n')
        if (str.length == 3) {
            return !str[2].includes(text.toLowerCase())
        }else if (str.length == 4){
            return !str[3].includes(text.toLowerCase())
        }
    })
        .forEach(pokemon => {
            pokemon.classList.add('hidden')
        })
}

function showPokemonSelect(pokemons, text) {

    pokemons.filter(pokemon => {
        return pokemon.classList[1].includes(text.toLowerCase())
    }).forEach(pokemon => {
        pokemon.classList.remove('hidden')
    })
}

function pokemonSelected() {
    let select = document.querySelector('#box')
    let optionValue = select.options[select.selectedIndex]
    let text1 = optionValue.text
    const text = text1.toLowerCase()
    const pokemons = Array.from(pokemonUl.children)

    if (text === "types") {
        pokemons.filter(type => {
            return type.classList
        }).forEach(pokemon => {
            pokemon.classList.remove('hidden')
        })
    } else {
        hiddenPokemonSelect(pokemons, text)
        showPokemonSelect(pokemons, text)
    }
}

