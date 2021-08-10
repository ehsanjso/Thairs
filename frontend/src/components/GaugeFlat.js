import React, { useEffect, useState, useRef, useMemo } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import * as d3 from "d3";
import { Button } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import "../styles/components/gauge.scss";

const chartSettings = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
};

export default function Gauge({ data, getMovie, cluster, hasMovie }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const refSvg = useRef();
  const refCanvas = useRef();

  const f = d3.format(".0%");

  useEffect(() => {
    if (dms.boundedWidth !== 0 && dms.boundedHeight !== 0) {
      // 1. Access data
      let dataset = [];

      // 3. Draw canvas
      const wrapper = d3.select(refSvg.current);

      const bounds = wrapper.append("g").attr("class", "bound");

      const scale = d3
        .scaleLinear()
        .domain([0, 1]) // unit: km
        .range([0, dms.boundedWidth]); // unit: pixels

      bounds
        .append("line")
        .attr("x1", scale(data))
        .attr("y1", 55)
        .attr("x2", scale(data))
        .attr("y2", 100)
        .style("stroke", "#2d2d2d")
        .style("stroke-width", "2");
      // .call(blink)

      bounds
        .append("circle")
        .attr("cx", scale(data))
        .attr("cy", 55)
        .attr("r", 5)
        .style("fill", "#2d2d2d")
        .style("opacity", 1)
        .style("stroke", "#2d2d2d")
        .style("stroke-width", "2");

      bounds
        .append("text")
        .style("transform", `translate(${scale(data)}px, 35px)`)
        .attr("text-anchor", (d) =>
          data > 0.95 ? "end" : data < 0.05 ? "start" : "middle"
        )
        .attr("fill", "#334257")
        .attr("stroke", "#334257")
        .style("font-size", "2em")
        .datum(data)
        .text((d) => d3.format(".0%")(d));

      // gauge
      //   .select("g.needle")
      //   .append("text")
      //   // .style("transform", "translate(50%,65%)")
      //   .attr("text-anchor", "middle")
      //   .attr("fill", "#334257")
      //   .attr("stroke", "#334257")
      //   .style("font-size", "2.5em")
      //   .datum(data)
      //   .text((d) => d3.format(".0%")(d));
    }
    return () => {
      const svg = d3.select(refSvg.current);
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dms.boundedHeight,
    dms.boundedWidth,
    dms.marginLeft,
    dms.marginTop,
    data,
  ]);

  useEffect(() => {
    if (dms.boundedWidth !== 0 && dms.boundedHeight !== 0) {
      const n = 512;
      const canvas = d3.select(refCanvas.current);
      const context = canvas.node().getContext("2d");
      canvas.style.width = "100%";
      canvas.style.height = "30px";
      canvas.style.imageRendering = "-moz-crisp-edges";
      canvas.style.imageRendering = "pixelated";
      const rectSize = dms.boundedWidth / n;
      for (let i = 0; i < n; i++) {
        context.fillStyle = d3.interpolateRdBu(i / (n - 1));
        context.fillRect(i * rectSize, 0, rectSize, 30);
      }
    }
    return () => {
      const svg = d3.select(refCanvas.current);
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dms.boundedHeight, dms.boundedWidth, dms.marginLeft, dms.marginTop]);

  return (
    <div className="gauge-flat" ref={ref}>
      <svg width={dms.width} height={100} ref={refSvg}></svg>
      <canvas
        className="canvas"
        width={dms.width}
        height={30}
        ref={refCanvas}
      ></canvas>
      <h1>Confidence</h1>
      {/* {!hasMovie && (
        <Button
          type="primary"
          icon={<CoffeeOutlined />}
          className="recommend-btn"
          onClick={() => getMovie(cluster)}
        >
          Lets Goooo!
        </Button>
      )} */}
    </div>
  );
}

const useChartDimensions = (passedSettings) => {
  const ref = useRef();
  const dimensions = combineChartDimensions(passedSettings);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];
    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;
      const entry = entries[0];
      if (width !== entry.contentRect.width) setWidth(entry.contentRect.width);
      if (height !== entry.contentRect.height)
        setHeight(entry.contentRect.height);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [dimensions, width, height]);
  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });
  return [ref, newSettings];
};

const combineChartDimensions = (dimensions) => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop,
    marginRight: dimensions.marginRight,
    marginBottom: dimensions.marginBottom,
    marginLeft: dimensions.marginLeft,
  };
  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    ),
  };
};
