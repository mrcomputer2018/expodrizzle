import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, Pressable, Alert, Keyboard, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as productSchema from "../database/schemas/productSchema"
import { like, asc, eq } from "drizzle-orm";

type Data = {
    id: number;
    name: string;
}

const Home = () => {
    const [name, setName] = useState('');

    const [data, setData] = useState<Data[]>([]);

    const [ search, setSearch ] = useState('');

    const database = useSQLiteContext();

    const db = drizzle(database, { schema: productSchema });

    useEffect(() => {
        fetchProducts();
    }, [search]);

    async function handleSave() {
        try {
            const response = await db.insert(productSchema.product).values({ name });

            Alert.alert('Produto salvo com sucesso!');

            setName('');
            Keyboard.dismiss();
            await fetchProducts(); //carregando os produtos

        } catch (error) {
            console.log(error);
        }
    }

    async function handleSearch() {
        try {
            const response = await db.query.product.findMany({
                where: like(productSchema.product.name, `%${search}%` ),
                orderBy: [asc(productSchema.product.name)]
            });

            setData(response);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id: number) {
        try {
            Alert.alert("Remover", "Deseja realmente remover o produto?", [{
                text: "Sim",
                onPress: async () => {
                    await db
                    .delete(productSchema.product)
                    .where(eq(productSchema.product.id, id));

                    await fetchProducts();
                }
            }, 
            {
                text: "Cancelar",
                style: "cancel"
            }]);

        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProducts() {
        try {
            const response = await db.query.product.findMany();

            console.log(response);
            setData(response);

        } catch (error) {
            console.log(error);
        }
    }

    return (  
        <View style={ styles.container } >
            <TextInput
            style={ styles.input } 
            placeholder="nome"
            value={name}
            onChangeText={setName}
            />

            <TouchableOpacity 
            style={ styles.button }
            onPress={handleSave}>
                <Text style= { styles.textButton }>Salvar</Text>
            </TouchableOpacity>

            <View style={ styles.searchButton }>
                <TextInput 
                style={ styles.input }
                placeholder="Pesquisar"
                value={search}
                onChangeText={setSearch}
                />

                <TouchableOpacity 
                style={ styles.button }
                onPress={handleSearch}>
                    <Text style= { styles.textButton }></Text>
                </TouchableOpacity>
            </View>

            <FlatList 
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => 
                <Pressable 
                style={ styles.pressable }
                onLongPress={() => handleDelete(item.id)}
                >
                    <Text>{item.name}</Text>
                </Pressable>
            }
            ListEmptyComponent={() => <Text style={ styles.textEmpty }>Lista vazia.</Text>}
            />
        </View>
    );
}
 
export default Home;

const styles = StyleSheet.create({
    container : {
        width: '100%',
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#999',
        paddingHorizontal: 16,
    },
    button: {
        height: 50,
        margin: 12,
        backgroundColor: 'blue',
        padding: 16,
        alignItems: 'center',
        borderRadius: 7,
    },
    textButton : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchButton: {
        flexDirection: 'row',
        width: '100%',
    },
    pressable: {
        marginTop: 26,
        padding: 16,
        borderWidth: 1,
        borderRadius: 7,
    },
    textEmpty: {
        textAlign: 'center',
        marginTop: 26,
    },
});