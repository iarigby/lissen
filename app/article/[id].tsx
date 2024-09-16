import {useLocalSearchParams} from "expo-router";
import {Text} from 'react-native'
import {NetworkRequest, useResource} from "@/hooks/useResource";
import {Article} from '@/resources/article'
import {ArticleView} from "@/components/Article";


// noinspection JSUnusedGlobalSymbols
export default function ArticlePage() {
    const {id} = useLocalSearchParams();
    const [article, error, isLoading] = getArticle(Number(id))
    if (article) {
        return <ArticleView article={article}/>
    }
    if (error)
        return <Text>{error}</Text>
    else if (isLoading)
        return <Text>Loading</Text>
    return <Text>unknown error</Text>
}


function getArticle(id: number): NetworkRequest<Article | undefined> {
    const [articles, error, isLoading] = useResource<Article[]>('/articles', [])
    const article = articles.find(a => a.id === id)
    return [article, error, isLoading]
}

