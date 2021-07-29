import React, { useEffect, useState, useRef, useMemo } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import * as d3 from "d3";
import data from "../assets/data/data.json";

const chartSettings = {
  marginTop: 30,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 20,
};

export default function XAI() {
  const [ref, dms] = useChartDimensions(chartSettings);
  const refSvg = useRef();

  useEffect(() => {
    if (dms.boundedWidth !== 0 && dms.boundedHeight !== 0) {
      // 1. Access data
      let dataset = [];

      // 3. Draw canvas
      const svg = d3.select(refSvg.current);
      const wrapper = d3.select(refSvg.current);

      const bounds = wrapper
        .append("g")
        .attr("class", "bound")
        .style(
          "transform",
          `translate(${dms.marginLeft}px, ${dms.marginTop}px)`
        );

      console.log(data);

      //   var width = 500;
      //   var selectStates = {
      //     Florida: "none",
      //     Pennsylvania: "none",
      //     Ohio: "none",
      //     Georgia: "none",
      //     "North Carolina": "none",
      //     Arizona: "none",
      //     Wisconsin: "none",
      //     Iowa: "none",
      //     Nevada: "none",
      //     "New Hampshire": "none",
      //     "Maine-2": "none",
      //     "Nebraska-2": "none",
      //   };
      //   var candidateR = "Trump";
      //   var candidateD = "Biden";
      //   var stateLabel = (d) => (width > 800 ? d.name : d.shortname);
      //   var fullOpacity = 1.0;
      //   var normalOpacity = 0.3;
      //   var prunedOpacity = 0.05;
      //   var colorR = "#c92a2a";
      //   var colorD = "#2a72c9";
      //   var radius = 390;
      //   var targetWidth = Math.min(width, radius * 2);
      //   var partyColor = (d) =>
      //     d.party === "D" ? colorD : d.party === "R" ? colorR : "#888";
      //   var winner = (d) => {
      //     const outcome = result(d);
      //     return !outcome || outcome === "tie" ? null : outcome;
      //   };
      //   var result = (d) =>
      //     d.votesD > 269
      //       ? "D"
      //       : d.votesR > 269
      //       ? "R"
      //       : d.votesD === 269 && d.votesR === 269
      //       ? "tie"
      //       : null;
      //   var votesScale = d3
      //     .scaleLinear()
      //     .domain([0, 538])
      //     .range([0, targetWidth]);
      //   var circleSize = d3
      //     .scaleSqrt()
      //     .domain(d3.extent(contested.map((d) => d.votes)))
      //     .range([2.5, 6.5]);
      //   var strokeOpacity = (pruned, highlight) =>
      //     pruned ? prunedOpacity : highlight ? fullOpacity : normalOpacity;
      //   var tree = d3
      //     .cluster()
      //     .size([2 * Math.PI, radius])
      //     .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

      //   function autoBox() {
      //     document.body.appendChild(this);
      //     const { x, y, width, height } = this.getBBox();
      //     document.body.removeChild(this);
      //     return [x - 5, y, width + 10, height];
      //   }

      //   var decided = new Map(
      //     Object.entries(selectStates).filter(([key, value]) => value !== "none")
      //   );

      //   var totalR = d3.sum(
      //     data.filter((d) => d.category === "R").map((d) => d.votes)
      //   );

      //   var totalD = d3.sum(
      //     data.filter((d) => d.category === "D").map((d) => d.votes)
      //   );

      //   var contested = data
      //     .filter((d) => d.category === "none")
      //     .sort((a, b) => d3.descending(a.votes, b.votes));

      //   var treeData = (() => {
      //     const root = {
      //       name: "",
      //       votes: 0,
      //       votesD: totalD,
      //       votesR: totalR,
      //       pruned: false,
      //     };
      //     function buildTree(node, depth) {
      //       if (depth < contested.length && !winner(node)) {
      //         const state = contested[depth];
      //         node.children = [
      //           {
      //             name: state.name,
      //             shortname: state.shortname,
      //             party: "D",
      //             votes: state.votes,
      //             votesD: node.votesD + state.votes,
      //             votesR: node.votesR,
      //             pruned:
      //               node.pruned ||
      //               (decided.has(state.name) && decided.get(state.name) === "R"),
      //           },
      //           {
      //             name: state.name,
      //             shortname: state.shortname,
      //             party: "R",
      //             votes: state.votes,
      //             votesD: node.votesD,
      //             votesR: node.votesR + state.votes,
      //             pruned:
      //               node.pruned ||
      //               (decided.has(state.name) && decided.get(state.name) === "D"),
      //           },
      //         ];
      //         node.children.forEach((child) => buildTree(child, depth + 1));
      //       }
      //       return node;
      //     }
      //     return buildTree(root, 0);
      //   })();

      // 4. Create scales

      // 5. Draw data

      // 6. Draw peripherals

      // // 7. Draw Scene Breaks
    }
    return () => {
      const svg = d3.select(refSvg.current);
      svg.selectAll("*").remove();
    };
  }, [dms.boundedHeight, dms.boundedWidth, dms.marginLeft, dms.marginTop]);

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
