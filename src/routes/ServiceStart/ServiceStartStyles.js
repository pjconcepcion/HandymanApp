const styles = {    
    container:{
        flex: 1,
        backgroundColor: '#0288D1',
    },
    headerContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    headerTitle:{
        fontSize: 22,
        color: 'white',
    },
    headerContent:{
        fontSize: 50,
        color: '#FFC107',
        textShadowOffset: {
            width: 2,
            height: 2,
        },
        textShadowColor: 'rgba(0,0,0,0.5)',
    },
    headerSubtitle:{        
        fontSize: 25,
        color: 'white',
    },
    headerWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    bookingContainer:{
        borderTopWidth: 2,
        borderTopColor: 'white',
    },
    bookItem:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    bookTitle:{
        fontSize: 20,
        color: 'white'
    },
    bookContent:{
        fontSize: 20,
        color: 'white'
    },
    btnContainer:{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    btnWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 35,
        borderTopWidth: 4,
    },
    btnRed:{
        backgroundColor: '#e74c3c',
    },
    btnGreen:{
        backgroundColor: '#8BC34A',
    },
    btnText:{
        fontSize: 20,
        color: 'white',        
    },
    modalContainer:{
        backgroundColor: '#0288D1',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 4,
    },
    modalText:{
        fontSize: 20,   
        color: 'white'     
    },
    btnModalContainer:{        
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    btnModal:{        
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 35,
        width: '40%',
    },
    txtTitle:{
        fontSize: 23,
        color: 'white'
    },
    txtInput:{
        color: 'white',
        fontSize: 18,
        borderColor: '#BBDEFB',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    dropdownButton:{
        fontSize: 18,
        color: 'white'
    },
    dropdownList:{
        width: '75%',
    },
    dropdownText:{
        fontSize: 18,
    },
    formButtonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 3,
        marginHorizontal: 3,
        backgroundColor: '#e74c3c',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,  
    },
    btnReportContainer:{
        paddingVertical: 3,
    },
}

export default styles;