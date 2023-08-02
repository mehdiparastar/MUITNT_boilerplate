export function getKeysWithValueOne(obj: { [key: string]: any }, filterValue: any) {
    return Object.entries(obj).reduce((acc: string[], [key, value]: [string, number]) => {
        if (value === filterValue) {
            acc.push(key);
        }
        return acc;
    }, []);
}