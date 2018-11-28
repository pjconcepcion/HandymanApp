const styles = {
    container:{
        backgroundColor: '#0288D1',
        padding: 10,
    },
    header:{
        flexDirection: 'row',
    },
    avatarContainer:{
        flex: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCloseContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 5
    },
    contentContainer:{
        paddingVertical: 10,      
        maxHeight: '75%',
    },
    txtTitle:{
        color: 'white',
        fontSize: 18,
    },
    txtSubtitle:{
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 'normal'
    },
    btnContainer:{
        backgroundColor: '#FFC107',
        borderRadius: 2,
        marginVertical: 3,
    },
    btnClose:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20, 
    },
}

export default styles;