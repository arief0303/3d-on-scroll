import * as React from "react";
import "./src/styles/global.css"
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'

export const wrapRootElement = ({ element }) => (
    <>
        <GlobalCanvas style={{ zIndex: -1 }}>
            <ambientLight />
        </GlobalCanvas>
        {element}
    </>
)