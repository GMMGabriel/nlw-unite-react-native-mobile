import { ActivityIndicator } from 'react-native'
import { colors } from '../styles/colors'

export function Loading({size = 4}: { size?: number; }) {
  return <ActivityIndicator
    className="flex-1 bg-green-500 items-center justify-center text-orange-500"
    size={16 * size}
  />
}