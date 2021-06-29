import React,{useEffect, useState} from 'react'
import axios from 'axios';
import './Table.css'
import {NavLink} from 'react-router-dom';

const payload = {
    limit: 1000,
    offset: 0
    };

const Table = () => {

    const [data, setData] = useState([])
    const [load,setLoad] = useState(true)
    const [city, setCity] = useState([])
    const [exp, setexp] = useState([])
    const[update, setUpdate] = useState([])

    const [cityfilter, setCityFilter] = useState('all')

    useEffect(() => {
      axios.post('https://nwmxjrs4cb.execute-api.ap-south-1.amazonaws.com/prod/talent/profiles',payload)
      .then(res => {
          console.log(res.data.profiles)
          res.data.profiles.map(item => {
            setCity(city => [...city, item.city])
          })
          setData(data => [...data,...res.data.profiles])
        })
        .then(res => setLoad(prev => !prev))
    },[])

    let count = {};
    city.forEach(function(x) {
        count[x] = (count[x] || 0) + 1;
    })
    let selectCity = []

    const handleClick = () => {
        selectCity.push(cityfilter)
        let x = data.filter(x => x.city === cityfilter)
        setUpdate(x)
    }

    return (
        <div className="main">
        <div className="nav">
            <h1>Data Table</h1>
            <NavLink to="/datavis">
                <button>Data visualization</button>
            </NavLink>
        </div>
        <div>
            <label>search by city : </label>
            <select onChange = {(e) => setCityFilter(e.target.value)} placeholder="Filter by city">
                <option disabled selected value> -- select city -- </option>
                {Object.keys(count).map((item) => {
                    return  <option>{item}</option>
                })}
            </select>
            <button onClick={handleClick}>Submit</button>
        </div>
            {load === true ? <h3>Loading...</h3> : load === false && update.length === 0 ?
            <table className="table">
            <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>City</th>
            <th>Job Role</th>
            <th>Experience</th>
            <th>Proficiency Level</th>
            <th>State</th>
            <th>Relocation</th>
            <th>Skills</th>
            <th>Visibility Duration</th>
            </tr>
                {data.map(item =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.industry}</td>
                                <td>{item.city}</td>
                                <td>{item.jobRole}</td>
                                <td>{item.experience === 1 ? <p>6 months-1 year</p> : item.experience === 2 ? <p>1-3 years</p> : item.experience === 3 ? 
                                    <p>4-7 years</p> : item.experience === 4 ? <p>8-10 years</p> : item.experience === 5 ? <p>11-15 years</p> : 
                                    item.experience === 6 ? <p>16+ years</p> : null
                                }</td>
                                <td>{item.proficiencyLevel}</td>
                                <td>{item.state}</td>
                                <td>{item.relocation === true ? <p>yes</p> : <p>no</p>}</td>
                                {item.skills.map(item => <p>{item}</p>)}
                                <td>{item.visibilityDuration === 1 ? <p>15 days</p> : item.visibilityDuration === 2 ? <p>30 days</p> : 
                                    item.visibilityDuration === 3 ? <p>45 days</p> : item.visibilityDuration === 4 ? <p>60 days</p> :
                                    item.visibilityDuration === 5 ? <p>90 days</p> : null
                                }</td>
                            </tr> 
                )} 
            </table> : load === false && update.length > 0 ?
            <table className="table">
            <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>City</th>
            <th>Job Role</th>
            <th>Experience</th>
            <th>Proficiency Level</th>
            <th>State</th>
            <th>Relocation</th>
            <th>Skills</th>
            <th>Visibility Duration</th>
            </tr>
                {update.map(item =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.industry}</td>
                                <td>{item.city}</td>
                                <td>{item.jobRole}</td>
                                <td>{item.experience === 1 ? <p>6 months-1 year</p> : item.experience === 2 ? <p>1-3 years</p> : item.experience === 3 ? 
                                    <p>4-7 years</p> : item.experience === 4 ? <p>8-10 years</p> : item.experience === 5 ? <p>11-15 years</p> : 
                                    item.experience === 6 ? <p>16+ years</p> : null
                                }</td>
                                <td>{item.proficiencyLevel}</td>
                                <td>{item.state}</td>
                                <td>{item.relocation === true ? <p>yes</p> : <p>no</p>}</td>
                                {item.skills.map(item => <p>{item}</p>)}
                                <td>{item.visibilityDuration === 1 ? <p>15 days</p> : item.visibilityDuration === 2 ? <p>30 days</p> : 
                                    item.visibilityDuration === 3 ? <p>45 days</p> : item.visibilityDuration === 4 ? <p>60 days</p> :
                                    item.visibilityDuration === 5 ? <p>90 days</p> : null
                                }</td>
                            </tr> 
                )} 
            </table>
            : null
        }
        </div>
    )
}

export default Table
