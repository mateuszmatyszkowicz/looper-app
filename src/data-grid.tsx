import * as React from "react";
import GridLayout from "react-grid-layout";
import { differenceInCalendarDays, format } from "date-fns";
import SingleGridLayout from "./components/single-grid-layout";

const startDate = new Date(2020, 8, 25);
const endDate = new Date(2020, 9, 3);
const today = new Date();

const MyFirstGrid = () => {
  // layout is an array of objects, see the demo for more complete usage
  const [layout, setLayout] = React.useState([
    {
      i: "a",
      x: 0,
      y: 0,
      w: differenceInCalendarDays(endDate, startDate) * 16,
      h: 1,
      static: true,
    },
    { i: "b", x: 4, y: 2, w: 8, h: 1 },
    { i: "c", x: 1, y: 4, w: 32, h: 1 },
    { i: "d", x: 1, y: 12, w: 42, h: 11 },
  ]);

  const layout2 = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 20, y: 0, w: 3, h: 1 },
    { i: "c", x: 6, y: 0, w: 1, h: 1 },
  ];

  const layout3 = [
    { i: "a", x: 0, y: 2, w: 1, h: 1 },
    { i: "b", x: 20, y: 3, w: 3, h: 1 },
    { i: "c", x: 6, y: 10, w: 1, h: 1 },
  ];

  const [viewCount, setViewCount] = React.useState(7);
  const [drag, setDrag] = React.useState(true);
  const memoWidth = React.useMemo(
    () =>
      (differenceInCalendarDays(endDate, startDate) / viewCount) *
      window.innerWidth,
    [viewCount]
  );

  const [oneHeight, setOneHeight] = React.useState(1);

  const heightChanged = React.useCallback((id, height) => {
    console.log("id: ", height);
    setLayout((layout) =>
      [...layout].map((i) => ({ ...i, h: i.i === id ? height : i.h }))
    );
  }, []);

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
      <GridLayout
        margin={[0, 0]}
        className="layout"
        layout={layout}
        autoSize={false}
        cols={differenceInCalendarDays(endDate, startDate) * 16}
        rowHeight={30}
        width={memoWidth}
        resizeHandles={["w", "e"]}
        isDraggable={drag}
      >
        <div key="a">
          <GridLayout
            key="B"
            // This turns off compaction so you can place items wherever.
            verticalCompact={false}
            // This turns off rearrangement so items will not be pushed arround.
            preventCollision={true}
            margin={[0, 0]}
            maxRows={1}
            className="layout2"
            layout={layout2}
            cols={differenceInCalendarDays(endDate, startDate) * 16}
            width={memoWidth}
            rowHeight={30}
            onDrag={() => setDrag(false)}
            onDragStop={() => setDrag(true)}
            resizeHandles={["w", "e"]}
          >
            <div key="a">a</div>
            <div key="b">a</div>
            <div key="c">a</div>
          </GridLayout>
        </div>
        <div key="c">
          <SingleGridLayout
            // id="c"
            layout={layout[0]}
            width={memoWidth}
            updateLayout={() => null}
          />
        </div>
        <div key="b">b</div>
        <div key="d">
          <div onClick={() => setOneHeight((x) => (x === 1 ? 11 : 1))}>x</div>
          <GridLayout
            key="B"
            // This turns off compaction so you can place items wherever.
            verticalCompact={false}
            // This turns off rearrangement so items will not be pushed arround.
            // preventCollision={true}
            margin={[0, 0]}
            // maxRows={1}
            className="layout2"
            layout={layout3}
            cols={differenceInCalendarDays(endDate, startDate) * 16}
            width={memoWidth}
            rowHeight={30}
            onDrag={() => setDrag(false)}
            onDragStop={() => setDrag(true)}
            resizeHandles={["w", "e"]}
          >
            <div key="a">d</div>
            <div key="b">
              <GridLayout
                key="B"
                // This turns off compaction so you can place items wherever.
                verticalCompact={false}
                // This turns off rearrangement so items will not be pushed arround.
                // preventCollision={true}
                margin={[0, 0]}
                // maxRows={1}
                className="layout2"
                layout={layout3}
                cols={differenceInCalendarDays(endDate, startDate) * 16}
                width={memoWidth}
                rowHeight={30}
                onDrag={() => setDrag(false)}
                onDragStop={() => setDrag(true)}
                resizeHandles={["w", "e"]}
              >
                <div key="a">d</div>
                <div key="b">d</div>
                <div key="c">d</div>
              </GridLayout>
            </div>
            <div key="c">
              <GridLayout
                key="B"
                // This turns off compaction so you can place items wherever.
                verticalCompact={false}
                // This turns off rearrangement so items will not be pushed arround.
                // preventCollision={true}
                margin={[0, 0]}
                // maxRows={1}
                className="layout2"
                layout={layout3}
                cols={differenceInCalendarDays(endDate, startDate) * 16}
                width={memoWidth}
                rowHeight={30}
                onDrag={() => setDrag(false)}
                onDragStop={() => setDrag(true)}
                resizeHandles={["w", "e"]}
                // onDrag={() => {}}
              >
                <div key="a">d</div>
                <div key="b">d</div>
                <div key="c">d</div>
              </GridLayout>
            </div>
          </GridLayout>
        </div>
      </GridLayout>
    </div>
  );
};

export default MyFirstGrid;
