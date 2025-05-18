import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source,
    } = this.props;

    return (
      <div className="card shadow-sm h-100">
        <span
          className="badge bg-danger position-absolute"
          style={{ right: "0", top: "0", borderRadius: "0 0 0 5px" }}
        >
          {source}
        </span>
        <img
          src={
            imageUrl ||
            "https://via.placeholder.com/300x180?text=No+Image+Available"
          }
          className="card-img-top"
          alt="news"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title ? title.slice(0, 70) : "Title"}</h5>
          <p className="card-text">
            {description ? description.slice(0, 120) + "..." : "No description available."}
          </p>
          <p className="card-text mt-auto">
            <small className="text-muted">
              By <strong>{author ? author : "Unknown"}</strong> on{" "}
              {new Date(date).toLocaleString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary btn-sm mt-2"
          >
            Read Full Article
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItems;
