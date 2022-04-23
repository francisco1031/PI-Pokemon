import axios from 'axios';

export function getAllPokemons(){
    return async function(dispatch){
        return fetch('/pokemons')
        .then (r => r.json())
        .then( data => dispatch({ type: 'GET_ALL_POKEMONS', payload: data}))

    }
}

export function getPokemonsDetail(id){
    return async function(dispatch){
        return fetch('/pokemons/' + id)
        .then (r => r.json())
        .then( data => dispatch({ type: 'GET_POKEMON_DETAIL', payload: data}))

    }
}

export function getAllTypes(){
    return async function(dispatch){
        return fetch('/types')
        .then (r => r.json())
        .then( data => dispatch({ type: 'GET_ALL_TYPES', payload: data}))

    }
}

export function filterByType(payload){
    return{
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterByOrigin(payload){
    return{
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function sortByName(payload){
    return{
        type: 'SORT_BY_NAME',
        payload
    }
}


export function getPokemonsByName(name){
    return async function(dispatch){
        dispatch({type: 'Loading'})
        let json = await axios ('/pokemons?name=' + name)
        return dispatch({
            type: 'GET_POKEMONS_BY_NAME',
            payload: json.data
        })

    }}


export function postPokemon(payload) {
    return async function (dispathc){
        const pokemon = await axios.post('/pokemons',payload)
        return dispathc({
            type: 'POST_POKEMON',
            payload: pokemon
        })
    }
}

