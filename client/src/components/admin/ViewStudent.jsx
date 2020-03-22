import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import placeHolderImage from '../../assets/placeholder.jpg';

import { startSetCurrentStudent, startRemoveStudent } from '../../actions/studentActions';

import Layout from '../common/Layout';
import Loading from '../common/Loading';

class ViewStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isLoading: false,
            isSubmitting: false
        };
        this.onDeleteStudent = this.onDeleteStudent.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this._renderModalContent = this._renderModalContent.bind(this);
    }

    componentDidMount() {
        this.setState(() => ({ isLoading: true }));
        this.props.startSetCurrentStudent(this.props.match.params.id)
            .then(() => {
                this.setState(() => ({ isLoading: false }));
            });
    }

    handleModalOpen() {
        this.setState(() => {
            return { modalIsOpen: true }
        });
    }

    handleModalClose() {
        this.setState(() => {
            return { modalIsOpen: false }
        });
    }

    onDeleteStudent() {
        this.setState(() => ({ isSubmitting: true }));
        this.props.startRemoveStudent(this.props.currentStudent._id)
            .then(() => {
                this.setState(() => ({ isSubmitting: false }));
                this.props.history.replace('/admin');
            })
            .catch(err => {
                this.setState(() => ({ isSubmitting: false }));
                console.log(err);
            });
    }

    _renderModalContent() {
        return (
            <div>
                <p>Do You Want To Delete This Student Record?</p>
                <div>
                    <button disabled={this.state.isSubmitting} onClick={this.onDeleteStudent} className="btn btn--danger">Yes</button>
                    <button onClick={this.handleModalClose} className="btn">No</button>
                </div>
            </div>
        );
    }

    render() {
        const { currentStudent } = this.props;
        return (
            <Layout>
                <Loading loading={this.state.isLoading} />
                <div className="container">
                    <div className="container__header">
                        <Link className="go-back" to="/admin">Go Back</Link>
                        <h1 className="l-heading">Student Details</h1>
                    </div>
                    {this.props.currentStudent && (
                        <div className="student-details__container">
                            <div className="student-details__main">
                                <ul className="student-details__list">
                                    <li>Name: {currentStudent.name}</li>
                                    <li>Email: {currentStudent.email}</li>
                                    <li>Phone: {currentStudent.phone}</li>
                                    <li>Date Of Birth: {currentStudent.dob}</li>
                                    <li>Admission Date: {currentStudent.admissionDate}</li>
                                    <li>Fees Submitted: {currentStudent.fees}</li>
                                </ul>
                            </div>
                            <div className="student-details__sidebar">
                                <div>
                                    <img src={currentStudent.image ? currentStudent.image.publicUrl : placeHolderImage} />
                                </div>
                                <div className="student-details__action">
                                    <Link className="btn" to={`/admin/students/edit/${currentStudent._id}`}>Edit</Link>

                                    <button disabled={this.state.isSubmitting} className="btn btn--danger" onClick={this.handleModalOpen}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.handleModalClose}
                        children={this._renderModalContent()}
                        ariaHideApp={false}
                    />
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentStudent: state.students.currentStudent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetCurrentStudent: (id) => dispatch(startSetCurrentStudent(id)),
        startRemoveStudent: (id) => dispatch(startRemoveStudent(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStudent);