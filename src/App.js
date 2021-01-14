import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import ReactPaginate from "react-paginate";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  // this code will handle changing of pages
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;

  const currentPageData = profiles
    .slice(offset, offset + PER_PAGE)
    .map((profile) => (
      <ul key={profile.id}>
        <li>
          <a href="/">{profile.FirstName}</a>
        </li>
        <li>
          <a href="/">{profile.LastName}</a>
        </li>
        <li>
          <a href="/">{profile.Gender}</a>
        </li>
        <li>
          <a href="/">{profile.Latititude}</a>
        </li>
        <li>
          <a href="/">{profile.Longitude}</a>
        </li>
        <li>
          <a href="/">{profile.CreditCardNumber}</a>
        </li>
        <li>
          <a href="/">{profile.CreditCardType}</a>
        </li>
        <li>
          <a href="/">{profile.Email}</a>
        </li>
        <li>
          <a href="/">{profile.DomainName}</a>
        </li>
        <li>
          <a href="/">{profile.PhoneNumber}</a>
        </li>
        <li>
          <a href="/">{profile.MacAddress}</a>
        </li>
        <li>
          <a href="/">{profile.URL}</a>
        </li>
        <li>
          <a href="/">{profile.UserName}</a>
        </li>
        <li>
          <a href="/">{profile.LastLogin}</a>
        </li>
        <li>
          <a href="/">{profile.PaymentMethod}</a>
        </li>
      </ul>
    ));

  const pageCount = Math.ceil(profiles.length / PER_PAGE);

  return (
    <div className="app">
      <Header />

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChangeClick={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageData}
    </div>
  );
}

export default App;
