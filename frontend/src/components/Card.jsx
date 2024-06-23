import React from 'react'

function Card(props) {
    return (
        <div className="card" style={{width:"20rem"}}>
            <img className="card-img-top" src={props.url} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">name : {props.name}</h5>
                <p className="card-text">email : {props.email}</p>
            </div>
        </div>
    )
}

export default Card