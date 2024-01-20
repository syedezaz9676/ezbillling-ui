import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = () => {
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState('');

  // Function to format the date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Month is zero-based, so add 1
    let day = date.getDate();

    // Add leading zeros if month or day is a single digit
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Get current date when the component mounts
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    
    // Set the default value of the date picker to the current date
    setSelectedDate(formattedDate);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleDateChange = (e) => {
    // Update selectedDate when the user picks a new date
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <label htmlFor="datepicker">Select a Date:</label>
      <input
        type="date"
        id="datepicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;