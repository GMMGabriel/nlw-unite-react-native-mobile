import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg disabled:opacity-50"
      activeOpacity={0.7}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator className='text-green-500' />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}