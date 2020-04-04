// Components/PostItem.js

import React from 'react'
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native'
import Moment from 'moment'
import defaultImage from '../assets/images/Hobbit_500x500.jpg'

const {width: WIDTH} = Dimensions.get('window');
class PostItem extends React.Component {
    render() {
        const post = this.props.postData;
        Moment.locale('fr');
        return (
            /*<View style={styles.content_container}>
                <View style={styles.header_container}>
                    <Text style={styles.title_text}>{post.title}</Text>
                    <Text style={styles.vote_text}>{post.price}</Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text} numberOfLines={6}>{post.squareMeter} m²</Text>
                </View>
                <View style={styles.date_container}>
                    <Text style={styles.date_text}>Publié le {post.published}</Text>
                </View>
            </View>*/

            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={defaultImage}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{post.title}</Text>
                        <Text style={styles.vote_text}>{post.price} €</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{post.squareMeter}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Publié le {Moment(post.published).format('d/M')}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 20,
        flex : 1,
        borderColor : '#000000',
        width : WIDTH - 55
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        paddingRight: WIDTH -20,
        backgroundColor: 'gray',
        alignItems: 'center'
    },
    content_container: {
        flex: 1,
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default PostItem