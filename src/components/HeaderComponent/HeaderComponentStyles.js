import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = {
    container:{
        backgroundColor: '#0288D1',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        height: '16%',
        width
    },
    txtTitle:{
        fontSize: 22,
        color: 'white',
        paddingVertical: 15,
    }
}

export default styles;