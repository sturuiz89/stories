import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StoriesData from './assets/stories.json';
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap';
import dontgo from './images/dontgo.jpg';
import trees from './images/trees.jpg';
import log from './images/log.jpg';
import sunset from './images/sunset.jpg';



class Stories extends React.Component {
    constructor(props) {
        super(props);
        const images = {
            dontgo: dontgo,
            log: log,
            trees: trees,
            sunset: sunset,
        }
        this.state = {
            stories: StoriesData.map(s => ({
                ...s,
                image: images[s.imageKey]
            })),
            selected: null
        };
    }

    handleClick(i) {
        const stories = this.state.stories;
        this.setState({
            stories: stories,
            selected: stories.find(s => s.id === i)
        });
    }

    board() { 
        const fontStyle = { fontFamily: "Roboto", fontSize: "19px"}
        if (!this.state.selected) { 
            return (
                <MenuBoard  
                    stories={this.state.stories}
                    onClick={(i) => this.handleClick(i)}
                    fontStyle={fontStyle}
                />
            );
        }
        else {
            return (
                <StoryBoard 
                    selected={this.state.selected}
                    fontStyle={fontStyle}
                />
            );
        }
    }

    render() {
        return (
            <div>
                <Imports />
                <Navigation 
                        stories={this.state.stories}
                        selected={this.state.selected}
                        onClick={(i) => this.handleClick(i)}
                    />
                <Container>
                        {this.board()}
                </Container>
            </div>
        )
    }
}



class StoryBoard extends React.Component {
    render() {
        const paragraphs = this.props.selected.text.map((paragraph, index) => {
            return(
                <p key={index}>{paragraph}</p>
            );
        });

        return (
            <Container>
                <div style={this.props.fontStyle}>
                    <br />
                    {paragraphs}
                    <br />
                </div>
            </Container>
        )
    }
}

class MenuBoard extends React.Component {
    render() {
        const imageColumns = this.props.stories.map((story, index) => {
            return(
                <Col>
                    <img 
                        width="200" 
                        src={story.image} 
                        alt={story.title}
                        onClick={() => this.props.onClick(story.id)}
                    />
                </Col>
            );
        });
        const style = {
            ...this.props.fontStyle,
            fontSize: "22px",
            textAlign:"center"
        };
        
        return (
            <Container fluid>
                <br />
                <h5 style={style}>These stories were written in May of 2020, the year of our 'rona, while under quarantine.</h5>
                <div>
                    <Row>&nbsp;</Row>
                    <Row>
                        {imageColumns}
                    </Row> 
                </div>
            </Container>
        );
    }
}

class Navigation extends React.Component {
    brandDisplay() {
        if (this.props.selected) {
            return(
                <img width="75" src={this.props.selected.image} alt={this.props.selected.title} />
            );
        }
        else {
            return(<div>Stories</div>)
        }
    }

    render() {
        const titles = this.props.stories.map((story, index) => {
            return (
                <Nav.Link key={story.id} onClick={() => this.props.onClick(story.id)}>{story.title}</Nav.Link>
            )
        })
         
        
        return ( 
            
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Brand onClick={() => this.props.onClick(null)}>{this.brandDisplay()}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {titles}
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        );
    }
}

class Imports extends React.Component {
    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"></link>
            </div>

        )
    }
}

ReactDOM.render(
    <Stories />,
    document.getElementById('root')
)