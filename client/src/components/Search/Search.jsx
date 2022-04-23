import { useState, useEffect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsByName } from "../../actions";

export function Search() {
    const [busqueda, setBusqueda] = useState("")
    const dispatch = useDispatch()


    const handleChange = (event) => {
        setBusqueda(event.target.value.toLowerCase())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch((getPokemonsByName(busqueda)))
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <input className={"styles.busqueda"} type ='text' placeholder="Pokemon name" onChange={e=>handleChange(e)}></input>
                <butoon className={styles.button} onClick={e =>handleSubmit(e)}>Search</butoon>
                </div>
                </div>
    )}