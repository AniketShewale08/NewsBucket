import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      currentDate: new Date(),
    };

    document.title = `NewsBucket - ${
      props.searchQuery
        ? props.searchQuery
        : this.capitalizeFirstLetter(props.category)
    }`;
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    searchQuery: PropTypes.string,
    apiKey: PropTypes.string,
    setProgress: PropTypes.func,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.updatePage();
    this.intervalId = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
  this.setState({ page: 1, articles: [] }, this.updatePage);
}
  }

  async updatePage() {
    this.props.setProgress(10);
    const { category, country, pageSize, apiKey, searchQuery } = this.props;

    const url = searchQuery
      ? `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=${country}&max=${pageSize}&apikey=${apiKey}`
      : `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=10&apikey=${apiKey}`;

    this.setState({ loading: true });
    this.props.setProgress(40);

    let data = await fetch(url);
    let parsedData = await data.json();

    this.props.setProgress(70);
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles || [],
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });

    const { category, country, pageSize, apiKey, searchQuery } = this.props;
    const url = searchQuery
      ? `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=${country}&max=${pageSize}&apikey=${apiKey}`
      : `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=10&apikey=${apiKey}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles || []),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container my-4">
          {/* Top Date Bar */}
          <div
            className="text-black text-center py-2 rounded"
            style={{ fontWeight: "500" }}
          >
            {this.state.currentDate.toLocaleString()}
          </div>

          {/* Title */}
          <h2 className="text-center my-4">
            <strong>
              Your Daily NewsBucket{" "}
              {this.props.searchQuery
                ? `- Results for "${this.props.searchQuery}"`
                : `- ${this.capitalizeFirstLetter(this.props.category)}`}
            </strong>
          </h2>

          {/* Loading Spinner */}
          {this.state.loading && <Spinner />}

          {/* News Feed with Infinite Scroll */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >

            
            <div className="row g-4">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description}
                    newsUrl={element.url}
                    imageUrl={element.image}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
