import React from 'react';
import preloader from '../../assets/loader.gif';

const Loading = (props) => {
    console.log(props);
    let classNames = '';
    if (props.loading) {
        classNames += 'loader';
    } else {
        classNames = '';
    }
    return (
        <div style={{ display: 'none' }} className={classNames}>
            <div>
                <img src={preloader} />
            </div>
        </div>
    );
};

export default Loading;