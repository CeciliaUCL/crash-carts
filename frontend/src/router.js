import {Route, BrowserRouter, Routes} from 'react-router-dom'
import React from "react";
import Login from "./login";
import Home from './home';

class MyRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/home' element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default MyRouter;
