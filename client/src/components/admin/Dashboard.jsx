import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

import { startLogout } from '../../actions/authActions';
import { startSetStudents } from '../../actions/studentActions';

import Layout from '../common/Layout';
import Student from './Student';
import Search from './Search';
import Loading from '../common/Loading';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            searchText: '',
            isLoading: false
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.setState(() => ({ isLoading: true }))
        this.props.startSetStudents(this.state.activePage)
            .then(() => {
                this.setState(() => ({ isLoading: false }));
            });
    }

    handlePageChange(page) {
        this.setState(() => {
            return {
                activePage: page,
                isLoading: true
            };
        });
        this.props.startSetStudents(page, this.state.searchText)
                .then(() => this.setState(() => ({ isLoading: false })));
    }

    _renderStudentsList() {
        if (!this.props.studentsData.students || this.props.studentsData.students.length === 0) {
            return <h3>No Students Created</h3>
        }

        return this.props.studentsData.students.map(student => {
            return (
                <Student key={student._id} student={student} />
            );
        });
    }

    render() {
        return (
            <Layout>
                <Loading loading={this.state.isLoading} />
                <div className="container height-75">
                    <div className="dashboard__header">
                        <h1 className="dashboard__header__title">Dashboard</h1>
                        <button className="btn btn--secondary" onClick={this.props.startLogout}>Logout</button>
                    </div>
                    <Link className="btn btn--primary dashboard-btn" to="/admin/students/add">Add Student</Link>
                    <Search 
                        onValueChange={(value) => {
                            this.setState(() => {
                                return { activePage: 1, searchText: value };
                            }, () => {
                                this.props.startSetStudents(undefined, value)
                            });
                        }}
                    />
                    <div>
                        {this._renderStudentsList()}
                        {(this.props.studentsData.students && this.props.studentsData.totalPage > 1) && <Pagination
                            innerClass="innerClass"
                            itemClass="itemClass"
                            linkClass="linkClass"
                            activeClass="activeClass"
                            activeLinkClass="activeLinkClass"
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.props.studentsData.totalStudents}
                            onChange={this.handlePageChange}
                            hideDisabled={true}
                            
                        />}
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout()),
        startSetStudents: (pageNo, search) => dispatch(startSetStudents(pageNo, search))
    };
};

const mapStateToProps = (state) => {
    return {
        studentsData: state.students
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);