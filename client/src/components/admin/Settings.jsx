import React, { useState } from 'react';
import { SliderPicker } from 'react-color';
import { connect } from 'react-redux';

import { setTheme, resetTheme } from '../../actions/themeActions';

import Layout from '../common/Layout';
import { useEffect } from 'react';

const Settings = (props) => {
    const [primaryColor, setPrimaryColor] = useState('#2f2fa2');

    useEffect(() => {
        setPrimaryColor(props.theme.primaryColor);
    }, []);

    return (
        <Layout>
            <div className="container settings-page__container">
                <h1>Settings</h1>
                <div>
                    <label>Primary Color</label>
                    <SliderPicker
                        color={primaryColor}
                        onChange={(c) => {
                            setPrimaryColor(c.hex);
                            props.setTheme({
                                primaryColor: c.hex
                            });
                            const data = JSON.stringify({
                                primaryColor: c.hex
                            });
                            localStorage.setItem('theme', data);
                        }}
                    />
                </div>
                <button className="btn" onClick={props.resetTheme}>Reset Theme</button>
            </div>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTheme: (themeObj) => dispatch(setTheme(themeObj)),
        resetTheme: () => dispatch(resetTheme())
    }
};

const mapStateToProps = (state) => {
    return { theme: state.theme };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);