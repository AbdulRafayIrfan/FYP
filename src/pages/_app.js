import { AuthProvider } from "@/Contexts/AuthContext";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        // Overriding gray colors to include white as the lightest shade
        theme={{
          colors: {
            gray: [
              "#FFFFFF",
              "#F8F9FA",
              "#F1F3F5",
              "#E9ECEF",
              "#DEE2E6",
              "#CED4DA",
              "#ADB5BD",
              "#868E96",
              "495057",
              "343A40",
            ],
          },
        }}
      >
        <NotificationsProvider position="top-center">
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
