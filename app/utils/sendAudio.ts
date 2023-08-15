import { io, Socket } from 'socket.io-client'
import * as FileSystem from 'expo-file-system'
import { SOCKET_URL } from '../api/baseUrl'

const socket: Socket = io(SOCKET_URL) // Replace with your server address and port

export async function sendAudioToServer(uri: string) {
    console.log('Sending audio data to server...')
    try {
        const audioData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

        if (socket.connected) {
            socket.emit('audio_chunk', audioData)
            console.log('Audio data sent to server.')
        } else {
            console.error('Socket isn\'t connected. Can\'t send audio data.')
        }
    } catch (error) {
        console.error('Error reading or sending audio data:', error)
    }
}
