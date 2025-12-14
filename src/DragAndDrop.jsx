import React, { useEffect, useRef, useState } from "react";

const DragAndDrop = ({ data: intialData }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("tasks-data");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return intialData;
  });

  useEffect(() => {
    localStorage.setItem("tasks-data", JSON.stringify(data));
  }, [data]);

  const mainHeadings = Object.keys(data); //["Office_Task","Home_Task","Sunday_Task"]

  const dragItem = useRef(); // This will store the information of the source task , idx , container
  const dragOverItem = useRef(); // This will store the information of the destination   heading , idx

  function handleStartDrag(e, task, heading, idx) {
    e.target.style.opacity = 0.5;
    dragItem.current = {
      task,
      heading,
      idx,
    };
  }

  function handleDragEnd(e) {
    e.target.style.opacity = 1;
  }

  function handleDragEnter(e, idx, heading) {
    dragOverItem.current = { idx, heading };
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop() {
    const source = dragItem.current;
    const dest = dragOverItem.current;

    if (!source || !dest) return null;

    setData((pre) => {
      // this means we are using drag and drop in same list
      if (source.heading == dest.heading) {
        const list = [...pre[source.heading]];
        const sourceIdx = source.idx;
        const destinationIdx = dest.idx;
        const [removedItem] = list.splice(sourceIdx, 1);
        list.splice(destinationIdx, 0, removedItem);

        return {
          ...pre,
          [source.heading]: list,
        };
      } else {
        const sourceList = [...pre[source.heading]];
        const detinationList = [...pre[dest.heading]];
        const sourceIdx = source.idx;
        const destinationIdx = dest.idx;
        const [removedItem] = sourceList.splice(sourceIdx, 1);
        detinationList.splice(destinationIdx, 0, removedItem);
        return {
          ...pre,
          [source.heading]: sourceList,
          [dest.heading]: detinationList,
        };
      }
    });
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div style={style.root}>
      {mainHeadings.map((heading) => {
        return (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={style?.container}
            key={heading}
          >
            <p style={style?.heading}>{heading.replace("_", " ")}</p>
            <div style={style.tasksContainer}>
              {data[heading].map((task, idx) => {
                return (
                  <div
                    onDragStart={(e) => {
                      handleStartDrag(e, task, heading, idx);
                    }}
                    onDragEnd={handleDragEnd}
                    onDragEnter={(e) => {
                      handleDragEnter(e, idx, heading);
                    }}
                    draggable
                    style={style.task}
                    key={task.id}
                  >
                    <p style={style.taskTitle}>{task.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DragAndDrop;

const style = {
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  container: {
    width: "33%",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  tasksContainer: {
    padding: 10,
    border: "1px solid black",
    width: "80%",
    backgroundColor: "#EBF4DD",
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  },
  task: {
    height: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "70%",
    backgroundColor: "#90AB8B",
    color: "white",
    borderRadius: 12,
    marginTop: 10,
  },
  taskTitle: {},
};
