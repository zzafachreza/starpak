import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList, Pressable,
  TouchableWithoutFeedback,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';

import LottieView from 'lottie-react-native';
import { getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyInput, MyGap, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { showMessage } from 'react-native-flash-message';
import { color } from 'react-native-reanimated';

export default function Checkout({ navigation, route }) {
  const item = route.params;
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [company, setCompany] = useState({});
  const [paket, setPaket] = useState([]);

  const [kirim, setKirim] = useState(route.params);
  const [user, setUser] = useState({});
  const [kurir, setKurir] = useState([
    {
      nama_kirim: 'Antar',
    },
    {
      nama_kirim: 'Ambil Sendiri',
    }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getData('user').then(res => {
      console.error(res)
      setUser(res);
      setKirim({
        ...kirim,
        pengiriman: 'Antar',
        keterangan: '',
        harga_admin: 5000,
      })
    });



  }, []);



  const simpan = () => {
    console.error('kirim', kirim);
    navigation.navigate('Bayar', kirim)

  };

  const [pilih, setPilih] = useState({
    a: true,
    b: false
  })

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background1 }}>
        <ScrollView>

          {/* data penerima */}

          <View style={{
            backgroundColor: colors.zavalabs,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border_list,
          }}>
            <Text style={{
              color: colors.textPrimary,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30
            }}>Nama Pemesan</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
              color: colors.textPrimary,

            }}>{user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
              color: colors.textPrimary
            }}>{user.telepon}</Text>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
              color: colors.textPrimary
            }}>{user.alamat}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border_list,

            }}>
            <Text
              style={{
                flex: 1,
                color: colors.textPrimary,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Total Transaksi
            </Text>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              Rp. {new Intl.NumberFormat().format(kirim.harga_total)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border_list,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.textPrimary,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Biaya Administrasi
            </Text>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              Rp. {new Intl.NumberFormat().format(kirim.harga_admin)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border_list,

            }}>
            <Text
              style={{
                flex: 1,
                color: colors.textPrimary,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Total Berat
            </Text>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              {new Intl.NumberFormat().format(kirim.berat_total)} kg
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              flexDirection: 'row',
              borderBottomColor: colors.border_list,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.textPrimary,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Opsi Pengiriman
            </Text>

            <View style={{
              padding: 10,
              flexDirection: 'row'
            }}>
              <TouchableOpacity onPress={() => {
                setPilih({
                  b: false,
                  a: true
                });
                setKirim({
                  ...kirim,
                  pengiriman: 'Antar',
                })
              }} style={{
                marginHorizontal: 5,
                borderRadius: 5,
                backgroundColor: pilih.a ? colors.primary : colors.border,
                padding: 5,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: colors.white,
                  fontSize: windowWidth / 30,
                  fontFamily: fonts.secondary[600],
                }}>Antar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                setPilih({
                  b: true,
                  a: false
                });

                setKirim({
                  ...kirim,
                  pengiriman: 'Ambil Sendiri',
                })
              }} style={{
                marginHorizontal: 5,
                borderRadius: 5,
                backgroundColor: pilih.b ? colors.primary : colors.border,
                padding: 5,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: colors.white,
                  fontSize: windowWidth / 30,
                  fontFamily: fonts.secondary[600],
                }}>Ambil Sendiri</Text>
              </TouchableOpacity>
            </View>



          </View>

          <View style={{
            padding: 10,
          }}>
            <MyInput onChangeText={x => setKirim({
              ...kirim,
              keterangan: x
            })} iconname="create" label="Catatan untuk Pesanan" />
          </View>



        </ScrollView>
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              color: colors.textPrimary,
              fontSize: windowWidth / 30,
              fontFamily: fonts.secondary[400],
              padding: 10,
            }}>
            Total Pembayaran
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: windowWidth / 20,
              fontFamily: fonts.secondary[600],
              padding: 10,
            }}>


            Rp. {new Intl.NumberFormat().format(kirim.harga_total + kirim.harga_admin)}
          </Text>
        </View>

        <View style={{ padding: 10, backgroundColor: colors.white, }}>
          <MyButton
            onPress={simpan}
            title="PEMBAYARAN"
            warna={colors.primary}
            Icons="cloud-upload"
            style={{
              justifyContent: 'flex-end',
            }}
          />
        </View>




      </SafeAreaView>
      {
        loading && (
          <LottieView
            source={require('../../assets/animation.json')}
            autoPlay
            loop
            style={{ backgroundColor: colors.primary }}
          />
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    flex: 1,
    marginBottom: 15,
    textAlign: "center"
  }
});
