import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0,
    searchQuery: "",
    language: "en"
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar onSearchChange={this.handleSearchChange} />
          <LoadingBar color="#f11946" progress={this.state.progress} />

          <Routes>
            <Route
              path="/"
              element={
                <News
                  language={this.state.language}
                  key="general"
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  country="in"
                  category=""
                  searchQuery={this.state.searchQuery}
                />
              }
            />
            {["business", "entertainment", "health", "science", "sports", "technology"].map((cat) => (
              <Route
                key={cat}
                path={`/${cat}`}
                element={
                  <News
                    language={this.state.language}
                    key={cat}
                    setProgress={this.setProgress}
                    apiKey={this.apiKey}
                    pageSize={5}
                    country="in"
                    category={cat}
                  />
                }
              />
            ))}
          </Routes>
        </div>
      </Router>
    );
  }
}
