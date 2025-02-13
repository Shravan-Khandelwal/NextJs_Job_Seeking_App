import React from "react";
import { InfiniteMovingCardsDemo } from "./../components/MovingCardComponent";
import NavbarDemo from "./../components/NavbarComponent.jsx";
import HeroComponent from "./../components/HeroComponent.jsx";
import { TypewriterEffectSmoothDemo } from "./../components/TypeWriterComponent.jsx";
import { FocusCardsDemo } from "./../components/FocusCardComponent.jsx";
import AuthComponent from "./../components/AuthComponent";
import "./globals.css";
import { CoverDemo } from "./../components/SparkleComponent";
import AnimatedSection from "./../components/AnimatedSection";
function page() {
  return (
    <div>
        <NavbarDemo />
    

        <AuthComponent />
  

      <AnimatedSection>
        <HeroComponent />
      </AnimatedSection>

      <AnimatedSection>
        <CoverDemo />
      </AnimatedSection>

      <AnimatedSection>
        <FocusCardsDemo />
      </AnimatedSection>

      <AnimatedSection>
        <InfiniteMovingCardsDemo />
      </AnimatedSection>

      <AnimatedSection>
        <TypewriterEffectSmoothDemo />
      </AnimatedSection>
    </div>
  );
}

export default page;
