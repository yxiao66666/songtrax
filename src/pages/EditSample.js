//Yang Xiao - 46828846

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSample, updateSample } from "./apiService";
import { Sampler, Transport, start } from "tone";
import MusicSamples from "./MusicNotes";

const samples = MusicSamples;

function EditSample() {
  // Retrieve the id from the URL
  const { id } = useParams();

  // Define state for sample data, name, selected instrument, and recording data
  const [sample, setSample] = useState(null);
  const [name, setName] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [recordingData, setRecordingData] = useState({
    A: Array(16).fill(false),
    B: Array(16).fill(false),
    C: Array(16).fill(false),
    D: Array(16).fill(false),
    E: Array(16).fill(false),
    F: Array(16).fill(false),
    G: Array(16).fill(false),
  });

  // State variable to track if the preview is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect to start the audio context when the component mounts
  useEffect(() => {
    start();
  }, []);

  // Effect to fetch sample data when the 'id' parameter changes
  useEffect(() => {
    async function fetchSample() {
      try {
        const data = await getSample(id);
        setSample(data);
        setName(data?.name || "");
        setSelectedInstrument(data?.type || "");

        const defaultRecordingData = {
          A: Array(16).fill(false),
          B: Array(16).fill(false),
          C: Array(16).fill(false),
          D: Array(16).fill(false),
          E: Array(16).fill(false),
          F: Array(16).fill(false),
          G: Array(16).fill(false),
        };

        const fetchedRecordingData = JSON.parse(data?.recording_data || "{}");
        setRecordingData({
          ...defaultRecordingData,
          ...fetchedRecordingData,
        });
      } catch (error) {
        alert("Error fetching sample.");
      }
    }

    fetchSample();
  }, [id]);

  // Ref for the Tone.js sampler
  const samplerRef = useRef(null);

  // Effect to initialize the sampler when the selected instrument changes
  useEffect(() => {
    samplerRef.current = new Sampler(samples[selectedInstrument]).toDestination();
  }, [selectedInstrument]);

  // Function to handle previewing the sample
  const handlePreview = () => {
    setIsPlaying(true);

    // Clear any previous scheduled events in the Transport
    Transport.cancel();

    // Create an array to store the notes to be played
    const notesToPlay = [];

    // Get the selected instrument's samples
    const instrumentSamples = samples[selectedInstrument];

    // Iterate through each note and its sequence
    ["A", "B", "C", "D", "E", "F", "G"].forEach((note) => {
      recordingData[note]?.forEach((selected, index) => {
        if (selected) {
          // Find the corresponding sample for the note
          const sampleKey = `${note}3`;

          if (instrumentSamples[sampleKey]) {
            // Add the note and time to the array
            notesToPlay.push({ note: sampleKey, time: index * 0.45 });
          }
        }
      });
    });

    // Sort the notes by time
    notesToPlay.sort((a, b) => a.time - b.time);

    // Play the notes in sequence
    notesToPlay.forEach(({ note, time }) => {
      Transport.scheduleOnce((time) => {
        // Use Tone.js Synth to play the note
        samplerRef.current.triggerAttackRelease(note, "1n");
      }, time);
    });

    // Start the Transport
    Transport.start();

    // Handle the end of the sequence
    const sequenceEndTime =
      notesToPlay.length > 0
        ? notesToPlay[notesToPlay.length - 1].time + 0.5
        : 0;

    Transport.scheduleOnce(() => {
      setIsPlaying(false); // Set playing state to false when the sequence ends
      Transport.stop(); // Stop the Transport
    }, sequenceEndTime);
  };

  // Function to handle stopping the preview
  const handleStopPreview = () => {
    setIsPlaying(false);
    Transport.cancel();
  };

  // Function to handle instrument change
  const handleInstrumentChange = (instrument) => {
    setSelectedInstrument(instrument);
  };

  // Function to update the sample
  const handleUpdateSample = async () => {
    // If no new name is given, keep the original name
    if (!name) {
      return name;
    }

    try {
      await updateSample(id, selectedInstrument, name, recordingData);
      alert("Sample updated.");
    } catch (error) {
      alert("Error updating sample.");
    }
  };

  // Function to render the music notes UI
  const renderMusicNotes = (note) => {
    return recordingData[note]?.map((selected, index) => (
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

  // Function to toggle recording data
  const toggleRecordingData = (note, index) => {
    setRecordingData((prevData) => ({
      ...prevData,
      [note]: prevData[note].map((value, i) => (i === index ? !value : value)),
    }));
  };

  // Function to play a note
  const playNote = (note) => {
    // Play the note when the button is clicked
    const Note = `${note}3`;
    samplerRef.current.triggerAttackRelease(Note, "1n");
  };

  // Render loading indicator if data is not available
  if (!sample) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main>
        <h2 className="title">Editing {sample?.name}:</h2>
        <form className="card edit-card">
          <input
            type="text"
            placeholder={sample?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Add other input fields for sample creation */}
          <div className="button-group-container">
            <button
              type="button"
              className="button"
              onClick={isPlaying ? handleStopPreview : handlePreview}
            >
              {isPlaying ? "Stop Previewing" : "Preview"}
            </button>
            <button
              type="button"
              className="bright-button"
              onClick={handleUpdateSample}
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
                selectedInstrument === "saxophone"
                  ? "toggle-selected"
                  : "toggle"
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
            <div className="sequence-row-container">
              {renderMusicNotes(note)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default EditSample;
