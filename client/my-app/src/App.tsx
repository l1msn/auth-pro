import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(()=> {
        if(localStorage.getItem('token'))
            store.checkAuth();
    },[]);

    if(!store.isAuth)
        return (
            <LoginForm></LoginForm>
        );

  return (
    <div className="App">
        <h1>{store.isAuth ? `User ${store.user.email} auth!` : `User not auth!`}</h1>
        <button onClick={()=> {store.logout()}}>Logout</button>
    </div>
  );
}

export default observer(App);
