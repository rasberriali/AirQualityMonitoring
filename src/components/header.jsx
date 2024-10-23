import logo from "../images/logo.png";

function Header() {
  return (
    <div className="bg-gradient-to-r from-[#022944] to-[#034f84] text-white flex justify-between items-center py-2 px-20 shadow-md mb-10">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="w-20" />
        <div className="text-lg ">AiRizz</div>
      </div>
      <div className="text-xl font-semibold">
        Air Quality Monitoring
      </div>
      <div className="text-xl font-semibold">
        Batangas City
      </div>
      
    </div>
  );
}

export default Header;
