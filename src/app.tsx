import { Routes } from "config/routes";
import { NavBar } from "components/common";

export const App = () => {
  return (
    <div className="h-screen w-full bg-slate-100">
      <NavBar />
      <Routes />
    </div>
  );
};
