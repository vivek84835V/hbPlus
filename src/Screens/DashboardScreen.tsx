import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import useAuth from "@/hooks/useAuth";
import { signOut } from "@/services/authService";

export default function Dashboard() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError("");

      await signOut();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.subtitle}>Welcome to HB+!</Text>

      <Text style={styles.email}>{session?.user.email}</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging out..." : "Logout"}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 12,
    color: "#666666",
  },
  email: {
    fontSize: 14,
    marginTop: 20,
    color: "#444444",
  },
  logoutButton: {
    marginTop: 30,
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
  errorText: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});
