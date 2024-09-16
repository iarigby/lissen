import {Image, ScrollView, StyleSheet} from "react-native";
import {Player} from "@/components/Player";
import {Article} from "@/resources/article";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

export function ArticleView({article}: {article: Article}) {
    return <ThemedView style={styles.articleContainer}>
        <ThemedView style={styles.articleHeader}>
            <Image style={styles.articleImage} source={{uri: article.sourceImageURL}}></Image>
            <ThemedText style={styles.articleTitle}>{article.title}</ThemedText>
        </ThemedView>
        <Player audioURI={article.sourceAudioURL}></Player>
        <ScrollView style={{padding: 10, marginBottom: 50}}>
            <ThemedView style={styles.articleBody}>
                <ThemedText style={styles.articleContent}>{article.description}</ThemedText>
                <ThemedView style={{margin: 20}}></ThemedView>
                <ThemedText style={styles.articleContent}>{article.content}</ThemedText>
            </ThemedView>
        </ScrollView>
    </ThemedView>
}


const styles = StyleSheet.create({
    articleContainer: {
        padding: 20,
    },
    articleImage: {
        width: 120,
        height: 60,
        // border: '1px solid black'
    },
    articleHeader: {
        flexDirection: 'row',
        marginBottom: 20
    },
    articleTitle: {
        width: 200,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    articleBody: {
        marginTop: 20,
        marginBottom: 40
    },
    articleContent: {
        lineHeight: 25,
        fontSize: 16
    }
});

