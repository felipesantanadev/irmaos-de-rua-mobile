import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DefaultHeader = ({navigation, title}) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.menuIcon}
                              onPress={() => navigation.toggleDrawer()}>
                <FontAwesome name="bars" color="#007AFF" size={26} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.item}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: 65,
        backgroundColor: '#fff',
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        flexDirection: 'row',
        paddingTop: 25
    },
    menuIcon: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'roboto-bold',
        fontSize: 16
    },
    item: {
        width: 50,
        height: 50
    }
});

export default DefaultHeader;