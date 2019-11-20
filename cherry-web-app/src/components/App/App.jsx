import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import About from '../About/About';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Create from '../Cherry/Create/Create';
import Edit from '../Cherry/Edit/Edit';
// const Login = React.lazy(() => import('../Login/Login'));
// const Register = React.lazy(() => import('../Register/Register'));
// const Create = React.lazy(() => import('../Create'));
// const NotFound = React.lazy(() => import('../NotFound'));

function App() {
    return (
        <div className="main">

            <Router>
                <Header />
                <main className="main-content">
                    <div className="wrapper">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route path="/cherry/edit/:id" render={({ match }) => <Edit match={match} />} />
                                <Route path="/cherry/create" component={Create} />
                                <Route path="/user/register" component={Register} />
                                <Route path="/user/login" component={Login} />
                                <Route path="/about" component={About} />
                                <Route path="/" exact component={Menu} />
                            </Switch>
                        </Suspense>
                    </div>
                </main>
                <Footer />
            </Router>

        </div>
    )
}

export default App;