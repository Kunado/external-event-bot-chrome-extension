import { useState, useEffect } from 'react'
import './App.css'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'

const endpointURL = import.meta.env.VITE_SLACK_WEBHOOK_URL

type ExternalEvent = {
  url: string
  title: string
  date: string
  note: string
  location: string
}

const defaultExternalEvent = {
  url: '',
  title: '',
  date: '',
  note: '',
  location: '',
}

const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
  return tab
}

const getEventData = async () => {
  const tab = await getCurrentTab()
  const url = tab?.url
  const response = tab?.id ? await chrome.tabs.sendMessage(tab.id, {greeting: "hello"}) : undefined

  return {
    url: url ?? '',
    title: response?.title ?? '',
    date: response?.date ?? '',
    note: '',
    location: response?.location ?? '',
  }
}

const postExternalEventToSlack = async (extternalEvent: ExternalEvent) => {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(extternalEvent),
  })

  console.log(endpointURL)
  console.log(response)
}

const SendButton = styled(Button)({
  textTransform: 'none',
})

const App = () => {
  const [externalEvent, setExternalEvent] = useState<ExternalEvent>(defaultExternalEvent)

  useEffect(() => {
    (async() => {
      const eventData = await getEventData()
      setExternalEvent(eventData)
    })()
  }, []);

  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExternalEvent({ ...externalEvent, note: event.target.value })
  }

  return (
    <div className="App">
      <Container maxWidth="md">
        <TextField
          label="URL"
          variant="outlined"
          value={externalEvent.url}
          margin="dense"
          fullWidth
        />
        <TextField
          label="title"
          variant="outlined"
          value={externalEvent.title}
          margin="dense"
          fullWidth
        />
        <TextField
          label="date"
          variant="outlined"
          value={externalEvent.date}
          margin="dense"
          fullWidth
        />
        <TextField
          label="location"
          variant="outlined"
          value={externalEvent.location}
          margin="dense"
          fullWidth
        />
        <TextField
          onChange={handleChangeNote}
          label="note"
          variant="outlined"
          value={externalEvent.note}
          margin="dense"
          fullWidth
        />
        <SendButton variant="outlined" onClick={async () => { await postExternalEventToSlack(externalEvent) }} endIcon={<SendIcon />} disableRipple>
          Send
        </SendButton>
      </Container>
    </div>
  )
}

export default App
