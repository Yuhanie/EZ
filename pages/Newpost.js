import {Container, Header,Form} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import React from "react";
//import 'firebase/firestore';
//import firebase from '../src/firebase.js';

function Newpost () {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
    // React.useState(() =>{
    //     firebase
    //     .firestore
    //     .collection('topics')
    //     .get()
    //     .then((collectionSnapshot) =>{
    //         const data = collectionSnapshot.docs.map((doc))
    //         return docs.data();
    //     });
    //     setTopics(data);
    // });

    const options = topics.map(topic => {
        return {
            text:topic.name,
            value:topic.name
        }
    })

    return <Container>
        <Header>發布筆記</Header>
        <Form>
            <Form.Input
            type="file"
            />
            <Form.Input placeholder="請輸入筆記標題" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            />

            <Form.TextArea
             placeholder="請輸入筆記內容" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            />

            <Form.Dropdown
             placeholder="請輸入筆記標籤"
             options={[{
                text:"課堂筆記",
                value:"note"
             },
             {
                text:"修課心得",
                value:"diary"
             },
             {
                text:"專題相關",
                value:"project"
             },
             {
                text:"業界資源",
                value:"company"
             },
             {
                text:"其他",
                value:"other"
             },
            
            ]}
            />
            <Form.Button>發布</Form.Button>
            <Form.Button>取消</Form.Button>

           
        </Form>

        

        
    </Container>
}
export default Newpost;