import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";
import Theme from "./configs/theme/MuiTheme";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { useAppDispatch } from "./app/hooks";
import { setAppData } from "./components/mainSlice";

function App() {
  const dispatch = useAppDispatch();

  const WS_URL = "ws://127.0.0.1:8080/ws";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      });
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    dispatch(setAppData(lastJsonMessage));
  }, [lastJsonMessage, dispatch]);

  return (
    <Theme>
      <Header />
      <Dashboard />
      <Footer />
    </Theme>
  );
}

export default App;
