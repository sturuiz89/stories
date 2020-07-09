import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StoriesData from './assets/stories.json';
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap';
import dontgo from './images/dontgo.jpg';
import sunset from './images/sunset.jpg';
import trees from './images/trees.jpg';


class StoryBoard extends React.Component {
    render() {
        const paragraphs = this.props.selected.text.map((paragraph, index) => {
            return(
                <p key={index}>{paragraph}</p>
            );
        });

        return (
            <Container style={{color: "#859900"}} >
                <br />
                {paragraphs}
            </Container>
        )
    }
}

class MenuBoard extends React.Component {
    render() {
        const imageColumns = this.props.stories.map((story, index) => {
            return(
                <Col><img width="200" src={story.image} alt={story.title} rounded /></Col>
            );
        });
        return (
            <Container>
                <br />
                <h5>These stories were written in April and May in 2020, the year of our 'rona, during quarantine. Written half on a challenge and half on a whim.</h5>
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
            <Navbar bg="light" expand="lg">
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
class Stories extends React.Component {
    constructor(props) {
        super(props);
        const images = {
            dontgo: dontgo,
            sunset: sunset,
            trees: trees
        }
        this.state = {
            stories: StoriesData.map(s => ({
                ...s,
                image: images[s.imageKey]
            })),
            selected: null,
            images: images
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
        if (!this.state.selected) { 
            return (
                <MenuBoard  
                    stories={this.state.stories}
                />
            );
        }
        else {
            return (
                <StoryBoard 
                    selected={this.state.selected}
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
                <div >
                    {this.board()}
                </div>
            </div>
        )
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

            <link href="http://thomasf.github.io/solarized-css/solarized-dark.min.css" rel="stylesheet"></link>
            </div>
        )
    }
}

ReactDOM.render(
    <Stories />,
    document.getElementById('root')
)