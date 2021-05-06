import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrar}) => {
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('')
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showDatePicker = () =>{
        setDatePickerVisibility(true);
    }

    const hideDatePicker = () =>{
        setDatePickerVisibility(false);
    }

    const handleConfirm = date =>{
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        setFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    }

    const hideTimePicker = () =>{
        setTimePickerVisibility(false);
    }

    const showTimePicker = () =>{
        setTimePickerVisibility(true);
    }

    const hourConfirm = hour =>{
        const opciones = { hour: 'numeric', minute: "2-digit" };
        setHora(hour.toLocaleString('en-US', opciones));
        hideTimePicker();
    }

    const crearCita = () =>{
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || paciente.trim() === '' || sintomas.trim() === '') {
            return mostrarAlerta()
        }

        const cita = { paciente, propietario, telefono, fecha, hora, sintomas };
        cita.id = shortid.generate();

        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        setMostrar(false);
    }
    
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'Ok'
            }]
        )
    }

    return (
        <ScrollView>
            <View style={styles.formulario}>
                <Text style={styles.label}>Paciente</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPaciente(text)}
                />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.label}>Dueño</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPropietario(text)}
                />
            </View>
            <View style={styles.formulario}>
                <Text style={styles.label}>Contacto</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTelefono(text)}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.formulario}>
                <Text style={styles.label}>Fecha</Text>
                <Button
                    title="Selecionar fecha" 
                    onPress={showDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{fecha}</Text>
            </View>

            <View style={styles.formulario}>
            <Text style={styles.label}>Hora</Text>
                <Button
                    title="Selecionar hora" 
                    onPress={showTimePicker}
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={hourConfirm}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una hora"
                />
                <Text>{hora}</Text>
            </View>

            <View style={styles.formulario}>
                <Text style={styles.label}>Sintomas</Text>
                <TextInput
                    multiline
                    style={styles.input}
                    onChangeText={(text) => setSintomas(text)}
                />
            </View>

            <View style={styles.formulario}>
                <TouchableHighlight onPress={() => crearCita()} style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Guardar Cita </Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

export default Formulario

const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#2d2d2d',
        paddingHorizontal: 5,
        borderWidth: 1
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: 'blue',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
