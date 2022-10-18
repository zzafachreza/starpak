import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { Icon, ListItem, Button } from 'react-native-elements';
export default function Wa({ navigation }) {

  const WEBVIEW_REF = useRef();
  const [back, setBack] = useState(false);

  const onNavigationStateChange = (navState) => {
    console.log(navState.canGoBack);


    if (navState.canGoBack) {
      console.log('tidak baisa');


      BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          WEBVIEW_REF.current.goBack();
          return true;
        }
      )
    } else {
      // () => navigation.goBack()
      BackHandler.addEventListener(
        "hardwareBackPress", () => {
          // alert('oke');
          navigation.replace('Login')
          return true;
        })




    }

  }




  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <WebView onNavigationStateChange={onNavigationStateChange.bind(this)}
        ref={WEBVIEW_REF}
        source={{ uri: 'https://starpak.zavalabs.com' }} />
      <TouchableOpacity onPress={() => navigation.replace('Login')} style={{
        padding: 15,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Icon type='ionicon' name='grid' color={colors.white} size={windowWidth / 25} />
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.white,
          fontSize: windowWidth / 25,
          left: 5,
        }}>Kembali ke Halaman Aplikasi</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})