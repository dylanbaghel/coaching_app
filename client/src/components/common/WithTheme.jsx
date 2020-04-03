import React from 'react';
import { connect } from 'react-redux';

const WithTheme = (WrappedComponent) => {
    return connect(mapStateToProps)((props) => {
        return <WrappedComponent {...props} />
    })
};

const mapStateToProps = (state) => {
    return {
        theme: state.theme
    };
};

export default WithTheme;