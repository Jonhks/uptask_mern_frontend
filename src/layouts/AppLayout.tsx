import { Link, Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

const AppLayout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1rf_auto]">
      <header className=" bg-gray-800 py-5 h-fit">
        <div className=" max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className=" w-64">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <NavMenu />
        </div>
      </header>
      <section className=" max-w-screen-2xl w-3/5 mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="p-5 flex items-end justify-center">
        <p className="text-center">
          Funcionando hasta el {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
