import React, { Fragment, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';

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
                                {/* <Route path="/" exact render={() => <Main path="../logo192.png" />} />
                <Route path="/post" render={() => <Create path="../logo192.png" />} /> */}
                                <Route path="/about" component={About} />
                                {/* <Route path="/login" component={Login} />
                <Route path="/profile" render={() => <Profile path="../logo192.png" />} /> */}
                                {/* <Route component={NotFound} /> */}
                            </Switch>
                        </Suspense>
                        <About />
                    </div>
                </main>


                <Footer />
            </Router>

        </div>
    )
}

export default App;