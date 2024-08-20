import { AuthWrapper } from "@/context/AuthContext";
import { OffCanvasWrapper } from "@/context/OffCanvasContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <OffCanvasWrapper>
        <Component {...pageProps} />
      </OffCanvasWrapper>
    </AuthWrapper>
  );
}
