import React, {useEffect} from "react";
import { Button, Container, Image, List, Grid, Segment, Header, Divider, Step, Form, Table, Icon, Modal } from "semantic-ui-react";
import {Link, useHistory, withRouter} from "react-router-dom";
import Login from "./Login"
import Register from "./Register";
import LandingNav from "../Components/LandingNav";
import PopularPosts from "../APIComponents/PopularPosts";
import ParsePosts from "../APIComponents/ParsePosts";
import Posts from "../Components/Posts";
import InterestCard from "../Components/InterestCard";
import axiosInstance from "../User/axiosApi";

const steps = [
    {
        key: 'unite',
        icon: 'group',
        title: 'Unite.',
        description: 'Create or find your community.',
    },
    {
        key: 'act',
        icon: 'bullhorn',
        title: 'Act.',
        description: 'Lead with your actions.',
    },
    {
        key: 'grow',
        icon: 'handshake outline',
        title: 'Grow.',
        description: 'Grow with others as they match your actions.'
    },
]

const Landing = (props) => {

    const [posts, setPosts] = React.useState([]);
    const [openLogin, setOpenLogin] = React.useState(false)
    const [openRegister, setOpenRegister] = React.useState(false)
    const [openEditProfile, setOpenEditProfile] = React.useState(false)
    const [openInterests, setOpenInterests] = React.useState(false)

    useEffect(() => {
        getTrending();
    }, []);

    async function getTrending() {
        let posts = await PopularPosts();
        posts = ParsePosts(posts);
        posts.then((data) => {
            setPosts(data);
        })
    }

    async function redirectIfLoggedIn(event) {

        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        // event.preventDefault();
        try {
            const response = await axiosInstance.post('api/auth/token/obtain/', {
                username: username,
                password: password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            const response2 = await axiosInstance.get('api/auth/user/id/');

            localStorage.setItem('user_id', response2.data);

            if (response.status === 200) {
                props.history.push("/feed");
                return true;
            }
        
            return false;
        } catch (error) {
            return false;
        }
    }

    async function onOpenLogin () {
        // const loggedIn = await redirectIfLoggedIn();
        // if (!loggedIn) setOpenLogin(true);
        setOpenLogin(true);
    }

    function onCloseLogin () {
        setOpenLogin(false);
    }

    return (
        <Container>
            
            <LandingNav />

            <Segment style={{ padding: '1em 0em' }} vertical>

                <Container textAlign = "center">
                    <Header as='h1' style={{ fontSize: '3em' }}>
                        We Empower Each Other
                    </Header>
                    <p style={{ fontSize: '1.2em'}}>
                        "Alone we can do so little. Together we can do so much."
                    </p>

                    <Step.Group items={steps}/>

                </Container>

                <img src={require("../Images/pp1.png")} style={{width: 360, position: "absolute",  left: 55, top: 270}}/>
                
                <Modal
                    onClose={() => onCloseLogin()}
                    onOpen={() => onOpenLogin()}
                    open={openLogin}
                    trigger={
                        <Container textAlign = "center" style={{ padding: "5em 0em", marginTop: 25}}>
                            <Button content="Join" color="blue" size="big"/> 
                        </Container>
                    }
                    size="tiny"
                >
                    <Modal.Content>
                        <Login close={() => {setOpenLogin(false)}}/>
                        <p className="forgot-password text-right" style={{marginTop: 20, marginRight: 72}}>
                                Need an account? <a href="#" onClick={() => {
                                    setOpenLogin(false)
                                    setOpenRegister(true)}}>Register</a>
                        </p>
                    </Modal.Content>
                </Modal>

                <Modal
                    onClose={() => setOpenRegister(false)}
                    onOpen={() => setOpenRegister(true)}
                    open={openRegister}
                    size="tiny"
                >
                    <Modal.Content>
                        <Register func={() => {setOpenRegister(false)}} func1={() => {setOpenInterests(true)}} />
                        <p className="forgot-password text-right"  style={{marginTop: 20, marginRight: 72}}>
                            Already a member? <a href="#" onClick={() => {
                                setOpenRegister(false)
                                setOpenLogin(true)}}>Login</a>
                        </p>
                    </Modal.Content>

                </Modal>

                <Modal 
                    closeOnDimmerClick={false}
                    onClose={() => {setOpenInterests(false)}}
                    onOpen={() => {setOpenInterests(true)}}
                    open={openInterests}
                > 
                        <Modal.Header>Select Your Passions</Modal.Header>
                        <Modal.Content scrolling >
                            <div className="row justify-content-md-center mb-3">
                                <div className="col">
                                    <InterestCard name="Charity" src={require("../Images/charity.jpg")} />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Social Justice" src={require("../Images/social.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Global Health" src={require("../Images/ghealth.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Disability Awareness" src={require("../Images/disabliity.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="LGBTQ+ Rights" src={require("../Images/lgbtq.jpg")}  />
                                </div>

                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col" >
                                    <InterestCard name="Environment" src={require("../Images/env.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Political Advocacy" src={require("../Images/politic.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Income Inequality" src={require("../Images/income.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Elderly Aid" src={require("../Images/elder.jpg")}  />
                                </div>

                                <div className="col" >
                                    <InterestCard name="Human Rights" src={require("../Images/huright.jpg")}  />
                                </div>
                            </div>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => redirectIfLoggedIn()} primary>
                                Done 
                                <Icon name='chevron right' />
                            </Button>
                        </Modal.Actions>
                        </Modal>


                <img src={require("../Images/pp2.png")} style={{width: 360, position: "absolute",  right: 55, top: 270}}/>
            
                <Container textAlign="center" style={{marginTop: 40}}>
                    <Header as='h1' style={{fontSize: '2em'}}>
                        Trending Now
                    </Header>
                </Container>
                <Container text>
                        <Posts posts={posts}/>
                </Container>

            </Segment>

        </Container>

    )
}

export default withRouter(Landing); 