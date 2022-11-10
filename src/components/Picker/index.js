import React from 'react';

import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props){
    const placeholder = {
        label: 'Escolha uma moeda..',
        value: null,
        color: '#000'
    }

    return(
        <RNPickerSelect
         placeholder={placeholder}
         items={props.moedas}
          onValueChange={ (value) => props.onChange(value) }
          style={{
            inputAndroid:{
                color: '#000'
            },
            inputIOS:{
                color: '#000'
            }
          }}
        />
    );
}