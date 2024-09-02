// src/App.tsx
import Footer from "./components/Footer";
import LifeExpectancyVisualizer from "./components/LifeExpectancyVisualizer";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <Container maxW="container.xl" p={4}>
      <LifeExpectancyVisualizer />
      <Footer />
    </Container>
  );
}

export default App;
