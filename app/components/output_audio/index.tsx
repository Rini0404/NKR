import React from 'react'
import useWebSocket from '../../hooks/useConnectSocket'
import { View } from 'react-native'

type SpeechToTextProps = {
    text: string;
}

export const SpeechToText: React.FC<SpeechToTextProps> = () => {

    const { message, sendMessage } = useWebSocket('ws://localhost:3000')

    return (
        <View>
            {message && <p>{message}</p>}
        </View>
    ) 
}
