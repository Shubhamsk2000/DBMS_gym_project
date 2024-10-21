import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to={'/'}>Fitness</Link>
                </div>

                <div className="flex space-x-6 items-center">
                    <Link to={'/'} className="text-white hover:text-gray-400">Home</Link>
                    <Link to={'/signin'}
                     className="text-white rounded-xl border border-white py-2 px-4">Sign In</Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
