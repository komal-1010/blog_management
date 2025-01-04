import './App.css';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import Login from './pages/Auth/Login';
function App() {
  return (
    <Provider store={store}>
   <Login/>
  </Provider>
  );
}

export default App;
