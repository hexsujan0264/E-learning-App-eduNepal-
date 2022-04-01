import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    typeof window !== "undefined" && setCurrent(window.location.pathname);
    // console.log(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT " });
    window.localStorage.removeItem("user");
    const { data } = await axios.post("/api/logout");
    toast(data.message);
    router.push("/");
    location.reload();
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2" theme="dark">
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        // icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>eduNepal</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a>Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a className="typewriter">Login</a>
            </Link>
          </Item>

          <Item
            key="/signup"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/signup">
              <a className="typewriter">Sign Up</a>
            </Link>
          </Item>
        </>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className=""
        >
          <Link href="/user/become-instructor">
            <a>Instructor</a>
          </Link>
        </Item>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
          key="submenu"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/instructor" key="inst">
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item onClick={logout} className="float-right" key="logout">
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
