import React, { useContext, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack';

import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';
import { Background } from '../components/Background';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ( { navigation }:Props ) => {

  const { signUp, errorMessage, removeError } = useContext( AuthContext );

  const { email, password, name, onChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0 ) {return;}
    
    Alert.alert(
      'Register incorrecto', errorMessage, [{
          text: 'Ok',
          onPress: () => removeError,
        }]
    );
  
  }, [ errorMessage ]); // eslint-disable-line react-hooks/exhaustive-deps

  const onRegister = () => {
    console.log({name, email, password});
    Keyboard.dismiss();

    signUp({ nombre: name, correo: email, password});
  };

  return (
    <>
        <Background/>

        <KeyboardAvoidingView
          style={{ flex:1, backgroundColor: '' }}
          behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
        >
          <View style={ loginStyles.formContainer }>

            <WhiteLogo/>

            <Text style={ loginStyles.title }>Registro</Text>

            <Text style={ loginStyles.label }>Nombre: </Text>
            <TextInput
                placeholder="Ingrese su nombre..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                style={[
                  loginStyles.inputField,
                  ( Platform.OS === 'ios') && loginStyles.inpurFieldIOS,
                ]}
                selectionColor="white"

                onChangeText={ (value) => onChange(value, 'name') }
                value={name}
                onSubmitEditing={onRegister}

                autoCapitalize="words"
                autoCorrect={ false }
            />

            <Text style={ loginStyles.label }>Email: </Text>
            <TextInput
                placeholder="Ingrese email..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="email-address"
                underlineColorAndroid="white"
                style={[
                  loginStyles.inputField,
                  ( Platform.OS === 'ios') && loginStyles.inpurFieldIOS,
                ]}
                selectionColor="white"

                onChangeText={ (value) => onChange(value, 'email') }
                value={email}
                onSubmitEditing={onRegister}

                autoCapitalize="none"
                autoCorrect={ false }
            />

            <Text style={ loginStyles.label }>Contraseña: </Text>
            <TextInput
                placeholder="Ingrese contraseña..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry
                style={[
                  loginStyles.inputField,
                  ( Platform.OS === 'ios') && loginStyles.inpurFieldIOS,
                ]}
                selectionColor="white"
                
                onChangeText={ (value) => onChange(value, 'password') }
                value={password}
                onSubmitEditing={onRegister}

                autoCapitalize="none"
                autoCorrect={ false }
            />

            {/*Boton*/}
            <View style={loginStyles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={ 0.8 }
                  style={loginStyles.button}
                  onPress={ onRegister }
                >
                  <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
            </View>

            {/*Crear una nueva cuenta*/}
            <TouchableOpacity
              onPress={ () => navigation.replace('LoginScreen') }
              activeOpacity={ 0.8 }
              style={ loginStyles.buttonReturn }
            >
              <Text style={ loginStyles.buttonText }>Ir al Login</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
    </>
  );
};