import { Html } from "@react-email/html";
 import { Text } from "@react-email/text";
 import { Section } from "@react-email/section";
 import { Container } from "@react-email/container";

 export default function WelcomeEmail(subject:string, html:string) {
   return (
    (typeof (window)!=="undefined")?
     <Html>
       <Section style={main}>
         <Container style={container}>
           <Text style={heading}>{subject}</Text>
           <Text style={paragraph}>{html} <br/>
             已經有新文章已發佈囉，快到<a href="https://ez-weld.vercel.app/note">EducationZone</a>看看吧！
           </Text>
         </Container>
       </Section>
     </Html>:
     <div>
        已經有新文章已發佈囉，快到<a href="https://ez-weld.vercel.app/note">EducationZone</a>看看吧！
     </div>
   );
 }

 // Styles for the email template
 const main = {
   backgroundColor: "#F4F4F4",
 };

 const container = {
   margin: "0 auto",
   padding: "20px 0 48px",
   width: "580px",
 };

 const heading = {
   fontSize: "32px",
   lineHeight: "1.3",
   fontWeight: "700",
   color: "#484848",
 };

 const paragraph = {
   fontSize: "18px",
   lineHeight: "1.4",
   color: "#484848",
 };