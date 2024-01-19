import React, { useRef, useState } from "react";
import axios from "axios";
import "./PricingForm.css";

const PricingForm = () => {
  const totalDistanceRef = useRef(null);
  const totalTimeRef = useRef(null);
  const waitingTimeRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get input values from refs
    const totalDistance = totalDistanceRef.current.value;
    const totalTime = totalTimeRef.current.value;
    const waitingTime = waitingTimeRef.current.value;

    // Define the thresholds and the waiting charge rate
    const initialThreshold = 3;
    const waitingChargeRate = 5;

    // Use the ternary operator to calculate waiting charges
    const WC =
      waitingTime <= initialThreshold
        ? 0
        : Math.ceil((waitingTime - initialThreshold) / 3) * waitingChargeRate;

    // Define the thresholds and corresponding multipliers
    const threshold1 = 1;
    const threshold2 = 2;
    const multiplier1 = 1;
    const multiplier2 = 1.25;
    const multiplier3 = 2.2;

    // Use the ternary operator to determine the appropriate multiplier
    const TMF =
      totalTime <= threshold1
        ? multiplier1
        : totalTime <= threshold2
        ? multiplier2
        : multiplier3;

    const baseRate = 28; // Base rate for distance (in rs/KM)
    const additionalRate = 30; // Additional rate for distance after 3KMs (in rs/KM)
    const thresholdDistance = 3; // Distance threshold for additional rate (in KM)

    // Using ternary operator to calculate DAP
    const DAP =
      totalDistance <= thresholdDistance
        ? baseRate * totalDistance
        : baseRate * thresholdDistance +
          additionalRate * (distance - thresholdDistance);

    // Validate input values (add your own validation logic)
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const d = new Date();
    let day1 = weekday[d.getDay()];
    console.log(day1);

    const day = "Tue";
    const DBP =
      totalDistance <= 3 && (day === "Tue" || day === "Wed" || day === "Thur")
        ? 80
        : totalDistance <= 3.5 && (day === "Sat" || day === "Mon")
        ? 90
        : totalDistance <= 3.5 && day === "Sun"
        ? 95
        : 0;

    // const DBP = 80; // Distance Base Price
    // const DAP = 30; // Distance Additional Price
    // const TMF = 1.25; // Time Multiplier Factor
    // const WC = 5; // Waiting Charges

    const calculatedPrice =
      DBP + totalDistance * DAP + totalTime * TMF + waitingTime * WC;

    alert(`Price to pay: ₹${calculatedPrice}`);

    const data = {
      totalDistance,
      totalTime,
      waitingTime,
      calculatedPrice,
    };

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:3001/api/send-data",
        data
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2 className="brand-text text-primary mx-3 mt-2">Abhishek.Dev</h2>
      <div className="container">
        <div className="login-form">
          <h2>Pricing</h2>
          <form onSubmit={handleSubmit}>
            <>
              <label>Total Distance:</label>
              <input type="number" ref={totalDistanceRef} required />
            </>
            <>
              <label>Total Time:</label>
              <input type="number" ref={totalTimeRef} required />
            </>
            <>
              <label>Waiting Time:</label>
              <input type="number" ref={waitingTimeRef} required />
            </>
            <button type="submit">Submit</button>
          </form>
          <p className="text-center mt-2">
            <span className="mr-25">For and isuue related Payment?</span>
            <>
              <span>Contact to 8217251058</span>
            </>
          </p>
        </div>
      </div>
    </>
  );
};

export default PricingForm;
