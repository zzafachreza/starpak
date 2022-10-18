import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const [token, setToken] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    if (data.email.length === 0 && data.password.length === 0) {
      showMessage({
        message: 'Maaf email dan Password masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf email masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      setTimeout(() => {
        axios
          .post(urlAPI + '/login.php', data)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {
              showMessage({
                type: 'danger',
                message: res.data.msg,
              });
            } else {
              storeData('user', res.data);
              axios
                .post(urlAPI + 'update_token.php', {
                  id_member: res.data.id,
                  token: token,
                })
                .then(res => {
                  console.log('update token', res);
                });




              navigation.replace('MainApp');






            }
          });
      }, 1200);
    }
  };
  return (
    <ImageBackground source={require('../../assets/node.png')} style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 20,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            padding: 10,
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              // resizeMode: 'contain',
              width: 150,
              height: 150,
            }}
          />
          <Text style={{
            color: colors.primary,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 17
          }}>STAR-PAK</Text>
          <Text style={{
            color: colors.primary,
            maxWidth: '70%',
            textAlign: 'center',
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 28
          }}>Aplikasi Pendataan Peternak Dan Penjualan Kambing Cikakak</Text>
          <Text style={{
            marginTop: 30,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20
          }}>Masuk</Text>
        </View>
        <View style={styles.page}>
          <MyInput
            label="Email"
            iconname="mail"
            placeholder="Masukan alamat email"
            secureTextEntry={false}
            value={data.email}
            onChangeText={value =>
              setData({
                ...data,
                email: value,
              })
            }
          />

          <MyGap jarak={20} />
          <MyInput
            label="Password"
            iconname="key"
            placeholder="Masukan password"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          {valid && (
            <MyButton
              warna={colors.primary}
              title="LOGIN"
              Icons="log-in"
              onPress={masuk}
            />
          )}

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            padding: 10,
          }}>
            <Text style={{
              color: colors.primary,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28
            }}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{ backgroundColor: colors.primary }}
        />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Wa')} style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
      }}>
        <Text style={{
          color: colors.black,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 28
        }}>Admin Panel</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
