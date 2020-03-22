import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return <Route
        {...rest} 
        render={(props) => {
            return !isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
        }}
    />
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.id
    };
};

export default connect(mapStateToProps)(PublicRoute);