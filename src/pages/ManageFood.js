import React from 'react';
import DefaultHeader from '../components/headers/DefaultHeader';

const ManageFood = (props) => {
    return (
        <>
            <DefaultHeader navigation={props.navigation} title="Gerenciar Alimentos" />
        </>
    );
}

export default ManageFood;