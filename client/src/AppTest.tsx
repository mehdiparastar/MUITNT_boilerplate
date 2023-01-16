import React, { useEffect, useState } from 'react'

type Props = {}

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

const AppTest = (props: Props) => {
    // const { setLoadingPersist } = useAuth()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await sleep(2000);
            setLoading(false)
        }

        fetchData();
    }, [setLoading])
    return (
        <div>AppTest</div>
    )
}

export default AppTest