import "./navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <a href="/" className="logo">
        Homi Stay
      </a>

      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/">Profile</a>
        <a href="/">Sign in</a>
      </nav>
    </header>
  );
};

export default Navbar;
