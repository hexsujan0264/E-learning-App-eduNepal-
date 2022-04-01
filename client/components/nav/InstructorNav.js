import Link from "next/link";
import { useState, useEffect } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    typeof window !== "undefined" && setCurrent(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);
  return (
    <div className="nav flex-column nav-pills">
      <Link href="/instructor">
        <a className={`nav-link ${current === "/instructor" && "active"}`}>Dashboard</a>
      </Link>
      <Link href="/instructor/course/create">
        <a  className={`nav-link ${current === "/instructor/course/create" && "active"}`}>Course Create</a>
      </Link>
      <Link href="/instructor/revenue">
        <a  className={`nav-link ${current === "/instructor/revenue" && "active"}`}>Revenue</a>
      </Link>
    </div>
  );
};

export default InstructorNav;
