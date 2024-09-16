import {Article} from "@/resources/article";
import {Link} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {Dimensions, Image, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";

export function ArticleListItem({article}: { article: Article }) {
    const maxLength = 35;
    return <>
        <Link href={{
            pathname: '/article/[id]',
            params: {id: article.id}
        }}>
            <ThemedView style={styles.articleThumbnail}>
                <Image source={{uri: article.sourceImageURL}} style={styles.articleImage}></Image>
                {/*<ThemedView>*/}
                <ThemedText type="defaultSemiBold" style={{fontSize: 14, marginLeft: 20, width: Dimensions.get('window').width / 2}}>
                    {article.title.length > maxLength ? article.title.slice(0, maxLength) + '...' : article.title}
                </ThemedText>
                {/*</ThemedView>*/}
            </ThemedView>
        </Link>
    </>
}


const styles = StyleSheet.create({
    articleImage: {
        width: 120,
        height: 60,
        // border: '1px solid black'
    },
    articleThumbnail: {
        width: '100%',
        margin: 'auto',
        padding: 20,
        flexDirection: 'row'
    }
});
