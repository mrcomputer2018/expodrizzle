import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Home from './src/pages/home';


const DATABSE_NAME = "database.db"

const expoDb = openDatabaseSync(DATABSE_NAME);

const db = drizzle(expoDb);

export default function App() {

    const { success, error } = useMigrations(db, migrations);

    if (error) {
        return (
            <View>
                <Text>Migration error: {error.message}</Text>
            </View>
        );
    }
  
    if (!success) {
        return (
            <View style={ styles.indicator }>
                <Text>Migration em progresso...</Text>
            </View>
        );
    }

    return (
        <SQLiteProvider databaseName={DATABSE_NAME}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Home />
            </View>
        </SQLiteProvider>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 26,
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
