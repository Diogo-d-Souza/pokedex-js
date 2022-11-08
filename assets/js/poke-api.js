const pokeApi = {}

function convertPokeApiDatailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // pokemon.type = pokemon.types.get(0)

    return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const pokeDetail = await response.json()
    return convertPokeApiDatailToPokemon(pokeDetail)
}

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequest = pokemons.map(pokeApi.getPokemonDetail)
    const pokemonsDetail = await Promise.all(detailRequest)
    return pokemonsDetail
}

