import * as React from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { differenceInCalendarDays, format } from "date-fns";
import SingleGridLayout from "./components/single-grid-layout";

const startDate = new Date(2020, 8, 25);
const endDate = new Date(2020, 9, 3);

const TestingPage = () => {
  const mainGridRef = React.useRef<HTMLDivElement>(null);
  // layout is an array of objects, see the demo for more complete usage
  const [layout, setLayout] = React.useState([
    // {
    //   i: "a",
    //   x: 0,
    //   y: 0,
    //   w: differenceInCalendarDays(endDate, startDate) * 16,
    //   h: 1,
    // },
    { i: "b", x: 4, y: 1, w: Infinity, h: 1 },
    // { i: "d", x: 1, y: 2, w: Infinity, h: 1, collapsed: true, isBounded: true },
    { i: "c", x: 1, y: 3, w: Infinity, h: 1, collapsed: true },
  ] as (Layout & { collapsed?: boolean })[]);

  const [viewCount, setViewCount] = React.useState(7);
  const memoWidth = React.useMemo(
    () =>
      (differenceInCalendarDays(endDate, startDate) / viewCount) *
      window.innerWidth,
    [viewCount]
  );

  const onChildrenChanged = (newLayout: Layout & { collapsed?: boolean }) => {
    setLayout(() =>
      layout.reduce((prev, curr) => {
        if (curr.i === newLayout.i) {
          return [...prev, newLayout];
        }

        return [...prev, curr];
      }, [] as Layout[])
    );
  };

  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);

  const onItemClick = (e: any) => {
    // idiomatic way to prevent a click when resizing
  };

  const onDrag = (e: any) => {
    setIsDragging(true);
  };
  const onDragStop = (e: any) => {
    // HACK: add some delay otherwise a click event is sent
    setTimeout(() => {
      setIsDragging(false);
    }, 200);
  };
  const onResizeStart = (e: any) => {
    setIsResizing(true);
  };
  const onResizeStop = (e: any) => {
    // HACK: add some delay otherwise a click event is sent
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  };

  React.useEffect(() => {
    setTimeout(() => {
      console.log(mainGridRef.current?.getBoundingClientRect().height);
    }, 250);
  }, [layout]);

  const onLayouteChange = (layout: GridLayout.Layout[]) => {
    // console.log(layout);
    setLayout(layout);
  };

  const createElement = (el: any) => {
    return (
      <div key={el.i} data-grid={el.datagrid} onClick={() => onItemClick(el.i)}>
        {el.i !== "c" ? (
          <div>....</div>
        ) : (
          <SingleGridLayout
            layout={layout.filter((e) => e.i === "c")[0]}
            width={memoWidth}
            updateLayout={onChildrenChanged}
          />
        )}
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        {format(startDate, "iiii").toString()}
        {differenceInCalendarDays(endDate, startDate)}
        {format(endDate, "iiii").toString()}
        {memoWidth}
        <div style={{ flex: 1 }}>
          <div
            style={{ color: viewCount === 7 ? "green" : "black" }}
            onClick={() => setViewCount(7)}
          >
            7 days
          </div>
          <div
            style={{ color: viewCount != 7 ? "green" : "black" }}
            onClick={() =>
              setViewCount(differenceInCalendarDays(endDate, startDate))
            }
          >
            all
          </div>
        </div>
      </div>
      <div ref={mainGridRef} style={{ position: "relative", width: memoWidth, paddingLeft: 130 }}>
        <GridLayout
          margin={[0, 0]}
          containerPadding={[5, 0]}
          className="layout"
          layout={layout}
          cols={differenceInCalendarDays(endDate, startDate) * 16}
          rowHeight={30}
          width={memoWidth}
          onLayoutChange={onLayouteChange}
          resizeHandles={["w", "e"]}
          onDrag={onDrag}
          onDragStop={onDragStop}
          onResize={onResizeStart}
          onResizeStop={onResizeStop}
        >
          {layout.map((e: any) => createElement(e))}
        </GridLayout>
        <div className="gantt-bg"></div>
      </div>
    </div>
  );
};

export default TestingPage;
