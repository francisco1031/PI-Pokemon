import React, { useEffect, useState } from "react";



function validate(newPoke){


    let error ={};

    if(!newPoke.name){
        error.name ="Name is required"
    }

    if(newPoke.hp<= 0 || newPoke.hp >200){
        error.hp ="Complete Pokemon Life between 0 and 200"
    }

    if(newPoke.attack< 0 || newPoke.attack >200){
        error.attack ="Complete Pokemon Attack between 0 and 200"
    }
    
    if(newPoke.defense< 0 || newPoke.defense >200){
        error.defense ="Complete Pokemon Defense between 0 and 200"
    }

    if(newPoke.speed< 0 || newPoke.speed >200){
        error.speed ="Complete Pokemon Speed between 0 and 200"
    }

    if(newPoke.height<= 0 || newPoke.height >200){
        error.height ="Complete Pokemon Height between 0 and 200"
    }
    
    if(newPoke.weight<= 0 || newPoke.weight >200){
        error.weight ="Complete Pokemon Weight between 0 and 200"
    }

    return error;
}


export default function newPoke(){
    const [newPoke, setNewPoke] = useState({
        name: '',
        img:'',
        type: [],
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        weight:0,
        height:0
    })

    const [error, setError] = useState({})
    const dispatch = useDispatch()
    const { types } = useSelector(state => state)
    const history = useHistory()
    const { name, hp, attack, defense, speed, weight, height, image } = newPoke


   function handleChange (event) {
        setNewPoke({
            ...newPoke,
            [event.target.name]: event.target.value.toLowerCase()
        })
        setError(validate({
            ...newPoke,
            [event.target.name]: event.target.value
        }))
    }

    function handleSelect (e) {
        if (!newPoke.tipo.includes(e.target.value) && newPoke.type.length < 4) {
            setNewPoke({
                ...newPoke,
                type: [...newPoke.type, e.target.value]
            })
            // setErrors(validate({
            //     ...newPoke,
            //     [e.target.name]: e.target.value
            // }))
        } else {
            alert('Este tipo de pokemon ya está incluído o llegaste al màximo de cuatro tipos por Pokemon')
        }
    }



    function handelDeleteType (el) {
        setNewPoke({
            ...newPoke,
            type: newPoke.type.filter(t=> t !== el)
        })
    }


    function handleSubmit (event) {
        event.preventDefault()
       // alert('You must complete all the required information')
        if (!Object.keys(error).length && newPoke.type.length) {
            dispatch(createPokemon(newPoke))
            alert("Pokemon created")
            setNewPoke({
                name: '',
                img:'',
                type: [],
                hp:0,
                attack:0,
                defense:0,
                speed:0,
                weight:0,
                height:0

            })
            history.push("/pokemons")
        } else {
            alert("Please you must complete all the required information")
        }
    }




    return (
    
    <div className='NewPokePage'>
        <h1 className='Titulo_NuevoPoke'> Create your own Pokemon</h1>

        <form className="nuevoPoke" onSubmit={(e) => handleSubmit(e)} >
            <div className='item_form'>
                <label className='label_form'>Name</label>
                <input className='input_form'
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.name && (<p className='requerimiento'>{error.name}</p>)}

            <div className='item_form'>
                <label className='label_form'>HP</label>
                <input className='input_form'
                    name="hp"
                    type="number"
                    min="0"
                    value={hp}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.hp && (<p  className='requerimiento' >{error.hp}</p>)}

            <div className='item_form'>
                <label className='label_form'>Attack</label>
                <input className='input_form'
                    name="attack"
                    type="number"
                    min="0"
                    value={attack}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.attack && (<p className='requerimiento'>{error.attack}</p>)}
            <div className='item_form'>
                <label className='label_form'>Defense</label>
                <input className='input_form'
                    name="defense"
                    type="number"
                    min="0"
                    value={defense}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.defense && (<p className='requerimiento'>{error.defense}</p>)}
            <div className='item_form'>
                <label className='label_form'>Speed</label>
                <input className='input_form'
                    name="speed"
                    type="number"
                    min="0"
                    value={speed}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.speed && (<p className='requerimiento'>{error.speed}</p>)}
            <div className='item_form'>
                <label className='label_form'>Weight</label>
                <input className='input_form'
                    name="weight"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.weight && (<p className='requerimiento'>{error.weight}</p>)}
            <div className='item_form'>
                <label className='label_form'>Height</label>
                <input className='input_form'
                    name="height"
                    type="number"
                    min="0"
                    value={height}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.height && (<p className='requerimiento'>{error.height}</p>)}
            <div className='item_form'>
                <label className='label_form'>Image</label>
                <input className='input_form'
                    name="image"
                    type="url"
                    value={image}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {error.image && (<p className='requerimiento'>{error.image}</p>)}
            <div className='item_form'>
                <label className='label_form'>Type</label>
                <select  className='input_form' onChange={(e) => handleSelect(e)}>
                    {types.map(t => {
                        return <option key={t} value={t}>{t}</option>
                    })}
                </select>
            </div>

            <div className='item_form'>
            <label className='label_form'> Types: </label>
            <ul className='tipos_form'>  {newPoke.type.map(t => 
                <div key={t} className='tipos_form_item' > {t}
                    <button className='buttonX' type='button' onClick={()=>handelDeleteType(t)}>X</button>
                </div>
            
                )}
            </ul>

            </div>    

            <div className='item_form' >
                <button className='buttonStyle'>
                    <Link to="/home"> BACK </Link>
                </button>
                <button className='buttonStyle' type="submit"> + CREATE POKEMON</button>
            </div>
        </form>
    </div>)
}