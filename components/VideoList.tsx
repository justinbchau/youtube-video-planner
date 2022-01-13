import React, { useState } from 'react'
import { VideoItem } from './VideoItem'
import { Table, Button, TextInput, Text, Modal } from '@mantine/core'
import { gql, useQuery, useMutation } from '@apollo/client';


const GET_VIDEOS = gql`
query getVideos {
    getVideos {
        id
        title
        published
    }
}
`

const DELETE_VIDEO = gql`
mutation deleteVideo($id: String!) {
    deleteVideo(id: $id) {
        id
      }
}
`

const EDIT_TITLE = gql`
    mutation editTitle($id: String!, $title: String!) {
        editTitle(id: $id, title: $title) {
            title
        }
    }
`

export function VideoList(): JSX.Element {

    const { data } = useQuery(GET_VIDEOS);

    const [deleteVideo, { data: videoToDelete }] = useMutation(DELETE_VIDEO,
        {
            refetchQueries: [
                {
                    query: GET_VIDEOS
                }
            ]
        })

    const [editTitle] = useMutation(EDIT_TITLE, {
        refetchQueries: [
            {
                query: GET_VIDEOS
            }
        ]
    })




    const rows = data?.getVideos.map((data: any) => (
        <VideoItem key={data.id} data={data} editTitle={editTitle} deleteVideo={deleteVideo} />
    ));

    return (
        <>
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        {/* <th>Video number</th> */}
                        <th>Video name</th>
                        <th>Edit</th>
                        <th>Published?</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    )
}