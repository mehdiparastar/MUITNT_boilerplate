import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrement, increment, reset, incrementByAmount, selectCount } from './counterSlice';

export function Counter() {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector(selectCount)
    const dispatch = useAppDispatch()
    const [increamentAmount, setIncrementAmount] = useState<number>(0)

    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset())
    }

    return (
        <Box component={'section'} >
            <Typography component={'p'}>{count}</Typography>
            <Box justifyContent="center" display={'flex'} alignItems="center">
                <Stack direction={'row'}>
                    <IconButton onClick={() => dispatch(increment())}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(decrement())}>
                        <RemoveIcon />
                    </IconButton>
                </Stack>
            </Box>
            <Box justifyContent="center" display={'flex'} alignItems="center">
                <TextField type={'number'} value={increamentAmount} onChange={e => setIncrementAmount(Number(e.target.value))} label="" />
                <Button onClick={() => dispatch(incrementByAmount(increamentAmount))}>Add Amount</Button>
            </Box>
            <Button onClick={resetAll}>Reset</Button>
        </Box>
    )
    // omit rendering logic
}