import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
        <span>MitevGPT</span>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
