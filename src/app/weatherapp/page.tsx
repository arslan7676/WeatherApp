import { NextPage } from "next";
import WeatherApp from "../Components/WeatherApp";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <WeatherApp />
    </div>
  );
};

export default Home;
