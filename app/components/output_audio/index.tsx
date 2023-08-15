import React from 'react'
import { Text, View } from 'react-native'
import useSocketIo from '../../hooks/useConnectSocket'

type SpeechToTextProps = {
    text: string;
}

export const SpeechToText: React.FC<SpeechToTextProps> = () => {

    const { message } = useSocketIo('ws://192.168.86.41:3000')

    return (
        <View style={{ paddingTop: 20,  justifyContent: 'center', alignItems: 'center' }}>
            <Text 
                style={{
                    fontSize: 24,
                    color: 'white',
                    textAlign: 'center',
                }}>
                {message}
            </Text>
        </View>
    ) 
}
