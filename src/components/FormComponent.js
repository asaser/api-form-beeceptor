import { useEffect, useState } from "react";
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";


const client = axios.create({
    baseURL: "https://muminek.free.beeceptor.com" 
});

const FormComponent = () => {

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
    async function getPost() {
        const response = await client.get("/forms");
        setPost(response.data);
    }
    getPost();
    }, []);

    let createPost = async (e) => {
    e.preventDefault();

    await client.post("/form", {
        email: email,
        password: password,
        description: description
        })
        .then((response) => {
            setPost(response.data);
            setMessage(response.status)
            console.log("Successful send post:", response);

            setEmail("");
            setPassword("");
            setDescription("");

        }).catch((error) => {
            setMessage(error.status)
            console.log("Error post:", error);
    });
    }


    if (error) return `Error: ${error.message}`;
    if (!post) return null;

    return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px',
        height: '100vh'
        }}>

            {message === 200 ? (
                    <Alert variant="success" style={{ position: 'fixed', top: '0', width: '100%' }}>
                        <Alert.Heading style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Congratulation: you sent the form
                        </Alert.Heading>
                    </Alert>
            )
            :
            (
                <></>
            )}

        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control size="lg" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
        />
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control size="lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Write note:</Form.Label>
                <Form.Control size="lg" as="textarea" rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}}/>
            </Form.Group>

            <Button onClick={createPost} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default FormComponent;