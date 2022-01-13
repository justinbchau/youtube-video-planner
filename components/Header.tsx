import React, { useState } from 'react'
import { Button, Header, TextInput, Modal } from '@mantine/core'
import { gql, useMutation } from '@apollo/client';

const ADD_VIDEO = gql`
    mutation createVideo($title: String!) {
        createVideo(title: $title) {
            title
          }
    }
`

const GET_VIDEOS = gql`
query getVideos {
    getVideos {
        id
        title
        published
    }
}
`

export function MyHeader() {
    const [value, setValue] = useState('')
    const [opened, setOpened] = useState(false)

    const [createVideo, { data, loading, error }] = useMutation(ADD_VIDEO, {
        refetchQueries: [
            {
                query: GET_VIDEOS
            }
        ]
    });

    const handleSubmit = () => {
        createVideo({ variables: { title: value } });
        setValue('');
        setOpened(false)
    }


    return (
        <>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", flexDirection: 'row' }} height={70} padding="lg">

                <h1 style={{ alignItems: 'flex-start' }} >YouTube Video Planner</h1>
                <div style={{ display: 'flex', alignItems: 'flex-end' }} >
                    <Button onClick={() => setOpened(true)}>Add a video</Button>
                </div>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Add your video"
                >
                    <TextInput mb={10} value={value} onChange={(event) => setValue(event.target.value)} label="Video Title" />
                    <Button fullWidth onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal>
            </Header>
        </>
    )
}