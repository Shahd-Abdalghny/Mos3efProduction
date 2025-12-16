/** @format */
import ChatBotButton from "../components/ChatBotButton";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
const MainLayout = ({ children }) => {
  return (
    <>
    <div className="relative bg-cover bg-center flex flex-col items-center w-full">
      <NavBar />
      {children}
      <ChatBotButton/>
    </div>
    <Footer/>
    </>
  );
};

export default MainLayout;
