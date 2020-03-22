import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startAddStudents } from '../../actions/studentActions';

import Layout from '../common/Layout';
import StudentForm from './StudentForm';

const AddStudentPage = (props) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    return (
        <Layout>
            <section className="container add-student-page__container">
                <Link className="go-back" to="/admin">Go Back</Link>
                <h1>Add Student</h1>
                <StudentForm 
                    isSubmitting={isSubmitting}
                    onSubmit={(data) => {
                        setIsSubmitting(true);
                        props.startAddStudents(data)
                            .then(res => {
                                setIsSubmitting(false);
                                console.log('Response: ', res);
                                props.history.push('/admin');
                            })
                            .catch(err => {
                                setIsSubmitting(false);
                                console.log('Errorr: ', err);
                            })
                    }}
                />
            </section>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddStudents: (data) => dispatch(startAddStudents(data))
    };
};


export default connect(undefined, mapDispatchToProps)(AddStudentPage);