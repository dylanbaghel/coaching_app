import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';
import ImageManagerPage from '../components/admin/ImageManagerPage';
import AddStudentPage from '../components/admin/AddStudentPage';
import ViewStudent from '../components/admin/ViewStudent';
import EditStudentPage from '../components/admin/EditStudentPage';
import NotFoundPage from '../components/admin/NotFoundPage';
import Settings from '../components/admin/Settings';

export const history = createBrowserHistory();

const AppRouter = () => {
    return(
        <Router history={history}>
            <Switch>
                <Redirect exact={true} path="/" to="/admin/login"/>
                <PublicRoute exact={true} path="/admin/login" component={Login}/>
                <AdminRoute exact={true} path="/admin" component={Dashboard}/>
                <AdminRoute exact={true} path="/admin/settings" component={Settings} />
                <AdminRoute exact={true} path="/admin/images" component={ImageManagerPage}/>
                <AdminRoute exact={true} path="/admin/students/add" component={AddStudentPage} />
                <AdminRoute exact={true} path="/admin/students/edit/:id" component={EditStudentPage}/>
                <AdminRoute exact={true} path="/admin/students/:id" component={ViewStudent}/>
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
};

export default AppRouter;