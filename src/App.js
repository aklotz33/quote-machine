import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import './App.css';

const tweet_html = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      index: null,
      quote: '',
      author: '',
      tweet_link: ''
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  getNewQuote() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(res => res.json())
    .then(
      (result) => {
        const idx = Math.floor(Math.random() * (result.quotes.length - 0 + 1));
        const author = result.quotes[idx].author;
        const quote = result.quotes[idx].quote;
        this.setState({
          isLoaded: true,
          quote: quote,
          author: author,
          index: idx,
          tweet_link: tweet_html.concat(quote,author)
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  componentDidMount() {
    this.getNewQuote();
  }

  headerSection() {
    const head = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">';
    return head;
  }
  render() {
      const { error, isLoaded, index, quote, author, tweet_link } = this.state;
      if (error) {
        return <div>Error: {error.message} </div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>
      } else {
        return (
          <Grid id="quote-box" className="container vertical-center">
            <Row>
              <Col md={4} className="col-centered">
                <p id="text">{quote}</p>
              </Col>
            </Row>
            <Row className="col-centered">
              <Col md={2} mdOffset={6} >
                <p id="author">{author}</p>
              </Col>
            </Row>
            <Row className="col-centered">
            <Col md={2} mdOffset={4}>
                <Button id="tweet-quote"  href={tweet_link} target="_blank"><i className="fa fa-twitter"></i></Button>
                </Col>  
              <Col md={2} >
                <Button bsStyle="default" btnSize="medium" id="new-quote" onClick={this.getNewQuote}>Get New Quote</Button>
                </Col>
              
                </Row>
          </Grid>
        )
      }
  }
}

export default App;
