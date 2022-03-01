import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function App() {
  let [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Press the button below to choose a picture on your phone !
        </Text>

        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Choose your photo</Text>
        </TouchableOpacity>

        {selectedImage !== null && (
          <View style={styles.container}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.thumbnail}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 80,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  instructions: {
    color: "black",
    fontSize: 20,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "rgba(100, 200, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.3)",
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderRadius: 200,
    marginTop: 30,
  },
});
