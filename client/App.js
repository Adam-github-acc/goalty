import Layout from './components/Layout/Layout';
import { GlobalContextProvider } from './context/GlobalContext';
import { NativeRouter } from 'react-router-native';

export default function App() {
  return (
    <GlobalContextProvider>
      <NativeRouter>
        <Layout />
      </NativeRouter>
    </GlobalContextProvider>
  );
}


