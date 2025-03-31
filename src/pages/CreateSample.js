//Yang Xiao - 46828846

import React, { useState } from "react";
import { createSample } from "./apiService";
import { Sampler } from "tone";
import MusicSamples from "./MusicNotes";

// Music samples
const samples = MusicSamples;

function CreateSample() {
  // State for sample type, name, and recording data
  const [type, setType] = useState("piano");
  const [name, setName] = useState("");
  const [recordingData, setRecordingData] = useState({
    A: Array(16).fill(false),
    B: Array(16).fill(false),
    C: Array(16).fill(false),
    D: Array(16).fill(false),
    E: Array(16).fill(false),
    F: Array(16).fill(false),
    G: Array(16).fill(false),
  });

  // State to store the selected instrument
  const [selectedInstrument, setSelectedInstrument] = useState("piano");

  // Function to handle creating a new sample
  const handleCreateSample = async () => {
    // Ensure 'name' is not empty and other validation if needed
    if (!name) {
      alert("Please enter a sample name.");
      return;
    }

    const response = await createSample(type, name, recordingData);

    if (response.id) {
      alert("Sample created.");

      // Reset form fields after successful creation
      setType("piano");
      setName("");
      setRecordingData({
        A: Array(16).fill(false),
        B: Array(16).fill(false),
        C: Array(16).fill(false),
        D: Array(16).fill(false),
        E: Array(16).fill(false),
        F: Array(16).fill(false),
        G: Array(16).fill(false),
      });
    } else {
      // Handle the case where sample creation failed
      alert("Failed to create the sample. Please try again later.");
    }
  };

  // Create a sampler for the selected instrument
  const sampler = new Sampler(samples[selectedInstrument]).toDestination();

  // Function to handle instrument change
  const handleInstrumentChange = (instrument) => {
    setSelectedInstrument(instrument);
    setType(instrument); // Update the 'type' state with the selected instrument
  };

  // Function to toggle recording data (notes)
  const toggleRecordingData = (note, index) => {
    setRecordingData((prevData) => ({
      ...prevData,
      [note]: prevData[note].map((value, i) => (i === index ? !value : value)),
    }));
  };

  // Function to render music notes
  const renderMusicNotes = (note) => {
    return recordingData[note].map((selected, index) => (
      <button
        key={index}
        className={selected ? "toggle-selected" : "toggle"}
        onClick={() => {
          toggleRecordingData(note, index);
          playNote(note); // Play the note when clicked
        }}
      >
        {/* Empty text */}
      </button>
    ));
  };

  // Function to play a note
  const playNote = (note) => {
    // Play the note when the button is clicked
    const Note = `${note}3`;
    sampler.triggerAttackRelease(Note, "1n");
  };

  return (
    <main>
      <h2 className="title">Create a New Sample</h2>
      <form className="card edit-card">
        <input
          type="text"
          placeholder="Enter a Sample Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Add other input fields for sample creation */}
        <div className="button-group-container">
          <button
            type="button"
            className="bright-button"
            onClick={handleCreateSample}
          >
            Save
          </button>
        </div>
      </form>
      {/* Instrument Selection */}
      <div className="toggle-row-container">
        <div className="row-label"></div>
        <div className="sequence-row-container">
          <button
            className={
              selectedInstrument === "piano" ? "toggle-selected" : "toggle"
            }
            onClick={() => handleInstrumentChange("piano")}
          >
            Piano
          </button>
          <button
            className={
              selectedInstrument === "guitar" ? "toggle-selected" : "toggle"
            }
            onClick={() => handleInstrumentChange("guitar")}
          >
            Guitar
          </button>
          <button
            className={
              selectedInstrument === "violin" ? "toggle-selected" : "toggle"
            }
            onClick={() => handleInstrumentChange("violin")}
          >
            Violin
          </button>
          <button
            className={
              selectedInstrument === "saxophone" ? "toggle-selected" : "toggle"
            }
            onClick={() => handleInstrumentChange("saxophone")}
          >
            Saxophone
          </button>
        </div>
      </div>

      {/* Music Notes */}
      {["B", "A", "G", "F", "E", "D", "C"].map((note) => (
        <div className="toggle-row-container" key={note}>
          <div className="row-label">
            <h4>{note}</h4>
          </div>
          <div className="sequence-row-container">{renderMusicNotes(note)}</div>
        </div>
      ))}
    </main>
  );
}

export default CreateSample;
