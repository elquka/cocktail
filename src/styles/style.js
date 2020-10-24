import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:
        { flex: 1, backgroundColor: "#1583ad" },
    header:
        { flexDirection: 'row', height: 60, backgroundColor: "#1583ad" },
    titulo:
        { fontSize: 18, marginVertical: 18, marginLeft: '10%', textAlign: 'center', color: '#fff', width: '80%' },
    titulo_view:
        { fontSize: 18, marginVertical: 18, textAlign: 'center', color: '#fff', width: '80%' },
    buscador:
        { marginTop: 12, marginRight: 5 },
    atras:
        { marginTop: 12, marginLeft: 10 },
    flatlist:
        { backgroundColor: "#1583ad" },
    logo:
        { flex: 1, height: 120, width: 90, alignSelf: "center", margin: 30 },
    cuadro_imagen:
        { position: 'absolute', right: 10, top: 10 },
    imagen_index:
        { height: 140, width: 140, borderRadius: 5 },
    imagen_view:
        { height: 300, borderRadius: 5, margin: 15 },
    cuadro_index:
        { marginHorizontal: 10, marginVertical: 5, backgroundColor: "#a8bac1", height: 160, borderRadius: 5, shadowOpacity: 0.25, 
            shadowRadius: 3.84, elevation: 5 },
    titulo_index:
        { fontSize: 24, margin: 5, width: 180 },
    ingrediente:
        { fontSize: 15, margin: 5 },
    mas_ingrediente:
        { fontSize: 12, margin: 4 },
    instrucciones:
        { marginLeft: 15, fontSize: 13, marginBottom: 20 },
    subtitulo:
        { marginLeft: 15, marginTop: 15, marginBottom: 5 },
    ingredienteslista:
        { marginLeft: 15, fontSize: 12 },
    fondoview:
        { margin: 10, backgroundColor: '#fff' },
    centeredView:
        { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 },
    modalView:
        { margin: 20, backgroundColor: "white", maxHeight: 500, borderRadius: 20, padding: 35, width: '90%', alignItems: "center", 
            shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
    modalText:
        { marginBottom: 26, textAlign: "center" }

})
