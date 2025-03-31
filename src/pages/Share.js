//Yang Xiao - 46828846

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSample, getLocations, UpdateSampleToLocation } from "./apiService";
import predefinedLocations from "./Location";

function HandleShare() {
  // Get the sample ID from route parameters
  const { id } = useParams();

  // State to hold the selected sample and available locations
  const [sample, setSample] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch and display the selected sample by ID
    async function fetchSample() {
      const data = await getSample(id);
      setSample(data);
    }

    fetchSample();
  }, [id]);

  useEffect(() => {
    // Fetch and display all locations
    async function fetchLocations() {
      const locationData = await getLocations();
      setLocations(locationData);
    }

    fetchLocations();
  }, []);

  // Function to toggle the sharing status of a sample with a location
  const toggleSharedStatus = async (locationId, currentSharingStatus) => {
    // Ensure that locationId is a number
    locationId = Number(locationId);

    // Check if locationId is a valid number
    if (isNaN(locationId)) {
      console.error("Invalid locationId:", locationId);
      return; // Exit the function if locationId is not a valid number
    }

    // Toggle the shared status locally for immediate UI feedback
    const updatedLocations = locations.map((location) => {
      if (location.id === locationId) {
        return {
          ...location,
          sharing: !currentSharingStatus,
        };
      }
      return location;
    });
    setLocations(updatedLocations);

    // Toggle the sharing status on the server using PUT request
    try {
      // Determine the location name based on locationId
      const locationName = predefinedLocations.find(
        (loc) => loc.id === locationId
      )?.name;

      // Send a PUT request to update the location sharing status
      await UpdateSampleToLocation(
        sample.id,
        locationId,
        locationName,
        !currentSharingStatus
      );

      // Handle success
      console.log(
        `Sample ${sample.name} is ${
          currentSharingStatus ? "unshared" : "shared"
        } with ${locationName}.`
      );
    } catch (error) {
      console.error("Error toggling sharing status.");
      // Handle error appropriately, e.g., show an error message
    }
  };

  // Render loading indicator if data is not available
  if (!sample) {
    return <div>Loading...</div>;
  }

  // Render the Share component
  return (
    <div>
      <main>
        <h2 className="title">Share This Sample</h2>
        <div className="card">
          <div className="song-details">
            <h3>{sample?.name}</h3>
            <p>Date Created: {sample?.datetime}</p>
          </div>
          <div className="buttons">
            <button type="button" className="button">
              Preview
            </button>
          </div>
        </div>
        {locations.length > 0 && (
          <div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {locations.map((location) => (
                <li key={location.id}>
                  <div className="toggle-row-container">
                    <div className="location-name-label">
                      <h4>{location.name}</h4>
                    </div>
                    <div className="sequence-row-container">
                      {/* Button to toggle sharing status */}
                      <button
                        className={
                          location.sharing ? "toggle-selected" : "toggle"
                        }
                        onClick={() =>
                          toggleSharedStatus(location.id, location.sharing)
                        }
                      >
                        Shared
                      </button>
                      {/* Button to toggle sharing status */}
                      <button
                        className={
                          !location.sharing ? "toggle-selected" : "toggle"
                        }
                        onClick={() =>
                          toggleSharedStatus(location.id, location.sharing)
                        }
                      >
                        Not Shared
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default HandleShare;
