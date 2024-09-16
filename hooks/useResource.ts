import {useEffect, useState} from "react";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL

export type NetworkRequest<T> = [T, string | undefined, boolean]


export function useResource<T>(path: string, initialState: T): NetworkRequest<T> {

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string>()
    const [resource, setResource] = useState<T>(initialState);

    const fetchResource = async () => {
        await fetch(backendUrl + path)
            .then(r => r.json())
            .then(json => setResource(json))
            .catch(e => {
                console.log(e)
                setError(e.toString())
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchResource()
    }, [])

    return [resource, error, isLoading]

}