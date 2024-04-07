/**
 * Arquivo de configuração para que todas as telas da aplicação
 * possam ter o acesso ao Tailwind. Este arquivo serve para não
 * precisarmos clocar o import do global.css em cada arquivo de
 * tela.
 * 
 * Retorna "Slot" que repassa todas as rotas, toda a estrutura
 * de navegação da aplicação.
 */

import '@/styles/global.css'

import { Slot } from 'expo-router'

import { Loading } from '@/components/Loading'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) return <Loading />

  return <Slot />
}