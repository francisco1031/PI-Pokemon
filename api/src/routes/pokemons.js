
const router = require('express').Router();
const {getAllPokemons}= require("./models/getAllPokemons");
const { Pokemon, Type} = require("../db");
const axios = require('axios');



router.get('', async (req, res) => {
    //reviso si me envian el nombre por query
    const { name } = req.query;
    
    const totalPokemons = await getAllPokemons();
   // console.log (name)
    if (name) {
        const pokeDB = totalPokemons.filter(pok => pok.name.toLowerCase().includes(name.toLowerCase()))
        console.log (name)
        if (pokeDB.length) {
            return res.status(200).send(pokeDB);
        } return res.send({ error: 'Pokemon not found' })

    } else {
        try {
            return res.status(200).send(totalPokemons);

        } catch (error) {
            res.send(error)
        }
    }
    console.log (totalPokemons)
});

router.get('./:id', async (req, res) => {
    const { id } = req.params;
    const totalPokemons = await getAllPokemons();
    if (id) {
        const pokemonId = await totalPokemons.filter(pokeId => pokeId.id == id);

        if (pokemonId.length) {
            try {
                return res.status(200).send(pokemonId)
            } catch (error) {
                res.send(error)
            }
        }
    }
})

router.post('', async (req, res) => {
    const {
        id,
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        wieght,
        createByMe
    } = req.body;

    try {
        const newPoke = await Pokemon.create({
            id, name, image, hp, attack, defense, speed, height, wieght, createByMe
        });

        const typeDB = await Type.findAll({
            where: {
                name: Type
            }
        });

        console.log(typeDB)
        await newPoke.addType(typeDB);
        res.send('newPoke');
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;