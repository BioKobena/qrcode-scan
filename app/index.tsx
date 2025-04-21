import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { StatusBar } from "expo-status-bar";
import AwesomeAlert from "react-native-awesome-alerts";
import { useRouter } from "expo-router";
const QRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const animatedLine = useRef(new Animated.Value(0)).current;

  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (permission && !permission.granted) {
      setShowAlert(true);
    }
  }, [permission]);

  useEffect(() => {
    animateLine();
  }, []);

  const animateLine = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedLine, {
          toValue: 250,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedLine, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  if (!permission) return <View />;

  if (!permission.granted && showAlert) {
    return (
      <>
        <View style={styles.container} />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Permission requise"
          message="Nous avons besoin de votre permission pour accéder à la caméra."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Annuler"
          confirmText="Autoriser"
          confirmButtonColor="#4CAF50"
          cancelButtonColor="#F44336"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            setShowAlert(false);
            requestPermission();
          }}
        />
      </>
    );
  }

  const handleScan = (result: BarcodeScanningResult) => {
    if (!scanned && result.data) {
      setScanned(true);
      router.push("/menu");
      Alert.alert("✅ Code Scanné", `${result.data}`);
      // Reset scanning after delay
      setTimeout(() => setScanned(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }}
        onBarcodeScanned={handleScan}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: animatedLine }],
                },
              ]}
            />
          </View>
        </View>
      </CameraView>

      {scanned && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>🔄 Rescanner</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { textAlign: "center", marginTop: 20 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanLine: {
    width: "95%",
    height: 3,
    backgroundColor: Platform.OS === "ios" ? "white" : "lightblue",
    position: "absolute",
    top: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  scanArea: {
    width: 250,
    height: 250,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "white",
    borderTopLeftRadius: 4,
    borderRadius: 5,
  },

  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "white",
    borderTopRightRadius: 4,
    borderRadius: 5,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "white",
    borderRadius: 5,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "white",
    borderRadius: 5,
  },
});

export default QRScanner;
