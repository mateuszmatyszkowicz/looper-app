import * as React from "react";
import GridLayout, { ItemCallback, Layout } from "react-grid-layout";
import { differenceInCalendarDays } from "date-fns";
import {  useRecoilValue } from "recoil";
import { appState } from "../atoms";

type Props = {
  layout: Layout;
  width: number;
  updateLayout: (layout: Layout) => void;
};

const issue = {
  startDate: new Date(2020, 8, 25),
  endDate: new Date(2020, 9, 3),
};


const SingleGridLayout = ({ layout, width, updateLayout }: Props) => {
  const LAYOUTS = useRecoilValue(appState);
  const layout2 = LAYOUTS.nestedLayouts[layout.i];
  // console.log(layout.i);?
  // console.log("l2", layout2);?
  const { startDate, endDate } = issue;
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (isCollapsed) {
      updateLayout({ ...layout, h: 1 });
    } else {
      const newHeigh = layout2.reduce((prev, curr) => prev + curr.h, 0);

      updateLayout({ ...layout, h: newHeigh });
    }
    // eslint-disable-next-line
  }, [isCollapsed]);

  const onDragStart: ItemCallback = (...args) => {
    // args[4].stopPropagation();
  };

  function createElement(layout: Layout) {
    const isParent = layout.i === "parent";

    return (
      <div
        key={layout.i}
        data-grid={layout}
        onMouseDown={(e) => {
          // e.stopPropagation();
        }}
        onTouchStart={(e) => {
          // e.stopPropagation();
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
            {layout2.length > 1 && (
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
            )}
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
      margin={[0, 5]}
      containerPadding={[0, 0]}
      className="single-grid-layout"
      layout={layout2}
      cols={differenceInCalendarDays(endDate, startDate) * 16}
      width={width}
      maxRows={layout2.length}
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
