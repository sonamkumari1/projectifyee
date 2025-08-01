import Banner from "../components/Home/Banner";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import ProjectDashboard from "../components/Home/ProjectDashboard";

function Home() {
  return (
    <div>
      <Header />
      <div className="sm:px-32 md:px-32 lg:px-32">
        <Banner />
        <ProjectDashboard />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
