import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";
import asyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [mostrar, setMostrar] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitas = async () =>{
      try {
        const citasStorage = await asyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage))
        }
      } catch (error) {
        console.error(error);
      }
    }

    obtenerCitas()
  }, [])

  const eliminarPaciente = (id) => {

    const citasFiltradas  = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas)
    guardarCitas(JSON.stringify(citasFiltradas))
  };

  const mostrarFormularioFn = () => {
    setMostrar(!mostrar);
  };

  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }

  const guardarCitas = async (citas) =>{
    try {
      await asyncStorage.setItem('citas', citas);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>

        <TouchableHighlight
          onPress={() => mostrarFormularioFn()}
          style={styles.btnMostrar}
        >
          <Text style={styles.textoMostrar}>{mostrar ? 'Cancelar Crear Cita' : 'Crear Cita'}</Text>
        </TouchableHighlight>

        <View style={styles.contenido}>
          {mostrar ? (
            <Formulario
              citas={citas}
              setCitas={setCitas}
              setMostrar={setMostrar}
              guardarCitas={guardarCitas}
            />
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0 ? "Administra tus citas" : "No hay citas"}
              </Text>

              <FlatList
                style={styles.listados}
                data={citas}
                renderItem={({ item }) => (
                  <Cita eliminarPaciente={eliminarPaciente} cita={item} />
                )}
                keyExtractor={(cita) => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#eee",
    flex: 1,
  },
  titulo: {
    color: "#2d2d2d",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  listados: {
    flex: 1,
  },
  btnMostrar: {
    padding: 10,
    backgroundColor: "green",
    marginVertical: 10,
  },
  textoMostrar: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
