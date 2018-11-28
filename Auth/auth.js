import {AsyncStorage} from 'react-native';

export async function onLogin(ID){
    await AsyncStorage.setItem('userID',ID);
}
export async function getID(){
    return await AsyncStorage.getItem('userID');
};
export const onLogout = () => AsyncStorage.clear();