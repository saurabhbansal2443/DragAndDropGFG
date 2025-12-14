import React, { useState } from "react";

const DragAndDrop = ({ data: intialData }) => {
  const [data, setData] = useState(intialData);

  const mainHeadings = Object.keys(data); //["Office_Task","Home_Task","Sunday_Task"]

  return (
    <div style={style.root}>
      {mainHeadings.map((heading) => {
        return (
          <div style={style?.container} key={heading}>
            <p style={style?.heading}>{heading.replace("_", " ")}</p>
            <div style={style.tasksContainer}>
              {data[heading].map((task) => {
                return (
                  <div draggable style={style.task} key={task.id}>
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
    backgroundColor: "#90AB8B",
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
    border: "1px solid black",
    width: "70%",
    backgroundColor: "#EBF4DD",
    borderRadius: 12,
    marginTop: 10,
  },
  taskTitle: {},
};
