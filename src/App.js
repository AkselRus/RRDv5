import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams,
} from "react-router-dom";

const App = () => (
    <Router>
        <header>
            <h1>App Layout</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/users">Пользователи</Link>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <Switch>
                <Route path="/users">
                    <UsersLayout />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                <Redirect to={"/"} />
            </Switch>
        </main>
    </Router>
);

const Home = () => <h2>Home Page</h2>;

function UsersLayout() {
    const match = useRouteMatch();
    // const { userId } = useParams();

    return (
        <>
            <h2>Users Layout</h2>

            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Главная</Link>
                    </li>
                </ul>
            </nav>

            <div>
                <Switch>
                    <Route path={"/users/:userId/:edit"}>
                        <Edit />
                    </Route>
                    <Route path={`${match.path}/:userId`}>
                        <User />
                    </Route>
                    <Route path={match.path}>
                        <Users />
                    </Route>
                    <Redirect to={`${match.path}/*`} />
                </Switch>
            </div>
        </>
    );
}

function Users() {
    const data = [
        { id: 1, name: "User" },
        { id: 2, name: "User" },
        { id: 3, name: "User" },
        { id: 4, name: "User" },
        { id: 5, name: "User" },
    ];
    const match = useRouteMatch();
    // const { userId } = useParams();

    return (
        <>
            <h2>User List Page</h2>

            <nav>
                <ul>
                    {data.map((el) => (
                        <li key={el.id}>
                            <Link to={`${match.url}/${el.id}`}>
                                {el.name + el.id}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
function User() {
    const match = useRouteMatch();
    const { userId } = useParams();
    console.log(match);

    return (
        <div>
            <h2>User Page</h2>
            <nav>
                <ul>
                    <li>
                        <Link to={`/users`}>Пользователи</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/edit`}>Edit</Link>
                    </li>
                </ul>
            </nav>
            <h3>Идентификатор пользователя: {userId}</h3>
        </div>
    );
}

function Edit() {
    const { userId } = useParams();

    return (
        <div>
            <h2>Edit Page</h2>
            <nav>
                <ul>
                    <li>
                        <Link to={`/users/${userId}`}>User Page</Link>
                    </li>
                    <li>
                        <Link to={`/users/${Number(userId) + 1}`}>
                            Another User
                        </Link>
                    </li>
                    <li>
                        <Link to={`/users`}>Users List Page</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

// function Profile() {
//   const { userId } = useParams();
//   return <h3>Идентификатор userId: {userId}</h3>;
// }

export default App;
