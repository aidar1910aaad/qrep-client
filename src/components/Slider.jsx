import React, {useState} from "react";
import styled from "styled-components"
import {KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined} from "@material-ui/icons";
import {sliderItems} from "../data";
import {mobile} from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({display: "none"})}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #c9d8e7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props=>props.slideIndex * -100}vw);
  transition: all 2s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props=>props.bg};
`;

const Image = styled.img`
height: 80%;
background: no-repeat center center fixed;
background-size: cover;
margin-top: 60px;
  margin-left: 70px;
  box-shadow: 0px 0px 25px 1px #000;

`;

const ImgContainer = styled.div`
  height: 100%;
flex: 1;
  background-size: 100%;
  width: 100%;
  
`;

const InfoContainer = styled.div`
flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: 500;
  
`;

const Description = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 3px;
  
`;

const Button = styled.button`
padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) =>{
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };
    return(
        <Container>
            <Arrow direction="left" onClick = {() => handleClick("left")}>
                <KeyboardArrowLeftOutlined/>
            </Arrow>
            <Wrapper slideIndex = {slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key = {item.id}>
                        <ImgContainer>

                            <Image src={item.img}/>

                        </ImgContainer>
                        <InfoContainer>
                            <Title>
                                {item.title}
                            </Title>
                            <Description>
                                {item.desc}
                            </Description>
                            <Button>
                                Shop & Buy!
                            </Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick = {()=>handleClick("right")}>
                <KeyboardArrowRightOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider