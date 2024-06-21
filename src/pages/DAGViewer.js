/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef, useCallback } from "react";
import { Graphviz } from "graphviz-react";
import { graphviz } from "d3-graphviz";

export default ({ dot, width, height }) => {
    // gen css from props
    const style = {
        width: width || "100%",
        height: height || "100%"
    };

    const graphvizRoot = useRef(null);

    // update style in Graphviz div
    useEffect(() => {
        if (graphvizRoot.current) {
            const { id } = graphvizRoot.current;
            const el = document.getElementById(id);
            for (let [k, v] of Object.entries(style)) {
                el.style[k] = v;
            }
            graphviz(`#${id}`);
        }
    }, [graphvizRoot, style]);
    return (
        <div
            style={{ ...style, position: "relative", overflow: "hidden", }}>
            {dot !== ""
                ? [
                    <Graphviz
                        dot={dot}
                        options={{
                            useWorker: false,
                            ...style,
                            zoom: true
                            //...props
                        }}
                        ref={graphvizRoot}
                    />,
                    // <button
                    //     onClick={reset}
                    //     style={{
                    //         position: "absolute",
                    //         right: "5%",
                    //         top: "5%"
                    //     }}>
                    //     Reset
                    // </button>
                ]
                : null}
        </div>
    );
};
