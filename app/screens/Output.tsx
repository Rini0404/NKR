import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import useAudioPermission from '../hooks/useAskPermission'
import useAudioRecording from '../hooks/useAudioRecording'
import { SpeechToText } from '../components/output_audio'

interface OutputProps extends AppStackScreenProps<'Output'> {}

export const Output: React.FC<OutputProps> = () => {
    const { isPermissionGranted, requestPermission } = useAudioPermission()
    
    const { 
        isRecording, 
        startRecording, 
        error,
    } = useAudioRecording()
  
    React.useEffect(() => {
        if (!isPermissionGranted) {
            requestPermission()
        } else if (!isRecording) {
            startRecording()
        }
    }, [isPermissionGranted])
    

    // Handle errors, if any
    React.useEffect(() => {
        if (error) {
            // Display error to user or log it
        }
    }, [error])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <SpeechToText 
                text={'Hello World!'}
            />

        </View>
    )
}