import React from 'react';

export const Course = (props) => {
    return (
      <div>
        {
          props.courses.map((v) => {
            return (<div key={v.id}>
            <Header name={v.name} />
            <Content parts={v.parts} />
            </div>)
          })
        }
     
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    const total_array = props.parts.map((v)=>{return v.exercises})
    const total = total_array.reduce((a, b) => ( a + b ));
    return (
      <div>
        {props.parts.map((v, i) => {
          return <Part key={v.id} v={v} />
        })
        }
        <h2>total of {total} exercises</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.v.name} : {props.v.exercises}</p>
      </div>
    )
  }
  