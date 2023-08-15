import React from 'react'
import { Text, View } from 'react-native'
import useSocketIo from '../../hooks/useConnectSocket'
import { SOCKET_URL } from '../../api/baseUrl';

type SpeechToTextProps = {
    text: string;
}

export const SpeechToText: React.FC<SpeechToTextProps> = () => {

    const { message } = useSocketIo(SOCKET_URL)

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
