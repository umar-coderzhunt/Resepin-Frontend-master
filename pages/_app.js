import "../styles/globals.css";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    </SSRProvider>
  );
}

export default wrapper.withRedux(MyApp);
