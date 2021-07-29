import React, { useEffect, useState, useRef, useMemo } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import * as d3 from "d3";
import "../styles/components/gauge.scss";

const chartSettings = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  boundedWidth: 300,
  boundedHeight: 150,
  margin: 20,
};

export default function Gauge() {
  const dms = chartSettings;
  const refSvg = useRef();

  useEffect(() => {
    if (dms.boundedWidth !== 0 && dms.boundedHeight !== 0) {
      // 1. Access data
      let dataset = [];
      var pi = Math.PI,
        rad = pi / 180,
        deg = 180 / pi;

      var properties = {
        width: dms.boundedWidth,
        height: dms.boundedHeight,
        margin: dms.margin,

        rotation: 0,
        thickness: 0.43,
        arc: 1,
        ticks: 6,

        color_scheme: "interpolateSpectral",
        color_step: 150,
        tick_color: "#FFFFFF",
        needle_color: "#BB345B",
      };

      var needlePercent = 0.6,
        center = {},
        radii = {},
        angles = {},
        ticks = {},
        gradient = [],
        scales = {};

      // 3. Draw canvas
      const wrapper = d3.select(refSvg.current);

      const bounds = wrapper
        .append("g")
        .attr("class", "bound")
        .style(
          "transform",
          `translate(${dms.marginLeft}px, ${dms.marginTop}px)`
        );

      center.x = properties.width / 2;
      center.y = properties.height - properties.margin;

      var base = properties.height - 2 * properties.margin;

      radii.base = base;
      radii.cap = base / 15;
      radii.inner = base * (1 - properties.thickness);
      radii.outer_tick = base + 5;
      radii.tick_label = base + 15;

      var arc_complement = 1 - properties.arc;

      angles.arc_complement = arc_complement;
      angles.start_angle =
        -pi / 2 + (pi * arc_complement) / 2 + properties.rotation * rad;
      angles.end_angle =
        pi / 2 - (pi * arc_complement) / 2 + properties.rotation * rad;

      var sub_arc =
          (angles.end_angle - angles.start_angle) / (properties.ticks - 1),
        tick_pct = 100 / (properties.ticks - 1);

      ticks = d3.range(properties.ticks).map(function (d) {
        var sub_angle = angles.start_angle + sub_arc * d;
        return {
          label: (tick_pct * d).toFixed(0) + "%",
          angle: sub_angle,
          coordinates: [
            [sub_angle, radii.inner],
            [sub_angle, radii.outer_tick],
          ],
        };
      });

      var c = d3["interpolateSpectral"],
        samples = 200,
        total_arc = angles.end_angle - angles.start_angle,
        sub_arc2 = total_arc / samples;

      gradient = d3.range(samples).map(function (d) {
        var sub_color = d / (samples - 1),
          sub_start_angle = angles.start_angle + sub_arc2 * d,
          sub_end_angle = sub_start_angle + sub_arc2;
        return {
          fill: c(sub_color),
          start: sub_start_angle,
          end: sub_end_angle,
        };
      });

      scales.lineRadial = d3.lineRadial();

      scales.subArcScale = d3
        .arc()
        .innerRadius(radii.inner + 1)
        .outerRadius(radii.base)
        .startAngle((d) => d.start)
        .endAngle((d) => d.end);

      scales.needleScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([angles.start_angle, angles.end_angle]);

      var gauge = bounds
        .append("g")
        .attr("transform", `translate(${center.x}, ${center.y})`)
        .attr("class", "gauge-container");

      gauge
        .append("g")
        .attr("class", "gauge-arc")
        .selectAll("path")
        .data(gradient)
        .enter()
        .append("path")
        .attr("d", scales.subArcScale)
        .attr("fill", (d) => d.fill)
        .attr("stroke-width", 0.5)
        .attr("stroke", (d) => d.fill);

      gauge
        .append("g")
        .attr("class", "gauge-ticks")
        .selectAll("path")
        .data(ticks)
        .enter()
        .append("g")
        .attr("class", "tick")
        .append("path")
        .attr("d", (d) => scales.lineRadial(d.coordinates))
        .attr("stroke", properties.tick_color)
        .attr("stroke-width", 2)
        .attr("stroke-linecap", "round")
        .attr("fill", "none");

      gauge
        .select("g.gauge-ticks")
        .selectAll("text")
        .data(ticks)
        .enter()
        .append("g")
        .attr("class", "tick-label")
        .append("text")
        .attr(
          "transform",
          (d) =>
            `translate(${radii.tick_label * Math.sin(d.angle)},
                         ${-radii.tick_label * Math.cos(d.angle)})
                rotate(${d.angle * deg - pi})`
        )
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", "0.67em")
        .text((d) => d.label);

      gauge
        .append("g")
        .attr("class", "needle")
        .selectAll("path")
        .data([needlePercent])
        .enter()
        .append("path")
        .attr("d", (d) =>
          scales.lineRadial([
            [scales.needleScale(d), radii.inner - 5],
            [scales.needleScale(d), radii.outer_tick],
          ])
        )
        .attr("stroke", properties.needle_color)
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round");

      //   gauge
      //     .select("g.needle")
      //     .append("circle")
      //     .attr("cx", 0)
      //     .attr("cy", 0)
      //     .attr("r", radii.cap)
      //     .attr("stroke", properties.needle_color)
      //     .attr("stroke-width", 6)
      //     .style("fill", "white");
      gauge
        .select("g.needle")
        .append("text")
        // .style("transform", "translate(50%,65%)")
        .attr("text-anchor", "middle")
        .attr("fill", "#334257")
        .attr("stroke", "#334257")
        .style("font-size", "2.5em")
        .datum(needlePercent)
        .text((d) => `${d * 100}%`);
    }
    return () => {
      const svg = d3.select(refSvg.current);
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gauge">
      <svg
        width={dms.boundedWidth}
        height={dms.boundedHeight}
        ref={refSvg}
      ></svg>
      <h1>Confidence</h1>
    </div>
  );
}
