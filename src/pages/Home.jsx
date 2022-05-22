import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Features />
    </div>
  );
}

const Hero = () => (
  <section className="hero">
    <div className="hero_content">
      <h1 className="hero_title">Volcano Explorer</h1>
      <p className="hero_subtitle">Explore the world</p>

      <Link to="/volcano-list">Volcanos</Link>
      <Link to="/login">Login</Link>
    </div>
  </section>
);

function Features() {
  const featuresData = [
    {
      heading: "Discover",
      text:
        "...all the volcanoes that are out there",
    },
    {
      heading: "Explore",
      text:
        "...data about volcanos. Hey, who knows, you might even find a new favourite volcano.",
    },
    {
      heading: "Register",
      text:
        "...with our site. Not happy with the data? A full refund will be provided, no questions asked!",
    }
  ];

  return (
    <article className="features">
      <div className="features_header">
        <h2>Discover</h2>
      </div>

      <div className="features_box-wrapper">
        {
          // display the information for each of our features in their own Box
          featuresData.map((feature) => (
            <FeatureBox feature={feature} />
          ))
        }
      </div>
    </article>
  );
}

// Display a Feature box when passed in the information for the feature
const FeatureBox = ({ feature }) => (
  <div className="features_box">
    <h5>{feature.heading}</h5>
    <p>{feature.text}</p>
  </div>
);
