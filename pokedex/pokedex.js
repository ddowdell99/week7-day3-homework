let form = document.querySelector('#pokedex-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let pokemon = event.path[0][0].value
    loadPokemon(pokemon);
    form.reset();
})

let getPokemon = async (pokemon) => {
    try {
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

let loadPokemon = async (pokemon) => {
    let data = await getPokemon(pokemon);
    console.log(data)
    let new_pokemon_name = `${data.forms[0].name.toUpperCase()}`;
    document.getElementById('pokemon_name').insertAdjacentHTML('afterbegin', new_pokemon_name)
    let new_pokemon_img = `<img src="${data.sprites['front_default']}" class="card-img-top" alt="...">`;
    document.getElementById('pokemon_img').insertAdjacentHTML('afterbegin', new_pokemon_img)
    let pokemon_ability1 = `Main Ability: ${data.abilities[1].ability.name.toUpperCase()}`
    document.getElementById('main_ability').insertAdjacentHTML('afterbegin', pokemon_ability1)
    let pokemon_ability2 = `Secondary Ability: ${data.abilities[0].ability.name.toUpperCase()}`
    document.getElementById('secondary_ability').insertAdjacentHTML('afterbegin', pokemon_ability2)
}

let clearPokemonData = () => {
    console.log(document.getElementById('pokemon_name').innerHTML)
    document.getElementById('pokemon_name').innerHTML='';
    document.getElementById('main_ability').innerHTML='';
    document.getElementById('secondary_ability').innerHTML='';
    document.getElementById('pokemon_img').innerHTML=''
}
