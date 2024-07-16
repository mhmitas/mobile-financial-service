import { NavLink } from "react-router-dom";

export const navlinks = <>
    <NavLinkComponent path="/" name="Home" type="navlink" />
</>


function NavLinkComponent({ name, path, type }) {
    if (type === "navlink") {
        return (
            <li>
                <NavLink end className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to={path}>{name}</NavLink>
            </li>
        )
    }
}