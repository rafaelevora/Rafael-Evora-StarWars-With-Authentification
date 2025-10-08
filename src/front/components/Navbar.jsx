import { Link } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div>
					<Link to="/addcharacter">
						<button className="btn btn-warning">Add Character</button>
					</Link>
				</div>
				<div>
					<Link to="/addplanet">
						<button className="btn btn-warning">Add Planet</button>
					</Link>
				</div>
				<div>
					<Link to="/addspecies">
						<button className="btn btn-warning">Add Species</button>
					</Link>
				</div>
				
						{!store.user ? 
							<div>
								<div>
									<Link to="/login">
										<p>Login</p>
									</Link>
								</div>
								<div>
									<Link to="/signup">
										<p>Sign-in</p>
									</Link>
								</div>
							</div>
						: 
							<div>
								<Link to="/profilepage">
									<button className="btn btn-dark">Profile Page</button>
								</Link>

								<button 
								className="btn btn-dark"
								onClick={ () => dispatch({ type: "log_out_user"}) }
								>Logout</button>
							</div>
						} 
			</div>
		</nav>
	);
};