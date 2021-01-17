import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import ReactPaginate from "react-paginate";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filterProfiles, setFilterProfiles] = useState([]);

  const PER_PAGE = 20;

  // this code will execute when the component load
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        "https://api.enye.tech/v1/challenge/records"
      );
      setProfiles(request.data.records.profiles);

      return request;
    };
    fetchData();
  }, []);

  // filter the profile
  useEffect(() => {
    setFilterProfiles(
      profiles.filter(
        (profile) =>
          profile.LastName.toLowerCase().includes(search.toLowerCase()) ||
          profile.LastName.toLowerCase().includes(search.toLowerCase()) ||
          profile.Email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, profiles]);

  // this code will handle changing of pages
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;

  const currentPageData = profiles
    .slice(offset, offset + PER_PAGE)
    .map((profile) => (
      <ul key={profile.FirstName}>
        <li>{profile.FirstName}</li>
        <li>{profile.LastName}</li>
        <li>{profile.Gender}</li>
        <li>{profile.Latititude}</li>
        <li>{profile.Longitude}</li>
        <li>{profile.CreditCardNumber}</li>
        <li>{profile.CreditCardType}</li>
        <li>{profile.Email}</li>
        <li>{profile.DomainName}</li>
        <li>{profile.PhoneNumber}</li>
        <li>{profile.MacAddress}</li>
        <li>{profile.URL}</li>
        <li>{profile.UserName}</li>
        <li>{profile.LastLogin}</li>
        <li>{profile.PaymentMethod}</li>
      </ul>
    ));

  const pageCount = Math.ceil(profiles.length / PER_PAGE);
  const pageLines = profiles[0] && Object.keys(profiles[0]);

  return (
    <div className="app">
      <Header setSearch={setSearch} />

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

      {filterProfiles.map((profile, id) => (
        <p key={id} {...profile}>
          {currentPageData}
        </p>
      ))}
    </div>
  );
}

export default App;
