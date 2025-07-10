import {View, Text, TextInput} from 'react-native'
import {useState} from 'react'
import {CustomInputProps} from "@/type";
import cn from "clsx";

const CustomInput = ({
	placeholder = "Enter Text",
	value,
	onChangeText,
	label,
	secureTextEntry = false,
	keyboardType = "default",
}: CustomInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	
	return (
		<View className="w-full">
			<Text className="label">{label}</Text>
			
			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				className={cn("input", isFocused ? "border-primary" : "border-gray-300")}
				placeholder={placeholder}
				placeholderTextColor="#888"
				value={value}
				onChangeText={onChangeText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
			/>
		</View>
	)
}
export default CustomInput
