import Link from "@/components/Link";

const Navbar = () => {
    return(
        <nav className="flex justify-between p-4">
            <div>
                <Link URL="/">Home</Link>
            </div>
            <div className="space-x-4">
                <Link URL="/login">Login</Link>
                <Link URL="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;