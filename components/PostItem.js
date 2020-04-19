// Components/PostItem.js

import React, { PureComponent } from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native'
import Moment from 'moment'
import defaultImage from '../assets/images/Hobbit_500x500.jpg'

const {width: WIDTH} = Dimensions.get('window');
class PostItem extends PureComponent {

    render() {
        const post = this.props.postData;
        const image = "http://192.168.1.11:8000/images/" + this.props.postData.images[0].url;
        const {DisplayDetails} = this.props;
        Moment.locale('fr');
        return (
            <TouchableOpacity onPress={() => DisplayDetails(post.id)}
                style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri : image}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{post.title} {post.images.url}</Text>
                        <Text style={styles.vote_text}>{post.price} €</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{post.squareMeter} m², {post.rooms} piéces</Text>
                        <Text style={styles.content_text} numberOfLines={6}>{post.content}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Publié le {Moment(post.published).format('d/M/YYYY')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 20,
        flex : 1,
        borderColor : '#000000',
        width : WIDTH - 15,
    },
    image: {
        width: 100,
        height: 120,
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
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 25,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        fontSize: 15
    },
    content_text: {
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