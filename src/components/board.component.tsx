import * as React from "react";
import GridLayout from "react-grid-layout";
import { differenceInCalendarDays, format } from "date-fns";
import SingleGridLayout from "./single-grid-layout";
import { LayoutElement } from "../types";
import { useRecoilState } from "recoil";
import { appState } from "../atoms";

const startDate = new Date(2020, 8, 25);
const endDate = new Date(2020, 9, 3);

const Board = () => {
  const [state, setState] = useRecoilState(appState);
  const layout = state.layout;
  const mainGridRef = React.useRef<HTMLDivElement>(null);

  const setLayoutState = (newLayout: LayoutElement) => {
    setState((state) => ({
      ...state,
      layout: state.layout.reduce((prev, curr) => {
        if (curr.i === newLayout.i) {
          return [...prev, newLayout];
        }

        return [...prev, curr];
      }, [] as LayoutElement[]),
    }));
  };

  const [viewCount, setViewCount] = React.useState(7);
  const memoWidth = React.useMemo(
    () =>
      (differenceInCalendarDays(endDate, startDate) / viewCount) *
      window.innerWidth,
    [viewCount]
  );

  const onChildrenChanged = (newLayout: LayoutElement) => {
    setLayoutState(newLayout);
  };

  const [, setIsDragging] = React.useState(false);
  const [, setIsResizing] = React.useState(false);

  const onItemClick = (e: any) => {
    console.log(`onItemClick: ${e}`);
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

  const onLayouteChange = (layout: LayoutElement[]) => {
    setState((state) => ({ ...state, layout }));
  };

  const createElement = (el: any) => {
    return (
      <div key={el.i} data-grid={el.datagrid} onClick={() => onItemClick(el.i)}>
        {el.i !== "c" ? (
          // Ticket bez subticketów
          <div>....</div>
        ) : (
          // Ticket z subticketami
          //
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
            style={{ color: viewCount !== 7 ? "green" : "black" }}
            onClick={() =>
              setViewCount(differenceInCalendarDays(endDate, startDate))
            }
          >
            all
          </div>
        </div>
      </div>
      <div
        ref={mainGridRef}
        style={{ position: "relative", width: memoWidth, paddingLeft: 130 }}
      >
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

export default Board;
