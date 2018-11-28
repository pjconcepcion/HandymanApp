import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button';
import {CheckBox} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './FormStyles';

export const Form = ({form,setCheckbox,setRadioButton,setDropdown,setText,setRemarks,setTextboxCheck,setTextboxRadio}) => {

    function selectCheckbox(formIndex,index){
        setCheckbox(formIndex,index);
    }

    function selectRadioButton(formIndex,index,value){
        setRadioButton(formIndex,index,value);
    }

    function selectDropdown(formIndex,index,value){
        setDropdown(formIndex,index,value);
    }

    function onChangeText(formIndex,value){
        if(isNaN(value)){
            alert('Please enter a number');
            setText(formIndex,'');
        }else{
            setText(formIndex,value);
        }
    }

    function onChangeTextCheck(formIndex,index,value){
        if(isNaN(value)){
            alert('Please enter a number.');
            setText(formIndex,'');
        }else{
            setTextboxCheck(formIndex,index,value);
        }
    }

    function onChangeTextRadio(formIndex,index,value){
        if(isNaN(value)){
            alert('Please select a number.');
        }else{
            setTextboxRadio(formIndex,index,value);
        }
    }

    function onChangeRemarks(value){
        setRemarks(value)
    }

    function renderForm(value,formIndex){
        if(value.component == 'Checkbox'){
            return (
                value.choices.map((item,index) => 
                    <CheckBox 
                        key = {item.name}
                        title = {
                            <View style = {{flex: 1,flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style = {styles.optionText}> {item.name}</Text>
                                {item.unit? 
                                    <TextInput
                                        placeholder = {'Php' + item.amount + '/' + item.unit}
                                        placeholderTextColor = "rgba(255,255,255,0.5)"
                                        underlineColorAndroid = "transparent"
                                        style = {[styles.txtBoxCheck,{color: item.selected? 
                                            'white' :'rgba(255,255,255,0.5)'}]}
                                        onChangeText = {(text) => onChangeTextCheck(formIndex,index,text)}
                                        keyboardType = {'numeric'} 
                                        editable = {item.selected}
                                    />
                                    : <Text style = {styles.amount}>Php {item.amount}</Text>
                                }
                            </View>
                        }
                        onPress = {() => selectCheckbox(formIndex,index)} 
                        checked = {item.selected}      
                        checkedIcon = 'check-square'
                        checkedColor = '#FFC107'
                        uncheckedIcon = 'square'
                        uncheckedColor = "white"
                        containerStyle = {styles.chkBoxContainer}
                        textStyle = {styles.optionText}          
                    />
                )
            );
        }
        else if(value.component == 'RadioButton'){
            return (
                <RadioGroup
                    size = {24}
                    thickness = {2}
                    color = 'white'
                    activeColor = '#FFC107'
                    onSelect = {(index, value) => selectRadioButton(formIndex,index,value)}
                    style = {styles.radioGroup}
                >
                    {value.choices.map((item,index) =>
                       <RadioButton key = {item.name} value = {{id: item.id,value: item.name}}>
                            <View style = {{flex: 1,flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style = {styles.optionText}> {item.name}</Text>
                                {item.unit? 
                                    <TextInput
                                        placeholder = {'Php' + item.amount + '/' + item.unit}
                                        placeholderTextColor = "rgba(0,0,0,0.5)"
                                        underlineColorAndroid = "transparent"
                                        style = {[styles.txtBoxRadio,{color: value.selected.id == item.id? 
                                            'white' :'rgba(0,0,0,0.5)', backgroundColor: value.selected.id == item.id? 
                                            'transparent' : '#ecf0f1'}]}
                                        onChangeText = {(text) => onChangeTextRadio(formIndex,index,text)}
                                        keyboardType = {'numeric'} 
                                        editable = {value.selected.id == item.id? true : false}
                                    />
                                    : <Text style = {styles.amountRadio}>Php {item.amount}</Text>
                                }
                            </View>
                       </RadioButton>
                    )}
                </RadioGroup>
            );
        }
        else if(value.component == 'Dropdown'){
            return (
                <View style = {styles.formContainer}>                
                    <Dropdown 
                        data = {value.choices}
                        baseColor = 'white'
                        textColor = 'white'
                        itemColor = 'white'
                        fontSize = {20}
                        containerStyle = {styles.dropdownContainer}
                        pickerStyle = {styles.pickerStyle}
                        itemCount = {3}
                        onChangeText = {(value,index) => selectDropdown(formIndex,index,value)}
                    />                    
                    <Text style = {styles.amount}> Php {value.selected.amount? value.selected.amount : '0'} </Text>
                </View>
            );
        }
        else if(value.component == 'Textbox'){
            return (
                <View style = {styles.measurementContainer}>
                    <TextInput
                        placeholder = "Enter number"
                        placeholderTextColor = "rgba(255,255,255,0.5)"
                        style = {styles.txtInput}
                        underlineColorAndroid = "transparent"
                        onChangeText = {(text) => onChangeText(formIndex,text)}
                    />
                    <Text style = {styles.amount}> Php {value.choices[0].amount +'/'+value.choices[0].value} </Text>
                </View>
            );
        }
    }

    return(
        <ScrollView style = {styles.container}>   
            <View>                        
                {form && form.map((value,index) => 
                    <View key = {value.title} style = {styles.blkContainer}>
                        <Text style = {styles.optionText}> {value.title} </Text>
                        <View>
                            {renderForm(value,index)}
                        </View>
                    </View>
                )}
                <View style = {styles.remarks}>                        
                    <Text style = {styles.optionText}> Remarks: </Text>
                    <TextInput
                        placeholder = "Additional Info"
                        placeholderTextColor = "rgba(255,255,255,0.5)"
                        style = {styles.txtRemarks}
                        underlineColorAndroid = "transparent"
                        onChangeText = {(text) => onChangeRemarks(text)}
                        multiline = {true}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default Form;


