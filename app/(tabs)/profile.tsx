import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";

const Profile = () => {
	return (
		<SafeAreaView className="bg-white h-full">
			<View className="pb-28 px-5 pt-5">
				<CustomHeader title="Profile" />

			</View>
		</SafeAreaView>
	)
}
export default Profile
