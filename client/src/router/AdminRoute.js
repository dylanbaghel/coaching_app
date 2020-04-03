import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return <Route
        {...rest} 
        render={(props) => {
            return isAuthenticated ? <Component {...props} /> : <Redirect to="/admin/login" />
        }}
    />
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.id && state.auth.role === 'admin'
    };
};

export default connect(mapStateToProps)(AdminRoute);