import {useLocalSearchParams} from "expo-router";
import {Text} from 'react-native'
import {useResource} from "@/hooks/useResource";
import {Article} from '@/resources/article'
import {ArticleView} from "@/components/Article";


// noinspection JSUnusedGlobalSymbols
export default function ArticlePage() {
    const {id} = useLocalSearchParams();
    const [article, error, isLoading] = useResource<Article | null>('/articles/' + id, null)
    if (article) {
        return <ArticleView article={article}/>
    }
    if (error)
        return <Text>{error}</Text>
    else if (isLoading)
        return <Text>Loading</Text>
    return <Text>unknown error</Text>
}

