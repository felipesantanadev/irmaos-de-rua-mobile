import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const ProfileConfiguration = ({navigation}) => {
    var { width } = Dimensions.get('window');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', height: width * 0.7, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                <Image style={{ width: '100%', height: width * 0.7, backgroundColor: '#007AFF' }} />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("AccountInformation")}>
                        <View style={[styles.icon, { backgroundColor: '#FFCC00' }]}>
                            <FontAwesome style={{height: 20}} name="user-circle" color="#fff" size={20} />
                        </View>
                        <Text>Alterar informações da conta</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ChangePassword")}>
                        <View style={[styles.icon, { backgroundColor: '#007AFF' }]}>
                            <MaterialCommunityIcons style={{height: 20}} name="onepassword" color="#fff" size={20} />
                        </View>
                        <Text>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#ddd',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 20,
        marginBottom: 20,
        zIndex: 1
    },
    item: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    divider: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 5,
        marginRight: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileConfiguration;