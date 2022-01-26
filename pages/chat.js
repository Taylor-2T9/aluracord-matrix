import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [message, setMessage] = React.useState()
    const [messageList, setMessageList] = React.useState([])
    function handleNewMessage(text) {
        const message = {
            id: messageList.length - 1,
            from: 'Taylor-2T9',
            text
        }
        if (message.text.substr(-1) != ' ') {
            setMessageList([
                message,
                ...messageList
            ])
            setMessage('')
        }
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.pinimg.com/originals/17/0c/6a/170c6a2d3817b80630704114ca8ce5c3.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messageList={messageList} setMessageList={setMessageList} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            onChange={(ev) => {
                                const newMessage = ev.target.value
                                setMessage(newMessage)
                            }}
                            onKeyPress={(evKey) => {
                                if (evKey.key === "Enter") {
                                    evKey.preventDefault()
                                    handleNewMessage(message)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '96%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            variant='primary'
                            colorVariant='neutral'
                            label='Enviar'
                            onClick={(evButton) => {
                                evButton.preventDefault()
                                if (message) {
                                    handleNewMessage(message)
                                }
                            }}
                            styleSheet={{
                                marginBottom: '5px',
                                padding: '10px 14px'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    function deleteMessage(messageId) {
        const newMessageList = props.messageList.filter((message) => {
            return messageId != message.id
        })
        return props.setMessageList(newMessageList)
    }
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messageList.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            position: 'relative',
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700]
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {message.text}
                        <Button
                            variant='tertiary'
                            colorVariant='neutral'
                            label='X'
                            onClick={(ev) => {
                                ev.preventDefault()
                                deleteMessage(message.id)
                            }}
                            styleSheet={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                height: '1%',
                                width: '2%',
                                color: appConfig.theme.colors.neutrals[400]
                            }}
                        />
                    </Text>
                );
            })}
        </Box>
    )
}