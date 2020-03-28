import React from 'react';
import DefaultHeader from '../components/headers/DefaultHeader';

const DeliveryLocations = (props) => {
    return (
        <>
            <DefaultHeader navigation={props.navigation} title="Locais de Entrega" />
        </>
    );
}

export default DeliveryLocations;