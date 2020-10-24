import React, { Component } from 'react'
import { Image, Text, View, TouchableHighlight, FlatList, Modal, TextInput } from 'react-native'
import { _CONST } from '../../utils/const'
import axios from 'axios';
import styles from '../../styles/style'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import style from '../../styles/style';

var indexLista = 5;
var data = [];




export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataFiltrada: [],
            ingred: [],
            listaView: [],
            modalFiltro: false
        };

    }

    componentDidMount() {
        this.fetchData().then(() => console.log("fin"))
    }

    fetchData = async () => {
        data = await this.getListado()
        this.consolidaLista(0, indexLista)
    }

    buscaIngredientes = (idDrink) => new Promise((line) => {
        var cantidad = -2;
        var ing1 = ''
        var ing2 = ''
        axios.get(_CONST.url_view + idDrink)
            .then((response) => {
                for (var i = 0; i < 12; i++) {
                    if (!response.data.drinks[0][_CONST.ingredientes[i]]) break
                    if (i == 0) ing1 = response.data.drinks[0][_CONST.ingredientes[i]]
                    if (i == 1) ing2 = response.data.drinks[0][_CONST.ingredientes[i]]
                    cantidad++
                };
                var cantText = ''
                if (cantidad > 0) cantText = 'y ' + cantidad + ' ingredientes mas...'
                line({ ing1, ing2, cantText })
            })
            .catch((error) => {
                console.log(error);
            });

    })

    async consolidaLista(desde, cantidad) {
        for (var i = desde; i < desde + cantidad; i++) {
            var linea = data[i]
            var ingredientes = await this.buscaIngredientes(data[i].idDrink)
            linea['ingredientes'] = ingredientes
            this.state.listaView.push(linea)
            console.log(linea)
        }
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

    filtro = () => {
        this.setState({ modalFiltro: true })
    }

    filtrando = (filtro) => {
        if (filtro.toString().length < 3) {
            this.setState({ dataFiltrada: [] })
            return
        }
        this.setState({ dataFiltrada: data.filter(item => String(item.strDrink).includes(filtro)) })
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1
                }}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Random drinks 0.1</Text>
                    <Icon style={style.buscador} onPress={() => this.filtro()} name="search" size={30} color="#fff" />
                </View>

                <FlatList
                    data={this.state.listaView}
                    style={styles.flatlist}
                    keyExtractor={item => item.idDrink}
                    onEndReached={() => {
                        this.consolidaLista(indexLista, 3)
                        indexLista += 3
                    }}
                    renderItem={({ item }) =>
                        <TouchableHighlight style={styles.cuadro_index} onPress={() => this.props.navigation.navigate('view_products', { idDrinks: item.idDrink })}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={styles.titulo_index}>{item.strDrink}</Text>
                                    <Text style={styles.ingrediente}>» {item.ingredientes.ing1}</Text>
                                    <Text style={styles.ingrediente}>» {item.ingredientes.ing2}</Text>
                                    <Text style={styles.mas_ingrediente}>{item.ingredientes.cantText}</Text>
                                </View>
                                <View style={styles.cuadro_imagen}>
                                    <Image style={styles.imagen_index}
                                        source={{ uri: item.strDrinkThumb }}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                />



                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalFiltro}
                        onRequestClose={() => {
                            this.setState({ modalFiltro: false })
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>FILTRO</Text>
                                <TextInput style={{ backgroundColor: '#ddd', width: '100%', fontSize: 15, borderRadius: 5 }}
                                    value={this.state.textoFiltro}
                                    onChangeText={(textoFiltro) => { this.filtrando(textoFiltro) }}
                                    placeholder='Ingrese filtro...'
                                    onSubmitEditing={() => { this.guardarComentario(this.state.comentario) }} />
                                <Text style={{ fontSize: 10 }}>Ingrese al menos 3 caracteres</Text>
                                <ScrollView style={{ width: '100%' }}>
                                    {
                                        this.state.dataFiltrada.map(item =>
                                            <TouchableHighlight key={item.idDrink} onPress={() => { this.setState({ modalFiltro: false }), this.props.navigation.navigate('view_products', { idDrinks: item.idDrink }) }}>
                                                <Text style={{ padding: 4 }}>{item.strDrink}</Text>
                                            </TouchableHighlight>)
                                    }
                                </ScrollView>
                            </View>

                        </View>

                    </Modal>


                </View>
            </View>

        )
    }

}
