import React,{useEffect, useState} from 'react'
import axios from 'axios';
import './Datavis.css'
import {NavLink} from 'react-router-dom';
import BarChart from './charts/BarChart'
import Expertise from './charts/Expertise'
import Industry from './charts/Industry'
import Relocation from './charts/Relocation'
import State from './charts/State'

const payload = {
    limit: 1000,
    offset: 0
    };

const Datavis = () => {

    const [city, setCity] = useState([])
    const [expertise, setExpertise] = useState([])
    const [chartIndustry, setchartIndustry] = useState([])
    const [relocate, setRelocate] = useState([])
    const [ste, setSte] = useState([])

    const [load,setLoad] = useState(true)

    useEffect(() => {
      axios.post('https://nwmxjrs4cb.execute-api.ap-south-1.amazonaws.com/prod/talent/profiles',payload)
      .then(res => {
          res.data.profiles.map(item => {
              setCity(city => [...city, item.city])
              setExpertise(exp => [...exp, item.proficiencyLevel])
              setchartIndustry(exp => [...exp, item.industry])
              setRelocate(exp => [...exp, item.relocation])
              setSte(exp => [...exp, item.state])
          })
        }).then(res => setLoad(prev => !prev))
    },[])

    return (
        <div className="main">
        <h1>Data Visualization</h1>
        <NavLink to="/">
            <button>Data Table</button>
        </NavLink>
        {load === true ? <h3>Loading...</h3> :
            <div className="vis-container">
                <BarChart city={city} />
                <State ste={ste} />
                <Expertise expertise={expertise} />
                <Industry chartIndustry={chartIndustry} />
                <Relocation relocate={relocate} /> 
            </div>
        }
        </div>
    )
}

export default Datavis
