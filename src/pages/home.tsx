import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "./home.styles";

const Home = () => {
    const [name, setName] = useState('');

    return (  
        <View style= { styles.container }>
            <TextInput
            style={ styles.input } 
            placeholder="nome"
            value="name"
            onChangeText={setName}
            />

            <TouchableOpacity 
            style={ styles.button }
            onPress={() => console.log(name)}>
                <Text>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
 
export default Home;