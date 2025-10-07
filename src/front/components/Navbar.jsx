import { Link } from "react-router-dom";


export const Navbar = () => {

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
			</div>
		</nav>
	);
};