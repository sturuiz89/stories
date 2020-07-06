import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StoriesData from './assets/stories.json';
import { Container, Navbar, Nav, AccordionCollapseProps } from 'react-bootstrap';


class StoryBoard extends React.Component {
    render() {
        const paragraphs = this.props.selected.text.map((paragraph, index) => {
            return(
                <p key={index}>{paragraph}</p>
            );
        });
        return (
            <Container>
                {paragraphs}
            </Container>
        )
    }
}

class MenuBoard extends React.Component {
    render() {
        return (
            <Container>
                <h3>Stories of mild interest! Choose from the choosing bar atop the screen!</h3>
            </Container>
        );
    }
}

class Navigation extends React.Component {
    render() {
        const titles = this.props.stories.map((story, index) => {
            return (
                <Nav.Link key={story.id} onClick={() => this.props.onClick(story.id)}>{story.title}</Nav.Link>
            )
        })
        return ( 
            <Navbar bg="light" expand="lg">
                <Navbar.Brand onClick={() => this.props.onClick(null)}>Stories</Navbar.Brand>
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
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
            />
        )
    }
}

class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: StoriesData.slice(0),
            selected: null
        }
    }

    handleClick(i) {
        const stories = this.state.stories;
        this.setState({
            stories: stories,
            selected: stories.find(s => s.id === i)
        });
    }

    board() { 
        if (!this.state.selected) { return (<MenuBoard />); }
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
                    onClick={(i) => this.handleClick(i)}
                />
                {this.board()}
            </div>
        )
    }
}

ReactDOM.render(
    <Stories />,
    document.getElementById('root')
)