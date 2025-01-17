import React, { useState } from 'react';
import NavigationPanel from '../components/NavigationPanel';
import AppBar from '../components/AppBar';
import "react-datepicker/dist/react-datepicker.css";
import './Levels.css';

const Levels = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState("Levels");
  const [showActionDropdown, setShowActionDropdown] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    level: {
      'Novice': false,
      'Explorer': false,
      'Apprentice': false,
      'Warrior': false,
      'Master': false,
      'Champion': false,
      'Tactician': false,
      'Specialist': false,
    }
  });

  const sampleData = {
    "Levels": [
      {
        name: "Novice",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 1",requirement: "0",action: "Action"
      },
      {
        name: "Explorer",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 2",requirement: "5,000",action: "Action"
      },
      {
        name: "Apprentice",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 3",requirement: "25,000",action: "Action"
      },
      {
        name: "Warrior",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 4",requirement: "100,000",action: "Action"
      },
      {
        name: "Master",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 5",requirement: "500,000",action: "Action"
      },
      {
        name: "Champion",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 6",requirement: "1,000,000",action: "Action"
      },
      {
        name: "Tactician",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 7",requirement: "20,000,000",action: "Action"
      },
      {
        name: "Specialist",badge: <img src={`${process.env.PUBLIC_URL}/novice.png`} alt="novice" className="novice" />,level: "Lv 8",requirement: "100,000,000",action: "Action"
      }
    ]
  };

  const clearFilters = () => {
    setFilters({
      level: {
        'Novice': false,
        'Explorer': false,
        'Apprentice': false,
        'Warrior': false,
        'Master': false,
        'Champion': false,
        'Tactician': false,
        'Specialist': false,
      }
    });
  };

  const handleFilterClick = (event) => {
    event.stopPropagation();
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value]
      }
    }));
  };

  const handleRowClick = (index, event) => {
    event.stopPropagation();
    setSelectedRows(prev => {
      if (prev.includes(index)) {
        return prev.filter(row => row !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleActionClick = (index, event) => {
    event.stopPropagation();
    setShowActionDropdown(prev => prev === index ? null : index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedRows([]);
    setShowActionDropdown(null);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleDelete = () => {
    const updatedData = sampleData[activeTab].filter((_, index) => !selectedRows.includes(index));
    sampleData[activeTab] = updatedData;
    setSelectedRows([]);
  };

  const filteredData = sampleData[activeTab].filter(level => {
    const levelMatch = Object.keys(filters.level).some(lvl => filters.level[lvl] && level.level.includes(lvl));
    return (!Object.values(filters.level).includes(true) || levelMatch);
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="levels-page">
      <NavigationPanel />
      <div className="main-wrapper">
        <AppBar screenName="Levels" />
        <div className="levels-body-frame">
          <div className="levels-header">
            <div className="levels-pagination">
              <span 
                className={`pagination-item ${activeTab === "Levels" ? "active" : ""}`}
                onClick={() => handleTabChange("Levels")}
              >
                Levels
              </span>
            </div>
            <div className="levels-buttons">
              <button className="btn export-btn">
                <img src={`${process.env.PUBLIC_URL}/download.png`} alt="Export" className="btn-icon" />
                Export
              </button>
              <button className="btn create-btn">
                <img src={`${process.env.PUBLIC_URL}/add.png`} alt="Create Level" className="btn-icon" />
                Create Level
              </button>
            </div>
          </div>

          <div className="levels-divider"></div>

          <div className="levels-toolbar">
            <div className="search-bar">
              <img src={`${process.env.PUBLIC_URL}/search.png`} alt="Search" className="search-icon" />
              <input type="text" placeholder="Search levels..." className="search-input" />
              <img 
                src={`${process.env.PUBLIC_URL}/filter.png`} 
                alt="Filter" 
                className="filter-icon"
                onClick={handleFilterClick}
              />
              {showFilterDropdown && (
                <div className="filter-dropdown">
                  <div className="filter-section">
                    <div className="filter-header">
                      <span>Level</span>
                      <img src={`${process.env.PUBLIC_URL}/dropdown.png`} alt="Dropdown" />
                    </div>
                    <div className="filter-options">
                      {Object.keys(filters.level).map(level => (
                        <label key={level} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filters.level[level]}
                            onChange={() => handleFilterChange('level', level)}
                          />
                          <span>{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="clear-filters" onClick={clearFilters}>
                    <span>Clear selection</span>
                  </button>
                </div>
              )}
            </div>
            <button className="btn delete-btn" onClick={handleDelete}>
              <img src={`${process.env.PUBLIC_URL}/delete.png`} alt="Delete" className="btn-icon" />
              Delete
            </button>
          </div>

          <div className="levels-divider"></div>

          <div className="levels-table-header">
            <div className="table-heading radio-column">
              <div className="custom-radio"></div>
            </div>
            <div className="table-heading">Name</div>
            <div className="table-heading">Badge</div>
            <div className="table-heading">Level</div>
            <div className="table-heading">Requirement</div>
            <div className="table-heading action-heading">
              <span>Action</span>
            </div>
          </div>

          <div className="levels-divider"></div>

          {filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((level, index) => (
            <div
              key={index} 
              className={`levels-table-row ${selectedRows.includes(index) ? "selected" : ""}`}
              onClick={(e) => handleRowClick(index, e)}
            >
              <div className="table-cell radio-column">
                <div className={`custom-radio ${selectedRows.includes(index) ? "selected" : ""}`}></div>
              </div>
              <div className="table-cell">{level.name}</div>
              <div className="table-cell">{level.badge}</div>
              <div className="table-cell">{level.level}</div>
              <div className="table-cell reward-cell">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Requirement" className="reward-icon" />
                {level.requirement}
              </div>
              <div className="table-cell action-cell" onClick={(e) => handleActionClick(index, e)}>
                <span>Action</span>
                <img src={`${process.env.PUBLIC_URL}/dropdown.png`} alt="Dropdown" className="dropdown-icon" />
                {showActionDropdown === index && (
                  <div className="action-dropdown">
                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); /* Handle Edit */ }}>
                      <img src={`${process.env.PUBLIC_URL}/edit.png`} alt="Edit" className="action-icon" />
                      <span>Edit</span>
                    </div>
                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                      <img src={`${process.env.PUBLIC_URL}/deletered.png`} alt="Delete" className="action-icon" />
                      <span>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="levels-divider"></div>

          <div className="table-footer">
            <div className="rows-per-page">
              <span>Show Result:</span>
              <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="pagination-controls">
              <img
                src={`${process.env.PUBLIC_URL}/back-arrow.png`}
                alt="Previous"
                className="pagination-arrow"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              />
              <div className="page-numbers">
                {pageNumbers.map(num => (
                  <span
                    key={num}
                    className={`page-number ${currentPage === num ? 'active' : ''}`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </span>
                ))}
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/front-arrow.png`}
                alt="Next"
                className="pagination-arrow"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Levels;