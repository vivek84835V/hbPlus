import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "./supabase";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = AuthSession.makeRedirectUri({
  scheme: "hbplus",
  path: "auth/callback",
});

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw error;
  }

  if (!data.url) {
    throw new Error("Google sign-in URL was not returned.");
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (result.type !== "success") {
    throw new Error("Google sign-in was cancelled.");
  }

  const url = new URL(result.url);

  const code = url.searchParams.get("code");

  if (!code) {
    throw new Error("Authorization code was not returned.");
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    throw sessionError;
  }

  const email = sessionData.session?.user.email?.toLowerCase();

  if (!email) {
    throw new Error("Google email not found.");
  }

  if (!email.endsWith("@hbplus.fit")) {
    throw new Error(
      "Access denied. Please sign in with an @hbplus.fit account.",
    );
  }

  return sessionData.session;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};
