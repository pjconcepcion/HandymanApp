import {Alert} from 'react-native';
import io from 'socket.io-client'
import localhost from '../util/localhost';
import {Actions} from 'react-native-router-flux';

const socket = io(localhost);

export function socketAction(action,data){
    if(action == 'login'){
        socket.emit('login',data);
    }
    else if(action == 'book'){
        socket.emit('book',data);
    }
    else if(action == 'find'){
        socket.emit('find',data);
    }
    else if(action == 'cancelRequest'){
        socket.emit('cancelRequest');
    }
    else if(action == 'acceptRequest'){
        socket.emit('acceptRequest',data);
    }
    else if(action == 'cancelBookRequest'){
        socket.emit('cancelBookRequest',data);
    }    
    else if(action == 'cancelTransaction'){
        socket.emit('cancelTransaction',data);
    }
    else if(action == 'messageUser'){
        socket.emit('messageUser',data);
    }
    else if(action == 'handymanArrived'){
        socket.emit('handymanArrived',data);
    }
    else if(action == 'serviceFinish'){
        socket.emit('serviceFinish',data);
    }
    else if(action == 'serviceCancel'){
        socket.emit('serviceCancel',data);
    }
    else if(action == 'socket'){
        return socket;
    }
}

socket.on('bookRequest',(data) => {
    Actions.push('bookingrequest',{data});
});  

socket.on('cancelToHandyman',() => {
    Actions.pop();
});

socket.on('cancelBookRequest', () => {
    Actions.pop();
})

socket.on('accepted', (data) => {
    socket.emit('joinChatRoom',data);
});

socket.on('joinedUsers', (data) => {
    Actions.push('trackhandyman',{data});
});

socket.on('newMessage',(data) => {
    Alert.alert('New Message',data,[
        {text: 'Ok', onPress: () => socket.emit('newMessageRead')}
    ],{cancelable: false})
})

socket.on('serviceStart',(data) => {
    Actions.push('servicestart',{data});
})

socket.on('endTransaction',(data) => {    
    socket.emit('leaveRoom',data);
})

socket.on('serviceCancel',(data) => {
    Alert.alert('Service cancelled.','The service was cancelled',[
        {text: 'Ok', onPress: () =>  socket.emit('leaveRoom',data)}
    ]);
})

socket.on('giveFeedback',(data) => {    
    Actions.push('feedback',{data});
})

socket.on('reasonMessage',(data) =>{
    Alert.alert('User cancel transaction',data.reasonBoxMessage, [
        {text: 'Ok', onPress: () => socket.emit('leaveRoom',data)}
    ])
})

socket.on('returnRoot',(pop) => {
    Actions[pop].call()
})