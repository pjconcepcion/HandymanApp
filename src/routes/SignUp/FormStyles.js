const styles = {
    background:{
        flex: 1,
        backgroundColor: '#0288D1',
    },
    header:{
        paddingTop: 35,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText:{
        color: 'white',
        fontSize: 20,
    },
    validation:{
        position: 'absolute',
        right: 0,
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    formContainer:{
        width: '90%',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 5,
        borderColor: 'white',
        borderWidth: 1,
    },
    formInput:{        
        color: 'white',
        fontSize: 18,
        borderBottomColor: '#BBDEFB',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    pickerStyle:{
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    dropdownContainer:{
        marginTop: -10, 
        marginHorizontal: 3,        
    },   
    btnSubmit:{
        backgroundColor: '#FFC107',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 4,
    },
    btnContainer:{        
        width: '90%',
        borderRadius: 4,
        padding: 10,
    }
}

export default styles;