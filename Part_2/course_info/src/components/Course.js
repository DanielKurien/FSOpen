import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = (acc, val) => acc + val;
  let answer = course.parts.map((part) => part.exercises).reduce(sum);
  return (
    <p>
      <strong>Total of {answer} exercises</strong>
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((course) => (
        <Part key={course.id} exercises={course.exercises} name={course.name} />
      ))}
    </div>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
