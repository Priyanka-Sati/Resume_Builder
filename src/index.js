import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 

// for store
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore  } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkuS3dVubQVBypdwRvUpMzxKYt_sHnI7g",
  authDomain: "resume-builder-5bc10.firebaseapp.com",
  projectId: "resume-builder-5bc10",
  storageBucket: "resume-builder-5bc10.appspot.com",
  messagingSenderId: "2715977948",
  appId: "1:2715977948:web:656f6303cc49879a5f4c19"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()


const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase)))


ReactDOM.render(
    <BrowserRouter>
      <Provider store={reduxStore}>
        <ReactReduxFirebaseProvider 
          firebase={firebase}
          config={firebaseConfig}
          dispatch={reduxStore.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
,
  document.getElementById('root')
);