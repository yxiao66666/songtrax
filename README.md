# SongTrax Web App

## Overview
The **SongTrax Web App** is the first part of the Cross-Platform Project, designed to create an interactive web application using **React**. This web app will allow users to create music samples and share them to specific locations using a RESTful API. The project serves as a foundation for the second part, where a **React Native** mobile app will be developed to interact with these shared music samples.

## Learning Objectives
By completing this project, you will:
- Gain intermediate proficiency in **functional programming** using JavaScript.
- Develop a **responsive React web application** that adapts to different screen sizes.
- Integrate **RESTful API communication** to create, read, update, and delete resources.
- Implement **UI/UX best practices** for a cross-platform experience.
- Build a structured and modularized **React component architecture**.
- Utilize **Tone.js** for generating and playing back audio samples.
- Develop and execute **testing strategies** for security, performance, and design evaluation.

## Features & Functionality
### 1. List of Samples Page
- Displays a list of all music samples associated with the user's API key.
- **Create Sample** button links to the **Edit Sample** page for new samples.
- Each **Sample Card** includes:
  - Sample name, date, and three buttons:
    - **Share**: Links to the **Share Sample** page. If already shared, it appears as "Shared."
    - **Preview**: Uses **Tone.js** to play the sample. During playback, the button changes to "Stop Previewing."
    - **Edit**: Links to the **Edit Sample** page for modification.

### 2. Edit Sample Page
- Users can **create** or **edit** a sample.
- Includes:
  - **Sample Name** input field.
  - **Preview** button to play the sample.
  - **Save** button to store the sample in the API.
  - **Instrument Toggle** for Piano, French Horn, Guitar, and Drums.
  - **Sequence of Notes** (B, A, G, F, E, D, C) over 16 bars (each bar = 500ms).
  - **Interactive Toggle** for each note to turn bars on/off.
- Saves new samples via **POST** or updates existing ones via **PUT** to the API.

### 3. Share Sample Page
- Displays **locations** fetched from the API.
- Allows users to **associate** a sample with a location.
- **Toggle Sharing** options:
  - "Not Shared" → Removes the association.
  - "Shared" → Links the sample to the selected location.
- Uses **Tone.js** to preview samples.

## RESTful API Integration
The application interacts with the **SongTrax RESTful API** to manage three key resources:
- **Sample**: Manages music samples.
- **Location**: Manages geographical locations.
- **SampleToLocation**: Links music samples to locations.

Each API request must include an **api_key**. Refer to course materials for API documentation and authentication details.

## Project Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/songtrax-web.git
   cd songtrax-web
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Dependencies
- **React Router**: For managing navigation.
- **Tone.js**: For generating and playing music samples.
- **Font Awesome**: For icons (e.g., back arrow).
- **CSS Libraries** (Optional): Bootstrap, Tailwind, or other styling frameworks.

## Deployment
1. Build the production bundle:
   ```sh
   npm run build
   ```
2. Deploy to a static hosting service (e.g., **Vercel, Netlify, GitHub Pages**).

## Testing
- Implement **unit tests** and **integration tests** for components.
- Verify **API requests** and **error handling**.
- Ensure **responsiveness** across different devices.
- Conduct **peer review** and **tutor consultations** in Week 9.

## Final Submission
- **Week 9**: Near-complete version demo.
- **Week 10**: Final Web App submission to Gradescope (ZIP file format).

## Marking Criteria
Your project will be graded on:
- **Attention to Detail**: UI, responsiveness, and functionality.
- **React Web Usage**: Component architecture, state management, and hooks.
- **Integrations & Markup**: API communication and semantic HTML.
- **Code Style**: Readability, modularization, and maintainability.

---
### 🚀 Happy Coding! 🎵

