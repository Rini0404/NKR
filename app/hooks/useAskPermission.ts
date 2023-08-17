import { useState, useCallback } from 'react'
import { Alert } from 'react-native'
import { Audio } from 'expo-av'

const useAudioPermission = () => {
    const [isPermissionGranted, setPermissionGranted] = useState(false)

    const requestPermission = useCallback(async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync()

            if (status === 'granted') {
                setPermissionGranted(true)
            } else {
                Alert.alert('Error', 'Permission was denied. You cannot record audio.')
            }

        } catch (error) {
            Alert.alert('Error', 'Failed to request permission.')
        }
    }, [])

    return {
        isPermissionGranted,
        requestPermission
    }
}

export default useAudioPermission