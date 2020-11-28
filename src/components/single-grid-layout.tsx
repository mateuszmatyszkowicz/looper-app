import * as React from "react";
import GridLayout, { ItemCallback, Layout } from "react-grid-layout";
import { differenceInCalendarDays } from "date-fns";
import { LayoutElement } from "../types";

type Props = {
  layout: LayoutElement;
  width: number;
  updateLayout: (layout: LayoutElement) => void;
};

const issue = {
  startDate: new Date(2020, 8, 25),
  endDate: new Date(2020, 9, 3),
};

const layout2: Layout[] = [
  { i: "parent", x: 0, y: 0, w: 18, h: 1, static: true },
  { i: "a", x: 0, y: 1, w: 3, h: 1 },
  { i: "b", x: 20, y: 2, w: 6, h: 1 },
  { i: "c", x: 30, y: 3, w: 10, h: 1 },
];

const SingleGridLayout = ({ layout, width, updateLayout }: Props) => {
  const { startDate, endDate } = issue;
  const { collapsed } = layout;
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  React.useEffect(() => {
    if (isCollapsed) {
      updateLayout({ ...layout, h: 1 });
    } else {
      const newHeigh = layout2.reduce((prev, curr) => prev + curr.h, 0);

      updateLayout({ ...layout, h: newHeigh });
    }
  }, [isCollapsed]);

  const onDragStart: ItemCallback = (...args) => {
    args[4].stopPropagation();
  };

  function createElement(layout: Layout) {
    const isParent = layout.i === "parent";

    return (
      <div
        key={layout.i}
        data-grid={layout}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
      >
        {isParent ? (
          <>
            <div
              style={{
                position: "absolute",
                left: -30,
                top: 0,
                bottom: 0,
                display: "flex",
                height: "100%",
                background: "yellow",
                transform: "translateX(-100%)",
              }}
            >
              <div style={{ width: 30, height: 30, background: "gray" }} />
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                height: "100%",
                background: "yellow",
                transform: "translateX(100%)",
              }}
              onClick={(e) => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              <div>{isCollapsed ? "collapsed" : "notcollapsed"}</div>
            </div>
          </>
        ) : null}
        <span className="text">{layout.i} as</span>
      </div>
    );
  }

  return (
    <GridLayout
      compactType={null}
      preventCollision={false}
      margin={[0, 0]}
      className="single-grid-layout"
      layout={layout2}
      cols={differenceInCalendarDays(endDate, startDate) * 16}
      width={width}
      maxRows={4}
      rowHeight={30}
      resizeHandles={["w", "e"]}
      onDragStart={onDragStart}
    >
      {isCollapsed
        ? layout2.filter((l) => l.i === "parent").map((l) => createElement(l))
        : layout2.map((l) => createElement(l))}
    </GridLayout>
  );
};

export default SingleGridLayout;
