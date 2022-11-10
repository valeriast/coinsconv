import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'

import api from './src/services/api'

import Picker from './src/components/Picker';

export default function App(){

  const [moedas, setMoedas] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaExibicao, setMoedaExibicao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moedaBValor, setMoedaBValor] = useState(0)

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(()=>{
    async function loadMoedas(){
      const response = await api.get('all');
      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })

      setMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();

  },[])

  async function converter(){
    if ( moedaSelecionada === null || moedaBValor === 0 ){
      alert("Porfavor selecione uma moeda");
      return;
    }

    const response = await api.get(`all/${moedaSelecionada}-BRL`)
  
    let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    setValorMoeda(moedaBValor);
    setMoedaExibicao(moedaSelecionada);
    Keyboard.dismiss();
  }

  if (loading){
    return(
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <ActivityIndicator
        color='blue' size={45}
     />
  </View>);
  }else{
    return(
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione uma moeda</Text>
          <Picker moedas={moedas} onChange={ (moeda) => setMoedaSelecionada(moeda)}/>
        </View>
  
        <View style={styles.areaValor}>
          <Text style={styles.titulo}>Digite um valor para converter em R$</Text>
          <TextInput
            style={styles.input}
            placeholder='Exemplo: 150'
            keyboardType='numeric'
            onChangeText={(value) => setMoedaBValor(value)}
          />
        </View>
        <TouchableOpacity style={styles.buttonArea} onPress={converter}>
          <Text style={styles.btntexto}>Converter</Text>
        </TouchableOpacity>
  
        {valorConvertido != 0 && (
          <View style={styles.areaResultado}>
          <Text style={styles.valorConvertido}>{valorMoeda} {moedaExibicao}</Text>
          <Text 
            style={[styles.valorConvertido,{fontSize: 18, margin: 10 }]}
          >Corresponde à</Text>
          <Text style={styles.valorConvertido}>{valorConvertido}</Text>
          </View>
        )}

        
  
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 40
  },
  areaMoeda:{
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1
  },
  titulo:{
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5
  },
  areaValor:{
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingBottom: 9,
    paddingTop: 9
  },
  input:{
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: 'black'
  },
  buttonArea:{
    width: '90%',
    backgroundColor: '#FB4B57',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btntexto:{
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  areaResultado:{
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  valorConvertido:{
    fontSize: 39,
    fontWeight: 'bold',
    color: '#000'
  }
  
})