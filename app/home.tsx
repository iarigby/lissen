import {StyleSheet, ScrollView, Dimensions} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useResource} from "@/hooks/useResource";
import {Article} from "@/resources/article";
import React, {useState} from "react";
import {ArticleListItem} from "@/components/ArticleListItem";
import {FetchArticlesView} from "@/components/FetchArticlesView";


// noinspection JSUnusedGlobalSymbols
export default function HomeScreen() {
    const [loadTime, setLoadTime] = useState<number>(new Date().getTime())
    const [articles, error, isLoading] = useResource<Article[]>('/articles', [], {loadTime})

    const updateArticles = () => setLoadTime(new Date().getTime())

    if (isLoading) {
        return <ThemedView><ThemedText>Loading</ThemedText></ThemedView>
    }
    if (error) {
        return <ThemedView><ThemedText>error: {error}</ThemedText></ThemedView>
    }

    return (<ScrollView style={styles.articlesContainer}>
        <ThemedView style={{height: 40}}></ThemedView>
        <FetchArticlesView updateArticles={updateArticles}/>
        {articles.map(a => <ArticleListItem key={a.id} article={a}/>)}
    </ScrollView>)

}

const styles = StyleSheet.create({
    articlesContainer: {
        width: Dimensions.get('window').width
    },
});
