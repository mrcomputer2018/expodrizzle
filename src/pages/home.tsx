import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, Pressable } from "react-native";
import { styles } from "./home.styles";

type Data = {
    id: number;
    name: string;
}

const Home = () => {
    const [name, setName] = useState('');

    const [data, setData] = useState<Data[]>([]);

    const [ search, setSearch ] = useState('');

    return (  
        <View style={ styles.container } >
            <TextInput
            style={ styles.input } 
            placeholder="nome"
            value="name"
            onChangeText={setName}
            />

            <TouchableOpacity 
            style={ styles.button }
            onPress={() => console.log(name)}>
                <Text style= { styles.textButton }>Salvar</Text>
            </TouchableOpacity>

            < TextInput 
            style={ styles.input }
            placeholder="Pesquisar"
            value={search}
            onChangeText={setSearch}
            />

            <FlatList 
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => 
                <Pressable style={ styles.pressable }>
                    <Text>{item.name}</Text>
                </Pressable>
            }
            ListEmptyComponent={() => <Text style={ styles.textEmpty }>Nenhum item encontrado</Text>}
            />
        </View>
    );
}
 
export default Home;