import { useState } from 'react'
import { Audio } from 'expo-av'
import { sendAudioToServer } from '../utils/sendAudio'



const useAudioRecording = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    
    const recordChunk = async (rec: Audio.Recording) => {
        console.log('recordChunk called')
        await rec.stopAndUnloadAsync()

        const uri = rec.getURI()
        sendAudioToServer(uri as string)

        // Start a new recording immediately
        await startRecording()
    }

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
            
            // Set a timeout to stop this recording after a short duration
            setTimeout(() => recordChunk(recording), 1000) // pass the recording object
            
            
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

    return {
        recording,
        isRecording,
        startRecording,
        error
    }
}

export default useAudioRecording