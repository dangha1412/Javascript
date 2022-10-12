const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const level = document.getElementById("level");

const startGame = function (level) {
  const width = window.innerWidth * 0.98;
  const height = window.innerHeight * 0.98;
  const engine = Engine.create();
  engine.world.gravity.y = 0;
  const { world } = engine;
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width: width,
      height: height,
    },
  });
  Render.run(render);
  Runner.run(Runner.create(), engine);
  const cellsHorizontal = level * 5;
  const cellsVertical = level * 3;

  const unitLengthX = width / cellsHorizontal;
  const unitLengthY = height / cellsVertical;
  const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
  ];
  World.add(world, walls);

  ////shuffle
  const shuffle = function (arr) {
    let counter = arr.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
    return arr;
  };
  /// maze generation
  const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));
  const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false));
  const horizontals = Array(cellsVertical - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  const startRow = Math.floor(Math.random() * cellsVertical);
  const startColumn = Math.floor(Math.random() * cellsHorizontal);

  const stepThoughCell = function (row, column) {
    // if i have been visit that cell => return
    if (grid[row][column]) return;
    //mark this cell being visted
    grid[row][column] = true;
    //assemble list of neighbour
    const neighbours = shuffle([
      [row - 1, column, "up"],
      [row, column + 1, "right"],
      [row + 1, column, "down"],
      [row, column - 1, "left"],
    ]);
    /////for Earch neighbours.....
    for (let neighbour of neighbours) {
      const [nextRow, nextColumn, direction] = neighbour;
      ////see if neighbour is out of bound
      if (
        nextRow < 0 ||
        nextRow >= cellsVertical ||
        nextColumn < 0 ||
        nextColumn >= cellsHorizontal
      ) {
        continue;
      }
      //// if we have been visit that cells =>continues to next neighbour
      if (grid[nextRow][nextColumn]) continue;

      ///remove a wall of vertical or horizontal
      if (direction === "left") {
        verticals[row][column - 1] = true;
      } else if (direction === "right") {
        verticals[row][column] = true;
      } else if (direction === "up") {
        horizontals[row - 1][column] = true;
      } else if (direction === "down") {
        horizontals[row][column] = true;
      }
      stepThoughCell(nextRow, nextColumn);
    }
  };

  stepThoughCell(startRow, startColumn);

  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      const wall = Bodies.rectangle(
        unitLengthX / 2 + columnIndex * unitLengthX,
        unitLengthY + rowIndex * unitLengthY,
        unitLengthX,
        3,
        {
          isStatic: true,
          label: "wall",
          render: {
            fillStyle: "orange",
          },
        }
      );
      if (open) return;
      if (!open) World.add(world, wall);
    });
  });
  verticals.forEach((column, columnIndex) => {
    column.forEach((open, index) => {
      const wall = Bodies.rectangle(
        unitLengthX + index * unitLengthX,
        unitLengthY / 2 + columnIndex * unitLengthY,
        3,
        unitLengthY,
        {
          isStatic: true,
          label: "wall",
          render: {
            fillStyle: "orange",
          },
        }
      );
      if (open) return;
      if (!open) World.add(world, wall);
    });
  });
  ////Goal
  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX / 2,
    unitLengthY / 2,
    {
      isStatic: true,
      label: "goal",
      render: {
        fillStyle: "green",
      },
    }
  );
  World.add(world, goal);

  ////Ball
  const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    unitLengthX < unitLengthY ? unitLengthX / 4 : unitLengthY / 4,
    {
      isStatic: false,
      label: "ball",
      render: {
        fillStyle: "aqua",
      },
    }
  );
  World.add(world, ball);

  document.addEventListener("keydown", (e) => {
    const { x, y } = ball.velocity;
    const move = 1;
    if (e.key === "ArrowUp") {
      Body.setVelocity(ball, { x, y: y - move });
    }
    if (e.key === "ArrowLeft") {
      Body.setVelocity(ball, { x: x - move, y });
    }
    if (e.key === "ArrowRight") {
      Body.setVelocity(ball, { x: x + move, y });
    }
    if (e.key === "ArrowDown") {
      Body.setVelocity(ball, { x, y: y + move });
    }
  });

  ////win condition

  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      const labels = ["ball", "goal"];
      if (
        labels.includes(collision.bodyA.label) &&
        labels.includes(collision.bodyA.label)
      ) {
        level++;
        world.gravity.y = 1;
        world.bodies.forEach((body) => {
          if (body.label === "wall") {
            Body.setStatic(body, false);
          }
        });
      }
    });
  });
};

document.querySelector("button").addEventListener("click", function () {
  document.querySelector(".level").classList.add("hidden");
  startGame(level.value);
});
