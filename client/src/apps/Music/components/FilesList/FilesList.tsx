import { Box, Pagination, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { PageLoader } from 'components/PageLoader/PageLoader'
import { IMusicFile } from 'models/MUSICS_APP/musicFile.model'
import { ITag } from 'models/TAGS/tag.model'
import React, { useEffect, useState } from 'react'
import { useGetAllMusicFilesQuery } from 'redux/features/MUSIC_APP/musicsApiSlice'
import MusicFilesExcerpt from './components/MusicFilesExcerpt'
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import { IMusicSocket } from 'models/MUSICS_APP/musicSocket.model'

type Props = {
    privateFilter: boolean,
    tagsFilter: ITag[],
    uploadingProgress: { [key: string]: number },
    socketData: IMusicSocket
}

const FilesList = (props: Props) => {
    const limit = 2
    const [page, setPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);

    const skipQry = `skip=${skip}`
    const limitQry = `limit=${limit}`
    const isPrivateQry = `isPrivate=${props.privateFilter}`
    const tagsQry = props.tagsFilter.length > 0 ? `tagsFilter=${props.tagsFilter.map(item => item.id)}` : undefined
    const qry = [skipQry, limitQry, isPrivateQry, tagsQry].filter(item => item !== undefined).join('&&')

    const { data: currentUser = null } = useGetCurrentUserQuery()

    const { data: paginatedFiles = { data: [], count: 0 }, isLoading } = useGetAllMusicFilesQuery({ qry })

    const allFilesCount = paginatedFiles.count
    const files = paginatedFiles.data

    const count = Math.ceil(allFilesCount / limit)

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        setSkip((value - 1) * limit);
    };


    const renderedFiles = files.map((file: IMusicFile) => {

        const socketFile = (Object.fromEntries(Object.entries(props.socketData)
            .filter(([key, value]) => value.fileInfo.id === file.id)))[file.name]?.fileInfo;

        const transformedSocketFile =
            ('createdAt' in (socketFile || {})) ?
                {
                    ...socketFile,
                    createdAt: new Date(socketFile.createdAt),
                    updatedAt: new Date(socketFile.updatedAt),
                }
                :
                (socketFile || {})

        
        return <MusicFilesExcerpt
            key={file.id}
            file={{ ...file, ...transformedSocketFile }}
            uploadingProgress={props.uploadingProgress}
            currentUser={currentUser}
        />
    })

    useEffect(() => {
        setPage(1);
        setSkip((1 - 1) * limit);
    }, [isPrivateQry, tagsQry])

    return (
        <Box component={'section'} >
            {isLoading && <PageLoader />}
            <Stack spacing={1}>
                <Typography variant='h6' sx={{ textAlign: 'right', textDecoration: 'underline' }}>All: {allFilesCount}</Typography>
                <Grid container spacing={2}>
                    {renderedFiles}
                </Grid>
                <br />
                <Pagination
                    sx={{ display: 'flex', width: 1, justifyContent: 'center' }}
                    variant="outlined"
                    shape="rounded"
                    count={count}
                    page={page}
                    onChange={handleChangePage}
                />
            </Stack>
        </Box>
    )
}

export default FilesList