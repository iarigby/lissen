import {StyleSheet, ScrollView, Dimensions, Button} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useResource} from "@/hooks/useResource";
import {Article} from "@/resources/article";
import React from "react";
import {ArticleListItem} from "@/components/ArticleListItem";


// noinspection JSUnusedGlobalSymbols
export default function HomeScreen() {
    const [articles, error, isLoading] = useResource<Article[]>('/articles', [])

    if (isLoading) {
        return <ThemedView><ThemedText>Loading</ThemedText></ThemedView>
    }
    if (error) {
        return <ThemedView><ThemedText>error: {error}</ThemedText></ThemedView>
    }

    function fetchNewArticles() {

    }

    return (<ScrollView style={styles.articlesContainer}>
        <ThemedView style={{height: 40}}></ThemedView>
        <Button title='fetch new articles' onPress={fetchNewArticles} ></Button>
        {articles.map(a => <ArticleListItem key={a.id} article={a}/>)}
    </ScrollView>)

}


const styles = StyleSheet.create({
    articlesContainer: {
        width: Dimensions.get('window').width
    },
});
