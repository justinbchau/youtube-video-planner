import React, { useState } from 'react'
import { Text, TextInput, Button, Modal, ActionIcon, Checkbox } from '@mantine/core'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { gql, useMutation } from '@apollo/client'

const TOGGLE_PUBLISHED = gql`
    mutation togglePublished($id: String!) {
        togglePublished(id: $id) {
            published
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

export function VideoItem(props: any) {
    const [opened, setOpened] = useState(false)
    const [videoTitle, setVideoTitle] = useState(props.data.title)

    const [togglePublished] = useMutation(TOGGLE_PUBLISHED, {
        refetchQueries: [
            {
                query: GET_VIDEOS
            }
        ]
    });

    const handleSubmit = () => {
        props.editTitle({ variables: { id: props.data.id, title: videoTitle } });
        setVideoTitle('');
        setOpened(false)
    }

    const toggleChecked = () => {
        togglePublished({ variables: { id: props.data.id } })
    }

    return (
        <>
            <tr style={{ marginBottom: '100px' }}>
                <td><Text>{props.data.title}</Text></td>
                <td><ActionIcon variant="transparent" onClick={() => setOpened(true)} style={{ display: 'flex' }}><Pencil2Icon /></ActionIcon></td>
                <td><Checkbox onClick={toggleChecked} checked={props.data.published} /> </td>
                <td><ActionIcon onClick={() => props.deleteVideo({ variables: { id: props.data.id } })}><TrashIcon /></ActionIcon></td>
            </tr>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Edit the title"
            >
                <TextInput mb={10} value={videoTitle} onChange={(event) => setVideoTitle(event.target.value)} label="Video Title" />
                <Button fullWidth onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal>
        </>
    )
}