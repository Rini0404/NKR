import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import useSocketIo from '../../hooks/useConnectSocket'
import { SOCKET_URL } from '../../api/baseUrl'

export const SpeechToText = () => {
    const [messages, setMessages] = useState<string[]>([]) // State to maintain the last two messages
    const { message } = useSocketIo(SOCKET_URL)

    useEffect(() => {
        // Every time a new message comes in, we update our messages state
        if (message) {
            if (messages.length < 2) {
                // If we have less than 2 messages, just add the new message
                setMessages(prev => [...prev, message])
            } else {
                // If we have 2 messages, remove the oldest and add the new message
                setMessages(prev => [prev[1], message])
            }
        }
    }, [message])

    return (
        <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            {/* Render the messages */}
            {messages.map((msg, index) => (
                <Text
                    key={index}
                    style={{
                        fontSize: 20,
                        color: 'white',
                        textAlign: 'center',
                    }}>
                    {msg}
                </Text>
            ))}
        </View>
    )
}