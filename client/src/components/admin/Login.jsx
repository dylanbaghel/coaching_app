import React from 'react';
import { isEmail } from 'validator';
import { connect } from 'react-redux';

import { startLogin } from '../../actions/authActions';

import Layout from '../common/Layout';
import Alert from '../common/Alert';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isSubmitting: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handllePasswordChange = this.handllePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
        const email = e.target.value;
        this.setState(() => {
            return {
                email
            };
        });
    }

    handllePasswordChange(e) {
        const password = e.target.value;
        this.setState(() => {
            return { password };
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.email) {
            this.setState(() => {
                return {
                    errors: { email: 'Please Enter Email' }
                };
            });
            return;
        }
        if (!isEmail(this.state.email)) {
            this.setState(() => {
                return {
                    errors: { email: 'Please Enter Valid Email' }
                };
            });
            return;
        }
        if (!this.state.password) {
            this.setState(() => {
                return {
                    errors: { password: 'Please Enter Password' }
                };
            });
            return;
        }

        this.setState(() => ({ isSubmitting: true }));
        this.props.startLogin(this.state.email, this.state.password)
            .then(() => {
                this.setState(() => ({ isSubmitting: false }));
            })
            .catch(err => {
                this.setState(() => {
                    return { errors: { flash: err.message }, isSubmitting: false };
                });
            });
    }
    render() {
        return (
            <Layout>
                <div className="container flex-middle">
                    {this.state.errors.flash && <Alert
                        message={this.state.errors.flash}
                        status="danger"
                        close={() => {
                            this.setState(() => {
                                return { errors: {} }
                            });
                        }}
                    />}
                    <div className="login">
                        <h1 className="login__form-title">Login Page</h1>
                        <form className="login__form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                                {this.state.errors.email && <span>{this.state.errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.handllePasswordChange}
                                />
                                {this.state.errors.password && <span>{this.state.errors.password}</span>}
                            </div>
                            <button disabled={this.state.isSubmitting} className="btn btn--primary">Login</button>
                        </form></div>
                </div>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: (email, password) => dispatch(startLogin(email, password))
    };
};

export default connect(undefined, mapDispatchToProps)(Login);