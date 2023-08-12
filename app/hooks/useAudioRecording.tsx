import { useState, useEffect } from 'react'
import { Audio } from 'expo-av'



const useAudioRecording = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [wasStoppedManually, setWasStoppedManually] = useState(false)

    const startRecording = async () => {
        try {

            const partialMode = {
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }

            await Audio.setAudioModeAsync(partialMode)

            const recording = new Audio.Recording()
            await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            await recording.startAsync()
            setRecording(recording)
            setIsRecording(true)
        } catch (err: unknown) {
            if (error instanceof Error) {
                setError(err as Error)
                console.log('Error: ', error.message)
            } else {
                setError(new Error('Unknown error'))
            }
        }
    }


    const [sound, setSound] = useState<Audio.Sound | null>(null)

    const stopRecording = async () => {
        if (recording) {
            await recording.stopAndUnloadAsync()
            
            const uri = recording.getURI()

            console.log('Recording stopped and stored at', uri)
            const { sound } = await recording.createNewLoadedSoundAsync()
            setSound(sound)
            setIsRecording(false)
            setWasStoppedManually(true)
            

        }
    }
    
    
    const playRecording = async () => {
        console.log('Attempting to play sound')
        if (sound) {
            console.log('Sound is available')
            await sound.playAsync()
            console.log('Playing Sound')
        } else {
            console.log('No sound available')
        }
    }    


    return {
        recording,
        isRecording,
        startRecording,
        stopRecording,
        playRecording,
        wasStoppedManually,
        error
    }
}

export default useAudioRecording
