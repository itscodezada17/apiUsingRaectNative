

import React, { useEffect , useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';

type pets={
  id: String;
  name : String;
  breed:String;
  photo:String;
}

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<pets[]>([]);


  const getNames = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/bead2d59-fd3e-428a-8c90-8db02c40165e');
      const json = await response.json();
      setData(json.pets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNames();
  }, []);

  return (
    <View style={styles.container}>
       {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
         // keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.name}
            </Text>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    padding: 15,
  },
})
