import React, { useEffect, useState, useRef, useMemo } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import * as d3 from "d3";
import data from "../assets/data/data.json";
import "../styles/components/xai.scss";

const chartSettings = {
  marginTop: 300,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 276,
};

export default function XAI({ treeArray, answers }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const refSvg = useRef();

  useEffect(() => {
    if (dms.boundedWidth !== 0 && dms.boundedHeight !== 0 && treeArray) {
      // 1. Access data
      const formattedTree = (treeRoot, id, level, direction) => {
        treeRoot = {
          ...treeArray[id],
          direction: answers.includes(id) ? direction : undefined,
          pruned: false,
        };

        if (level > 7) {
          return treeRoot;
        }

        if (treeRoot.leftChild !== -1 || treeRoot.rightChild !== -1) {
          treeRoot.children = [{}, {}];
        }

        if (treeRoot.leftChild !== -1) {
          treeRoot.children[0] = formattedTree(
            treeRoot.children[0],
            treeRoot.leftChild,
            level + 1,
            "left"
          );
        }
        if (treeRoot.rightChild !== -1) {
          treeRoot.children[1] = formattedTree(
            treeRoot.children[1],
            treeRoot.rightChild,
            level + 1,
            "right"
          );
        }
        return treeRoot;
      };
      // 3. Draw canvas

      var stateLabel = (d) => d.feature;
      var fullOpacity = 1.0;
      var normalOpacity = 0.3;
      var prunedOpacity = 0.05;
      var colorNo = "#c92a2a";
      var colorYes = "#2a72c9";
      var radius = 250;
      var childColor = (d) =>
        d.direction === "left"
          ? colorYes
          : d.direction === "right"
          ? colorNo
          : "#888";
      var strokeOpacity = (pruned, highlight) =>
        pruned ? prunedOpacity : highlight ? fullOpacity : normalOpacity;
      var tree = d3
        .cluster()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

      const root = tree(d3.hierarchy(formattedTree({}, 0, 0)));
      const linkWidth = d3.scaleLinear().domain([root.height, 0]).range([1, 7]);

      const wrapper = d3
        .select(refSvg.current)
        .attr("font-size", 12)
        .attr("font-family", "Roboto");

      const element = wrapper.node();
      element.value = [];

      const g = wrapper
        .append("g")
        .attr("class", "bound")
        .style(
          "transform",
          `translate(${dms.marginLeft}px, ${
            window.innerHeight - radius * 2 - 40
          }px)`
        )
        .on("mouseleave", () => update(null));

      g.append("circle").attr("r", radius).attr("fill", "white");

      const linksGroup = g
        .append("g")
        .attr("fill", "none")
        .selectAll("g")
        .data(root.links())
        .join("g")
        .on("mouseenter", (event, d) => update(d.target));

      const links = linksGroup
        .append("path")
        .attr(
          "d",
          d3
            .linkRadial()
            .angle((d) => d.x)
            .radius((d) => d.y)
        )
        .attr("stroke-width", (d) => linkWidth(d.target.depth))
        .attr("stroke-opacity", (d) =>
          strokeOpacity(d.target.data.pruned, false)
        )
        .attr("stroke", (d) => childColor(d.target.data));

      links
        .clone(true)
        .lower()
        .attr("stroke-opacity", 0)
        .attr("stroke-width", (d) => linkWidth(d.target.depth) + 10);

      const circlesGroup = g
        .append("g")
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr(
          "transform",
          (d) => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
        )
        .on("mouseenter", (event, d) => update(d));

      const circles = circlesGroup
        .append("circle")
        .attr("stroke", (d) => childColor(d.data))
        .attr("stroke-opacity", (d) => strokeOpacity(d.data.pruned, 0.2))
        .attr("stroke-width", 1.5)
        .attr("fill", (d, i) => (i === 0 ? "white" : childColor(d.data)))
        .attr("fill-opacity", (d) => (d.data.pruned && !d.children ? 0.1 : 1))
        .attr("r", (d, i) => (i === 0 ? 16 : 3));

      circles
        .clone(true)
        .lower()
        .attr("stroke-opacity", 0)
        .attr("fill-opacity", 0)
        .attr("r", (d, i) => (i === 0 ? 16 : 3));

      const labelGroup = g
        .append("g")
        .attr("pointer-events", "none")
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr(
          "transform",
          (d) =>
            `translate(${
              Math.cos(d.x - Math.PI / 2) * (d.children ? d.y : d.y + 10)
            },${Math.sin(d.x - Math.PI / 2) * (d.children ? d.y : d.y + 10)})`
        )
        .attr("visibility", "hidden");

      const labels = labelGroup
        .append("text")
        .attr("dy", (d) =>
          !d.children ? `${Math.cos(d.x) * -0.4 + 0.31}em` : "0.31em"
        )
        .attr("dx", (d) => {
          const dx = 4;
          return !d.children ? 0 : d.x < Math.PI === !d.children ? dx : -dx;
        })
        .attr("text-anchor", (d) =>
          d.x < Math.PI === !d.children ? "start" : "end"
        )
        .attr("fill", (d) => childColor(d.data))
        .attr("font-weight", (d) => "400")
        .text((d, i) => (i === 0 ? "" : stateLabel(d.data)));

      labels
        .clone(true)
        .lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

      g.append("text")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#888")
        .attr("dy", "0.31em")
        .text("Start");

      function update(d) {
        if (d && d.data && d.data.pruned) return;
        const sequence = d ? d.ancestors().map((d) => d.data) : [];
        links.attr("stroke-opacity", (link) =>
          strokeOpacity(
            link.target.data.pruned,
            sequence.indexOf(link.target.data) >= 0
          )
        );
        circles.attr("stroke-opacity", (node) =>
          strokeOpacity(node.data.pruned, sequence.indexOf(node.data) >= 0)
        );
        labelGroup.attr("visibility", (node) =>
          sequence.indexOf(node.data) >= 0 ? null : "hidden"
        );
        element.value = sequence.reverse().slice(1);
        element.dispatchEvent(new CustomEvent("input"));
      }

      // wrapper.attr("viewBox", autoBox);

      // 4. Create scales

      // 5. Draw data

      // 6. Draw peripherals

      // // 7. Draw Scene Breaks
    }
    return () => {
      const svg = d3.select(refSvg.current);
      svg.selectAll("*").remove();
    };
  }, [
    dms.boundedHeight,
    dms.boundedWidth,
    dms.marginLeft,
    dms.marginTop,
    treeArray,
    answers,
  ]);

  return (
    <div className="xai" ref={ref}>
      <svg width={dms.width} height={dms.height} ref={refSvg}></svg>
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
