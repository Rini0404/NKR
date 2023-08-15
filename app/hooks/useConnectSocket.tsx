import { useState, useEffect } from 'react'

type url = string

// Custom hook to manage WebSocket connections
function useWebSocket(url: url) {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        const ws = new WebSocket(url)

        ws.onopen = () => {
            console.log('Socket opened')
        }

        ws.onmessage = (event) => {
            setMessage(event.data)
        }

        ws.onclose = () => {
            console.log('Socket closed')
        }

        ws.onerror = (error) => {
            console.error('WebSocket error: ', error)
        }

        setSocket(ws)

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }
    }, [url])

    const sendMessage = (data: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(data)
        }
    }

    return { socket, message, sendMessage }
}

export default useWebSocket
