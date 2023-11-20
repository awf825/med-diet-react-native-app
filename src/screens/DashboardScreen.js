import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const DashboardScreen = ({ navigation }) => {
    const _onPress = (item) => {
        console.log('_onPress: ', item)
    }

    const _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => _onPress(item)}>
            <View style={styles.item}>
                <Text>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const { logout } = useContext(AuthContext)
    return (
        <SafeAreaView style={styles.container}>
            {/* <Text
                style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                }}>
                Logout
            </Text> */}
            <CustomButton label={"Logout"} onPress={logout} />
            <CustomButton label={"Survey"} onPress={() => navigation.navigate('Survey')} />

            {/* <FlatList
                data={DATA}
                // renderItem={({item}) => <Item item={item} />}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
            /> */}
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default DashboardScreen;