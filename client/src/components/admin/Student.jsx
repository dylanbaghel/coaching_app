import React from 'react';

import placeHolderImage from '../../assets/placeholder.jpg';

import { history } from '../../router/AppRouter';

const Student = (props) => {
    return (
        <div className="card">
            <div className="card__image-container">
                <img
                    className="card__image"
                    src={props.student.image ? props.student.image.publicUrl : placeHolderImage}
                />
            </div>
            <div className="card__body">
                <h2>{props.student.name}</h2>
                <p>Email: {props.student.email}</p>
                <button onClick={() => {
                    history.push(`/admin/students/${props.student._id}`);
                }} className="btn btn--secondary">View Details</button>
            </div>
        </div>
    );
};

export default Student;