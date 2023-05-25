import { Box, Pagination, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { PageLoader } from 'components/PageLoader/PageLoader'
import { IMovieFile } from 'models/MOVIES_APP/movieFile.model'
import { ITag } from 'models/TAGS/tag.model'
import React, { useEffect, useState } from 'react'
import { useGetAllMovieFilesQuery } from 'redux/features/MOVIE_APP/moviesApiSlice'
import MovieFilesExcerpt from './components/MovieFilesExcerpt'

type Props = {
    privateFilter: boolean,
    tagsFilter: ITag[],
    uploadingProgress: { [key: string]: number }
}

const FilesList = (props: Props) => {
    const limit = 6
    const [page, setPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);

    const skipQry = `skip=${skip}`
    const limitQry = `limit=${limit}`
    const isPrivateQry = `isPrivate=${props.privateFilter}`
    const tagsQry = props.tagsFilter.length > 0 ? `tagsFilter=${props.tagsFilter.map(item => item.id)}` : undefined
    const qry = [skipQry, limitQry, isPrivateQry, tagsQry].filter(item => item !== undefined).join('&&')

    const { data: paginatedFiles = { data: [], count: 0 }, isLoading } = useGetAllMovieFilesQuery({ qry })

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

    const renderedFiles = files.map((file: IMovieFile) =>
        <MovieFilesExcerpt
            key={file.id}
            file={file}
            uploadingProgress={props.uploadingProgress}
        />)

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