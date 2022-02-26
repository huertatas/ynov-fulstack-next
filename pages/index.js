import HeaderNetflix from "../components/header/HeaderNetflix";
import Slider from "react-slick";

export default function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  return (
    <div className="main-home">
      <HeaderNetflix />
      <main className="main--homepage-net">{/* video en fond */}</main>
      <div className="slick-contains">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div className="slick-els">
            <h3>1</h3>
          </div>
        </Slider>
      </div>
      {/* prenium */}
      <div className="slick-contains">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div className="slick-els">
            <h3>1</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}
