import React, { Component } from 'react'
import { Image, Text,  View,  TouchableHighlight, FlatList } from 'react-native'
import { _CONST } from '../../utils/const'
import axios from 'axios';
import styles from '../../styles/style'

var indexLista = 10;
var data = [];




export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ingred: [],
            listaView: []
        };

        //this.fetchData()
    }
    componentDidMount() {
        this.fetchData().then(() => console.log("hola"))
    }




    fetchData = async () => {
        data = await this.getListado()

        this.consolidaLista(0, 4)

    }


    buscaIngredientes = (idDrink) => new Promise((line) => {
        var cantidad = -2;
        var ing1 = ''
        var ing2 = ''
        axios.get(_CONST.url_view + idDrink)
            .then((response) => {
                var ingredientes = ['strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4', 'strIngredient5', 'strIngredient6', 'strIngredient7', 'strIngredient8', 'strIngredient9', 'strIngredient10', 'strIngredient11', 'strIngredient12']
                for (var i = 0; i < 12; i++) {

                    if (!response.data.drinks[0][ingredientes[i]]) break
                    if (i == 0) ing1 = response.data.drinks[0][ingredientes[i]]
                    if (i == 1) ing2 = response.data.drinks[0][ingredientes[i]]
                    cantidad++
                };
                console.log('enfuncion->', { ing1, ing2, cantidad })
                var cantText = ''
                if (cantidad > 0) cantText = 'y ' + cantidad + ' ingredientes mas...'
                return line({ ing1, ing2, cantText })
            })
            .catch((error) => {
                console.log(error);
                return line({})
            });

    })


    async consolidaLista(desde, cantidad) {
        console.log("consolidaLista")
        for (var i = desde; i < cantidad; i++) {
            var linea = data[i]
            var ingredientes = await this.buscaIngredientes(data[i].idDrink)
            linea['ingredientes'] = ingredientes
            this.state.listaView.push(linea)
        }
        //console.log(this.state.listaView[0].ingredientes.cantidad)
        this.forceUpdate()

    }

    getListado = () => new Promise((resolve) => {
        axios.get(_CONST.url_index)
            .then((response) => {
                resolve(response.data.drinks)
            })
            .catch((error) => {
                console.log(error);
            });
    })



    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };

    render() {
        return (
            <View style={{flex:1, marginBottom:50}}>
                <FlatList
                    data={this.state.listaView}
                    keyExtractor={item => item.idDrink}
                    renderItem={({ item }) =>
                        <TouchableHighlight style={{ margin: 10, backgroundColor: "#bbb", height: 180 }}>
                            <View>
                                <View>
                                    <Text>{item.strDrink}</Text>
                                    <Text>{item.ingredientes.ing1}</Text>
                                    <Text>{item.ingredientes.ing2}</Text>
                                    <Text>{item.ingredientes.cantText}</Text>


                                </View>
                                <View>
                                    <Image style={{ height: 10, width: 10 }}
                                        source={{ uri: item.strDrinkThumb }}

                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                />




            </View>
        )
    }
   
}
