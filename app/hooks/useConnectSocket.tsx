import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'


type Url = string;

function useSocketIo(url: Url) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        
        const socketConnection = io(url)

        socketConnection.on('connect', () => {
            console.log('connected')
        })

        socketConnection.on('transcription', (message: string) => {
            
            setMessage(message)
        }
        )

        setSocket(socketConnection)



    }, [url])

    return { socket, message, }
}

export default useSocketIo
