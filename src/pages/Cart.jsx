import React, {useEffect, useState} from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import {Add, Remove} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {mobile} from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../requestMethods";
import {Link, useHistory} from "react-router-dom";

const KEY = "pk_test_51L2kpVJ5bIFy8eESUYajmwqSUxKk0Rjn4ZrhARXEXfIORdySTEFsTYLwdDvyKEPYR5noFDKiKaaEwqzUUdiZovJY00KuDn76cz"

const Container = styled.div`
  
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props=>props.type === "filled" && "none"};
  background-color: ${props=>
          props.type === "filled" ? "black" : "transparent"};
  color: ${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({display: "none"})}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const Info = styled.div`
  flex: 3;
`;


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  
`;

const ProductId = styled.span`
  ${mobile({fontSize: "10px"})}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  
`;

const ProductSize = styled.span`
  
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin: "5px 20px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  ${mobile({marginBottom: "20px"})}
`;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  
`;

const SummaryItemPrice = styled.span`
  
`;

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  
`;

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const history = useHistory()
    const quantity = useSelector(state => state.cart.quantity)
    const onToken = (token)=>{
        setStripeToken(token);
    }
    useEffect(() => {
        const makeRequest = async ()=>{
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                history.push("/success", {data:res.data});
            }catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history]);

    console.log(JSON.stringify(cart))

    const handleClick = (e) => {
        e.preventDefault();
        fetch("https://qrep-api-2.herokuapp.com/api/carts/", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cart)
        }).then(() => {
            console.log("cart added")
        })
    }

    return(
        <Container>
            <Announcement/>
            <Navbar/>
            <Wrapper>
                <Title>
                    Bag
                </Title>
                <Top>
                    <Link to="/">
                    <TopButton>Continue shopping</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>
                            Shopping Bag({quantity})
                        </TopText>

                    </TopTexts>
                    <TopButton type="filled">Checkout now</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product=>
                        <Product>
                            <ProductDetail>
                                <Image src = {product.img}/>
                                <Details>
                                    <ProductName>
                                        <b>Product: </b> {product.title}
                                    </ProductName>
                                    <ProductId>
                                        <b>ID: </b> {product._id}
                                    </ProductId>
                                    <ProductColor color = {product.size}/>
                                    <ProductSize>
                                        <b>Size: </b> {product.size}
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add/>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove/>
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.quantity * product.price}</ProductPrice>
                            </PriceDetail>
                        </Product>
                        )}
                    </Info>
                    <Summary>
                        <SummaryTitle>
                            Order
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>
                                Subtotal
                            </SummaryItemText>
                            <SummaryItemPrice>
                                $0
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>
                                Total
                            </SummaryItemText>
                            <SummaryItemPrice>
                                {cart.total}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="QREP SHOP"
                            image=""
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                            onClick={handleClick}
                        >

                        <SummaryButton onClick={handleClick}>Checkout now</SummaryButton>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart