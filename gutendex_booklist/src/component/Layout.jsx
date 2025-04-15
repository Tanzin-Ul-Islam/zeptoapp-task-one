import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen pt-[80px] md:pt-[96px]">{children}</main>
    </div>
  );
};

export default Layout;
