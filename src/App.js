import Footer from "./components/layout/Footer";
import NavigationBar from "./components/layout/NavigationBar";
import injectContext from "./store/context";

function App() {
  return (
    <>
      <NavigationBar />
      <Footer/>
    </>
  );
}

export default injectContext(App);
