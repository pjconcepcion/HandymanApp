const styles = {
    container: {
        flex: 1,
        backgroundColor: '#0288D1',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    header:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,  
    },
    logo:{
        width: 125,
        height: 125
    },
    loginForm:{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',   
    },
    signUp:{
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-end',
    },
    txtInput:{
        backgroundColor: '#BBDEFB',
        width: '80%',
        marginVertical: 7,
        padding: 10,
        borderRadius: 4,
    },
    btnLogin:{
        backgroundColor: '#FFC107',
        width: '80%',
        padding: 10,
        borderRadius: 4,
        marginVertical: 7,
    },
    btnLoginText:{
        textAlign: 'center',
        fontSize: 16,
        color: '#263238',
    }
}

export default styles;