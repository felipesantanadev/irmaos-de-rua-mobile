import React from 'react';

import DefaultHeader from '../components/headers/DefaultHeader';

const Feed = (props) => {
    return (
        <>
            <DefaultHeader navigation={props.navigation} title="Início" />
        </>
    );
}

export default Feed;