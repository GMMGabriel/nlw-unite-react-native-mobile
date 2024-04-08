import QRCodeSvg, { QRCodeProps } from 'react-native-qrcode-svg'

import { colors } from '@/styles/colors'

type QRCodeSvgProps = QRCodeProps & {
  value: string
  size: number
  withLogo?: boolean
}

export function QRCode({ value, size, withLogo = false, ...props }: QRCodeSvgProps) {
  return (
    <QRCodeSvg
      value={value}
      size={size}
      color={colors.white}
      backgroundColor='transparent'
      logo={withLogo ? require('../../assets/images/icon.png') : undefined}
      {...props}
    />
  )
}