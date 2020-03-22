import React from 'react';
import { Link } from 'react-router-dom';

import notFoundGif from '../../assets/404.webp';

import Layout from '../common/Layout';

const NotFoundPage = () => {
    return (
        <Layout>
            <div className="container">
                <div className="not-found__container">
                    <img className="not-found__image" src={notFoundGif} />
                    <h1>404 | Page Not Found</h1>
                    <p className="not-found__body">Head To The Home Page | <Link to="/">Click Here</Link></p>
                </div>
            </div>
        </Layout>
    );
};

export default NotFoundPage;