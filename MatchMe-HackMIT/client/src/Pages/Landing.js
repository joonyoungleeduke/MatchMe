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
// import { browserHistory, useHistory} from 'react-router'


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
    const [image, setImage] = React.useState([]);

    useEffect(() => {
        getTrending();
    }, {});

    async function getTrending() {
        let posts = await PopularPosts();
        posts = ParsePosts(posts);
        posts.then((data) => {
            setPosts(data);
        })
    }

    const handleImageChange = e => { 
        setImage(e.target.files[0]);
    }

    async function handleDone(event) {

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
            }
        
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     try {
    //         const response = await axiosInstance.post('api/auth/token/obtain/', {
    //             username: username,
    //             password: password
    //         });

    //         axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;


    //         const response2 = await axiosInstance.get('api/auth/user/id/');

    //         localStorage.setItem('user_id', response2.data);

    //         if (response2.status === 200) {
    //             this.props.func(false);
    //             this.props.func1(true);
    //             // this.props.history.push("/feed");
    //         }
    //         return response2;
    //     } catch (error) {
    //         console.log(error.stack);
    //         this.setState({
    //             errors:error.response.data
    //         });
    //     }
    // }

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
                onClose={() => setOpenLogin(false)}
                onOpen={() => setOpenLogin(true)}
                open={openLogin}
                trigger={
                    <Container textAlign = "center" style={{ padding: "5em 0em", marginTop: 25}}>
                        <Button content="Join" color="primary" size="big"/> 
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

{/* submit profile component --- data.{bio, preference1, pref... ... , image} */}



{/* <Modal 
                closeOnDimmerClick={false}
                onClose={() => setOpenEditProfile(false)}
                onOpen={() => setOpenEditProfile(true)}
                open={openEditProfile}
                trigger={
                    <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
                <Grid>
                    <Grid.Column width={7} style={{marginRight: 80}}>    
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image className="emptyimg" src={require("../Images/default.png")} style={{width: 200, marginLeft: 115, marginBottom: 30, borderRadius: "20px"}}/>
                                
                                <div class="custom-file" style={{ marginLeft: 40}}>

                                {/* require("../Images/emptyprofile.png") */}
{/*                                 
                                    <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={() => {handleImageChange()}}/>
                                    <label class="custom-file-label" for="inputGroupFile01">Choose File</label>
                                </div>
                            </List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Form > 
                        {/* onSubmit={(e) => handleSubmit(e)} id="new-post-form" 
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder={props.first_name} />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder={props.last_name} />
                        </Form.Field>
                        <Form.Field>
                            <label>Bio</label>
                            <Form.TextArea placeholder={props.bio} />
                        </Form.Field>
                            {/* onChange = {(e) => handleChange(e)} 
                        </Form>
                        </Grid.Column>
                        

                </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive type="submit" value="submit" form="new-post-form">
                            Next <Icon name='chevron right' />
                        </Button>
                            {/* onClick={() => props.handlePostChange({type: 'CLOSE_MODAL' })} 
                    </Modal.Actions>

                </Modal>

*/}
                <Modal 
                closeOnDimmerClick={false}
                onClose={() => {setOpenInterests(false)}}
                onOpen={() => {setOpenInterests(true)}}
                open={openInterests}
                size="medium" 
                    > 
                        <Modal.Header>Select Your Passions</Modal.Header>
                        <Modal.Content scrolling >
                        <div class="row justify-content-md-center mb-3">
                            <div class="col">
                            <InterestCard name="Charity" src={require("../Images/charity.jpg")} />
                            </div>

                            <div class="col" >
                            <InterestCard name="Social Justice" src={require("../Images/social.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="Global Health" src={require("../Images/ghealth.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="Disability Awareness" src={require("../Images/disabliity.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="LGBTQ+ Rights" src={require("../Images/lgbtq.jpg")}  />
                            </div>

                        </div>
                        <div class="row justify-content-md-center">
                            <div class="col" >
                            <InterestCard name="Environment" src={require("../Images/env.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="Political Advocacy" src={require("../Images/politic.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="Income Inequality" src={require("../Images/income.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="Elderly Aid" src={require("../Images/elder.jpg")}  />
                            </div>

                            <div class="col" >
                            <InterestCard name="Human Rights" src={require("../Images/huright.jpg")}  />
                            </div>
                        </div>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button onClick={handleDone} primary>
                            Done <Icon name='chevron right' />
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