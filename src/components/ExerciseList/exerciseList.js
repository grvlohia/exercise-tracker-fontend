import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExerciseList = (props) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        if (response.data.length > 0) {
          setExercises(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    setExercises(exercises.filter((el) => el._id !== id));
  };

  let exerciseRows = exercises.map((ex) => {
    return (
      <tr key={ex._id}>
        <td>{ex.username}</td>
        <td>{ex.description}</td>
        <td>{ex.duration}</td>
        <td>{ex.date.substring(0, 10)}</td>
        <td><Link to={"/edit/" + ex._id}>edit</Link> | <a href="#" onClick={() => deleteExercise(ex._id)}>delete</a></td>
      </tr>
    );
  });

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseRows}</tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
