import $ from 'jquery';

import React from "react";
import My_tool from "./tool/my_tool";
import axios from 'axios'

const app_name = "@MedAssist"

let req_url = "http://127.0.0.1:3500/api/compartments"


let menu_lst = [
    {
        "id": "menu_1",
        "name": "Cart A",
        "url": "/home",
        "active": false,
    },
    {
        "id": "menu_2",
        "name": "Cart B",
        "url": "/home",
        "active": false,
    }
]

let menu_dv_drawer_lst = [
    {
        "id": "drawer_1",
        "menu_id": "menu_1",
        "drawer_humidity": 20,
        "drawer_temperature": 20,
        "drawer_tag_lst": [
            ["1", "2", "3", "4", "5", "6"],
            ["1", "2", "3", "4", "5", "6"],
            ["1", "2", "3", "4", "5", "6"],
        ],
        "drawer_lst": [
            [],
            [],
            [],
        ]
    },
    {
        "id": "drawer_2",
        "menu_id": "menu_2",
        "drawer_humidity": 30,
        "drawer_temperature": 30,
        "drawer_tag_lst": [
            ["1", "2", "3", "4", "5", "6"],
            ["1", "2", "3", "4", "5", "6"],
            ["1", "2", "3", "4", "5", "6"],
        ],
        "drawer_lst": [
            [],
            [],
            [],
        ]
    }
]


