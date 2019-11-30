import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../../services/user-service';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import About from '../About/About';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Create from '../Cherry/Create/Create';
import Edit from '../Cherry/Edit/Edit';
import Remove from '../Cherry/Remove/Remove';
import Basket from '../Basket/Basket';
// const Login = React.lazy(() => import('../Login/Login'));
// const Register = React.lazy(() => import('../Register/Register'));
// const Create = React.lazy(() => import('../Create'));
// const NotFound = React.lazy(() => import('../NotFound'));

function parseCookies() {
    return document.cookie.split('; ').reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split("=");
        acc[cookieName] = cookieValue;
        return acc;
    }, {})
}

// const camelCased = myString => (
//     myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
// );

class App extends Component {

    constructor(props) {
        super(props);
        const cookies = parseCookies();
        const isLogged = !!cookies["user_cookie"];
        this.state = {
            // username: null,
            // isAdmin: false,
            // userId: "",
            isLogged
        }
    }

    componentDidMount() {
        const isAdmin = localStorage.getItem('isAdmin') === "true";

        if (localStorage.getItem('username')) {
            this.setState({
                username: localStorage.getItem('username'),
                isAdmin,
                userId: localStorage.getItem('userId')
            })
        } else {
            this.setState({
                username: null,
                isAdmin: false,
                userId: ""
            });
        }
    }


    logout(history) {
        userService.getLogout().then(res => {
            if (res) {
                this.setState({
                    username: null,
                    isAdmin: false,
                    userId: "",
                    isLogged: false
                }, () => {
                    localStorage.clear();
                })
                toast.success(res, {
                    closeButton: false
                })
            }
            history.push('/');
        }).catch(err => {
            console.log(err);
        })

    }

    pushToHome = (history) => {
        history.push('/');
    }

    setLogin = (history, data) => {
        userService.login(data).then((res) => {
            if (res.username) {
                this.setState({
                    username: res.username,
                    isAdmin: res.roles.includes('Admin'),
                    userId: res._id,
                    isLogged: true
                }, () => {
                    localStorage.setItem('username', `${res.username}`);
                    localStorage.setItem('userId', `${res._id}`);
                    localStorage.setItem('isAdmin', `${res.roles.includes('Admin')}`);
                });
                toast.success(`Здравей, ${res.username}!`, {
                    closeButton: false
                })
                history.push('/');
            } else {
                toast.error(res, {
                    closeButton: false
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // componentDidMount() {
    //     const isAdmin = localStorage.getItem('isAdmin') === "true";

    //     if (localStorage.getItem('username')) {
    //         this.setState({
    //             username: localStorage.getItem('username'),
    //             isAdmin,
    //             userId: localStorage.getItem('userId')

    //         })
    //     }
    // }

    // handleSubmit = (event, data, isLoginPage, history) => {
    //     event.preventDefault();

    //     userService.post(data, isLoginPage).then(res => {
    //         // const cookies = parseCookies();
    //         if (isLoginPage && res.username) {
    //             this.setState({
    //                 username: res.username,
    //                 isAdmin: res.roles.includes('Admin'),
    //                 userId: res._id,
    //                 isLogged: true

    //             }, () => {
    //                 localStorage.setItem('username', `${res.username}`);
    //                 localStorage.setItem('userId', `${res._id}`);
    //                 localStorage.setItem('isAdmin', `${res.roles.includes('Admin')}`);
    //             })
    //             history.push('/')
    //         } else {
    //             history.push('/user/login')
    //         }
    //         console.log(res);

    //     }).catch(err => {
    //         console.log("Errorrrrrrrrrrrrrrrrrrrr");
    //         console.log(err);
    //     })
    // }

    // handleFormElementChange(event) {

    //     // let debounce;
    //     // const { value, id } = event.target;
    //     // const parsedId = camelCased(id);
    //     // if (debounce) {
    //     //     clearTimeout(debounce);
    //     //     debounce = null;
    //     // }
    //     // debounce = setTimeout(() => {
    //     //     this.setState({
    //     //         [parsedId]: value
    //     //     })
    //     //     debounce = null;
    //     // }, 200);


    //     const { value, id } = event.target;
    //     const parsedId = camelCased(id);
    //     this.setState({
    //         [parsedId]: value
    //     })
    // }

    render() {
        // const { history } = this.props;
        const { isLogged } = this.state;
        return (<div className="main">
            <Header isAdmin={this.state.isAdmin} username={this.state.username} />
            <main className="main-content">
                <div className="wrapper">
                    <ToastContainer autoClose={4000} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/cherry/remove/:id"
                                render={({ history, match }) => <Remove history={history} match={match} />}
                            />
                            <Route path="/cherry/edit/:id"
                                render={({ history, match }) => <Edit history={history} match={match} />}
                            />
                            <Route path="/cherry/create"
                                render={({ history, match }) => <Create history={history} match={match} />}
                            />
                            <Route path="/user/register"
                                render={({ history }) => (!this.state.isLogged ? <Register
                                    // handleSubmit={this.handleSubmit}
                                    // handleFormElementChange={this.handleFormElementChange}
                                    history={history}
                                /> : this.pushToHome(history))}
                            />
                            <Route path="/user/login"
                                render={({ history }) => (!this.state.isLogged ? <Login
                                    // handleSubmit={this.handleSubmit}
                                    // handleFormElementChange={this.handleFormElementChange}
                                    setLogin={this.setLogin}
                                    history={history}
                                /> : this.pushToHome(history))}
                            />
                            <Route path="/user/logout"
                                render={({ history }) => (this.state.isLogged ? this.logout(history) : null)}
                            />
                            <Route path="/order/products/:id"
                                render={({ history, match, location }) => <Basket history={history} match={match} basket={location.state} userId={this.state.userId} />}
                            />
                            <Route path="/order/products"
                                render={({ history, location }) => <Basket history={history} basket={location.state} userId={this.state.userId} />}
                            />
                            <Route path="/order/my-orders"
                                render={() => (!isLogged && <Redirect to="/user/login" />)}
                            />
                            <Route path="/about" component={About} />
                            <Route path="/" exact
                                render={() => <Menu isAdmin={this.state.isAdmin} />}
                            />
                        </Switch>
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>)
    }
}

export default App;