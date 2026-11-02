import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { signInWithGoogle } from "../services/authService";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await signInWithGoogle();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HB+</Text>

      <Text style={styles.title}>Welcome to HB+</Text>

      <Text style={styles.subtitle}>
        Sign in with your HB+ account to continue.
      </Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Sign in with Google"}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.note}>Only @hbplus.fit accounts are allowed.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 32,
  },
  googleButton: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#222222",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  note: {
    marginTop: 20,
    fontSize: 13,
    color: "#777777",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});