class LoadPage extends React.Component {
    render() {
        return (
            <div>
                <div className="theme-loader">
                    <div className="loader-track">
                        <div className="preloader-wrapper">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class HomePage extends React.Component {


    render() {
        return (
            <div>
                <div id="pcoded" className="pcoded">
                    <div className="pcoded-overlay-box"></div>
                    <div className="pcoded-container navbar-wrapper">
                        <nav className="navbar header-navbar pcoded-header" style={{background: "#7187ad"}}>
                            <div className="navbar-wrapper">
                                <div className="navbar-logo">
                                    <a href={"#!"} className="mobile-menu waves-effect waves-light"
                                       id="mobile-collapse">
                                        <i className="ti-menu"></i>
                                    </a>
                                    <a href="/">
                                        <h5>MedAssist
                                            <img className="img-50 img-radius" src="assets/img/logo.png" alt="图标"/>
                                        </h5>
                                    </a>
                                    <a href={"#!"} className="mobile-options waves-effect waves-light">
                                        <i className="ti-more"></i>
                                    </a>
                                </div>

                                <div className="navbar-container container-fluid">
                                    <ul className="nav-right">
                                        <li className="user-profile header-notification">
                                            <a href={"#!"} className="waves-effect waves-light">
                                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                                <img src="assets/images/avatar-4.jpg" className="img-radius"
                                                     alt="User-Profile-Image"/>
                                                <span>Admin</span>
                                                <i className="ti-angle-down"></i>
                                            </a>
                                            <ul className="show-notification profile-notification">
                                                <li className="waves-effect waves-light">
                                                    <a href="/">
                                                        <i className="ti-layout-sidebar-left"></i> Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className="pcoded-main-container">
                            <div className="pcoded-wrapper">
                                <nav className="pcoded-navbar">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <div className="sidebar_toggle"><a href="#"><i className="icon-close icons"></i></a>
                                    </div>
                                    <div className="pcoded-inner-navbar main-menu">
                                        <div className="">
                                            <div className="main-menu-header">
                                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                                <img className="img-80 img-radius" src="assets/img/logo.png"
                                                     alt="User-Profile-Image"/>
                                                <div className="user-details">
                                                    <span id="more-details">{app_name}<i
                                                        className="fa fa-caret-down"></i></span>
                                                </div>
                                            </div>
                                            <div className="main-menu-content">
                                                <ul>
                                                    <li className="more-details">
                                                        <a href="/"><i
                                                            className="ti-layout-sidebar-left"></i>Logout</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="pcoded-navigation-label" data-i18n="nav.category.forms">MENU 
                                        </div>
                                        <ul className="pcoded-item pcoded-left-item" id="menu_ul">
                                            {menu_lst.map((item) =>
                                                <li id={item.id} className={item.active ? "active" : ""}
                                                    onClick={() => this.switchMenu(item.id)}>
                                                    <a className={"waves-effect waves-dark"}>
                                                        <span className="pcoded-micon"><i
                                                            className="ti-layers"></i><b>FC</b></span>
                                                        <span className="pcoded-mtext"
                                                              data-i18n="nav.form-components.main">{item.name}</span>
                                                        <span className="pcoded-mcaret"></span>
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </nav>
                                <div className="pcoded-content">
                                    <div className="page-header">
                                        <div className="page-block">
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <div className="page-header-title">
                                                        <h5 className="m-b-10">MedCart</h5>
                                                        <p className="m-b-0">Items Management System</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pcoded-inner-content">
                                        <div className="main-body">
                                            <div className="page-wrapper">
                                                <div className="page-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>Notification</h5>
                                                                    <span>Quantity less than or equal to 1 </span>
                                                                    <div className="form-inline">
                                                                        <div className="form-group m-sm-1">
                                                                            <input type="text"
                                                                                   className="form-control"
                                                                                   id="search_inp_notification"
                                                                                   placeholder="Search"/>
                                                                        </div>
                                                                        <select id="search_select_notification"
                                                                                style={{
                                                                                    height: "36px",
                                                                                    width: "160px",
                                                                                    fontSize: "13px"
                                                                                }}
                                                                                className="form-control form-control-sm btn">
                                                                            <option>Please Select</option>
                                                                            <option>Compartment</option>
                                                                            <option>Name</option>
                                                                            <option>Availability</option>
                                                                            <option>Last Refill</option>
                                                                            <option>Action</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="card-header-right">
                                                                        <ul className="list-unstyled card-option">
                                                                            <li><i
                                                                                className="fa fa fa-wrench open-card-option"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-window-maximize full-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-minus minimize-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-refresh reload-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-trash close-card"></i>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="card-block table-border-style">
                                                                    <div className="table-responsive">
                                                                        <table className="table">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>NO</th>
                                                                                <th>Compartment</th>
                                                                                <th>Name</th>
                                                                                <th>Availability</th>
                                                                                <th>Last Refill</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody id="table-box-notification">
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5 id="drawer_h5">MedCart</h5>
                                                                </div>
                                                                <div className="card-block" align="center">
                                                                    <img width={"275px"} src="assets/img/drawer_1.png"
                                                                         useMap={"#img_map"} alt={"IMAGE"}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5 id="box-content-title">Items in drawer</h5>
                                                                </div>
                                                                <div className="card-block">
                                                                    <div className="form-material">
                                                                        <div
                                                                            className="form-group form-default form-static-label"
                                                                            align="center">
                                                                            <div className="box-content-warp">
                                                                                <div id="box-0" className="item">
                                                                                    <div>
                                                                                        <h5></h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="box-1" className="item">
                                                                                </div>
                                                                                <div id="box-2" className="item">
                                                                                </div>
                                                                                <div id="box-3" className="item">
                                                                                </div>
                                                                                <div id="box-4" className="item">
                                                                                </div>
                                                                                <div id="box-5" className="item">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>Drawer1</h5>
                                                                    <span>details </span>
                                                                    <div className="form-inline">
                                                                        <div className="form-group m-sm-1">
                                                                            <input type="text"
                                                                                   className="form-control"
                                                                                   id="search_inp_0"
                                                                                   placeholder="Search"/>
                                                                        </div>
                                                                        <select id="search_select_0"
                                                                                style={{
                                                                                    height: "36px",
                                                                                    width: "160px",
                                                                                    fontSize: "13px"
                                                                                }}
                                                                                className="form-control form-control-sm btn">
                                                                            <option>Please Select</option>
                                                                            <option>Compartment</option>
                                                                            <option>Name</option>
                                                                            <option>Availability</option>
                                                                            <option>Last Refill</option>
                                                                            <option>Action</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="card-header-right">
                                                                        <ul className="list-unstyled card-option">
                                                                            <li><i
                                                                                className="fa fa fa-wrench open-card-option"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-window-maximize full-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-minus minimize-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-refresh reload-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-trash close-card"></i>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="card-block table-border-style">
                                                                    <div className="table-responsive">
                                                                        <table className="table">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>NO</th>
                                                                                <th>Compartment</th>
                                                                                <th>Name</th>
                                                                                <th>Availability</th>
                                                                                <th>Last Refill</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody id="table-box-0">
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>Drawer2</h5>
                                                                    <span>details </span>
                                                                    <div className="form-inline">
                                                                        <div className="form-group m-sm-1">
                                                                            <input type="text"
                                                                                   className="form-control"
                                                                                   id="search_inp_1"
                                                                                   placeholder="Search"/>
                                                                        </div>
                                                                        <select id="search_select_1"
                                                                                style={{
                                                                                    height: "36px",
                                                                                    width: "160px",
                                                                                    fontSize: "13px"
                                                                                }}
                                                                                className="form-control form-control-sm btn">
                                                                            <option>Please Select</option>
                                                                            <option>Compartment</option>
                                                                            <option>Name</option>
                                                                            <option>Availability</option>
                                                                            <option>Last Refill</option>
                                                                            <option>Action</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="card-header-right">
                                                                        <ul className="list-unstyled card-option">
                                                                            <li><i
                                                                                className="fa fa fa-wrench open-card-option"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-window-maximize full-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-minus minimize-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-refresh reload-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-trash close-card"></i>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="card-block table-border-style">
                                                                    <div className="table-responsive">
                                                                        <table
                                                                            className="table">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>NO</th>
                                                                                <th>Compartment</th>
                                                                                <th>Name</th>
                                                                                <th>Availability</th>
                                                                                <th>Last Refill</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody id="table-box-1">
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>Drawer3</h5>
                                                                    <span>details </span>
                                                                    <div className="form-inline">
                                                                        <div className="form-group m-sm-1">
                                                                            <input type="text"
                                                                                   className="form-control"
                                                                                   id="search_inp_2"
                                                                                   placeholder="Search"/>
                                                                        </div>
                                                                        <select id="search_select_2"
                                                                                style={{
                                                                                    height: "36px",
                                                                                    width: "160px",
                                                                                    fontSize: "13px"
                                                                                }}
                                                                                className="form-control form-control-sm btn">
                                                                            <option>Please Select</option>
                                                                            <option>Compartment</option>
                                                                            <option>Name</option>
                                                                            <option>Availability</option>
                                                                            <option>Last Refill</option>
                                                                            <option>Action</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="card-header-right">
                                                                        <ul className="list-unstyled card-option">
                                                                            <li><i
                                                                                className="fa fa fa-wrench open-card-option"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-window-maximize full-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-minus minimize-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-refresh reload-card"></i>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa fa-trash close-card"></i>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="card-block table-border-style">
                                                                    <div className="table-responsive">
                                                                        <table className="table">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>NO</th>
                                                                                <th>Compartment</th>
                                                                                <th>Name</th>
                                                                                <th>Availability</th>
                                                                                <th>Last Refill</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody id="table-box-2">
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="styleSelector">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <map name="img_map">
                    <area shape="rect" coords="60,190,220,230" onClick={() => this.showDrawer(0)} alt={"区域0"}/>
                    <area shape="rect" coords="60,230,220,270" onClick={() => this.showDrawer(1)} alt={"区域1"}/>
                    <area shape="rect" coords="60,270,220,310" onClick={() => this.showDrawer(2)} alt={"区域2"}/>
                </map>

                <script type="text/javascript">
                    {
                        // 每隔2000ms执行请求一次数据
                        setInterval(() => {
                            this.req_data()
                        }, 200)
                    }
                </script>

            </div>
        )
    }

    drawer_index = -1

    find_active_menu_to_drawer() {
        let active_menu_id = -1
        for (let i = 0; i < menu_lst.length; i++) {
            let menu = menu_lst[i]
            if (menu_lst[i].active) {
                active_menu_id = menu.id
                break
            }
        }
        for (let i = 0; i < menu_dv_drawer_lst.length; i++) {
            let menu_dv_drawer = menu_dv_drawer_lst[i]
            if (menu_dv_drawer.menu_id === active_menu_id) {
                return menu_dv_drawer
            }
        }
        return null
    }

    switchMenu(menu_id) {
        for (let i = 0; i < menu_lst.length; i++) {
            $("#" + menu_lst[i].id).removeClass("active")
        }
        for (let i = 0; i < menu_lst.length; i++) {
            let menu_item = menu_lst[i]
            if (menu_item.id === menu_id) {
                menu_item.active = true
                $("#" + menu_id).addClass("active")
            } else {
                menu_item.active = false
            }
        }
    }

    req_data() {
        // this.simData(tmp_data_lst) // 目前请求不到数据，先隐j解析临时数据
        // new My_tool().aj_req(this.call_func, "aj_req_data", req_url, {}, false, "get")
        axios({
            method: 'get',
            url: req_url,
        }).then((response) => {
            this.simData(JSON.parse(JSON.stringify(response.data)))
        }).catch((error) => {
            console.log(error)
        })
    }

    compareByName(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    simData(req_data_lst) {
        // 转换接收数据
        req_data_lst.sort(this.compareByName) // 根据name序号排序
        let drawer_lst = []
        for (let i = 0; i < req_data_lst.length; i++) {
            let item = req_data_lst[i]
            let item_index_name = item["name"]
            let item_lst = item["items"]
            let drawer_item_lst = []
            for (let j = 0; j < item_lst.length; j++) {
                let item_ = item_lst[j]
                let quantity = item_["quantity"]
                let item_name = item_["item"]["name"]
                let data_dict = {
                    "index": parseInt(item_index_name),
                    "name": item_name,
                    "quantity": new My_tool().fill_zero(quantity, 2)
                }
                drawer_item_lst.push(data_dict)
            }
            drawer_lst.push(drawer_item_lst)
        }
        for (let index = 0; index < menu_dv_drawer_lst.length; index++) {
            menu_dv_drawer_lst[index].drawer_lst = []
            for (let i = 0; i < 3; i++) {
                menu_dv_drawer_lst[index].drawer_lst.push(drawer_lst)
            }
        }

        // ---------------------------------------------------------------
        // 纯模拟数据
        // for (let index = 0; index < menu_dv_drawer_lst.length; index++) {
        //     let drawer_lst = []
        //     for (let i = 0; i < 3; i++) {
        //         let tmp_lst = []
        //         for (let j = 0; j < 6; j++) {
        //             // 随机格子元素数据
        //             let tmp_item_lst = []
        //             for (let k = 0; k < parseInt(this.randomNum(1, 10)); k++) {
        //                 let name_lst = ["Small", "Screwdriver", "Sony Earbuds", "Pi Box", "Fan Box", "Black Plate", "SD Card Reader", "HDMI Converter", "Scissors", "Multimeter"]
        //                 let data_dict = {
        //                     "index": j + 1,
        //                     "name": name_lst[parseInt(this.randomNum(0, name_lst.length))],
        //                     "quantity": new My_tool().fill_zero(parseInt(this.randomNum(1, 10)), 2)
        //                 }
        //                 tmp_item_lst.push(data_dict)
        //             }
        //             tmp_lst.push(tmp_item_lst)
        //         }
        //         drawer_lst.push(tmp_lst)
        //     }
        //     menu_dv_drawer_lst[index].drawer_lst = drawer_lst
        //     menu_dv_drawer_lst[index].drawer_humidity = this.randomNum(1, 100)
        //     menu_dv_drawer_lst[index].drawer_temperature = this.randomNum(1, 100)
        // }
        // ---------------------------------------------------------------

        this.showTable()
        this.showDrawer(this.drawer_index)
    }

    searchTableLst(search_content, search_select, row_item_lst) {
        search_content = $.trim(search_content)
        search_content = search_content.toLowerCase()
        search_select = parseInt(search_select)
        if (search_content === "" || search_select === 0) {
            return -1
        }
        let item_data = row_item_lst[parseInt(search_select) - 1] + ""

        item_data = item_data.toString().toLowerCase()
        if (item_data.includes(search_content)) {
            return 0
        }
        return -2
    }

    searchTable(row, row_item_lst) {
        let search_content = $("#search_inp_" + row).val();
        let search_select = document.getElementById("search_select_" + row).selectedIndex
        return this.searchTableLst(search_content, search_select, row_item_lst)
    }

    searchNotificationTable(row_item_lst) {
        let search_content = $("#search_inp_notification").val();
        let search_select = document.getElementById("search_select_notification").selectedIndex
        return this.searchTableLst(search_content, search_select, row_item_lst)
    }

    showTable() {
        let drawer_dict = this.find_active_menu_to_drawer();
        if (drawer_dict === null) {
            return
        }

        let abnormal_item_lst = [] // 异常数据存放列表

        let box_drawer_content_lst = drawer_dict.drawer_lst
        let box_drawer_tag_lst = drawer_dict.drawer_tag_lst
        for (let row = 0; row < box_drawer_content_lst.length; row++) {
            let box_content_lst = box_drawer_content_lst[row]
            let box_tag_name_lst = box_drawer_tag_lst[row]
            $("#table-box-" + row).html("")
            let count = 0
            for (let box_row = 0; box_row < box_content_lst.length; box_row++) {
                let box_content_row_lst = box_content_lst[box_row]
                for (let col = 0; col < box_content_row_lst.length; col++) {
                    let box_item = box_content_row_lst[col]
                    let tag_name = box_tag_name_lst[parseInt(box_item.index) - 1]
                    let item_name = box_item.name
                    let item = box_item.quantity
                    let head_tr = '<tr>'
                    let stateStr = "Normal"
                    let btn_td = "<button style='background-color: #FFD480' class='btn btn-info'>" + stateStr + "</button>"
                    if (item <= 1) {
                        head_tr = '<tr class="table-danger">'
                        stateStr = "Refill"
                        btn_td = "<button class='btn btn-danger'>" + stateStr + "</button>"
                    } else if (item >= 10) {
                        head_tr = '<tr class="table-success">'
                        stateStr = "Full"
                        btn_td = "<button class='btn btn-success'>" + stateStr + "</button>"
                    }

                    const dayjs = require('dayjs');
                    const formattedTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

                    let search_item_lst = [tag_name, item_name, item, formattedTime, stateStr]

                    if (stateStr === "Refill") {
                        let deep_tmp_lst = [] 
                        deep_tmp_lst = $.extend(deep_tmp_lst, search_item_lst)
                        deep_tmp_lst[0] = deep_tmp_lst[0] + " (Drawer" + (row + 1) + ")"
                        abnormal_item_lst.push(deep_tmp_lst)
                    }

                    let search_state = this.searchTable(row, search_item_lst)
                    if (search_state === -2 && search_state !== -1) {
                        continue
                    }

                    $("#table-box-" + row).append(
                        head_tr +
                        "<td>" + (count + 1) + "</td>" +
                        "<td>" + tag_name + "</td>" +
                        "<td>" + item_name + "</td>" +
                        "<td>" + item + "</td>" +
                        "<td>" + formattedTime + "</td>" +
                        "<td>" + btn_td + "</td>" +
                        "</tr>"
                    )
                    count += 1
                }
            }
        }

        $("#table-box-notification").html("")
        for (let index = 0; index < abnormal_item_lst.length; index++) {
            let search_item_lst = abnormal_item_lst[index]
            let search_state = this.searchNotificationTable(search_item_lst)
            if (search_state === -2 && search_state !== -1) {
                continue
            }
            $("#table-box-notification").append(
                '<tr class="table-danger">' +
                "<td>" + (index + 1) + "</td>" +
                "<td>" + search_item_lst[0] + "</td>" +
                "<td>" + search_item_lst[1] + "</td>" +
                "<td>" + search_item_lst[2] + "</td>" +
                "<td>" + search_item_lst[3] + "</td>" +
                "<td>" + "<button class='btn btn-danger'>" + search_item_lst[4] + "</button>" + "</td>" +
                "</tr>"
            )
        }
    }

    showDrawer(index) {
        let drawer_dict = this.find_active_menu_to_drawer();
        if (drawer_dict === null) {
            return
        }

        this.drawer_index = index
        if (index === -1) {
            return
        }

        let box_drawer_humidity = drawer_dict.drawer_humidity
        let box_drawer_temperature = drawer_dict.drawer_temperature
        let box_drawer_content_lst = drawer_dict.drawer_lst
        let box_drawer_tag_lst = drawer_dict.drawer_tag_lst
        let box_content_lst = box_drawer_content_lst[index]
        let box_tag_lst = box_drawer_tag_lst[index]

        $("#h6_humidity > span").text(box_drawer_humidity)
        $("#h6_temperature > span").text(box_drawer_temperature)
        $("#box-content-title").text("Items in Drawer"+ (index + 1))

        for (let i = 0; i < box_content_lst.length; i++) {
            let box_tag = box_tag_lst[i]
            let box_item_lst = box_content_lst[i]

            let html = "<div>"
            html += "<h5>" + box_tag + "</h5>"
            html += "</div>"
            for (let j = 0; j < box_item_lst.length; j++) {
                let box_item = box_item_lst[j]
                let box_name = box_item.name
                let box_num = box_item.quantity
                if (box_num <=1) {
                    html += '<div class="item_container" style="background: #FF8888">'
                    // document.getElementById("box-" + i).style.backgroundColor = "#ff0000"
                } else if (box_num >= 10) {
                    html += '<div class="item_container" style="background: #BBFF66">'
                    // document.getElementById("box-" + i).style.backgroundColor = "#67ff00"
                } else {
                    html += '<div class="item_container" style="background: #FFBB66">'
                    // document.getElementById("box-" + i).style.backgroundColor = "#f89850"
                }

                html += "<div>" + box_name + "</div>"
                html += "<div>" + box_num + "/10" + "</div>"
                html += '</div>'
            }

            $("#box-" + i).html(html)
        }
    }
}

class Home extends React.Component {

    render() {
        return (
            <div>
                <LoadPage/>
                <HomePage/>
            </div>
        );
    }
}

export default Home;
