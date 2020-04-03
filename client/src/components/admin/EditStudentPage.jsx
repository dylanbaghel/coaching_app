import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startSetCurrentStudent, startUpdateStudent } from '../../actions/studentActions';

import Layout from '../common/Layout';
import StudentForm from './StudentForm';
import Loading from '../common/Loading';


class EditStudentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSubmitting: false
        };
    }
    componentDidMount() {
        this.setState(() => ({ isLoading: true }));
        this.props.startSetCurrentStudent(this.props.match.params.id)
            .then(() => {
                this.setState(() => ({ isLoading: false }));
            })
            .catch(err => {
                this.setState(() => ({ isLoading: false }));
                console.log(err);
            });
    }
    render() {
        return (
            <Layout>
                {this.state.isLoading ? <Loading loading={this.state.isLoading} /> : <section className="container add-student-page__container">
                <Link className="go-back" to={`/admin/students/${this.props.match.params.id}`}>Go Back</Link>
                <h1>Edit Student</h1>
                <StudentForm
                    isSubmitting={this.state.isSubmitting}
                    onSubmit={(data) => {
                        this.setState(() => ({ isSubmitting: true }));
                        this.props.startUpdateStudent(this.props.match.params.id, data)
                            .then(res => {
                                this.setState(() => ({ isSubmitting: false }));
                                console.log('responseeee', res);
                                this.props.history.replace(`/admin/students/${this.props.match.params.id}`);
                            })
                            .catch(err => {
                                this.setState(() => ({ isSubmitting: false }));
                                console.log('ERrror: ', err);
                            });
                    }}
                    student={this.props.currentStudent}
                />
            </section>}
                
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentStudent: state.students.currentStudent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetCurrentStudent: (id) => dispatch(startSetCurrentStudent(id)),
        startUpdateStudent: (id, data) => dispatch(startUpdateStudent(id, data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditStudentPage);