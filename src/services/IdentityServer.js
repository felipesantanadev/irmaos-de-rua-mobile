import * as SecureStore from 'expo-secure-store';
import ApiService from '../services/ApiService';
import ApiConfig from '../configs/ApiConfig';

const IsTokenAlive = async () => {
    const tokenExpiration = await SecureStore.getItemAsync("irmaosderua-tokenExpiration");
    const refreshTokenExpiration = await SecureStore.getItemAsync("irmaosderua-refreshTokenExpiration");

    if(!tokenExpiration || !refreshTokenExpiration) {
        return false;
    }
    
    const currentDate = new Date();
    const tokenExpirationDate = new Date(tokenExpiration);
    const refreshTokenExpirationDate = new Date(tokenExpiration);

    if(currentDate > tokenExpirationDate || currentDate > refreshTokenExpirationDate) {
        return false;
    }

    return true;
}

const Clear = async () => {
    await SecureStore.deleteItemAsync("irmaosderua-token");
    await SecureStore.deleteItemAsync("irmaosderua-tokenExpiration");
    await SecureStore.deleteItemAsync("irmaosderua-refreshToken");
    await SecureStore.deleteItemAsync("irmaosderua-refreshTokenExpiration");
}

const StoreUser = async (userId, username, token, tokenExpiration, refreshToken, refreshTokenExpiration, roles) => {
    if(userId) {
        await SecureStore.setItemAsync("irmaosderua-userId", `${userId}`);
    }

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

    if(refreshTokenExpiration) {
        await SecureStore.setItemAsync("irmaosderua-refreshTokenExpiration", refreshTokenExpiration);
    }

    if(roles) {
        await SecureStore.setItemAsync("irmaosderua-roles", roles.join(","));
    }
}

const Profile = async (forceGet) => {
    try {
        const profilePicture = await SecureStore.getItemAsync("irmaosderua-picture");
        if(profilePicture && !forceGet){
            return {
                firstName: await SecureStore.getItemAsync("irmaosderua-firstName"),
                lastName: await SecureStore.getItemAsync("irmaosderua-lastName"),
                email: await SecureStore.getItemAsync("irmaosderua-email"),
                picture: await SecureStore.getItemAsync("irmaosderua-picture")
            }
        }

        const userId = await SecureStore.getItemAsync("irmaosderua-userId");
        if(!userId) {
            return null;
        }

        var response = await ApiService.get(`/account/${userId}/profile`, {
            headers: {
                'Authorization': `Bearer ${await GetToken()}`
            }
        });

        if(!response.data.errorMessage){
            var userProfile = {
                firstName: response.data.result.firstName,
                lastName: response.data.result.lastName,
                email: response.data.result.email,
                picture: `${ApiConfig.baseURL}/account/${userId}/profile-picture`
            }

            await SecureStore.setItemAsync("irmaosderua-firstName", userProfile.firstName);
            await SecureStore.setItemAsync("irmaosderua-lastName", userProfile.lastName);
            await SecureStore.setItemAsync("irmaosderua-email", userProfile.email);
            await SecureStore.setItemAsync("irmaosderua-picture", userProfile.picture);

            return userProfile;
        }

        return null;
    } catch(err) {
        return null;
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

const GetToken = async () => {
    try {
        const currentDate = new Date();

        if(IsTokenAlive) {
            const expiration = new Date(await SecureStore.getItemAsync("irmaosderua-tokenExpiration"));
            if(expiration > currentDate){
                return await SecureStore.getItemAsync("irmaosderua-token")
            }

            const refreshTokenExpiration = new Date(await SecureStore.getItemAsync("irmaosderua-refreshTokenExpiration"));
            if(refreshTokenExpiration > currentDate){
                let userName = await SecureStore.getItemAsync("irmaosderua-username");
                let response = await ApiService.post(`/auth`, {
                    UserName: userName,
                    GrantType: 'refresh_token',
                    RefreshToken: await SecureStore.getItemAsync("irmaosderua-refreshToken")
                });

                if(response.data.errorMessage) {
                    return null;
                }

                await StoreUser(response.data.result.userId, data.email, 
                    response.data.result.token, 
                    response.data.result.expiration, 
                    response.data.result.refreshToken, 
                    response.data.result.refreshTokenExpiration, 
                    response.data.result.roles);

                return response.data.result.token;
            }
        } else {
            return null;
        }
    } catch(err){
        return null;
    }
}

export {
    StoreUser,
    User,
    Profile,
    IsTokenAlive,
    Clear,
    GetToken
}