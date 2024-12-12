import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

const AppLayout = () => {
  return (
    <>
      <header className=" bg-gray-800 py-5">
        <div className=" max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className=" w-64">
            <Logo />
          </div>
          <NavMenu />
        </div>
      </header>
      <section className=" max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="p-5">
        <p className="text-center">
          Funcionando hasta el {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
};

export default AppLayout;