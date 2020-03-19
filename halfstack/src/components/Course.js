import React from 'react';
import Header from './Header';

const Course = ({course}) => (
    <div>
      <Header text={course.name} />
      <Content content={course.parts} />
      <Sum parts={course.parts.map(ex => ex.exercises)} />
    </div>
  )
  
  const Content = ({content}) => (
    <div>
      {content.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  );
  
  const Part = ({name,exercises}) => <p>{name} {exercises}</p>;
  
  const Sum = ({parts}) => <p><b>total of {parts.reduce((a,b) => a+b)} exercises</b></p>;

export default Course;