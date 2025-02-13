import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import CardWithForm from "./CardForm";

export function BackgroundBeamsWithCollisionComponent() {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <CardWithForm></CardWithForm>
      </BackgroundBeamsWithCollision>
    </>
  );
}
