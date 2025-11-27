import {useEffect, useState} from "react";

export const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL

export type NetworkRequest<T> = [T, string | undefined, boolean]


export function useResource<T>(path: string, initialState: T, props?: {loadTime?: number, method?: 'POST' | 'GET', postHook?: () => void}): NetworkRequest<T> {

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string>()
    const [resource, setResource] = useState<T>(initialState);

    const fetchResource = async () => {
        await fetch(backendUrl + path, {method: props?.method || 'GET'})
            .then(r => r.json())
            .then(json => setResource(json))
            .catch(e => {
                console.log(e)
                setError(e.toString())
            })
            .finally(() => {
                setLoading(false)
                props?.postHook ? props.postHook() : undefined
            })
    }

    useEffect(() => {
        fetchResource()
    }, [props?.loadTime])

    return [resource, error, isLoading]

}