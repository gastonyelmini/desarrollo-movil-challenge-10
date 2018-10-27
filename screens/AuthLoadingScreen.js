import React from 'react'
import { TextInput, Text, Button } from 'react-native'

import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native'
import { getCurrentUser, db } from '../firebase'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  state = {
    userName: '',
  }

  _bootstrapAsync = async () => {
    const currentUser = await getCurrentUser()
    console.log(currentUser)
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText} numberOfLines={5}>
          ¡Ingrese su nombre!
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={userName =>
            this.setState({
              userName,
            })
          }
          value={this.state.userName}
        />
        <Button
          style={styles.button}
          onPress={this.onPressSaveName}
          title="Guardar"
          color="#841584"
          accessibilityLabel="Guardar"
        />
        <StatusBar barStyle="default" />
      </View>
    )
  }
  onPressSaveName = async () => {
    const user = await getCurrentUser()
    db.collection('users')
      .doc(user.uid)
      .set({ name: this.state.userName })
    this.props.navigation.navigate('App')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    height: 60,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    marginBottom: 30,
  },
  button: {
    fontSize: 30,
  },
})
