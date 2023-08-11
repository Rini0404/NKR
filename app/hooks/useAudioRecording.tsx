import { useState, useEffect } from 'react'
import { Audio } from 'expo-av'



const useAudioRecording = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [error, setError] = useState<Error | null>(null)

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
            
            setIsRecording(false)
            
            

        }
    }
    
    
    const playRecording = async () => {
        if (sound) {
            await sound.playAsync()
        }
    }

    // Cleanup: stop recording if component is unmounted
    useEffect(() => {
        return () => {
            if (isRecording && recording) {
                recording.stopAndUnloadAsync()
            }
        }
    }, [recording, isRecording])

    return {
        recording,
        isRecording,
        startRecording,
        stopRecording,
        playRecording,
        error
    }
}

export default useAudioRecording
