import $ from 'jquery';
import React from "react";
import MyTool from "./tool/my_tool"
import {Helmet} from "react-helmet";

const app_name = "@MedAssist"

class Login extends React.Component {

    call_func(data, sig) {
        if (sig === "aj_sel_user_name_and_pwd") {
            data = parseInt(data)
            if (data === -1) {
                window.alert("User Name/Password is Wrong!")
                return;
            }
            window.location = "/home"
        }
    }

    login_click() {
        let name = $("#username_inp").val()
        let pwd = $("#password_inp").val()
        if (!new MyTool().checkInput([name, pwd])) {
            window.alert("Please fill both User Name/Password!")
            return;
        }
        window.location = "/home"
        return;
        new MyTool().aj_req(
            this.call_func,
            "aj_sel_user_name_and_pwd",
            "http://127.0.0.1:5000/aj_sel_user_name_and_pwd",
            {"name": name, "pwd": pwd}
        )
    }

    render() {
        return (
            <div>
                <Helmet>
                    <link rel="stylesheet" href="assets/css/login_css.css"/>
                </Helmet>
                <div className='container'>
                    <h1>Login</h1>
                    <input type="text" name="username" id="username_inp" placeholder="UserName"/>
                    <input type="password" name="password" id="password_inp" placeholder="Password"/>
                    <input onClick={() => this.login_click()} type="button" id="login_btn" value="Login"/>
                    <p></p>
                    <p>{app_name}</p>
                </div>
            </div>
        );
    }
}

export default Login;
