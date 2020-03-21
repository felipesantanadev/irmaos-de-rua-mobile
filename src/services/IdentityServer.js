import * as SecureStore from 'expo-secure-store';

const StoreUser = async (username, token, tokenExpiration, refreshToken, roles) => {
    if(username) {
        await SecureStore.setItemAsync("irmaosderua-username", username);
    }

    if(token) {
        await SecureStore.setItemAsync("irmaosderua-token", token);
    }

    if(tokenExpiration) {
        await SecureStore.setItemAsync("irmaosderua-tokenExpiration", tokenExpiration);
    }

    if(refreshToken) {
        await SecureStore.setItemAsync("irmaosderua-refreshToken", refreshToken);
    }

    if(roles) {
        await SecureStore.setItemAsync("irmaosderua-roles", roles.join(","));
    }
}

const User = async () => {
    return {
        username: await SecureStore.getItemAsync("irmaosderua-username"),
        token: await SecureStore.getItemAsync("irmaosderua-token"),
        tokenExpiration: new Date(await SecureStore.getItemAsync("irmaosderua-tokenExpiration")),
        refreshToken: await SecureStore.getItemAsync("irmaosderua-refreshToken"),
        roles: await SecureStore.getItemAsync("irmaosderua-roles")
    }
}

export {
    StoreUser,
    User
}