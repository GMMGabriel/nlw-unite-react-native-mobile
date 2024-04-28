import { useState } from 'react'
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Share,
  // ToastAndroid,
} from 'react-native'
import { MotiView } from 'moti'
import { Redirect } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { useBadgeStore } from '@/store/badge-store'

import { Header } from '@/components/Header'
import { Credential } from '@/components/Credential'
import { Button } from '@/components/Button'
import { QRCode } from '@/components/Qrcode'

import { colors } from '@/styles/colors'

export default function Ticket() {
  const badgeStore = useBadgeStore()

  const [expandQRCode, setExpandQRCode] = useState(false)

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL
        })
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Compartilhar', 'Não foi pssível compartilhar')
    }
  }

  async function handleSelectImage() {
    // ToastAndroid.show('teste', 500)
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri)
        // setImage(result.assets.)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href={'/'} />
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle='light-content' />
      <Header title='Minha Credencial' />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* CREDENCIAL */}
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 700
          }}
        >
          <FontAwesome
            name='angle-double-down'
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text
          className="text-white font-bold text-2xl mt-4"
        >
          Compartilhar credencial
        </Text>

        <Text
          className="text-white font-regular text-base mt-1 mb-6"
        >
          Mostre ao mundo que você vai participar do {badgeStore.data.eventTitle}!
        </Text>

        <Button
          title="Compartilhar"
          onPress={handleShare}
        />

        <TouchableOpacity
          className="mt-10"
          activeOpacity={0.7}
          onPress={badgeStore.remove}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType='fade'>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <QRCode value={badgeStore.data.checkInURL} size={250} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
            className='mt-10'
          >
            <Text className="font-body text-orange-500 text-base">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}