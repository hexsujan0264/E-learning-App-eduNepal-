import { useState, useEffect } from "react";
import Link from "next/link";


const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    typeof window !== "undefined" && setCurrent(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/user">
        <a  className={`nav-link ${current === "/user" && "active"}`}>Dashboard</a>
      </Link>
    </div>
  );
};

export default UserNav;
