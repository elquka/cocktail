import React, { Component } from 'react'
import { Image, Text, TextInput, ScrollView, View } from 'react-native'
import { _CONST } from '../../utils/const'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style'

var idDrinks = 0

export default class view_products extends Component {

    constructor(props) {
        super(props);
        const { route } = this.props;
        idDrinks = route.params

        this.state = {
            data: [],
            ingredientes: []
        };
    }


    componentDidMount() {
        this.fetchData().then(() => console.log("hola"))
    }


    fetchData = async () => {
        this.setState({ data: await this.buscaValores(idDrinks) })
        this.forceUpdate()
    }


    buscaValores = (idDrink) => new Promise((line) => {
        axios.get(_CONST.url_view + idDrink.idDrinks)
            .then((response) => {
                var lista = []
                for (var i = 0; i < 12; i++) {

                    if (!response.data.drinks[0][_CONST.ingredientes[i]]) break
                    lista.push(response.data.drinks[0][_CONST.cantidades[i]] + ' - ' + response.data.drinks[0][_CONST.ingredientes[i]])
                };
                this.setState({ ingredientes: lista })
                line(response.data.drinks[0])
            })
            .catch((error) => {
                console.log(error);
            });
    })


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon style={styles.atras} onPress={() => this.props.navigation.goBack()} name="arrow-left" size={27} color="#fff" />
                    <Text style={styles.titulo_view}>{this.state.data.strDrink}</Text>
                </View>
                <ScrollView>
                    <View style={styles.fondoview}>
                        <Image style={styles.imagen_view}
                            source={{ uri: this.state.data.strDrinkThumb }}
                        />
                        {this.state.ingredientes.map((item) =>
                            <View><Text style={styles.ingredienteslista}>{item}</Text></View>
                        )}
                        <Text style={styles.subtitulo}>How to prepare</Text>
                        <Text style={styles.instrucciones}>{this.state.data.strInstructions}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}