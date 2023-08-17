import { View, Text } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'

interface WelcomeScreenProps extends AppStackScreenProps<'Welcome'> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ padding: 16 }}>
                <Text style={{ color: '#ccc' }}>Welcome</Text>
            </View>
        </View>
    )
}
