//Yang Xiao - 46828846

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSamples } from "./apiService";

function Home() {
  const [samples, setSamples] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and display the user's samples
    async function fetchSamples() {
      const data = await getSamples();
      setSamples(data);
    }

    fetchSamples();
  }, []);

  // Function to navigate to the edit page with instrument notes
  const handleEdit = (sampleId) => {
    // Construct the route with sampleId
    const editRoute = `/edit-sample/${sampleId}`;
    // Navigate to the "Create Sample" page with instrument notes
    navigate(editRoute);
  };

  // Function to navigate to the Share page
  const handleShare = (sampleId) => {
    // Construct the route to the Share page
    const shareRoute = `/share/${sampleId}`;
    // Navigate to the Share page
    navigate(shareRoute);
  };

  return (
    <main>
      <head>
        <meta charset="UTF-8"></meta>
        <title>SongTrax - Home</title>
        <link rel="stylesheet" href="starterstyles.css"></link>
      </head>

      <h2 class="title">Samples You've Created</h2>

      <div className="create-card">
        <Link to="/create-sample" className="full-button">
          Create Sample
        </Link>
      </div>

      {/* Map through 'samples' and display each sample */}
      {samples.map((sample) => (
        <div key={sample.id} className="card">
          <div className="song-details">
            <h3>{sample.name}</h3>
            <p>Date Created: {sample.datetime}</p>
          </div>
          <div className="button-group-container">
            {/* Button to navigate to the Share page */}
            <button className="button" onClick={() => handleShare(sample.id)}>
              Share
            </button>
            {/* Button to preview the sample */}
            <button type="button" className="button">
              Preview
            </button>
            {/* Pass the sample ID to the handleEdit function */}
            <button
              className="bright-button"
              onClick={() => handleEdit(sample.id)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <div className="create-card">
        <Link to="/create-sample" className="full-button">
          Create Sample
        </Link>
      </div>
    </main>
  );
}

export default Home;
