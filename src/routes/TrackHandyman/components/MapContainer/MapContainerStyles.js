import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = {
    container:{
        flex: 1,
    },
    map:{
        flex: 1,
        width,
        height,
    }
}

export default styles;