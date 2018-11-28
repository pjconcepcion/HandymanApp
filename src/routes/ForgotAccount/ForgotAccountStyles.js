const styles = {
    container:{
        flex: 1,
        backgroundColor: '#0288D1',
        justifyContent: 'flex-start',
    },
    header:{
        paddingTop: 35,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    form:{
        paddingHorizontal: 20,
    },
    searchForm:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,        
    },
    txtInput:{        
        color: 'white',
        fontSize: 18,
        width: '80%',
        borderBottomColor: '#BBDEFB',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    btn:{
        backgroundColor: '#FFC107',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    formQuestion:{
        justifyContent: 'center',
    },
    questionText:{
        color: 'white',
        fontSize: 18
    },
    resetPassword:{
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    resetForm:{
        justifyContent: 'center',        
        alignItems: 'center',
        paddingVertical: 10,
    },    
    txtPassword:{  
        color: 'white',
        fontSize: 18,
        width: '100%',
        borderBottomColor: '#BBDEFB',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginVertical: 5,
    },
    btnSubmit:{
        backgroundColor: '#FFC107',
        paddingVertical: 5,
        paddingHorizontal: 30,
    }
}

export default styles;