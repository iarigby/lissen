import React, {useState} from "react";
import {ThemedView} from "@/components/ThemedView";
import {Button} from "react-native";
import {useResource} from "@/hooks/useResource";
import {ThemedText} from "@/components/ThemedText";

export function FetchArticlesView(props: {updateArticles: () => void}) {
    const [fetching, setFetching] = useState<boolean>()
    const fetchHook = () => {
        props.updateArticles
        setTimeout(() => setFetching(false) , 3000)
    }
    return  <ThemedView>
        {fetching ?
            <FetchingArticlesView fetchHook={fetchHook}/> :
            <Button title='fetch new articles' onPress={() => setFetching(true)} ></Button>}
    </ThemedView>
}

function FetchingArticlesView(props: {fetchHook: () => void}) {
    const [fetched, error, isLoading] = useResource<{downloadedArticles: number} | null>('/downloader/new_articles', null,{method: 'POST', postHook: props.fetchHook})

    if (fetched) {
        return <ThemedText>Fetched {fetched.downloadedArticles}</ThemedText>
    }
    if (isLoading) {
        return <ThemedText>Loading</ThemedText>
    }
    if (error) {
        return <ThemedText>Error fetching new articles</ThemedText>
    }
    return <></>
}