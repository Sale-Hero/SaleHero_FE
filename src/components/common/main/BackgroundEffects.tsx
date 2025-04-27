import {ParticleBackground} from "./styled/ParticleBackground";
import {CloudBackground} from "./styled/CloudBackground";
import {BackgroundAnimationContainer} from "./styled/MainStyledAnimation";
import React from "react";

export function BackgroundEffects() {
    return(
        <>
            <ParticleBackground />
            <CloudBackground />
            <BackgroundAnimationContainer />
        </>
    )
}